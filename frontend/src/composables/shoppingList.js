import {ref} from "vue";
import http from "../http-common";

export default function useShoppingList() {
    const shoppingListItems = ref([]);
    const errors = ref([]);
    const BASE_URL = '/shopping-list';

    const getShoppingListItems = async () => {
        try {
            const response = await http.get(BASE_URL);
            shoppingListItems.value = await response.data.data;
        } catch (err) {
            for (const key in err.response.data.message) {
                errors.value.push( err.response.data.message[key].message);
            }
        }
    }

    const addShoppingListItem = async (item) => {
        try {
            item.price = parseInt(item.price);
            const response = await http.post(BASE_URL, item);
            shoppingListItems.value.push(response.data.data);
        } catch (err) {
            for (const key in err.response.data.message) {
                errors.value.push( err.response.data.message[key].message);
            }
        }
    }

    const updateShoppingListItem = async (id, item) => {
        errors.value = [];
        try {
            await http.put(`${BASE_URL}/${id}`, item)
        } catch (err) {
            for (const key in err.response.data.message) {
                errors.value.push( err.response.data.message[key].message);
            }
        }
    }

    const removeShoppingListItem = async (id) => {
        try {
            await http.delete(`${BASE_URL}/${id}`);
            shoppingListItems.value = shoppingListItems.value.filter(item => item.id !== id);
        } catch (err) {
            for (const key in err.response.data.message) {
                errors.value.push(err.response.data.message[key].message);
            }
        }
    }


    return {
        shoppingListItems,
        getShoppingListItems,
        addShoppingListItem,
        updateShoppingListItem,
        removeShoppingListItem,
        errors
    }
}