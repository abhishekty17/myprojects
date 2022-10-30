// npm i puppeteer
 let { answer } = require("./codes");
 const puppeteer = require("puppeteer")
 email = "";
 password = "";
 let cTab;
 let browseropen = puppeteer.launch({
    headless : false,
    defaultViewport:null
 });
 browseropen.then(function(browser){
     console.log("browser is open");
     let allTabsPromises = browser.pages();
     return allTabsPromises;
 })
 .then(function(allTabArr){
    cTab =  allTabArr[0];
    console.log("new tab");
    let visitingLoginPage = cTab.goto("https://www.hackerrank.com/auth/login");
    return visitingLoginPage;
 }) 
 .then(function(){
    console.log("page visited");
    let emailWillBeTypesPromise = cTab.type("input[name='username']",email);
    return emailWillBeTypesPromise;
 })
 .then(function(){
    console.log("email has been typed");
    let passwordWillBeTyped = cTab.type("input[type='password']",password);
    return passwordWillBeTyped;
 })
 .then(function(){
    console.log("password has been typed");
    let willBeLoggedIn = cTab.click(".form-item .ui-text");
    return willBeLoggedIn;
 })
 .then(function(){
    console.log("logged in");
    let willClickAlgorithnPromise = waitAndClick("div[data-automation='algorithms']");
    return willClickAlgorithnPromise;
 })
 .then(function(){
    console.log("alorithm button has been clicked");
    let allQuestionPromise = cTab.waitForSelector("a[data-analytics = 'ChallengeListChallengeName']");
    return allQuestionPromise;
 })
 .then(function(){
     function getAllLink()
     {
         let allLinkArr = document.querySelectorAll("a[data-analytics = 'ChallengeListChallengeName']")
         let linkArr = [];
         for(let i = 0;i<allLinkArr.length;i++)
         {
             linkArr.push(allLinkArr[i].getAttribute("href"));
         }
         return linkArr;
     }
     let linksArrPromise = cTab.evaluate(getAllLink);
     return linksArrPromise;
 })
 .then(function(linksArr){
     console.log("all link recieved");
   //  console.log(linksArr);
     let questionWillbeSolvedPromise = questionSolver(linksArr[0],0);
     for(let i = 1;i<linksArr.length;i++)
     {
          questionWillBeSolvedPromise = questionWillBeSolvedPromise.then(function () {
                   return questionSolver(linksArr[i], i); })
     }
     return questionWillbeSolvedPromise;
 })
 .then(function () {
   console.log("question is solved");
 })
 
 .catch(function(err){
    console.log("error");
 })

 function waitAndClick(algobttn){
    let waitClickPromise = new Promise(function(resolve, reject){
        let waitForSelectorPromise = cTab.waitForSelector(algobttn);
        waitForSelectorPromise.then(function () {
          console.log("algo btn is found");
          let clickPromise = cTab.click(algobttn);
          return clickPromise;
          })
          .then(function () {
            console.log("algo btn is clicked");
            resolve();
          })
          .catch(function (err) {
            reject(err);
          })
    });
    return waitClickPromise;
 }

 function questionSolver(url, idx) {
   return new Promise(function (resolve, reject) {
     let fullLink = `https://www.hackerrank.com${url}`;
     let goToQuesPagePromise = cTab.goto(fullLink);
     goToQuesPagePromise
       .then(function () {
         console.log("question opened");
         //tick the custom input box mark
         let waitForCheckBoxAndClickPromise = waitAndClick(".checkbox-input");
         return waitForCheckBoxAndClickPromise;
       })
       .then(function () {
         //select the box where code will be typed
         let waitForTextBoxPromise = cTab.waitForSelector(".custominput");
         return waitForTextBoxPromise;
       })
       .then(function () {
         let codeWillBeTypedPromise = cTab.type(".custominput", answer[idx], {
           delay: 100,
         });
         return codeWillBeTypedPromise;
       })
       .then(function () {
         //control key is pressed promise
         let controlPressedPromise = cTab.keyboard.down("Control");
         return controlPressedPromise;
       })
       .then(function () {
         let aKeyPressedPromise = cTab.keyboard.press("a");
         return aKeyPressedPromise;
       })
       .then(function () {
         let xKeyPressedPromise = cTab.keyboard.press("x");
         return xKeyPressedPromise;
       })
       .then(function () {
         let ctrlIsReleasedPromise = cTab.keyboard.up("Control");
         return ctrlIsReleasedPromise;
       })
       .then(function () {
         //select the editor promise
         let cursorOnEditorPromise = cTab.click(
           ".monaco-editor.no-user-select.vs"
         );
         return cursorOnEditorPromise;
       })
       .then(function () {
         //control key is pressed promise
         let controlPressedPromise = cTab.keyboard.down("Control");
         return controlPressedPromise;
       })
       .then(function () {
         let aKeyPressedPromise = cTab.keyboard.press("A");
         return aKeyPressedPromise;
       })
       .then(function () {
         let vKeyPressedPromise = cTab.keyboard.press("V");
         return vKeyPressedPromise;
       })
       .then(function () {
         let controlDownPromise = cTab.keyboard.up("Control");
         return controlDownPromise;
       })
       .then(function () {
         let submitButtonClickedPromise = cTab.click(".hr-monaco-submit");
         return submitButtonClickedPromise;
       })
       .then(function () {
         console.log("code submitted successfully");
         resolve();
       })
       .catch(function (err) {
         reject(err);
       });
   });
 }
