import express from "express";
import bodyParser from "body-parser";
import viewEngine from "../src/configs/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./configs/connectDB";
require('dotenv').config();

let app = express();


// fix err CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x_authorization,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
///
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6060;
app.listen(port, () => {
    console.log("backend run port " + port);
})