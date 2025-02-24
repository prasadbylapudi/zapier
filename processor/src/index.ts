import { PrismaClient } from '@prisma/client';
import { Kafka } from 'kafkajs';

const TOPIC_NAME="zap-events"

const client=new PrismaClient();

const kafka = new Kafka({
    clientId: 'out_box processor',
    brokers: ['localhost:9092',]
  })

async function main(){
    const producer = await kafka.producer()
    await producer.connect()
    while(1){
       const pendingRows=await client.zapRunOutbox.findMany({
           where:{},
           take:10,
       });  
       //publish the pending rows to kafaka.
        producer.send({
            topic:TOPIC_NAME,
            messages: pendingRows.map(r=>({
                value:r.zapRunId
            }))
         })

        
        await client.zapRunOutbox.deleteMany(
            {
                where:{
                    id:{
                        in:pendingRows.map(r=>r.id)
                    }
                }
            }
        )
    }
}
main()