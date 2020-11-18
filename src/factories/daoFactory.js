
const { getConfigDaoUsuarios } = require('../configs/daoUsuariosConfig')
const daoUsuariosMemoria = require('../dao/daoUsuariosMemoria')
const daoUsuariosMongo = require('../dao/daoUsuariosMongo')
const { getConfigDaoMongo } = require('../configs/daoMongoConfig')


const { typeOfDaoUsuarios } = getConfigDaoUsuarios()
const configMongo = getConfigDaoMongo()


let daoFactory = (function () {

    let daoInstance

    async function create() {
        if (typeOfDaoUsuarios === 'memoria') {
            return await daoUsuariosMemoria.getInstance()
        }
        if (typeOfDaoUsuarios === 'mongodb') {
            return await daoUsuariosMongo.getInstance(configMongo)
        }
        throw new Error('tipo de Dao no encontrado')

    }

    return {
        getDao: async function () {
            if (!daoInstance) {
                daoInstance = await create()
            }
            return daoInstance
        }
    }

})()

module.exports = daoFactory

