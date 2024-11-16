
// fetch and display expenses on page load
 fetch('http:/localhost:3000/expenses')
.then(response => response.json())
.then(expenses => {
    displayExpenses(expenses);
});

// / function to diplay expenses in the table
     function displayExpenses(expenses) {
        const expenseTable = document.getElementById('expenseList');
          expenseTable.innerHTML = '';     //   clear table expense
        
        
        expenses.forEach(expense => {
            console.log(expense._id)
            const row = expenseTable.insertRow();
            row.insertCell().textContent = expense.amount;
            row.insertCell().textContent = expense.category;
            row.insertCell().textContent = expense.description;

            const actionsCell = row.insertCell();
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('btn', 'btn-sm', 'btn-primary');
              editButton.addEventListener('click', (event) => {
                // const expenseId = event.target.parentElement.parentElement
                handleEditExpense(expense._id);
            });
            // add eventlistner for edit functionality
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
            deleteButton.addEventListener('click', (event) => {
                // const expenseId = event.target.parentElement.parentElement
                handleDeleteExpense(expense._id);
            });
            actionsCell.appendChild(deleteButton)
        });
     }

     
    //  add eventlistner for form submission
    const addExpenseForm = document.getElementById('addExpenseForm')
     addExpenseForm.addEventListener('submit',  (event) => {
        event.preventDefault();

// To get all values from client side
        const amountInput = document.getElementById('amount');
        const categoryInput = document.getElementById('category');
        const descriptionInput = document.getElementById('description');

// create expense data
        const expenseData = {
            amount: parseFloat(amountInput.value),
            category: categoryInput.value,
            description: descriptionInput.value,
        };

        console.log(expenseData)
        // Passing expense data to Server, to be saved to db
        fetch('http:/localhost:3000/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenseData)
        })
        .then(response => response.json())
        .then(newExpense => {

            // clear form field
          amountInput.value = '';
          categoryInput.value = '';
          descriptionInput.value = '';

         console.log('Expense added successfuly:', newExpense);
         alert('Expense added successfuly!');

// fetxh and display updated expenses (optional)
         fetch('http:/localhost:3000/expenses')
         .then(response = response.json())
         .then(expenses => displayExpenses(expenses));
        })
        .catch(error  =>{
            console.log('error adding expense:', error)
            alert('error adding expense, please try again')
        });
     });

// fetxh and display updated expenses (optional)
     function handleDeleteExpense(expenseId) {
        if(confirm('Are you sure you want to delete this expense?')) {
            fetch(`http:/localhost:3000/expenses/${expenseId}`, {
             method: 'DELETE'
            })
            .then(()=>{
                // remove the expense row from the table
                // fetch and display updated expense(optional)
                fetch('http:/localhost:3000/expenses')
                .then(response => response.json())
                .then(expenses => displayExpenses(expenses) )
                alert('expense deleted successfuly!');
            })
            .catch(error =>{
                console.eeror('error deleting expense',error);
                alert('error deleting expense, please try again.');
            });
        }
     }

       function handleEditExpense(expenseId) {
        if(confirm('Are you sure you want to edit this expense?')) {
            fetch(`http:/localhost:3000/expenses/${expenseId}`, {
             method: 'EDIT'
            })
            .then(()=>{
                // edit the expense row from the table
                // fetch and display updated expense(optional)
                fetch('http:/localhost:3000/expenses')
                .then(response => response.json())
                .then(expenses => displayExpenses(expenses) )
                alert('expense edited successfuly!');
            })
            .catch(error =>{
                console.eeror('error editing expense',error);
                alert('error deleting expense, please try again.');
            });
        }
     }