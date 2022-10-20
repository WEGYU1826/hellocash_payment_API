const dotenv =require('dotenv');
const fetch = require('node-fetch');
dotenv.config()

const createBets = async (req, res) => {
  const {stake} = req.body;
  if(!stake){
    res.status(401).json({message: 'stack is required',  success: false , code: 401});
    return;
  }

  var amount = 0;

  const body = {
    amount: stake,
    description: 'For bet from Fantasy bet',
    from: "+251922014886",
    notifyfrom: true,
  };
  const authBody = {
    principal: process.env.PRINCIPAL,
    credentials: process.env.CREDENTIAL,
    system: process.env.SYSTEM,
  };
  try {
    const authResponse = await fetch(
      "https://api-et.hellocash.net/authenticate",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authBody),
      }
    );
    const authData = await authResponse.json();
    console.log(authData);
    const invoiceResponse = await fetch(
      "https://api-et.hellocash.net/invoices",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.token}`,
        },
        body: JSON.stringify({ ...body, amount: stake }),
      }
    );
    const invoiceData = await invoiceResponse.json();
    const { amount, status } = invoiceData;
    console.log(invoiceData);
    res.status(201).json({ invoiceData });
  } catch (error) {
    
    res.status(500).json({
      message:'Error Occurred',
      error,
      success:false
    });
  }
};

module.exports = {
  createBets,
};