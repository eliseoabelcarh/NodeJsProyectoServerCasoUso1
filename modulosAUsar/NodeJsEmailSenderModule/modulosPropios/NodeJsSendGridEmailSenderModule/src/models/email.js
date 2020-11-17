let { crearErrorArgumentosInvalidos } = require('../errors/errors')
const { generateFileObjectFromPath } = require('./fileObject')






function crearObjetoEmail(from, to, subject, text) {
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
        throw crearErrorArgumentosInvalidos('html', 'campo requerido')
    } else {
        email.html = text
    }
    return email
}

function crearEmailBase(objeto) {
    let email = {}
    if (!objeto.from) {
        throw crearErrorArgumentosInvalidos('from', 'campo requerido')
    } else {
        email.from = objeto.from
    }
    if (!objeto.to) {
        throw crearErrorArgumentosInvalidos('to', 'campo requerido')
    } else {
        email.to = objeto.to
    }
    if (!objeto.subject) {
        throw crearErrorArgumentosInvalidos('subject', 'campo requerido')
    } else {
        email.subject = objeto.subject
    }
    return email
}



function crearEmailConTextoPlano(objeto) {

    let email = {}
    const base = crearEmailBase(objeto)
    if (!objeto.text) {
        throw crearErrorArgumentosInvalidos('text', 'campo requerido')
    } else {
        email.text = objeto.text
    }
    email = { ...base, ...email }

    return email
}


function crearEmailConTextoPlanoYHtml(objeto) {
    let email = {}
    const base = crearEmailConTextoPlano(objeto)
    if (!objeto.html) {
        throw crearErrorArgumentosInvalidos('html', 'campo requerido')
    } else {
        email.html = objeto.html
    }
    email = { ...base, ...email }
    return email
}

function crearEmailConTextoPlanoYHtmlYAttachmentVacio(objeto) {
    let email = {}
    const base = crearEmailConTextoPlanoYHtml(objeto)
    if (!objeto.attachments) {
        throw crearErrorArgumentosInvalidos('attachments', 'campo requerido')
    }
    /*  if (!objeto.attachments.length) {
         throw crearErrorArgumentosInvalidos('fileObject', 'campo requerido')
     } */
    else {
        email.attachments = objeto.attachments
    }
    email = { ...base, ...email }
    return email
}


function crearEmailConTextoPlanoYHtmlYAttachmentConFiles(objeto, arrayConPathDeArchivos) {

    let email = {}
    email.attachments = []
    const base = crearEmailConTextoPlanoYHtmlYAttachmentVacio(objeto)
    if (!arrayConPathDeArchivos.length) {
        throw crearErrorArgumentosInvalidos('fileObject', 'campo requerido')
    }
    else {
        for (let i = 0; i < arrayConPathDeArchivos.length; i++) {
            const rutaElemento = arrayConPathDeArchivos[i];
            let fileObject = generateFileObjectFromPath(rutaElemento)
            email.attachments.push(fileObject)
        }
    }
    email = { ...base, ...email }
    return email
}


function crearEmailConCamposOpcionales(from, to, subject, text, attachments) {

    let email = {}

    const base = crearObjetoEmail(from, to, subject, text)

    if (attachments) {
        email.attachments = []
        for (let i = 0; i < attachments.length; i++) {
            const rutaElemento = attachments[i];
            let fileObject = generateFileObjectFromPath(rutaElemento)
            email.attachments.push(fileObject)
        }
    }
    email = { ...base, ...email }
    return email
}






module.exports = {
    crearEmailConTextoPlano,
    crearEmailConTextoPlanoYHtml,
    crearEmailConTextoPlanoYHtmlYAttachmentVacio,
    crearEmailConTextoPlanoYHtmlYAttachmentConFiles,
    crearEmailConCamposOpcionales
}