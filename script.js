//Elements for the event listener

const form = document.getElementById("finance-form");

//Elements for the input fields

const inputDescription = document.querySelector("#desc");
const inputAmount = document.querySelector("#amount");
const inputType = document.querySelector("#type");

//Elements for displaying the data

const displayIncomes = document.querySelector("#incomes-value");
const displayExpenses = document.querySelector("#expenses-value");  
const displayTotal = document.querySelector("#total-value");
const transactionList = document.getElementById("transaction-list");

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
// Se o que vier do parse for nulo, ele assume o array vazio []
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


function updateBalance() {
    let totalIncomes = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
        if (transaction.type === "income") {
            totalIncomes += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }
    });

    const total = totalIncomes - totalExpenses;

    displayIncomes.textContent = `US$ ${totalIncomes.toFixed(2)}`;
    displayExpenses.textContent = `US$ ${totalExpenses.toFixed(2)}`;
    displayTotal.textContent = `US$ ${total.toFixed(2)}`;
}

form.addEventListener("submit", (event) => {
    //Prevent the form from submitting normally
    event.preventDefault();
    //Get the values from the input fields
    const description = inputDescription.value;
    const amount = inputAmount.valueAsNumber; // Convert to number
    const type = inputType.value;

    const transaction = {
        id: Math.floor(Math.random() * 1000000), //Generate a random id
        description: description,
        amount: amount,
        type: type,
    }



    //Stores data

    transactions.push(transaction);

    //Updates the amount of expenses, incomes and total balance 
    updateBalance();

    //Add transaction to the transaction history on screen

    addTransactionToDom(transaction);

    updateLocalStorage();

    //Reset the form
    form.reset();

})

const addTransactionToDom = (transaction) => {
    const li = document.createElement("li");
    li.classList.add(transaction.type === "income" ? "income-item" : "expense-item");
    li.innerHTML = `${transaction.description}: US$ ${transaction.amount.toFixed(2)}`;

    transactionList.appendChild(li);

}

//Block used to store data on Local Storage

const updateLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}


const init = () => {
    transactionList.innerHTML = "";
    transactions.forEach(addTransactionToDom);
    updateBalance();
}

init();