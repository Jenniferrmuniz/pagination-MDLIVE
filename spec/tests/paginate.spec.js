const sortById = require('../../app').sortById;
const sortByName = require('../../app').sortByName;
const findObj = require('../../app').findObj;
const getEndpoint = require('../../app').getEndpoint;
const paginateAndSort = require('../../app').paginateAndSort;
const buildRange = require('../../app').buildRange;

describe("Should sort and pageinate apps", function () {
    const allApps = [
        { id: 35, name: 'zip-app' },
        { id: 39, name: 'cookie-app' },
        { id: 36, name: 'bunny-app' },
        { id: 37, name: 'whale-app' },
        { id: 38, name: 'shark-app' },
        { id: 40, name: 'brownie-app' },
    ];

    it("should build a default range object with id", function() {
        const range = buildRange({ query: { by: 'id' } });

        expect(range).toEqual({
            by: 'id',
            order: 'asc',
            max: 50,
            start: undefined,
            end: undefined
        });
    });

    it("should build a default range object with name", function() {
        const range = buildRange({ query: { by: 'name' } });

        expect(range).toEqual({
            by: 'name',
            order: 'asc',
            max: 50,
            start: undefined,
            end: undefined
        });
    });

    it("should build a range object will all values specified for pagination by name", function() {
        const range = buildRange({
            query: { by: 'name',
                start: 'def',
                end: 'xyz',
                order: 'desc',
                max: '10'
            }
        });

        expect(range).toEqual({
            by: 'name',
            order: 'desc',
            max: 10,
            start: 'def',
            end: 'xyz'
        });
    });

    it("should build a range object will all values specified for pagination by id", async function() {
        const range = buildRange({
            query: { by: 'id',
                start: '5',
                end: '11',
                order: 'desc',
                max: '3'
            }
        });

        expect(range).toEqual({
            by: 'id',
            order: 'desc',
            max: 3,
            start: '5',
            end: '11'
        });
    });

    it('should sort by id in ascending order', () => {
        expect(sortById(allApps, 'asc')).toEqual([
            { id: 35, name: 'zip-app' },
            { id: 36, name: 'bunny-app' },
            { id: 37, name: 'whale-app' },
            { id: 38, name: 'shark-app' },
            { id: 39, name: 'cookie-app' },
            { id: 40, name: 'brownie-app' },
        ])
    })

    it('should sort by name in ascending order', () => {
        expect(sortByName(allApps, 'asc')).toEqual([
            { id: 40, name: 'brownie-app' },
            { id: 36, name: 'bunny-app' },
            { id: 39, name: 'cookie-app' },
            { id: 38, name: 'shark-app' },
            { id: 37, name: 'whale-app' },
            { id: 35, name: 'zip-app' },
        ])
    });

    it('should sort by id in descending order', () => {
        expect(sortById(allApps, 'desc')).toEqual([
            { id: 40, name: 'brownie-app' },
            { id: 39, name: 'cookie-app' },
            { id: 38, name: 'shark-app' },
            { id: 37, name: 'whale-app' },
            { id: 36, name: 'bunny-app' },
            { id: 35, name: 'zip-app' },
        ])
    })

    it('should sort by name in descending order', () => {
        expect(sortByName(allApps, 'desc')).toEqual([
            { id: 35, name: 'zip-app' },
            { id: 37, name: 'whale-app' },
            { id: 38, name: 'shark-app' },
            { id: 39, name: 'cookie-app' },
            { id: 36, name: 'bunny-app' },
            { id: 40, name: 'brownie-app' },
        ])
    });

    it('should find the object by id when id is in array', () => {
        const sortedByIdList = [
            { id: 35, name: 'zip-app' },
            { id: 36, name: 'bunny-app' },
            { id: 37, name: 'whale-app' },
            { id: 38, name: 'shark-app' },
            { id: 39, name: 'cookie-app' },
            { id: 40, name: 'brownie-app' },
        ];
        expect(findObj(sortedByIdList, 36)).toBe(1);
    });

    it('should find the object by name when name is in array', () => {
        const sortedByNameList = [
            { id: 35, name: 'zip-app' },
            { id: 37, name: 'whale-app' },
            { id: 38, name: 'shark-app' },
            { id: 39, name: 'cookie-app' },
            { id: 36, name: 'bunny-app' },
            { id: 40, name: 'brownie-app' },
        ];
        expect(findObj(sortedByNameList, 'shark-app')).toBe(2);
    });

    it('should return undefined when id is not in array', () => {
        const sortedByIdList = [
            { id: 35, name: 'zip-app' },
            { id: 36, name: 'bunny-app' },
            { id: 37, name: 'whale-app' },
            { id: 38, name: 'shark-app' },
            { id: 39, name: 'cookie-app' },
            { id: 40, name: 'brownie-app' },
        ];
        expect(findObj(sortedByIdList, 101)).toBe(undefined);
    });

    it('should return undefined when name is not in array', () => {
        const sortedByIdList = [
            { id: 35, name: 'zip-app' },
            { id: 36, name: 'bunny-app' },
            { id: 37, name: 'whale-app' },
            { id: 38, name: 'shark-app' },
            { id: 39, name: 'cookie-app' },
            { id: 40, name: 'brownie-app' },
        ];
        expect(findObj(sortedByIdList, 'zzzzzzz')).toBe(undefined);
    });

    it('should return end when end is less than start + max and end is greater than start', () => {
        expect(getEndpoint(1, 3, 5)).toBe(3);
    });

    it('should return end when end is equal to start + max and end is greater than start', () => {
        expect(getEndpoint(1, 1, 5)).toBe(6);
    });

    it('should return end when end less than start + max and end is equal start', () => {
        expect(getEndpoint(2, 2, 5)).toBe(7);
    });

    it('should return start + max when end is greater than start + max', () => {
        expect(getEndpoint(1, 10, 5)).toBe(6);
    });

    it('should return start + max when end is less than start', () => {
        expect(getEndpoint(3, 2, 5)).toBe(8);
    });

    it('should return start + max when end is equal to start', () => {
        expect(getEndpoint(3, 3, 5)).toBe(8);
    });

    it('should return first 2 apps sorted by id', () => {
        const request = {
            query: {
                by: 'id',
                max: '2'
            }
        }
        const expected = [
            { id: 35, name: 'zip-app' },
            { id: 36, name: 'bunny-app' },
        ];

        expect(paginateAndSort(allApps, request)).toEqual(expected);
    });

    it('should return 1st 2 apps sorted by name', () => {
        const request = {
            query: {
                by: 'name',
                max: '2'
            }
        }
        const expected = [
            { id: 40, name: 'brownie-app' },
            { id: 36, name: 'bunny-app' },
        ];

        expect(paginateAndSort(allApps, request)).toEqual(expected);
    });

    it('should return 2nd 2 apps sorted by id', () => {
        const expected = [
            { id: 37, name: 'whale-app' },
            { id: 38, name: 'shark-app' },
        ];
        const request = {
            query: {
                by: 'id',
                start: '37',
                max: '2'
            }
        }
        expect(paginateAndSort(allApps, request)).toEqual(expected);
    });

    it('should return 2nd 2 apps sorted by name', () => {
        const expected = [
            { id: 39, name: 'cookie-app' },
            { id: 38, name: 'shark-app' },
        ];
        const request = {
            query: {
                by: 'name',
                start: 'cookie-app',
                max: '2'
            }
        }
        expect(paginateAndSort(allApps, request)).toEqual(expected);
    });

    it('should next 3 apps sorted by id when specifying end', () => {
        const expected = [
            { id: 36, name: 'bunny-app' },
            { id: 37, name: 'whale-app' },
            { id: 38, name: 'shark-app' },
        ];
        const request = {
            query: {
                by: 'id',
                start: '36',
                end: '38',
                max: '5'
            }
        }
        expect(paginateAndSort(allApps, request)).toEqual(expected);
    });

    it('should return next 3 apps sorted by name when specifying end', () => {
        const expected = [
            { id: 36, name: 'bunny-app' },
            { id: 39, name: 'cookie-app' },
            { id: 38, name: 'shark-app' },
        ];
        const request = {
            query: {
                by: 'name',
                start: 'bunny-app',
                end: 'shark-app',
                max: '5'
            }
        }
        expect(paginateAndSort(allApps, request)).toEqual(expected);
    });

    it('should last 3 apps sorted by id when end is not in array and max is 50', () => {
        const request = {
            query: {
                by: 'id',
                start: '38',
                end: 'zzzz',
            }
        }
        const expected = [
            { id: 38, name: 'shark-app' },
            { id: 39, name: 'cookie-app' },
            { id: 40, name: 'brownie-app' },
        ];
        expect(paginateAndSort(allApps, request)).toEqual(expected);
    });

    it('should last 3 apps sorted by id when end undefined and max is 50', () => {
        const request = {
            query: {
                by: 'id',
                start: '38',
            }
        }
        const expected = [
            { id: 38, name: 'shark-app' },
            { id: 39, name: 'cookie-app' },
            { id: 40, name: 'brownie-app' },
        ];
        expect(paginateAndSort(allApps, request)).toEqual(expected);
    });


    it('should last 3 apps sorted by name when end is not in array and max is 50', () => {
        const request = {
            query: {
                by: 'name',
                start: 'shark-app',
                end: 'zzzz',
            }
        }
        const expected = [
            { id: 38, name: 'shark-app' },
            { id: 37, name: 'whale-app' },
            { id: 35, name: 'zip-app' },
        ];
        expect(paginateAndSort(allApps, request)).toEqual(expected);
    });

    it('should last 4 apps sorted by name when end undefined and max is 50', () => {
        const request = {
            query: {
                by: 'name',
                start: 'cookie-app',
            }
        }
        const expected = [
            { id: 39, name: 'cookie-app' },
            { id: 38, name: 'shark-app' },
            { id: 37, name: 'whale-app' },
            { id: 35, name: 'zip-app' },
        ];
        expect(paginateAndSort(allApps, request)).toEqual(expected);
    });

    it('returns first 3 apps sorted by id in desc order', () => {
        const request = {
            query: {
                by: 'id',
                start: '40',
                max: '3',
                order: 'desc'
            }
        }
        const expected = [
            { id: 40, name: 'brownie-app' },
            { id: 39, name: 'cookie-app' },
            { id: 38, name: 'shark-app' },
        ];
        expect(paginateAndSort(allApps, request)).toEqual(expected);
    });

    it('returns first 3 apps sorted by name in desc order', () => {
        const request = {
            query: {
                by: 'name',
                start: 'zip-app',
                max: '3',
                order: 'desc'
            }
        }
        const expected = [
            { id: 35, name: 'zip-app' },
            { id: 37, name: 'whale-app' },
            { id: 38, name: 'shark-app' },
        ];
        expect(paginateAndSort(allApps, request)).toEqual(expected);
    });

    it('returns last 2 apps sorted by name in desc order', () => {
        const request = {
            query: {
                by: 'name',
                start: 'zip-app',
                end: 'whale-app',
                order: 'desc'
            }
        }
        const expected = [
            { id: 35, name: 'zip-app' },
            { id: 37, name: 'whale-app' },
        ];
        expect(paginateAndSort(allApps, request)).toEqual(expected);
    });
});
