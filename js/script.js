const cartas = ['2_of_clubs.png', '2_of_diamonds.png', '2_of_hearts.png', '2_of_spades.png','3_of_clubs.png', '3_of_diamonds.png', '3_of_hearts.png', '3_of_spades.png','4_of_clubs.png', '4_of_diamonds.png', '4_of_hearts.png', '4_of_spades.png','5_of_clubs.png', '5_of_diamonds.png', '5_of_hearts.png', '5_of_spades.png','6_of_clubs.png', '6_of_diamonds.png', '6_of_hearts.png',  '7_of_diamonds.png', '7_of_hearts.png', '7_of_spades.png','8_of_clubs.png', '8_of_diamonds.png', '8_of_hearts.png', '8_of_spades.png','9_of_clubs.png', '9_of_diamonds.png', '9_of_hearts.png', '9_of_spades.png','10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png','ace_of_clubs.png', 'ace_of_diamonds.png','ace_of_hearts.png', 'ace_of_spades2.png','jack_of_clubs.png', 'jack_of_diamonds.png', 'jack_of_hearts.png', 'jack_of_spades.png','king_of_clubs.png', 'king_of_diamonds.png', 'king_of_hearts.png', 'king_of_spades.png','queen_of_clubs.png', 'queen_of_diamonds.png', 'queen_of_hearts.png', 'queen_of_spades.png'];
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
const btnRepartir = document.getElementById("btn__repartir");
const ir = document.getElementById("ir");
const rendirse = document.getElementById("rendirse");

hora.style.color= "var(--oro)";
hora.style.opacity=0;
enviar.disabled=true;
noIr.disabled=true;
ir.style.display="none";
rendirse.style.display="none";
apuesta.style.display="none";

let yaApostado=0;

let baraja  = [];
const barajarCartas = () =>{
        borrarCartas(cartasCPU);
        borrarCartas(cartasMesa);
        borrarCartas(cartasJugador);
        baraja = [...cartas];
        numerosMesa = [];
        tiposMesa = [];
        yaApostado = 0;
        ronda = 0;
        totalEnRonda = 0;
        hora.textContent="¡Es hora de elegir tu apuesta!";
        hora.style.opacity=0;
        apuesta.style.display="flex";
        btnRepartir.style.display="none";
        enviar.style.display = "block";
        noIr.style.display = "block";
        ir.style.display = "none";
        rendirse.style.display = "none";
        enviar.disabled=true;
        noIr.disabled=true;
        baraja.sort(() => Math.random() - 0.5);
        ciega();
        repartirCartasInicio();
}

const ciega = () => {
    saldo.textContent = parseInt(saldo.textContent) - 100;
    totalApuesta.textContent=200;
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
        if(event.target.textContent.includes('+'))
            cantidad.value= parseInt(cantidad.value)+100;
        if(cantidad.value>0 && event.target.textContent.includes('-'))
            cantidad.value= parseInt(cantidad.value)-100;
    }
}

let numerosMesa = Array();
let tiposMesa = Array();
const comprobarCartasEnMesa = () => {
    if(cartasMesa.children.length==3){
        for(i=0; i<3; i++){
            let c = cartasMesa.children[i].src.split("images/")[1];
            let cNumber  = c.split("_")[0];
            let cType = c.split("of_")[1].replace(".png","");
            numerosMesa.push(cNumber);
            tiposMesa.push(cType);
        }
    }
    if(cartasMesa.children.length==4){
        let c = cartasMesa.children[3].src.split("images/")[1];
        let cNumber  = c.split("_")[0];
        let cType = c.split("of_")[1].replace(".png","");
        numerosMesa.push(cNumber);
        tiposMesa.push(cType);
    }
    if(cartasMesa.children.length==5){
        let c = cartasMesa.children[4].src.split("images/")[1];
        let cNumber  = c.split("_")[0];
        let cType = c.split("of_")[1].replace(".png","");
        numerosMesa.push(cNumber);
        tiposMesa.push(cType);
    }    
}

const comprobarIguales = (cant, c1Number, c2Number) => {
    let arrayNumberAux = [];
    arrayNumberAux = [...numerosMesa,c1Number,c2Number];
    let hay=false;
    arrayNumberAux.forEach(numero => {
        let cont = 0;
        arrayNumberAux.forEach(numero1 => {
            if(numero==numero1)
                cont++;
        });
        if(cont==cant)
            hay= true;
    });
    return hay;
}

const comprobarPareja = (c1Number,c2Number) =>{
    return comprobarIguales(2,c1Number,c2Number);
}

const comprobarTrio = (c1Number,c2Number) => {
    return comprobarIguales(3,c1Number,c2Number);
}

const comprobarPoker = (c1Number,c2Number) =>{
    return comprobarIguales(4,c1Number,c2Number);
}

