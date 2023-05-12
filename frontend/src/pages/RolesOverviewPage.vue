<script setup>
import { computed, onMounted, ref } from "vue";
import { date } from "quasar";
import { useRouter } from "vue-router";
import {api} from "boot/axios";


const loading = ref(true);
const roles = ref([]);
const router = useRouter();
const columnsRoles = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: row => row.id,
    // format: val => `${val}`,
    sortable: true
  },
  { name: 'roleName', align: 'left', label: 'Rollenname', field: 'roleName', sortable: true },
  { name: 'createdAt', align: 'left', label: 'Erstellt am', field: 'createdAt', sortable: true,format: val => date.formatDate(val, 'DD.MM.YYYY') },
  { name: 'createdAt', align: 'left', label: 'Aktualisiert am', field: 'updatedAt', sortable: true,format: val => date.formatDate(val, 'DD.MM.YYYY') },
  { name: 'edit', align: 'left', label: 'Editieren', field: 'edit', sortable: true, format: val => row },
]
async function getRoles() {

  try {

    loading.value = true;
    let {
      data,
      error,
      status
    } = await api.get("/roles/")
    if (error && status !== 406) throw error;
    if (data) {
      roles.value = data;
      console.log(data);
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  getRoles();
});
function onRowClick(evt,row) {

    console.log(evt.target);

    if (evt.target.id==='edit' || evt.target.id==='edit-icon' ) {

      // console.log(evt.target.node.name)
      router.push({ name: "EditRole", params: {id: row.id } });
    }
    else {
      router.push({ name: "DetailRole", params: {id: row.id } });
    }
}
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <h3>Übersicht Rollen</h3>
      <q-btn-group push class="q-mb-md">
        <q-btn push :to="{ name: 'NewRole' }" label="Neue Rolle" icon="handshake" color="primary"></q-btn>
      </q-btn-group>
      <q-table
        title="Rollen"
        :rows="roles.roles"
        row-key="id"
        :columns="columnsRoles"
        :loading="loading"
        @row-click="onRowClick"
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

<style scoped>

</style>
