<script>
import useShoppingList from "@/composables/shoppingList";
import {onMounted, ref, watch} from "vue";
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'

export default {
  name: 'ShoppingListComponent',
  components: {
    Vue3Datatable
  },
  props: {
    saved: {
      type: Boolean,
    },
    isSavedActionComplete: {
      type: Function
    }
  },
  setup(props) {
    const {
      errors,
      shoppingListItems,
      getShoppingListItems,
      updateShoppingListItem,
      removeShoppingListItem,
    } = useShoppingList();

    onMounted(async () => {
      await getShoppingListItems();
    });

    watch(() => props.saved, async () => {
      await getShoppingListItems();
      props.isSavedActionComplete();
    });

    const completeShoppingListItem = async (id) => {
      await updateShoppingListItem(id, {completed: true});
      await getShoppingListItems();
    }

    const cancelShoppingListItem = async (id) => {
      await updateShoppingListItem(id, {completed: false});
      await getShoppingListItems();
    }

    const deleteShoppingListItem = async (id) => {
      await removeShoppingListItem(id);
      await getShoppingListItems();
    }

    const cols = ref([
      {
        field: 'name',
        title: 'Termék neve',
      },
      {
        field: 'description',
        title: 'Leírás',
      },
      {
        field: 'price',
        title: 'kb. ár (HUF)',
      },
      {
        field: 'status',
        title: 'Státusz',
      },
      {
        field: 'actions',
        title: 'Műveletek',
        headerClass: 'float-end',
      },
    ]);

    const pageSize = process.env.VUE_APP_PAGE_SIZE;

    return {
      cols,
      errors,
      shoppingListItems,
      pageSize,
      completeShoppingListItem,
      cancelShoppingListItem,
      deleteShoppingListItem,
    }
  }
}

</script>
<template>
  <div class="bg-error text-white p-4 mb-3" v-if="errors.length !== 0">
    <ul>
      <li v-for="(err, index) in errors" :key="index">
        {{ err }}
      </li>
    </ul>
  </div>

  <div class="container mb-3">
    <p class="text-gray-500">{{ shoppingListItems.length }} termék összesen</p>
  </div>

  <vue3-datatable :rows="shoppingListItems"
                  :columns="cols"
                  :page="1"
                  :pageSize="pageSize"
                  :showPageSize="false"
                  :pagination="true"
                  :paginationInfo="''"
                  :noDataContent="'Nincs bevásárló lista elem'"
                  :skin="'bh-table-compact'"
                  :rowClass="row => row.completed ? 'bg-success' : 'bg-white'"
  >
    <template #description="shoppingListItem">
      {{ shoppingListItem.value.description ? shoppingListItem.value.description : '-' }}
    </template>

    <template #status="shoppingListItem">
      <div class="badge badge-info gap-2" v-if="!shoppingListItem.value.completed">Beszerzendő</div>
      <div class="badge badge-success gap-2" v-else>Beszerezve</div>
    </template>

    <template #actions="shoppingListItem">
      <div class="float-end">
        <button class="btn btn-primary mr-2" v-if="!shoppingListItem.value.completed"
                @click="completeShoppingListItem(shoppingListItem.value._id)">Beszerzés
        </button>
        <button class="btn btn-warning mr-2" v-else @click="cancelShoppingListItem(shoppingListItem.value._id)">Mégsem
        </button>
        <button class="btn btn-error" @click="deleteShoppingListItem(shoppingListItem.value._id)">Törlés</button>
      </div>
    </template>
  </vue3-datatable>

</template>

<style scoped>

</style>