
const assert = require('assert')
const daoUsuariosMemoria = require('../../src/dao/daoUsuariosMemoria')



describe('TESTS PARA DAO USUARIOS MEMORIA', () => {

    let dao
    before(async () => {
        dao = await daoUsuariosMemoria.getInstance()
    })
    after(async () => {
        await dao.cleanAll()
    })

    describe('agrego usuario a Dao ', async () => {

        it('devuelve un id diferente null', async () => {
            const datos = {
                //id: 25,
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
