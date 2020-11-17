
const { createWorker } = require('tesseract.js')
const fs = require('fs')
const { getNombresYApellidosDeData } = require('../shared/functions')

const createTextFromImageReader = async () => {
    const logger = {
        logger: m => {
            let num = m.progress
            num = Number.parseFloat(num * 100).toFixed(2)
            console.log(num + '%')
        },
    }

    return {
        readTextFromImage: async (pathImage) => {
            try {

                const worker = createWorker(logger)
                if (!fs.existsSync(pathImage)) {
                    throw new Error('no existe ruta o archivo')
                }
                await worker.load();
                await worker.loadLanguage('eng');
                await worker.initialize('eng');
                const { data: { text } } = await worker.recognize(pathImage);
                await worker.terminate(); return text

            } catch (error) {
                throw handleError(error)
            }

        },
        getNombresYApellidosDeData: async (text) => {
            return await getNombresYApellidosDeData(text)
        }
    }

}

function handleError(error) {
    if (error.message === 'no existe ruta o archivo') {
        return error
    }
    else {
        return new Error('algo salió mal')
    }
}

module.exports = {
    createTextFromImageReader
}