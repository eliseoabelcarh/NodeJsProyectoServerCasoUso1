
require('dotenv').config()


function getConfigDaoUsuarios() {
    return {
        typeOfDaoUsuarios: process.env.DAO_USUARIOS_TYPE
    }
}


module.exports = {
    getConfigDaoUsuarios
}