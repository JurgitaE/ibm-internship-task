const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/search', (req, res) => {
    console.log(`Searched:  ${req.body.symbol}`);

    res.json({ message: `Server logged search ${req.body.symbol}` });
});
app.post('/select', (req, res) => {
    console.log(`Selected:  ${req.body.symbol}`);

    res.json({ message: `Server logged select ${req.body.symbol}` });
});
app.listen(port, () => {
    console.log(`Crypto Chart App is on port number: ${port}`);
});
