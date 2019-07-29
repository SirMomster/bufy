import { expect } from 'chai';
import 'mocha';

import { Bufy } from '../src/index';

interface BasePacketObjectMapping {
    name: string,
}

const TestModelDescription = {
    name: Bufy.nChar(10),
}

const TestModel = new Bufy<BasePacketObjectMapping>(TestModelDescription);

describe('bufyMappingTests#NChar', () => {
    it('should map a string', () => {
        const testObject: BasePacketObjectMapping = {
            name: 'test',
        };

        const buffer = TestModel.toBuffer(testObject);
        const object = TestModel.toObject(buffer);
        
        expect(object.name).to.eql(testObject.name);
    });
});