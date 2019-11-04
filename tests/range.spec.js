// const Range = require('../../myApp/model/range.js');
const App = require('../app');


describe("Range", function() {
  beforeEach(function() {
  });

  it("is valid if only by is specified and by is id", async function() {
      const range = new App.Range('id', 0, 10, 5, 'asc');

      expect(range.isValid(range)).toBe(true);
  });

  it("is valid if only by is specified and by is name", async function() {
    const range = new App.Range('name', 0, 10, 5, 'asc');

    expect(range.isValid(range)).toBe(true);
  });

  it("is not valid if not id or name", async function() {
    const range = new App.Range('idx', 0, 10, 5, 'asc');

    expect(range.isValid(range)).toBe(false);
  });
});
