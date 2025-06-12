"use strict";
import { saveVote, getVotes } from './firebase.js';

const openLink = (id,url) => {
    const insta = document.getElementById(id);
    if (insta) {
        insta.addEventListener("click", () => {
            window.open(url, "_blank");
        });
    }
};

function enableForm() {
  const form = document.getElementById('form_voting');

  if (!form) {
    console.error("Formulario con id 'form_voting' no encontrado.");
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const select = document.getElementById('select_product');
    if (!select) {
      console.error("Elemento con id 'select_product' no encontrado.");
      return;
    }

    const productID = select.value;

    if (!productID) {
      console.warn("No se seleccionó ningún producto.");
      return;
    }

    try {
      const result = await saveVote(productID);
      console.log(result.message);
      await displayVotes();
    } catch (error) {
      console.error("Error al enviar el voto:", error);
    }

    form.reset(); // Limpia el formulario
  });
}

async function displayVotes() {
  const container = document.getElementById('results');

  if (!container) {
    console.error("Elemento con id 'results' no encontrado.");
    return;
  }

  const votes = await getVotes();
  container.innerHTML = ''; // Limpiar contenido previo

  if (!votes) {
    container.textContent = 'No hay votos registrados.';
    return;
  }

  // Contar votos por productID
  const voteCounts = {};
  Object.values(votes).forEach((vote) => {
    const productID = vote.productID;
    voteCounts[productID] = (voteCounts[productID] || 0) + 1;
  });

  // Crear tabla
  const table = document.createElement('table');
  table.border = '1';
  table.style.borderCollapse = 'collapse';
  table.style.marginTop = '1rem';

  const header = table.insertRow();
  const th1 = header.insertCell();
  th1.textContent = 'Producto';
  th1.style.padding = '8px 16px';
  const th2 = header.insertCell();
  th2.textContent = 'Total de Votos';
  th2.style.padding = '8px 16px';

  // Rellenar filas
  for (const [productID, count] of Object.entries(voteCounts)) {
    const row = table.insertRow();
    const cell1 = row.insertCell();
    cell1.textContent = productID;
    cell1.style.padding = '8px 16px';
    const cell2 = row.insertCell();
    cell2.textContent = count;
    cell2.style.padding = '8px 16px';
  }

  container.appendChild(table);
}



(() => {
    openLink("instagram","https://www.instagram.com/Americanspalopeca/");
    openLink("whatsapp","https://wa.me/573103000000");
    enableForm();
    displayVotes();
})();