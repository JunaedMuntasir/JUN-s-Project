// Mock Data - In a real app, this comes from a Database (SQL/Firebase)
const studentDB = {
    "JE2024-001": { name: "Alex Johnson", grades: { "Math": "A", "Physics": "B+" } },
    "JE2024-002": { name: "Sam Smith", grades: { "Math": "B", "Physics": "A" } }
};

function authorizeStudent() {
    const id = document.getElementById('studentIdInput').value;
    
    if (studentDB[id]) {
        // Authorization Successful
        document.querySelector('.hero').classList.add('hidden');
        document.getElementById('authModal').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        
        loadStudentData(id);
    } else {
        alert("Invalid University ID. Access Denied.");
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
    const msg = document.getElementById('msgInput').value;
    const chat = document.getElementById('chatBox');
    if(msg) {
        chat.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
        document.getElementById('msgInput').value = "";
    }
}

// Tab switching logic
function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');
}

// Modal logic
const loginBtn = document.getElementById('loginBtn');
const authModal = document.getElementById('authModal');
if (loginBtn && authModal) {
    loginBtn.onclick = () => {
        authModal.classList.remove('hidden');
    };
}
