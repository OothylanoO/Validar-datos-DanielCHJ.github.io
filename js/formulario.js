const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{6,16}$/,
	nombre: /^[a-zA-ZÀ-ÿ\s]{6,24}$/,
	password: /^.{6,12}$/,
  };

const campos = {
	usuario: false,
	nombre: false,
	password: false,
  };

const userInput = {
	usuario: "my_username",
	nombre: "John Doe",
	password: "my_secure_password",
  };

function validateField(field, value) {
	if (expresiones[field].test(value)) {
	  campos[field] = true;
	} else {
	  campos[field] = false;
	}
  }
  

for (const campo in userInput) {
	if (userInput.hasOwnProperty(campo)) {
	  validateField(campo, userInput[campo]);
	}
  }
  console.log(campos);

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
	}
}

const validarCampo = (expresion, input, campo) => {
	const grupoCampo = document.getElementById(`grupo__${campo}`);
	const iconoCampo = grupoCampo.querySelector(`i`);
	const errorCampo = grupoCampo.querySelector(`.formulario__input-error`);
  
	if (expresion.test(input.value)) {
	  grupoCampo.classList.remove('formulario__grupo-incorrecto');
	  grupoCampo.classList.add('formulario__grupo-correcto');
	  iconoCampo.classList.add('fa-check-circle');
	  iconoCampo.classList.remove('fa-times-circle');
	  errorCampo.classList.remove('formulario__input-error-activo');
	  campos[campo] = true;
	} else {
	  grupoCampo.classList.add('formulario__grupo-incorrecto');
	  grupoCampo.classList.remove('formulario__grupo-correcto');
	  iconoCampo.classList.add('fa-times-circle');
	  iconoCampo.classList.remove('fa-check-circle');
	  errorCampo.classList.add('formulario__input-error-activo');
	  campos[campo] = false;
	}
  };
  
  const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');
	const grupoPassword2 = document.getElementById(`grupo__password2`);
	const iconoPassword2 = grupoPassword2.querySelector(`i`);
	const errorPassword2 = grupoPassword2.querySelector(`.formulario__input-error`);
  
	if (inputPassword1.value !== inputPassword2.value) {
	  grupoPassword2.classList.add('formulario__grupo-incorrecto');
	  grupoPassword2.classList.remove('formulario__grupo-correcto');
	  iconoPassword2.classList.add('fa-times-circle');
	  iconoPassword2.classList.remove('fa-check-circle');
	  errorPassword2.classList.add('formulario__input-error-activo');
	  campos['password'] = false;
	} else {
	  grupoPassword2.classList.remove('formulario__grupo-incorrecto');
	  grupoPassword2.classList.add('formulario__grupo-correcto');
	  iconoPassword2.classList.remove('fa-times-circle');
	  iconoPassword2.classList.add('fa-check-circle');
	  errorPassword2.classList.remove('formulario__input-error-activo');
	  campos['password'] = true;
	}
  };
  
  inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
  });
  
  formulario.addEventListener('submit', (e) => {
	e.preventDefault();
  
	const terminos = document.getElementById('terminos');
	if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
	  formulario.reset();
	  document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
	  setTimeout(() => {
		document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
	  }, 5000);
	  document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
		icono.classList.remove('formulario__grupo-correcto');
	  });
	} else {
	  document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
  });
  