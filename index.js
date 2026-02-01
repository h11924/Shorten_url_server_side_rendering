const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");//we are getting the routers here 
const URL = require("./models/url");//we are getting the scheme here 

const app = express();
const PORT = 8001;

// Connection to MongoDB
connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

// This syntax (Middleware) is used to parse JSON data from the request body
app.use(express.json());//When a user sends you data (like a long URL), it usually arrives as a big chunk of text. This line acts like a Translator that turns that text into a clean JavaScript object so you can read req.body.url easily.

// Main URL routes
app.use("/url", urlRoute);

// Redirection Logic: This handles the actual short URL click
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  
  // findOneAndUpdate is used to find the ID and push a new visit timestamp simultaneously
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  
  // res.redirect sends the user to the original long URL stored in the DB
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

/**
 * The "Plain English" Summary of index.js
"Hey, bring in the tools": First, we grabbed the Express "manager," the MongoDB "connector," our "signposts" (routes), and the "blueprint" (model) for our data.

"Connect to the database": We told the server to open a connection to our local MongoDB so we can actually store and retrieve things.

"Use a translator": We added a line (express.json) to make sure that if a user sends us a long URL in a JSON format, the server understands it.

"Watch the /url path": We told the server, "If anyone visits any link starting with /url, let the specialist urlRoute file handle the logic."

"The Big Redirection Step": When someone visits a short link like localhost:8001/xyz123, the server follows your exact logic:

Find it: "Find the record for xyz123."

Don't delete: "Don't overwrite anything."

Push: "Just push the current time into the visitHistory list so I can track the click."

Give me the data: "When you're done, give me that record back."

Redirect: "Now that I have the data, I see the original URL is google.com, so teleport the user there!"

"Open the doors": Finally, we told the server to sit at Port 8001 and wait for people to start visiting.
 */