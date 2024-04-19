import { createConnection } from "../common.js";

(async () => {
  const queue = "tasks";
  const connection = await createConnection();

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
