import { Given, When, Then } from 'cucumber';
import { searchPage } from "../pages/searchPage.po";
import { characterResultsPage } from "../pages/characterResultsPage.po";
import { planetResultsPage } from "../pages/planetResultsPage.po";
import { setDefaultTimeout } from "cucumber";

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

setDefaultTimeout(25 * 1000);

let searchPo = new searchPage();
let characterResultsPo = new characterResultsPage();
let planetResultsPo = new planetResultsPage();

Given('The app is open on {string}', async (string) => {
    // navigate to the application using url string provided in feature file
    await searchPo.navigateTo(string);
    await expect(searchPo.searchForm.isDisplayed(), 'Search Form is NOT displayed').to.eventually.be.true;
});

When('Search form is cleared and clicked Search', async () => {
    // clear the search form and search with blank
    await searchPo.searchField.clear();
    await searchPo.searchButton.click();
});

Then('Previous search results are cleared', async () => {
    // character results should NOT be displayed
    let noOfCharResults = await characterResultsPo.getNumberOfResults();
    if (noOfCharResults > 0) {
        await expect(characterResultsPo.characterResultSets.get(0).isDisplayed(), 'Character Results are still displayed').to.eventually.be.false;
    }
    //planet results should NOT be displayed
    let noOfPlanetResults = await planetResultsPo.getNumberOfResults();
    if (noOfPlanetResults > 0) {
        await expect(planetResultsPo.planetResultSets.get(0).isDisplayed(), 'Planet Results are still displayed').to.eventually.be.false;
    }
});

When('You switch from character to planet radio button and search', async () => {
    // select planet radio button and search
    await searchPo.planetOption.click();
    await searchPo.searchButton.click();
});

When('You switch from planet to character radio button and search', async () => {
    // select people radio button and search
    await searchPo.peopleOption.click();
    await searchPo.searchButton.click();
});


Then('Search result is displayed as Not Found', async () => {
    // character results should NOT be displayed
    let noOfCharResults = await characterResultsPo.getNumberOfResults();
    if (noOfCharResults > 0) {
        await expect(characterResultsPo.characterResultSets.get(0).isDisplayed(), 'Character Results are still displayed').to.eventually.be.false;
    }
    //planet results should NOT be displayed
    let noOfPlanetResults = await planetResultsPo.getNumberOfResults();
    if (noOfPlanetResults > 0) {
        await expect(planetResultsPo.planetResultSets.get(0).isDisplayed(), 'Planet Results are still displayed').to.eventually.be.false;
    }

    // Not found text should be displayed
    await expect(searchPo.notFoundMessage.getText(), 'Not found message is not displayed').to.eventually.equals('Not found.');
});