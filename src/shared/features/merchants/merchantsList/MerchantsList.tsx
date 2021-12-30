import './MerchantsList.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import { selectMerchants, selectMerchantsError, selectMerchantsStatus } from '../merchantsSlice';
import { Merchant } from '../merchant/Merchant';
import { MerchantType } from '../merchantTypes';
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

  return (
    <div>
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
      <div className="container">
        {merchantsStatus === 'loading' && <div className="emptyState">Loading...</div>}
        {merchantsStatus === 'failed' && (
          <div className="emptyState">
            Something went wrong when trying to retrieve merchants.<div>{merchantsError}</div>
          </div>
        )}
        {merchantsStatus === 'succeeded' && merchants.length === 0 && (
          <div className="emptyState">No merchants have been found.</div>
        )}
        {merchantsStatus === 'succeeded' &&
          merchants.length > 0 &&
          merchants
            .filter((merchant: MerchantType) => (viewBills ? merchant?.isBill : !merchant?.isBill))
            .map((merchant: MerchantType) => {
              return <Merchant merchant={merchant} key={merchant.id} />;
            })}
      </div>
    </div>
  );
};
