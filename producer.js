import amqplib from "amqplib";

(async () => {
  const queue = "tasks";
  const connection = await amqplib.connect(
    // "amqp://root:RootPwd@165.22.100.157:5672"
    "amqp://localhost:5672"
  );

  const channel = await connection.createChannel();

  setInterval(() => {
    channel.sendToQueue(queue, Buffer.from("testing consumer and producer"));
  }, 1000);
})();
