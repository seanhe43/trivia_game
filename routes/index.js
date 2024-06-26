var express = require('express');
var router = express.Router();
const axios = require("axios");
const baseURL = "https://opentdb.com/api.php";

const fs = require("fs");

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

function setScores(res, params) {
  if(!params.score) {
    fs.writeFileSync("scores.json", "")
    return;
  }
  // = JSON.parse(fs.readFileSync("scores.json", "utf8"));
  let score_file = fs.readFileSync("scores.json", "utf8");
  if (score_file === "") {
    score_file = "[]"
  }
  let score_list = JSON.parse(score_file);
  score_list.push([params.score, params.total]);
  let score_json = JSON.stringify(score_list);
  
  fs.writeFileSync("scores.json", score_json);
}

function getScores(){
  let score_file = fs.readFileSync("scores.json", "utf8");
  if (score_file === "") {
    return;
  }
  let score_list = JSON.parse(score_file);
  let score_string = "| ";
  for(let i = 0; i < score_list.length; i++) {
    score_string += `${score_list[i][0]}/${score_list[i][1]} | `;
  }
  return score_string;
}

router.get('/score', function(req, res, next) {
  setScores(res, req.query);
  res.redirect("/")
  
});

router.get("/", function(req, res, next) {
  res.render("index", {scores: getScores()});
});


router.get('/submit', async function(req, res, next) {
  let q = req.query;
  /* console.log(q); */
  for (p in q) {
    if(q[p] === "any") {
      delete q[p];
    }
  }
  try {
    let questions = await getTrivia(q);
    res.render("game", {qs: JSON.stringify(questions.results)});
  }
  catch(e) {
    console.error(e);
  }
  
  
});





module.exports = router;
