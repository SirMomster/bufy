// tslint:disable: no-magic-numbers

import { expect } from "chai";
import "mocha";

import { Bufy } from "../src/index";

interface ITypeMapping {
    i8: number;
    i16: number;
    i32: number;
    u8: number;
    u16: number;
    u32: number;
    f1: number;
    f2: number;
}

const Model = {
    f1: Bufy.type().float32Type,
    f2: Bufy.type().float64Type,
    i16: Bufy.type().int16Type,
    i32: Bufy.type().int32Type,
    i8: Bufy.type().int8Type,
    u16: Bufy.type().uInt16Type,
    u32: Bufy.type().uInt32Type,
    u8: Bufy.type().uInt8Type,
};

const TestModel = new Bufy<ITypeMapping>(Model);

describe("bufyMappingTests#Types", () => {
    it("should map a simple object", () => {
        const testObject: ITypeMapping = {
            f1: 1000000,
            f2: 2000000,
            i16: 22320,
            i32: 320000,
            i8: 100,
            u16: 25000,
            u32: 350000,
            u8: 200,
        };

        const buffer = TestModel.toBuffer(testObject);
        const object = TestModel.toObject(buffer);

        expect(object).to.eql(testObject);
    });
});
