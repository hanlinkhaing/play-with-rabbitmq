import amqplib from "amqplib";

var i = 0;

(async () => {
  const exchange = "pub-sub";
  const connection = await amqplib.connect(
    "amqp://root:RootPwd@165.22.100.157:5672"
  );

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
