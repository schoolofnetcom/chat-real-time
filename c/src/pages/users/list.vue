<template>
  <q-page padding>
    <q-table
      grid
      title="Atendentes"
      :data="data"
      :columns="columns"
      row-key="_id"
    ></q-table>

    <q-btn to="/users/create" color="primary">Cadastrar</q-btn>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      data: [
        // {
        //   _id: 1,
        //   name: 'Erik',
        //   email: 'erik.figueiredo@son.com'
        // }
      ],
      columns: [
        {
          name: 'id',
          label: '#',
          field: '_id',
          sortable: true,
          align: 'left',
          style: 'width: 20px'
        },
        {
          name: 'name',
          label: 'nome',
          field: 'name',
          sortable: true,
          align: 'left',
        },
        {
          name: 'email',
          label: 'email',
          field: 'email',
          sortable: true,
        },
      ]
    }
  },
  mounted() {
    this.$socketUsers.emit('request-users');
    this.$socketUsers.on('get-users', (data) => {
      this.data = data;
    });
  }
}
</script>

<style>
</style>
