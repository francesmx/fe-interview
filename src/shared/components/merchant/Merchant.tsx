import './Merchant.css';
import { format } from 'date-fns';
import { useState } from 'react';
import { Img } from 'react-image';
import showMoreIcon from '../../../assets/show-more-icon.svg';
import showLessIcon from '../../../assets/show-less-icon.svg';
import cleoCoin from '../../../assets/cleo_coin.jpg';
import loaderGif from '../../../assets/loader.gif';
import { useAppDispatch } from '../../hooks/hooks';
import { MerchantType, Transaction } from '../../types/sharedTypes';
import { addBill, removeBill } from '../../api/api';

interface MerchantProps {
  merchant: MerchantType;
}

export const Merchant: React.FC<MerchantProps> = ({ merchant }) => {
  const [updateMerchantStatus, setUpdateMerchantStatus] = useState('idle');
  const [showTransactions, setShowTransactions] = useState(false);
  const dispatch = useAppDispatch();

  const { id: merchantId, name: merchantName, iconUrl, isBill, transactions } = merchant;
  const canMakeRequest = updateMerchantStatus === 'idle';

  const handleToggleTransactions = () => {
    setShowTransactions(!showTransactions);
  };

  const handleUpdateMerchant = async (merchantId: string, action: 'add' | 'remove') => {
    try {
      setUpdateMerchantStatus('pending');
      action === 'add'
        ? await dispatch(addBill(merchantId)).unwrap()
        : await dispatch(removeBill(merchantId)).unwrap();
    } catch (err) {
      console.error('Failed to update merchant: ', err);
    } finally {
      setUpdateMerchantStatus('idle');
    }
  };

  return (
    <div className="merchantAndTransactionsContainer">
      <div className="merchantContainer" onClick={() => handleToggleTransactions()}>
        {/* Show/hide icon */}
        {showTransactions && (
          <Img
            src={showLessIcon}
            alt={`Hide transactions for ${merchantName}`}
            className="transactionsToggleIcon"
          />
        )}
        {!showTransactions && (
          <Img
            src={showMoreIcon}
            alt={`Show transactions for ${merchantName}`}
            className="transactionsToggleIcon"
          />
        )}
        {/* Merchant logo */}
        <Img
          src={[iconUrl, cleoCoin]}
          loader={<Img src={loaderGif} className="merchantLogo" />}
          alt={`${merchantName} logo`}
          className="merchantLogo"
        />
        {/* Merchant name, and number of transactions */}
        <div className="merchantNameAndTransactionsContainer">
          <p className="merchantName">{merchantName}</p>
          <p style={{ padding: 0, margin: 0, fontSize: '1rem' }}>
            {transactions.length} transactions
          </p>
        </div>
        {/* Button to add/remove as bill */}
        {isBill ? (
          <button
            className="merchantButton"
            onClick={() => handleUpdateMerchant(merchantId, 'remove')}
            disabled={!canMakeRequest}
          >
            Remove bill
          </button>
        ) : (
          <button
            className="merchantButton"
            onClick={() => handleUpdateMerchant(merchantId, 'add')}
            disabled={!canMakeRequest}
          >
            Add as bill
          </button>
        )}
      </div>
      {/* List of transactions */}
      {showTransactions && (
        <div className="transactionsContainer">
          <table className="transactionsTable">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Date</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* Spread transactions array into a new copy to allow sorting by date 
                  Transactions appear in most recent order */}
              {[...merchant.transactions]
                .sort((a: Transaction, b: Transaction) => {
                  return +new Date(b.date) - +new Date(a.date);
                })
                .map((transaction) => (
                  <tr key={transaction.id}>
                    <td style={{ textAlign: 'left' }}>
                      {/* Date format is 1 Aug 2018 */}
                      {format(Date.parse(transaction.date), 'd MMM y')}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {/* GBP currency formatting */}
                      {new Intl.NumberFormat('en-GB', {
                        style: 'currency',
                        currency: 'GBP',
                      }).format(transaction.amount)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
