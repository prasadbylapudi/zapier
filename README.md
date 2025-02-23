Imagine like in github for any issues or pull requests you wanted to award the users with some bounty.

whenever a pullrequest or comment on issue like bounry 10$ we will trigger a webhook in the zapier and we will perform all the necessary actions like paying the user that much amount.

why we using 2 tables ? cuz


when there is a trigger created and multiple actions created what if some actions got failed because of db down or some services down. so, we are maintainig this data in 2 tables as consistently.


database transactions - atomicity

![image](assets/image-20250223180537-tqfsuev.png)


![image](assets/image-20250223184241-ca99o6f.png)


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



# running postgres through docker

```sql
docker run -p 5432:5432  -e POSTGRES_PASSWORD=mysecretpassword postgres
```




1. Send the user a verification email, make them verify email before signing them up

* Add a new field in the DB called verify, and only if user is verified should they be ablt to login

2. Let user reset their password through email
3. Solana reconcilliation side quest - If the users solana txn fails/takes a long time/is submitted to the blockchain, but your node goes down. What happens then? how can u prevent sending them money twice when the worker comes back up
4. Use react-flow for the UI, make it prettier

* If you are using react-flow, can you create parallel actions.


prisma commands :

* npx prisma format
* mpx prisma migrate dev
*
