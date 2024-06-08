const sectionSeleccionarPersonaje = document.getElementById('seleccionar-pj')
const BotonPersonaje = document.getElementById('boton-pj')
const botonReiniciar = document.getElementById('boton-reiniciar')

const spanPersonajeJugador =  document.getElementById('personaje-jugador')
const spanPersonajeEnemigo = document.getElementById('personaje-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerEscenario = document.getElementById('ver-escenario')
const escenario = document.getElementById('escenario')
//123
let personajes = []
let ataqueJugador = []
let ataqueEnemigo = []
let inputHechicero
let PersonajeJugador
let PersonajeJugadorObjeto
let ataquesPersonaje
let ataquesPersonajeEnemigo
let opcionDePersonajes
let botonMagia
let botonEspada
let botonDaga
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
//let lienzo = escenario.getContext("2d")
// let intervalo
// let escenarioBackground = new Image()
// escenarioBackground.src = './assets/mokemap.png'
// let alturaQueBuscamos
// let anchoDelescenario = window.innerWidth - 20
// const anchoMaximoDelescenario = 350

// if (anchoDelescenario > anchoMaximoDelescenario) {
//     anchoDelescenario = anchoMaximoDelescenario - 20
// }

// alturaQueBuscamos = anchoDelescenario * 600/800

// escenario.width = anchoDelMapa
// escenario.height = alturaQueBuscamos

class Personaje {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
    //     this.ancho = 40
    //     this.alto = 40
    //     this.x = 0
    //     this.y = 0
    // }
    // pintarPersonaje() {
    //     lienzo.drawImage(
    //         this.x,
    //         this.y,
    //         this.ancho,
    //         this.alto
    //     )
    }
}

let hechicero = new Personaje('Hechicero', './assets/mago.png', 5)

// const HECHICERO_ATAQUES = [
//     {nombre: '💧', id:'boton-agua' },
//     {nombre: '💧', id:'boton-agua' },
//     {nombre: '💧', id:'boton-agua' },
//     {nombre: '🔥', id:'boton-fuego' },
//     {nombre: '🌿', id:'boton-tierra' },
// ]
//hechicero.ataques.push(...HECHICERO_ATAQUES)

personajes.push(hechicero)

console.log(personajes)

function iniciarJuego(){

    personajes.forEach((personaje) => {
        opcionDePersonajes = `
        <input type="radio" name="pj" id=${personaje.nombre}/>
        <label class="tarjeta-de-personaje" for=${personaje.nombre}>
            <p>${personaje.nombre}</p>
            <img src=${personaje.foto} alt=${personaje.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDePersonajes

    inputHechicero = document.getElementById('Hechicero')
    }
)
console.log('personajes', personajes);

    BotonPersonaje.addEventListener('click', seleccionarPersonajeJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)
    
}

function seleccionarPersonajeJugador() {
    
    sectionSeleccionarPersonaje.style.display = 'none'
    
    if (inputHechicero.checked) {
        spanMascotaJugador.innerHTML = inputHechicero.id
        PersonajeJugador = inputHechicero.id
    } 
    //else if (inputCapipepo.checked) {
    //     spanMascotaJugador.innerHTML = inputCapipepo.id
    //     mascotaJugador = inputCapipepo.id
    // } else if (inputRatigueya.checked) {
    //     spanMascotaJugador.innerHTML = inputRatigueya.id
    //     mascotaJugador = inputRatigueya.id
    // 
    //} 
    else {
        alert('Selecciona un personaje')
    }

    //extraerAtaques(PersonajeJugador)
    //sectionVerMapa.style.display = 'flex'
    //iniciarMapa()
    console.log(PersonajeJugador)
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function obtenerObjetoPersonaje() {
    for (let i = 0; i < personajes.length; i++) {
        if (PersonajeJugador === personajes[i].nombre) {
            return personajes[i]
        }
        
    }
}

function reiniciarJuego() {
    location.reload()
}

window.addEventListener('load', iniciarJuego)