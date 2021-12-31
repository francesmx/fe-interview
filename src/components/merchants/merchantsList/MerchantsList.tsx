import './MerchantsList.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { selectMerchants, selectMerchantsError, selectMerchantsStatus } from '../merchantsSlice';
import { Merchant } from '../merchant/Merchant';
import { MerchantType } from '../../../shared/types';
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

  const tabBills = (
    <button
      className={`tab ${viewBills ? 'selectedTab' : ''}`}
      onClick={() => setViewBills(true)}
      disabled={viewBills}
    >
      Bills
    </button>
  );

  const tabPotentialBills = (
    <button
      className={`tab ${!viewBills ? 'selectedTab' : ''}`}
      onClick={() => setViewBills(false)}
      disabled={!viewBills}
    >
      Potential Bills
    </button>
  );

  const loadingMessage = <div className="emptyState">Loading...</div>;

  const errorMessage = (
    <div className="emptyState">
      Something went wrong when trying to retrieve merchants.<div>{merchantsError}</div>
    </div>
  );

  const noMerchantsMessage = <div className="emptyState">No merchants have been found.</div>;

  const filteredMerchants = merchants.filter((merchant: MerchantType) =>
    viewBills ? merchant?.isBill : !merchant?.isBill
  );

  return (
    <main>
      {/* Used buttons rather than anchor links for navigation since user remains on page */}
      <nav className="tabs">
        {tabBills}
        {tabPotentialBills}
      </nav>
      <section className="container">
        <h1 className="screenreader-only">{viewBills ? 'Bills' : 'Potential Bills'}</h1>
        {merchantsStatus === 'loading' && loadingMessage}
        {merchantsStatus === 'failed' && errorMessage}
        {merchantsStatus === 'succeeded' && filteredMerchants.length === 0 && noMerchantsMessage}
        {merchantsStatus === 'succeeded' &&
          filteredMerchants.length > 0 &&
          filteredMerchants.map((merchant: MerchantType) => {
            return <Merchant merchant={merchant} key={merchant.id} />;
          })}
      </section>
    </main>
  );
};
