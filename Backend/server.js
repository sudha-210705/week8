import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { UserApp } from "./APIs/USERAPI.js";
import cors from 'cors';

config();

const app = exp();

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      
      'http://localhost:5173' 
    ];
     const vercelPreview = "https://week8-ejs5.vercel.app"

     if (!origin || allowedOrigins.includes(origin) || vercelPreview.test(origin)) {
      callback(null, true);
    } else {
       callback(new Error('Not allowed by CORS'));
     }

  },
  credentials: true,
}));

app.use(exp.json());
app.use("/user-api", UserApp);

const PORT = process.env.PORT || 4000;

async function connectDB() {
  try {
    await connect(process.env.DB_URL);
    console.log("db connection success");

    app.listen(PORT, () => console.log("server started on", PORT));
  } catch (err) {
    console.log("error", err);
  }
}

connectDB();