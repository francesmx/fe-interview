import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { selectMerchants, selectMerchantsError, selectMerchantsStatus } from '../merchantsSlice';
import { Merchant } from '../merchant/Merchant';
import { MerchantType } from '../../../shared/types';
import { fetchMerchants } from '../merchantsThunks';
import {
  StyledEmptyContainerMessage,
  StyledMerchantsContainer,
  StyledTab,
} from './MerchantsList.styles';

export const MerchantsList: React.FC = () => {
  const merchants = useAppSelector(selectMerchants);
  const merchantsStatus = useAppSelector(selectMerchantsStatus);
  const merchantsError = useAppSelector(selectMerchantsError);
  const dispatch = useAppDispatch();

  const [viewBills, setViewBills] = useState(true);

  useEffect(() => {
    if (merchantsStatus === 'idle') {
      dispatch(fetchMerchants());
    }
  }, [merchantsStatus, dispatch]);

  const tabBills = (
    <StyledTab
      selected={viewBills ? true : false}
      onClick={() => setViewBills(true)}
      disabled={viewBills}
    >
      Bills
    </StyledTab>
  );

  const tabPotentialBills = (
    <StyledTab
      selected={viewBills ? false : true}
      onClick={() => setViewBills(false)}
      disabled={!viewBills}
    >
      Potential Bills
    </StyledTab>
  );

  const loadingMessage = <StyledEmptyContainerMessage>Loading...</StyledEmptyContainerMessage>;

  const errorMessage = (
    <StyledEmptyContainerMessage>
      Something went wrong when trying to retrieve merchants.<div>{merchantsError}</div>
    </StyledEmptyContainerMessage>
  );

  const noMerchantsMessage = (
    <StyledEmptyContainerMessage>No merchants have been found.</StyledEmptyContainerMessage>
  );

  const filteredMerchants = merchants.filter((merchant: MerchantType) =>
    viewBills ? merchant?.isBill : !merchant?.isBill
  );

  return (
    <main>
      <nav>
        {tabBills}
        {tabPotentialBills}
      </nav>
      <StyledMerchantsContainer>
        <h1 className="screenreader-only">{viewBills ? 'Bills' : 'Potential Bills'}</h1>
        {merchantsStatus === 'loading' && loadingMessage}
        {merchantsStatus === 'failed' && errorMessage}
        {merchantsStatus === 'succeeded' && filteredMerchants.length === 0 && noMerchantsMessage}
        {merchantsStatus === 'succeeded' &&
          filteredMerchants.length > 0 &&
          filteredMerchants.map((merchant: MerchantType) => {
            return <Merchant merchant={merchant} key={merchant.id} />;
          })}
      </StyledMerchantsContainer>
    </main>
  );
};
