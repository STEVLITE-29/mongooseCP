import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    age: {type: Number, min: 18},
    email: {type: String, required: true, trim: true, unique: true, lowercase: true},
    favouriteFoods: [{type: String}],
    hobbies: [{type: String}]
})

const Person = mongoose.model('persons', personSchema);
export default Person;
