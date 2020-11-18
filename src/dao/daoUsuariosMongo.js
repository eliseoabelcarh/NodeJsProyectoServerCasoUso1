const { crearErrorRecursoNoEncontrado, crearErrorDeBaseDeDatos } = require('../errors/apiError')
const { crearModeloUsuario } = require('../models/usuario')
const mongoose = require('mongoose');
const { UserModelMongoose } = require('../models/schemas')



let daoUsuariosMongo = (function () {

    let objInstance
    let elementos = []

    async function create(config) {

        return {
            addUser: async (datos) => {
                await conectar(config)
                const usuarioCreado = crearModeloUsuario(datos)
                const user = new UserModelMongoose(usuarioCreado)
                console.log('devuee por mongog ', user)
                await user.save()
                desconectar()
                return user.id
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
                await conectar(config)
                const res = await UserModelMongoose.find({});
                console.log('getALll  ', res)
                desconectar()
                return res
            },
            cleanAll: async () => {
                await conectar(config)
                const res = await UserModelMongoose.deleteMany({});
                console.log('borroooo ', res)
                desconectar()
            }
        }
    }

    return {
        getInstance: async function (config) {
            if (!objInstance) {
                objInstance = await create(config)
            }
            return objInstance
        }
    }

})()


async function conectar(config) {
    try {
        await mongoose.connect(config.cnxString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('...conectado a Mongo!')
    } catch (error) {
        throw crearErrorDeBaseDeDatos(error.message)
    }
}
async function desconectar() {
    mongoose.connection.close()
}

module.exports = daoUsuariosMongo