const cartas = ['2_of_clubs.png', '2_of_diamonds.png', '2_of_hearts.png', '2_of_spades.png','3_of_clubs.png', '3_of_diamonds.png', '3_of_hearts.png', '3_of_spades.png','4_of_clubs.png', '4_of_diamonds.png', '4_of_hearts.png', '4_of_spades.png','5_of_clubs.png', '5_of_diamonds.png', '5_of_hearts.png', '5_of_spades.png','6_of_clubs.png', '6_of_diamonds.png', '6_of_hearts.png', '6_of_spades.png','7_of_clubs.png', '7_of_diamonds.png', '7_of_hearts.png', '7_of_spades.png','8_of_clubs.png', '8_of_diamonds.png', '8_of_hearts.png', '8_of_spades.png','9_of_clubs.png', '9_of_diamonds.png', '9_of_hearts.png', '9_of_spades.png','10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png','ace_of_clubs.png', 'ace_of_diamonds.png','ace_of_hearts.png', 'ace_of_spades2.png','jack_of_clubs.png', 'jack_of_diamonds.png', 'jack_of_hearts.png', 'jack_of_spades.png','king_of_clubs.png', 'king_of_diamonds.png', 'king_of_hearts.png', 'king_of_spades.png','queen_of_clubs.png', 'queen_of_diamonds.png', 'queen_of_hearts.png', 'queen_of_spades.png'];
const cartasJugador = document.getElementById("jugador");
const cartasMesa = document.getElementById("comun");
const cartasCPU = document.getElementById("cpu");
const apuesta = document.getElementById("apuesta");
const hora = document.getElementById("hora");
const cantidad = document.getElementById("cantidad");
const enviar = document.getElementById("enviar");
const noIr = document.getElementById("noIr");
const saldo =  document.getElementById("saldo");
const miApuesta = document.getElementById("apostado");
const totalApuesta = document.getElementById("total");


hora.style.color= "var(--oro)";
hora.style.opacity=0;
enviar.disabled=true;
noIr.disabled=true;

let baraja  = [...cartas];

const barajarCartas = () =>{
    baraja.sort(() => Math.random() - 0.5);
    repartirCartasInicio();
}
const repartirCartasInicio = () => {
    repartirTimeOut(cartasJugador, 2, 500);
    repartirTimeOut(cartasCPU,2,1000);
    repartirTimeOut(cartasMesa,3,1500);
}

const repartirTimeOut = (objetivo, cantidad, tiempo) =>{
    setTimeout (() => { 
        repartir(objetivo,cantidad);
    }, tiempo);
}

let carta1;
let carta2;
const repartir = (objetivo, cantidad) => {
    if(objetivo.id=="cpu"){
        for (let i = 0; i < cantidad; i++) {
            const carta = baraja.shift();
            const img = document.createElement('img');
            if( i  == 0)
                carta1="./assets/images/"+carta;
            else
                carta2="./assets/images/"+carta;
            img.src = "./assets/images/reverso.png";
            setTimeout (() => {
                objetivo.appendChild(img);
            }, 200*i);
        }
    }else{
        for (let i = 0; i < cantidad; i++) {
            const carta = baraja.shift();
            const img = document.createElement('img');
            img.src = "./assets/images/"+carta;
            setTimeout (() => {
                objetivo.appendChild(img);
            }, 200*i);
        }
    }
    setTimeout (() => {
        hora.style.opacity=1;
        enviar.disabled=false;
        noIr.disabled=false;
    }, 2000);
}

const apostar = (event) => {
    if(event.target.nodeName=="BUTTON"){
        if(event.target.textContent.includes('+')){
            cantidad.value= parseInt(cantidad.value)+100;
        }
        if(cantidad.value>0 && event.target.textContent.includes('-'))
            cantidad.value= parseInt(cantidad.value)-100;
        
    }
}


const enviarApuesta = () => {
    if(parseInt(cantidad.value)>parseInt(saldo.textContent)){
        cantidad.value=saldo.textContent;
    }
    let apu =  cantidad.value;
    saldo.textContent  = parseInt(saldo.textContent)-apu;
    let aux=  parseInt(miApuesta.textContent);
    miApuesta.textContent = parseInt(apu) + parseInt(aux);
    hora.style.opacity=0;
    enviar.disabled=true;
    noIr.disabled=true;
    repartirMesa();
}


const repartirMesa = () =>{
    if(cartasMesa.children.length<5)
        repartir(cartasMesa,1);
    else
        hora.style.opacity=0;
        enviar.disabled=true;
        noIr.disabled=true;
}

document.addEventListener("DOMContentLoaded", barajarCartas);
apuesta.addEventListener("click", apostar)
enviar.addEventListener("click", enviarApuesta);