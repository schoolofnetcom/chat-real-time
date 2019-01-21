<template>
  <q-page padding>
    <h3>Autenticação</h3>

    <form action="" @submit.prevent="auth()">
      <q-field
        label="Seu email"
      >
        <q-input v-model="data.email"/>
      </q-field>
      <q-field
        label="Sua senha"
      >
        <q-input v-model="data.password"/>
      </q-field>

      <input type="submit" value="Autenticar" class="q-btn bg-primary text-white">

    </form>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    }
  },
  methods: {
    auth() {
      console.log('envio de método');
      this.$socketUsers.emit('authenticate', this.data);
      this.$socketUsers.on('authenticated', (result) => {
        if (!result) {
          this.data.password = '';
          return ;
        }
        window.localStorage.setItem('token', result.token);
        this.$router.push('/');
      });
    }
  },
}
</script>

<style>
</style>
