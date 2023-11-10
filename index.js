import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "books",
  password: "s1nc0ntr4s3n4",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = [
//   { id: 1, isbn: '9780393911909', summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac mauris laoreet, interdum ex et, bibendum justo. Maecenas ut tortor non ante tempor tristique." },
//   { id: 2, isbn: '9781412973991', summary: "Vivamus eget sodales erat, id elementum risus. In hac habitasse platea dictumst. Proin scelerisque vel lacus in dignissim." },
// ];
let items = [];

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY id DESC");
    items = result.rows;

    res.render("index.ejs", {
      listTitle: "Christian Sanchez's boos readed",
      listItems: items
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const itemISBN = req.body.newItemISBN;
  const itemSum = req.body.newItemSum;
  // items.push({ title: item });
  try {
    await db.query("INSERT INTO books (isbn, summary) VALUES ($1, $2)", [itemISBN, itemSum]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;

  try {
    await db.query("UPDATE books SET summary = ($1) WHERE id = $2", [item, id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
