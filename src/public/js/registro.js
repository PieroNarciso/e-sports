

var error= document.getElementById("error")
var correcto=document.getElementById("exitoso")
var formulario=document.getElementsByName("formulario")[0]
var elementos=formulario.elements
var nombre=false;
var correo=false;

function validarcomun( e){
    if(formulario.nombre.value == 0){
        alert("Completa el campo nombre")
        e.preventDefault();
    }
    if(formulario.correo.value == 0){
        alert("Pon tu correo")
        e.preventDefault()
    }
    if(formulario.contrasena.value == 0){
        alert("Añade una contraseña")
        e.preventDefault()
    }
    if(formulario.equipo.value == 0){
        alert("Completa con tu equipo")
        e.preventDefault()
    }
    /*if(formulario.integrantes.value ==0){
        alert("Ingresa los integrantes")
        e.preventDefault()
    }*/
}

validar= function( e ){
    validarcomun(e);
}


formulario.addEventListener("submit",validar);