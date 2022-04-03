const express = require('express');
const app = express();
const adapter = require('./adapter')
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => res.send({status: 'OK'}))

app.get('/boleto/:digitable_line', adapter.getCodeBar)

app.listen(PORT, () => {
    console.log("Server is running in port "+PORT)
    console.log("Access: http://localhost:"+PORT)
})