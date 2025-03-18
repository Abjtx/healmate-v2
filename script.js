// Chatbot logic
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const emergencyAlert = document.getElementById('emergencyAlert');

// Ensure axios is loaded
if (typeof axios === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
    document.head.appendChild(script);
}

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle emergency symptoms
function checkForEmergency(text) {
    const emergencies = ['chest pain', 'difficulty breathing', 'severe bleeding'];
    return emergencies.some(emergency => text.toLowerCase().includes(emergency));
}

// Update sendToBackend function to make a request to GPT-3.5 API
async function sendToBackend(message, followUp = false) {
    const apiKey = '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';
    const url = 'https://api.openai.com/v1/chat/completions';

    // Enhance the message with context for better interaction
    // const context = "This is a medical diagnosis interaction. Please ask more questions if necessary to understand the symptoms fully before providing a diagnosis. Once you understand the symptoms, provide the diagnosis and the treatment.";
    const context = "This is a medical diagnosis interaction. Understand the symptops and provide the possible diagnosis and the treatments separately";
    const formattedMessage = `${context}\n${message}`;

    const response = await axios.post(url, {
        model: "gpt-3.5-turbo",
        messages: [{role: "system", content: context}, {role: "user", content: formattedMessage}]
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    });

    // Extract the response and encourage further interaction if needed
    const botMessages = response.data.choices[0].message.content.trim();
    //if (botMessages.includes("Can you tell me more about") || botMessages.includes("Could you specify")) {
    //    return botMessages; // Continue the conversation
    //} else if (botMessages.includes("[Diagnosis complete]")) {
        return botMessages; // End the conversation with diagnosis
    //} else {
    ///    return "Please consult a doctor for further examination."; // Suggest consulting a doctor
    //}
}

// Update sendMessage function to use GPT-3.5 for diagnosis
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = '';

    // Show emergency alert if needed
    if (checkForEmergency(message)) {
        emergencyAlert.style.display = 'block';
    } else {
        emergencyAlert.style.display = 'none'; // Hide if not an emergency
    }

    // Get diagnosis from GPT-3.5 API
    let diagnosis = await sendToBackend(message);
    while (diagnosis.includes("Can you tell me more about") || diagnosis.includes("Could you specify")) {
        addMessage(diagnosis);
        await new Promise(resolve => userInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const followUpMessage = userInput.value.trim();
                userInput.value = '';
                if (followUpMessage) {
                    addMessage(followUpMessage, true);
                    diagnosis = await sendToBackend(followUpMessage, true);
                    resolve();
                }
            }
        }, { once: true }));
    }
    addMessage(diagnosis);
}

// Attach the sendMessage function to the window object
window.sendMessage = sendMessage;

// Handle Enter key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') window.sendMessage();
});
