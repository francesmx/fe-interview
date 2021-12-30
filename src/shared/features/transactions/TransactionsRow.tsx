import { format } from 'date-fns';
import { TransactionType } from '../../common/types';

interface TransactionRowProps {
  transaction: TransactionType;
}

/* Date format is 1 Aug 2018 */
const formattedTransactionDate = (date: string) => {
  return format(Date.parse(date), 'd MMM y');
};

/* GBP currency formatting */
const formattedTransactionAmount = (amount: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
};

export const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  return (
    <tr key={transaction.id}>
      <td style={{ textAlign: 'left' }}>{formattedTransactionDate(transaction.date)}</td>
      <td style={{ textAlign: 'right' }}>{formattedTransactionAmount(transaction.amount)}</td>
    </tr>
  );
};
