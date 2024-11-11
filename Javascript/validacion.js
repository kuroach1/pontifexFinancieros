console.log("Archivo validacion.js cargado correctamente");
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("precalificacionForm");

    // Función para mostrar un mensaje de error y cambiar el borde a rojo
    function showError(input, message) {
        let errorElement = input.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains("error-message")) {
            errorElement = document.createElement("div");
            errorElement.classList.add("error-message");
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
        errorElement.textContent = message;
        input.classList.add("error-input"); 
    }

    // Función para limpiar el mensaje de error y restaurar el borde
    function clearError(input) {
        let errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains("error-message")) {
            errorElement.textContent = "";
        }
        input.classList.remove("error-input");
    }

    // Función para limpiar todas las clases de error después de un envío exitoso
    function clearAllErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach((message) => message.remove());

        const errorInputs = document.querySelectorAll(".error-input");
        errorInputs.forEach((input) => input.classList.remove("error-input"));
    }

    // Función de validación
    function validateInput() {
        let isValid = true;

        // Validación de nombre completo
        const nombreContacto = document.getElementById("nombre-contacto");
        if (nombreContacto.value.trim() === "") {
            showError(nombreContacto, "Favor de ingresar nombre completo.");
            isValid = false;
        } else {
            clearError(nombreContacto);
        }

        // Validación de nombre de la empresa
        const nombreEmpresa = document.getElementById("nombre-empresa");
        if (nombreEmpresa.value.trim() === "") {
            showError(nombreEmpresa, "Favor de ingresar nombre de la empresa.");
            isValid = false;
        } else {
            clearError(nombreEmpresa);
        }

        // Validación de régimen fiscal
        const regimenFiscal = document.getElementById("regimen-fiscal");
        if (regimenFiscal.value === "") {
            showError(regimenFiscal, "Seleccione una opción.");
            isValid = false;
        } else {
            clearError(regimenFiscal);
        }

        // Validación de correo electrónico
        const correo = document.getElementById("correo");
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo.value.trim())) {
            showError(correo, "Favor de ingresar un correo electrónico válido.");
            isValid = false;
        } else {
            clearError(correo);
        }

        // Validación de teléfono 1
        const telefono1 = document.getElementById("telefono1");
        if (!/^\d{10}$/.test(telefono1.value.trim())) {
            showError(telefono1, "Ingrese un teléfono válido a 10 dígitos.");
            isValid = false;
        } else {
            clearError(telefono1);
        }

        // Validación de teléfono 2
        const telefono2 = document.getElementById("telefono2");
        if (!/^\d{10}$/.test(telefono2.value.trim())) {
            showError(telefono2, "Ingrese un teléfono válido a 10 dígitos.");
            isValid = false;
        } else {
            clearError(telefono2);
        }

        // Validación de al menos una opción en "Estoy interesado en"
        const interesOptions = document.querySelectorAll('input[name="interes"]:checked');
        const interesMessage = document.querySelector('.checkbox-group .error-message');
        if (interesOptions.length === 0) {
            if (!interesMessage) {
                const errorDiv = document.createElement("div");
                errorDiv.classList.add("error-message");
                errorDiv.textContent = "Seleccione al menos una opción.";
                document.querySelector(".checkbox-group").appendChild(errorDiv);
            }
            isValid = false;
        } else {
            if (interesMessage) {
                interesMessage.remove();
            }
        }
        return isValid;
    }

    // Evento de envío del formulario
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateInput()) {
            // Si es válido, limpiar todos los errores y restablecer el formulario
            alert("Formulario enviado correctamente");
            form.reset();
            setTimeout(clearAllErrors, 0);
        }
    });
});
