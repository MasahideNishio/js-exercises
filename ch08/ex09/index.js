export function withResource(resource, func) {
  try {
    func(resource);
  } finally {
    // finallyでclose()を呼ぶことで必ずclose()を実行させる
    resource.close();
  }
}