const comprobarDoblePareja = (c1Number,c2Number) => {
    let arrayNumberAux = [];
    arrayNumberAux = [...numerosMesa,c1Number,c2Number];
    let hayDoblePareja=false;
    let cont2=0;
    let yaContados = [];
    arrayNumberAux.forEach(numero => {
        if (!yaContados.includes(numero)) {
            let cont = 0;
            arrayNumberAux.forEach(numero1 => {
                if(numero==numero1)
                    cont++;
            });
            if (cont == 2) {
                cont2++;
                yaContados.push(numero);
            }
        }
    });
    if(cont2>=2)
        hayDoblePareja=true;
    return hayDoblePareja;
}

const comprobarColor =  (c1Type,c2Type) => {
    let arrayTypeAux = [];
    arrayTypeAux = [...tiposMesa, c1Type, c2Type];
    let hayColor=false;
    arrayTypeAux.forEach(tipo => {
        let cont = 0;
        arrayTypeAux.forEach(tipo1 => {
            if(tipo==tipo1)
                cont++;
        });
        if(cont>=5)
            hayColor=true;
    });
    return hayColor;
}

const remplazo = (array) =>{
    array.forEach((n,i) => {
        array[i]=n.replace("jack", "11").replace("queen", "12").replace("king","13").replace("ace","14");
    });
    return array;
}

const comprobarEscalera = (c1Number, c2Number) => {
    let arrayNumberAux = [...numerosMesa,c1Number,c2Number];
    let arraySinDuplicados = [];
    arrayNumberAux.forEach((numero) => {
        if (!arraySinDuplicados.includes(numero)) {
            arraySinDuplicados.push(numero);
        }
    });
    arraySinDuplicados=remplazo(arraySinDuplicados);
    let arrayOrdenado = arraySinDuplicados.sort((a,b) => a - b);
    let hayEscalera = false;
    let consecutivos = 1;
    for (let i = 0; i < arrayOrdenado.length-1; i++) {
        if (arrayOrdenado[i] == ((arrayOrdenado[i + 1]) - 1)) {
            consecutivos++;
        } else {
            consecutivos = 1;
        }
        if (consecutivos >= 5) {
            hayEscalera=true;
        }
    }
    return hayEscalera;
};

const comprobarEscaleraColor = (c1Number, c2Number, c1Type, c2Type) => {
    let arrayNumberAux = [];
    arrayNumberAux = [...numerosMesa,c1Number,c2Number];
    let arrayTypeAux = []
    arrayTypeAux = [...tiposMesa, c1Type, c2Type];
    let arraySinDuplicados = [];
    arrayNumberAux.forEach((numero) => {
        if (!arraySinDuplicados.includes(numero)) {
            arraySinDuplicados.push(numero);
        }
    });
    let consecutivos = 1;
    arrayNumberAux=remplazo(arrayNumberAux);
    arraySinDuplicados=remplazo(arraySinDuplicados);
    let arrayOrdenado = arraySinDuplicados.sort((a,b) => a - b);
    let hayEscalera = false;
    let numConsecutivos = [];
    for (let i = 0; i < arrayOrdenado.length-1; i++) {
        if (arrayOrdenado[i + 1] == (parseInt(arrayOrdenado[i]) + 1)) {
            consecutivos++;
            numConsecutivos.push(arrayOrdenado[i]);
        } else {
            consecutivos = 1;
        }  
        if (consecutivos >= 5) {
            hayEscalera = true; 
        }     
    }
    let tipos = [];
    numConsecutivos.forEach(num => {
        let index = arrayNumberAux.indexOf(num);
        if (index != -1)
            tipos.push(arrayTypeAux[index]);
    });
    const todosDelMismoTipo = tipos.every((tipo) => tipo == tipos[0]);
    return hayEscalera && todosDelMismoTipo;
};

const dineroEnJuego = (apostadoMaquina) =>{
    let apuestaJugador=parseInt(miApuesta.textContent);
    let total= parseInt(apostadoMaquina)+parseInt(apuestaJugador);
    let totalAux= parseInt(totalApuesta.textContent);
    total+=totalAux;
    totalApuesta.textContent="";
    totalApuesta.textContent=total;
    miApuesta.textContent=0;
}

const borrarCartas = (array) => {
    Array.from(array.children).forEach(carta => {
        carta.remove();
    });
}

const finRonda = () => {
    enviar.disabled=true;
    noIr.disabled=true;
    apuesta.style.display="none";
    btnRepartir.style.display= "block";
    btnRepartir.disabled=true;
    setTimeout(()=>{
        btnRepartir.disabled=false;
    },1000);
    setTimeout (() => { 
        cartasCPU.children[0].src=carta1;
    }, 250);
    setTimeout (() => { 
        cartasCPU.children[1].src=carta2;
    }, 500);

}

