// tslint:disable: no-magic-numbers

import { expect } from "chai";
import "mocha";

import { Bufy } from "../src/index";

describe("bufyMappingTests#List", () => {
    it("should map a recursive number array", () => {
        interface IRecursiveNumberMapping {
            child: number[];
        }

        const RecursiveNumberModelDescription = {
            ...Bufy.list("child", Bufy.type().uInt8Type),
        };

        const NumberArrayTestModel = new Bufy<IRecursiveNumberMapping>(RecursiveNumberModelDescription);

        const testObject: IRecursiveNumberMapping = {
            child: [1],
        };

        const buffer = NumberArrayTestModel.toBuffer(testObject);
        const object = NumberArrayTestModel.toObject(buffer);

        expect(object.child[0]).to.eql(testObject.child[0]);
    });

    it("should map a recursive number array with a custom identifier", () => {
        interface IRecursiveNumberMapping {
            child: number[];
        }

        const RecursiveNumberModelDescription = {
            ...Bufy.list("child", Bufy.type().uInt8Type, Bufy.type().uInt32Type),
        };

        const NumberArrayTestModel = new Bufy<IRecursiveNumberMapping>(RecursiveNumberModelDescription);

        const testObject: IRecursiveNumberMapping = {
            child: [1],
        };

        const buffer = NumberArrayTestModel.toBuffer(testObject);
        const object = NumberArrayTestModel.toObject(buffer);

        expect(object.child[0]).to.eql(testObject.child[0]);
    });

    it("should map a recursive object array", () => {
        interface IRecursiveNumberMapping {
            child: Array<{ id: number }>;
        }

        const RecursiveObjectModelDescription = {
            ...Bufy.list("child", Bufy.nested({
                id: Bufy.type().uInt8Type,
            })),
        };

        const ObjectArrayTestModel = new Bufy<IRecursiveNumberMapping>(RecursiveObjectModelDescription);

        const testObject: IRecursiveNumberMapping = {
            child: [{
                id: 1,
            }],
        };

        const buffer = ObjectArrayTestModel.toBuffer(testObject);
        const object = ObjectArrayTestModel.toObject(buffer);

        expect(object.child[0].id).to.eql(testObject.child[0].id);
    });

    it("should map a recursive object array with a recursive", () => {
        interface IRecursiveNumberMapping {
            child: Array<{ id: number,
                items: number[],
                child: Array<{
                    id: number,
                    items: number[],
                }>,
            }>;
        }

        const RecursiveObjectModelDescription = {
            ...Bufy.list("child", Bufy.nested({
                id: Bufy.type().uInt8Type,
                ...Bufy.list("child", Bufy.nested({ id: Bufy.type().int8Type,
                    ...Bufy.list("items", Bufy.type().int8Type),
                })),
                ...Bufy.list("items", Bufy.type().int8Type),
            })),
        };

        const ObjectArrayTestModel = new Bufy<IRecursiveNumberMapping>(RecursiveObjectModelDescription);

        const testObject: IRecursiveNumberMapping = {
            child: [{
                child: [{id: 1, items: [120]}],
                id: 1,
                items: [1, 2, 3],
            }],
        };

        const buffer = ObjectArrayTestModel.toBuffer(testObject);
        const object = ObjectArrayTestModel.toObject(buffer);

        expect(object.child[0].id).to.eql(testObject.child[0].id);
        expect(object.child[0].items).to.eql(testObject.child[0].items);

        expect(object.child[0].child[0].id).to.eql(testObject.child[0].child[0].id);
        expect(object.child[0].child[0].items).to.eql(testObject.child[0].child[0].items);
    });
});
