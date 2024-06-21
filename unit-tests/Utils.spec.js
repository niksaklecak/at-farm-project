/**
 * This file contains unit tests for the `compareValues` method in the `Utils` class.
 */

const {Utils} = require('../helpers/Utils');

/**
 * Test suite for the `compareValues` method.
 */
describe('compareValues method', () => {
  let chai;
  let assert;

  /**
   * Set up the test suite.
   */
  before(async () => {
    chai = await import('chai');
    assert = chai.assert;
  });

  /**
   * Test case: should return true if supply is greater than or equal to demand.
   */
  it('should return true if supply is greater than or equal to demand', async () => {
    const demandText = '10';
    const supplyText = '15';
    const result = await Utils.compareValues(demandText, supplyText);
    assert.equal(result, true);
  });

  /**
   * Test case: should return false if supply and demand are equal.
   */
  it('should return false if supply and demand are equal', async () => {
    const demandText = '10';
    const supplyText = '10';
    const result = await Utils.compareValues(demandText, supplyText);
    assert.equal(result, false);
  });

  /**
   * Test case: should return false if supply is less than demand.
   */
  it('should return false if supply is less than demand', async () => {
    const demandText = '15';
    const supplyText = '10';
    const result = await Utils.compareValues(demandText, supplyText);
    assert.equal(result, false);
  });

  /**
   * Test case: should return true if demand is zero and supply is greater than zero.
   */
  it('should return true if demand is zero and supply is greater than zero', async () => {
    const demandText = '0';
    const supplyText = '10';
    const result = await Utils.compareValues(demandText, supplyText);
    assert.equal(result, true);
  });

  /**
   * Test case: should return false if both supply and demand are zero.
   */
  it('should return false if both supply and demand are zero', async () => {
    const demandText = '0';
    const supplyText = '0';
    const result = await Utils.compareValues(demandText, supplyText);
    assert.equal(result, false);
  });

  /**
   * Test case: should handle non-numeric values correctly.
   */
  it('should handle non-numeric values correctly', async () => {
    const demandText = '-';
    const supplyText = '1';
    const result = await Utils.compareValues(demandText, supplyText);
    assert.equal(result, true);
  });

  /**
   * Test case: should handle non-numeric and float values correctly.
   */
  it('should handle non-numeric and float values correctly', async () => {
    const demandText = '-';
    const supplyText = '1.16';
    const result = await Utils.compareValues(demandText, supplyText);
    assert.equal(result, true);
  });
});
