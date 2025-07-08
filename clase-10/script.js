window.onload = function () {
  var form = document.getElementById("subscription-form");
  var modal = document.getElementById("modal");
  var modalContent = document.getElementById("modal-content");

  var saved = localStorage.getItem("subscriptionData");
  if (saved) {
    mostrarModal("Suscripción previa encontrada:", JSON.parse(saved));
  }

  form.onsubmit = function (e) {
    e.preventDefault();

    var elements = form.elements;
    var data = {};
    var i;

    for (i = 0; i < elements.length; i++) {
      if (elements[i].name) {
        data[elements[i].name] = elements[i].value;
      }
    }

    // Validación básica
    if (data.password !== data.confirmPassword) {
      mostrarModal("Error: Las contraseñas no coinciden.");
      return;
    }

    // Enviar los datos
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          var response = JSON.parse(xhr.responseText);
          localStorage.setItem("subscriptionData", JSON.stringify(data));
          mostrarModal("¡Suscripción exitosa!", data);
        } else {
          mostrarModal("Error al suscribirse. Código: " + xhr.status);
        }
      }
    };

    xhr.send(JSON.stringify(data));
  };

window.cerrarModal = function () {
  document.getElementById("modal").className = "hidden";
};
  function mostrarModal(titulo, datos) {
    modal.className = "";
    var html = "<h2>" + titulo + "</h2>";
    if (datos) {
      html += "<pre>" + JSON.stringify(datos, null, 2) + "</pre>";
    }
    modalContent.innerHTML = html;
  }
};
