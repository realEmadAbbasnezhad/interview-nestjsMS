# interview-nestjsMS
A sample project created for an interview somewhere.

## There request
Hello,  We need a system where:  
An admin can generate a desired number of chance codes by specifying the number of categories, the number of chance codes in each category, and the range of rewards for the chance codes. For example: Five categories, each category having 20 chance codes, and the reward amount ranging from 1000 to 100,000 Tomans. The system should then generate these chance codes.
The chance codes should be stored in Redis Stack.
A user logs in and selects one of the available categories.
The system randomly assigns one of the chance codes from that category to the user.
The user's details should be stored in the assigned chance code in Redis Stack, and the status of this chance code should be changed to "assigned" so that it cannot be assigned to this or any other user in the future.
The reward amount of the chance code should be credited to the user's wallet, and a record of this financial transaction should be created in the PostgreSQL database.
We need a logging service that logs the operations that occurred in the app, for example, the admin created 100 chance codes on date X, user Y received a chance code on date Z, and the chance code with these specifications was assigned to them, etc.
To design this system, we need three services:  
Service A as a gateway that handles authentication and access control. This service uses a PostgreSQL database (authentication based on username and password).
Service B that interacts with Redis Stack and controls the operations related to chance codes.
Service C that logs operations in the database using MongoDB.
The communication between Service A and Service B is done via the TCP protocol. The communication between Service B and Service C is done via RabbitMQ. The communication between Service A and Service C is done via TCP (for receiving log reports).  Finally, Docker files for the services should be written.  Technologies used in this system: NestJS, PostgreSQL, MongoDB, Redis Stack, RabbitMQ, Prisma, Mongoose, Docker
