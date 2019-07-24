import { expect } from 'chai';
import 'mocha';

import { Bufy, ObjectMapping } from '../src/index';

interface BasePacketObjectMapping {
    id: number,
}

interface TestPacketObjectMapping extends BasePacketObjectMapping {
    x: number,
    y: number,
    players: number,
    test: {
        a: number,
    }[],
    amount: number,
    users: {
        b: number,
    }[],
    username: string,
    toEnd: {
        t: number,
    }[],
}

const TestModelDescription = {
    id: Bufy.type().int8Type,
    x: Bufy.type().int8Type,
    y: Bufy.type().int16Type,
    players: Bufy.type().int8Type,
    test: Bufy.fixedRecursive('players', {
        a: Bufy.type().int8Type,
    }),
    amount: Bufy.type().uInt32Type,
    users: Bufy.fixedRecursive('amount', {
        b: Bufy.type().int8Type,
    }),
    username: Bufy.nVarChar(10),
    toEnd: Bufy.recursive({
        t: Bufy.type().int8Type,
    })
}

const TestModel = new Bufy<TestPacketObjectMapping>(TestModelDescription);

describe('Hello function', () => {
    it('should return hello world', () => {
        const testObject: TestPacketObjectMapping = {
            id: 123,
            x: 1,
            y: 2,
            players: 2,
            test: [
                {
                    a: 1,
                },
                {
                    a: 1,
                }
            ],
            amount: 1,
            users: [
                {
                    b: 1,
                }
            ],
            username: 'stevey',
            toEnd: [
                {
                    t: 10,
                },
                {
                    t: 5,
                }
            ]
        };

        const buffer = TestModel.toBuffer(testObject);
        
        const object = TestModel.toObject(buffer);
        expect(object.id).to.eql(testObject.id);
        expect(object.x).to.eql(testObject.x);
        expect(object.y).to.eql(testObject.y);
        expect(object.players).to.eql(testObject.players);
        expect(object.test[0].a).to.eql(testObject.test[0].a);
        expect(object.amount).to.eql(testObject.amount);
        expect(object.users[0].b).to.eql(testObject.users[0].b);
        expect(object.toEnd[0].t).to.eql(testObject.toEnd[0].t);
        expect(object.toEnd[1].t).to.eql(testObject.toEnd[1].t);
        expect(object.username).to.eql(testObject.username);
    });
});