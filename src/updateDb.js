import {MongoClient, ObjectId} from 'mongodb'

async function updateDocuments() {
    const uri = "mongodb://0.0.0.0:27017/commerceDev";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("commerceDev");
        const collection = database.collection("products");
        const usersCollection = database.collection("users");

        const documents = await collection.find().limit(500).toArray();

//        const referenceUser = await usersCollection.findOne({}, { sort: { _id: 6682c7c751722d0acc73803c } });
        const referenceId = new ObjectId("6682c7c751722d0acc73803c"); // Usamos el _id del primer usuario como referencia


        for (let doc of documents) {
            await collection.updateOne(
                { _id: doc._id },
                { $set: { "supplier_id": referenceId } } // Actualiza supplier_id con la referencia del usuario
            );
        }

        console.log("Successfully updated 500 documents.");
    } finally {
        await client.close();
    }
}

updateDocuments().catch(console.error);
