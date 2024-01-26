<template>
  <div class="container mx-auto p-4 h-full">
    <div class="flex">
      <div class="grow">
        <div class="flex flex-row justify-between mb-4">
          <h1 class="text-3xl font-bold">Bevásárló lista</h1>
          <button class="btn btn-primary" @click="createModal.showModal()">Új termék</button>
        </div>
        <ShoppingListComponent :saved="isSaved" />
      </div>
    </div>
  </div>

  <dialog id="create-modal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-lg">Új bevásárló lista elem létrehozása</h3>
      <p class="py-4">
        <CreateShoppingListComponent @saved="saved" />
      </p>
    </div>
  </dialog>
</template>

<script>
import ShoppingListComponent from "@/components/ShoppingList/ShoppingList.vue";
import CreateShoppingListComponent from "@/components/ShoppingList/CreateShoppingList.vue";
import {toast} from "vue3-toastify";
import {ref} from "vue";
export default {
  name: 'App',
  components: {
    ShoppingListComponent,
    CreateShoppingListComponent
  },
  data() {
    return {
      savedSuccess: false
    }
  },
  setup() {
    const isSaved = ref(false)
    const createModal = {
      showModal: function() {
        document.getElementById('create-modal').showModal();
      }
    }

    const saved = () => {
      document.getElementById('create-modal').close();
      isSaved.value = true;
      toast.success("Shopping List has been created successfully.", {
        autoClose: 5000,
      });
    }

    return {
      createModal,
      saved,
      isSaved
    }
  }
}
</script>

<style>

</style>
