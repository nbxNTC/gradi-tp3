const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://root:5txsNqF5sge0IEo2@gradi.bq9dd.mongodb.net/retryWrites=true&w=majority";

const Connect = async () => {
    const client = new MongoClient(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    await client.connect();
}

module.exports = Connect()

