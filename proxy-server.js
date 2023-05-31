const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();

app.use(cors({
  origin:"*"
}))

app.get('/products', async (req, res) => {
  try {
    const response = await axios.get('https://services.odata.org/V2/Northwind/Northwind.svc/Products?$format=json');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

const PORT = 3001; // Choose a port number for your proxy server
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
