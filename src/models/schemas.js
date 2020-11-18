const mongoose = require('mongoose')


const Schema = mongoose.Schema

const userSchemaColection = 'usuarios'


/**
* @typedef APP-MONGO-SCHEMA-MODEL 
* @description Modelo de Datos para Colección Usuarios en MongoDb y en Aplicación
* @property {Number} id Id de usuario generado por aplicación
* @property {String} nombres nombres de usuario
* @property {String} apellidos apellidos de usuario
* @property {String} email email de usuario
* @property {String} pathDniFront ruta de archivo de imagen Dni en servidor
*/
const UserSchema = new Schema({
    id: Number,
    nombres: String,
    apellidos: String,
    email: String,
    pathDniFront: String,
})

const UserModelMongoose = mongoose.model(userSchemaColection, UserSchema)

const Models = {
    UserModelMongoose
}

module.exports = Models