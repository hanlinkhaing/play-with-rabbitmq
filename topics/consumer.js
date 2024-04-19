import amqplib from "amqplib";

(async () => {
  const exchange = "topic-exc";
  const connection = await amqplib.connect(
    "amqp://root:RootPwd@165.22.100.157:5672"
  );

  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, "topic");

  const strs = ["1.route", "2.route"];

  const q = await channel.assertQueue();

  await channel.bindQueue(q.queue, exchange, "1.*");

  channel.consume(q.queue, (msg) => {
    if (msg !== null) {
      console.log(msg.fields.routingKey, " : ", msg.content.toString());
    } else {
      console.log("Consumer cancelled by server");
    }
    channel.ack(msg);
  });
})();
