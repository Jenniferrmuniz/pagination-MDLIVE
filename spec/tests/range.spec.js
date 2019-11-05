// const Range = require('../../myApp/model/range.js');
const buildRange = require('../../app').buildRange;

describe("Range", function() {
  beforeEach(function() {
  });

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
});
