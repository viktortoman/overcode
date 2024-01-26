<script>
import useShoppingList from "@/composables/shoppingList";
import {reactive} from "vue";

export default {
  name: 'CreateShoppingListComponent',
  components: {},
  emits: ['saved'],
  setup(props, ctx) {
    const initialState = {
      name: '',
      description: '',
      price: '',
    };

    const {errors, addShoppingListItem} = useShoppingList();
    const form = reactive(initialState);

    const save = async () => {
      await addShoppingListItem(form);

      if (errors.value.length === 0) {
        ctx.emit('saved');
      }

      form.name = '';
      form.description = '';
      form.price = '';
    }

    return {
      errors,
      form,
      initialState,
      save
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

  <div class="container">
    <form @submit.prevent="save">
      <div class="form-control">
        <div class="label">
          <span class="label-text">Termék neve</span>
        </div>
        <input type="text" class="input input-bordered w-full max-w-xs" v-model="form.name" required/>
      </div>

      <div class="form-control">
        <div class="label">
          <span class="label-text">Termék kb. ár (HUF)</span>
        </div>
        <input type="text" class="input input-bordered w-full max-w-xs" v-model="form.price" required/>
      </div>

      <div class="form-control">
        <div class="label">
          <span class="label-text">Leírás</span>
        </div>
        <textarea class="textarea textarea-bordered h-24" v-model="form.description"></textarea>
      </div>

      <button type="submit" class="btn btn-success mt-4 float-end">Mentés</button>
    </form>
  </div>
</template>

<style scoped>

</style>