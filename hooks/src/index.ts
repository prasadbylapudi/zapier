import express from 'express';

const app = express();

app.use(express.json());

//https:hooks.zapier.com/hooks/catch/123456/abcde
//password logic, only few people can access this endpoint
app.post('/hooks/catch/:userId/:zapId', (req, res) => {

    const userId= req.params.userId;
    const zapId= req.params.zapId;

    //store in db a new trigger.

    //push it to a queue( redis/ kafka)
    console.log(req.body);
    res.send('OK');   
})