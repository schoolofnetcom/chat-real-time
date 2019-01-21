<template>
  <q-page padding>
    <h3>Cadastro de atendente</h3>
    <form action="" @submit.prevent="save()">
      <q-field
        label="Seu nome"
      >
        <q-input v-model="data.name"/>
      </q-field>
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

      <input type="submit" value="Salvar" class="q-btn bg-primary text-white">

    </form>
    <hr>
    <router-link to="/users">Voltar</router-link>
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
    save() {
      this.$socketUsers.emit('save-user', this.data);
      this.$socketUsers.on('saved-user', () => {
        this.$router.push('/users');
      });
    }
  }
}
</script>

<style>
</style>
