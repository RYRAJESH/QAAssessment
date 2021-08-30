import { When, Then } from 'cucumber';
import { searchPage } from "../pages/searchPage.po";
import { planetResultsPage } from "../pages/planetResultsPage.po";
import planetData from "../testData/planetData";
import { setDefaultTimeout } from "cucumber";

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

setDefaultTimeout(25 * 1000);

let searchPo = new searchPage();
let planetResultsPo = new planetResultsPage();

When(/^You search for planet "(.*?)"$/, async (searchString) => {
    // search with the planet name provided in feature file
    await searchPo.performPlanetSearch(searchString);
});

When(/^You search for planet "(.*?)" with Enter key$/, async (searchString) => {
    // search with the planet name provided in feature file using Enter key
    await searchPo.performPlanetSearchWithEnter(searchString);
});

Then(/^Planet details for "(.*?)" are displayed$/, async (string) => {
    // verify that at least one planet result is displayed
    await expect(planetResultsPo.planetResultSets.get(0).isDisplayed(), 'Planet results are NOT displayed').to.eventually.be.true;
    
    // verify that name in results is correct as per test data
    await expect(await planetResultsPo.getPlanetName(0), 'Planet Name in result is incorrect').to.equals(planetData.PlanetData[string]["Name:"]);
    
    // checking that the label names for Planet Result displayed are correct as per test data
    let allLabels = await planetResultsPo.getAllLabelsForPlanetDetails(0);
    await expect(allLabels.populationLabel, 'Population label name in result is incorrect').to.equals(Object.keys(planetData.PlanetData[string])[1]);
    await expect(allLabels.climateLabel, 'Climate label name in result is incorrect').to.equals(Object.keys(planetData.PlanetData[string])[2]);
    await expect(allLabels.gravityLabel, 'Gravity label name in result is incorrect').to.equals(Object.keys(planetData.PlanetData[string])[3]);

    // checking that the values for Planet Result displayed are correct as per test data
    let allValues = await planetResultsPo.getAllValuesForPlanetDetails(0);
    await expect(allValues.populationValue, 'Population value in result is incorrect').to.equals(planetData.PlanetData[string]["Population:"]);
    await expect(allValues.climateValue, 'Climate value in result is incorrect').to.equals(planetData.PlanetData[string]["Climate:"]);
    await expect(allValues.gravityValue, 'Gravity value in result is incorrect').to.equals(planetData.PlanetData[string]["Gravity:"]);
});

Then(/^Multiple Planet results for "(.*?)" are displayed$/, async (string) => {
    // first verify that at least one planet result is displayed
    await expect(planetResultsPo.planetResultSets.get(0).isDisplayed(), 'Planet results are NOT displayed').to.eventually.be.true;
        
    // get count of planet results displayed and verify it is greater than 0
    var noOfResults = await planetResultsPo.getNumberOfResults();
    await expect(noOfResults, 'Multiple results are not displayed').to.be.gt(0);

    // create regular expression of the planet name and verify it matches with all results
    var nameRegExp = new RegExp(string, 'i');
    for (let i=0;i<noOfResults;i++) {
        // verify that name in all results matches with what is queried
        await expect(await planetResultsPo.getPlanetName(i), 'Name in result is not matching the searched name').to.match(nameRegExp);
    }
});