function stringCut(str) {
    var nstr = str.split(/\n/);
    return nstr.slice(0, 10);
}
function fix1(data) {
    return data.split(' ').filter(strin => {
        return strin.trim().length > 1
    })
}
function fix2(array) {
    let arrayAntesDeUnir = array.filter(palabra => {
        palabra = palabra.trim()
        if (palabra.length > 1) {
            return palabra
        }
    })
    let dato = ''
    arrayAntesDeUnir.forEach(element => {
        dato += (element + ' ')
    });
    dato = dato.trim()
    return dato
}

async function getNombresYApellidosDeData(text) {
    const data = stringCut(text)
    let apellidos = data[4]
    let nombres = data[6]
    let array1 = fix1(apellidos)
    let array2 = fix1(nombres)
    apellidos = fix2(array1)
    nombres = fix2(array2)
    //TODO remplazar Ñ por N
    apellidos = apellidos.toUpperCase().trim()
    nombres = nombres.toUpperCase().trim()
    return { apellidos, nombres }
}


module.exports = {
    getNombresYApellidosDeData
}
