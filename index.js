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


function testLength(field, minLength, maxLength){
    if(field.length <= minLength){
        return false;
    } else if(field.length >= maxLength){
        return false;
    }
    return true;
}

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

const strgToValidate=[
    {
        field:names,
        required:false,
        minLength:3,
        maxLength:10,
        regex:/^[A-Za-záéíóúüñ]{1}[a-záéíóúüñ]$/,
        error:nameError
    },
    {
        field:surname,
        required:true,
        minLength:2,
        maxLength:20,
        regex:/^[a-zA-ZáéíóúüÁÉÍÓÚÜ'']+$/,
        error:surnameError
    },
    {
        field:address,
        required:false,
        minLength:10,
        maxLength:200,
        regex:/^[a-zA-ZáéíóúüãõâêîôûàèìòùÁÉÍÓÚÜÃÕÂÊÎÔÛÀÈÌÒÙ\s0-9,.\-()/°'"]+$/,
        error:addressError
    }
   
]

function validString(){
    strgToValidate.forEach(element => {
        let inputValue=element.field.value;
        let emptyField= inputValue.trim() === "";
        let rightLength= testLength(inputValue, element.minLength, element.maxLength);
        if(element.required){
            if(emptyField){
                validForm=false;
                element.error.innerText="This element is required";
            }else{
                if (!rightLength){
                    element.error.innerText=`This input requires ${element.minLength} to ${element.maxLength} characters`;
                    validForm=false;   
                } else{
                    element.error.innerText="";   
                    validForm=true;
                }
            }
        } else if (!emptyField){
            if (!rightLength){
                element.error.innerText=`This input requires ${element.minLength} to ${element.maxLength} characters`;
                validForm=false;   
                } else{
                    element.error.innerText="";   
                    validForm=true;
                }
        }
    });
}

function validateForm(e){
    e.preventDefault();
    validForm = true;
    validString();
}

submitBtn.addEventListener("click", validateForm);