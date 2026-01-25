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

const transactions = [];

const updateBalance = () => {
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
};

form.addEventListener("submit", (event) => {
    //Prevent the form from submitting normally
    event.preventDefault();
    //Get the values from the input fields
    const description = inputDescription.value;
    const amount = inputAmount.valueAsNumber; // Convert to number
    const type = inputType.value;

    const transaction = {
        description: description,
        amount: amount,
        type: type,
    }

    transactions.push(transaction);

    updateBalance();

    console.log(transactions);

    //Reset the form
    form.reset();

})