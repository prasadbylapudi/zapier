## Zapier Project

## Schema

![Image](https://github.com/user-attachments/assets/150bef75-a55f-48d5-89cb-bd9689de91c9)

Imagine like in github for any issues or pull requests you wanted to award the users with some bounty.

whenever a pullrequest or comment on issue like bounry 10$ we will trigger a webhook in the zapier and we will perform all the necessary actions like paying the user that much amount.

why we using 2 tables ? cuz


when there is a trigger created and multiple actions created what if some actions got failed because of db down or some services down. so, we are maintainig this data in 2 tables as consistently.


database transactions - atomicity
![Image](https://github.com/user-attachments/assets/de0c0408-3740-4c98-8325-dc47cb5553eb)
![Image](https://github.com/user-attachments/assets/bee9f9b1-5c82-4b6d-a707-cb1a6a94671e)


```pgsql
User to Zap: One-to-many relationship. A User can have multiple Zaps.
Zap to User: Many-to-one relationship. Each Zap belongs to one User.
Zap to Trigger: One-to-one relationship. Each Zap has one Trigger.
Zap to Action: One-to-many relationship. A Zap can have multiple Actions.
Zap to ZapRun: One-to-many relationship. A Zap can have multiple ZapRuns.
Trigger to AvailableTriggers: Many-to-one relationship. Each Trigger is associated with one AvailableTriggers type.
Action to AvailableActions: Many-to-one relationship. Each Action is associated with one AvailableActions type.
ZapRun to ZapRunOutbox: One-to-one relationship. Each ZapRun can have one ZapRunOutbox.
```

# transactional outbox pattern
https://medium.com/design-microservices-architecture-with-patterns/outbox-pattern-for-microservices-architectures-1b8648dfaa27
https://microservices.io/patterns/data/transactional-outbox.html

# running postgres through docker

```sql
docker run -p 5432:5432  -e POSTGRES_PASSWORD=mysecretpassword postgres
```



prisma commands :
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-prismaPostgres
* npx prisma format
* npx prisma migrate dev
* npx prisma studio - opens the studio in local to view db and edit.



## Processor

 - This Processor is going to take data continuously from the outbox db and push it into the kafka queue.

 ```bash    
    docker run -p 9092:9092 apache/kafka:3.7.1
 ```

 ```bash
 docker exec -it <containerId> /bin/bash
 ```

  ```
  - move to the kafka exists folder
    > cd /opt/kafka/bin/
 ```

 ```
 ./kafka-topics.sh --create --topic zap-events --bootstrap-server localhost:9092

  ./kafka-console-consumer.sh --topic zap-events --from-beginning --bootstrap-server localhost:9092
 ```