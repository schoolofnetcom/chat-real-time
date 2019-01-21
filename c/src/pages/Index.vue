<template>
  <q-page style="display:flex; flex-direction:column">
    <div class="row" style="flex:1">
      <div class="col col-md-3">
        <q-list link separator style="height: 100%">
          <q-list-header>Leads online</q-list-header>

          <q-item v-for="(contact, index) in contacts" :key="contact.uuid" @click.native="selected_contact = index">
            <q-item-side icon="contacts"/>
            <q-item-main :label="contact.uuid"/>
            <q-item-side right icon="chat_bubble"/>
          </q-item>

        </q-list>
      </div>
      <div class="col col-md-6">
        <q-card style="height: 100%">
          <q-card-title>
            Chat <small class="text-faded">Lead 1</small>
          </q-card-title>
          <q-card-separator/>
          <q-card-main>
            <q-chat-message label="Sábado, 29 de Dezembro"/>

            <q-chat-message
              :name="message.context ? 'Lead 1' : 'Atendente'"
              :text="message.message"
              :sent="message.context"
              :avatar="message.context ? '/statics/boy-avatar.png' : '/statics/linux-avatar.png'"
              v-for="(message, index) in current_talk"
              :key="index"
            />

          </q-card-main>
          <q-card-separator/>
          <q-card-main>
            <q-input
              v-model="message"
              type="textarea"
              float-label="Digite a mensagem aqui..."
              :max-height="100"
              @keydown="sendMessage"
            />
          </q-card-main>
        </q-card>
      </div>
      <div class="col col-md-3">
        <q-list link separator style="height: 100%">
          <q-list-header>Histórico de acesso</q-list-header>
          <q-item v-for="(url, index) in urls" :key="index">
            <q-item-main label="Curso Iniciando com socket.io" :sublabel="url"/>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      message: '',
      contacts: [],
      urls: [],
      selected_contact: 0,
      messages: []
    }
  },
  computed: {
    current_talk() {
      const talk = [];
      let last_added = -1;
      
      let messages = this.messages[this.selected_contact];

      if (!messages) {
        return talk;
      }

      messages = messages.messages

      messages.forEach((item, i) => {
        const before = messages[i-1];

        if (!before || before.context != item.context){
          talk.push({
            context: item.context,
            message: [item.message]
          })
          last_added ++;
        } else if (before.context === item.context) {
          talk[last_added].message.push(item.message)
        }
      });

      return talk;
    }
  },
  methods: {
    sendMessage(e) {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        e.preventDefault();
        
        this.$socket.emit('agentSendMessage', {
          message: this.message,
          contact: {
            uuid: this.contacts[this.selected_contact].uuid
          }
        });

        this.message = '';
      }
    }
  },
  mounted() {
    this.$socket.on('contact-list', (data) => {
      this.contacts = data;
      if (data.length > 0) {
        this.urls = data[0].urls;
      } else {
        this.urls = [];
      }
    });

    this.$socket.on('agentReceiveMessage', (data) => {
      this.messages = data;
      console.log(this.current_talk);
    });

    this.$socket.emit('connect-agent', window.localStorage.getItem('token'));

  }
}
</script>
