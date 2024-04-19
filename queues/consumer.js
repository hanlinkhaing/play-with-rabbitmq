import amqplib from "amqplib";

(async () => {
  const queue = "tasks";
  const connection = await amqplib.connect(
    "amqp://root:RootPwd@165.22.100.157:5672"
  );

  const channel = await connection.createChannel();
  await channel.assertQueue(queue);

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      console.log("Recieved:", msg.content.toString());
    } else {
      console.log("Consumer cancelled by server");
    }
    // channel.ack(msg);
  });
})();
