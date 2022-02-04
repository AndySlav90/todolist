const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
let items = ["prepare your hair", "kiss wife"];
let workItems = ["take a course"];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  exteded: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  let day = date.getDate();
    res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
  items.push(item);
  res.redirect("/");
}
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems});
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(4000, function() {
  console.log("Server runs on 4000");
});
