import * as fs from "node:fs";

export function readdir(path, options = undefined) {
  return new Promise((resolve, reject) => {
    // 引数にoptionsが指定されてるかどうかで動き分け
    if (options === undefined) {
      fs.readdir(path, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(files);
      });
    } else {
      fs.readdir(path, options, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(files);
      });
    }
  });
}
export function stat(path, options = undefined) {
  return new Promise((resolve, reject) => {
    // 引数にoptionsが指定されてるかどうかで動き分け
    if (options === undefined) {
      fs.stat(path, (err, stats) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(stats);
      });
    } else {
      fs.stat(path, options, (err, stats) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(stats);
      });
    }
  });
}