const ganaJugador = () =>{
    let ganancia=parseInt(totalApuesta.textContent);
    saldo.textContent = parseInt(saldo.textContent) + ganancia;
    totalApuesta.textContent = 0;
    finRonda();
}

const ganaMaquina = () => {
    totalApuesta.textContent = 0;
    finRonda();
}

const mano = (c1Number,c2Number,c1Type,c2Type) => {
    let pareja = comprobarPareja(c1Number,c2Number);
    let doblePareja =  comprobarDoblePareja(c1Number,c2Number);
    let trio =  comprobarTrio(c1Number,c2Number);
    let full = false;
    if(pareja && trio)
        full = true;
    let escalera =  comprobarEscalera(c1Number,c2Number);
    let color = comprobarColor(c1Type,c2Type); 
    let escaleraColor =  comprobarEscaleraColor(c1Number, c2Number, c1Type, c2Type);
    let poker =  comprobarPoker(c1Number,c2Number);

    if(poker)
        return 8;
    else if (escaleraColor)
        return 7;
    else if (color)
        return 6;
    else if (escalera)
        return 5;
    else if (full)
        return 4;
    else if (trio){
        return 3;
    }
    else if (doblePareja)
        return 2;
    else if (pareja)
        return 1;
    else
        return 0;
}

let ronda = 0;
let apostadoMaquina=0;
const comprobarManoMaquina = (c1Number,c2Number,c1Type,c2Type) => {
    let num = mano(c1Number,c2Number,c1Type,c2Type);
    let aux = [remplazoNum(c1Number), remplazoNum(c2Number)];
    if(num==8 || num==7 || num==6 || num==5){
        if(miApuesta.textContent == 0){
            apostadoMaquina=(parseInt(miApuesta.textContent)+100)*2;
            yaApostado=apostadoMaquina;
            dineroEnJuego(apostadoMaquina);
            hora.textContent = "La máquina ha apostado, ¿quieres igualar o retirarte?";
            hora.style.opacity = 1;
            enviar.style.display = "none";
            noIr.style.display = "none";
            ir.style.display = "block";
            rendirse.style.display = "block";
            return false;
        }else{
            apostadoMaquina=(parseInt(miApuesta.textContent))*2;
            dineroEnJuego(apostadoMaquina);
        }
        
    }else if(num==4 || num==3 || num==2 || num==1){
        if(miApuesta.textContent == 0){
            apostadoMaquina=100;
            yaApostado=apostadoMaquina;
            dineroEnJuego(apostadoMaquina);
            hora.textContent = "La máquina ha apostado, ¿quieres igualar o retirarte?";
            hora.style.opacity = 1;
            enviar.style.display = "none";
            noIr.style.display = "none";
            ir.style.display = "block";
            rendirse.style.display = "block";
            return false;
        }else{
            apostadoMaquina=(parseInt(miApuesta.textContent));
            dineroEnJuego(apostadoMaquina);
        }
        
    }else if(miApuesta.textContent>0){
            if(aux[0]>9 && aux[1]>10 && ronda==0){
                ronda++;
                apostadoMaquina=(parseInt(miApuesta.textContent));
                dineroEnJuego(apostadoMaquina);
            }else{
                dineroEnJuego(apostadoMaquina);
                hora.textContent="Gana el jugador por retirada de la Maquina";
                hora.style.opacity=1;
                enviar.disabled=true;
                noIr.disabled=true;
                ganaJugador();
            }
    } 
    return true;
}

const apuestaMaquina = () =>{
    let c1 = carta1.split("images/")[1];
    let c2 = carta2.split("images/")[1];
    let c1Number  = c1.split("_")[0];
    let c2Number  = c2.split("_")[0];
    let c1Type =  c1.split("of_")[1].replace(".png","");
    let c2Type =  c2.split("of_")[1].replace(".png","");

    comprobarCartasEnMesa();
    return comprobarManoMaquina(c1Number,c2Number,c1Type,c2Type);
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
    apuestaMaquina();
    if(apuesta.style.display != "none")
        repartirMesa();
}

const pasarNumNombre = (mano) => {
    let mm="";
    if(mano == 8)
        mm = "Poker";
    if(mano == 7)
        mm = "Escalera Color";
    if(mano == 6)
        mm = "Color";
    if(mano == 5)
        mm = "Escalera";
    if(mano == 4)
        mm = "Full";
    if(mano == 3)
        mm = "Trio";
    if(mano == 2)
        mm = "Doble Pareja";
    if(mano == 1)
        mm = "Pareja";
    if(mano == 0)
        mm = "Farol";
    return mm;
}

const remplazoNum = (n) => {
    return n.replace("jack", "11").replace("queen", "12").replace("king","13").replace("ace","14");
}

