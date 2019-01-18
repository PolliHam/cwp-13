const express = require('express');
const app = express();
const port = 3000;

app.use('/api', require('./routers/api'));


app.listen(port, () =>
{
    console.log('Example app listening on port 3000!..');
})