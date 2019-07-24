# Bufy

> This is an experimental library for now, use at your own risk.

## What is bufy?

Bufy is a library that allows you to map ArrayBuffers on Objects and back. For example:

```js
const locationModelDescription = {
    id: Bufy.type().int8Type,
    x: Bufy.type().int16Type,
    y: Bufy.type().int16Type,
}

const locationObject = {
    id: 123,
    x: 1,
    y: 2,
}

const LocationModel = new Bufy(locationModelDescription);

const buffer = LocationModel.toBuffer(locationObject); // [ArrayBuffer ...]
const object = LocationModel.toObject(buffer); // { id: 123, x: 1, y: 2 }
```

We use this library internally to send packets over MqTT and WebSockets. It's a lot easier that doing the mapping by yourself.

The model is also reusable, which makes it easy to build a shared model module for your projects.

## Supported types

All the JS supported types are supported:
(u)Int8, (u)Int16, (u)Int32, float32, float64

We also added additional support for recursive mappings and nChars.

### NChars

This will map a string to a char array which then can be mapped to a buffer and back.

Padding is added to the end of the string if its smaller than the maxLength (10 in this case). If it's bigger than the string it will be truncated. By default the string will be trimmed when it's mapped on an object.

```js
const userModelMapping = {
    username: Bufy.nChar(10 /* trim? = true */),
}

const user = {
    username: 'test',
}
```

### Recursive and FixedRecursive

Recursive and fixedRecursive do almost the same, but the diffrence is that recursive will try to map until it's at the end of the buffer/object, whereas fixedRecursive uses a fixed amount which is set in the object itself that tells it about the amount of object there are to map.

```js
const entityLocationModel = {
    user_amount: Bufy.type().uInt8Type,
    users: Bufy.fixedRecursive('user_amount', {
        id: Bufy.type().int8Type,
        x: Bufy.type().int64Type,
        y: Bufy.type().int64Type,
    }),
    npcs: Bufy.recursive({
        id: Bufy.type().int16Type,
        x: Bufy.type().int64Type,
        y: Bufy.type().int64Type,
    })
}

const user = {
    user_amount: 1,
    users: [
        {
            id: 1,
        }
    ],
    npcs: [
        {
            id: 10,
            x: 5,
            y: 10,
        },
        {
            id: 5,
            x: 5,
            y: 10,
        }
    ]
}
```

## Typescript

The library itself has been written with typescript our first example would then look something like this:

```typescript
interface BasePacketObjectMapping {
    id: number,
}

interface LocationObjectMapping extends BasePacketObjectMapping {
    x: number,
    y: number,
}

const locationModelDescription = {
    id: Bufy.type().int8Type,
    x: Bufy.type().int16Type,
    y: Bufy.type().int16Type,
}

const locationObject: LocationObjectMapping = {
    id: 123,
    x: 1,
    y: 2,
}

const LocationModel = new Bufy<LocationObjectMapping>(locationModelDescription);

const buffer = LocationModel.toBuffer(locationObject); // [ArrayBuffer ...]
const object = LocationModel.toObject(buffer); // { id: 123, x: 1, y: 2 }
```


## Roadmap

1. Add more tests
2. Add deep object mapping (nested objects)
3. Performance enhancements
4. Improvements in ease of use

## Contributing

Just make a PR :) also feel free to open an issue for ideas, improvements, issues etc.