const comprobarGanador = () =>{
    // Maquina
    let c1 = carta1.split("images/")[1];
    let c2 = carta2.split("images/")[1];
    let c1Number  = c1.split("_")[0];
    let c2Number  = c2.split("_")[0];
    let c1Type =  c1.split("of_")[1].replace(".png","");
    let c2Type =  c2.split("of_")[1].replace(".png","");
    let manoMaquina = mano(c1Number,c2Number,c1Type,c2Type);
    let mm = pasarNumNombre(manoMaquina);

    // Jugador
    let j1 = cartasJugador.children[0].src.split("images/")[1];
    let j2 = cartasJugador.children[1].src.split("images/")[1];
    let j1Number  = j1.split("_")[0];
    let j2Number  = j2.split("_")[0];
    let j1Type =  j1.split("of_")[1].replace(".png","");
    let j2Type =  j2.split("of_")[1].replace(".png","");
    let manoJugador = mano(j1Number,j2Number,j1Type,j2Type);
    let mj = pasarNumNombre(manoJugador);

    // Comprobar
    if(manoJugador>manoMaquina){
        hora.textContent="Gana el jugador con "+mj;
        hora.style.opacity=1;
        ganaJugador();
    }
    if(manoMaquina>manoJugador){
        hora.textContent="Gana la Maquina con "+mm;
        hora.style.opacity=1;
        ganaMaquina();
    }
    if(manoMaquina==manoJugador){
        j1Number=remplazoNum(j1Number);
        j2Number=remplazoNum(j2Number);
        
        let numerosJugador = [parseInt(j1Number), parseInt(j2Number)];
        numerosJugador=numerosJugador.sort((a,b)=> b - a);

        c1Number=remplazoNum(c1Number);
        c2Number=remplazoNum(c2Number);

        let numerosMaquina = [parseInt(c1Number), parseInt(c2Number)];
        numerosMaquina=numerosMaquina.sort((a,b)=> b - a);
        
        if (numerosJugador[0] > numerosMaquina[0]){
            hora.textContent="Gana el jugador con "+mj;
            hora.style.opacity=1;
            ganaJugador();
        }
        if (numerosJugador[0] < numerosMaquina[0]){
            hora.textContent="Gana la Maquina con "+mm;
            hora.style.opacity=1;
            ganaMaquina();
        }
        if (numerosJugador[0] == numerosMaquina[0]){
            if (numerosJugador[1] > numerosMaquina[1]){
                hora.textContent="Gana el jugador con "+mj+" y su carta mas alta ";
                hora.style.opacity=1;
                ganaJugador();
            }
            if (numerosJugador[1] < numerosMaquina[1]){
                hora.textContent="Gana la Maquina con "+mm;
                hora.style.opacity=1;
                ganaMaquina();
            }
            if  (numerosJugador[1] == numerosMaquina[1]){
                hora.textContent="Empate, en este caso Gana la Maquina";
                hora.style.opacity=1;
                ganaMaquina();
            }
        }
    }
    if(saldo.textContent == 0){
        setTimeout(() => {
            window.location.href = "./derrota.html";
        }, 500);
    }
}

const repartirMesa = () =>{
    if(cartasMesa.children.length<5)
        repartir(cartasMesa,1);
    else{
        hora.style.opacity=0;
        enviar.disabled=true;
        noIr.disabled=true;
        comprobarGanador();
    }
}

const rindeJugador = () => {
    hora.textContent = "Gana la Maquina por rendición del jugador";
    totalApuesta.textContent = 0;
    finRonda();
}

const seguirJugando = () => {
    let miApu = yaApostado;
    if(miApu < parseInt(saldo.textContent)){
        saldo.textContent= parseInt(saldo.textContent)-miApu;
        totalApuesta.textContent = parseInt(totalApuesta.textContent)+yaApostado;
    }else{
        totalApuesta.textContent = parseInt(totalApuesta.textContent)+parseInt(saldo.textContent);
        saldo.textContent=0;
    }
    hora.style.opacity=0;
    enviar.style.display = "block";
    noIr.style.display = "block";
    ir.style.display = "none";
    rendirse.style.display = "none";
    hora.textContent = "¡Es hora de elegir tu apuesta!";
    repartirMesa();
}

const pasarApuesta = () =>{
    hora.style.opacity=0;
    enviar.style.display = "block";
    noIr.style.display = "block";
    ir.style.display = "none";
    rendirse.style.display = "none";
    enviar.disabled=true;
    noIr.disabled=true;
    let b = apuestaMaquina();
    if(b)
        repartirMesa();
}

btnRepartir.addEventListener("click", barajarCartas);
apuesta.addEventListener("click", apostar)
enviar.addEventListener("click", enviarApuesta);
noIr.addEventListener("click", pasarApuesta);
ir.addEventListener("click", seguirJugando);
rendirse.addEventListener("click", rindeJugador);