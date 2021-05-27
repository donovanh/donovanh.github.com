---
layout: post
title: "TypeScript: Course notes"
description: "A summary of how TypeScript works in various examples."
tags: [web development, TypeScript, JavaScript]
imageURL: typescript.png
published: true
---

I decided to take a look at [TypeScript](https://www.typescriptlang.org) this year. As I often do, I turn to Udemy for helpful courses and so found [this great TypeScript course](https://www.udemy.com/share/1013yQA0EedV5RTH4=/) from the wonderful [Maximilian Schwarzmüller](https://academind.com/).

The following is a summary of some notes I took during the course. To assist my learning I have created my own examples where possible. This is not a replacement for taking the course as the full course includes more practical tips and advice along with in-depth examples showing TypeScript used on a larger project.

The following should be a helpful resource to refer to after taking the course.

# TypeScript

TypeScript is an [open-source language which builds on JavaScript](https://www.typescriptlang.org). You can write JavaScript in TypeScript files, as TypeScript builds on top of the existing functionality of JavaScript. You cannot however write TypeScript inside a JavaScript (`.js`) file. This is because TypeScript requires a compiler, which takes given TypeScript code and compiles it to JavaScript so that it can be run in the browser and elsewhere.

## Getting started

You can [install TypeScript](https://www.typescriptlang.org/download) a number of ways. I installed it globally using:

```
npm install typescript -g
```

With TypeScript installed you can create TypeScript files as `filename.ts` files and run `tsc filename` to compile to JS locally.

## TypeScript in action

TypeScript's main use is to declare the type a given property may have when used. It can be done so by declaring it within a function definition, when declaring variables, or within classes. The types can apply to variables, functions, classes and can apply to input data or the expected output of a function.

To start simply, we can define the `type` of given inputs to a function like so.

```
function add(num1: number, num2: number) {
  ...
}
```

This tells the compiler that `num1` and `num2` should be given a value of type `number`. It will display an error (when editing, depending on editor, or during compile time) if we are passing in a value that is not a number.

Editors such as VSCode will show errors before compilation but you can also run `tsc finename.ts` to generate the JavaScript and it will display any errors.

## Types

Core data types:

* number
* string
* boolean
* object
* Arrays (string[], number[] etc)

### Defining types in functions

```
function add(n1: number, n2: number, show: boolean, phrase: string) {
  const result = n1 + n2;
  if (show) {
    console.log(`${phrase} ${result}`);
  }
  return result;
}

const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result is: ';

add(number1, number2, printResult, resultPhrase);
```

### Type inference

TypeScript infers types when they are initialised:

```
let number1 = 5; // type number automatically inferred
number1 = 'ok'; // error
```

If not specifying a value, you can specify it manually:

```
let number1: number;
number1 = 'ok'; // error
```

### Using "!" or "as HTMLInputElement" (type casting)

When using HTML selectors you can use `!` to say "this will not be null" or we can be more specific and say "as HTMLInputElement so that TypeScript knows that the resulting elements will have certain properties.

### Object type

An inferred object will let the editor highlight issues with missing properties:

```
const person = {
  name: 'Person',
  age: 100
};

console.log(person.foo) // error
```

When defining an object type, an explicit declaration blocks TypeScript from analysing object further which could cause unexpected errors:

```
const person: object = {
  name: 'Person',
  age: 100
};

console.log(person.name) // error
```

Here `name` is a property but TypeScript only considers `person` an `object` without delving deeper. Letting the object be inferred allows TypeScript to parse the properties.

```
const person = {
  name: 'Person',
  age: 100
};

console.log(person.name) // no error now
```

### Custom object definition

We can explicitly define the object when setting it up:

```
const person: {
  name: string;
  age: number;
} = {
  name: 'Person',
  age: 100
};
```

While not something you'd do in practice (the types can be inferred).

### Array types

An array containing strings is described as type `string[]`.

TypeScript will infer this type if an object is given an array of strings. You can also explicity define it:

```
let myArray: string[];
```

Multiple types of items in the array can be specified, such as if it has strings or numbers:

```
let myArray: (string | number)[];
```

If any values allowed in the array:

```
let myArray: any[];
```

One side effect of knowing the type is that when looping through arrays, editors can suggest string methods automatically such as `toUpperCase`.

```
for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase()); // No error
  console.log(hobby.map()); // Does not exist on type string
}
```

Methods unavailable to the type `string` would then show an error when writing the code.

### Other types: Tuples

An example of a tuple where we can specify the specific order of types in an array, for example:


```
const person = {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; // Specifies that the role array has a number then a string in 2 elements
};
```

By defining the `role` array, it allows us to specify a specific array length and the types of data in it.

Note: `array.push` is a special case though, and on a defined tuple array would not show in the editor as an array.

### Other types: enum

A defined set of values that a variable can use. As a custom type, `enum`s start with a capital letter. An example:

```
enum Role { ADMIN, READ_ONLY, AUTHOR };
```

The compiler then produces code in which the `Role` array uses these keys and assigns numberic values to them. In TypeScript that can continue to be used like `Role.ADMIN` so that the raw numberic value does not need to be managed.

You can assign specific values:

```
enum Role { ADMIN = 5, READ_ONLY, AUTHOR }; // Increments from 5
enum Role { ADMIN = 5, READ_ONLY = 100, AUTHOR = 200 }; // Specific numbering
enum Role { ADMIN = 'ADMIN', READ_ONLY, AUTHOR }; // Text alternative
```

### Other types: any

`any` is not prescriptive and allows a variable to contain anything:

```
const whatever: any;
```

It's important to avoid this if possible as it removes all the benefits of using TypeScript such as checking for errors at writing / compile time.

It should only be used if you cannot tell before runtime what data might be in place, but should be otherwise avoided. Always try to use a built-in type or a custom type if more appropriate.

### Other types: union

Accepting multiple types means joining them with the `|` pipe symbol. These are union types:

```
let input1: number | string;
```

You might need to do runtime checks to avoid compiler errors by manually checking the type of value given and adjusting the result. For example, you might need to run `toString` on a value that can be a number or a string and it's not a number, which makes it more explicit to the compiler what you're doing.

### Other types: literal

If we want to make sure a given value is an expected value we can set it to a literal type, often used as a union type such as:

```
let val: 'thing-1' | 'thing-2';
```

This will then limit the potential values to those two strings and will show an error if it does match the one of the expected values.

### Type aliases

We can build type aliases to make creating more complex types easier. For example:

```
type NumOrString = number | string;
type ThingTypes = 'thing-1' | 'thing-2';
type ObjType = { prop1: string; prop2: number, thing: ThingTypes };
let value: NumOrString;
let thing: ThingTypes;
const obj: ObjType = { prop1: 'Foo', prop2: 12, thing: 'thing-1' };
```

This can make types that are more complex and composable at the same time.

## Functions

The return value of functions can be inferred by TypeScript. The following will infer that the expected result is of type `number`.

```
function add(n1: number, n2: number) {
  return n1 + n1;
}
```

We can manually specify a function's return type by passing it with the function definition:

```
function add(n1: number, n2: number):string {
  return n1 + n1; // Error, this will be a number
}
```

### Return: void

If a function doesn't return anything, TypeScript will report that the function returns `void`. 

This is not to be confused with type `undefined`, which is a different and valid type in TypeScript. A function that doesn't not return anything doesn't return `undefined` and should be instead be written:

```
function add(n1: number, n2: number):void {
  console.log(n1 + n1); // No returning
}
```

However if the function does `return` without returning a value, you could write:

```
function add(n1: number, n2: number):undefined {
  console.log(n1 + n1);
  return;
}
```

### Other types: Function

Function types describe a function including the parameters and return values of the desired function.

We can delare the type `Function` but that simply allows a variable to store any function at all.

```
let myAdd: Function;
```

We can be more specific by defining our own function type:

```
function add(n1: number, n2: number) {
  return n1 + n2;
}

let myAdd: (a: number, b: number) => number;

myAdd = (a, b) => add(a, b);

console.log(myAdd(2, 2)); // Outputs 4
```

### Other types: unknown

Unknown works a little like `any`, except that once set, if you then apply a variable of type `unknown` to a variable of another type it will error. It is only assignable to the `any` or `unknown` types of variables.

TypeScript will also error if we try to try to run arbitrary operations on variables of type `unknown`:

```
let value: unknown;
value.trim();
```

In this way `unknown` has some type checking whereas `any` has none. It's in some ways the opposite of `any` - as the latter allows any operations whereas `unknown` is more restrictive.

In general you can use `unknown` when you do `typeof` or `instanceof` checks before carrying out operations on the variable.


Tip: Try to use more specific types when possible, but `unknown` in preference of `any`.

### Other types: never

If a function does not produce a `return` value of any sort, such as if a function throws an error, it is a function of type `never` as it doesn't even produce `undefined`.

```
// Inferred function type: void
function throwCustomError(message: string, errorCode: number) {
  throw {message, errorCode};
}
```

You can make it more explicit that the function never returns:

```
function throwCustomError(message: string, errorCode: number):never {
  throw {message, errorCode};
}
```


## Configurating TypeScript compiler

To run TypeScript locally, [Node/NPM](https://nodejs.org/en/) is required so that we can install it with:

```
npm i typescript -g
```

This allows us to run the command `tsc myScript.ts` and it will compile the given script. However there are ways to do more than just run the compilation manually.

### watch mode

The command `tsc` can be run with `--watch` or `-w` to catch and re-compile then a target file changes.

This is handy for small use-cases. When working on an entire project we make use of configuration.

### Watching a project

Set up a TypeScript project using `tsc --init` to create a config file.

With this file in place we can run `tsc -w` and it will then compile and watch any `.ts` files in a project.

### tsconfig.json

We use `target` to specify which version of output JavaScript to generate. It defaults to `ES5`.

`lib` is used to specify which libraries are included in the global scope. By default it includes everything needed to run in the browser such as the DOM APIs, `document`, `console` etc. Uncommenting it removes these defaults.

We could specify this using `"dom"` and `"es6"` along with things like `"dom.iterable"` and `"scripthost"`.

`allowJs` and `checkJs` can be used to compile or check JavaScript files using the TypeScript compiler.

`sourceMap` tells the compiler to build sourceMap files to help map compiled code back to the source to help in debugging.

`rootDir` and `outDir` help organising the files into source and output folders.

`downlevelIteration` can help in specific cases where some kinds of `for` loops cause issues in older browsers.

### Adding options to tsconfig.json

An option worth considering is the `noEmitOnError` setting. By default it is `false`. This means that even when errors are encountered, the compiled JavaScript files are still generated.

If set to true, this will stop any files being written when errors are encountered. 

We can also add extra options to the end of the generated config file, such as if we want to exclude certain files:

```
  ...
    "forceConsistentCasingInFileNames": true        /* Disallow inconsistently-cased references to the same file. */
  },
  "exclude": [
    "foo.ts",
    "**/*.dev.ts",
    "node_modules" // This is ignored by default if "exclude" not used
  ]
}
```

Alternately you can choose to only compile specific files or folders:

```
  ...
  },
  "include": [ "my_specific_file_only.ts", "./specialFolder/* ]
}
```

You can use `files` to specify specific files only and not folders.

### `strict` options

Setting `strict` to true sets all the following options to true.

This means applying rules such as not allowing implicit `any` (where functions are given unspecified type variables).

`strictNullChecks` makes TypeScript strict when checking the potential values of elements such as those from `querySelector`. This can be overridden using `!` like:

```
const button = document.querySelector("button")!;
```

The purpose is to avoid running into "cannot find property of null" error. Using the `!` workaround is one approach but we could also avoid the error by adding an `if` check around a situation that could potentially fail, as in:

```
if (button) {
  button.addEventListener('click', () => {
    ...
  });
}
```

`strictFunctionTypes` checks any function on which you apply `call` or `bind` to change what is being passed in to the function. If `bind` causes an issue, passing in the correct properties within `bind` should work.

### Additional checks

Turning on `noUnusedLocals`, `noUnusedParameters` are useful ways to highlight when unused local variables or parameters find their way into your code. 

`noImplicitReturns` will complain if we have functions that return in some places but not in others.

### Full reference

More information on the options available can be found at the [official TSConfig Reference documentation page](https://www.typescriptlang.org/tsconfig).


## Classes & Interfaces

When declaring classes we can specify the types for given properties, like:

```
class Example {
  myProp: string; // Type of string expected

  constructor(p: string) {
    this.myProp = p; // Expects a string in p
  }

  logTheProp(this: Example) {
    console.log(this.myProp)
  }
}

const newThing = new Example('New thing');
```

Note that we define the given `this` property in `logTheProp` as being of type `Example`. By doing so we ensure that calling the `logTheProp` method out of the expected context will show up as an error when coding or compiling:

```
const randomOtherThing = { logTheProp: newThing.logTheProp };
randomOtherThing.logTheProp();
```

In the above we could fix the object by giving it a `myProp` property like the `Example` type.

### public and private modifiers

Adding `private` before the type definition in the class will ensure it cannot be accessed from outside the class.

```
class Example() {
  private things: string[] = [];

  addThing(thing: string) {
    this.things.push(thing);
  }
}

const newThing = new Example('New thing');
```

In this way the `newThing.addThing` method is the only way to modify the `things` array as it could otherwise be modified using `newThing.things` directly.

`Private` can also be applied to methods within a class and will be enforced by TypeScript.

### Shorthand initialisation

We can use a shorthand to define properties with types in the constuctor:

```
class Example {
  constructor(public myProp: string) {

  }

  logTheProp(this: Example) {
    console.log(this.myProp)
  }
}

const newThing = new Example('New thing');
```

This would work similarly to the first example above but save some code.

### Read-only

Adding `readonly` when defining class properties can prevent them being accidentally changed by other methods or from outside the class. For example:

```
class Example {
  constructor(readonly myProp: string) {

  }

  changeThing() {
    this.myProp = 'changed'; // Error
  }
}
```

### Inheritance

You can inherit and extend classes like so:

```
class SpecialExample extends Example {
  // Use super in the inheriting class to call the base class constructor
  constructor(p: string, public specialThings: string[]) {
    super('Special ' + p);
  }
}

const newThing = new SpecialExample('New thing', ['More things']);

console.log(newThing);
// logs {things: Array(0), myProp: "Special New thing", specialThings: Array(1)}
```

### Overriding properties and protected

By changing the `private` property on `things` above to `protected`, it can be overridden in the inherited class:

```
class SpecialExample extends Example {
  constructor(p: string, public specialThings: string[]) {
    super('Special ' + p);
  }

  logThings() {
    console.log('Special things: ', this.things);
    // This.things shows error if "private" in base class
    // Change to "protected" for this to work
  }
}
```

### Getters and setters

In a class getters and setters are written like:

```
  // Inside class
  private thing: string;
  private things: string[];

  get getMyThing() {
    return this.thing;
  }

  set setMyThing(value: string) {
    this.things.push(value);
  }

  ...
  console.log(newThing.getMyThing) // Note no parens
```

This allows access to getting and setting private properties of a class.

### Static properties and methods

We can access static methods without instantiating a `new` version of a class but instead access them directly within the class definition.

```
class Example {
  static myProp: string = 'A thing';

  static staticMethod(p: string) {
    console.log(p)
  }
}

Example.staticMethod('hello');
console.log(Example.myProp)
```

### Singletons

When following the singleton pattern, TypeScript makes the process easier by allowing you to specify a `private` constructor.


## Interfaces

An `interface` describes the structure of an object and can be used as a `type` definition to check that a type matches the expected pattern.

```
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: 'Bill',
  age: 50,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}

user1.greet('Hey I am');
```

While it's similar to using a custom `type`, `interface` can only be used to describe an object where `type` can be used for different structures such as unions etc.

```
type Person = { ... } // Similar result as above
```

The benefit is that `interface` is generally clearer. Interfaces can be used to define the way classes are implemented:

```
class PersonClass implements Person {
  ...
}
```

This then enforces the above structure on the class. It would enforce a `name` and `age` property along with `greet` method.

### Readonly interface properties

Adding `readonly` to the definition shows an error if we then try to change that property later.

```
interface Person {
  readonly name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: 'Bill',
  age: 50,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}

user1.name = 'Bob'; // Error: name is read-only
```

This will also then apply within any classes that implement an interface.

Note: You can not add `public` or `private` to interface properties.

### Extending interfaces

We can compose interfaces using extends and even involve multiple interfaces:

```
interface Named {
  readonly name: string;
}

interface Aged {
  age: number;
}

interface Person extends Named, Aged {
  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: 'Bill',
  age: 50,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}

user1.greet('Hey I am');
```

### Interfaces as function types

As an alternative to defining custom types, you can define a custom function type within an interface:

```
interface AddFn {
  (a: number, b: number): number
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
}
```

### Optional properties

Using `?` defines any type as optional. This can also be handled by using a default value. In this example we add an optional `nickname` property which will show if it is set:

```
interface Named {
  readonly name: string;
  nickname?: string;
}

interface Aged {
  age: number;
}

interface Person extends Named, Aged {
  greet(phrase: string): void;
}

let user1: Person;
let user2: Person;

user1 = {
  name: 'Bill',
  age: 50,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}

user2 = {
  name: 'Bob',
  nickname: 'Dave',
  age: 30,
  greet(phrase: string) {
    console.log(phrase + ' ' + (this.nickname || this.name));
  }
}

user2.greet('Hey I am'); // Dave
```



## Advanced Types and TypeScript Features

### Intersection Types

We can define multiple types then compose them into intersection types.

```
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date; // a built-in interface
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Jen',
  privileges: ['admin'],
  startDate: new Date()
};
```

If we were using `interface` for the type definitions we could use `extends` as in the previous section.

Types can cancel each other out when intersecting, so the following will resolve to simply be of type `number`:

```
type a = string | number;
type b = number | boolean;
type Intersection = a & b; // Type: number
```

### Type guards

In the following, TypeScript will complain as the `a + b` part could be either a string or number for each input:

```
type myType = string | number;

function add(a: myType, b: myType) {
  return a + b;
}
```

We add a type guard to show that we are taking this into consideration, removing the error:

```
type myType = string | number;

function add(a: myType, b: myType) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

Sometimes we might want to use an optional property like `obj.propertyName`. This will error as we do not know whether the object will have that property.

We can also look for the existence of optional properties using `in`, such as:

```
if ('propertyName' in obj) {
  // ...act on it
}
```

For classes, the `instanceof` type guard can be used to determine if a class has the expected method.

```
if (vehicle instanceof Truck) {
  // ...
}
```

These guards allow for flexible type definitions while still ensuring we are confident that the code will be robust.

### Discriminated Unions

When creating a union-based type we might want to have some way to determine which of the given types in the union are bring used. In the following example, the types `Horse` and `Bird` make use of the shared `type` property that can be one of two values to determine which interface applies to the given object:

```
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 100 });
moveAnimal({ type: 'horse', runningSpeed: 30 });
```

This gives us a safe way to ensure that we don't accidentally use the incorrect object definition and avoids the previous type guards using `typeof` or checking for specific properties in the object.

### Type Casting

We can manually direct TypeScript to expect certain values to be of a specific type as it may not always be able to infer the type.

For example a document selector will be considered of type `HTMLElement` or `null`, and so TypeScript will complain if we try to access a specific property of an `input` type for example:

```
const inputEl = document.getElementById('user-input');

inputEl.value = 'Hello'; // inputEl could be null
```

If we avoid the `null` type by adding `!` to the query we get a different error:

```
const inputEl = document.getElementById('user-input')!;

inputEl.value = 'Hello'; // value not a known property on HTMLElement
```

So instead we can cast the type `<HTMLInputElement>` directly on the query. This tells TypeScript that the result of the `getElementById` will be of type `HTMLInputElement` and not `null` or `HTMLElement`:

```
const inputEl = <HTMLInputElement>document.getElementById('user-input');

inputEl.value = 'Hello'; // No error
```

Alternatively you can avoid clashes with JSX formatting by using `as`:

```
const inputEl = document.getElementById('user-input') as HTMLInputElement;

inputEl.value = 'Hello';
```

Note that the above casting implicitly removes the `null` type as an option so we might want to instead check that manually if we are not sure whether it might be null.


### Index types

When defining a custom type interfaces we can use `index` types to set out a shape for the expected object.

```
interface ErrorContainer {
  [prop: string]: string;
}

const errors: ErrorContainer = {
  email: 'The key is a string here',
  100: 'A number can also converted to a string'
};
```

The above says that an object of type `ErrorContainer` can have any number of keys but the key should be a string (or be able to be converted to a string) and have a string as the value for each.

### Function Overloads

Function overloads are useful when you want to avoid issues where trying to run methods on results of functions where the result could be moe than one type. For example in the add function, this results in an output that could either be `number` or `string` so errors if we apply a string method:

```
function add(a: myType, b: myType) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('String', 'Values'); // Always a string
result.split(' '); // Error as it still thinks it could be number
```

We can type case using `add('String', 'Values') as String;` or overload the function:

```
// overloads for add function
function add(a: number, b: number): number;
function add(a: string, b: string | number): string;
function add(a: string | number, b: string): string;

function add(a: myType, b: myType) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('String', 'Values') as String;
result.split(' ')
```

This documents the possible combinations of types that can be given to a function and specifies the expected return type for each.

### Optional chaining

TypeScript includes built-in support for adding `?` to objects and their properties if they may be missing. 

```
myObject?.property?.foo
```

### Nullish Coalescing

Using `??` instead of `||` when determining if a variable is null or undefined will ensure that situations such as empty strings or zero values aren't considered null.

```
const emptyVar = '';

const newThing = emptyVar || 'DEFAULT'; // Will consider empty string as falsey
const newThing2 = emptyVar ?? 'DEFAULT'; // Will allow empty string

console.log({newThing, newThing2})
```

## Generics

In TypeScript, some built-in types are generic such as the `Array` type, as they describe a structure within which it expects a certain type.

```
const myArray: Array = [1, 2, 3]; // Error
const myArray: Array<number> = [1, 2, 3]; // No error
```

By defining the type of items in the array, TypeScript then knows which methods are available on the given data, such as `toFixed` or used within `Math` methods. It could then error if a `string` type of array used those features.

A similar example is `Promise<string>`.

### Using generic types

If we have the following function, we see an error when accessing a property on the merged objects:

```
function merge(objA: object, objB: object) {
  return Object.assign(objA, objB);
}

const merged = merge({ name: 'Marge' }, { age: 30 });
console.log(merged.name);
```

TypeScript doesn't know that the vaguely inferred `object` output of the above function will contain `name`.

We can fix this by defining the two given objects as `generic` types so that TypeScript can infer that the output is `merge` is in fact the combination of two generic input objects:

```
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const merged = merge({ name: 'Marge' }, { age: 30 });
console.log(merged.name);
```

We use `T` and `U` as symbols for these generic types as a convention but they could be any string.

TypeScript will infer the more specific types within these generic types based on how they are used.

### Constraints

In the above generic example, the types `T` and `U` can be anything at all. While this works, it would be better to constrain them to ensure they are objects.

We set constraints using `extends` within the `<>` part of the function definition.

```
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const merged = merge({ name: 'Marge' }, { age: 30 });
console.log(merged.name);
```

This ensures that TypeScript will expect an object for each of the generic types, while also ensuring that the function outputs the merged objects `T & U`, which allows us to then confidently access properties such as `name`.

Another example of a generic `T` with a custom defined type (interface) as a constraint:

```
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let desc = 'Got no elements';
  if (element.length > 0) {
    desc = `Got ${element.length} element${element.length === 1 ? '' : 's'}`;
  }
  return [element, desc];
}

console.log(countAndDescribe(['one', 'two']))
```

### `keyof` constraint

Extending using `keyof` can be used to describe a type that represents a key of another type:

```
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

console.log(extractAndConvert({ name: 'Max' }, 'name'));
```

### Generic classes

Flexible reusable classes with strong typing can be created using generic types. For example:

```
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('TypeScript using generic classes');
textStorage.addItem('Remove me');
textStorage.removeItem('Remove me');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(2);
numberStorage.addItem(3);
numberStorage.removeItem(3);
console.log(numberStorage.getItems());
```

The above works well enough with primatives as it relies on `indexOf`. To protect it we specify `string | number | boolean` as it would need a different approach for objects.

In the above, more than one generic can be used if needed, along with constraints.

### Generic utility types

Some [generic utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html) are available including:

`Partial` wraps a type to make any properties on it temporarily optional. 

```
interface Thing {
  title: string;
  description: string
}

function createThing(title: string, description: string): Thing {
  let thing: Partial<Thing> = {};
  thing.title = title;
  thing.description = description;
  return thing as Thing;
}
```

`Required` does the opposite.

`ReadOnly` can be used on arrays or objects to stop new items being added or properties being added to an object:

```
const names: Readonly<string[]> = ['Superman'];
names.push('Clark Kent'); // Error as it is read only
```

Find [more generic utility types here](https://www.typescriptlang.org/docs/handbook/utility-types.html).

## Decorators

Decorators are useful for meta-programming. By that, it makes it easier to write code that is easier for other developers to work with.

We can create and apply a simple decorator like so:

```
function Logger(constructor: Function) { // Convention: capital letter
  console.log('Logging...');
  console.log(constructor);
}

@Logger
class Person {
  name = 'Jo';

  constructor() {
    console.log('Creating person object');
  }
}

const pers = new Person();

console.log(pers);
```

### Decorator factory

A decorator can be run `()` to then return a function.

```
function Logger(logString: string) { // Convention: capital letter
  return (constructor: Function) => {
    console.log(logString);
    console.log(constructor);
  }
}

@Logger('Logging - Person')
class Person {
  name = 'Jo';

  constructor() {
    console.log('Creating person object');
  }
}

const pers = new Person();

console.log(pers);
```

Another example to handle more complex logic and wrap it up into a decorator that offers specific functionality:

```
function WithTemplate(template: string, hookId: string) {
  return (_: Function) => {
    const element = document.getElementById(hookId);
    if (element) {
      element.innerHTML = template;
    }
  };
}

@WithTemplate('<h1>Hello World</h1>', 'app')
class Person {
  name = 'Jo';

  constructor() {
    console.log('Creating person object');
  }
}
```

This could then be adjusted to make use of the given constructor from the class being decorated:

```
function WithTemplate(template: string, hookId: string) {
  return (constructor: any) => {
    const element = document.getElementById(hookId);
    const p = new constructor(); // Constructor from Person
    if (element) {
      element.innerHTML = template;
      element.querySelector('h1')!.textContent = p.name;
    }
  };
}

@WithTemplate('<h1>Fallback</h1>', 'app')
class Person {
  name = 'Jo';

  constructor() {
    console.log('Creating person object');
  }
}
```

### Adding multiple decorators

When running multiple decorators, they execute from the bottom up:

```
@Decorator1
@Decorator2
class MyClass...
```

In the above, the second `Decorator2` executes first. However if they are factories, they execute top to bottom first, then their returned function is executed from last to first.

### Accessor, method and property decorators

When using decorators in other parts of code, they receive different arguments.

If used on a property, it receives `target` and `propertyName`:

```
function Log(target: any, propertyName: string) {
  console.log('Property decorator');
  console.log(target, propertyName);
}

class Product {
  @Log
  title: string;
  private _price: number;
}
```

The property decorator is executed when the class definition is registered with JavaScript, before being instantiated.

### Accessor and Parameter decorators

Applying a decorator to accessors (setters / getters) gives it a name and descriptor as so:

```
function LogAccessor(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

class Product {
  title: string;
  private _price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @LogAccessor
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive')
    }
  } 

  getPriceWithTax(tax: number) {
    return this._price * tax;
  }
}
```

A method decorator is similar:

```
function LogMethod(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

class Product {
  title: string;
  private _price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive')
    }
  } 

  @LogMethod
  getPriceWithTax(tax: number) {
    return this._price * tax;
  }
}
```

Logging a parameter is similar but instead of descriptor, provides a `position` argument containing a zero-indexed position for the parameter.

```
function LogParameter(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  title: string;
  private _price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive')
    }
  } 

  getPriceWithTax(@LogParameter tax: number) {
    return this._price * tax;
  }
}
```

### Adding custom class logic to decorators

The following adjusts the previous decorator to make it only run when the class is instantiated, rather than when the class is defined:

```
function Logger(logString: string) { // Convention: capital letter
  return (_: Function) => {
    console.log(logString);
  };
}

