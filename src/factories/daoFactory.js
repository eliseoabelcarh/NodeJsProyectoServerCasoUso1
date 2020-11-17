
const { getConfigDaoUsuarios } = require('../configs/daoUsuariosConfig')
const daoUsuariosMemoria = require('../dao/daoUsuariosMemoria')


const { typeOfDaoUsuarios } = getConfigDaoUsuarios()


let daoFactory = (function () {

    let daoInstance

    async function create() {
        if (typeOfDaoUsuarios === 'memoria') {
            return await daoUsuariosMemoria.getInstance()
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

