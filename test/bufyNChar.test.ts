// tslint:disable: no-magic-numbers

import { expect } from "chai";
import "mocha";

import { Bufy } from "../src/index";

interface IBasePacketObjectMapping {
    name: string;
}

const TestModelDescription = {
    name: Bufy.nChar(10),
};

const TestModel = new Bufy<IBasePacketObjectMapping>(TestModelDescription);

describe("bufyMappingTests#NChar", () => {
    it("should map a string", () => {
        const testObject: IBasePacketObjectMapping = {
            name: "test",
        };

        const buffer = TestModel.toBuffer(testObject);
        const object = TestModel.toObject(buffer);

        expect(object.name).to.eql(testObject.name);
    });

    it("should map a string that is to long", () => {
        const testObject: IBasePacketObjectMapping = {
            name: "012345678910",
        };

        const buffer = TestModel.toBuffer(testObject);
        const object = TestModel.toObject(buffer);

        expect(object.name).to.eql("0123456789");
    });

    it("should not trim the string", () => {
        interface IMapping {
            name: string;
        }

        const Model = {
            name: Bufy.nChar(10, false),
        };

        const testModel = new Bufy<IMapping>(Model);

        const testObject: IMapping = {
            name: "124",
        };

        const buffer = testModel.toBuffer(testObject);
        const object = testModel.toObject(buffer);

        expect(object.name).to.eql("124       ");
    });
});
