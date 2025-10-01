import pg from "pg";
import env from "dotenv";
env.config();

let connection;

const connectToDatabase = async () => {
    try{
        if(!connection){
            connection = new pg.Client({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: process.env.DB_PORT
            });
            await connection.connect();
        }
        return connection;
    }
    catch(err){
        console.log(err);
    }
}

export default connectToDatabase;