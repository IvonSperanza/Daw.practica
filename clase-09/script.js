// script.js
window.onload = function () {
  var formulario = document.getElementById("formulario");
  var modal = document.getElementById("modal");
  var modalContent = document.getElementById("modal-content");
  var titulo = document.getElementById("titulo-dinamico");

  var campos = [
    "nombre", "email", "password", "repetir", "edad",
    "telefono", "direccion", "ciudad", "postal", "dni"
  ];

  for (var i = 0; i < campos.length; i++) {
    agregarEventos(campos[i]);
  }

  function agregarEventos(id) {
    var campo = document.getElementById(id);
    var error = document.getElementById("error-" + id);

    campo.onblur = function () {
      var mensaje = validarCampo(id, campo.value);
      error.textContent = mensaje;
    };

    campo.onfocus = function () {
      error.textContent = "";
    };

    if (id === "nombre") {
      campo.onkeydown = function () {
        setTimeout(function () {
          titulo.textContent = "HOLA " + campo.value;
        }, 10);
      };
      campo.onfocus = function () {
        titulo.textContent = "HOLA " + campo.value;
        error.textContent = "";
      };
    }
  }

  function validarCampo(id, valor) {
    if (id === "nombre") {
      if (valor.length <= 6 || valor.indexOf(" ") === -1) return "Debe tener más de 6 letras y un espacio.";
    } else if (id === "email") {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(valor)) return "Email no válido.";
    } else if (id === "password") {
      if (valor.length < 8 || !(/[a-zA-Z]/.test(valor) && /\d/.test(valor))) return "Debe tener al menos 8 caracteres, letras y números.";
    } else if (id === "repetir") {
      var original = document.getElementById("password").value;
      if (valor !== original) return "Las contraseñas no coinciden.";
    } else if (id === "edad") {
      if (parseInt(valor, 10) < 18 || isNaN(parseInt(valor, 10))) return "Debe ser mayor o igual a 18.";
    } else if (id === "telefono") {
      if (!/^\d{7,}$/.test(valor)) return "Teléfono inválido (solo números, al menos 7).";
    } else if (id === "direccion") {
      if (valor.length < 5 || valor.indexOf(" ") === -1) return "Dirección inválida (al menos 5 caracteres y un espacio).";
    } else if (id === "ciudad") {
      if (valor.length < 3) return "Ciudad inválida.";
    } else if (id === "postal") {
      if (valor.length < 3) return "Código postal inválido.";
    } else if (id === "dni") {
      if (!/^\d{7,8}$/.test(valor)) return "DNI inválido (7 u 8 dígitos).";
    }
    return "";
  }

  formulario.onsubmit = function (e) {
    e.preventDefault();
    var errores = [];
    var datos = {};

    for (var i = 0; i < campos.length; i++) {
      var id = campos[i];
      var valor = document.getElementById(id).value;
      var mensaje = validarCampo(id, valor);
      document.getElementById("error-" + id).textContent = mensaje;
      if (mensaje !== "") errores.push(mensaje);
      datos[id] = valor;
    }

    if (errores.length === 0) {
      mostrarModal("Datos enviados correctamente:", datos);
    } else {
      mostrarModal("Errores encontrados:", errores);
    }
  };

  function mostrarModal(titulo, contenido) {
    modal.className = "mostrar";
    var html = "<h3>" + titulo + "</h3>";
    if (contenido instanceof Array) {
      html += "<ul>";
      for (var i = 0; i < contenido.length; i++) {
        html += "<li>" + contenido[i] + "</li>";
      }
      html += "</ul>";
    } else {
      html += "<pre>" + JSON.stringify(contenido, null, 2) + "</pre>";
    }
    modalContent.innerHTML = html;
  }

  window.cerrarModal = function () {
    modal.className = "hidden";
  };
};
