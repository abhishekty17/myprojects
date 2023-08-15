let topRow = document.querySelector(".top_row");
let leftCol = document.querySelector(".left_col");
let grid = document.querySelector(".grid");
let addressbar = document.querySelector(".address_bar")
// left column ke cells
for (let i = 0; i <100; i++) {
    // create a cell
    let div = document.createElement("div");
    div.setAttribute("class", "col");
    div.textContent = i+1;
    leftCol.appendChild(div);
}
// top row ke cells
for (let i = 0; i < 26; i++) {
    // create a cell
    let div = document.createElement("div");
    div.setAttribute("class", "row");
    div.textContent = String.fromCharCode(i + 65);
    topRow.appendChild(div);
}
// grid 
for (let i = 0; i <100; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "rows");
    for (let j = 0; j <26; j++) {
        let col = document.createElement("div");
        col.setAttribute("class","cell");
        col.setAttribute("rid",i);
        col.setAttribute("cid",j);
        col.setAttribute("contenteditable","true")
        col.setAttribute("spellcheck","false");
        row.appendChild(col);
        showrowcolumnnametoaddressbar(col,i,j);
    }
    grid.appendChild(row);
}
function showrowcolumnnametoaddressbar(col,i,j)
{
    col.addEventListener("click",function(){
        let rowid = i+1;
        let columnid = String.fromCharCode(65+j);
        addressbar.value = `${columnid}${rowid}`
    })
}


// default firstcell
let Allcell = document.querySelectorAll(".cell")
firstcell =Allcell[26];
firstcell.click();