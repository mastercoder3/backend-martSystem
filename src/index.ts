import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import cors from 'cors';
import { createConnection, ConnectionOptions, getConnectionOptions } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { createSchema } from "./utils/createSchema";
import { redis } from "./redist";

const main = async () =>{

    const connectionOptions: ConnectionOptions = await getConnectionOptions(
        process.env.NODE_ENV === "production" ? "production" : "default"
    );

    await createConnection({
        ...connectionOptions,
        name: "default"
    });

    const apolloServer = new ApolloServer({
        schema: await createSchema(),
        context: ({req, res}: any) => ({req, res})
    });

    const app = Express();
    const RedisStore = connectRedis(session);

    app.use(cors({
        credentials: true,
        origin: "http://localhost:4200"
    }));

    app.use(session({
        store: new RedisStore({
            client: redis as any
        }),
        name: "qid",
        secret: "sh7aGhhqsq6x0N07JMk2sTI3EsPHEuUk",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365 //7 years
        }
    }));

    apolloServer.applyMiddleware({app});
    
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>{
        console.log("Apollo Server running at http://localhost:4000/graphql");
    });


}

main();