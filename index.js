const names=document.getElementById("nameInput");
const surname=document.getElementById("surnameInput");
const dni=document.getElementById("dniInput");
const cuil=document.getElementById("cuilInput");
const nroId=document.getElementById("idNumInput");
const address=document.getElementById("addressInput");

//Errors

const nameError=document.getElementById("nameError");
const surnameError=document.getElementById("surnameError");
const nroIdError=document.getElementById("idNumError");
const addressError=document.getElementById("addressError");

//Buttons

const submitBtn=document.getElementById("submitForm")

nroId.disabled=true;
let validForm=true;

function testLength(field, minLength, maxLength){
    if(field.length <= minLength){
        return false;
    } else if(field.length >= maxLength){
        return false;
    }
    return true;
}

const strgToValidate=[
    {
        field:names,
        required:false,
        minLength:3,
        maxLength:10,
        regex:/^[A-Za-záéíóúüñ]{1}[a-záéíóúüñ]+$/,
        regexError: "Este campo solo acepta la primera letra mayuscula y solo caracteres alfabeticos",
        error:nameError
    },
    {
        field:surname,
        required:true,
        minLength:2,
        maxLength:20,
        regex:/^[a-zA-ZáéíóúüÁÉÍÓÚÜ'']+$/,
        regexError: "Este campo solo carcateres alfabeticos sin espacios",
        error:surnameError
    },
    {
        field:address,
        required:false,
        minLength:10,
        maxLength:200,
        regex:/^[a-zA-ZáéíóúüãõâêîôûàèìòùÁÉÍÓÚÜÃÕÂÊÎÔÛÀÈÌÒÙ\s0-9,.\-()/°'"]+$/,
        regexError: "Este campo solo acepta caracteres alfanumericos del idioma español y portugues",
        error:addressError
    }
   
]

function validString(){
    strgToValidate.forEach(element => {
        let inputValue=element.field.value;
        let emptyField= inputValue.trim() === "";
        let rightLength= testLength(inputValue, element.minLength, element.maxLength);
        element.error.innerText="";
        if(emptyField){
            if(element.required){
                element.error.innerText="Este campo es requerido";
                validForm=false;
            }
        } else if (!element.regex.test(inputValue)){
            element.error.innerText= element.regexError;
            validForm=false;
        } else if(!rightLength){
            element.error.innerText=`Este campo requiere de ${element.minLength} a ${element.maxLength} caracteres`;
            validForm=false;
        }
    })
}

function enableID(){
    if(dni.checked || cuil.checked){
        nroId.disabled = false;
    }
}

dni.addEventListener("change", enableID);
cuil.addEventListener("change", enableID);


function validDni(){
    nroIdError.innerText="";
    let idValue=nroId.value;
    let regEx= new RegExp(/^[0-9.]+$/);
    let validDni= regEx.test(idValue);
    if (!validDni){
        nroIdError.innerText="Este campo solo acepta componentes numericos";
    }else if(idValue.includes(".")){
        if((idValue.substring(2, 3).includes(".") && !idValue.substring(6, 7).includes(".")) || (!idValue.substring(2, 3).includes(".") && idValue.substring(5, 6).includes("."))){
            nroIdError.innerText="El formato con puntos requiere ambos (en millon y en mil)";
        }else if(!(idValue.substring(2, 3).includes(".") && idValue.substring(6, 7).includes("."))){
            nroIdError.innerText="Si se desean incluir puntos solo pueden tener formato DNI (xx.xxx.xxx)";
        }else if(idValue.length<9 || idValue.length>10){
            nroIdError.innerText="Este campo requiere como minimo 7 numeros y un maximo de 8";
        }
    }else if(idValue.length<7 || idValue.length>8){
        nroIdError.innerText="Este campo requiere como minimo 7 numeros y un maximo de 8";
    }
}

function validCuil(){
    nroIdError.innerText="";
    let idValue=nroId.value;
    let regEx= new RegExp(/^[0-9-]+$/);
    let validCuil= regEx.test(idValue);
    if(!validCuil){
        nroIdError.innerText="Este campo solo acepta numeros con o sin guiones";
    }else if(idValue.includes("-")){
        if(!(idValue.substring(2, 3).includes("-") && idValue.substring(11, 12).includes("-"))){
            nroIdError.innerText="El formato con guion permite solo que se coloque uno despues de los primeros dos y antes del ultimo numero (xx-xxxxxxxx-x))";
        }else if((idValue.substring(2, 3).includes("-") && !idValue.substring(11, 12).includes("-")) || (!idValue.substring(2, 3).includes("-") && idValue.substring(10, 11).includes("-"))){
            nroIdError.innerText="El formato Cuil permite solo que se coloquen ambos guiones o ninguno (xx-xxxxxxxx-x))";  
        }else if(idValue.length>13){
            nroIdError.innerText="Este campo requiere 11 numeros";
        }
    }else if(idValue.length<11 || idValue.length>11){
        nroIdError.innerText="Este campo requiere 11 numeros";
    }
}


function validId(){
    idValue=nroId.value;
    nroIdError.innerText="";
    if(idValue.trim() === ""){
        nroIdError.innerText="Este campo es requerido"
    }else{
        if(dni.checked){
            validDni();
        }else{
            validCuil();
        }
    }
}


function validateForm(e){
    e.preventDefault();
    validForm = true;
    validString();
    validId();
}

submitBtn.addEventListener("click", validateForm);