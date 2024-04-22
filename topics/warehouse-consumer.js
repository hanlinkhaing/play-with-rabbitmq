import { createConnection } from "../common.js";

(async () => {
  const exchange = "topic-exc";
  const connection = await createConnection();

  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, "topic");

  const q = await channel.assertQueue();

  await channel.bindQueue(q.queue, exchange, "route.status.*");

  channel.consume(q.queue, (msg) => {
    if (msg !== null) {
      console.log("Warehouse Consumer");
      console.log(msg.fields.routingKey, " : ", msg.content.toString());
      console.log();
    } else {
      console.log("Consumer cancelled by server");
    }
    channel.ack(msg);
  });
})();
