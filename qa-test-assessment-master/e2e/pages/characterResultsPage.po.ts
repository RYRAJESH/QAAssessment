import { ElementArrayFinder, element,by} from "protractor";

export class characterResultsPage
{
    characterResultSets:ElementArrayFinder
    characterNames:ElementArrayFinder
    characterDetailLabels:ElementArrayFinder
    characterDetailValues:ElementArrayFinder

    constructor() {
        this.characterResultSets=element.all(by.tagName('app-character'));
        this.characterNames=element.all(by.tagName('h6'));
        this.characterDetailLabels=element.all(by.className('col-sm-2'));
        this.characterDetailValues=element.all(by.className('col-sm-10'));
    }

    async getCharacterName(i) {
        if (typeof i!=='undefined') {
            return await this.characterNames.get(i).getText(); 
        } else {
            return await this.characterNames.get(0).getText();
        }
    }
    
    async getNumberOfResults() {
        // get number of app-character cards displayed
        return await this.characterResultSets.count().then( function (count){
            return count;
            });
    }

    async getAllLabelsForCharacterDetails(index) {
        if(typeof index!=='undefined') {
            return {
                genderLabel: await this.characterDetailLabels.get(index).getText(),
                birthYearLabel: await this.characterDetailLabels.get(index+1).getText(),
                eyeColorLabel: await this.characterDetailLabels.get(index+2).getText(),
                skinColorLabel: await this.characterDetailLabels.get(index+3).getText()
            }
        } else {
            return {
                genderLabel: await this.characterDetailLabels.get(0).getText(),
                birthYearLabel: await this.characterDetailLabels.get(1).getText(),
                eyeColorLabel: await this.characterDetailLabels.get(2).getText(),
                skinColorLabel: await this.characterDetailLabels.get(3).getText()
            }
        }
    }

    async getAllValuesForCharacterDetails(index) {
        if(typeof index!=='undefined') {
            return {
                genderValue: await this.characterDetailValues.get(index).getText(),
                birthYearValue: await this.characterDetailValues.get(index+1).getText(),
                eyeColorValue: await this.characterDetailValues.get(index+2).getText(),
                skinColorValue: await this.characterDetailValues.get(index+3).getText()
            }
        } else {
            return {
                genderValue: await this.characterDetailValues.get(0).getText(),
                birthYearValue: await this.characterDetailValues.get(1).getText(),
                eyeColorValue: await this.characterDetailValues.get(2).getText(),
                skinColorValue: await this.characterDetailValues.get(3).getText()
            }
        }
    }
}