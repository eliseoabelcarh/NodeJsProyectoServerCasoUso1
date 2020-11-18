const mongoose = require('mongoose')


const Schema = mongoose.Schema

const userSchemaColection = 'usuarios'

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