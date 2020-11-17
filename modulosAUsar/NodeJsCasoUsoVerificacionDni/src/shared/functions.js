function stringCut(str) {
    var nstr = str.split(/\n/);
    return nstr.slice(0, 10);
}

async function getNombresYApellidosDeData(text) {
    const data = stringCut(text)
    apellidos = data[4]
    nombres = data[6]
    return { apellidos, nombres }
}


module.exports = {
    getNombresYApellidosDeData
}
