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
                        <li class="me">
                            <p class="name"><img src="/static/boy-avatar.png" class="img" width="40"> Eu</p>
                            <p class="text">Olá, tudo bem com você?</p>
                        </li>

                        <li>
                            <p class="name"><img src="/static/linux-avatar.png" class="img" width="40"> Atendente</p>
                            <p class="text">Tudo</p>
                        </li>

                        <li>
                            <p class="name"><img src="/static/linux-avatar.png" class="img" width="40"> Atendente</p>
                            <p class="text">E com você?</p>
                        </li>

                        <li>
                            <p class="name"><img src="/static/linux-avatar.png" class="img" width="40"> Atendente</p>
                            <p class="text">Por favor, informe seu nome e email para continuarmos o atendimento</p>
                        </li>
                    </ul>
                </main>
                <footer class="chat-footer">
                    <textarea class="input-text" placeholder="Digite a mensagem aqui..."></textarea>
                </footer>
            </div>
        </transition-group>
    </section>
</template>

<script>
import chatIcon from './ChatLogo';

export default {
    components: {
        chatIcon
    },
    data() {
        return {
            chatShow: false
        }
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

