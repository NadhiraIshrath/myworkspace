// var faker = require("faker");
// console.log("**RANDOM PRODUCTS**");
// // var randomName = faker.name.findName(); // Rowan Nikolaus
// // var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
// // var randomCard = faker.helpers.createCard(); // random contact card containing many properties
// // // console.log(randomName);
// // // console.log(randomEmail);
// // // console.log(randomCard);
// for (var i = 0; i < 10; i++) {
//     console.log(faker.commerce.productName() + " " + "-" + " " + "$" + faker.commerce.price());
// }
var express = require("express");
var app = express();
// app.get("/", function(request, response) {
//     response.send("Hi Human!!");
// });
app.get("/repeat/:word/:number", function(request, response) {
    var word = request.params.word;
    var number = Number(request.params.number);
    var result = "";
    for (var i = 0; i < number; i++) {
        // response.send(word);
        result += word + " ";
    }
    response.send(result);
    response.send(word + " " + number);
});
app.get("*", function(request, response) {
    response.send("Sorry cant find page");
});
// app.set('port', process.env.PORT || 3000);
app.listen(3000, function() {
    console.log("RESPONDED");
});