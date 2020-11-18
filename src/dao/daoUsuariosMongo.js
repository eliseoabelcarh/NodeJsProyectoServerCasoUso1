const { crearErrorRecursoNoEncontrado, crearErrorDeBaseDeDatos } = require('../errors/apiError')
const { crearModeloUsuario, crearArrayDeModeloUsuarios } = require('../models/usuario')
const mongoose = require('mongoose');
const { UserModelMongoose } = require('../models/schemas')



let daoUsuariosMongo = (function () {

    let objInstance

    async function create(config) {

        return {
            addUser: async (datos) => {
                await conectar(config)
                const usuarioCreado = crearModeloUsuario(datos)
                const user = new UserModelMongoose(usuarioCreado)
                await user.save()
                await desconectar()
                return user.id
            },
            getUserById: async (id) => {
                await conectar(config)
                const idBuscado = Number.parseInt(id)
                const userMongo = await UserModelMongoose.findOne({ id: idBuscado }).exec();
                if (!userMongo) {
                    throw crearErrorRecursoNoEncontrado('usuario', idBuscado)
                }
                const usuario = crearModeloUsuario(userMongo)
                await desconectar()
                return usuario

            },
            getAll: async () => {
                await conectar(config)
                const datos = await UserModelMongoose.find({});
                const usuarios = crearArrayDeModeloUsuarios(datos)
                await desconectar()
                return usuarios
            },
            cleanAll: async () => {
                await conectar(config)
                const res = await UserModelMongoose.deleteMany({});
                await desconectar()
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
        console.log('...conectado a BD!')
    } catch (error) {
        throw crearErrorDeBaseDeDatos(error.message)
    }
}
async function desconectar() {
    console.log('...desconectando BD')
    await mongoose.connection.close()
}

module.exports = daoUsuariosMongo