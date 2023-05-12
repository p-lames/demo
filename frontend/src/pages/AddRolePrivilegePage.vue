<script setup>
import {onMounted, ref} from "vue";
import { useRouter } from "vue-router";
import {api} from "boot/axios";
import {useQuasar} from "quasar";

const $q = useQuasar()
const router = useRouter();
const loading = ref(true);
const privileges = ref([{id:null, isActive:false}]);
const selectedPrivilege = ref()
async function getAllPrivileges() {
  try {
    loading.value = true;
    let {
      data,
      error,
      status
    } = await api.get("/privileges/")
    if (error && status !== 406) throw error;
    if (data) {
      privileges.value = data;
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function addRolePrivilege(){
  let error = null;
  let data = null;
  const url = "/roles/" + router.currentRoute.value.params.id + "/privileges"
  try{
    data = await api.post(url, selectedPrivilege.value);
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
  if (selectedPrivilege.value.hasError) {
    // form has error
  }
  else {
    const {data, error} = await addRolePrivilege()
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
  getAllPrivileges();
});
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <h3>Privilege zur Rolle hinzufügen</h3>
      <q-form @submit="onSubmit"
              class="q-gutter-md"
              v-if="privileges">
        <q-select
          filled
          v-model="selectedPrivilege"
          :options="privileges.privilege"
          :option-value="opt => Object(opt) === opt && 'id' in opt ? opt : null"
          :option-label="opt => Object(opt) === opt && 'privilegeName' in opt ? opt.privilegeName : '- Null -'"
          emit-value
          map-options

          label="Privilegien"
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
