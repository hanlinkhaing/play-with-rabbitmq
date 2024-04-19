import { createConnection } from "../common.js";

var i = 0;

(async () => {
  const exchange = "routing-exc";
  const connection = await createConnection();

  const channel = await connection.createChannel();
  channel.assertExchange(exchange, "direct");

  setInterval(() => {
    const str = i % 2 === 0 ? "route-1" : "route-2";
    channel.publish(
      exchange,
      str,
      Buffer.from(`${str} consumer and producer : ${++i}`)
    );
  }, 1000);
})();
