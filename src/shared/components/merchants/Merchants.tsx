import './Merchants.css';
import { useEffect, useState } from 'react';
import { Img } from 'react-image';
import cleoCoin from '../../../assets/cleo_coin.jpg';
import loaderGif from '../../../assets/loader.gif';
// import showMoreIcon from '../../../assets/show-more.png';
import showLessIcon from '../../../assets/show-less.png';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchMerchants, billRemoved, billAdded, Merchant, Transaction } from './merchantsSlice';

export const Merchants: React.FC = () => {
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

  const handleClickBills = () => {
    setViewBills(true);
  };

  const handleClickPotentialBills = () => {
    setViewBills(false);
  };

  const handleClickRemoveBill = async (merchantId: string) => {
    dispatch(billRemoved({ id: merchantId }));
  };

  const handleClickAddAsBill = async (merchantId: string) => {
    dispatch(billAdded({ id: merchantId }));
  };

  return (
    <div>
      <button className={`tab ${viewBills ? 'selectedTab' : ''}`} onClick={handleClickBills}>
        Bills
      </button>
      <button
        className={`tab ${!viewBills ? 'selectedTab' : ''}`}
        onClick={handleClickPotentialBills}
      >
        Potential Bills
      </button>
      <div
        style={{
          background: 'white',
          width: 460,
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          marginTop: 0,
          padding: 20,
          paddingBottom: 0,
          borderRadius: 10,
        }}
      >
        {merchantsStatus === 'loading' && <div className="emptyState">Loading...</div>}
        {merchantsStatus === 'failed' && (
          <div className="emptyState">
            Something went wrong when trying to retrieve merchants.<div>{error}</div>
          </div>
        )}
        {merchants
          ?.filter((merchant: Merchant) => (viewBills ? merchant.isBill : !merchant.isBill))
          .map((merchant: Merchant) => {
            return (
              <div
                key={merchant.id}
                style={{ border: 'dashed 1px gray', marginBottom: 20, borderRadius: 10 }}
              >
                <div
                  style={{
                    display: 'flex',
                    margin: '10 auto',
                    padding: 10,
                    width: 440,
                    textAlign: 'left',
                    color: 'black',
                  }}
                >
                  <Img
                    src={showLessIcon}
                    alt={`Hide transactions for ${merchant.name}`}
                    style={{ width: 20, height: 20, margin: 10, alignSelf: 'center' }}
                  />
                  <Img
                    src={[merchant.iconUrl, cleoCoin]}
                    loader={<Img src={loaderGif} className="merchantLogo" />}
                    alt={`${merchant.name} logo`}
                    className="merchantLogo"
                  />
                  <div
                    style={{
                      width: 230,
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 0,
                      margin: 0,
                      justifyContent: 'center',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {merchant.name}
                    </p>
                    <p style={{ padding: 0, margin: 0 }}>
                      {merchant.transactions.length} transactions
                    </p>
                  </div>

                  {merchant.isBill ? (
                    <button
                      className="merchantButton"
                      onClick={() => handleClickRemoveBill(merchant.id)}
                    >
                      Remove bill
                    </button>
                  ) : (
                    <button
                      className="merchantButton"
                      onClick={() => handleClickAddAsBill(merchant.id)}
                    >
                      Add as bill
                    </button>
                  )}
                </div>
                <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
                  {/* Spread the transactions array into a new copy to enable sorting */}
                  {[...merchant.transactions]
                    .sort((a: Transaction, b: Transaction) => {
                      return +new Date(b.date) - +new Date(a.date);
                    })
                    .map((transaction) => (
                      <div key={transaction.id}>
                        <p>
                          {format(Date.parse(transaction.date), 'd MMM y')}{' '}
                          <span>
                            {new Intl.NumberFormat('en-GB', {
                              style: 'currency',
                              currency: 'GBP',
                            }).format(transaction.amount)}
                          </span>
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
