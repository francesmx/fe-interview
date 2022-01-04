import { KeyboardEvent } from 'react';
import showMoreIconSvg from '../../../assets/show-more-icon.svg';
import showLessIconSvg from '../../../assets/show-less-icon.svg';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { MerchantType } from '../../../shared/types';
import { addBill, removeBill } from '../merchantsThunks';
import { TransactionsList } from '../../transactions/TransactionsList';
import { addBillStatus, removeBillStatus, toggleShowTransactions } from '../merchantsSlice';
import {
  StyledButton,
  StyledListItem,
  StyledMerchant,
  StyledMerchantNameAndTransactionsCount,
  StyledToggleIcon,
} from './Merchants.styles';
import { MerchantLogo } from '../merchantLogo/MerchantLogo';

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

  const toggleLabelText = merchant.showTransactions
    ? `Hide transactions for ${merchantName}`
    : `Show transactions for ${merchantName}`;

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

  return (
    <StyledListItem>
      {/* This div is clickable, to allow the user to toggle show/hide transactions.
          The div enables us to use the onKeyPress attribute for keyboard navigation, 
          and aria attributes for screenreaders */}
      <div
        role="button"
        tabIndex={0}
        onKeyPress={handleKeyboardToggle}
        onClick={handleToggleTransactions}
        aria-label={merchant.name}
        aria-expanded={merchant.showTransactions}
      >
        <StyledMerchant>
          <MerchantLogo iconUrl={iconUrl} merchantName={merchant.name} />
          <StyledMerchantNameAndTransactionsCount>
            <h2>{merchantName}</h2>
            <p>{transactions.length} transactions</p>
          </StyledMerchantNameAndTransactionsCount>
          <StyledToggleIcon
            src={merchant.showTransactions ? showLessIconSvg : showMoreIconSvg}
            alt={toggleLabelText}
          />
        </StyledMerchant>
        {merchant.showTransactions && merchant.transactions.length > 0 && (
          <TransactionsList merchantName={merchant.name} transactions={transactions} />
        )}
      </div>
      {/* Button element feels semantically correct (as it's not linking outwards), 
          but is styled as a link to not dominate visual hierarchy when section collapsed */}
      {isBill ? removeButton : addButton}
    </StyledListItem>
  );
};
