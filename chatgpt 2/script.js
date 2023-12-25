const tableBody = document.querySelector('tbody');
const addRowButton = document.getElementById('add-row');
let serialNumber = 1;

addRowButton.addEventListener('click', addRow);

function addRow() {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${serialNumber}</td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <button class="save-btn">Save</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    tableBody.appendChild(newRow);

    const saveBtn = newRow.querySelector('.save-btn');
    saveBtn.addEventListener('click', calculateAndSave);

    const deleteBtn = newRow.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', deleteRow);

    serialNumber++;
    updateSerialNumbers();
}

function calculateAndSave(event) {
    const row = event.target.parentElement.parentElement;
    const salaryAmount = parseInt(row.children[5].textContent);
    const workingDays = parseInt(row.children[6].textContent);
    const absentDays = parseInt(row.children[7].textContent);
    const penaltyDeductions = parseInt(row.children[9].textContent);
    const advanceDeductions = parseInt(row.children[8].textContent);

    const absentDaysDeductions = (salaryAmount / workingDays) * absentDays;
    const totalDeductions = penaltyDeductions + advanceDeductions + absentDaysDeductions;
    const salaryToBePaid = salaryAmount - totalDeductions;

    row.children[10].textContent = absentDaysDeductions.toFixed(2);
    row.children[12].textContent = salaryToBePaid.toFixed(2);
    row.children[11].textContent = totalDeductions.toFixed(2);

    event.target.textContent = 'Edit';
    event.target.removeEventListener('click', calculateAndSave);
    event.target.addEventListener('click', editRow);

}

function updateSerialNumbers() {
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach((row, index) => {
        const serialCell = row.querySelector('td:first-child');
        serialCell.textContent = index + 1;
    });
}

function editRow(event) {
    const row = event.target.parentElement.parentElement;
    const cells = row.children;
    for (let i = 0; i < cells.length - 1; i++) {
        cells[i].setAttribute('contenteditable', 'true');
    }
    event.target.textContent = 'Save';
    event.target.removeEventListener('click', editRow);
    event.target.addEventListener('click', saveEditedRow);
}

function saveEditedRow(event) {
    const row = event.target.parentElement.parentElement;
    const cells = row.children;
    for (let i = 0; i < cells.length - 1; i++) {
        cells[i].setAttribute('contenteditable', 'false');
    }
    calculateAndSave(event);
    event.target.textContent = 'Edit';
    event.target.removeEventListener('click', saveEditedRow);
    event.target.addEventListener('click', editRow);
}

function deleteRow(event) {
    const row = event.target.parentElement.parentElement;
    row.remove();
    updateSerialNumbers();
}