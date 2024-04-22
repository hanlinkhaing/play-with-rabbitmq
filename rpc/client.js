import { createConnection } from "../common.js";

var i = 0;

(async () => {
  const queue = "rpc-client-queue";
  const connection = await createConnection();

  const channel = await connection.createChannel();

  await channel.assertQueue(queue);

  channel.consume(
    queue,
    (msg) => {
      console.log("RPC Client received => ", msg.content.toString());
    },
    { noAck: false }
  );

  channel.sendToQueue("rpc-server-queue", Buffer.from("Hi, How are you?"), {
    replyTo: queue,
  });
})();
