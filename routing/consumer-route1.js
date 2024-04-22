import { createConnection } from "../common.js";

(async () => {
  const exchange = "routing-exc";
  const connection = await createConnection();

  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, "direct");

  const q = await channel.assertQueue("");

  await channel.bindQueue(q.queue, exchange, "route.consumer.1");

  channel.consume(q.queue, (msg) => {
    if (msg !== null) {
      console.log("Consumer 1");
      console.log(msg.fields.routingKey, " : ", msg.content.toString());
      console.log();
    } else {
      console.log("Consumer cancelled by server");
    }
    channel.ack(msg);
  });
})();
