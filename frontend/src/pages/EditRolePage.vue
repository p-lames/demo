<script setup>
import { useQuasar } from 'quasar'
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { date } from "quasar";
import {api} from "boot/axios";

const role = ref({
  id: null,
  roleName: "",
})
const router = useRouter()
const $q = useQuasar()

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

async function onSubmit () {
  if (role.value.hasError) {
    // form has error
  }
  else {
    const {data, error} = await updateRole()
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
        message: 'erstellt'
      })
      console.log(data)
      router.back();
    }
  }
}
async function getRole(){
  let error = null;
  let data = null;
  try{
    const url = "/roles/" + router.currentRoute.value.params.id
    data = await api.get(url);
    console.log(data)
    role.value = data.data.role;
  }
  catch (err){
    error = err;
  }
  return {data ,error}
}
async function updateRole(){
  let error = null;
  let data = null;
  const update = {
    roleName: role.value.roleName,
  }
  try{
    const url = "/roles/" + router.currentRoute.value.params.id
    data = await api.put(url,update);
  }
  catch (err){
    error = err;
  }
  // console.log(error)
  return {data ,error}
}
async function deleteRole(){
  let error = null;
  let data = null;
  // const update = {
  //   id: user.value.id,
  //   firstName: user.value.firstName,
  //   lastName: user.value.lastName,
  //   email: user.value.email,
  //   phoneNumber: user.value.phoneNumber,
  // }
  try{
    const url = "/roles/" + router.currentRoute.value.params.id
    data = await api.delete(url);
  }
  catch (err){
    error = err;
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
      router.push({name: "roles"});
    }
  }
  // console.log(error)
  return {data ,error}
}
onMounted(() => {
  getRole();
});

</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <h3>Rolle bearbeiten</h3>
      <q-form @submit="onSubmit"
              class="q-gutter-md"
              v-if="role">
        <q-input
          filled
          v-model="role.id"
          label="ID"
          lazy-rules
          disable
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        ></q-input>
        <q-input
          filled
          v-model="role.roleName"
          label="Rollenname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        ></q-input>
        <div>
          <q-btn label="Speichern" type="submit" color="primary"></q-btn>
<!--          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>-->
          <q-btn label="Rolle löschen" @click="deleteRole"  color="red" class="q-ml-sm"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>

</template>

<style scoped>

</style>
