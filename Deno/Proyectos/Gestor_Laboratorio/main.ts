import { Application } from 'oak';
import { db } from "./db/mysql.ts";
import { User,Booking,Classroom } from "./models.ts";
import { getUsers } from "./resolvers.ts/getUsers.ts";
import  router from "./routes/routes.ts";


db.link([User,Booking,Classroom]);
db.sync();

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());


const PORT = 3000;
console.log(`Server is running on port ${PORT}`);
await app.listen({ port: PORT })