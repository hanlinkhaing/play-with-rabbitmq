import amqplib from "amqplib";

var i = 0;

(async () => {
  const exchange = "topic-exc";
  const connection = await amqplib.connect(
    "amqp://root:RootPwd@165.22.100.157:5672"
  );

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
