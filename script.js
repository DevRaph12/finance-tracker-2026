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

form.addEventListener("submit", (event) => {
    //Prevent the form from submitting normally
    event.preventDefault();
    //Get the values from the input fields
    const description = inputDescription.value;
    const amount = inputAmount.valueAsNumber;
    const type = inputType.value;

    const transaction = {
        description: description,
        amount: amount,
        type: type,
    }

})