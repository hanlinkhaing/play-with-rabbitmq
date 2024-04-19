import amqplib from "amqplib";

(async () => {
  const exchange = "routing-exc";
  const connection = await amqplib.connect(
    "amqp://root:RootPwd@165.22.100.157:5672"
  );

  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, "direct");

  const strs = ["route-1", "route-2"];

  const q = await channel.assertQueue("");

  // for await (const str of strs) {
  await channel.bindQueue(q.queue, exchange, strs[0]);
  // }

  channel.consume(q.queue, (msg) => {
    if (msg !== null) {
      console.log(msg.fields.routingKey, " : ", msg.content.toString());
    } else {
      console.log("Consumer cancelled by server");
    }
    channel.ack(msg);
  });
})();