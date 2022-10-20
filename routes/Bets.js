const router =require('express').Router()
const dotenv =require('dotenv')
const {createBets} = require('../controller/Bets')
dotenv.config()

router.post("/",createBets);

module.exports =  router;