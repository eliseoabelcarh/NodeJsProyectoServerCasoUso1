
const assert = require('assert')
const daoFactory = require('../../src/factories/daoFactory')

describe('TESTS PARA DAO USUARIOS MEMORIA', async () => {

    let dao

    before(async () => {
        dao = await daoFactory.getDao()
    })
    after(async () => {
        await dao.cleanAll()
    })

    describe('agrego usuario con DAO FACTORY ', async () => {
        it('devuelve un id diferente null', async () => {
            const datos = {
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
})
