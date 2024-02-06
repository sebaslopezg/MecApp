let keyboardColor = "#242424"
let keyActivatedColor = "red"
let keyNextColor = "blue"
let selectedArray =""
let arrayIsSelected = false
let index = 0
let errores = 0;
let setError;
let gameOver = false;
const letras = document.querySelector("#letras")
const errorDisplay = document.querySelector("#error_display")
const limiteCaracteresPantalla = 27

//Eventos

document.addEventListener("click", (e) =>{
    try{
        if (gameOver) {
            reset()
        }
        let target = e.target.id
        selectedArray = formatearTexto(lecciones[target])
        selectArray()
        arrayIsSelected = true
        nextKey()

    }catch{

    }
})

//otro pequeño test

document.addEventListener("keydown", (e)=>{

    if (arrayIsSelected) {
        if (!cronometroActivado) {
            activarCronometro()
        }
    
        if(!gameOver){
            for(let i in teclas[e.code]){
                //teclas[e.code][i].style.backgroundColor = keyActivatedColor
        
                //modificar /revisar
        
                if(teclas[e.code][i].textContent == selectedArray[index]){
                    updateLetras(index)
                    index++;
                    letras.style.borderColor = "black"
                    setError = false;
                }else{
                    setError = true;
                } 
            }
        
            if (letras.value == "") {
                letras.value = "Terminaste!"
                gameOver = true
                clearInterval(cronometroCall)
                porcentajeDeErrores()
            }
        }else{
    
        }   
    }

})

document.addEventListener("keyup", (e) =>{

    if (arrayIsSelected) {
        resetColor(e.code)
        nextKey()
    
        if(setError){
            letras.style.borderColor = "red"
            errores++;
            errorDisplay.innerHTML = "| Errores : " + errores + " |"
        }    
    }

})

//FUNCIONES

function selectArray(){
    letras.value = "";
    selectedArray.forEach((element, i) => {
        letras.value += element
    
    })
}


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

function error() {
    letras.style.borderColor = "red"
    errores++;
    errorDisplay.innerHTML = "| Errores : " + errores
}

//cronometro
let minutos = "00", segundos = "00", milisegundos = "00", cronometroDisplay = document.querySelector("#cronometro")
let cronometroCall;
let cronometroActivado = false;

function cronometro(){
    milisegundos++
    if (milisegundos < 10) {
        milisegundos = "0" + milisegundos
    }

    if (milisegundos > 59) {
        milisegundos = "00"
        segundos++

        if (segundos < 10) {
            segundos = "0" + segundos
        }
    }



    if (segundos > 59) {
        segundos = "00"
        minutos++

        if(minutos < 10){
            minutos = "0" + minutos
        }
    }
    cronometroDisplay.textContent = `${minutos}:${segundos}:${milisegundos}`
}

function activarCronometro(){
    cronometroActivado = true;
    cronometroCall = setInterval(cronometro, 100)
}

function porcentajeDeErrores(){
    let porcentaje
    let displayPorcentaje = document.querySelector("#porcentajeErrores")
    porcentaje = parseInt(errores * 100 / selectedArray.length) 
    displayPorcentaje.textContent = `| Porcentaje de errores: ${porcentaje}%` 
}

function formatearTexto(texto){
    let arrData, arrBase = new Array, respuesta = new Array;
    let limite, espacio = false
    arrData = texto.split(" ")
    limite = (arrData.length + arrData.length)-1

    let index = 0;
    for(let i = 0; i < limite; i++){

        if(!espacio){
            arrBase.push(arrData[index])
            index++
            espacio = true
        }else{
            arrBase.push(" ")
            espacio = false
        }
    }

    let arrayTemporal
    arrBase.forEach( element =>{
        if (element == " ") {
            respuesta.push(" ")
        }else{
            arrayTemporal = element.split("")
            arrayTemporal.forEach( e => {
                respuesta.push(e)
            })
        }
            
    })

    return respuesta;
}

function reset(){
    arrayIsSelected = false
    letras.value = "";
    selectedArray =""
    gameOver = false
    index = 0
    errores = 0;
    cronometroDisplay.textContent = `00:00:00`
}
