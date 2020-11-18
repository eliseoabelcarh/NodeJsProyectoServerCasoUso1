const { crearErrorRecursoNoEncontrado } = require('../errors/apiError')
const { crearModeloUsuario } = require('../models/usuario')

let daoUsuariosMemoria = (function () {

    let objInstance
    let elementos = []

    async function create() {

        return {
            addUser: async (datos) => {
                const usuarioCreado = crearModeloUsuario(datos)
                elementos.push(usuarioCreado)
                return usuarioCreado.id
            },
            getUserById: async (id) => {
                const idBuscado = Number.parseInt(id)
                const arrayData = elementos.filter(e => e.id === idBuscado)
                if (!(arrayData.length)) {
                    throw crearErrorRecursoNoEncontrado('usuario', idBuscado)
                }
                return arrayData[0]
            },
            getAll: async () => {
                return elementos
            },
            cleanAll: async () => {
                while (elementos.length > 0) {
                    elementos.pop();
                }
            }
        }
    }

    return {
        getInstance: async function () {
            if (!objInstance) {
                objInstance = await create()
            }
            return objInstance
        }
    }

})()

module.exports = daoUsuariosMemoria