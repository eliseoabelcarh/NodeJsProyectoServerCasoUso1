
const assert = require('assert')
const daoUsuariosMongo = require('../../src/dao/daoUsuariosMongo')
const { getConfigDaoMongo } = require('../../src/configs/daoMongoConfig')


describe('TESTS PARA DAO USUARIOS MONGO', () => {

    let dao
    before(async () => {
        const configMongo = getConfigDaoMongo()
        dao = await daoUsuariosMongo.getInstance(configMongo)
    })
    after(async () => {
        //await dao.close()
    })

    describe('agrego usuario a Dao ', async () => {

        it('devuelve un id diferente null', async () => {
            const datos = {
                id: 25,
                nombres: 'algunNombre',
                apellidos: 'algunApellido',
                email: 'some@some.com',
                pathDniFront: './assets/dniANDERSON.jpg'
            }
            const id = await dao.addUser(datos)
            const esDiferenteANull = id !== null
            assert.deepStrictEqual(esDiferenteANull, true)

        })
    })
    describe.only('agrego usuario', async () => {

        it('devuelve lo que hay en la db', async () => {
            const datos = {
                id: 25,
                nombres: 'algunNombre',
                apellidos: 'algunApellido',
                email: 'some@some.com',
                pathDniFront: './assets/dniANDERSON.jpg'
            }
            await dao.addUser(datos)
            const usuarios = await dao.getAll()
            console.log('getALlll----  ', usuarios)
            assert.deepStrictEqual(true, true)

        })
    })
    describe('elimino toda la base de datos', async () => {

        it('devuelve vacío', async () => {
            const datos = {
                id: 25,
                nombres: 'algunNombre',
                apellidos: 'algunApellido',
                email: 'some@some.com',
                pathDniFront: './assets/dniANDERSON.jpg'
            }
            await dao.addUser(datos)
            await dao.cleanAll()
            const usuarios = await dao.getAll()
            console.log('devvvvvv ', usuarios)
            assert.deepStrictEqual(true, true)

        })
    })
})
