import { sum } from '../foo';

test('basic', () => {
    expect(sum()).toBe(0);
});

test('setupTests.js works', () => {
    // Modify globals.d.ts & ts.config.json when you remove this test
    expect(a).toBe('a');
});

test('basic again', () => {
    expect(sum(1, 2)).toBe(3);
});

test('basic async', async () => {
    expect(sum()).toBe(0);
});

test('basic async again',
    async () => {
        expect(sum(1, 2)).toBe(3);
    },
    1000 /* optional timeout */
);

test('callback receives correct argument',
    done => {
        function callback(data: string) {
            expect(data).toBe('correct argument');
            done();
        }

        fetchData(callback);
    },
    3000
);

function fetchData(callback: (data: string) => void) {
    callback('correct argument');
}
