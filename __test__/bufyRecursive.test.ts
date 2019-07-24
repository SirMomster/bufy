import { expect } from 'chai';
import 'mocha';

import { Bufy } from '../src/index';

interface RecursiveNumberMapping {
    child: number[],
}

const RecursiveNumberModelDescription = {
    child: Bufy.recursive(Bufy.type().uInt8Type),
}

const NumberArrayTestModel = new Bufy<RecursiveNumberMapping>(RecursiveNumberModelDescription);

interface RecursiveObjectMapping {
    child: { id: number }[],
}

const RecursiveObjectModelDescription = {
    child: Bufy.recursive(Bufy.nested({
        id: Bufy.type().uInt8Type,
    })),
}

const ObjectArrayTestModel = new Bufy<RecursiveObjectMapping>(RecursiveObjectModelDescription);


describe('bufyMappingTests#Recursive', () => {
    it('should map a recursive number array', () => {
        const testObject: RecursiveNumberMapping = {
            child: [1],
        };

        const buffer = NumberArrayTestModel.toBuffer(testObject);
        const object = NumberArrayTestModel.toObject(buffer);

        expect(object.child[0]).to.eql(testObject.child[0]);
    });

    it('should map a recursive object array', () => {
        const testObject: RecursiveObjectMapping = {
            child: [{
                id: 1,
            }],
        };

        const buffer = ObjectArrayTestModel.toBuffer(testObject);
        const object = ObjectArrayTestModel.toObject(buffer);

        expect(object.child[0].id).to.eql(testObject.child[0].id);
    });
});