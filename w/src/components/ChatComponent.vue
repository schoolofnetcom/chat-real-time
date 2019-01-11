<template>
    <section>
        <transition-group
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown"
        >
            <div id="chat-button" v-show="!chatShow" key="1">
                <a href="" @click.prevent="chatShow = true">
                    <chatIcon fill="#0984e3"/>
                </a>
            </div>
            <div id="chat" v-show="chatShow" key="2">
                <header class="chat-header">
                    <div>myChat</div>
                    <div>
                        <a href="" class="chat-close" @click.prevent="chatShow = false">x</a>
                    </div>
                </header>
                <main class="chat-content">
                    <ul>
                        <li v-for="(message, index) in messages" :key="index" :class="{'me': message.me}">
                            <p class="name">
                                <img src="/static/boy-avatar.png" class="img" width="40" v-if="message.me">
                                <img src="/static/linux-avatar.png" class="img" width="40" v-if="!message.me">
                                {{ message.name }}
                            </p>
                            <p class="text">{{ message.text }}</p>
                        </li>
                    </ul>
                </main>
                <footer class="chat-footer">
                    <textarea @keydown="sendMessage" class="input-text" placeholder="Digite a mensagem aqui..." v-model="message"></textarea>
                </footer>
            </div>
        </transition-group>
    </section>
</template>

<script>
import Cookie from 'js-cookie';
import socketio from 'socket.io-client';
import chatIcon from './ChatLogo';

const socket = socketio('localhost/chat');

export default {
    components: {
        chatIcon
    },
    data() {
        return {
            chatShow: false,
            message: '',
            messages: []
        }
    },
    methods: {
        uuidv4() {
            return 'xxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        sendMessage(e) {
            if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                e.preventDefault();

                const message = {
                    me: true,
                    text: this.message,
                    name: 'Eu'
                };

                this.messages.push(message)

                socket.emit('contactSendMessage', {
                    message: this.message
                });

                this.message = '';
            }
        }
    },
    mounted() {
        let uuid = Cookie.get('attendanceuuid');
        if (!uuid) {
            uuid = this.uuidv4();
            Cookie.set('attendanceuuid', uuid);
        }

        socket.emit('connect-contact', {
            uuid: uuid,
            url: window.location.href
        });

        socket.on('contact-list', (data) => {
            console.log(data)
        });

        socket.on('contactReceiveMessage', (data) => {
            this.chatShow = true;
            const message = {
                me: false,
                text: data.message,
                name: 'Atendente'
            };

            this.messages.push(message)
        });

        socket.on('contactReceiveMessages', (data) => {
            if (!data) {
                return;
            }

            this.chatShow = true;
            console.log(data)

            data.messages.forEach((item) => {
                this.messages.push({
                    me: item.context,
                    text: item.message,
                    name: item.context ? 'Eu' : 'Atendente'
                });
            })
        });
    }
}
</script>


<style lang="scss" scoped>
@import url('../../node_modules/animate.css/animate.css');

$primary-color: #0984e3;
$secondary-color: #74b9ff;
$tertiary-color: #eee;
$white: #fff;
$black: #000;

#chat {
    background-color: $tertiary-color;
    color: $white;
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    right: 10px;
    text-align: left;
    font-size: 16px;
    max-height: 450px;
    width: 100%;
    max-width: 300px;

    * {
        box-sizing: border-box;
    }
}

#chat-button {
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 40px;
}

.chat-header, .chat-content, .chat-footer {
    padding: 10px;
    flex: 1;
}

.chat-header {
    background: $primary-color;
    max-height: 50px;
    align-items: center;
    display: flex;
    justify-content: space-between;

    .chat-close {
        padding-right: 5px;
        color: inherit;
        text-decoration: none;
    }
}

.chat-footer {
    background-color: $secondary-color;
    max-height: 80px;
    align-items: center;
    display: flex;

    .input-text {
        width: 100%;
        background-color: $tertiary-color;
        border: none;
        margin: 0;
        padding: 10px;
        font: inherit;
        &:focus {
            outline: $secondary-color 2px solid;
        }
    }
}

.chat-content {
    position: relative;
    width: 100%;
    overflow: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column-reverse;
    font-size: .85em;
    margin-bottom: 10px;
    ul {
        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            display: block;
            width: 80%;
            background-color: $primary-color;
            margin: 10px;
            padding: 10px;
            border-radius: 5px;
            &.me {
                margin-left: 20%;
                background-color: $secondary-color;
            }

            .name {
                padding-top: 0;
                margin-top: 0;
                display: flex;
                align-items: center;
                font-weight: bold;

                .img {
                    border-radius: 40px;
                    margin-right: 10px;
                }
            }

            .text {
                line-height: 20px;
                font-size: 0.9em;
            }
        }
    }
}

</style>

