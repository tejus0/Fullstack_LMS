import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
// import path from "path"

// importing all routes here 
import studentDetailRoute from "./routes/formRoute.js"; // Path to your router file


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

// const corsOptions = {
//     origin: "*",
//     credentials: true, //access-control-allow-credentials:true
//     optionSuccessStatus: 200,
//   };

// app.use(cors(corsOptions));

app.use(cors({

    origin: '*', // Allow requests from all origins
  
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  
    allowedHeaders: ['Content-Type', 'Authorization'],
  
  }));

  app.options('*', cors()); // enable pre-flight request for all routes

app.use(helmet({ xssFilter: true }))


app.use(express.json())


// usinng all routes 

app.use("/api/v1", studentDetailRoute);

// app.get("/student-registration", (req, res, next) => {
//     // res.send("This is the response.")
//     // if you want to render a template then
//     // in the {} you can send data with
 
//     res.render("./form.js", {})
//  })

 app.use('/student-form', express.static('student-form'))




if (process.env.NODE_ENV !== "production ") {
    dotenv.config({ path: "./config/.env" });
}

export default app;
