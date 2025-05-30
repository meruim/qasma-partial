const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/:role/:page", (req, res) => {
  const { role, page } = req.params;
  const filePath = path.join(__dirname, "public", role, page);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.redirect("/assets/notfound");
    }
  });
});

app.get("/:role", (req, res) => {
  const { role } = req.params;
  const filePath = path.join(__dirname, "public", role, "index.html");

  res.sendFile(filePath, (err) => {
    if (err) {
      res.redirect("/assets/notfound");
    }
  });
});

//show errors if no match path
app.use((req, res) => {
  res.redirect("/assets/notfound");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
