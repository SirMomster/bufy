import { expect } from 'chai';
import 'mocha';

import { Bufy } from '../src/index';

interface BasePacketObjectMapping {
    id: number,
}

interface TestPacketObjectMapping extends BasePacketObjectMapping {
    x: number,
    y: number,
}

const TestModelDescription = {
    id: Bufy.type().int8Type,
    x: Bufy.type().int8Type,
    y: Bufy.type().int16Type,
}

const TestModel = new Bufy<TestPacketObjectMapping>(TestModelDescription);

describe('bufyMappingTests#SimpleObject', () => {
    it('should map a simple object', () => {
        const testObject: TestPacketObjectMapping = {
            id: 123,
            x: 1,
            y: 2,
        };

        const buffer = TestModel.toBuffer(testObject);
        const object = TestModel.toObject(buffer);
        
        expect(object.id).to.eql(testObject.id);
        expect(object.x).to.eql(testObject.x);
        expect(object.y).to.eql(testObject.y);
    });
});