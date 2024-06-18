const express = require('express');
const app = express();
const port = 8080;

// try to make an get type api
app.get('/', (req, res) => {
    //req contains all data for the request 
    //res contains all data for the response
    res.send('Hello World!');
});

// Run on Server on Port 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


