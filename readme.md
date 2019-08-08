# Bufy
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9dcc2a61a75c44b488f2c3278e6bc36f)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SirMomster/bufy&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/9dcc2a61a75c44b488f2c3278e6bc36f)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=SirMomster/bufy&utm_campaign=Badge_Coverage)
[![npm version](https://badge.fury.io/js/bufy.svg)](https://badge.fury.io/js/bufy)
![dependencies](https://david-dm.org/sirmomster/bufy.svg)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/sirmomster/bufy/issues)
[![Known Vulnerabilities](https://snyk.io//test/github/SirMomster/bufy/badge.svg?targetFile=package.json)](https://snyk.io//test/github/SirMomster/bufy?targetFile=package.json)

## What is bufy

Bufy is a library that allows you to map ArrayBuffers on Objects and back. For example:

```js
const locationModelDescription = {
    id: Bufy.type().int8Type,
    x: Bufy.type().uInt16Type,
    y: Bufy.type().int16Type,
    active: Bufy.bool(),
}

const locationObject = {
    id: 123,
    x: 1,
    y: 2,
    active: true,
}

const LocationModel = new Bufy(locationModelDescription);

const buffer = LocationModel.toBuffer(locationObject); // [ArrayBuffer ...]
const object = LocationModel.toObject(buffer); // { id: 123, x: 1, y: 2 }
```

We use this library internally to send packets over MqTT and WebSockets. It's a lot easier that doing the mapping by yourself and
it allows you to use tiny packets while keeping a JSON structure.

The model is also reusable, which makes it easy to build a shared model module for your projects. It supports both node and web with zero dependencies.

## Supported types

All the JS supported types are supported:
(u)Int8, (u)Int16, (u)Int32, float32, float64

We also added additional support for booleans (uInt8), lists, nested objects, recursion and nChars (strings).

### NChars

This will map a string to a char array which then can be mapped to a buffer and back.

Padding is added to the end of the string if its smaller than the maxLength (10 in this case). If it's bigger, than the string it will be truncated. By default, the string will be trimmed when it's mapped on an object.

```js
const userModelMapping = {
    username: Bufy.nChar(10 /* trim? = true */),
}

const user = {
    username: 'test',
}
```

### Recursive, List and Nested

Recursive and list do almost the same, but the difference is that recursive will try to map until it's at the end of the buffer/object, whereas list uses a fixed amount which is set in the object itself (by bufy) that tells it about the amount of items there are to be mapped.

Nested allows you to have objects in your objects/lists.
There is still one big limitation of lists and that would be multi-dimensional lists which aren't supported yet.

```js
const entityLocationModel = {
    users_amount: Bufy.type().uInt8Type, /* added by bufy! */
    ...Bufy.list("users", Bufy.nested({
        id: Bufy.type().int8Type,
        x: Bufy.type().int64Type,
        y: Bufy.type().float32Type,
    }),
    ...Bufy.list("random_ids", Bufy.type().uInt8Type),
}

const user = {
    users: [
        {
            id: 254,
            x: 24785943,
            y: 13409834,
        }
    ],
    random_ids: [1, 2, 3, 4, 5, 6, 8, 9, 10]
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

-----

For more info make sure to check the tests.

## Roadmap

1. Performance enhancements
2. Add support for multi-dimensional lists
3. Add tests for Web
4. Add a pre-compiled javascript bundle for Web
5. Add better docs

## Contributing

Just make a PR :) also feel free to open an issue for ideas, improvements, issues etc.