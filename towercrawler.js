const sectionPortadaJuego = document.getElementById('portada-titulo')
const sectionInstrucciones = document.getElementById('instrucciones')
const sectionInstruccionesTeclas = document.getElementById('instrucciones-teclas')
const botonComenzarJuego = document.getElementById('boton-comenzar')
const botonInstrucciones = document.getElementById('boton-instrucciones')
const botonSiguiente = document.getElementById('boton-siguiente')
const botonVolver = document.getElementById('boton-volver')

const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')

const sectionSeleccionarPersonaje = document.getElementById('seleccionar-pj')
const BotonPersonaje = document.getElementById('boton-pj')

const botonSiguienteMazmorra = document.getElementById('boton-siguiente-mazmorra')
const spanResultadoMazmorra = document.getElementById('resultado-mazmorra')

const sectionVerEscenario = document.getElementById('ver-escenario')
const escenario = document.getElementById('escenario')

const barrasDeVida = document.getElementById('barras-vidas');
const barraVidaJugador = document.getElementById('barra-jugador');
const barraVidaEnemigo = document.getElementById('barra-enemigo');

const spanPersonajeJugador =  document.getElementById('personaje-jugador')
const spanPersonajeEnemigo = document.getElementById('personaje-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const contenedorAtaques = document.getElementById('contenedorAtaques')
const sectionMensajes = document.getElementById('resultado')

const sectionMostrarMensajes = document.getElementById('mostrar-mensajes')

const sectionReiniciar = document.getElementById('reiniciar')
const botonReiniciar = document.getElementById('boton-reiniciar')


const sectionFinJuego = document.getElementById('fin-juego')


let personajes = []
let enemigos = []
let posicionActualMazmorra = 0
let resultadoMazmorra
let estaEnEnemigo = false
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDePersonajes
let inputHechicero
let inputGuerrero
let inputPicara
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
    constructor(nombre, foto, vida, vidaMaxima, fotoBack) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.vidaMaxima = vidaMaxima
        this.ataques = []
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoBack
        this.ancho = 100
        this.alto = 100
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
    constructor(nombre, foto, vida, vidaMaxima) {
        this.nombre = nombre
        this.foto = new Image()
        this.foto.src = foto
        this.vida = vida
        this.vidaMaxima = vidaMaxima
        this.ataquesEnemigo = []
        this.ancho = 120
        this.alto = 120
        this.x = 190
        this.y = 100
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

let hechicero = new Personaje('Hechicero', './assets/mago-alt-front-aura.png', 10, 10, './assets/mago-alt-back.png')
let guerrero = new Personaje('Guerrero', './assets/warrior-bruto-custom2-aura.png', 10, 10, './assets/guerrero-back.png')
let picara = new Personaje('Pícara', './assets/rogue-front-aura.png', 10, 10,'./assets/rogue-back.png' )

let slime = new Enemigo('Slime', './assets/enemigos/slime.png', 1, 1)
let goblin = new Enemigo('Goblin', './assets/enemigos/goblin-alt.png', 3, 3)
let esqueleto = new Enemigo('Esqueleto', './assets/enemigos/skeleton.png', 5, 5)
let dragon = new Enemigo('Dragon Arcano','./assets/enemigos/dragon-arcano-lat.png', 7, 7)

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

const PICARA_ATAQUES = [
    {nombre: '🎇', id:'boton-magia' },
    {nombre: '⚔', id:'boton-espada' },
    {nombre: '🔪', id:'boton-daga' },
]
picara.ataques.push(...PICARA_ATAQUES)

const GOBLIN_ATAQUES = [
    {nombre: '🎇', id:'boton-magia' },
    {nombre: '⚔', id:'boton-espada' },
    {nombre: '🔪', id:'boton-daga' },
]
goblin.ataquesEnemigo.push(...GOBLIN_ATAQUES)

const ESQUELETO_ATAQUES = [
    {nombre: '🎇', id:'boton-magia' },
    {nombre: '⚔', id:'boton-espada' },
    {nombre: '🔪', id:'boton-daga' },
]
esqueleto.ataquesEnemigo.push(...ESQUELETO_ATAQUES)

const SLIME_ATAQUES = [
    {nombre: '🎇', id:'boton-magia' },
    {nombre: '⚔', id:'boton-espada' },
    {nombre: '🔪', id:'boton-daga' },
]
slime.ataquesEnemigo.push(...SLIME_ATAQUES)

const DRAGON_ATAQUES = [
    {nombre: '🎇', id:'boton-magia' },
    {nombre: '⚔', id:'boton-espada' },
    {nombre: '🔪', id:'boton-daga' },
]
dragon.ataquesEnemigo.push(...DRAGON_ATAQUES)

personajes.push(hechicero,guerrero,picara)

enemigos.push(goblin,esqueleto,slime,dragon)

let mazmorra1 = ['',slime,'',goblin,'',esqueleto,'',dragon]

console.log(personajes)
console.log(enemigos)
console.log(mazmorra1)

function portadaJuego() {
    sectionInstrucciones.style.display = 'none'
    sectionInstruccionesTeclas.style.display = 'none'
    sectionSeleccionarPersonaje.style.display = 'none'
    sectionVerEscenario.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none'
    barrasDeVida.style.display = 'none'
    sectionMostrarMensajes.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionFinJuego.style.display = 'none'

    botonComenzarJuego.addEventListener('click', iniciarJuego)
    botonInstrucciones.addEventListener('click', instrucciones)
}

function instrucciones() {
    sectionPortadaJuego.style.display = 'none'
    sectionInstrucciones.style.display = 'flex'

    botonSiguiente.addEventListener('click', instruccionesTeclas)
}

function instruccionesTeclas() {
    sectionInstrucciones.style.display = 'none'
    sectionInstruccionesTeclas.style.display = 'flex'

    botonVolver.addEventListener('click', reiniciarJuego)
}

function iniciarJuego(){

    sectionPortadaJuego.style.display = 'none'

    sectionSeleccionarPersonaje.style.display = 'flex'    

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
        inputPicara = document.getElementById('Pícara')
    })
    //console.log(opcionDePersonajes)

    BotonPersonaje.addEventListener('click', seleccionarPersonajeJugador)
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
    } else if (inputPicara.checked) {
        spanPersonajeJugador.innerHTML = inputPicara.id
        personajeJugador = inputPicara.id
        console.log('Se selecciono guerrero');
    } else {
        alert('Selecciona un personaje')
        location.reload()
    }
    extraerAtaques(personajeJugador)
    sectionVerEscenario.style.display = 'flex'
    iniciarMapa() 
}

