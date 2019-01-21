<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="dark"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Attendance
          <div slot="subtitle">schoolofnet.com</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      mini
    >
      <q-list
        no-border
        link
        inset-delimiter
      >

      <q-item to="/dashboard">
        <q-item-side icon="chat"></q-item-side>
      </q-item>

      <q-item to="/bot">
        <q-item-side icon="device_hub"></q-item-side>
      </q-item>

      <q-item to="/analitycs">
        <q-item-side icon="show_chart"></q-item-side>
      </q-item>

      <q-item to="/users">
        <q-item-side icon="supervised_user_circle"></q-item-side>
      </q-item>
        
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  },
  mounted() {
    const token = window.localStorage.getItem('token');
    if (!token) {
      this.$router.push('/auth/login');
    }

    this.$socketUsers.on('auth-failed', () => {
      this.$router.push('/auth/login');
    });

    this.$socket.on('auth-failed', () => {
      this.$router.push('/auth/login');
    });
  }
}
</script>

<style>
</style>
