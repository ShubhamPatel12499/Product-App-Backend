const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();

app.use(cors({
  origin:"*"
}))

app.get('/products', async (req, res) => {
  let page=req.query.$skiptoken;
  
  try {
    await axios.get(`https://services.odata.org/V2/Northwind/Northwind.svc/Products?$format=json&$skiptoken=${page}`).then((r)=>{
        res.send(r.data)
    }).catch((err)=>{
      res.send("Error");
    })
   
    
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get("/products/:Id", async(req,res)=>{
  const id=req.params.Id;
  try {
    await axios.get(`https://services.odata.org/V2/Northwind/Northwind.svc/Products(${id})?$format=json`).then((r)=>{
        res.send(r.data)
    }).catch((err)=>{
      res.send("Error");
    })
   
    
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
  
})


const PORT = 3001; // Choose a port number for your proxy server
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
