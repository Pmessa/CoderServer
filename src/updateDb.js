import {MongoClient} from 'mongodb'

async function updateDocuments() {
    const uri = "mongodb://0.0.0.0:27017/commerceDev";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("commerceDev");
        const collection = database.collection("products");

        const documents = await collection.find().skip(500).toArray();

        for (let doc of documents) {
            await collection.updateOne(
                { _id: doc._id },
                { $set: { "supplier_id": '2' } }
            );
        }

        console.log("Successfully updated 500 documents.");
    } finally {
        await client.close();
    }
}

updateDocuments().catch(console.error);
