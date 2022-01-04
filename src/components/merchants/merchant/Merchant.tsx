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
import {
  StyledButton,
  StyledUnorderedList,
  StyledMerchant,
  StyledMerchantNameAndTransactionsCount,
  StyledToggleIcon,
} from './Merchants.styles';

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

  // TODO: Pass in a prop instead of having separate variables
  const showLessIcon = (
    <StyledToggleIcon src={showLessIconSvg} alt={`Hide transactions for ${merchantName}`} />
  );

  const showMoreIcon = (
    <StyledToggleIcon src={showMoreIconSvg} alt={`Show transactions for ${merchantName}`} />
  );

  // TODO: Figure out how to use styled components with react-image
  const merchantLogo = (
    <Img
      src={[iconUrl, cleoCoin]}
      loader={
        <Img
          src={loaderGif}
          style={{
            width: '55px',
            height: '55px',
            padding: '7px',
            marginRight: '10px',
            borderRadius: '50%',
            alignSelf: 'center',
          }}
        />
      }
      alt={`${merchantName} logo`}
      style={{
        width: '55px',
        height: '55px',
        padding: '7px',
        marginRight: '10px',
        borderRadius: '50%',
        alignSelf: 'center',
      }}
    />
  );

  const merchantNameAndTransactions = (
    <StyledMerchantNameAndTransactionsCount>
      <h2>{merchantName}</h2>
      <p>{transactions.length} transactions</p>
    </StyledMerchantNameAndTransactionsCount>
  );

  // TODO: Pass in a prop instead of having separate variables
  const removeButton = (
    <StyledButton
      onClick={() => handleUpdateMerchant('remove')}
      disabled={removeStatus === 'loading'}
      aria-label={`Remove ${merchant.name} as a bill`}
    >
      Remove bill
    </StyledButton>
  );

  const addButton = (
    <StyledButton
      onClick={() => handleUpdateMerchant('add')}
      disabled={addStatus === 'loading'}
      aria-label={`Add ${merchant.name} as a bill`}
    >
      Add as bill
    </StyledButton>
  );

  const toggleLabelText = merchant.showTransactions
    ? `Hide transactions for ${merchantName}`
    : `Show transactions for ${merchantName}`;

  return (
    <StyledUnorderedList>
      <li>
        {/* This container is clickable, to allow the user to toggle show/hide transactions.
          Used a div to enable the onKeyPress attribute, and aria attributes for screenreaders */}
        <div
          role="button"
          tabIndex={0}
          onKeyPress={handleKeyboardToggle}
          onClick={handleToggleTransactions}
          aria-label={toggleLabelText}
          aria-expanded={merchant.showTransactions}
        >
          <StyledMerchant>
            {merchantLogo}
            {merchantNameAndTransactions}
            {/* showTransactions render would be better as a ternary operator but this 
        (strangely) results in inconsistent rendering. For some reason this works. */}
            {merchant.showTransactions && showLessIcon}
            {!merchant.showTransactions && showMoreIcon}
          </StyledMerchant>
          {merchant.showTransactions && (
            <TransactionsList merchantName={merchant.name} transactions={transactions} />
          )}
        </div>
        {/* Button element feels semantially correct (as it's not linking outwards), 
          but is styled as a link to not dominate visual hierarchy when section collapsed */}
        {isBill ? removeButton : addButton}
      </li>
    </StyledUnorderedList>
  );
};
