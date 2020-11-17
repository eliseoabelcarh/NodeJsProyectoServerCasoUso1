
const { crearDaoUsuariosMemoria } = require('./daoUsuariosMemoria')



async function crearDaoUsuarios(tipoPersistencia) {

    if (tipoPersistencia === 'memoria')
        return await crearDaoUsuariosMemoria()
    else
        throw new Error('invalid type of DAO')
}

module.exports = { crearDaoUsuarios }