const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let items = ["Go to the gym", "Eat breakfast", "Go grocery shopping"];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle: day, newItems: items});
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List" ,newItems: workItems})
})

app.get("/about", function(req, res){
    res.render("about")
})


app.post("/", function(req, res){
    let item = req.body.nextInput;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
})

app.listen(3000, function(req, res){
    console.log('Server is running on port 3000');
})