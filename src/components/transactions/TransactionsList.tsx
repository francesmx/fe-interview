import './Transactions.css';
import { TransactionType } from '../../shared/types';
import { TransactionRow } from './TransactionsRow';

interface TransactionsProps {
  transactions: Array<TransactionType>;
}

export const TransactionsList: React.FC<TransactionsProps> = ({ transactions }) => {
  /* Spread transactions array into a new copy to allow sorting by most recent order  */
  const sortedTransactions = [...transactions].sort((a: TransactionType, b: TransactionType) => {
    return +new Date(b.date) - +new Date(a.date);
  });

  return (
    <div className="transactionsContainer">
      <table className="transactionsTable">
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Date</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <TransactionRow transaction={transaction} key={transaction.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
