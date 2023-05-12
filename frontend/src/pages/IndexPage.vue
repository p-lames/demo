<script setup>
import { computed, onMounted, ref } from "vue";
import { date } from "quasar";
import { useRouter } from "vue-router";
import {api} from "boot/axios";

const loading = ref(true);
const users = ref([]);
const router = useRouter();

const columnsUsers= [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: row => row.id,
    // format: val => `${val}`,
    sortable: true
  },
  { name: 'firstName', align: 'left', label: 'Vorname', field: 'firstName', sortable: true },
  { name: 'lastName', align: 'left', label: 'Nachname', field: 'lastName', sortable: true },
  { name: 'email', align: 'left', label: 'E-Mail', field: 'email', sortable: true },
  { name: 'phoneNumber', align: 'left', label: 'Telefonnummer', field: 'phoneNumber', sortable: true },
  { name: 'createdAt', align: 'left', label: 'Erstellt am', field: 'createdAt', sortable: true,format: val => date.formatDate(val, 'DD.MM.YYYY') },
  { name: 'createdAt', align: 'left', label: 'Aktualisiert am', field: 'updatedAt', sortable: true,format: val => date.formatDate(val, 'DD.MM.YYYY') },
  { name: 'edit', align: 'left', label: 'Editieren', field: 'edit', sortable: true, format: val => row },
]
async function getUsers() {

  try {
    loading.value = true;
    let {
      data,
      error,
      status
    } = await api.get("/users/")
    if (error && status !== 406) throw error;
    if (data) {
      users.value = data;
      console.log(data);
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  getUsers();
});
function onRowClick(evt, row) {
  console.log(evt.target);

  if (evt.target.id==='edit' || evt.target.id==='edit-icon' ) {

    // console.log(evt.target.node.name)
    router.push({ name: "EditUser", params: {id: row.id } });
  }
}
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <h3>Übersicht Benutzer</h3>
      <q-btn-group push class="q-mb-md">
        <q-btn push :to="{ name: 'NewUser' }" label="Neuer Benutzer" icon="person_add" color="primary"></q-btn>
      </q-btn-group>
      <q-table
        title="Benutzer"
        :rows="users.user"
        row-key="id"
        :columns="columnsUsers"
        :loading="loading"
        @rowClick="onRowClick"
      >
        <template #body-cell-edit="props" >
          <q-td
            :props="props"
            id="edit"
          >
            <q-icon
              id="edit-icon"
              class="text-primary text-h6"
              name="edit"
            ></q-icon>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>


