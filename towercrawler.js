const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonReiniciar = document.getElementById('boton-reiniciar')
const BotonPersonaje = document.getElementById('boton-pj')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarPersonaje = document.getElementById('seleccionar-pj')
const botonSiguienteMazmorra = document.getElementById('boton-siguiente-mazmorra')
const spanResultadoMazmorra = document.getElementById('resultado-mazmorra')

const barrasDeVida = document.getElementById('barras-vidas');
const barraVidaJugador = document.getElementById('barra-jugador');
const barraVidaEnemigo = document.getElementById('barra-enemigo');

const spanPersonajeJugador =  document.getElementById('personaje-jugador')
const spanPersonajeEnemigo = document.getElementById('personaje-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorEnemigo = document.getElementById('contenedorEnemigo')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerEscenario = document.getElementById('ver-escenario')
const escenario = document.getElementById('escenario')


let personajes = []
let enemigos = []
let posicionActualMazmorra = 0
let resultadoMazmorra
let estaEnEnemigo = false
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDePersonajes
let enemigoEncontrado
let inputHechicero
let inputGuerrero
let inputPersonajeEnemigo
let personajeJugador
let personajeJugadorObjeto
let personajeEnemigo
let personajeEnemigoObjeto
let ataquesPersonaje
let ataquesPersonajeEnemigo
let botonMagia
let botonEspada
let botonDaga
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0 
let vidasJugador = 0
let vidasEnemigo = 0
let lienzo = escenario.getContext("2d")
let intervalo
let escenarioBackground = new Image()
escenarioBackground.src = './assets/canvas.png'
let alturaQueBuscamos
let anchoDelescenario = window.innerWidth - 20
const anchoMaximoDelescenario = 450

if (anchoDelescenario > anchoMaximoDelescenario) {
    anchoDelescenario = anchoMaximoDelescenario - 20
}

alturaQueBuscamos = anchoDelescenario * 600/800

escenario.width = anchoDelescenario
escenario.height = alturaQueBuscamos

class Personaje {
    constructor(nombre, foto, vida, fotoBack) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoBack
        this.ancho = 95
        this.alto = 95
        this.x = 105
        this.y = 160
    }
    pintarPersonaje() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

class Enemigo {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = new Image()
        this.foto.src = foto
        this.vida = vida
        this.ataquesEnemigo = []
        this.ancho = 65
        this.alto = 65
        this.x = 220
        this.y = 140
    }
    pintarEnemigo() {
        lienzo.drawImage(
            this.foto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hechicero = new Personaje('Hechicero', './assets/mago.png', 5, './assets/magoback.png')
let guerrero = new Personaje('Guerrero', './assets/warrior-bruto-custom2.png', 5, './assets/guerrero-back.png')

let goblin = new Enemigo('Goblin', './assets/enemigos/goblin-1.png', 5)

const HECHICERO_ATAQUES = [
    {nombre: '🎇', id:'boton-magia' },
    {nombre: '⚔', id:'boton-espada' },
    {nombre: '🔪', id:'boton-daga' },
]
hechicero.ataques.push(...HECHICERO_ATAQUES)

const GUERRERO_ATAQUES = [
    {nombre: '🎇', id:'boton-magia' },
    {nombre: '⚔', id:'boton-espada' },
    {nombre: '🔪', id:'boton-daga' },
]
guerrero.ataques.push(...GUERRERO_ATAQUES)

const GOBLIN_ATAQUES = [
    {nombre: '🎇', id:'boton-magia' },
    {nombre: '⚔', id:'boton-espada' },
    {nombre: '🔪', id:'boton-daga' },
]
goblin.ataquesEnemigo.push(...GOBLIN_ATAQUES)


//personajes.push(hechicero)
personajes.push(hechicero,guerrero)

enemigos.push(goblin)

let mazmorra1 = ['',goblin]

console.log(personajes)
console.log(enemigos)
console.log(mazmorra1)

function iniciarJuego(){
 
    sectionSeleccionarAtaque.style.display = 'none'
    barrasDeVida.style.display = 'none'
    sectionVerEscenario.style.display = 'none'

    personajes.forEach((personaje) => {
        opcionDePersonajes = `
        <input type="radio" name="personaje" id=${personaje.nombre} />
        <label class="tarjeta-de-personaje" for=${personaje.nombre}>
            <p style="margin-bottom: 100px;">${personaje.nombre}</p>
            <img src=${personaje.foto} alt=${personaje.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDePersonajes
        
        inputHechicero = document.getElementById('Hechicero')
        inputGuerrero = document.getElementById('Guerrero')
    })
    //console.log(opcionDePersonajes)

    BotonPersonaje.addEventListener('click', seleccionarPersonajeJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarPersonajeJugador() {
    sectionSeleccionarPersonaje.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none'
    
    if (inputHechicero.checked) {
        spanPersonajeJugador.innerHTML = inputHechicero.id
        personajeJugador = inputHechicero.id
        console.log('Se selecciono hechicero');
        console.log(spanPersonajeJugador)
    } else if (inputGuerrero.checked) {
        spanPersonajeJugador.innerHTML = inputGuerrero.id
        personajeJugador = inputGuerrero.id
        console.log('Se selecciono guerrero');
    } else {
        alert('Selecciona un personaje')
    }
    extraerAtaques(personajeJugador)
    sectionVerEscenario.style.display = 'flex'
    iniciarMapa() 
}

function extraerAtaques(personajeJugador) {

    sectionSeleccionarAtaque.style.display = 'none'

    console.log('Extrayendo ataques de personaje jugador: ', personajeJugador)
    let ataques
    for (let i = 0; i < personajes.length; i++) {
        if (personajeJugador === personajes[i].nombre) {
            ataques = personajes[i].ataques
        }
    }
    console.log('Los ataques del jugador son: ', ataques)
    mostrarAtaques(ataques)
}

function obtenerObjetoPersonaje() {
    console.log('Se esta obteniendo objeto persona jugador: ', personajeJugador)
    for (let i = 0; i < personajes.length; i++) {
        if (personajeJugador === personajes[i].nombre) {
            return personajes[i]
        }
        console.log(personajes[i])
    }
}

function obtenerVidaMaximaObjetoPersonajeJugador() {
    console.log('Se esta obteniendo vida maxima objeto persona jugador: ', personajeJugador)
    for (let i = 0; i < personajes.length; i++) {
        if (personajeJugador === personajes[i].nombre) {
            return personajes[i].vida
        }
        console.log(personajes[i].vida)
    }
}


function mostrarAtaques(ataques) {
    
    ataques.forEach((ataque) => {
        ataquesPersonaje = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque"></button>
        `
        //${ataque.nombre} iba entre medio
        contenedorAtaques.innerHTML += ataquesPersonaje
    })

     botonMagia = document.getElementById('boton-magia')
     botonEspada = document.getElementById('boton-espada')
     botonDaga = document.getElementById('boton-daga')
     botones = document.querySelectorAll('.BAtaque')

}

function recorrerMazmorra() {

sectionSeleccionarAtaque.style.display = 'none'
        
    if (posicionActualMazmorra < mazmorra1.length) {
        console.log('Se esta recorriendo la mazmorra')
        let elementoActual = mazmorra1[posicionActualMazmorra]
        if (typeof elementoActual === 'object') {
            seleccionarPersonajeEnemigo(elementoActual)
            estaEnEnemigo = true;
            resultadoMazmorra = `<p class="resultado-mazmorra" style="margin: 0px;margin-bottom: 0px;">Has encontrado al enemigo ${elementoActual.nombre}</p>`
            spanResultadoMazmorra.innerHTML = resultadoMazmorra
            //spanPersonajeEnemigo.innerHTML = elementoActual.nombre
            personajeEnemigoObjeto = obtenerObjetoPersonajeEnemigo()
        
            if (personajeEnemigoObjeto) {
                revisarVidas()
                secuenciaAtaque()
            } else {
                console.log('No se pudo obtener el objeto del personaje enemigo')
            }
        } else {
            console.log('Pasillo vacío, deteniéndose')
            resultadoMazmorra = `<p class="resultado-mazmorra" style="margin: 0px;margin-bottom: 0px;">Te encuentras en un pasillo vacio...</p>`
            spanResultadoMazmorra.innerHTML = resultadoMazmorra
            posicionActualMazmorra++
            estaEnEnemigo = false
        }
    } else {
        console.log('Ya has recorrido todas las mazmorras')
    }
}

function seleccionarPersonajeEnemigo(elementoActual) {
    console.log('Se selecciono personaje enemigo: ', elementoActual)
    personajeEnemigo = elementoActual.nombre
    console.log('Se ha elegido personaje enemigo: ',personajeEnemigo)
    //console.log(spanPersonajeEnemigo)
    //ataquesPersonajeEnemigo = enemigo.ataquesEnemigo
    //personajeEnemigo = enemigo.nombre // Asignar el nombre del enemigo a la variable personajeEnemigo
    //personajeEnemigoObjeto = enemigo; // Setear personajeEnemigoObjeto
    //actualizarBarrasVidas(); // Actualiza barras de vida luego de setear al personajeEnemigoObjeto
    //console.log('Se selecciono personaje enemigo: ', personajeEnemigo)
    extraerAtaquesEnemigo(personajeEnemigo)
    obtenerObjetoPersonajeEnemigo(personajeEnemigo)
}

function obtenerObjetoPersonajeEnemigo() {
    //console.log('Se esta obteniendo objeto persona enemigo: ', personajeEnemigo)
    for (let i = 0; i < enemigos.length; i++) {
        if (personajeEnemigo === enemigos[i].nombre) {
            return enemigos[i]
        }
        console.log(enemigos[i])
    }
    //actualizarBarrasVidas(); // Actualiza barras de vida luego de setear al personajeEnemigoObjeto
    //secuenciaAtaque()
}

function obtenerVidaMaximaPersonajeObjetoEnemigo() {
    console.log('Se esta obteniendo vida maxima objeto personaje enemigo: ', personajeEnemigo)
    for (let i = 0; i < enemigos.length; i++) {
        if (personajeEnemigo === enemigos[i].nombre) {
            return enemigos[i].vida
        }
        console.log(enemigos[i].vida)
    }
}

function extraerAtaquesEnemigo(personajeEnemigo) {
    console.log('Extrayendo ataques enemigos de: ',personajeEnemigo)
    let ataquesEnemigo
    for (let i = 0; i < enemigos.length; i++) {
        if (personajeEnemigo === enemigos[i].nombre) {
            ataquesEnemigo = enemigos[i].ataquesEnemigo
        }
    }
    //ataquesEnemigo = ataquesPersonajeEnemigo
    console.log('Los ataques del enemigo son: ', ataquesEnemigo)
    //ataqueAleatorioEnemigo(personajeEnemigo)
    //revisarVidas()
    secuenciaAtaque()
}

function iniciarMapa() {
    
    sectionSeleccionarAtaque.style.display = 'none'

    personajeJugadorObjeto = obtenerObjetoPersonaje(personajeJugador)
    console.log(personajeJugadorObjeto, personajeJugador)
    
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    botonSiguienteMazmorra.addEventListener('click', recorrerMazmorra)
    //window.addEventListener('keyup', detenerMovimiento)
    console.log('Se inicio el mapa')
}

function secuenciaAtaque() {

    //revisarVidas()

    botonSiguienteMazmorra.style.display = 'none'
    console.log('Iniciando secuencia de ataque contra enemigo: ', personajeEnemigo)
    barrasDeVida.style.display = 'flex' // muestra barras de vida
    if (personajeEnemigoObjeto) {
        actualizarBarrasVidas(); // Actualizar barras de vida solo si hay un enemigo
    }
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🎇') {
                ataqueJugador.push('MAGIA')
                indexAtaqueJugador = ('MAGIA')
                console.log('Ataque personaje elegido: ',ataqueJugador)
                //boton.disabled = true   
            } else if (e.target.textContent === '⚔') {
                ataqueJugador.push('ESPADA')
                indexAtaqueJugador = ('ESPADA')
                console.log('Ataque personaje elegido: ',ataqueJugador)
                //boton.disabled = true  
            } else {
                ataqueJugador.push('DAGA')
                indexAtaqueJugador = ('DAGA')
                console.log('Ataque personaje elegido: ',ataqueJugador)
                //boton.disabled = true  
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function ataqueAleatorioEnemigo() {
    console.log('Personaje enemigo elegido para ataque aleatorio', personajeEnemigo)
    //console.log('Ataques enemigo', ataquesPersonajeEnemigo);
    
    let ataqueAleatorioEnemigo = aleatorio(0, ataqueEnemigo.length - 1)
    
    if (ataqueAleatorioEnemigo === 0) {
        ataqueEnemigo.push('MAGIA')
        indexAtaqueEnemigo = 'MAGIA'
    } else if (ataqueAleatorioEnemigo === 1) {
        ataqueEnemigo.push('ESPADA')
        indexAtaqueEnemigo = 'ESPADA'
    } else {
        ataqueEnemigo.push('DAGA')
        indexAtaqueEnemigo = 'DAGA'
    }
    console.log('Ataque aleatorio enemigo elegido: ', ataqueEnemigo)
    iniciarPelea()
}

// function ataqueAleatorioEnemigo() {
//     console.log('Personaje enemigo elegido para ataque aleatorio', personajeEnemigo)
//     console.log('Ataques enemigo', ataquesPersonajeEnemigo);
//     let ataqueAleatorioEnemigo = aleatorio(0,ataquesPersonajeEnemigo.length-1)
    
//     if (ataqueAleatorioEnemigo === 0 ) {
//         ataqueEnemigo.push('MAGIA')
//         indexAtaqueEnemigo = ('MAGIA')
//     } else if (ataqueAleatorioEnemigo === 1 ) {
//         ataqueEnemigo.push('ESPADA')
//         indexAtaqueEnemigo = ('ESPADA')
//     } else {
//         ataqueEnemigo.push('DAGA')
//         indexAtaqueEnemigo = ('DAGA')
//     }
//     console.log('Ataque aleatorio enemigo elegido: ', ataqueEnemigo)
//     iniciarPelea()
// }

// function iniciarPelea() {
//     if (ataqueJugador.length === 1) {
//         combate()
//     }
// }

function iniciarPelea() {
    if (ataqueJugador.length === ataqueEnemigo.length) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    console.log('Se inicio combate con ', personajeEnemigo)  

    if (ataqueJugador.length > 0 && ataqueEnemigo.length > 0) {
        let ataqueJ = ataqueJugador[0]
        let ataqueE = ataqueEnemigo[0]
        
        if(ataqueJ === ataqueE) {
            console.log('EMPATE')
            crearMensaje("EMPATE")
        } else if (
            (ataqueJ === 'MAGIA' && ataqueE === 'ESPADA') ||
            (ataqueJ === 'ESPADA' && ataqueE === 'DAGA') ||
            (ataqueJ === 'DAGA' && ataqueE === 'MAGIA')
        ) {
            console.log('GANASTE')
            crearMensaje("GANASTE")
            personajeEnemigoObjeto.vida--
        } else {
            console.log('PERDISTE')
            crearMensaje("PERDISTE")
            personajeJugadorObjeto.vida--
        }
        
        actualizarBarrasVidas()
        console.log('Combate finalizado');

        // Limpiar los arrays de ataque
        ataqueJugador = []
        ataqueEnemigo = []
    } else {
        console.log('No hay ataques para procesar');
    }
    revisarVidas()
}

// function combate() {
//     console.log('Se inicio combate con ', personajeEnemigo)  

//     // Asegurarse de que hay ataques para procesar
//     if (ataqueJugador.length > 0 && ataqueEnemigo.length > 0) {
//         // Procesar solo el último ataque
//         //let index = ataqueJugador.length - 1;
        
//         if(ataqueJugador[index] === ataqueEnemigo[index]) {
//             indexAmbosOponente(index, index)
//             console.log('EMPATE')
//             crearMensaje("EMPATE")
//         } else if (
//             (ataqueJugador[index] === 'MAGIA' && ataqueEnemigo[index] === 'ESPADA') ||
//             (ataqueJugador[index] === 'ESPADA' && ataqueEnemigo[index] === 'DAGA') ||
//             (ataqueJugador[index] === 'DAGA' && ataqueEnemigo[index] === 'MAGIA')
//         ) {
//             indexAmbosOponente(index, index)
//             console.log('GANASTE')
//             crearMensaje("GANASTE")
//             personajeEnemigoObjeto.vida--
//         } else {
//             indexAmbosOponente(index, index)
//             console.log('PERDISTE')
//             crearMensaje("PERDISTE")
//             personajeJugadorObjeto.vida--
//         }
        
//         actualizarBarrasVidas()
//         console.log('Combate finalizado');
//     } else {
//         console.log('No hay ataques para procesar');
//     }
//     revisarVidas()
// }

// function combate() {
//     console.log('Se inicio combate con ', personajeEnemigo)  

//     for (let index = 0; index < ataqueJugador.length; index++) {
//         if(ataqueJugador[index] === ataqueEnemigo[index]) {
//             indexAmbosOponente(index, index)
//             crearMensaje("EMPATE")
//             actualizarBarrasVidas()
//         } else if (ataqueJugador[index] === 'MAGIA' && ataqueEnemigo[index] === 'ESPADA') {
//             indexAmbosOponente(index, index)
//             crearMensaje("GANASTE")
//             personajeEnemigoObjeto.vida--
//             //spanVidasEnemigo.innerHTML = personajeEnemigoObjeto.vida
//             actualizarBarrasVidas()
//         } else if (ataqueJugador[index] ==='ESPADA' && ataqueEnemigo[index] === 'DAGA') {
//             indexAmbosOponente(index, index)
//             crearMensaje("GANASTE")
//             personajeEnemigoObjeto.vida--
//             //spanVidasEnemigo.innerHTML = personajeEnemigoObjeto.vida--
//             actualizarBarrasVidas()
//         } else if (ataqueJugador[index] === 'DAGA' && ataqueEnemigo[index] === 'MAGIA') {
//             indexAmbosOponente(index, index)
//             crearMensaje("GANASTE")
//             personajeEnemigoObjeto.vida--
//             //spanVidasEnemigo.innerHTML = personajeEnemigoObjeto.vida--
//             actualizarBarrasVidas()
//         } else {
//             indexAmbosOponente(index, index)
//             crearMensaje("PERDISTE")
//             personajeJugadorObjeto.vida--
//             //spanVidasJugador.innerHTML = personajeJugadorObjeto.vida
//             actualizarBarrasVidas()
//         }
//     }
//     console.log('Combate finalizado');
//     revisarVidas()
// }

function revisarVidas() {
    console.log('se esta revisando la vida de: ', personajeJugador, 'y ', personajeEnemigo)
    
    if (!personajeJugadorObjeto || !personajeEnemigoObjeto) {
        console.log('Uno o ambos objetos de personaje no están definidos');
        return;
    }
    
    console.log('Vida jugador: ', (personajeJugadorObjeto.vida))
    console.log('Vida enemigo: ', (personajeEnemigoObjeto.vida))

    if (personajeEnemigoObjeto.vida <= 0) {
        console.log('Vida enemigo: ', (personajeEnemigoObjeto.vida))
        sectionSeleccionarAtaque.style.display = 'none'
        barrasDeVida.style.display = 'none';
        crearMensajeFinal("Lograste sobrevivir a la batalla!")
    } else if (personajeJugadorObjeto.vida <= 0) {
        sectionSeleccionarAtaque.style.display = 'none'
        barrasDeVida.style.display = 'none';
        crearMensajeFinal('Tu vida ha llegado a su fin...')
    } else if (personajeEnemigoObjeto.vida > 0 ){
        secuenciaAtaque()
    }
}

function actualizarBarrasVidas() {
    console.log('Actualizando barras de vida');
    console.log('Vida del jugador:', personajeJugadorObjeto.vida);
    console.log('Vida del enemigo:', personajeEnemigoObjeto.vida);

    // const vidaMaximaJugador = 5; // Ajusta esto según la vida máxima real de tu jugador
    const vidaMaximaJugador = obtenerVidaMaximaObjetoPersonajeJugador(personajeJugador);
    // const vidaMaximaEnemigo = 5; // Ajusta esto según la vida máxima real de tu enemigo
    const vidaMaximaEnemigo = obtenerVidaMaximaPersonajeObjetoEnemigo(personajeEnemigo)
    const porcentajeVidaJugador = (personajeJugadorObjeto.vida / vidaMaximaJugador) * 100;
    const porcentajeVidaEnemigo = (personajeEnemigoObjeto.vida / vidaMaximaEnemigo) * 100;

    // Actualizar barra del jugador
    let barraJugador = document.querySelector('#barra-jugador div');
    if (!barraJugador) {
        barraJugador = document.createElement('div');
        document.getElementById('barra-jugador').appendChild(barraJugador);
    }
    barraJugador.style.width = `${porcentajeVidaJugador}%`;

    // Actualizar barra del enemigo
    let barraEnemigo = document.querySelector('#barra-enemigo div');
    if (!barraEnemigo) {
        barraEnemigo = document.createElement('div');
        document.getElementById('barra-enemigo').appendChild(barraEnemigo);
    }
    barraEnemigo.style.width = `${porcentajeVidaEnemigo}%`;

    // Actualizar nombres y cantidades de vida
    document.getElementById('nombre-jugador').textContent = personajeJugadorObjeto.nombre;
    document.getElementById('vida-jugador-texto').textContent = `${personajeJugadorObjeto.vida}/${vidaMaximaJugador}`;

    if (personajeEnemigoObjeto) {
        document.getElementById('nombre-enemigo').textContent = personajeEnemigoObjeto.nombre;
        document.getElementById('vida-enemigo-texto').textContent = `${personajeEnemigoObjeto.vida}/${vidaMaximaEnemigo}`;
    }

    barrasDeVida.style.display = 'flex';
    console.log('Barras de vida actualizadas');
}

function crearMensaje(resultado) {
    //let nuevoAtaqueDelJugador = document.createElement('p')
    //let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    //nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    //nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    //ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    //ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    botonReiniciar.addEventListener('click', reiniciarJuego)
    sectionReiniciar.style.display = 'block'
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowLeft':
            teclaIzq()
            break
        case 'ArrowUp':
            teclaArriba()
            break    
        case 'ArrowRight':
            teclaDer()
            break
        default:
            break
    }
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {

    sectionSeleccionarAtaque.style.display = 'none'

    personajeJugadorObjeto.x = personajeJugadorObjeto.x
    personajeJugadorObjeto.y = personajeJugadorObjeto.y 

    lienzo.clearRect(0, 0, escenario.width, escenario.height)
    lienzo.drawImage(
        escenarioBackground,
        0,
        0,
        escenario.width,
        escenario.height
    )
    personajeJugadorObjeto.pintarPersonaje()
    
    if (personajeEnemigo != null) {
        //console.log('se encontro enemigo ', personajeEnemigo)
        personajeEnemigoObjeto = obtenerObjetoPersonajeEnemigo(personajeEnemigo)
        personajeEnemigoObjeto.x = personajeEnemigoObjeto.x
        personajeEnemigoObjeto.y = personajeEnemigoObjeto.y
        personajeEnemigoObjeto.pintarEnemigo()
        sectionSeleccionarAtaque.style.display = 'flex'
    }
}

function teclaIzq() {
    ataqueJugador.push('MAGIA')
    //indexAtaqueJugador = ataqueJugador['MAGIA']
    console.log(ataqueJugador)
    //combate(ataqueJugador.push('MAGIA'))
}

function teclaArriba() {
    ataqueJugador.push('ESPADA')
    //indexAtaqueJugador = ataqueJugador['ESPADA']
    console.log(indexAtaqueJugador)
    //combate(ataqueJugador.push('ESPADA'))
}

function teclaDer() {
    ataqueJugador.push('DAGA')
    //indexAtaqueJugador = ataqueJugador['DAGA']
    console.log(indexAtaqueJugador)
    //combate(ataqueJugador.push('DAGA'))
}

function reiniciarJuego() {
    location.reload()
}

window.addEventListener('load', iniciarJuego)