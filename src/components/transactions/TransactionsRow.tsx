import { format } from 'date-fns';
import { TransactionType } from '../../shared/types';

interface TransactionRowProps {
  transaction: TransactionType;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  /* Date format is 1 Aug 2018 */
  const formattedTransactionDate = (date: string) => {
    return format(Date.parse(date), 'd MMM y');
  };

  const formattedTransactionAmount = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  return (
    <tr key={transaction.id}>
      <td style={{ textAlign: 'left' }}>{formattedTransactionDate(transaction.date)}</td>
      <td style={{ textAlign: 'right' }}>{formattedTransactionAmount(transaction.amount)}</td>
    </tr>
  );
};
