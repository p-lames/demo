<script setup>

import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {date, useQuasar} from "quasar";
import {api} from "boot/axios";

const $q = useQuasar()
const role = ref();
const router = useRouter();
const tab = ref("privilegeTab");
const users = ref([]);
const privileges = ref([]);
const loading = ref(true);

const columnsPrivileges = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: row => row.id,
    // format: val => `${val}`,
    sortable: true
  },
  { name: 'privilegeName', align: 'left', label: 'Privilege', field: 'privilegeName', sortable: true },
  { name: 'createdAt', align: 'left', label: 'Erstellt am', field: 'createdAt', sortable: true,format: val => date.formatDate(val, 'DD.MM.YYYY') },
  { name: 'createdAt', align: 'left', label: 'Aktualisiert am', field: 'updatedAt', sortable: true,format: val => date.formatDate(val, 'DD.MM.YYYY') },
  { name: 'delete', align: 'left', label: 'Löschen', field: 'delete', sortable: true, format: val => row },
]
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
  { name: 'delete', align: 'left', label: 'Löschen', field: 'delete', sortable: true, format: val => row },
]

async function getRole() {
  console.log(router.currentRoute.value.params.id)
  try {
    const route = "/roles/" + router.currentRoute.value.params.id
    console.log(route)
    loading.value = true;
    let {
      data,
      error,
      status
    } = await api.get(route)
    if (error && status !== 406) throw error;
    if (data) {
      role.value = data.role;
      console.log(data);
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
async function getRolePrivileges() {
  console.log(router.currentRoute.value.params.id)
  try {
    const route = "/roles/" + router.currentRoute.value.params.id + "/privileges"
    console.log(route)
    loading.value = true;
    let {
      data,
      error,
      status
    } = await api.get(route)
    if (error && status !== 406) throw error;
    if (data) {
      privileges.value = data.roles[0].Privileges;
      console.log(data);
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
async function getRoleUsers() {
  console.log(router.currentRoute.value.params.id)
  try {
    const route = "/roles/" + router.currentRoute.value.params.id + "/users"
    console.log(route)
    loading.value = true;
    let {
      data,
      error,
      status
    } = await api.get(route)
    if (error && status !== 406) throw error;
    if (data) {
      users.value = data.roles[0].Users;
      console.log(data);
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
async function deletePrivilege(rowPrivileg){
  let error = null;
  let data = null;
  try {
    const url = "/roles/" + router.currentRoute.value.params.id + "/privileges/" + rowPrivileg.id
    data = await api.delete(url);
  }
  catch (err){
    error = err;
    console.log(err)
  }
  finally {
    if (error !== null) {
      $q.notify({
        // icon: 'done',
        type: 'negative',
        message: error.message
      })
    }
    else{
      $q.notify({
        icon: 'done',
        type: 'positive',
        message: 'gelöscht'
      })
      console.log(data)
      getRolePrivileges()
    }
  }
  // console.log(error)
  return {data ,error}
}

async function deleteUser(rowUser){
  let error = null;
  let data = null;
  try {
    const url = "/roles/" + router.currentRoute.value.params.id + "/users/" + rowUser.id
    data = await api.delete(url);
  }
  catch (err){
    error = err;
    console.log(err)
  }
  finally {
    if (error !== null) {
      $q.notify({
        // icon: 'done',
        type: 'negative',
        message: error.message
      })
    }
    else{
      $q.notify({
        icon: 'done',
        type: 'positive',
        message: 'gelöscht'
      })
      console.log(data)
      getRoleUsers()
    }
  }
  // console.log(error)
  return {data ,error}
}

onMounted(() => {
  getRole();
  getRolePrivileges();
  getRoleUsers();
});

function onRowClick(evt, row) {
  // console.log(evt.target);
  console.log(row)

  if (evt.target.id==='delete-privilege' || evt.target.id==='delete-privilege-icon' ) {
    deletePrivilege(row);
  }
  else if(evt.target.id==='delete-user' || evt.target.id==='delete-user-icon' ) {
    deleteUser(row);
  }
}
</script>

<template>
  <div class="q-pa-md">

    <q-card class="q-pa-md q-mb-lg">
      <q-card-section>
        <div class="text-h3 text-primary q-mt-sm q-mb-xs" v-if="role">Rolle</div>
        <div class="text-h6 q-mt-sm q-mb-xs" v-if="role">Rollen-ID: {{role.id}}</div>
        <div class="text-h6 q-mt-sm q-mb-xs" v-if="role">Rollenname: {{role.roleName}}</div>
      </q-card-section>
      <q-card-section>
        <q-btn-group push>
          <q-btn push :to="{ name: 'EditRole', params:{id: router.currentRoute.value.params.id }}" label="Rolle bearbeiten" icon="handshake"
                 color="primary"></q-btn>
          <q-btn push :to="{ name: 'AddRolePrivilege' }" label="Privileg hinzufügen" icon="checklist"
                 color="primary"></q-btn>
          <q-btn push :to="{ name: 'AddRoleUser' }" label="Benutzer hinzufügen" icon="person_add"
                 color="primary"></q-btn>
        </q-btn-group>
      </q-card-section>
    </q-card>
    <q-card>

      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="privilegeTab" label="Privilege"></q-tab>
        <q-tab name="userTab" label="Benutzer"></q-tab>
      </q-tabs>

      <q-separator></q-separator>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="privilegeTab">
          <q-table
            title="Privilege"
            :rows="privileges"
            :columns="columnsPrivileges"
            row-key="id"
            :loading="loading"
            @row-click="onRowClick"
          >
          <template #body-cell-delete="props" >
            <q-td
              :props="props"
              id="delete-privilege"
            >
              <q-icon
                id="delete-privilege-icon"
                class="text-red text-h6"
                name="delete"
              ></q-icon>
            </q-td>
          </template>
          </q-table>
        </q-tab-panel>

          <q-tab-panel name="userTab">
            <q-table
              title="Benutzer"
              :rows="users"
              :columns="columnsUsers"
              row-key="id"
              :loading="loading"
              @row-click="onRowClick"
            >
              <template #body-cell-delete="props" >
                <q-td
                  :props="props"
                  id="delete-user"
                >
                  <q-icon
                    id="delete-user-icon"
                    class="text-red text-h6"
                    name="delete"
                  ></q-icon>
                </q-td>
              </template>
            </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

  </div>
</template>

<style scoped>

</style>
