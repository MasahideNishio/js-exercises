import net from "net";

const HOST = "localhost";
const PORT = 3000;
const MAX_CONNECTIONS = 20000; // 最大試行する接続数
const clients = [];

let establishedConnections = 0;

function createClient(index) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();

    client.on("connect", () => {
      establishedConnections++;
      console.log(`Connection ${index + 1} established.`);
      resolve(client);
    });

    client.on("error", (err) => {
      console.error(`Connection ${index + 1} failed: ${err.message}`);
      reject(err);
    });

    client.on("close", () => {
      console.log(`Connection ${index + 1} closed.`);
    });

    client.connect(PORT, HOST);
    clients.push(client);
  });
}

async function testConnections() {
  for (let i = 0; i < MAX_CONNECTIONS; i++) {
    try {
      await createClient(i);
    } catch (err) {
      console.error(`Stopped testing after ${i} attempts.`);
      break;
    }
  }

  console.log(`Total established connections: ${establishedConnections}`);

  // クリーンアップ
  clients.forEach((client) => client.destroy());
}

testConnections();
