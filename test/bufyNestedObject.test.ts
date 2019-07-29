import { expect } from 'chai';
import 'mocha';

import { Bufy } from '../src/index';

interface NestedObjectMapping {
    child: {
        id: number
    },
}

const TestModelDescription = {
    child: Bufy.nested({
        id: Bufy.type().int8Type,
    }),
}

const TestModel = new Bufy<NestedObjectMapping>(TestModelDescription);

describe('bufyMappingTests#NetstedObject', () => {
    it('should map a nested object', () => {
        const testObject: NestedObjectMapping = {
            child: {
                id: 1,
            }
        };

        const buffer = TestModel.toBuffer(testObject);
        const object = TestModel.toObject(buffer);

        expect(object.child.id).to.eql(testObject.child.id);
    });
});