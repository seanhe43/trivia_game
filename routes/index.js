var express = require('express');
var router = express.Router();
const axios = require("axios");
const baseURL = "https://opentdb.com/api.php";

async function getTrivia(params) {
  try {
      const response = await axios.get(`${baseURL}`, {params});
      /* console.log(JSON.stringify(response.data)); */
      return response.data;
  }
  catch (err) {
      console.log(err);
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index");
});

router.get('/submit', async function(req, res, next) {
  let q = req.query;
  /* console.log(q); */
  for (p in q) {
    if(q[p] === "any") {
      delete q[p];
    }
  }
  let questions = await getTrivia(q);
  //console.log(questions.results);
  res.render("game", {qs: JSON.stringify(questions.results)});
});





module.exports = router;
