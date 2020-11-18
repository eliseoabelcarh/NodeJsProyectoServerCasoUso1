
require('dotenv').config()


function getConfigDaoMongo() {
    return {
        cnxString: process.env.CNX_STRING_MONGO
    }
}


module.exports = {
    getConfigDaoMongo
}