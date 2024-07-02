const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose.set('strictQuery' , true)
   await mongoose.connect('mongodb+srv://admin:admin@cluster0.7ez8jka.mongodb.net/news', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect fail");
  }
}

async function createIndex(collectionName, index) {
  try {
    const db = mongoose.connection;
    await db.collection(collectionName).createIndex(index);
    console.log(`Index created on ${collectionName}:`, index);
  } catch (error) {
    console.error(`Failed to create index on ${collectionName}:`, error);
  }
}

async function dropIndex(collectionName, indexName) {
  try {
    const db = mongoose.connection;
    await db.collection(collectionName).dropIndex(indexName);
    console.log(`Index dropped on ${collectionName}:`, indexName);
  } catch (error) {
    console.error(`Failed to drop index on ${collectionName}:`, error);
  }
}



module.exports = { connect, createIndex, dropIndex };
