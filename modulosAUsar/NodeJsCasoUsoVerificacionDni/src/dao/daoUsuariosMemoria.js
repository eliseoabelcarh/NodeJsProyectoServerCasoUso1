const { crearErrorRecursoNoEncontrado, crearErrorCampoNoEncontrado } = require('../errors/apiError')
const { crearModeloUsuario } = require('../models/usuario')

async function crearDaoUsuariosMemoria() {

    const elementos = []

    const daoMemoria = {
        addUser: async (datos) => {
            const usuarioCreado = crearModeloUsuario(datos)
            elementos.push(usuarioCreado)
            return usuarioCreado
        },
        getUserById: async (id) => {
            const arrayData = elementos.filter(e => e.id === id)
            if (!(arrayData.length)) {
                throw crearErrorRecursoNoEncontrado('usuario', id)
            }
            return arrayData[0]

        },
        cleanAll: async () => {
            while (elementos.length > 0) {
                elementos.pop();
            }
            return elementos
        }
    }
    return daoMemoria
}

module.exports = { crearDaoUsuariosMemoria }