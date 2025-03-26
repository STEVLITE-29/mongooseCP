import mongoose from 'mongoose';
import Person from "./models/person.js";
import dotenv from 'dotenv';
dotenv.config();

// Function to connect to MongoDB database
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "myData" });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
};

// Function to create and save a new record
const newRecord = async () => {
    try {
        const person = new Person({
            name: "Han Solo",
            age: 45,
            email: "han.solo@starwars.com",
            favouriteFoods: ["Pizza", "Sushi", "burritos"],
            hobbies: ["Flying", "Piloting", "Smuggling"],
        });
        await person.save(); // Save the document to the database
        console.log("New record added");
    } catch (error) {
        console.error("Failed to add new record", error);
    }
};

// Function to insert multiple records into the database
const manyRecords = async () => {
    try {
        await Person.create([
            {
                name: "Mary",
                age: 900,
                email: "yoda@jedi.com",
                favouriteFoods: ["Fish", "Fruits", "Berries"],
                hobbies: ["Meditating", "Jedi Training", "Gardening"]
            },
            {
                name: "Mace Windu",
                age: 53,
                email: "mace@jedi.com",
                favouriteFoods: ["Steak", "Rice", "Green Tea"],
                hobbies: ["Lightsaber Combat", "Meditation", "Teaching"]
            },
            {
                name: "Obi-Wan Kenobi",
                age: 57,
                email: "kenobi@jedi.com",
                favouriteFoods: ["Soup", "Bread", "burritos"],
                hobbies: ["Training Younglings", "Studying Jedi Archives", "Piloting"]
            }
        ]);
        console.log("Many records added");
    } catch (error) {
        console.error("Failed to add many records", error);
    }
};

// Function to retrieve records from the database
const getRecords = async () => {
    try {
        const getByName = await Person.find({ name: "Luke Skywalker" }); // Find by name
        const getByFood = await Person.findOne({ favouriteFoods: { $in: "Fruit" } }); // Find one person who likes "Fruit"
        const getById = await Person.findById({ _id: "67e42d67f64e5c675e278583" }); // Find by ID
        console.log(getByName);
        console.log(getByFood);
        console.log(getById);
    } catch (error) {
        console.error("Failed to get records", error);
    }
};

// Function to update a person's favouriteFoods by adding "hamburger"
const updateRecords = async (personId) => {
    try {
        const updatePerson = await Person.findById({ _id: personId });
        updatePerson.favouriteFoods.push("hamburger"); // Add "hamburger" to their favouriteFoods array
        await updatePerson.save(); // Save the updated record
        console.log(updatePerson);
    } catch (error) {
        console.error("Failed to update records", error);
    }
};

// Function to update a person's age to 20
const newUpdates = async (personName) => {
    try {
        const change = await Person.findOneAndUpdate(
            { name: personName },
            { $set: { age: 20 } },
            { new: true }
        );
        console.log(change);
    } catch (error) {
        console.error("Failed to update records", error);
    }
};

// Function to delete a single record by ID
const deleteRecord = async (personId) => {
    try {
        await Person.findOneAndDelete({ _id: personId });
    } catch (error) {
        console.error("Failed to delete records", error);
    }
};

// Function to delete multiple records with the name "Mary"
const deleteManyRecords = async (done) => {
    try {
        const result = await Person.deleteMany({ name: "Mary" });
        console.log("Deleted records:", result);
        done(null, result);
    } catch (error) {
        console.error("Failed to delete records", error);
        done(error);
    }
};

// Function to find people who like "burritos", sort by name, limit results to 2, and exclude age
const searchBurritoLovers = async () => {
    try {
        const data = await Person.find({ favouriteFoods: { $in: ["burritos"] } })
            .sort({ name: 1 }) // Sort results by name in ascending order
            .limit(2) // Limit results to 2 documents
            .select("-age"); // Exclude the age field from the results
        
        console.log("Burrito lovers:", data);
        return data;
    } catch (error) {
        console.error("Search query failed", error);
        throw error;
    }
};

// Main function to execute all operations
const main = async () => {
    await connectdb();
    await newRecord(); // create a new record
    await manyRecords(); // insert multiple records
    await getRecords(); // Fetch records from the database
    await updateRecords("67e42d67f64e5c675e278582"); // Update a record
    await newUpdates("Mace Windu"); // Update a record by name
    await deleteRecord("67e42d67f64e5c675e27857f"); // Delete a record by ID
    
    // Delete multiple records and pass a callback function
    await deleteManyRecords((err, result) => {
        if (err) {
            console.log("Error deleting many records:", err);
        } else {
            console.log("Deletion result:", result);
        }
    });
    
    try {
        const burritoLovers = await searchBurritoLovers(); // Find burrito lovers
        console.log("Burrito lovers found:", burritoLovers);
    } catch (error) {
        console.log("Error:", error);
    }
};

// Execute the main function
main();
