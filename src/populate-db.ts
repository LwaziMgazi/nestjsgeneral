import { maboItem } from "./model/maboItems";

console.log("Populating the MongoBD with startup data");

const MongoClient = require('mongodb').MongoClient;

const ObjectId = require('mongodb').ObjectID;

const MONGODB_CONNECTION_URL = 'mongodb+srv://nestjs-admin:IloveGod2@cluster0.wxmek.mongodb.net/umabo?retryWrites=true&w=majority';

const dbName: string= 'umaboItems';

//create  new MongoClient

const client = new MongoClient(MONGODB_CONNECTION_URL);

//connecgt to Mongo Server and perform operations

client.connect(async (err,client)=>{
   try{
     if(err){
        console.log("Error Connecting to the database");
        process.exit();
     }

     console.log('Connected correctly');
     const db= client.db(dbName);
     const umaboItems = maboItem;

     for(let i=0 ; i< umaboItems.length; i++) {
        const item = umaboItems[i];
       console.log('single course from arry with i',item);
       const newItem = {...item};
       console.log('single item with destructor',newItem);
       delete newItem.id;

       console.log('inserting .....')
       const result = await db.collection('maboitems').insertOne(newItem);

     }
     console.log('Finished uploading data');

     client.close();
     process.exit();

   }catch(error){
         console.log('Error caught, exiting', error);
         client.close();
         process.exit();
   }
});