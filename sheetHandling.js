let sheetsFolderCont = document.querySelector(".sheets-folder-cont");
let addSheetBtn = document.querySelector(".sheet-add-icon");

addSheetBtn.addEventListener("click", (e) => {
    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder");

    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFolders.length);

    sheet.innerHTML = `
        <div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>
    `;
    sheetsFolderCont.appendChild(sheet);
    sheet.scrollIntoView()

    createDB()
    createGraphcomponentMatrix()
    handleSheetActiveness(sheet)
    handleSheetRemoval(sheet)
    sheet.click()
})

function handleSheetUIRemoval(sheet) {
    sheet.remove()
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for (let i = 0; i < allSheetFolders.length; i++) {
        allSheetFolders[i].setAttribute("id", i)
        let sheetContent = allSheetFolders[i].querySelector(".sheet-content")
        sheetContent.innerText = `Sheet ${i + 1}`
        allSheetFolders[i].style.backgroundColor = "transparent"
    }
    allSheetFolders[0].style.backgroundColor = "#dedede"
}

function handleSheetRemoval(sheet) {
    sheet.addEventListener('mousedown', (e) => {
        // 0=>left    1=>scrollbar   2=>right
        if (e.button !== 2) return

        let allSheetFolders = document.querySelectorAll(".sheet-folder");
        if (allSheetFolders.length === 1) {
            alert("You need to have atleast one sheet")
            return
        }

        let response = confirm("Your sheet will be removed permanently, Are you sure ?")
        if (response === false) return
        let sheetIdx = Number(sheet.getAttribute("id"))

        // DB
        collectedSheetDB.splice(sheetIdx, 1)
        collectedGraphComponentMatrix.splice(sheetIdx, 1)
        // UI
        handleSheetUIRemoval(sheet)

        // after delete any sheet navigate to the first sheet

        sheetDB = collectedSheetDB[0]
        graphComponentMatrix = collectedGraphComponentMatrix[0]
        handleSheetProperties()

    })
}

function handleSheetUI(sheet) {
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for (let i = 0; i < allSheetFolders.length; i++) {
        allSheetFolders[i].style.backgroundColor = "transparent"
    }
    sheet.style.backgroundColor = "#dedede"
}

function handleSheetProperties() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`)
            cell.click()
        }
    }
    // by default click on first cell
    let firstCell = document.querySelector(".cell")

    // Clicked by DOM 
    firstCell.click()
    console.log(firstCell)
}

function handleSheetDB(sheetIdx) {
    sheetDB = collectedSheetDB[sheetIdx]
    graphComponentMatrix = collectedGraphComponentMatrix[sheetIdx]
}

function handleSheetActiveness(sheet) {
    sheet.addEventListener("click", (e) => {
        let sheetIdx = Number(sheet.getAttribute("id"))
        handleSheetDB(sheetIdx)
        handleSheetProperties()
        handleSheetUI(sheet)
    })
}

function createDB() {
    let sheetDB = []
    for (let i = 0; i < rows; i++) {
        let sheetRow = []
        for (let j = 0; j < cols; j++) {
            let cellProp = {
                bold: false,
                italic: false,
                underline: false,
                alignment: "left",
                fontFamily: "poppins",
                fontSize: 14,
                fontColor: "#000000",
                BGcolor: "transparent",
                value: '',
                formula: '',
                children: []
            }
            sheetRow.push(cellProp)
        }
        sheetDB.push(sheetRow)
    }
    collectedSheetDB.push(sheetDB)
}

function createGraphcomponentMatrix() {
    let graphComponentMatrix = []
    for (let i = 0; i < rows; i++) {
        let row = []
        for (let j = 0; j < cols; j++) {
            // why array => more than one dependency can be present
            row.push([])
        }
        graphComponentMatrix.push(row)
    }
    collectedGraphComponentMatrix.push(graphComponentMatrix)
}