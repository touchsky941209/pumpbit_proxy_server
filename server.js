const PORT = 8080;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan")
require("dotenv").config();

const app = express();

app.use(cors());
app.use(morgan("dev"))


app.get("*", (req, res) => {

  const fullUrl = req.originalUrl;
  const accessToken = req.headers.authorization
  const options = {
    method: "GET",
    url: "https://api.inftytrade.xyz" + fullUrl,
    headers: {
      "X-CMC_PRO_API_KEY": process.env.REACT_APP_MARKET_CAP_KEY,
      "Authorization": accessToken
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});


app.post("*", (req, res) => {


  const fullUrl = req.originalUrl;
  const accessToken = req.headers.authorization
  const body = req.body

  const options = {
    method: "POST",
    url: "https://api.inftytrade.xyz" + fullUrl,
    headers: {
      "X-CMC_PRO_API_KEY": process.env.REACT_APP_MARKET_CAP_KEY,
      "Authorization": accessToken
    },
    body: body

  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});