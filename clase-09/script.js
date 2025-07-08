window.onload = function () {
  var form = document.getElementById("subscription-form");
  var inputs = form.getElementsByTagName("input");

  function mostrarError(id, mensaje) {
    document.getElementById("error-" + id).innerText = mensaje;
  }

  function limpiarError(id) {
    document.getElementById("error-" + id).innerText = "";
  }

  function validarCampo(id) {
    var valor = document.getElementById(id).value;
    var valido = true;

    if (id === "nombre") {
      if (valor.length <= 6 || valor.indexOf(" ") === -1) {
        mostrarError(id, "Debe tener más de 6 letras y un espacio.");
        valido = false;
      }
    } else if (id === "email") {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(valor)) {
        mostrarError(id, "Formato de email inválido.");
        valido = false;
      }
    } else if (id === "password") {
      var rePass = /^[a-zA-Z0-9]{8,}$/;
      if (!rePass.test(valor)) {
        mostrarError(id, "Mínimo 8 caracteres, letras y números.");
        valido = false;
      }
    } else if (id === "repeat-password") {
      var pass = document.getElementById("password").value;
      if (valor !== pass) {
        mostrarError(id, "Las contraseñas no coinciden.");
        valido = false;
      }
    } else if (id === "edad") {
      if (isNaN(valor) || parseInt(valor) < 18) {
        mostrarError(id, "Debe ser un número mayor o igual a 18.");
        valido = false;
      }
    } else if (id === "telefono") {
      var reTel = /^[0-9]{7,}$/;
      if (!reTel.test(valor)) {
        mostrarError(id, "Mínimo 7 dígitos sin símbolos.");
        valido = false;
      }
    } else if (id === "direccion") {
      if (valor.length < 5 || valor.indexOf(" ") === -1) {
        mostrarError(id, "Debe tener letras, números y un espacio.");
        valido = false;
      }
    } else if (id === "ciudad") {
      if (valor.length < 3) {
        mostrarError(id, "Debe tener al menos 3 caracteres.");
        valido = false;
      }
    } else if (id === "codigo-postal") {
      if (valor.length < 3) {
        mostrarError(id, "Debe tener al menos 3 caracteres.");
        valido = false;
      }
    } else if (id === "dni") {
      var reDni = /^[0-9]{7,8}$/;
      if (!reDni.test(valor)) {
        mostrarError(id, "Debe ser un número de 7 u 8 dígitos.");
        valido = false;
      }
    }

    return valido;
  }

  for (var i = 0; i < inputs.length; i++) {
    (function (input) {
      input.onblur = function () {
        validarCampo(input.id);
      };
      input.onfocus = function () {
        limpiarError(input.id);
      };
    })(inputs[i]);
  }

  var titulo = document.getElementById("form-title");
  var nombreInput = document.getElementById("nombre");

  nombreInput.onkeydown = function () {
    setTimeout(function () {
      var nombre = nombreInput.value;
      titulo.innerText = "HOLA " + nombre;
    }, 0);
  };

  nombreInput.onfocus = function () {
    var nombre = nombreInput.value;
    titulo.innerText = "HOLA " + nombre;
  };

  form.onsubmit = function (e) {
    var validoFinal = true;
    var resumen = "";

    for (var j = 0; j < inputs.length; j++) {
      var id = inputs[j].id;
      var esValido = validarCampo(id);
      if (!esValido) {
        validoFinal = false;
      }
      resumen += id + ": " + inputs[j].value + "\n";
    }

    if (validoFinal) {
      alert("Formulario enviado con éxito:\n\n" + resumen);
    } else {
      alert("Errores encontrados en el formulario:\n\n" + resumen);
    }

    return false;
  };
};
