
const App = require('../app');
const allApps = require('../seed.js');


describe("Should paginate apps", function () {
    let controller;

    beforeEach(function () {
        controller = new App.PaginateController(allApps);
    });


    it("range should have default values for values not specified", async function () {
        const request = {
            query: { by: 'id' }
        }

        expect(controller.getRangeRequest(request)).toEqual(jasmine.objectContaining({
            by: 'id',
            start: 0,
            end: 0,
            max: 50,
            order: 'asc'
        }));
    });

    
    it("range should convert query strings into integers", async function () {
        const request = {
            query: {
                by: 'id',
                start: '5',
                end: '13',
                max: '4'
            }
        }

        expect(controller.getRangeRequest(request)).toEqual(jasmine.objectContaining({
            by: 'id',
            start: 5,
            end: 13,
            max: 4,
            order: 'asc'
        }));
    });

    it('should return first 5 apps sorted by id', () => {
        const expected = [
            { id: 1, name: 'axios-app' },
            { id: 2, name: 'bootstrap-app' },
            { id: 3, name: 'coding-app' },
            { id: 4, name: 'debug-app' },
            { id: 5, name: 'express-app' },
        ];

        expect(controller.sortApps(new App.Range('id', 0, 0, 5))).toEqual(expected);
    });

    it('should return 1st 5 apps sorted by name', () => {
        const expected = [
            { id: 111, name: 'algorithm-app' },
            { id: 51, name: 'ape-app' },
            { id: 67, name: 'api-app' },
            { id: 41, name: 'apple-app' },
            { id: 113, name: 'argument-app' },
        ];

        expect(controller.sortApps(new App.Range('name', 0, 0, 5))).toEqual(expected);
    });

    it('should return 2nd 5 apps sorted by id', () => {
        const expected = [
            { id: 5, name: 'express-app' },
            { id: 6, name: 'filter-app' },
            { id: 7, name: 'github-app' },
            { id: 8, name: 'heap-app' },
            { id: 9, name: 'index-app' },
        ];
        expect(controller.sortApps(new App.Range('id', 5, 0, 5, 'asc'))).toEqual(expected);
    });

    it('should return 2nd 5 apps sorted by name', () => {
        const expected = [
            { id: 5, name: 'express-app' },
            { id: 6, name: 'filter-app' },
            { id: 33, name: 'fish-app' },
            { id: 56, name: 'flower-app' },
            { id: 44, name: 'frown-app' },
        ];
        expect(controller.sortApps(new App.Range('name', 5, 0, 5))).toEqual(expected);
    });

    it('should next 3 apps sorted by id', () => {
        const expected = [
            { id: 5, name: 'express-app' },
            { id: 6, name: 'filter-app' },
            { id: 7, name: 'github-app' },
            { id: 8, name: 'heap-app' },
        ];
        expect(controller.sortApps(new App.Range('id', 5, 8, 5))).toEqual(expected);
    });

    it('should return next 3 apps sorted by name', () => {
        const expected = [
            { id: 55, name: 'easter-app' },
            { id: 75, name: 'eggs-app' },
            { id: 119, name: 'error-app' },
            { id: 139, name: 'eventhandler-app' },
        ];
        expect(controller.sortApps(new App.Range('name', 55, 100, 4))).toEqual(expected);
    });

    it('should last 3 apps sorted by id', () => {
        const expected = [
            { id: 18, name: 'react-app' },
            { id: 19, name: 'sort-app' },
            { id: 20, name: 'tech-app' },
            { id: 21, name: 'undefined-app' },
            { id: 22, name: 'visualstudiocode-app' },
            { id: 23, name: 'webdeveloper-app' },
            { id: 24, name: 'xml-app' },
            { id: 25, name: 'yoyo-app' },
        ];
        expect(controller.sortApps(new App.Range('id', 18, 25, 50))).toEqual(expected);
    });

    it('should return last 3 apps sorted by name', () => {
        const expected = [
            { id: 18, name: 'react-app' },
            { id: 129, name: 'reactnative-app' },
            { id: 84, name: 'red-app' },
            { id: 68, name: 'redux-app' },
            { id: 76, name: 'rose-app' },
            { id: 150, name: 'ruby-app' },
            { id: 136, name: 'sandbox-app' },
            { id: 135, name: 'sequence-app' },
            { id: 131, name: 'server-app' },
            { id: 38, name: 'shark-app' },
            { id: 87, name: 'silver-app' },
            { id: 132, name: 'software-app' },
            { id: 19, name: 'sort-app' },
            { id: 95, name: 'spinach-app' },
            { id: 133, name: 'stack-app' },
            { id: 100, name: 'starwars-app' },
            { id: 69, name: 'state-app' },
            { id: 20, name: 'tech-app' },
            { id: 60, name: 'thanksgiving-app' },
            { id: 78, name: 'tulip-app' },
            { id: 21, name: 'undefined-app' },
            { id: 59, name: 'valentine-app' },
            { id: 134, name: 'variable-app' },
            { id: 22, name: 'visualstudiocode-app' },
            { id: 98, name: 'water-app' },
            { id: 23, name: 'webdeveloper-app' },
            { id: 37, name: 'whale-app' },
            { id: 88, name: 'white-app' },
            { id: 24, name: 'xml-app' },
            { id: 83, name: 'yellow-app' },
            { id: 25, name: 'yoyo-app' },
        ];
        expect(controller.sortApps(new App.Range('name', 18, 25, 50))).toEqual(expected);
    });

    it('returns first 3 apps sorted by id in desc order', () => {
        const expected = [
            { id: 120, name: 'fullstack-app' },
            { id: 119, name: 'error-app' },
            { id: 118, name: 'concat-app' },
            { id: 117, name: 'compile-app' },
            { id: 116, name: 'closure-app' },
            { id: 115, name: 'callback-app' },
            { id: 114, name: 'boolean-app' },
            { id: 113, name: 'argument-app' },
            { id: 112, name: 'array-app' },
            { id: 111, name: 'algorithm-app' },
        ];
        expect(controller.sortApps(new App.Range('id', 120, 123, 10, 'desc'))).toEqual(expected);
    });

    it('returns first 3 apps sorted by name in desc order', () => {
        const expected = [
            { id: 90, name: 'brown-app' },
            { id: 2, name: 'bootstrap-app' },
            { id: 114, name: 'boolean-app' },
            { id: 80, name: 'blue-app' },
        ];
        expect(controller.sortApps(new App.Range('name', 90, 115, 4, 'desc'))).toEqual(expected);
    });

    it('returns first 2 apps sorted by name in desc order', () => {
        const expected = [
            { id: 45, name: 'gorilla-app' },
            { id: 86, name: 'gold-app' },
            { id: 77, name: 'glory-app' },
            { id: 7, name: 'github-app' },
        ];
        expect(controller.sortApps(new App.Range('name', 45, 7, 50, 'desc'))).toEqual(expected);
    });

    // it('should not return any apps if start is bigger than the size of the array', () => {
    //     const expected = [];

    //     expect(controller.sortApps(new App.Range('name', 30, 25, 50))).toEqual(expected);
    // });
});
