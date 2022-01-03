import './Merchant.css';
import { KeyboardEvent } from 'react';
import { Img } from 'react-image';
import showMoreIconSvg from '../../../assets/show-more-icon.svg';
import showLessIconSvg from '../../../assets/show-less-icon.svg';
import cleoCoin from '../../../assets/cleo_coin.jpg';
import loaderGif from '../../../assets/loader.gif';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { MerchantType } from '../../../shared/types';
import { addBill, removeBill } from '../merchantsThunks';
import { TransactionsList } from '../../transactions/TransactionsList';
import { addBillStatus, removeBillStatus, toggleShowTransactions } from '../merchantsSlice';

interface MerchantProps {
  merchant: MerchantType;
}

export const Merchant: React.FC<MerchantProps> = ({ merchant }) => {
  const addStatus = useAppSelector(addBillStatus);
  const removeStatus = useAppSelector(removeBillStatus);
  const dispatch = useAppDispatch();

  const { id: merchantId, name: merchantName, iconUrl, isBill, transactions } = merchant;

  const handleToggleTransactions = () => {
    dispatch(toggleShowTransactions({ id: merchantId }));
  };

  const handleKeyboardToggle = (event: KeyboardEvent<HTMLImageElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleToggleTransactions();
    }
  };

  const handleUpdateMerchant = async (action: 'add' | 'remove') => {
    try {
      action === 'add'
        ? await dispatch(addBill(merchantId)).unwrap()
        : await dispatch(removeBill(merchantId)).unwrap();
    } catch (err) {
      console.error('Failed to update merchant: ', err);
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
    <div className="merchantNameAndTransactions">
      <h2 className="merchantName">{merchantName}</h2>
      <p style={{ padding: 0, margin: 0, fontSize: '1rem' }}>{transactions.length} transactions</p>
    </div>
  );

  const removeButton = (
    <button
      className="merchantButton"
      onClick={() => handleUpdateMerchant('remove')}
      disabled={removeStatus === 'loading'}
      aria-label={`Remove ${merchant.name} as a bill`}
    >
      Remove bill
    </button>
  );

  const addButton = (
    <button
      className="merchantButton"
      onClick={() => handleUpdateMerchant('add')}
      disabled={addStatus === 'loading'}
      aria-label={`Add ${merchant.name} as a bill`}
    >
      Add as bill
    </button>
  );

  const toggleLabelText = merchant.showTransactions
    ? `Hide transactions for ${merchantName}`
    : `Show transactions for ${merchantName}`;

  return (
    <ul className="listContainer">
      <li>
        {/* This container is clickable, to allow the user to toggle show/hide transactions.
          Used a div to enable the onKeyPress attribute, and aria attributes for screenreaders */}
        <div
          className="merchantAndTransactionsContainer"
          role="button"
          tabIndex={0}
          onKeyPress={handleKeyboardToggle}
          onClick={handleToggleTransactions}
          aria-label={toggleLabelText}
          aria-expanded={merchant.showTransactions}
        >
          <div className="merchantContainer">
            {merchantLogo}
            {merchantNameAndTransactions}
            {/* showTransactions render would be better as a ternary operator but this 
        (strangely) results in inconsistent rendering. For some reason this works. */}
            {merchant.showTransactions && showLessIcon}
            {!merchant.showTransactions && showMoreIcon}
          </div>
          {merchant.showTransactions && (
            <TransactionsList merchantName={merchant.name} transactions={transactions} />
          )}
        </div>
        {/* Button element feels semantially correct (as it's not linking outwards), 
          but is styled as a link to not dominate visual hierarchy when section collapsed */}
        {isBill ? removeButton : addButton}
      </li>
    </ul>
  );
};
