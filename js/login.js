const API_URL = "https://script.google.com/macros/s/AKfycbzWZ2ejIA78mcXVUz1-3Lb8vPINtkaRL3_SUKXbkvnt9bBHU2ASRjqDcgjhM7Kdkmb1SQ/exec"; // Reemplaza con tu URL de API

document.addEventListener("DOMContentLoaded", function () {
    // Asegúrate de que el botón con id loginBtn esté presente en el DOM
    const loginButton = document.getElementById("loginBtn");
    
    if (loginButton) {
        loginButton.addEventListener("click", function () {
            const email = document.getElementById("email").value;

            if (email) {
                fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `email=${email}`
                })
                .then(response => response.json())
                .then(data => {
                    if (data.authorized) {
                        window.location.href = "menu.html"; // Redirigir al menú si es autorizado
                    } else {
                        alert("Correo no autorizado. Acceso denegado.");
                    }
                })
                .catch(error => console.error("Error:", error));
            } else {
                alert("Por favor, ingresa tu correo electrónico.");
            }
        });
    } else {
        console.error("No se encontró el botón de login");
    }
});
