import { createConnection } from "../common.js";

var i = 0;

(async () => {
  const exchange = "routing-exc";
  const connection = await createConnection();

  const channel = await connection.createChannel();
  channel.assertExchange(exchange, "direct");

  setInterval(() => {
    const routingKey = i % 2 === 0 ? "route.consumer.1" : "route.consumer.2";
    channel.publish(
      exchange,
      routingKey,
      Buffer.from(`${routingKey} consumer and producer : ${++i}`)
    );
  }, 1000);
})();
