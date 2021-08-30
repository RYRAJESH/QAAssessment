import { ElementFinder, browser, protractor, element, by} from "protractor";

export class searchPage
{
    searchForm:ElementFinder
    peopleOption:ElementFinder
    planetOption:ElementFinder
    searchField:ElementFinder
    searchButton:ElementFinder
    notFoundMessage:ElementFinder

    constructor() {
        this.searchForm=element(by.tagName('app-search-form'));
        this.peopleOption=element(by.id('people'));
        this.planetOption=element(by.id('planets'));
        this.searchField=element(by.id('query'));
        this.searchButton=element(by.tagName('button'));
        this.notFoundMessage=element(by.xpath("//div[contains(text(),'Not found')]"));
    }

    async navigateTo(string) {
        return await browser.get('http://' + string + ':4200/');
    }

    async performCharacterSearch(searchString) {
        await this.searchField.sendKeys(searchString);
        await this.searchButton.click();
    }

    async performPlanetSearch(searchString) {
        await this.planetOption.click();
        await this.searchField.sendKeys(searchString);
        await this.searchButton.click();
    }

    async performCharacterSearchWithEnter(searchString) {
        await this.searchField.sendKeys(searchString);
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }

    async performPlanetSearchWithEnter(searchString) {
        await this.planetOption.click();
        await this.searchField.sendKeys(searchString);
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }

}