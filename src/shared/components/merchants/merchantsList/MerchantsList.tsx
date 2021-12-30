import './MerchantsList.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import { selectMerchants, selectMerchantsError, selectMerchantsStatus } from '../merchantsSlice';
import { Merchant } from '../merchant/Merchant';
import { MerchantType } from '../../../common/types';
import { fetchMerchants } from '../../../api/merchantsApi';

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

  const tabs = (
    <div className="tabs">
      <button
        className={`tab ${viewBills ? 'selectedTab' : ''}`}
        onClick={() => setViewBills(true)}
      >
        Bills
      </button>
      <button
        className={`tab ${!viewBills ? 'selectedTab' : ''}`}
        onClick={() => setViewBills(false)}
      >
        Potential Bills
      </button>
    </div>
  );

  const loadingMessage = <div className="emptyState">Loading...</div>;
  const errorMessage = (
    <div className="emptyState">
      Something went wrong when trying to retrieve merchants.<div>{merchantsError}</div>
    </div>
  );

  const noMerchantsMessage = <div className="emptyState">No merchants have been found.</div>;

  const merchantsList = merchants
    .filter((merchant: MerchantType) => (viewBills ? merchant?.isBill : !merchant?.isBill))
    .map((merchant: MerchantType) => {
      return <Merchant merchant={merchant} key={merchant.id} />;
    });

  return (
    <div>
      {tabs}
      <div className="container">
        {merchantsStatus === 'loading' && loadingMessage}
        {merchantsStatus === 'failed' && errorMessage}
        {merchantsStatus === 'succeeded' && merchants.length === 0 && noMerchantsMessage}
        {merchantsStatus === 'succeeded' && merchants.length > 0 && merchantsList}
      </div>
    </div>
  );
};
