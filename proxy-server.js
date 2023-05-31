const express = require('express');

const app = express();

app.get('/products', async (req, res) => {
  try {
    const response = await fetch('https://services.odata.org/V2/Northwind/Northwind.svc/Products?$format=json');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

const PORT = 3001; 
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});

