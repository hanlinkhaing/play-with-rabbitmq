import amqplib from "amqplib";

(async () => {
  const exchange = "pub-sub";
  const connection = await amqplib.connect(
    "amqp://root:RootPwd@165.22.100.157:5672"
  );

  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, "fanout");

  const q = await channel.assertQueue("");

  await channel.bindQueue(q.queue, exchange, "");

  channel.consume(q.queue, (msg) => {
    if (msg !== null) {
      console.log("Recieved:", msg.content.toString());
    } else {
      console.log("Consumer cancelled by server");
    }
    channel.ack(msg);
  });
})();
