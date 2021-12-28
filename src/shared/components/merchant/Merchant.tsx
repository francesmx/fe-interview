import { format } from 'date-fns';
import { useState } from 'react';
import { Img } from 'react-image';
import showMoreIcon from '../../../assets/show-more-icon.svg';
import showLessIcon from '../../../assets/show-less-icon.svg';
import cleoCoin from '../../../assets/cleo_coin.jpg';
import loaderGif from '../../../assets/loader.gif';
import { useAppDispatch } from '../../hooks/hooks';
import { addBill, removeBill, toggleShowTransactions } from '../merchantsList/merchantsSlice';
import { MerchantType, Transaction } from '../../types/sharedTypes';

interface MerchantProps {
  merchant: MerchantType;
}

export const Merchant: React.FC<MerchantProps> = ({ merchant }) => {
  const [updateMerchantStatus, setUpdateMerchantStatus] = useState('idle');
  const dispatch = useAppDispatch();
  const canMakeRequest = updateMerchantStatus === 'idle';

  const handleUpdateMerchant = async (merchantId: string, action: 'add' | 'remove') => {
    try {
      setUpdateMerchantStatus('pending');
      action === 'add'
        ? await dispatch(addBill(merchantId))
        : await dispatch(removeBill(merchantId));
    } catch (err) {
      console.error('Failed to update merchant: ', err);
    } finally {
      setUpdateMerchantStatus('idle');
    }
  };

  const handleToggleTransactions = (merchantId: string) => {
    dispatch(toggleShowTransactions({ id: merchantId }));
  };

  return (
    <div style={{ border: 'dashed 1px gray', marginBottom: 20, borderRadius: 10 }}>
      <div className="merchantContainer" onClick={() => handleToggleTransactions(merchant.id)}>
        {/* Show/hide icon */}
        {!merchant.showTransactions ? (
          <Img
            src={showMoreIcon}
            alt={`Show transactions for ${merchant.name}`}
            className="showTransactionsToggleIcon"
          />
        ) : (
          <Img
            src={showLessIcon}
            alt={`Hide transactions for ${merchant.name}`}
            className="showTransactionsToggleIcon"
          />
        )}
        {/* Merchant logo */}
        <Img
          src={[merchant.iconUrl, cleoCoin]}
          loader={<Img src={loaderGif} className="merchantLogo" />}
          alt={`${merchant.name} logo`}
          className="merchantLogo"
        />
        {/* Merchant name, and number of transactions */}
        <div className="merchantNameAndTransactionsContainer">
          <p className="merchantName">{merchant.name}</p>
          <p style={{ padding: 0, margin: 0, fontSize: '1rem' }}>
            {merchant.transactions.length} transactions
          </p>
        </div>
        {/* Button to add/remove as bill */}
        {merchant.isBill ? (
          <button
            className="merchantButton"
            onClick={() => handleUpdateMerchant(merchant.id, 'remove')}
            disabled={!canMakeRequest}
          >
            Remove bill
          </button>
        ) : (
          <button
            className="merchantButton"
            onClick={() => handleUpdateMerchant(merchant.id, 'add')}
            disabled={!canMakeRequest}
          >
            Add as bill
          </button>
        )}
      </div>
      {/* List of transactions */}
      {merchant.showTransactions && (
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
