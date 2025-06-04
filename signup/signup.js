// signup.js - NEW FILE
document.getElementById("signupForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    if (document.getElementById("password").value !== 
        document.getElementById("confirmPassword").value) {
        showAlert("Passwords don't match", "error");
        return;
    }
    
    try {
        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showAlert("Account created! Redirecting...", "success");
            setTimeout(() => window.location.href = "login.html", 1500);
        } else {
            showAlert(data.message || "Signup failed", "error");
        }
    } catch (error) {
        showAlert("Network error. Please try again.", "error");
    }
});

function showAlert(message, type) {
    const alert = document.createElement("div");
    alert.className = `alert ${type}`;
    alert.textContent = message;
    
    const form = document.getElementById("signupForm");
    form.prepend(alert);
    
    setTimeout(() => alert.remove(), 3000);
}