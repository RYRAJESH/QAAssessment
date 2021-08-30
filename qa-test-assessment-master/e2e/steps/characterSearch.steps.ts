import { When, Then } from 'cucumber';
import { searchPage } from "../pages/searchPage.po";
import { characterResultsPage } from "../pages/characterResultsPage.po";
import characterData from "../testData/characterData"
import { setDefaultTimeout } from "cucumber";

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

setDefaultTimeout(25 * 1000);

let searchPo = new searchPage();
let characterResultsPo = new characterResultsPage();

When(/^You search for character "(.*?)"$/, async (searchString) => {
    // search with the character name provided in feature file
    await searchPo.performCharacterSearch(searchString);
});

When(/^You search for character "(.*?)" with Enter key$/, async (searchString) => {
    // search with the planet name provided in feature file using Enter key
    await searchPo.performCharacterSearchWithEnter(searchString);
});

Then(/^Character details for "(.*?)" are displayed$/, async (string) => {
    // verify that at least one character result is displayed
    await expect(characterResultsPo.characterResultSets.get(0).isDisplayed(), 'Character results are NOT displayed').to.eventually.be.true;
    
    // verify that name in results is correct as per test data
    await expect(await characterResultsPo.getCharacterName(0), 'Character Name in result is incorrect').to.equals(characterData.CharacterData[string]["Name:"]);
    
    // checking that the label names for Character Result displayed are correct as per test data
    let allLabels = await characterResultsPo.getAllLabelsForCharacterDetails(0);
    await expect(allLabels.genderLabel, 'Gender label name in result is incorrect').to.equals(Object.keys(characterData.CharacterData[string])[1]);
    await expect(allLabels.birthYearLabel, 'Birth year label name in result is incorrect').to.equals(Object.keys(characterData.CharacterData[string])[2]);
    await expect(allLabels.eyeColorLabel, 'Eye color label name in result is incorrect').to.equals(Object.keys(characterData.CharacterData[string])[3]);
    await expect(allLabels.skinColorLabel, 'Skin color label name in result is incorrect').to.equals(Object.keys(characterData.CharacterData[string])[4]);

    // checking that the values for Character Result displayed are correct as per test data
    let allValues = await characterResultsPo.getAllValuesForCharacterDetails(0);
    await expect(allValues.genderValue, 'Gender value in result is incorrect').to.equals(characterData.CharacterData[string]["Gender:"]);
    await expect(allValues.birthYearValue, 'Birth year value in result is incorrect').to.equals(characterData.CharacterData[string]["Birth year:"]);
    await expect(allValues.eyeColorValue, 'Eye color value in result is incorrect').to.equals(characterData.CharacterData[string]["Eye color:"]);
    await expect(allValues.skinColorValue, 'Skin color value in result is incorrect').to.equals(characterData.CharacterData[string]["Skin color:"]);
});

Then(/^Multiple Character results for "(.*?)" are displayed$/, async (string) => {
    // first verify that at least one character result is displayed
    await expect(characterResultsPo.characterResultSets.get(0).isDisplayed(), 'Character results are NOT displayed').to.eventually.be.true;
    
    // get count of character results displayed and verify it is greater than 0
    var noOfResults = await characterResultsPo.getNumberOfResults();
    await expect(noOfResults, 'Multiple results are not displayed').to.be.gt(0);
    
    // create regular expression of the character name and verify it matches with all results
    var nameRegExp = new RegExp(string, 'i');
    for (let i=0;i<noOfResults;i++) {
        // verify that name in all results matches with what is queried
        await expect(await characterResultsPo.getCharacterName(i), 'Name in result is not matching the searched name').to.match(nameRegExp);
    }
});