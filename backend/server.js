const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('PC Estimator API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const parts = [
    { category: "CPU", name: "Intel Core i5-13600K", price: 35000 },
    { category: "CPU", name: "AMD Ryzen 5 7600X", price: 40000 },
    { category: "GPU", name: "NVIDIA RTX 4070", price: 90000 },
    { category: "RAM", name: "16GB DDR5", price: 12000 },
    { category: "SSD", name: "1TB NVMe SSD", price: 15000 },
    { category: "Motherboard", name: "ASUS Prime B760M", price: 25000 }
];

app.get('/parts', (req, res) => {
    res.json(parts);
});

