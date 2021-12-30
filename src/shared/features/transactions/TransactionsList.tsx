import './Transactions.css';
import { TransactionType } from '../../common/types';
import { TransactionRow } from './TransactionsRow';

interface TransactionsProps {
  transactions: Array<TransactionType>;
}

export const TransactionsList: React.FC<TransactionsProps> = ({ transactions }) => {
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
          {transactions.map((transaction) => (
            <TransactionRow transaction={transaction} key={transaction.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
