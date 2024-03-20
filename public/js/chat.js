const socket = io()

let user = "USER";

const chatbox = document.getElementById("chatbox")
const log = document.getElementById("log")

chatbox.addEventListener('keyup', e => {
    if (e.key === "Enter") {
        socket.emit('message', { user: user, message: chatbox.value })
    }
})

socket.on('messageLogs', data => {
    let messages = ""
    data.forEach(message => {
        messages += `${message.user} dice ${message.message}<br/>`
    });
    log.innerHTML = messages
})