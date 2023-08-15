let sheetDB = [];
for (let i = 0; i < 100; i++) {
    let sheetRow = [];
    for (let j = 0; j < 26; j++) {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            fontsize: "12",
            fontfamily:"monospace",
            fontcolor: "#000000",
            BGcolor: "#000000",
            alignment:"center",    
            value :"",
            formula : "",
            children: [],
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");

// Application of two-way binding
// Attach property listeners
bold.addEventListener("click", function() {
    let address = addressbar.value;
    let [cell, cellProp] = getcellandcellprop(address);
    // Modification
    cellProp.bold = !cellProp.bold; // Data change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // UI change (1)
    bold.style.backgroundColor = cellProp.bold ? "grey" : "lightgrey"; // UI change (2)
})

italic.addEventListener("click", function (e) {
    let address = addressbar.value;
    let [cell, cellProp] = getcellandcellprop(address);
    // Modification
    cellProp.italic = !cellProp.italic; // Data change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // UI change (1)
    italic.style.backgroundColor = cellProp.italic ? "grey" : "lightgrey"; // UI change (2)
})

underline.addEventListener("click", function (e) {
    let address = addressbar.value;
    let [cell, cellProp] = getcellandcellprop(address);
    // Modification
    cellProp.underline = !cellProp.underline; // Data change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // UI change (1)
    underline.style.backgroundColor = cellProp.underline ? "grey" : "lightgrey"; // UI change (2)
})

let fontsize = document.querySelector(".font-size");
    fontsize.addEventListener("change", function(){
    let address = addressbar.value;
    let [cell, cellProp] = getcellandcellprop(address);
    cellProp.fontsize = fontsize.value;
    cell.style.fontSize = cellProp.fontsize + "px";
}) 

let fontfamily = document.querySelector(".family-font");
fontfamily.addEventListener("change", function () {
    let address = addressbar.value;
    let [cell, cellProp] = getcellandcellprop(address);
    cellProp.fontfamily = fontfamily.value;
    cell.style.fontFamily = cellProp.fontfamily;
}) 

let fontcolor = document.querySelector(".fontcolor");
fontcolor.addEventListener("change", function () {
    let address = addressbar.value;
    let [cell, cellProp] = getcellandcellprop(address);
    cellProp.fontcolor = fontcolor.value;
    cell.style.color = cellProp.fontcolor;
}) 

let BGcolor = document.querySelector(".colourforbg");
BGcolor.addEventListener("change", function () {
    let address = addressbar.value;
    let [cell, cellProp] = getcellandcellprop(address);
    cellProp.BGcolor = BGcolor.value;
    cell.style.backgroundColor = cellProp.BGcolor;
}) 

let alignment = document.querySelectorAll(".alignment")
let leftalign = alignment[0];
let centeralign = alignment[1];
let rightalign = alignment[2];
alignment.forEach((alignEle)=>{
     alignEle.addEventListener("click",function(e){
         let address = addressbar.value;
         let [cell, cellProp] = getcellandcellprop(address);

         let alignval = e.target.classList[0];
         cellProp.alignment = alignval;
         cell.style.textAlign = cellProp.alignment;
         switch(alignval){
            case "left":
                leftalign.style.backgroundColor = "grey";
                centeralign.style.backgroundColor = "lightgrey";
                rightalign.style.backgroundColor = "lightgrey";
                break;
            case "center":
                leftalign.style.backgroundColor = "lightgrey";
                centeralign.style.backgroundColor = "grey";
                rightalign.style.backgroundColor = "lightgrey";
                break;
            case "right":
                leftalign.style.backgroundColor = "lightgrey";
                centeralign.style.backgroundColor = "lightgrey";
                rightalign.style.backgroundColor = "grey";
                break;
         }
     })
})

allcell = document.querySelectorAll(".cell")
{
     for(let i = 0;i<allcell.length;i++)
     {
        addcellproperties(allcell[i]);
     }
}

function addcellproperties(cell){
     cell.addEventListener("click",function(e){
          let address = addressbar.value;
          let [rid,cid] = decoderidcid(address);
          let cellProp = sheetDB[rid][cid];

//apply cell properties

        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontsize + "px";
        cell.style.fontFamily = cellProp.fontfamily;
        cell.style.color = cellProp.fontcolor;
        cell.style.backgroundColor = cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;

// Apply properties UI Props container
        bold.style.backgroundColor = cellProp.bold ? "grey" : "lightgrey";
        italic.style.backgroundColor = cellProp.italic ? "grey" : "lightgrey";  
        underline.style.backgroundColor = cellProp.underline ? "grey" : "lightgrey";
        fontcolor.value = cellProp.fontcolor;
        BGcolor.value = cellProp.BGcolor;
        fontsize.value = cellProp.fontsize;
        fontfamily.value = cellProp.fontfamily;
        switch(cellProp.alignment){
            case "left":
                leftalign.style.backgroundColor = "grey";
                centeralign.style.backgroundColor = "lightgrey";
                rightalign.style.backgroundColor = "lightgrey";
                break;
            case "center":
                leftalign.style.backgroundColor = "lightgrey";
                centeralign.style.backgroundColor = "grey";
                rightalign.style.backgroundColor = "lightgrey";
                break;
            case "right":
                leftalign.style.backgroundColor = "lightgrey";
                centeralign.style.backgroundColor = "lightgrey";
                rightalign.style.backgroundColor = "grey";
                break;
        } 
     })
}


function getcellandcellprop(address)
{
    let [rid, cid] = decoderidcid(address);
    // Access cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

function decoderidcid(address)
{
    // address -> "A1"
    let rid = Number(address.slice(1) - 1); // "1" -> 0
    let cid = Number(address.charCodeAt(0)) - 65; // "A" -> 65
    return [rid, cid];
}

