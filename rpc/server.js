import { createConnection } from "../common.js";

(async () => {
  const queue = "rpc-server-queue";
  const connection = await createConnection();

  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { exclusive: true });

  // channel.prefetch(1);

  channel.consume(queue, (msg) => {
    console.log("RPC Server received => ", msg.content.toString());
    channel.sendToQueue(msg.properties.replyTo, Buffer.from("Great, And you?"));
    channel.ack(msg);
  });
})();
