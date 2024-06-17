const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonReiniciar = document.getElementById('boton-reiniciar')
const BotonPersonaje = document.getElementById('boton-pj')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarPersonaje = document.getElementById('seleccionar-pj')
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

let hechicero = new Personaje('Hechicero', './assets/mago.png', 10, './assets/magoback.png')
//let guerrero = new Personaje('Guerrero', './assets/warrior-bruto.png', 10)

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
//guerrero.ataques.push(...GUERRERO_ATAQUES)

const GOBLIN_ATAQUES = [
    {nombre: '🎇', id:'boton-magia' },
    {nombre: '⚔', id:'boton-espada' },
    {nombre: '🔪', id:'boton-daga' },
]
goblin.ataquesEnemigo.push(...GOBLIN_ATAQUES)


personajes.push(hechicero)
//personajes.push(hechicero,guerrero)

enemigos.push(goblin)

let mazmorra1 = [goblin]

console.log(personajes)
console.log(enemigos)
console.log(mazmorra1)

function iniciarJuego(){
 
    sectionSeleccionarAtaque.style.display = 'none'
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
    console.log(opcionDePersonajes)

    BotonPersonaje.addEventListener('click', seleccionarPersonajeJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarPersonajeJugador() {
    sectionSeleccionarPersonaje.style.display = 'none'
    
    if (inputHechicero.checked) {
        spanPersonajeJugador.innerHTML = inputHechicero.id
        personajeJugador = inputHechicero.id
        console.log('Se selecciono hechicero');
    } else if (inputGuerrero.checked) {
        spanPersonajeJugador.innerHTML = inputGuerrero.id
        personajeJugador = inputGuerrero.id
        console.log('Se selecciono guerrero');
    } else {
        alert('Selecciona un personaje')
    }
    extraerAtaques(personajeJugador)
    sectionVerEscenario.style.display = 'flex'
    RecorrerMazmorra() 
}

function extraerAtaques(personajeJugador) {
    console.log('Extrayendo ataques de personaje jugador ', personajeJugador)
    let ataques
    for (let i = 0; i < personajes.length; i++) {
        if (personajeJugador === personajes[i].nombre) {
            ataques = personajes[i].ataques
        }
        console.log('Los ataques del jugador son: ', ataques)
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesPersonaje = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesPersonaje
    })

     botonMagia = document.getElementById('boton-magia')
     botonEspada = document.getElementById('boton-espada')
     botonDaga = document.getElementById('boton-daga')
     botones = document.querySelectorAll('.BAtaque')
}

function RecorrerMazmorra() {

    for (let i = 0; i < mazmorra1.length; i++) {
        console.log('Se esta recorriendo la mazmorra');
        if (mazmorra1[i] != '') {
            console.log('Se ha encontrado enemigo: ', (mazmorra1[i]))
            enemigoEncontrado = (mazmorra1[i])
            spanPersonajeEnemigo.innerHTML = enemigoEncontrado.nombre;
            pintarEnemigo(enemigoEncontrado);
        }
    }
iniciarMapa()
console.log(personajeEnemigo)
}

function secuenciaAtaque() {
    //console.log('Iniciando secuencia de ataque contra enemigo: ', PersonajeEnemigo)
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🎇') {
                ataqueJugador.push('MAGIA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true   
            } else if (e.target.textContent === '⚔') {
                ataqueJugador.push('ESPADA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true  
            } else {
                ataqueJugador.push('DAGA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true  
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function ataqueAleatorioEnemigo() {
    console.log('Personaje enemigo elegido para ataque aleatorio', personajeEnemigo)
    console.log('Ataques enemigo', ataquesPersonajeEnemigo);
    let ataqueAleatorioEnemigo = aleatorio(0,ataquesPersonajeEnemigo.length-1)
    
    if (ataqueAleatorioEnemigo === 0 ) {
        ataqueEnemigo.push('MAGIA')
    } else if (ataqueAleatorioEnemigo === 1 ) {
        ataqueEnemigo.push('ESPADA')
    } else {
        ataqueEnemigo.push('DAGA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 1) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    //console.log('Se inicio combate con ', PersonajeEnemigo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'MAGIA' && ataqueEnemigo[index] === 'ESPADA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            personajeEnemigo.vida--
            spanVidasEnemigo.innerHTML = personajeEnemigo.vida
        } else if (ataqueJugador[index] ==='ESPADA' && ataqueEnemigo[index] === 'DAGA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            personajeEnemigo.vida--
            spanVidasEnemigo.innerHTML = personajeEnemigo.vida--
        } else if (ataqueJugador[index] === 'DAGA' && ataqueEnemigo[index] === 'MAGIA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            personajeEnemigo.vida--
            spanVidasEnemigo.innerHTML = personajeEnemigo.vida--
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            personajeJugador.vida--
            spanVidasJugador.innerHTML = personajeJugador.vida
        }
    }console.log(combate)
    revisarVidas(personajeEnemigo)
}

function revisarVidas() {
    //console.log('holiholiii: ', enemigo)
    if (personajeEnemigo.vida <= 0) {
        crearMensajeFinal("Lograste sobrevivir a la batalla!")
    } else if (personajeJugador.vida <= 0) {
        crearMensajeFinal('Tu vida ha llegado a su fin...')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    
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

function iniciarMapa() {

    personajeJugadorObjeto = obtenerObjetoPersonaje(personajeJugador)
    personajeEnemigoObjeto = obtenerObjetoPersonajeEnemigo(personajeEnemigo)
    console.log(personajeEnemigoObjeto, personajeEnemigo)
    console.log(personajeJugadorObjeto, personajeJugador)
    
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener('keydown', sePresionoUnaTecla)
    //window.addEventListener('keyup', detenerMovimiento)
    console.log('Se inicio el mapa')
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

function seleccionarPersonajeEnemigo(enemigo) {
    console.log('Se selecciono personaje enemigo: ', enemigo)
    spanPersonajeEnemigo.innerHTML = enemigo.nombre
    console.log(spanPersonajeEnemigo)
    ataquesPersonajeEnemigo = enemigo.ataquesEnemigo

    extraerAtaquesEnemigo(enemigo)
}

function obtenerObjetoPersonajeEnemigo() {
    console.log('Obteniendo objeto personaje enemigo de: ', personajeEnemigo)
    for (let i = 0; i < enemigos.length; i++) {
        if (personajeEnemigo === enemigos[i].nombre) {
            return enemigos[i]
        }
        console.log(enemigos[i])
    }
}

function extraerAtaquesEnemigo(personajeEnemigo) {
    console.log('Extrayendo ataques enemigos de ',personajeEnemigo)
    let ataquesEnemigo
    for (let i = 0; i < enemigos.length; i++) {
        if (personajeEnemigo === enemigos[i].nombre) {
            ataquesEnemigo = enemigos[i].ataquesEnemigo
        }
    }
    ataquesEnemigo = ataquesPersonajeEnemigo
    console.log('Los ataques del enemigo son: ', ataquesEnemigo)
    //ataqueAleatorioEnemigo(personajeEnemigo)
    secuenciaAtaque()
}





function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    personajeJugadorObjeto.x = personajeJugadorObjeto.x //+ PersonajeJugadorObjeto.velocidadX
    personajeJugadorObjeto.y = personajeJugadorObjeto.y //+ PersonajeJugadorObjeto.velocidadY
    // PersonajeEnemigoObjeto.x = PersonajeEnemigoObjeto.x
    // PersonajeEnemigoObjeto.y = PersonajeEnemigoObjeto.y
    lienzo.clearRect(0, 0, escenario.width, escenario.height)
    lienzo.drawImage(
        escenarioBackground,
        0,
        0,
        escenario.width,
        escenario.height
    )
    personajeJugadorObjeto.pintarPersonaje()
    //personajeEnemigo.pintarEnemigo()
    //if (PersonajeJugadorObjeto.velocidadX !== 0 || PersonajeJugadorObjeto.velocidadY !== 0) {
    //    revisarColision(hipodogeEnemigo)
    //    revisarColision(capipepoEnemigo)
    //    revisarColision(ratigueyaEnemigo)
    //}
    sectionSeleccionarAtaque.style.display = 'flex'
    //seleccionarPersonajeEnemigo(goblin)
}

function teclaIzq() {
    //ataqueJugador.push('MAGIA')
    console.log(ataqueJugador)
    //indexAtaqueJugador = ataqueJugador['MAGIA']
    combate(ataqueJugador.push('MAGIA'))
}

function teclaArriba() {
    //ataqueJugador.push('ESPADA')
    console.log(ataqueJugador)
    //indexAtaqueJugador = ataqueJugador['ESPADA']
    combate(ataqueJugador.push('ESPADA'))
}

function teclaDer() {
    //ataqueJugador.push('DAGA')
    console.log(ataqueJugador)
    //indexAtaqueJugador = ataqueJugador['DAGA']
    combate(ataqueJugador.push('DAGA'))
}

function reiniciarJuego() {
    location.reload()
}

window.addEventListener('load', iniciarJuego)