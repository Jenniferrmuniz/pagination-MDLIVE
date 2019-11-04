
const App = require('../app');
const allApps = require('../seed.js');


describe("Should paginate apps", function() {
    let controller;

  beforeEach(function() {
      controller = new App.PaginateController(allApps);
  });

      it("range should have default values for values not specified", async function() {
          const request = {
              params: { range: 'range'},
              query: {by: 'id'}
          }

          expect(controller.getRangeRequest(request)).toEqual(jasmine.objectContaining({
              by: 'id',
              start: 0,
              end: 0,
              max: 50,
              order: 'asc'
          }));
      });

        it("range should convert query strings into integers", async function() {
            const request = {
                params: { range: 'range'},
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
              {id: 1, name: 'Axios app'},
              {id: 2, name: 'Bootstrap app'},
              {id: 3, name: 'Coding app'},
              {id: 4, name: 'Debug app'},
              {id: 5, name: 'Express app'},
          ];

          expect(controller.sortApps(new App.Range('id', 0, 0, 5))).toEqual(expected);
      });

        it('should return 1st 5 apps sorted by name', () => {
        const expected = [
            {id: 7, name: 'A App'},
            {id: 20, name: 'B App'},
            {id: 19, name: 'C App'},
            {id: 18, name: 'D App'},
            {id: 17, name: 'E App'},
        ];

        expect(controller.sortApps(new App.Range('name', 0, 0, 5))).toEqual(expected);
        });

        it('should return 2nd 5 apps sorted by id', () => {
        const expected = [
            {id: 6, name: 'W App'},
            {id: 7, name: 'A App'},
            {id: 8, name: 'O App'},
            {id: 9, name: 'N App'},
            {id: 10, name: 'M App'},

        ];
        expect(controller.sortApps(new App.Range('id', 5, 0, 5, 'asc'))).toEqual(expected);
    });

    it('should return 2nd 5 apps sorted by name', () => {
        const expected = [
            {id: 16, name: 'F App'},
            {id: 15, name: 'G App'},
            {id: 14, name: 'H App'},
            {id: 13, name: 'I App'},
            {id: 12, name: 'J App'},
        ];
        expect(controller.sortApps(new App.Range('name', 5, 0, 5))).toEqual(expected);
    });

    it('should next 3 apps sorted by id', () => {
        const expected = [
            {id: 6, name: 'W App'},
            {id: 7, name: 'A App'},
            {id: 8, name: 'O App'},
        ];
        expect(controller.sortApps(new App.Range('id', 5, 8, 5))).toEqual(expected);
    });

    it('should return next 3 apps sorted by name', () => {
        const expected = [
            {id: 16, name: 'F App'},
            {id: 15, name: 'G App'},
            {id: 14, name: 'H App'},
        ];
        expect(controller.sortApps(new App.Range('name', 5, 8, 5))).toEqual(expected);
    });

    it('should last 3 apps sorted by id', () => {
        const expected = [
            {id: 19, name: 'C App'},
            {id: 20, name: 'B App'},
            {id: 21, name: 'Y App'},
        ];
        expect(controller.sortApps(new App.Range('id', 18, 25, 50))).toEqual(expected);
    });

    it('should return last 3 apps sorted by name', () => {
        const expected = [
            {id: 5, name: 'X App'},
            {id: 21, name: 'Y App'},
            {id: 1, name: 'Z App'},
        ];
        expect(controller.sortApps(new App.Range('name', 18, 25, 50))).toEqual(expected);
    });

    it('returns first 3 apps sorted by id in desc order', () => {
        const expected = [
            {id: 21, name: 'Y App'},
            {id: 20, name: 'B App'},
            {id: 19, name: 'C App'},
        ];
        expect(controller.sortApps(new App.Range('id', 0, 3, 50, 'desc'))).toEqual(expected);
    });

    it('returns first 3 apps sorted by name in desc order', () => {
        const expected = [
            {id: 1, name: 'Z App'},
            {id: 21, name: 'Y App'},
            {id: 5, name: 'X App'},
        ];
        expect(controller.sortApps(new App.Range('name', 0, 3, 50, 'desc'))).toEqual(expected);
    });

    it('returns first 2 apps sorted by name in desc order', () => {
        const expected = [
            {id: 3, name: 'S App'},
            {id: 4, name: 'R App'},
        ];
        expect(controller.sortApps(new App.Range('name', 5, 0, 2, 'desc'))).toEqual(expected);
    });

    it('should not return any apps if start is bigger than the size of the array', () => {
        const expected = [];

        expect(controller.sortApps(new App.Range('name', 30, 25, 50))).toEqual(expected);
    });
});
