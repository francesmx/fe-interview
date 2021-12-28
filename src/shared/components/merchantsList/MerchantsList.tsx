import './MerchantsList.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchMerchants } from './merchantsSlice';
import { Merchant } from '../merchant/Merchant';
import { MerchantType } from '../../types/sharedTypes';

export const MerchantsList: React.FC = () => {
  const merchants = useAppSelector((state) => state.merchants.merchants);
  const merchantsStatus = useAppSelector((state) => state.merchants.status);
  const error = useAppSelector((state) => state.merchants.error);
  const dispatch = useAppDispatch();

  const [viewBills, setViewBills] = useState(true);

  useEffect(() => {
    if (merchantsStatus === 'idle') {
      dispatch(fetchMerchants());
    }
  }, [merchantsStatus, dispatch]);

  return (
    <div>
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
      <div className="container">
        {merchantsStatus === 'loading' && <div className="emptyState">Loading...</div>}
        {merchantsStatus === 'failed' && (
          <div className="emptyState">
            Something went wrong when trying to retrieve merchants.<div>{error}</div>
          </div>
        )}
        {merchants
          ?.filter((merchant: MerchantType) => (viewBills ? merchant.isBill : !merchant.isBill))
          .map((merchant: MerchantType) => {
            return <Merchant merchant={merchant} key={merchant.id} />;
          })}
      </div>
    </div>
  );
};
