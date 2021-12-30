import './Merchant.css';
import { useState } from 'react';
import { Img } from 'react-image';
import showMoreIconSvg from '../../../assets/show-more-icon.svg';
import showLessIconSvg from '../../../assets/show-less-icon.svg';
import cleoCoin from '../../../assets/cleo_coin.jpg';
import loaderGif from '../../../assets/loader.gif';
import { useAppDispatch } from '../../../shared/hooks';
import { MerchantType } from '../../../shared/types';
import { addBill, removeBill } from '../../../api/merchantsApi';
import { TransactionsList } from '../../transactions/TransactionsList';

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

  const showLessIcon = (
    <Img
      src={showLessIconSvg}
      alt={`Hide transactions for ${merchantName}`}
      className="transactionsToggleIcon"
    />
  );

  const showMoreIcon = (
    <Img
      src={showMoreIconSvg}
      alt={`Show transactions for ${merchantName}`}
      className="transactionsToggleIcon"
    />
  );

  const merchantLogo = (
    <Img
      src={[iconUrl, cleoCoin]}
      loader={<Img src={loaderGif} className="merchantLogo" />}
      alt={`${merchantName} logo`}
      className="merchantLogo"
    />
  );

  const merchantNameAndTransactions = (
    <div className="merchantNameAndTransactionsContainer">
      <p className="merchantName">{merchantName}</p>
      <p style={{ padding: 0, margin: 0, fontSize: '1rem' }}>{transactions.length} transactions</p>
    </div>
  );

  const removeButton = (
    <button
      className="merchantButton"
      onClick={() => handleUpdateMerchant(merchantId, 'remove')}
      disabled={!canMakeRequest}
    >
      Remove bill
    </button>
  );

  const addButton = (
    <button
      className="merchantButton"
      onClick={() => handleUpdateMerchant(merchantId, 'add')}
      disabled={!canMakeRequest}
    >
      Add as bill
    </button>
  );

  return (
    <div className="merchantAndTransactionsContainer">
      <div className="merchantContainer" onClick={() => handleToggleTransactions()}>
        {/* showTransactions render would be better as a ternary operator but this 
        (strangely) results in inconsistent rendering. For some reason this works. */}
        {showTransactions && showLessIcon}
        {!showTransactions && showMoreIcon}
        {merchantLogo}
        {merchantNameAndTransactions}
        {isBill ? removeButton : addButton}
      </div>
      {showTransactions && <TransactionsList transactions={transactions} />}
    </div>
  );
};
