const API_URL = "https://script.google.com/a/macros/upao.edu.pe/s/AKfycbx9BsoxHdGikM_DkNqVS0AaHcVTXTtisfMNKtMCUPSZQCbyb8ZO3pp1brL7Uzfc31aleQ/exec"; // Reemplaza con tu URL de API

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
