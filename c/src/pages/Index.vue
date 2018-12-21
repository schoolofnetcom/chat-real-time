<template>
  <q-page style="display:flex; flex-direction:column">
    <div class="row" style="flex:1">
      <div class="col col-md-3">
        <q-list link separator style="height: 100%">
          <q-list-header>Leads online</q-list-header>
          <q-item>
            <q-item-side icon="contacts"/>
            <q-item-main label="lead 1"/>
            <q-item-side right icon="chat_bubble"/>
          </q-item>
          
          <q-item>
            <q-item-side icon="contacts"/>
            <q-item-main label="lead 2"/>
            <q-item-side right icon="chat_bubble"/>
          </q-item>

          <q-item>
            <q-item-side icon="contacts"/>
            <q-item-main label="cliente 1"/>
            <q-item-side right icon="chat_bubble"/>
          </q-item>

          <q-item>
            <q-item-side icon="contacts"/>
            <q-item-main label="cliente 2"/>
            <q-item-side right icon="chat_bubble"/>
          </q-item>

          <q-item>
            <q-item-side icon="contacts"/>
            <q-item-main label="Usuário"/>
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
              name="Lead 1"
              :text="['Olá, tudo bem com você?']"
              :sent="false"
              stamp="4 minutos atrás"
              avatar="/statics/boy-avatar.png"
            />

            <q-chat-message
              name="Atendente"
              :text="['Tudo', 'E com você?', 'Por favor, informe seu nome e email para continuarmos o atendimento']"
              :sent="true"
              stamp="4 minutos atrás"
              avatar="/statics/linux-avatar.png"
            />

          </q-card-main>
          <q-card-separator/>
          <q-card-main>
            <q-input
              v-model="message"
              type="textarea"
              float-label="Digite a mensagem aqui..."
              :max-height="100"
            />
          </q-card-main>
        </q-card>
      </div>
      <div class="col col-md-3">
        <q-list link separator style="height: 100%">
          <q-list-header>Histórico de acesso</q-list-header>
          <q-item>
            <q-item-main label="Curso Iniciando com socket.io" sublabel="https://seusite.com/curso-iniciando-com-socketio"/>
          </q-item>
          
          <q-item>
            <q-item-main label="Curso Iniciando com socket.io" sublabel="https://seusite.com/curso-iniciando-com-socketio"/>
          </q-item>

          <q-item>
            <q-item-main label="Curso Iniciando com socket.io" sublabel="https://seusite.com/curso-iniciando-com-socketio"/>
          </q-item>

          <q-item>
            <q-item-main label="Curso Iniciando com socket.io" sublabel="https://seusite.com/curso-iniciando-com-socketio"/>
          </q-item>

          <q-item>
            <q-item-main label="Curso Iniciando com socket.io" sublabel="https://seusite.com/curso-iniciando-com-socketio"/>
          </q-item>

          <q-item>
            <q-item-main label="Curso Iniciando com socket.io" sublabel="https://seusite.com/curso-iniciando-com-socketio"/>
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
      message: ''
    }
  }
}
</script>
