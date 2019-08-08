// tslint:disable: no-magic-numbers

import { expect } from "chai";
import "mocha";

import { Bufy } from "../src/index";

interface IBoolMapping {
    iFalse: boolean;
    iTrue: boolean;
}

const Model = {
    iFalse: Bufy.bool(),
    iTrue: Bufy.bool(),
};

const TestModel = new Bufy<IBoolMapping>(Model);

describe("bufyMappingTests#Bool", () => {
    it("should map a simple object with booleans", () => {
        const testObject: IBoolMapping = {
            iFalse: false,
            iTrue: true,
        };

        const buffer = TestModel.toBuffer(testObject);
        const object = TestModel.toObject(buffer);

        expect(object).to.eql(testObject);
        expect(object.iTrue).to.be.eq(true);
        expect(object.iFalse).to.be.eq(false);
    });
});
