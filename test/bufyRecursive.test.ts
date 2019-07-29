// tslint:disable: no-magic-numbers

import { expect } from "chai";
import "mocha";

import { Bufy } from "../src/index";

describe("bufyMappingTests#Recursive", () => {
    it("should map a recursive number array", () => {
        interface IRecursiveNumberMapping {
            child: number[];
        }

        const RecursiveNumberModelDescription = {
            child: Bufy.recursive(Bufy.type().int16Type),
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
        interface IRecursiveObjectMapping {
            child: Array<{ id: number }>;
        }

        const RecursiveObjectModelDescription = {
            child: Bufy.recursive(Bufy.nested({
                id: Bufy.type().int32Type,
            })),
        };

        const ObjectArrayTestModel = new Bufy<IRecursiveObjectMapping>(RecursiveObjectModelDescription);

        const testObject: IRecursiveObjectMapping = {
            child: [{
                id: 1,
            }],
        };

        const buffer = ObjectArrayTestModel.toBuffer(testObject);
        const object = ObjectArrayTestModel.toObject(buffer);

        expect(object.child[0].id).to.eql(testObject.child[0].id);
    });
});