function extraerAtaques(personajeJugador) {
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
            return personajes[i].vidaMaxima
        }
        console.log(personajes[i].vidaMaxima)
    }
}


function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesPersonaje = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque"></button>
        `
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
            sectionSeleccionarAtaque.style.display = 'none'
            botonSiguienteMazmorra.style.display = 'block'
        }
    } else {
        console.log('Has completado todas las mazmorras')
        finalizarJuego('¡Felicidades! Has completado todas las mazmorras.')
        botonReiniciar.style.display = 'flex'
    }
}

function seleccionarPersonajeEnemigo(elementoActual) {
    console.log('Se selecciono personaje enemigo: ', elementoActual)
    personajeEnemigo = elementoActual.nombre
    console.log('Se ha elegido personaje enemigo: ',personajeEnemigo)
    obtenerObjetoPersonajeEnemigo(personajeEnemigo)
}

function obtenerObjetoPersonajeEnemigo() {
    //console.log('Se esta obteniendo objeto persona enemigo: ', personajeEnemigo)
    for (let i = 0; i < enemigos.length; i++) {
        if (personajeEnemigo === enemigos[i].nombre) {
            return enemigos[i]
        }
        //console.log(enemigos[i])
    }
}

function obtenerVidaMaximaPersonajeObjetoEnemigo() {
    console.log('Se esta obteniendo vida maxima objeto personaje enemigo: ', personajeEnemigo)
    for (let i = 0; i < enemigos.length; i++) {
        if (personajeEnemigo === enemigos[i].nombre) {
            return enemigos[i].vidaMaxima
        }
        console.log(enemigos[i].vidaMaxima)
    }
}

function iniciarMapa() {
    
    sectionSeleccionarAtaque.style.display = 'none'

    personajeJugadorObjeto = obtenerObjetoPersonaje(personajeJugador)
    console.log(personajeJugadorObjeto, personajeJugador)
    
    intervalo = setInterval(pintarCanvas, 50)

    botonSiguienteMazmorra.addEventListener('click', recorrerMazmorra)
    console.log('Se inicio el mapa')
}

function secuenciaAtaque() {
    botonSiguienteMazmorra.style.display = 'none'
    sectionMostrarMensajes.style.display = 'flex'
    console.log('Iniciando secuencia de ataque contra enemigo: ', personajeEnemigo)
    barrasDeVida.style.display = 'flex'
    if (personajeEnemigoObjeto) {
        actualizarBarrasVidas();
    }
    
    // Mostrar la sección de ataques
    sectionSeleccionarAtaque.style.display = 'flex';
    
    botones.forEach((boton) => {
        boton.addEventListener('click', realizarAtaque)
    })

    window.addEventListener('keydown', sePresionoUnaTecla)
}

function realizarAtaque(e) {
    let ataque = ''
    if (e.target.textContent === '🎇') {
        ataque = 'MAGIA'
    } else if (e.target.textContent === '⚔') {
        ataque = 'ESPADA'
    } else {
        ataque = 'DAGA'
    }
    
    ataqueJugador = [ataque] // Solo un ataque a la vez
    console.log('Ataque personaje elegido: ', ataqueJugador)
    
    ataqueAleatorioEnemigo()
    combate()
    
    // Deshabilitar botones temporalmente
    botones.forEach(boton => boton.disabled = true)
    setTimeout(() => {
        botones.forEach(boton => boton.disabled = false)
    }, 500) // Habilitar después de 0,5 segundos
}

function ataqueAleatorioEnemigo() {
    let ataques = ['MAGIA', 'ESPADA', 'DAGA']
    let ataqueAleatorio = ataques[Math.floor(Math.random() * ataques.length)]
    ataqueEnemigo = [ataqueAleatorio] // Solo un ataque a la vez
    console.log('Ataque aleatorio enemigo elegido: ', ataqueEnemigo)
}

function iniciarPelea() {
    if (ataqueJugador.length === ataqueEnemigo.length) {
        combate()
    }
}

function combate() {
    console.log('Se inicio combate con ', personajeEnemigo)  

    if (ataqueJugador.length > 0 && ataqueEnemigo.length > 0) {
        let ataqueJ = ataqueJugador.shift() // Toma y elimina el primer ataque
        let ataqueE = ataqueEnemigo.shift() // Toma y elimina el primer ataque
        
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
    } else {
        console.log('No hay ataques para procesar');
    }
    revisarVidas()
}

function revisarVidas() {
    console.log('se esta revisando la vida de: ', personajeJugador, 'y ', personajeEnemigo)
    console.log('Vida jugador: ', (personajeJugadorObjeto.vida))
    console.log('Vida enemigo: ', (personajeEnemigoObjeto.vida))

    if (personajeEnemigoObjeto.vida <= 0) {
        finalizarCombate("¡Lograste vencer al " + personajeEnemigo + "!")
        sectionSeleccionarAtaque.style.display = 'none' 
    } else if (personajeJugadorObjeto.vida <= 0) {
        personajeEnemigo = null
        personajeEnemigoObjeto = null
        sectionSeleccionarAtaque.style.display = 'none'
        finalizarJuego('Tu vida ha llegado a su fin...')
        sectionFinJuego.style.display = 'flex'
        botonReiniciar.addEventListener('click', reiniciarJuego)
    }
}

function finalizarCombate(mensaje) {
    // Remover el evento keydown
    window.removeEventListener('keydown', sePresionoUnaTecla)

    // Ocultar toda la sección de selección de ataques
    sectionSeleccionarAtaque.style.display = 'none';
    
    barrasDeVida.style.display = 'none';
    crearMensajeFinal(mensaje)
    // Deshabilitar botones de ataque
    botones.forEach(boton => boton.disabled = true)
    
    if (personajeEnemigoObjeto.vida <= 0) {
        personajeEnemigo = null
        personajeEnemigoObjeto = null
        // El enemigo ha sido derrotado
        setTimeout(() => {
            sectionSeleccionarAtaque.style.display = 'none' 
            posicionActualMazmorra++
            botonSiguienteMazmorra.style.display = 'block'
            sectionVerEscenario.style.display = 'flex'
            estaEnEnemigo = false
            sectionReiniciar.style.display = 'none'  // Asegurarse de que el botón de reiniciar esté oculto
            recorrerMazmorra()
        }, 2000) // Espera 2 segundos antes de continuar
    }
}

function finalizarJuego(mensaje) {
    sectionSeleccionarAtaque.style.display = 'none'
    barrasDeVida.style.display = 'none'
    sectionVerEscenario.style.display = 'none'
    crearMensajeFinal(mensaje)
    sectionFinJuego.style.display = 'flex'
    sectionReiniciar.style.display = 'flex'
    botonReiniciar.style.display = 'block'
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function actualizarBarrasVidas() {

    console.log('Actualizando barras de vida');
    console.log('Vida del jugador:', personajeJugadorObjeto.vida);
    console.log('Vida del enemigo:', personajeEnemigoObjeto.vida);

    const vidaMaximaJugador = obtenerVidaMaximaObjetoPersonajeJugador(personajeJugador);
    console.log('Vida max Jug:',vidaMaximaJugador)
    const vidaMaximaEnemigo = obtenerVidaMaximaPersonajeObjetoEnemigo(personajeEnemigo)
    console.log('Vida max Enem:', vidaMaximaEnemigo)

    const porcentajeVidaJugador = (personajeJugadorObjeto.vida / vidaMaximaJugador) * 100;
    const porcentajeVidaEnemigo = (personajeEnemigoObjeto.vida / vidaMaximaEnemigo) * 100;

    console.log('Porcentaje vida del jugador:', porcentajeVidaJugador);
    console.log('Porcentaje vida del enemigo:', porcentajeVidaEnemigo);

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
    sectionMensajes.innerHTML = resultado
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowLeft':
            realizarAtaque({ target: { textContent: '🎇' } }) // Magia
            break
        case 'ArrowUp':
            realizarAtaque({ target: { textContent: '⚔' } }) // Espada
            break    
        case 'ArrowRight':
            realizarAtaque({ target: { textContent: '🔪' } }) // Daga
            break
        default:
            break
    }
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

function reiniciarJuego() {
    location.reload()
}

window.addEventListener('load', portadaJuego)