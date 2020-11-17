

function crearErrorArgumentosInvalidos(campo, regla) {
    const errMsg = `${campo}: ${regla}`
    const error = new Error(errMsg)
    error.type = 'INVALID_ARGS'
    return error
}
function crearErrorAlEnviarEmail(operacion) {
    const errMsg = 'error al enviar email'
    const err = new Error(`${operacion} - ${errMsg}`)
    err.type = 'INTERNAL_ERROR'
    return err
}



module.exports = {

    crearErrorArgumentosInvalidos, crearErrorAlEnviarEmail
}