const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ezCommerceDB', { useNewUrlParser: true });

//

var ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 45, minlength: 3 },
    category: { type: String, required: true, maxlength: 45, minlength: 3 },
    description: { type: String, required: true, maxlength: 280, minlength: 3 },
    price: { type: Number, required: true },
    popularity: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

mongoose.model('Product', ProductSchema);
var Product = mongoose.model("Product");


//
var serverPort = 6795;
app.listen(serverPort);

//

app.get('/api/products', function (request, response) {
    Product.find({}, function (err, data) {
        if (err) {
            response.json(err);
        }
        else {
            response.json({ data: data });
        }
    });
});

app.get('/api/filter/:tag', function (request, response) {
    let filterTag = request.params.tag;
    Product.find({ category: filterTag }, function (err, data) {
        if (err) {
            response.json(err);
        }
        else {
            response.json({ data: data });
        }
    });
});

app.post('/api/product', function (request, response) {
    let newTitle = request.body['title'];
    console.log(newTitle);
    let newCategory = request.body['category'];
    console.log(newCategory);
    let newDesc = request.body['description'];
    console.log(newDesc);
    let newPrice = request.body['price'];
    console.log(newPrice);
    let newPopularity = request.body['popularity'];
    console.log(newPopularity);

    let newProduct = new Product({
        title: newTitle,
        category: newCategory,
        description: newDesc,
        price: newPrice,
        popularity: newPopularity
    });

    // newProduct.markModified('tags');

    newProduct.save(function (err) {
        if (err) {
            response.json(err);
        }
        else {
            response.json(newProduct);
        }
    });
});

app.put('/api/popularity', function (request, response) {
    let targetId = request.body['id'];
    let increment = request.body['increment'];

    Product.findOne({ _id: targetId }, function(err, product){
        if(err){
            response.json(err);
        }
        else{
            product['popularity'] += increment;

            product.save(function (err){
                if(err){
                    response.json(err);
                }
                else{
                    response.json(product);
                }
            });
        }
    });
});

app.delete('/api/delete/:id', function (request, response) {
    let targetId = request.params.id;

    Product.deleteOne({ _id: targetId }, function (err) {
        if (err) {
            response.json(err);
        }
        else {
            response.json({ message: `Deleted Product w/ ID#: ${targetId}` });
        }
    })
});


//

var path = require("path");

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./dist/public/index.html"));
});

//

