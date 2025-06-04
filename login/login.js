// login.js - COMPLETE REPLACEMENT
document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            window.location.href = "index.html";
        } else {
            showAlert(data.message || "Login failed", "error");
        }
    } catch (error) {
        showAlert("Network error. Please try again.", "error");
    }
});

function showAlert(message, type) {
    const alert = document.createElement("div");
    alert.className = `alert ${type}`;
    alert.textContent = message;
    
    const form = document.getElementById("loginForm");
    form.prepend(alert);
    
    setTimeout(() => alert.remove(), 3000);
}