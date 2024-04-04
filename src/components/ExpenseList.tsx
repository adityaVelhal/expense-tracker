import React from 'react';
import Expense from './../models/Expense';

interface Props {
    expeses: Expense[];
    onDelete: (id: number) => void;
}

const ExpenseList = ({ expeses, onDelete }: Props) => {
    return (
        <table className="mt-3" border={1} cellPadding="15px">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {expeses.map((expense) => (
                    <tr key={expense.id}>
                        <td>{expense.id}</td>
                        <td>{expense.description}</td>
                        <td>&#8377;{expense.amount}</td>
                        <td>{expense.category}</td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => onDelete(expense.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td colSpan={2}>Total</td>
                    <td>&#8377;{expeses.reduce((s, c) => s+c.amount, 0)}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default ExpenseList;
