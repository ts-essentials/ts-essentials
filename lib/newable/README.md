`Newable<ReturnType>` constructs a class type with constructor which has return type `ReturnType`

When there are several classes that implement the same interface

```ts
interface Pingable {
  ping(): void;
}

class Sonar implements Pingable {
  ping() {
    console.log("Ping!");
  }
}

class Laptop implements Pingable {
  ping() {
    console.log("Network is available");
  }
}
```

It's handy to work with classes (not instances)

```ts
let pingable: Newable<Pingable>;
pingable = Sonar;
pingable = Laptop;
```

TS Playground – https://tsplay.dev/w84DPw
