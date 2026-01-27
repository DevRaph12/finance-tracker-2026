// 1. Global Selectors
const form = document.getElementById("finance-form");
const langEnBtn = document.getElementById("en");
const langBrBtn = document.getElementById("br");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;

const inputDescription = document.querySelector("#desc");
const inputAmount = document.querySelector("#amount");
const inputType = document.querySelector("#type");

const displayIncomes = document.querySelector("#incomes-value");
const displayExpenses = document.querySelector("#expenses-value");  
const displayTotal = document.querySelector("#total-value");
const transactionList = document.getElementById("transaction-list");

// 2. Application State
let currencySymbol = "US$";
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const savedTheme = localStorage.getItem('theme'); 
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

// 3. Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// 4. Financial Calculations
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

    displayIncomes.textContent = `${currencySymbol} ${totalIncomes.toFixed(2)}`;
    displayExpenses.textContent = `${currencySymbol} ${totalExpenses.toFixed(2)}`;
    displayTotal.textContent = `${currencySymbol} ${total.toFixed(2)}`;

    const totalCard = document.querySelector(".total");
    if (total < 0) {
        totalCard.style.backgroundColor = "var(--expense-color)";
    } else if (total > 0) {
        totalCard.style.backgroundColor = "var(--income-color)";
    } else {
        totalCard.style.backgroundColor = "var(--primary-color)";
    }
}

// 5. Transaction Management list
const addTransactionToDom = (transaction) => {
    const li = document.createElement("li");
    li.classList.add(transaction.type === "income" ? "income-item" : "expense-item");

    // takes the language from localStorage to set the delete button text
    const lang = localStorage.getItem("language") || "en";
    const deleteText = lang === "pt" ? "Deletar" : "Delete";

    li.innerHTML = `
        <span class="description">${transaction.description}</span>
        <div class="amount-container">
            <span>${currencySymbol} ${transaction.amount.toFixed(2)}</span>
            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})" title="${deleteText}">❌</button>
        </div>
    `;
    transactionList.appendChild(li);
};


const deleteTransaction = (id) => {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    renderApp();
};

const updateLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
};

// 6. Form
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const description = inputDescription.value;
    const amount = inputAmount.valueAsNumber;
    const type = inputType.value;

    if (!description || isNaN(amount)) return;

    const transaction = {
        id: Math.floor(Math.random() * 1000000),
        description,
        amount,
        type
    };

    transactions.push(transaction);
    updateBalance();
    addTransactionToDom(transaction);
    updateLocalStorage();
    form.reset();
});

// 7. Render and Language Switch

const switchLanguage = (lang) => {
    const translatableElements = document.querySelectorAll(".translatable");
    
    translatableElements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        
        if (text) {
            //translate text content or placeholder
            if (element.tagName === "INPUT") {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }

            //if element has title attribute, translate it too
            if (element.hasAttribute('title')) {
                element.setAttribute('title', text);
            }
            
            // if the element is inside a button, translate the button's title attribute too
            const parentButton = element.closest('button');
            if (parentButton && parentButton.hasAttribute('title')) {
                parentButton.setAttribute('title', text);
            }
        }
    });

    // updates global settings
    document.documentElement.lang = (lang === "pt") ? "pt-BR" : "en";
    currencySymbol = (lang === "pt") ? "R$" : "US$";
    localStorage.setItem("language", lang);
};



const renderApp = () => {
    transactionList.innerHTML = "";
    transactions.forEach(addTransactionToDom);
    updateBalance();
};

const init = () => {
    const savedLanguage = localStorage.getItem("language") || "en";
    switchLanguage(savedLanguage);
    renderApp();
};

// 8. Events and Initialization language
langEnBtn.addEventListener("click", () => {
    switchLanguage("en");
    renderApp();
});

langBrBtn.addEventListener("click", () => {
    switchLanguage("pt");
    renderApp();
});

init();
