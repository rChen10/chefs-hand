const express = require('express')
const app = express()

app.get('/test', (req,res) => {
    res.send({hello: 'Hello, World!'});
});

port = process.env.PORT || 5000;
app.listen(port, () => { console.log('Listening on port ${port}')});