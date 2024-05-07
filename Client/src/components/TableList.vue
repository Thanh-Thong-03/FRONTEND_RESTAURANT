<!-- TablesList.vue -->
<template>
    <q-page>
      <q-table
        :rows="tables"
        :columns="columns"
        row-key="id"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              v-if="props.row"
              dense
              flat
              icon="edit"
              @click="editTable(props.row)"
            />
            <q-btn
              v-if="props.row"
              dense
              flat
              icon="delete"
              @click="deleteTable(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </q-page>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'TablesList',
    props: {
      tables: {
        type: Array,
        required: true
      },
      editCallback: Function,
      deleteCallback: Function
    },
    setup(props) {
      const columns = ref([
        { name: 'name', required: true, label: 'Table Name', align: 'left', field: 'name' },
        { name: 'actions', label: 'Actions', align: 'center', field: 'actions' }
      ]);
  
      const editTable = (table) => {
        if (props.editCallback) {
          props.editCallback(table);
        }
      };
  
      const deleteTable = (table) => {
        if (props.deleteCallback) {
          props.deleteCallback(table);
        }
      };
  
      return {
        columns,
        editTable,
        deleteTable
      };
    }
  };
  </script>