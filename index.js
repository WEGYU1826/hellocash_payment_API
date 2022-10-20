const express = require('express');
const app =express();
const dotenv = require("dotenv");
const betRoutes = require('./routes/Bets');
const port = process.env.PORT || 5000;
dotenv.config();
app.use(express.json());
app.use("/api/bets", betRoutes);

app.use("*", 
  (req, res) => {
  res.status(404).json({
    message: "Page Not Found",
    success: false,
  });
});

app.use(function(err,req,res,next){
    res.status(500).json({
      message:'Something Went Wrong',
      success:false,
      error:err.message
    })
  
  })

app.listen(port, () => {
    console.log(`FantasyBet Server is Running at port ${port}!`);
  });