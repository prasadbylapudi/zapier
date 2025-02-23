import express from 'express';
import { PrismaClient } from '@prisma/client';

const client=new PrismaClient();
const app = express();

app.use(express.json());

//https:hooks.zapier.com/hooks/catch/123456/abcde
//password logic, only few people can access this endpoint
app.post('/hooks/catch/:userId/:zapId', async(req, res) => {

    const userId= req.params.userId;
    const zapId= req.params.zapId;
    const body=req.body;
    //store in db a new trigger.

    try {
        await client.$transaction(async (tx) => {
            const run = await client.zapRun.create({
                data:{
                    zapId:zapId,
                    metadata:body,   
                }
            });
        });

        //push it to a queue( redis/ kafka)
        console.log(req.body);
        res.send('OK');
    } catch (error) {
        console.error('Error creating zapRun:', error);
        res.status(500).send('Internal Server Error');
    }
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});