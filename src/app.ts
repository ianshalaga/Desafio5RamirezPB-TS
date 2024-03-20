import express from "express";
import { Express } from "express";
import productsRouter from "./routes/products.route";
import cartsRouter from "./routes/carts.route";
import { PORT } from "./utils/ports";
import { rootPath, productsPath } from "./utils/paths";
import { apiRoute, productsRoute, cartsRoute } from "./utils/routes";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.route";
import { Server } from "socket.io";
import Product from "./interfaces/Product";
import connectDB from "./utils/db";
import ProductManagerDB from "./dao/services/ProductManagerDB";
import DbProduct from "./interfaces/DbProduct";
import messagesModel from "./dao/models/messages.model";

const app: Express = express(); // Express.js application instance creation

// Express.js server start
const httpServer = app.listen(PORT, () =>
  console.log(`Servidor de Express.js corriendo en el puerto: ${PORT}`)
);

const io = new Server(httpServer); // Socket.IO server start in same port that httpServer

/** MIDDLEWARES */
app.use(express.urlencoded({ extended: true })); // Complex URLs format mapping
app.use(express.static(`${rootPath}/public`)); // Serves static files from public folder
app.use(express.json()); // Format JSON requests to JavaScript Object format (POST / PUT)
app.set("views", rootPath + "/src/views"); // Sets the path where Express will look for the views of the application
app.engine("handlebars", handlebars.engine()); // Sets up Handlebars as the template engine for Express.js. Allows to use Handlebars template files (*.handlebars).
app.set("view engine", "handlebars"); // Sets Handlebars to view engine for Express application

/** ROUTES */
app.use(apiRoute + productsRoute, productsRouter); // API Products
app.use(apiRoute + cartsRoute, cartsRouter); // API Carts
app.use(viewsRouter); // Views

// WEBSOCKETS
const messages = [];

io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  const productManagerDB: ProductManagerDB = new ProductManagerDB();
  let products: DbProduct[] = await productManagerDB.getProducts();

  socket.emit("products", products);

  socket.on("newProduct", async (newProduct: Product) => {
    console.log("Nuevo producto");
    console.log(newProduct);
    await productManagerDB.addProduct(newProduct);
    products = await productManagerDB.getProducts();
    socket.emit("products", products);
  });

  socket.on("message", async (data) => {
    console.log(data);
    messages.push(data);
    await messagesModel.create(data);
    io.emit("messageLogs", messages);
  });
});

// MONGODB
connectDB();
