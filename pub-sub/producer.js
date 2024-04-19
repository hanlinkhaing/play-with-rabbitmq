import { createConnection } from "../common.js";

var i = 0;

(async () => {
  const exchange = "pub-sub";
  const connection = await createConnection();

  const channel = await connection.createChannel();
  // "direct" | "topic" | "headers" | "fanout" | "match";
  channel.assertExchange(exchange, "fanout");

  setInterval(() => {
    channel.publish(
      exchange,
      "",
      Buffer.from(`testing publisher and consumer : ${++i}`)
    );
  }, 1000);
})();
