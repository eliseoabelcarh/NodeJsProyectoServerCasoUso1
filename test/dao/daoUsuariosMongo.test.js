
const assert = require('assert')
const daoUsuariosMongo = require('../../src/dao/daoUsuariosMongo')
const { getConfigDaoMongo } = require('../../src/configs/daoMongoConfig')




const datos = {
    id: 25,
    nombres: 'algunNombre',
    apellidos: 'algunApellido',
    email: 'some@some.com',
    pathDniFront: './assets/dniANDERSON.jpg'
}
const datos2 = {
    id: 26,
    nombres: 'algunNombre',
    apellidos: 'algunApellido',
    email: 'some@some.com',
    pathDniFront: './assets/dniANDERSON.jpg'
}



describe('TESTS PARA DAO USUARIOS MONGO', () => {

    let dao

    before(async () => {
        const configMongo = getConfigDaoMongo()
        dao = await daoUsuariosMongo.getInstance(configMongo)
    })
    afterEach(async () => {
        await dao.cleanAll()
    })

    describe('agrego usuario a Dao ', async () => {
        it('devuelve un id diferente null', async () => {
            const id = await dao.addUser(datos)
            const esDiferenteANull = id !== null
            assert.deepStrictEqual(esDiferenteANull, true)
        })
    })
    describe('agrego usuario', async () => {
        it('devuelve lo que hay en la db', async () => {
            await dao.addUser(datos)
            const usuarios = await dao.getAll()
            assert.deepStrictEqual(usuarios.length, 1)
        })
    })
    describe('elimino toda la base de datos', async () => {
        it('devuelve vacío', async () => {
            await dao.addUser(datos)
            await dao.addUser(datos2)
            await dao.cleanAll()
            const usuarios = await dao.getAll()
            assert.deepStrictEqual(usuarios.length, 0)
        })
    })
    describe('busco usuario x id', async () => {
        it('devuelve usuario esperado', async () => {
            const id = await dao.addUser(datos)
            const user = await dao.getUserById(id)
            console.log('user enciontradioo ', user)
            assert.deepStrictEqual(user, datos)
        })
    })
    describe('busco usuario x id que no existe', async () => {
        it('devuelve mensaje esperado', async () => {
            await dao.addUser(datos)
            await assert.rejects(async () => {
                await dao.getUserById(8)
            }, error => {
                assert.deepStrictEqual("no se encontró 'usuario' con id: 8", error.message)
                return true
            })
        })
    })
})
