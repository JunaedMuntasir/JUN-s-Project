// Mock Data - In a real app, this comes from a Database (SQL/Firebase)
const studentDB = {
    "JE2024-001": { name: "Alex Johnson", grades: { "Math": "A", "Physics": "B+", "History": "A-", "Biology": "B" } },
    "JE2024-002": { name: "Sam Smith", grades: { "Math": "B", "Physics": "A", "Chemistry": "B+", "English": "A-" } },
    "JE2024-003": { name: "Fatima Al-Farsi", grades: { "Math": "A-", "Physics": "A", "Arabic": "A+", "History": "B+" } },
    "JE2024-004": { name: "Priya Patel", grades: { "Math": "A", "Biology": "A+", "Chemistry": "A", "English": "B+" } },
    "JE2024-005": { name: "Chen Wei", grades: { "Math": "A+", "Physics": "A", "Chinese": "A", "Computer Science": "A-" } },
    "JE2024-006": { name: "Maria Rodriguez", grades: { "Math": "B+", "Spanish": "A+", "History": "A", "Art": "A-" } },
    "JE2024-007": { name: "David Kim", grades: { "Math": "A", "Physics": "A-", "Korean": "A+", "Music": "B+" } },
    "JE2024-008": { name: "Amina Yusuf", grades: { "Math": "B", "English": "A", "French": "A-", "Geography": "A" } },
    "JE2024-009": { name: "Luca Bianchi", grades: { "Math": "A-", "Italian": "A+", "History": "B+", "Philosophy": "A" } },
    "JE2024-010": { name: "Sara Svensson", grades: { "Math": "A", "Swedish": "A+", "Biology": "A-", "English": "A" } }
};

// Simulated message storage
let messageHistory = [
    { from: "System", to: "all", text: "Welcome to the JE University Portal!", time: "09:00 AM" }
];

let currentUserId = null;


window.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('authModal');
    const dashboard = document.getElementById('dashboard');
    const hero = document.querySelector('.hero');
    if (hero) hero.classList.add('hidden');
    if (modal) modal.classList.add('hidden');
    if (dashboard) dashboard.classList.remove('hidden');
    const defaultId = 'JE2024-001';
    loadStudentData(defaultId);
    currentUserId = defaultId;
    renderMessages(defaultId);
});

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
