<script setup>
import {onMounted, ref} from "vue";
import { useRouter } from "vue-router";
import {api} from "boot/axios";
import {useQuasar} from "quasar";

const $q = useQuasar()
const router = useRouter();
const loading = ref(true);
const selectedUser = ref();
const users = ref([]);
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

async function addRoleUser(){
  let error = null;
  let data = null;
  const url = "/roles/" + router.currentRoute.value.params.id + "/users"
  try{
    data = await api.post(url, selectedUser.value);
  }
  catch (err){
    error = err;
  }
  // console.log(error)
  return {data ,error}

}
async function onSubmit () {
  // nameRef.value.validate()
  // ageRef.value.validate()
  if (selectedUser.value.hasError) {
    // form has error
  }
    // else if (accept.value !== true) {
    //   $q.notify({
    //     color: 'negative',
    //     message: 'You need to accept the license and terms first'
    //   })
  // }
  else {
    const {data, error} = await addRoleUser()
    if (error !== null) {
      $q.notify({
        // icon: 'done',
        type: 'negative',
        message: error.details
      })
    }
    else{
      $q.notify({
        icon: 'done',
        type: 'positive',
        message: 'aktualisiert'
      })
      router.back()
    }
  }
}
onMounted(() => {
  getUsers();
});
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <h3>Benutzer zur Rolle hinzufügen</h3>
      <q-form @submit="onSubmit"
              class="q-gutter-md"
              v-if="users">
        <q-select
          filled
          v-model="selectedUser"
          :options="users.user"
          :option-value="opt => Object(opt) === opt && 'id' in opt ? opt : null"
          :option-label="opt => Object(opt) === opt && 'firstName' in opt ? opt.firstName + ' ' + opt.lastName : '- Null -'"
          emit-value
          map-options
          label="Benutzer"
        ></q-select>
        <div>
          <q-btn label="Speichern" type="submit" color="primary"></q-btn>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
        </div>

      </q-form>
    </div>
  </q-page>
</template>

<style scoped>

</style>
