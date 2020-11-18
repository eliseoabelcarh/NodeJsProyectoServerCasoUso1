const { tieneNombre, getPathDniFrontFromUser, prepararEmailDeDniVerificado } = require('../models/usuario')


/**
 * https://github.com/eliseoabelcarh/NodeJsReadTextFromImageModule
 * @module verificadorDeIdentidad
 *
 */


async function crearVerificadorDeIdentidad(daoUsuarios, lectorDni, emailSender) {


    async function getNombresApellidosDeFotoDni(pathImagenDniFrontal) {
        let text = await lectorDni.readTextFromImage(pathImagenDniFrontal)
        let { apellidos, nombres } = await lectorDni.getNombresYApellidosDeData(text)
        return { apellidos, nombres }
    }


    return {

        validarInfoEnDbConFotoDni: async ({ userId }) => {
            let usuario = await daoUsuarios.getUserById(userId)
            let pathDniFront = getPathDniFrontFromUser(usuario)
            let { apellidos, nombres } = await getNombresApellidosDeFotoDni(pathDniFront)
            let nombresCoinciden = tieneNombre(usuario, { nombres, apellidos })
            if (nombresCoinciden) {
                let mail = prepararEmailDeDniVerificado(usuario)
                await emailSender.sendEmail(mail)
                return true
            }
            return false
        }


    }


}
//CONSULTAS PARA PROFE
// sqlite memory???
// async refactors evito código repetido en tests
// los require de modulos propios como enterarse
// punto de entrada a  los módulos --index.js??


module.exports = {
    crearVerificadorDeIdentidad
}