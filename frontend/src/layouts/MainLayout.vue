<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Benutzerverwaltung
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Benutzerverwaltung
        </q-item-label>

        <MenueLink
          v-for="link in menuLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import MenueLink from "components/MenueLink.vue";

const menuList = [
  {
    title: "Rollen",
    caption: "Übersicht aller Rollen",
    icon: "handshake",
    name: "roles",
  },
  {
    title: "Benutzer",
    caption: "Übersicht aller Benutzer",
    icon: "group",
    name: "users",
  },
  {
    title: "Privilegien",
    caption: "Übersicht aller Privilegien",
    icon: "checklist",
    name: "privileges",
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    MenueLink,
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      menuLinks: menuList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
