import { PrismaClient } from '@prisma/client';
import { Kafka } from 'kafkajs';
const TOPIC_NAME="zap-events"
const client=new PrismaClient();
const kafka = new Kafka({
    clientId: 'out_box processor',
    brokers: ['localhost:9092',]
  })
async function main(){

    const consumer = kafka.consumer({ groupId: 'main-worker' })
    await consumer.connect()
    await consumer.subscribe({ topic:TOPIC_NAME, fromBeginning: true })
    await consumer.run({
    autoCommit:false,
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
            partition,
            message:message.offset,
            value:message?.value?.toString(),
        }), 
        //just some waitig time.
        await new Promise(r=>setTimeout(r,2000))
        console.log("processing done")
        await consumer.commitOffsets([
            {
                topic:TOPIC_NAME,
                partition:partition,
                offset: (parseInt(message.offset)+1).toString(),
            }
        ])
    },
    })
}

main();