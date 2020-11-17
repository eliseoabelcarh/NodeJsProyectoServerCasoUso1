
const assert = require('assert')
const { crearModeloUsuario } = require('../../src/models/usuario')



describe(' TEST PARA MODELO USUARIO.JS', async () => {

    describe('agrego campo email a usuario nuevo', () => {
        it('devuelve esperado', () => {
            const nombreUsuarioEsperado = 'Abel'
            const apellidoUsuarioEsperado = 'Carh'
            const emailEsperado = 'algo@gmail.com'
            let idExistenciaEsperada = false
            const datos = {
                nombres: nombreUsuarioEsperado,
                apellidos: apellidoUsuarioEsperado,
                email: emailEsperado
            }
            const userRecibido = crearModeloUsuario(datos)
            assert.deepStrictEqual(userRecibido.email, emailEsperado)
            if (userRecibido.id) {
                idExistenciaEsperada = true
            }
            assert.deepStrictEqual(idExistenciaEsperada, true)

        })
    })


})
