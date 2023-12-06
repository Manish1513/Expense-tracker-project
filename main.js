document.addEventListener('DOMContentLoaded', function () {
    displayExpenses();
});

function addExpense() {
    const description = document.getElementById('expenseDescription').value;
    const amount = document.getElementById('expenseAmount').value;

    if (description && amount) {
        const expense = {
            id: new Date().getTime(),
            description: description,
            amount: parseFloat(amount),
        };

        saveExpense(expense);
        displayExpenses();

        // Clear input fields
        document.getElementById('expenseDescription').value = '';
        document.getElementById('expenseAmount').value = '';
    }
}

function saveExpense(expense) {
    let expenses = getExpenses();
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function getExpenses() {
    return JSON.parse(localStorage.getItem('expenses')) || [];
}

function deleteExpense(id) {
    let expenses = getExpenses();
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

function displayExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    const expenses = getExpenses();

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.description}: Rs ${expense.amount.toFixed(2)}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteExpense(expense.id));

        li.appendChild(deleteButton);
        expenseList.appendChild(li);
    });
}