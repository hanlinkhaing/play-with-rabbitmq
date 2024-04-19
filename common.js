import { config } from "dotenv";
import amqplib from "amqplib";

config();

export const createConnection = async () => {
  return await amqplib.connect({
    hostname: process.env.RBMQ_HOST,
    port: process.env.RBMQ_PORT,
    username: process.env.RBMQ_USER,
    password: process.env.RBMQ_PASS,
  });
};
