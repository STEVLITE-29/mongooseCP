# MongoDB and Mongoose CRUD Operations

This project demonstrates how to perform CRUD (Create, Read, Update, Delete) operations using MongoDB and Mongoose in a Node.js environment. It includes functions to add, retrieve, update, and delete records in a MongoDB database.

## Technologies Used
- Node.js
- MongoDB
- Mongoose
- dotenv (for environment variables)

## Setup Instructions

### 1. Install Dependencies
Run the following command to install the required dependencies:
```sh
npm install
```

### 2. Create a `.env` File
Inside your project root directory, create a `.env` file and add your MongoDB connection string:
```env
MONGO_URI=your_mongodb_connection_string
```

### 3. Run the Project
Execute the following command to start the script:
```sh
node index.js
```

## Features

### Connecting to MongoDB
The script connects to MongoDB using the connection string stored in the `.env` file.

### Creating Records
- `newRecord()`: Adds a single record to the database.
- `manyRecords()`: Adds multiple records at once.

### Retrieving Records
- `getRecords()`: Retrieves records based on name, favorite food, or ID.
- `searchBurritoLovers()`: Finds people who like burritos, sorts them by name, limits results to two, and hides their age.

### Updating Records
- `updateRecords(personId)`: Adds "hamburger" to the `favouriteFoods` array of a person by ID.
- `newUpdates(personName)`: Updates a person's age to 20 using their name.

### Deleting Records
- `deleteRecord(personId)`: Deletes a single record using `findOneAndDelete`.
- `deleteManyRecords(done)`: Deletes all records where the name is "Mary" using `deleteMany()` and passes the result to the callback function.

## Running Specific Operations
Inside the `main()` function, you can uncomment the required operations before running the script.

## Example Output
```
Connected to MongoDB
New record added
Many records added
Burrito lovers: [{ name: "Obi-Wan Kenobi", favouriteFoods: [...] }]
Deleted records: { deletedCount: 1 }
```

## Notes
- `exec()` no longer accepts callbacks, so `.then()` or `await` is used for chaining queries.
- The `done()` callback is used for testing purposes in the `deleteManyRecords()` function.

## Author
- **Stephen Okeh**

## License
This project is licensed under the StephenCodes License.

