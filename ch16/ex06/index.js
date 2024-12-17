import fs from "fs";

const filePath = "example.txt";
const newSize = 20;

fs.writeFileSync(filePath, "1234567890");

fs.truncateSync(filePath, newSize);
