//Elements for the event listener

const form = document.getElementById("finance-form");

const langEnBtn = document.getElementById("en");
const langBrBtn = document.getElementById("br");

let currencySymbol = "US$";

//Elements for the input fields

const inputDescription = document.querySelector("#desc");
const inputAmount = document.querySelector("#amount");
const inputType = document.querySelector("#type");

//Elements for displaying the data

const displayIncomes = document.querySelector("#incomes-value");
const displayExpenses = document.querySelector("#expenses-value");  
const displayTotal = document.querySelector("#total-value");
const transactionList = document.getElementById("transaction-list");


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

    displayIncomes.textContent = `${currencySymbol} ${totalIncomes.toFixed(2)}`;
    displayExpenses.textContent = `${currencySymbol} ${totalExpenses.toFixed(2)}`;
    displayTotal.textContent = `${currencySymbol} ${total.toFixed(2)}`;

    const totalCard = document.querySelector(".total");

     if (total < 0) {
            totalCard.style.backgroundColor = "red";
        } else if (total > 0) {
            totalCard.style.backgroundColor = "green";
        } else {
            totalCard.style.backgroundColor = "black";
        };
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

    // Pegamos o idioma atual do localStorage para saber qual texto usar
    const lang = localStorage.getItem("language") || "en";
    const deleteText = lang === "pt" ? "Deletar transação" : "Delete transaction";

    li.innerHTML = `
        <span class="description">${transaction.description}</span>
        <div class="amount-container">
            <span>${currencySymbol} ${transaction.amount.toFixed(2)}</span>
            <button 
                class="delete-btn" 
                onclick="deleteTransaction(${transaction.id})"
                aria-label="${deleteText}" 
                title="${deleteText}">
                ❌
            </button>
        </div>
    `;

    transactionList.appendChild(li);
};


const deleteTransaction = (id) => {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

//Block used to store data on Local Storage

const updateLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

/*Function to switch language between English and Portuguese*/

/* 1. Função que apenas traduz e salva a preferência */
const switchLanguage = (lang) => {
    const translatableElements = document.querySelectorAll(".translatable");
    
    translatableElements.forEach(element => {
    const text = element.getAttribute(`data-${lang}`);
    if (!text) return; // Se não achou o texto no data-attribute, pula pro próximo

    if (element.tagName === "INPUT") {
        element.placeholder = text;
    } else if (element.tagName === "IMG") {
        element.alt = text;
        element.title = text;
    } else {
        element.textContent = text;
    }

    

});

    const htmlLang = lang === "pt" ? "pt-BR" : "en";
    document.documentElement.lang = htmlLang;    // Define o atributo lang do HTML

    // Define o símbolo baseado na língua
    currencySymbol = (lang === "pt") ? "R$" : "US$";
    
    // Salva a escolha
    localStorage.setItem("language", lang);
}

/* 2. Função que limpa a tela e desenha TUDO do zero */
const renderApp = () => {
    // Limpa a lista visual
    transactionList.innerHTML = "";
    
    // Desenha cada item (agora usando o símbolo novo)
    transactions.forEach(addTransactionToDom);
    
    // Atualiza os cartões de cima
    updateBalance();
}

/* 3. Função de inicialização (Roda uma vez ao abrir o site) */
const init = () => {
    // Primeiro: Descobre qual o idioma e aplica a tradução + símbolo
    const savedLanguage = localStorage.getItem("language") || "en";
    switchLanguage(savedLanguage);

    // Segundo: Desenha a tela
    renderApp();
}

/* 4. Eventos de clique nas bandeiras */
langEnBtn.addEventListener("click", () => {
    switchLanguage("en");
    renderApp(); // Após traduzir, mandamos redesenhar a tela
});

langBrBtn.addEventListener("click", () => {
    switchLanguage("pt");
    renderApp(); // Após traduzir, mandamos redesenhar a tela
});

// Inicializa tudo
init();
