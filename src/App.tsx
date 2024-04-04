import { useState } from 'react';
import Form from './components/Form';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseList from './components/ExpenseList';


function App() {
    const [category, setCategory] = useState('');

    const [expenses, setExpenses] = useState([
        { id: 1, description: 'Milk', amount: 100, category: 'Groceries' },
        { id: 2, description: 'TV', amount: 100, category: 'Entertainment' },
        { id: 3, description: 'Electricity', amount: 100, category: 'Utilities' },
    ]);

    const visibleList = category
        ? expenses.filter((e) => e.category === category)
        : expenses;

    return (
        <div>
            <Form onSubmit={e => setExpenses([...expenses, {...e, id: expenses.length + 1}])}/>
            <ExpenseFilter
                onSelectChange={setCategory}
            />
            <ExpenseList
                expeses={visibleList}
                onDelete={(id) =>
                    setExpenses(expenses.filter((expense) => expense.id !== id))
                }
            />
        </div>
    );
}

export default App;
