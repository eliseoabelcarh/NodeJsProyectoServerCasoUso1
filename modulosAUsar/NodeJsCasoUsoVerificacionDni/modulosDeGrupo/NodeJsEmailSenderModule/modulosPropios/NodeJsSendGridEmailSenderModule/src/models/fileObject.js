
let { crearErrorArgumentosInvalidos } = require('../errors/errors')
const fs = require("fs");
const path = require('path');
const mime = require('mime');



function crearFileObject(objeto) {
    let file = {}
    if (!objeto.content) {
        throw crearErrorArgumentosInvalidos('content', 'campo requerido')
    } else {
        file.content = objeto.content
    }
    if (!objeto.filename) {
        throw crearErrorArgumentosInvalidos('filename', 'campo requerido')
    } else {
        file.filename = objeto.filename
    }

    if (!objeto.type) {
        throw crearErrorArgumentosInvalidos('type', 'campo requerido')
    } else {
        file.type = objeto.type
    }
    if (!objeto.disposition) {
        throw crearErrorArgumentosInvalidos('disposition', 'campo requerido')
    } else {
        file.disposition = objeto.disposition
    }
    return file
}




function generateFileObjectFromPath(rutaDeArchivo) {
    try {
        let fileObject = {}

        let pathToAttachment = rutaDeArchivo;
        attachment = fs.readFileSync(pathToAttachment).toString("base64");
        fileObject.content = attachment

        const filename = path.basename(rutaDeArchivo)
        fileObject.filename = filename

        const tipo = mime.getType(rutaDeArchivo);
        fileObject.type = tipo

        fileObject.disposition = 'attachment'

        return fileObject
    } catch (error) {
        throw crearErrorArgumentosInvalidos('generando File Object', 'error en ruta de archivo')
    }
}



function generateFileObjectFromFileFormat(file, nameFile) {
    try {
        let fileObject = {}

        let pathToAttachment = rutaDeArchivo;
        attachment = fs.readFileSync(pathToAttachment).toString("base64");
        fileObject.content = attachment

        const filename = path.basename(rutaDeArchivo)
        fileObject.filename = filename

        const tipo = mime.getType(rutaDeArchivo);
        fileObject.type = tipo

        fileObject.disposition = 'attachment'

        return fileObject
    } catch (error) {
        throw crearErrorArgumentosInvalidos('generando File Object', 'error en ruta de archivo')
    }
}







module.exports = {
    crearFileObject, generateFileObjectFromPath
}
