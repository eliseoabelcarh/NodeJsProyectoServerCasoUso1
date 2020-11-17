
const { crearErrorArgumentosInvalidos } = require('../errors/apiError')
let lastId = 0

const crearModeloUsuario = (datos) => {
    let usuario = {}
    if (!datos) {
        throw crearErrorArgumentosInvalidos('datos', 'campo requerido')
    }
    if (!datos.nombres) {
        throw crearErrorArgumentosInvalidos('nombres', 'campo requerido')
    }
    else {
        usuario.nombres = datos.nombres
    }
    if (!datos.apellidos) {
        throw crearErrorArgumentosInvalidos('apellidos', 'campo requerido')
    }
    else {
        usuario.apellidos = datos.apellidos
    }
    if (!datos.email) {
        throw crearErrorArgumentosInvalidos('email', 'campo requerido')
    }
    else {
        usuario.email = datos.email
    }

    if (!datos.id) {
        const idCreado = lastId + 1
        usuario.id = idCreado
    }
    if (datos.pathDniFront) {
        usuario.pathDniFront = datos.pathDniFront
    }

    return usuario
}

const getPathDniFrontFromUser = (usuario) => {
    if (!usuario) {
        throw crearErrorArgumentosInvalidos('usuario', 'campo vacío')
    }
    if (!usuario.pathDniFront) {
        throw crearErrorArgumentosInvalidos('pathDniFront', 'campo vacío')
    }
    return usuario.pathDniFront
}

const getEmailFromUser = (usuario) => {
    if (!usuario) {
        throw crearErrorArgumentosInvalidos('usuario', 'campo vacío')
    }
    if (!usuario.email) {
        throw crearErrorArgumentosInvalidos('email', 'campo vacío')
    }
    return usuario.email
}
const getNombresFromUser = (usuario) => {
    if (!usuario) {
        throw crearErrorArgumentosInvalidos('usuario', 'campo vacío')
    }
    if (!usuario.nombres) {
        throw crearErrorArgumentosInvalidos('nombres', 'campo vacío')
    }
    return usuario.nombres
}


const tieneNombre = (usuario, { nombres, apellidos }) => {

    if (!usuario) {
        throw crearErrorArgumentosInvalidos('usuario', 'campo requerido')
    }
    if (!usuario.nombres) {
        throw crearErrorArgumentosInvalidos('nombres', 'campo requerido')
    }
    if (!usuario.apellidos) {
        throw crearErrorArgumentosInvalidos('apellidos', 'campo requerido')
    }
    return compararStrings(usuario.nombres, nombres) &&
        compararStrings(usuario.apellidos, apellidos)


}

const prepararEmailDeDniVerificado = (usuario) => {

    const email = getEmailFromUser(usuario)
    const nombre = getNombresFromUser(usuario)
    const pathDniFront = getPathDniFrontFromUser(usuario)
    const mail = {
        to: email,
        subject: `Hola ${nombre}, tu Dni ha sido veriicado!!`,
        text: 'Nombres coinciden con la foto de tu Dni!',
        attachments: [pathDniFront]//TODO agregar watermark
    }
    return mail

}

function compararStrings(a, b) {
    return (a.toUpperCase() === b.toUpperCase())
}

module.exports = {
    crearModeloUsuario, tieneNombre,
    getPathDniFrontFromUser,
    getNombresFromUser, prepararEmailDeDniVerificado
}