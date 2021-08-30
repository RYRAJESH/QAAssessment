import { ElementArrayFinder, element,by} from "protractor";

export class planetResultsPage
{
    planetResultSets:ElementArrayFinder
    planetNames:ElementArrayFinder
    planetDetailLabels:ElementArrayFinder
    planetDetailValues:ElementArrayFinder

    constructor() {
        this.planetResultSets=element.all(by.tagName('app-planet'));
        this.planetNames=element.all(by.tagName('h6'));
        this.planetDetailLabels=element.all(by.className('col-sm-2'));
        this.planetDetailValues=element.all(by.className('col-sm-10'));
    }

    async getPlanetName(i) {
        if (typeof i!=='undefined') {
            return await this.planetNames.get(i).getText(); 
        } else {
            return await this.planetNames.get(0).getText();
        }
    }
    
    async getNumberOfResults() {
        // get number of app-character cards displayed
        return await this.planetResultSets.count().then( function (count){
            return count;
            });
    }

    async getAllLabelsForPlanetDetails(index) {
        if(typeof index!=='undefined') {
            return {
                populationLabel: await this.planetDetailLabels.get(index).getText(),
                climateLabel: await this.planetDetailLabels.get(index+1).getText(),
                gravityLabel: await this.planetDetailLabels.get(index+2).getText()
            }
        } else {
            return {
                populationLabel: await this.planetDetailLabels.get(0).getText(),
                climateLabel: await this.planetDetailLabels.get(1).getText(),
                gravityLabel: await this.planetDetailLabels.get(2).getText()
            }
        }
    }

    async getAllValuesForPlanetDetails(index) {
        if(typeof index!=='undefined') {
            return {
                populationValue: await this.planetDetailValues.get(index).getText(),
                climateValue: await this.planetDetailValues.get(index+1).getText(),
                gravityValue: await this.planetDetailValues.get(index+2).getText()
            }
        } else {
            return {
                populationValue: await this.planetDetailValues.get(0).getText(),
                climateValue: await this.planetDetailValues.get(1).getText(),
                gravityValue: await this.planetDetailValues.get(2).getText()
            }
        }
    }   
}