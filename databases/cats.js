// var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/cat_app");
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://Nadhira:nadhi_134@cluster0-cyeqp.mongodb.net/dogs?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Nadhira:nadhi_134@cluster0-cyeqp.mongodb.net/dogs?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
var catschema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});
var Cat = mongoose.model("Cat", catschema);
// var george = new Cat({
//     name: "George",
//     age: 11,
//     temperament: "Grouchy"
// });
// george.save(function(err, cat) {
//     if (err) {
//         console.log("ERROR!!");
//     } else {
//         console.log("ADDED AN ITEM");
//         console.log(cat);
//     }

// });
Cat.create({
    name: "SnowWhite",
    age: 15,
    temperament: "Bland"
}, function(err, cat) {
    if (err) {
        console.log("ERROR");
    } else {
        console.log(cat);
    }
});
Cat.find({}, function(err, cats) {
    if (err) {
        console.log("ERROR");
    } else {
        console.log("CATS");
        console.log(cats);
    }
});