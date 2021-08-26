Modal = {
    open() {
        console.log("Abrir modal")
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close() {
        console.log("Fechar modal")
        document.querySelector('.modal-overlay').classList.remove('active')
    }

}

const transactions = [{
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '08/08/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '15/08/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '10/08/2021',
    },
    {
        id: 4,
        description: 'App',
        amount: 800000,
        date: '11/08/2021',
    },
]

const Transaction = {
    all: transactions,

    add(transaction) {
        this.all.push(transaction)

        App.reload()
    },

    incomes() {
        let income = 0
        this.all.forEach(transaction => {
            if(transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income
    },

    expenses() {
        let expense = 0
        this.all.forEach(transaction => {
            if(transaction.amount < 0) {
                expense += transaction.amount;
            }
        })
        return expense
    },

    total() {
        return this.incomes() + this.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    
    innerHTMLTransaction(transactions) {   
        const CSSclass = transactions.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transactions.amount)
        
        const html = `
            <tr>
                <td class="description">${transactions.description}</td>
                <td class="${CSSclass}">${amount}</td>
                <td class="date">${transactions.date}</td>
                <td><img src="./assets/minus.svg" alt="Remover transação"></td>
            </tr>
        `
        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

const App = {
    init() {

        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
    
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    }
}

App.init()

Transaction.add({
    id: 39,
    description: 'Uber',
    amount: -1800,
    date: '18/08/2021'
})
