import { createConnection } from "../common.js";

var i = 0;

(async () => {
  const exchange = "topic-exc";
  const connection = await createConnection();

  // *.*

  const channel = await connection.createChannel();
  channel.assertExchange(exchange, "topic");

  setInterval(() => {
    const str = i % 2 === 0 ? "1.route" : "2.route";
    channel.publish(
      exchange,
      str,
      Buffer.from(`${str} consumer and producer : ${++i}`)
    );
  }, 1000);
})();