function WithTemplate(template: string, hookId: string) {
  return <T extends {new(...args: any[]): { name: string }}>(orig_constructor: T) => {
    console.log('Rendering template');
    // The following class is only run when the class is instantiated
    // Rather than when the class is defined
    return class extends orig_constructor {
      constructor(..._: any[]) {
        super(); // Call the base constructor
        const element = document.getElementById(hookId);
        if (element) {
          element.innerHTML = template;
          element.querySelector('h1')!.textContent = this.name;
        }
      }
    }
  };
}

@Logger('Instantiating create person object')
@WithTemplate('<h1>Fallback</h1>', 'app')
class Person {
  name = 'Jo';

  constructor() {
    console.log('Creating person object');
  }
}

// Activate the custom class that replaces the given class above
const pers = new Person();

console.log(pers);
```

### Returning from decorators

When returning values from decorators, you can return [property descriptors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

We can return these from method and parameter decorators. This allows us to override or set our own `getter` and `setter` descriptors for example, along with `enumarable` or `configurable` properties.

### Decorator example - autobind

```
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  return {
    configurable: true,
    enumerable: false,
    get() {
      return originalMethod.bind(this);
    }
  }
}

class PrintMessage {
  message: string = 'This works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const button = document.getElementById('mybutton')!;

const p = new PrintMessage();

button.addEventListener('click', p.showMessage);
```



### Other notes

You can use `_` in argument lists to mark an expected argument that will not be used:

```
function(_: string, _2: number) {
  // _  or _2 not used
}
```

## Next steps

The [TypeScript website](https://www.typescriptlang.org/) is a good starting point to explore TypeScript further.


## Well that's enough about me. Your turn!

Have you build a cool Svelte app you'd like to tell me about? You can message me [on twitter](https://twitter.com/donovanh), I'd love to hear from you.



