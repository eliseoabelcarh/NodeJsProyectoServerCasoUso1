let { crearErrorArgumentosInvalidos } = require('../src/errors/errors')
const path = require('path');



function crearObjetoEmail({ from, to, subject, text }) {
    let email = {}
    if (!from) {
        throw crearErrorArgumentosInvalidos('from', 'campo requerido')
    } else {
        email.from = from
    }
    if (!to) {
        throw crearErrorArgumentosInvalidos('to', 'campo requerido')
    } else {
        email.to = to
    }
    if (!subject) {
        throw crearErrorArgumentosInvalidos('subject', 'campo requerido')
    } else {
        email.subject = subject
    }
    if (!text) {
        throw crearErrorArgumentosInvalidos('text', 'campo requerido')
    } else {
        email.text = text
    }
    return email
}


function crearFileObject(ruta) {
    let file = {}
    if (!ruta) {
        throw crearErrorArgumentosInvalidos('ruta', 'campo requerido')
    } else {
        const name = path.basename(ruta)
        file.filename = name
        file.path = ruta

    }
    return file
}



function crearEmail({ from, to, subject, text, attachments }) {

    let email = {}

    const base = crearObjetoEmail({ from, to, subject, text })

    if (attachments) {
        email.attachments = []
        for (let i = 0; i < attachments.length; i++) {
            const rutaElemento = attachments[i];
            let fileObject = crearFileObject(rutaElemento)
            email.attachments.push(fileObject)
        }
    }
    email = { ...base, ...email }
    return email
}

module.exports = {
    crearEmail
}