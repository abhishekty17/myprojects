for(let i = 0;i<100;i++)
{
    for(let j = 0;j<26;j++)
    {
        cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur",function(e){
            let address = addressbar.value;
            let [activecell, cellProp] = getcellandcellprop(address);
            let enterdata = activecell.innerText;
            cellProp.value = enterdata 
        })
    }
} 

let formulabar = document.querySelector(".formula_bar")
formulabar.addEventListener("keydown",function(e){
     let inputformula = formulabar.value;
     if(e.key=== "Enter" && inputformula)
     {   
        let evaluatedval = getevaluatedval(inputformula);
        let address = addressbar.value;
        let [cell,cellProp] = getcellandcellprop(address);
        if(inputformula!=cellProp.formula) removeChildFromParent(cellProp.formula)
        setvaluetocell(evaluatedval,inputformula)
        addChildToParent(inputformula);
        console.log(sheetDB);
     }
})

function addChildToParent(formula)
{
    let childAddress = addressbar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let ifChar = encodedFormula[i].charCodeAt(0);
        if (ifChar >= 65 && ifChar <= 90) {
            let [parentcell, parentcellProp] = getcellandcellprop(encodedFormula[i]);
            parentcellProp.children.push(childAddress);
        }
    }
}

function removeChildFromParent(formula)
{
    let childAddress = addressbar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let ifChar = encodedFormula[i].charCodeAt(0);
        if (ifChar >= 65 && ifChar <= 90) {
            let [parentcell, parentcellProp] = getcellandcellprop(encodedFormula[i]);
            let idx =  parentcellProp.children.indexOf(childAddress);
            parentcellProp.children.splice(idx,1);
        }
    }
}

function getevaluatedval(formula)
{
    let encodedFormula = formula.split(" ");
    for(let i = 0;i<encodedFormula.length;i++)
    {
        let ifChar = encodedFormula[i].charCodeAt(0);
        if(ifChar>=65 && ifChar<=90)
        {
            let [cell, cellProp] = getcellandcellprop(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decordFormula = encodedFormula.join(" ");
    return eval(decordFormula);
}

function setvaluetocell(evaluatedval,formula){
    let address = addressbar.value;
    let [cell, cellProp] = getcellandcellprop(address);
    cell.innerText = evaluatedval;
    cellProp.value = evaluatedval;
    cellProp.formula = formula;
}

