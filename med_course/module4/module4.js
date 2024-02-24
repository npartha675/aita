var isMinimized = true;
var chatStarted = false; // Add this flag

const name = localStorage.getItem("username");
const age = localStorage.getItem("userage");
const hobbies = localStorage.getItem("userhobbies");
const gender = localStorage.getItem("usergender");

// Get the user input element
var userInput = document.getElementById("user-input");
const chatHistory = [];
const apiKey = '';

// Add an event listener to capture keypress events
userInput.addEventListener("keypress", function(event) {
    if (!chatStarted && event.key === "Enter") {
        chatStarted = true; // Set the chatStarted flag to true
        sendMessage(); // Call the sendMessage function to send the message
        event.preventDefault(); // Prevent the default Enter key behavior (e.g., new line)
    } else if (chatStarted && event.key === "Enter") {
        sendMessage(); // Continue chat when the user presses Enter after starting
        event.preventDefault(); // Prevent the default Enter key behavior (e.g., new line)
    }
});

async function getChatGPTResponse(userMessage) {
    const messageList = chatHistory.map(([role, content]) => ({
        role,
        content,
    }));
    messageList.push({ role: 'user', content: userMessage });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messageList,
        }),
    });

    const data = await response.json();
    const chatGPTResponse = data.choices[0].message.content;

    chatHistory.push(['system', chatGPTResponse]);
    return chatGPTResponse;
}

function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    addMessage("User", userInput);
    document.getElementById("user-input").value = "";

    // Simulate a response from the chatbot (you can replace this with AI logic)
    setTimeout(function() {
        getChatGPTResponse("You're name is eMiLy. You are the study buddy if this user who is learning AI. The user's name is " + name + " and is " + age + " years old. Their gender is " + gender + ". When asked for hobbies and likes they said '" + hobbies + "'. Use this information to give responses tailored to the user with EXAMPLES SPECIFIC TO WHAT THEY LIKE and their hobbies. Give responses NO LONGER than 70 words and NO LESS than 7 words. Reply to this user input:" + userInput).then((chatResponse) => {
            addMessage('AI', chatResponse);
        });
        
    }, 500);
    
}

function addMessage(sender, message) {
    var chatlogs = document.querySelector(".chatlogs");
    var messageDiv = document.createElement("div");
    messageDiv.classList.add("chat", sender.toLowerCase()); // Add chat bubble class
    messageDiv.innerHTML = message;
    chatlogs.appendChild(messageDiv);
    chatlogs.scrollTop = chatlogs.scrollHeight;
}

function toggleChat() {
    if (!chatStarted) {
        var chat = document.querySelector(".chat");
        chat.style.padding = 0;
    }

    var chatbox = document.querySelector(".chatbox");
    var chatlogs = document.querySelector(".chatlogs");
    var minimizeBtn = document.querySelector(".minimize-btn");

    isMinimized = !isMinimized;

    if (isMinimized) {
        chatbox.style.height = "40px"; // Adjust the minimized height as needed
        chatlogs.style.display = "none";
        minimizeBtn.innerText = "Maximize";
    } else {
        chatbox.style.height = "400px"; // Restore the original height
        chatlogs.style.display = "block";
        minimizeBtn.innerText = "Minimize";
    }
}
