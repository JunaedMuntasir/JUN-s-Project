// Mock Data - In a real app, this comes from a Database (SQL/Firebase)
const studentDB = {
    "JE2024-001": { name: "Alex Johnson", grades: { "Math": "A", "Physics": "B+" } },
    "JE2024-002": { name: "Sam Smith", grades: { "Math": "B", "Physics": "A" } }
};

// Simulated message storage
let messageHistory = [
    { from: "System", to: "all", text: "Welcome to the JE University Portal!", time: "09:00 AM" }
];

let currentUserId = null;

function authorizeStudent() {
    const modal = document.getElementById('authModal');
    const dashboard = document.getElementById('dashboard');
    const hero = document.querySelector('.hero');
    let id = document.getElementById('studentIdInput').value.trim();
    id = id.toUpperCase();
    let foundId = null;
    for (const key in studentDB) {
        if (key.toUpperCase() === id) {
            foundId = key;
            break;
        }
    }
    if (foundId) {
        if (hero) hero.classList.add('hidden');
        if (modal) modal.classList.add('hidden');
        if (dashboard) dashboard.classList.remove('hidden');
        loadStudentData(foundId);
        currentUserId = foundId;
        renderMessages(foundId);
        document.getElementById('studentIdInput').value = '';
    } else {
        alert("Invalid University ID. Access Denied.");
        document.getElementById('studentIdInput').focus();
    }
}

function loadStudentData(id) {
    const student = studentDB[id];
    document.getElementById('studentDisplay').innerText = `Welcome, ${student.name}`;
    // Load Grades
    const table = document.getElementById('gradeTable');
    table.innerHTML = "";
    for (let sub in student.grades) {
        table.innerHTML += `<tr><td>${sub}</td><td>${student.grades[sub]}</td></tr>`;
    }
}

function sendMessage() {
    // Deprecated: replaced by processMessage()
}

function processMessage() {
    const sender = currentUserId || "Unknown";
    const recipient = document.getElementById('recipientSelect').value;
    const text = document.getElementById('msgInput').value;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (!text.trim()) return;
    const newMessage = {
        from: sender,
        to: recipient,
        text: text,
        time: timestamp
    };
    messageHistory.push(newMessage);
    renderMessages(sender);
    document.getElementById('msgInput').value = "";
}

function renderMessages(filter) {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = "";
    // Show messages sent to "all" OR private messages sent to/from specific IDs
    const visibleMessages = messageHistory.filter(m =>
        m.to === "all" || m.to === filter || m.from === filter
    );
    visibleMessages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = msg.to === "all" ? "msg broadcast" : "msg private";
        msgDiv.innerHTML = `
            <span class="msg-meta">${msg.from} to ${msg.to} [${msg.time}]</span>
            <p>${msg.text}</p>
        `;
        chatBox.appendChild(msgDiv);
    });
}
}

// Tab switching logic
function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');
    if (tabId === 'messaging' && currentUserId) {
        renderMessages(currentUserId);
    }
}

// Modal logic
const loginBtn = document.getElementById('loginBtn');
const authModal = document.getElementById('authModal');
if (loginBtn && authModal) {
    loginBtn.onclick = () => {
        authModal.classList.remove('hidden');
        document.getElementById('studentIdInput').focus();
    };
}
