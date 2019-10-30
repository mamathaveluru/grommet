'use strict';

var _mixins = require('../mixins');

afterAll(function() {
  jest.clearAllMocks();
});
describe('Mixins parseMetricToNum', function() {
  global.console = {
    warn: jest.fn(),
  };
  test('converts "12px" to 12', function() {
    var warn = jest.spyOn(global.console, 'warn');
    var number = (0, _mixins.parseMetricToNum)('12px');
    expect(number).toBe(12);
    expect(warn).not.toHaveBeenCalled();
  });
  test('converts "12.5px" to 12', function() {
    var number = (0, _mixins.parseMetricToNum)('12.5px');
    expect(number).toBe(12.5);
  });
  test('converts "12px 20px" to 12 & warns about usage', function() {
    var warn = jest.spyOn(global.console, 'warn');
    var number = (0, _mixins.parseMetricToNum)('12px 20px');
    expect(number).toBe(12);
    expect(warn).toHaveBeenCalledWith(
      'Invalid single measurement value: "12px 20px"',
    );
  });
});
