/** Nombre:  procesar **/
/** Descripción: Válida el número ingresado en el formulario, cálcula el dígito de verificación dependiento 
 ** del tipo (aleatoria, predeterminada) **/
/** Parámetros: tipo: Indica el tipo de clave privada que se va a generar.
 **     1. aleatoria
 **     2. predeterminada **/
function procesar (tipo){
    var numero = document.getElementById("number"); //Obtiene el objeto html que contiene el campo del formulario

    if(!numero.value){ //Si el número esta vacio
        alert("El número no puede estar vacio, por favor ingresa un número");
    }
    else if(isNaN(!numero.value)){ //Si el valor ingresado no es un número
        alert("El valor ingresado no es un número, por favor ingresa un número");
    }
    else{ //Si el valor es un número
        var clavePrivada = generarClavePrivada(numero.value.length, tipo); //Obtiene la clave privada
        var digito = generarDigito(clavePrivada, numero.value); //Obtiene el dígito de verificación
        document.getElementById("digito").innerHTML = '- ' + digito; //Muestra el dígito en la pantall
    }
}

/** Nombre: generarDigito **/
/** Descripción: calcula el dígito de verificación con clave predeterminada o aleatoria **/
/** Parámetros: clavePrivada: clave privada, clavePublica: número ingresado en el formulario **/
/** Retorna: Retorna el dígito calculado **/
function generarDigito(clavePrivada, clavePublica){

    var multiTemp = 0; //Guarda el resultado de la multiplicación
    var suma = 0; //Guarda el acumulado de la suma

    //Por cada dígito de la clave privada
    for(var i =0; i<clavePrivada.length; i++ ){

        multiTemp = clavePublica[i] * clavePrivada[i]; //Multiplica el valor de la clave privada por el valor de la clave pública en la posición [i]
        suma = suma + multiTemp; //Guarda la suma
    }

    var resto = suma % 11; //calcula el resto de la disión de la suma entre 11
    var digito = 11-resto; //sustrae el valor del resto de 11

    digito = (digito >9)? 0 : digito; //Si el resultado del residuo es de 2 dígitos el resultado es 0

    return digito;
}

/** Nombre:  generarClavePrivada **/
/** Descripción:  Genera la clave privada dependiendo del tipo **/
/** Parámetros: longitud: longitud de la clave privada que se generará, tipo: Indica el tipo de clave privada que se va a generar.
 **     1. aleatoria
 **     2. predeterminada **/
/** Retorna:  Retorna la clave privada generada **/
function generarClavePrivada (longitud, tipo){

    var clavePrivada = ''; //Clave privada
    var tmp = 1; //Variable temporal para clave predeterminada

    for(var i =0; i<longitud; i++ ){
        if(tipo == 1){ //Si es aleatoria
            clavePrivada = clavePrivada + Math.floor((Math.random() * 9) + 1); //Genera un numero aleatorio entre 0 a 9
        }
        else{ //Si es clave predeterminada
            clavePrivada = clavePrivada + tmp.toString(); //Clave estándar 123123123
            tmp ++; //Suma 1 a la clave
            if(tmp > 3){ //Si es mayor a 3
                tmp =1; //Devuelve a 1 la clave temporal
            } 
        }
    }

    document.getElementById("clave_privada").innerHTML = clavePrivada; //Muestra la clave privada en la página
    return clavePrivada;
}

/** Nombre:  limpiar **/
/** Descripción: Limpia los valores de la página **/
function limpiar(){
    document.getElementById("clave_privada").innerHTML = "";
    document.getElementById("digito").innerHTML = '';
    document.getElementById("number").value = "";
}