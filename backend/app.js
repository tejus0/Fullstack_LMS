import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"


// importing all routes here 
import studentDetailRoute from "./routes/formRoute.js"; // Path to your router file


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());

app.use(helmet({ xssFilter: true }))


app.use(express.json())


// usinng all routes 

app.use("/api/v1", studentDetailRoute);




if (process.env.NODE_ENV !== "production ") {
    dotenv.config({ path: "./config/.env" });
}

export default app;
