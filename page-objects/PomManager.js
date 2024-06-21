/**
 * @fileoverview This file exports the PomManager class, which is responsible for managing the page objects.
 * @module PomManager
 */
const {SoilAnalysisPage} = require('../page-objects/SoilAnalysisPage');
const {StandardAnalysisPage} = require('../page-objects/StandardAnalysisPage');
const {FarmsPage} = require('../page-objects/FarmsPage');


/**
 * Class representing the PomManager.
 * @class
 */
exports.PomManager = class PomManager {
  /**
   * Create a PomManager.
   * @constructor
   * @param {Page} page - The page object to be managed.
   */
  constructor(page) {
    this.page = page;
    this.soilAnalysisPage = new SoilAnalysisPage(page);
    this.standardAnalysisPage = new StandardAnalysisPage(page);
    this.farmsPage = new FarmsPage(page);
  }
};
