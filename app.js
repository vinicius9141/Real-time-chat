
const firebaseConfig = {
    apiKey: "AIzaSyACaYPAwSRj8Yl4QZ-DXavyZsRMablJ1R4",
    authDomain: "realtimechat-6e34d.firebaseapp.com",
    projectId: "realtimechat-6e34d",
    storageBucket: "realtimechat-6e34d.appspot.com",
    messagingSenderId: "296544290773",
    appId: "1:296544290773:web:e3fbd18022861ed6ce5f5c"

};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();


const nameInput = document.getElementById('name-input');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');
const popup = document.getElementById('popup');


function showPopup(message) {
    popup.textContent = message;
    popup.classList.add('active');
    setTimeout(() => {
        popup.classList.remove('active');
    }, 3000); 
}


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
    } else {
        showPopup('Por favor, informe seu nome e digite uma mensagem antes de enviar.');
    }
}


sendButton.addEventListener('click', sendMessage);


messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});


database.ref('messages').on('child_added', function (snapshot) {
    const messageData = snapshot.val();
    const messageElement = document.createElement('div');
    
  
    if (messageData.name === nameInput.value.trim()) {
        messageElement.classList.add('user-message'); 
    } else {
        messageElement.classList.add('other-message'); 
    }
    
    messageElement.innerHTML = `<strong>${messageData.name}:</strong> ${messageData.message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

const clearButton = document.getElementById('clear-button');


function clearChat() {
    chatMessages.innerHTML = '';
}


clearButton.addEventListener('click', clearChat);