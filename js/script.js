const API_URL = "https://script.google.com/a/macros/upao.edu.pe/s/AKfycbx9BsoxHdGikM_DkNqVS0AaHcVTXTtisfMNKtMCUPSZQCbyb8ZO3pp1brL7Uzfc31aleQ/exec";  // Reemplaza con tu URL de API


document.addEventListener("DOMContentLoaded", function () {
    generarCategorias();
});

// Datos de categorías e ítems
const categorias = {
    "DTI": ["Proyector", "Teclado", "Mouse", "CPU", "Monitor", "Control Remoto", "Buffer"],
    "Mobiliario": ["Ecran", "Pizarra", "Escritorio", "Carpetas", "Silla Docente", "Acrílico", "Rotulado", "Tableros / Bancos", "Mesas / Sillas"],
    "Ventanas": ["Vidrios", "Seguros de Ventanas", "Pavonado", "Rollers", "Cortinas"],
    "Pintura": ["Paredes", "Techo"],
    "Pisos": ["Pisos", "Socalos", "Grietas o Fisuras"],
    "Puertas": ["Puerta", "Chapa", "Bisagras", "Cadena"],
    "Eléctricas": ["Luminarias", "Tomacorrientes", "Interruptores", "Ecran Electrónico", "Aire Acondicionado", "Control de Aire Acondicionado", "Canaletas Eléctricas"],
    "Ventilación": ["Ventiladores de Pared", "Ventiladores de Techo", "Extractor de Aire"]
};

// Estados posibles
const estados = ["Óptimo", "Defectuoso", "No cuenta", "No aplica"];

// Generar categorías en el formulario
function generarCategorias() {
    const categoriasContainer = document.getElementById("categorias-container");

    for (const [categoria, items] of Object.entries(categorias)) {
        const section = document.createElement("div");
        section.classList.add("category-block");

        const title = document.createElement("h3");
        title.textContent = `Estado de Bienes (${categoria})`;
        section.appendChild(title);

        const table = document.createElement("table");
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `<th>Item</th>` + estados.map(e => `<th>${e}</th>`).join("") + `<th>Observaciones</th>`;
        table.appendChild(headerRow);

        items.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${item}</td>` + estados.map(e => `<td><input type="radio" name="${categoria}_${item}" value="${e}" required></td>`).join("") +
                `<td><textarea name="observaciones_${categoria}_${item}" placeholder="Observaciones"></textarea></td>`;
            table.appendChild(row);
        });

        section.appendChild(table);
        categoriasContainer.appendChild(section);
    }
}

// Manejar el envío del formulario
document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    const aula = document.getElementById("aula").value || "No especificado";
    const aforo = document.getElementById("aforo").value || "0";

    let data = [];

    document.querySelectorAll(".category-block").forEach(categoryBlock => {
        const categoriaElement = categoryBlock.querySelector("h3");
        if (!categoriaElement) return; // Si no hay categoría, continuar
        
        const categoria = categoriaElement.textContent.replace("Estado de Bienes (", "").replace(")", "");

        categoryBlock.querySelectorAll("tr").forEach(row => {
            const itemElement = row.cells[0];
            if (!itemElement) return; // Si no hay ítem, continuar
            
            const item = itemElement.textContent;
            const selectedRadio = [...row.querySelectorAll("input[type='radio']")].find(radio => radio.checked);
            const estado = selectedRadio ? selectedRadio.value : "No seleccionado";
            const observacionesElement = row.querySelector("textarea");

            const observaciones = observacionesElement ? observacionesElement.value : "Sin observaciones";

            data.push({
                aula: aula,
                aforo: aforo,
                categoria: categoria,
                item: item,
                estado: estado,
                observaciones: observaciones
            });
        });
    });

    console.log("Datos a enviar:", data); // Depuración

    // Enviar datos al backend (Google Apps Script)
    fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(() => {
        alert("Datos enviados correctamente");
        document.getElementById("formulario").reset();
    }).catch(error => {
        console.error("Error:", error);
        alert("Hubo un error al enviar los datos.");
    });
});
