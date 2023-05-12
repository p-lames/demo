<script setup>
import { useQuasar } from 'quasar'
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { date } from "quasar";
import {api} from "boot/axios";

const privilege = ref({
  id: null,
  privilegeName: "",
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
  if (privilege.value.hasError) {
    // form has error
  }
  else {
    const {data, error} = await updatePrivilege()
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
async function getPrivilege(){
  let error = null;
  let data = null;
  try{
    const url = "/privileges/" + router.currentRoute.value.params.id
    data = await api.get(url);
    console.log(data)
    privilege.value = data.data.privilege;
  }
  catch (err){
    error = err;
  }
  return {data ,error}
}
async function updatePrivilege(){
  let error = null;
  let data = null;
  const update = {
    privilegeName: privilege.value.privilegeName,
  }
  try{
    const url = "/privileges/" + router.currentRoute.value.params.id
    data = await api.put(url,update);
  }
  catch (err){
    error = err;
  }
  // console.log(error)
  return {data ,error}
}
async function deletePrivilege(){
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
    const url = "/privileges/" + router.currentRoute.value.params.id
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
      router.back();
    }
  }
  // console.log(error)
  return {data ,error}
}
onMounted(() => {
  getPrivilege();
});

</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <h3>Privileg bearbeiten</h3>
      <q-form @submit="onSubmit"
              class="q-gutter-md"
              v-if="privilege">
        <q-input
          filled
          v-model="privilege.id"
          label="ID"
          lazy-rules
          disable
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        ></q-input>
        <q-input
          filled
          v-model="privilege.privilegeName"
          label="Vorname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        ></q-input>
        <div>
          <q-btn label="Speichern" type="submit" color="primary"></q-btn>
<!--          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>-->
          <q-btn label="Privilege löschen" @click="deletePrivilege"  color="red" class="q-ml-sm"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>

</template>

<style scoped>

</style>
