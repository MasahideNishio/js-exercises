function isComplex(obj) {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.real === "number" &&
    typeof obj.imaginary === "number"
  );
}

export function add(obj1, obj2) {
  if (!isComplex(obj1) || !isComplex(obj2)) {
    return NaN;
  }
  return {
    real: obj1.real + obj2.real,
    imaginary: obj1.imaginary + obj2.imaginary,
  };
}

export function sub(obj1, obj2) {
  if (!isComplex(obj1) || !isComplex(obj2)) {
    return undefined;
  }
  return {
    real: obj1.real - obj2.real,
    imaginary: obj1.imaginary - obj2.imaginary,
  };
}

export function mul(obj1, obj2) {
  if (!isComplex(obj1) || !isComplex(obj2)) {
    return undefined;
  }
  return {
    real: obj1.real * obj2.real,
    imaginary: obj1.imaginary * obj2.imaginary,
  };
}

export function div(obj1, obj2) {
  if (!isComplex(obj1) || !isComplex(obj2)) {
    return undefined;
  }
  return {
    real: obj1.real / obj2.real,
    imaginary: obj1.imaginary / obj2.imaginary,
  };
}
