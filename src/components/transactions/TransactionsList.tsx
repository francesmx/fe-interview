import { TransactionType } from '../../shared/types';
import { StyledTransactionsContainer, StyleTransactionsTable } from './Transactions.styles';
import { TransactionRow } from './TransactionsRow';

interface TransactionsProps {
  merchantName: string;
  transactions: Array<TransactionType>;
}

export const TransactionsList: React.FC<TransactionsProps> = ({ merchantName, transactions }) => {
  /* Spread transactions array into a new copy to allow sorting by most recent order  */
  const sortedTransactions = [...transactions].sort((a: TransactionType, b: TransactionType) => {
    return +new Date(b.date) - +new Date(a.date);
  });

  return (
    <StyledTransactionsContainer>
      <StyleTransactionsTable aria-label={`Transactions for ${merchantName}`}>
        <thead className="screenreader-only">
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
      </StyleTransactionsTable>
    </StyledTransactionsContainer>
  );
};
