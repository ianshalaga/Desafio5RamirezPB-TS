import mongoose from "mongoose";
import "dotenv/config";

const dbUsername = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DBNAME;

const dbURI = `mongodb+srv://${dbUsername}:${dbPassword}@ecommerce.rvp8u39.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`;

export default async function connectDB() {
  try {
    await mongoose.connect(dbURI);
    console.log(
      `Conexión con la base de datos ${dbName} de MongoDB Atlas exitosa.`
    );
  } catch (error) {
    console.error(
      `Error al intentar conectar con la base de datos ${dbName}:`,
      error
    );
    process.exit();
  }
}
