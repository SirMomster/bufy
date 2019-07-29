import { expect } from 'chai';
import 'mocha';

import { Bufy } from '../src/index';

describe('bufyMappingTests#FixedRecursive', () => {
    it('should map a recursive number array', () => {
        interface RecursiveNumberMapping {
            child: number[],
        }

        const RecursiveNumberModelDescription = {
            ...Bufy.fixedRecursive('child', Bufy.type().uInt8Type),
        }

        const NumberArrayTestModel = new Bufy<RecursiveNumberMapping>(RecursiveNumberModelDescription);

        const testObject: RecursiveNumberMapping = {
            child: [1],
        };

        const buffer = NumberArrayTestModel.toBuffer(testObject);
        const object = NumberArrayTestModel.toObject(buffer);

        expect(object.child[0]).to.eql(testObject.child[0]);
    });

    it('should map a recursive object array', () => {
        interface RecursiveObjectMapping {
            child: { id: number }[],
        }

        const RecursiveObjectModelDescription = {
            ...Bufy.fixedRecursive('child', Bufy.nested({
                id: Bufy.type().uInt8Type,
            })),
        }

        const ObjectArrayTestModel = new Bufy<RecursiveObjectMapping>(RecursiveObjectModelDescription);

        const testObject: RecursiveObjectMapping = {
            child: [{
                id: 1,
            }],
        };

        const buffer = ObjectArrayTestModel.toBuffer(testObject);
        const object = ObjectArrayTestModel.toObject(buffer);

        expect(object.child[0].id).to.eql(testObject.child[0].id);
    });

    it('should map a recursive object array with a recursive', () => {
        interface RecursiveObjectMapping {
            child: { id: number, 
                items: number[],
            }[],
        }

        const RecursiveObjectModelDescription = {
            ...Bufy.fixedRecursive('child', Bufy.nested({
                id: Bufy.type().uInt8Type,
                ...Bufy.fixedRecursive('items', Bufy.type().int8Type),
            })),
        }

        const ObjectArrayTestModel = new Bufy<RecursiveObjectMapping>(RecursiveObjectModelDescription);

        const testObject: RecursiveObjectMapping = {
            child: [{
                id: 1,
                items: [1, 2, 3],
            }],
        };

        const buffer = ObjectArrayTestModel.toBuffer(testObject);
        const object = ObjectArrayTestModel.toObject(buffer);

        expect(object.child[0].id).to.eql(testObject.child[0].id);
        expect(object.child[0].items).to.eql(testObject.child[0].items);
    });
});