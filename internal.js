const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {response, request} = require("express");
const app = express();
const session = require('express-session');
const search = require("./server");
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
   secret: 'g657SaSA$#@%^',
   resave: false,
   saveUninitialized: true,
   cookie: { secure: false } // Set to true if using HTTPS
}));

// ============ middleware ===================================

function isAuthenticated(req, res, next) {
   if (req.session.user) {
      return next();
   } else {
      res.status(401).json({ message: "Unauthorized access. Please log in first." });
   }
}
// ===========  middleware ===================================

app.use(bodyParser.json());

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname,'..', 'public', 'main.html'), err => {
      if (err) {
         console.error("Error sending file:", err);
         res.status(404).send("404 Not found");
      }
   });
});

app.get("/main", (req,res)=>{
   res.sendFile(path.join(__dirname, '..', 'public', 'main.html'));
});

app.get("/movies", (req,res)=>{
   res.sendFile(path.join(__dirname, '..', 'public', 'movies.html'));
});

app.get("/player", (req,res)=>{
   res.sendFile(path.join(__dirname, '..', 'public', 'player.html'));
});

app.get("/signup", (req, res)=>{
      res.sendFile(path.join(__dirname, '..', 'public', 'signup.html'));
});

app.post("/signup", (req, res) => {
   const { userName, password } = req.body;
   console.log("Received data", { userName, password });

   if (userName === "nethzi@3544sdsg.787" && password === "fdgtyt65887943@#$#") {
      req.session.user = { userName }; // Save user information in the session
      res.json({ success: true });
   } else {
      res.json({ success: false, message: "bad input" });
   }
});

app.get("/dashboard", isAuthenticated, (req, res) => {
   const filePath = path.join(__dirname, '..', 'public', 'dashbord.html');
   res.sendFile(filePath, (err) => {
      if (err) {
         console.log("Error sending file:", err);
         res.status(500).send("Server Error");
      } else {
         console.log("File sent successfully");
      }
   });
});

app.post("/dashboard/searchID", async (req, res) => {
   const name = req.body.name;

   try {
      const data = await search.searchMovie(name);
      if (data.length > 0) {
         console.log("Data found:", data);
         res.status(200).json(data);

      } else {
         console.log("No files found");
         res.status(404).json({ message: "Not Found" });
      }
   } catch (error) {
      console.log("Error: Internal Server error", error);
      res.status(500).json({ message: "Internal Server Error" });
   }
});

app.listen(3000, ()=>{
   console.log("Server is listening at port 3000");
});