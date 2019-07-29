// tslint:disable: no-magic-numbers

import { expect } from "chai";
import "mocha";

import { Bufy } from "../src/index";

interface INestedObjectMapping {
    child: {
        id: number,
    };
}

const TestModelDescription = {
    child: Bufy.nested({
        id: Bufy.type().uInt16Type,
    }),
};

const TestModel = new Bufy<INestedObjectMapping>(TestModelDescription);

describe("bufyMappingTests#NetstedObject", () => {
    it("should map a nested object", () => {
        const testObject: INestedObjectMapping = {
            child: {
                id: 1,
            },
        };

        const buffer = TestModel.toBuffer(testObject);
        const object = TestModel.toObject(buffer);

        expect(object.child.id).to.eql(testObject.child.id);
    });
});
