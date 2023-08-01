// Initialize Firebase com as configurações do seu projeto
const firebaseConfig = {
     apiKey: "AIzaSyACaYPAwSRj8Yl4QZ-DXavyZsRMablJ1R4",
    authDomain: "realtimechat-6e34d.firebaseapp.com",
    projectId: "realtimechat-6e34d",
    storageBucket: "realtimechat-6e34d.appspot.com",
    messagingSenderId: "296544290773",
    appId: "1:296544290773:web:e3fbd18022861ed6ce5f5c"

};

firebase.initializeApp(firebaseConfig);

// Referência ao banco de dados do Firebase
const database = firebase.database();

// Referências aos elementos da página
const nameInput = document.getElementById('name-input');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

// Função para enviar mensagem
function sendMessage() {
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    
    if (name !== '' && message !== '') {
        const timestamp = Date.now();
        database.ref('messages/' + timestamp).set({
            name: name,
            message: message
        });
        messageInput.value = '';
    }
}

// Evento ao clicar no botão enviar
sendButton.addEventListener('click', sendMessage);

// Evento ao pressionar Enter no campo de input de mensagem
messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Monitorando alterações no banco de dados do Firebase
database.ref('messages').on('child_added', function (snapshot) {
    const messageData = snapshot.val();
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${messageData.name}:</strong> ${messageData.message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
