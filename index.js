import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dbConnection } from "./Database/dbConnection.js";
import { bootstrap } from "./src/bootstrap.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { createOnlineOrder } from "./src/modules/order/order.controller.js";
import { swaggerSpec } from "./swagger.js"
import swaggerUi from "swagger-ui-express";

dotenv.config();
const app = express();
app.use(cors())

const port = 3000;
app.post('/webhook', express.raw({ type: 'application/json' }), createOnlineOrder);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("uploads"));
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Ecommerce API Documentation"
}));

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

bootstrap(app);
dbConnection();



app.listen(process.env.PORT || port, () => console.log(`App listening on port ${port}!`));
