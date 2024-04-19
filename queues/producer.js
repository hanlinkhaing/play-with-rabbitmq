import { createConnection } from "../common.js";

var i = 0;

(async () => {
  const queue = "tasks";
  const connection = await createConnection();

  const channel = await connection.createChannel();

  setInterval(() => {
    channel.sendToQueue(
      queue,
      Buffer.from(`testing consumer and producer : ${++i}`)
    );
  }, 1000);
})();
