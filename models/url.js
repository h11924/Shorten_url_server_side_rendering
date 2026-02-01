const mongoose = require("mongoose");

// This syntax (Schema) is used to define the structure of your data in MongoDB
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true, // Ensures no two URLs have the same short ID
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }], // Stores an array of visit times
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

/**
 * shortId:

type: String: "It must be text."

required: true: "You cannot save a link without giving it a short ID."

unique: true: "No two people can have the same short ID. If 'xyz' is taken, nobody else can use it."

redirectURL:

type: String: "This is the long, original link (text)."

required: true: "You can't shorten nothing! You have to provide the original URL."

visitHistory:

[{ timestamp: { type: Number } }]: "This is a List (Array). Every time someone clicks, we will drop a number (the time) into this list."
 Yes! The Schema is like a folder. When you create the link, you put the 'Address' inside. Every time someone visits, you open that same folder and add a 'Time Stamp' to the list. You don't need a new folder; you just keep adding notes to the one you already have."*/
const URL = mongoose.model("url", urlSchema);

module.exports = URL;