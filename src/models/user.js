const mongoose =  require("mongoose")

const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
}

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roles: {
          type: String,
          ref: "Role"
        }
      
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)