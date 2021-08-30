# QA Engineer Assessment Solution

## Introduction
Name: Rajesh Yadav
IT Professional with 6.5 years of experience in Software Testing, Functional Testing, Test Automation, Software Quality Engineering and DevOps. Having knowledge and experience in defining and executing Test strategies, Defect Management, Test frameworks, Test automation, DevOps, Continuous testing, BDD & Agile testing in various projects. Testing of different applications like Web Applications, Microservices, Salesforce, Mainframes, Desktop Applications and PeopleSoft Applications.

## Environment Used
* **NodeJS 10**
* Chrome browser
* IDE- VS Code
* Protractor-Cucumber-Framework
* Cucumber-html-reporter

## Feature Files
* Folder features contains 3 feature files which depict different scenarios based on character search, planet search and some more additional flows mix of character and planet.
* Features files are data driven.
* Input data for scenarios are provided in respective Examples section in feature files.

## Pages
* pages folder consists of 3 ts files which store page objects for different section of pages. To bring in more clarity, we have divided it into 3 different ts classes. 
* Along with page objects, I have also defined few functions to manipulate these objects and use it during execution.

## Step Definition
* There are 3 step definition ts files which implement the steps of each scenario of each respective feature files.
* step deifinition methods are using functions, objects and data from other files such as feature, pages and data files.
* Validation for each scenario has been taken care using chai libraries.

## Test Data
* Test data has been stored in characterData.ts and planetData.ts files.

## Reports
* Cucumber html reports are generated in the end after execution is completed.

## Remarks 
* To run please use either of below commands:
* ng e2e
* npm run e2e

...
