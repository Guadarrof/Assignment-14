const names=document.getElementById("nameInput");
const surname=document.getElementById("surnameInput");
const dni=document.getElementById("dniInput");
const cuil=document.getElementById("cuilInput");
const nroId=document.getElementById("idNumInput");
const address=document.getElementById("addressInput");

//Errors

const nameError=document.getElementById("nameError");
const surnameError=document.getElementById("surnameError");
const idError=document.getElementById("idError");
const nroIdError=document.getElementById("idNumError");
const addressError=document.getElementById("addressError");

//Buttons

const submitBtn=document.getElementById("submitForm")

//Intento 1 = 

// let validForm=''

// function validateName(){
//     namesVal=names.value;
//     let regExp = new RegExp("^[A-Za-záéíóúüñ]{1}[a-záéíóúüñ]$");
//     if(!regExp.test(namesVal)){
//         nameError.innerText="Este campo no acepta numeros ni espacios y a excepcion de la primera, las letras deben ser minusculas"
//         validForm=false;
//     }else{
//         if(!testLength(namesVal, 3, 10)){
//             nameError.innerText=msge;
//             validForm=false
//         }else{
//             nameError.innerText="";
//             validForm=true;
//         }
//     }
// }

// function validateForm(e){
//     validForm=true;
//     e.preventDefault();
//     validateName();

// }


// submitBtn.addEventListener("click", validateForm);


//Intento 2

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
        regexError: "Este campo no acepta espacios y solo carcateres alfabeticos",
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
                element.error.innerText="This element is required";
                validForm=false;
            }
        } else if(!rightLength){
            element.error.innerText=`This input requires ${element.minLength} to ${element.maxLength} characters`;
            validForm=false;
        } else if (!element.regex.test(inputValue)){
            element.error.innerText= element.regexError;
            validForm=false;
        }
    })
}

function validateForm(e){
    e.preventDefault();
    validForm = true;
    validString();
}

submitBtn.addEventListener("click", validateForm);