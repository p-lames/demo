<script setup>
import { useQuasar } from 'quasar'
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { date } from "quasar";
import {api} from "boot/axios";

const user = ref({
  id: null,
  firstName: "",
  lastaName: "",
  email: "",
  phoneNumber: "",
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
  if (user.value.hasError) {
    // form has error
  }
  else {
    const {data, error} = await updateUser()
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
async function getUser(){
  let error = null;
  let data = null;
  try{
    const url = "/users/" + router.currentRoute.value.params.id
    data = await api.get(url);
    user.value = data.data.user;
  }
  catch (err){
    error = err;
  }
  // console.log(error)
  return {data ,error}
}
async function updateUser(){
  let error = null;
  let data = null;
  const update = {
    id: user.value.id,
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    email: user.value.email,
    phoneNumber: user.value.phoneNumber,
  }
  try{
    const url = "/users/" + router.currentRoute.value.params.id
    data = await api.put(url,update);
  }
  catch (err){
    error = err;
  }
  // console.log(error)
  return {data ,error}
}
onMounted(() => {
  getUser();
});
async function deleteUser(){
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
    const url = "/users/" + router.currentRoute.value.params.id
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
  getUser();
});

</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <h3>Benutzer bearbeiten</h3>
      <q-form @submit="onSubmit"
              class="q-gutter-md"
              v-if="user">
        <q-input
          filled
          v-model="user.id"
          label="ID"
          lazy-rules
          disable
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        ></q-input>
        <q-input
          filled
          v-model="user.firstName"
          label="Vorname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        ></q-input>
        <q-input
          filled
          v-model="user.lastName"
          label="Nachname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        ></q-input>
        <q-input
          filled
          v-model="user.email"
          label="E-Mail"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        ></q-input>
        <q-input
          filled
          v-model="user.phoneNumber"
          label="Telefonnummer"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        ></q-input>
        <div>
          <q-btn label="Speichern" type="submit" color="primary"></q-btn>
<!--          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>-->
          <q-btn label="Benutzer löschen" @click="deleteUser"  color="red" class="q-ml-sm"></q-btn>
        </div>

      </q-form>
    </div>
  </q-page>

</template>

<style scoped>

</style>
