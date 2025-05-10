const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const URL = require("./models/url");


const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { connected } = require("process");// idk what its purpose 

const app = express();
const PORT = 8001;

connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
);



app.use(express.static('public'));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//json or form ka data support kr ske
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
// restrictToLoggedinUserOnly login hona jruri h 
app.use("/user", userRoute); 
app.use("/", checkAuth, staticRoute); 
// checkauth is used because there are so many users 
// each user only see his /her generated users
// jse hites or neeraj ne login kra to hitesh apne urls dkh ske or neeraj apne
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));




// note:
// run 
// node index.js
// then mongodb connected
// go to web run 
// http://localhost:8001/ it will open you home page check in static route first then 
// http://localhost:8001/signup check in static route