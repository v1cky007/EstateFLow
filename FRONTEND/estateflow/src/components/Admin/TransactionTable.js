// src/components/TransactionTable.js
import React from 'react';
import './TransactionTable.css'; // Add custom styles for the transaction table

const TransactionTable = ({ transactions }) => {
  return (
    <div className="transaction-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Property</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>{transaction.property}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.status}</td>
              <td>
                <button className="btn-view">View</button>
                <button className="btn-edit">Edit</button>
                <button className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
