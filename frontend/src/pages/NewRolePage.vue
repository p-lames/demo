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
    const {data, error} = await createRole()
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

async function createRole(){
  let error = null;
  let data = null;
  const update = {
    roleName: role.value.roleName,

  }
  try{
    data = await api.post("/roles/",update);
  }
  catch (err){
    error = err;
  }
  // console.log(error)
  return {data ,error}
}

</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <h3>Rolle erstellen</h3>
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
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
        </div>

      </q-form>
    </div>
  </q-page>

</template>

<style scoped>

</style>
