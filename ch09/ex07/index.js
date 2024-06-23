class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name} eat() called`);
  }
}
class SoundAnimal {
  constructor(name) {
    this.name = name;
    this.animal = new Animal(name);
  }
  eat() {
    this.animal.eat();
  }
  makeSound() {
    console.log(`${this.name} makeSound() called`);
  }
}

class Dog {
  constructor(name) {
    this.name = name;
    this.animal = new SoundAnimal(name);
  }
  eat() {
    this.animal.eat();
  }
  makeSound() {
    this.animal.makeSound();
  }

  bite() {
    console.log(`${this.name} bite() called`);
  }
}

class Husky {
  constructor(name) {
    this.name = name;
    this.animal = new Dog(name);
  }
  eat() {
    this.animal.eat();
  }

  makeSound() {
    this.animal.makeSound();
  }

  bite() {
    this.animal.bite();
  }
}

class Cat {
  constructor(name) {
    this.name = name;
    this.animal = new SoundAnimal(name);
  }
  eat() {
    this.animal.eat();
  }

  makeSound() {
    this.animal.makeSound();
  }

  scratch() {
    console.log(`${this.name} scratch() called`);
  }
}

class Bird {
  constructor(name) {
    this.name = name;
    this.animal = new SoundAnimal(name);
  }
  eat() {
    this.animal.eat();
  }

  makeSound() {
    this.animal.makeSound();
  }

  fly() {
    console.log(`${this.name} fly() called`);
  }
}

class Fish {
  constructor(name) {
    this.name = name;
    this.animal = new Animal(name);
  }
  eat() {
    this.animal.eat();
  }

  swim() {
    console.log(`${this.name} swim() called`);
  }
}
const husky = new Husky("Husky");
const cat = new Cat("Cat");
const bird = new Bird("Bird");
const fish = new Fish("Fish");

husky.eat();
husky.makeSound();
husky.bite();
cat.eat();
cat.makeSound();
cat.scratch();
bird.eat();
bird.makeSound();
bird.fly();
fish.eat();
fish.swim();
