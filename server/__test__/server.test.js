

const { getPrimeArrByNumber,
    getMedianArr,
    checkIsInteger } = require('../server.js');

test('get prime array by numbers', async () => {
    expect(getPrimeArrByNumber(10)).toStrictEqual([2, 3, 5, 7]);
})

test('get median from array', async () => {
    expect(getMedianArr([1, 2, 3, 4])).toStrictEqual([2, 3]);
    expect(getMedianArr([1, 2, 4])).toStrictEqual([2]);
})

test('check if input is integer', async () => {
    expect(checkIsInteger("tt")).toStrictEqual(false);
    expect(checkIsInteger(13)).toStrictEqual(true);
    expect(checkIsInteger("12.3")).toStrictEqual(false);
    expect(checkIsInteger("123")).toStrictEqual(true);
})