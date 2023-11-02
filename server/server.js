const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
const axios = require("axios");

app.get("/", (_, response) => response.json("Root route for translatim."));

// /translate?word=hello&from=en&to=es
//english to spanish
app.get("/translate", async (request, response) => {
  // get word, to, and from (get from the query which is endpoint)

  //before deconstruction of properties in request.query into variables
  // const word = request.query.word;
  // const from = request.query.from;
  // const to = request.query.to;

  const { word, from, to } = request.query;

  const API = `https://api.mymemory.translated.net/get?q=${word}&langpair=${from}|${to}`;
  // my memoryapi documentation - change it/${to} to es for espanol - guess

  // use axios to call our API
  const res = await axios.get(API);
  // async + await so we get back a result not a promise

  const wrangledData = {
    translation: res.data.responseData.translatedText,
    match: res.data.responseData.match,
  };
  response.json(wrangledData);
});
// query - anything after the question mark

app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));

// in url browser - http://localhost:8080/translate?word=hello&from=en&to=es
