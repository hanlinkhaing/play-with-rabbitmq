import { createConnection } from "../common.js";

var i = 0;

(async () => {
  const exchange = "topic-exc";
  const connection = await createConnection();

  // *.*

  const channel = await connection.createChannel();
  channel.assertExchange(exchange, "topic");

  setInterval(() => {
    const str = i % 2 === 0 ? "route.status.complete" : "route.status.cancel";
    channel.publish(exchange, str, Buffer.from(`${str} topic : ${++i}`));
  }, 1000);
})();
