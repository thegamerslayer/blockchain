async function handleSignup(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:5501/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, username, password })
  });

  const data = await response.json();

  if (response.ok) {
    alert("Signup successful!");
    window.location.href = "login.html";
  } else {
    alert("Signup failed: " + data.message);
  }
}