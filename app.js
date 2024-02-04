let keyboardColor = "#242424"
let keyActivatedColor = "red"
let keyNextColor = "blue"
let selectedArray = leccion_1;
let index = 0
let errores = 0;
const letras = document.querySelector("#letras")
const limiteCaracteresPantalla = 27

//cuando se selecciona una leccion / mostrar 27 caracteres
selectedArray.forEach((element, i) => {
    letras.value += element

});


nextKey()

document.addEventListener("keydown", (e)=>{

    for(let i in teclas[e.code]){
        teclas[e.code][i].style.backgroundColor = keyActivatedColor

        //modificar /revisar

        if(teclas[e.code][i].textContent == selectedArray[index]){
            updateLetras(index)
            index++;
            letras.style.borderColor = "black"
        }else{
            letras.style.borderColor = "red"
            errores++;
        } 
    }
})

    document.addEventListener("keyup", (e) =>{
        resetColor(e.code)
        nextKey()
})

function resetColor(code){
    for(let x in teclas[code]){
        teclas[code][x].style.backgroundColor = keyboardColor
    }
}

function updateLetras(){
    
    let updated = letras.value.substr(1, selectedArray.length)
    letras.value = updated
}

//mostrar tecla que se debe undir
function nextKey(){
    for(let i in teclas){
        if(teclas[i].html.textContent == selectedArray[index]){
            teclas[i].html.style.backgroundColor = keyNextColor
        }
    }
}


