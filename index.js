//Importo file
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const moviesRouter = require("./routers/moviesRouter");
const userRouter = require("./routers/user");
const errorHandler = require("./middleware/error");
const notFound = require("./middleware/notFound");

const app = express();
const port = process.env.APP_PORT;

app.use(cors({ origin: process.env.FE_URL }));

app.use('/static/', express.static("public"));  //middleware per gestire file statici in public
app.use(express.json());            //middleware per gestire le richieste in formato json

app.get("/",(rec,res)=>{            //path principale 
    res.send("Benvenuto sul nostro server");
})
app.use("/api", userRouter);
app.use("/api/movies", moviesRouter);   //path collegato al router moviesRouter


app.use(notFound);                  //middleware per gestire risorse non trovate-inesistenti sul server
app.use(errorHandler);              //middleware che restituisce un messaggio di errore se c'è errore

app.listen(port, ()=>{              //avvio del server                        
    console.log(`Express avviato correttamente su http://localhost:${port}/`);
})