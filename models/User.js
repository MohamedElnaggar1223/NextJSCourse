import { Schema, model, models } from 'mongoose'

const UserPromptSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email Already Exists!'],
        required: [true, 'Please Enter Your Email!']
    },
    username: {
        type: String,
        required: [true, 'Please Enter Your Username!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String
    }
})

const UserPrompt = models.UserPrompt || model("UserPrompt", UserPromptSchema)

export default UserPrompt