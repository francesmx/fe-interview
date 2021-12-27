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

  const handleRemoveBill = async (merchantId: string) => {
    dispatch(billRemoved({ id: merchantId }));
  };

  const handleAddAsBill = async (merchantId: string) => {
    dispatch(billAdded({ id: merchantId }));
  };

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
          ?.filter((merchant: Merchant) => (viewBills ? merchant.isBill : !merchant.isBill))
          .map((merchant: Merchant) => {
            return (
              <div
                key={merchant.id}
                style={{ border: 'dashed 1px gray', marginBottom: 20, borderRadius: 10 }}
              >
                <div className="merchantContainer">
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
                    <p className="merchantName">{merchant.name}</p>
                    <p style={{ padding: 0, margin: 0 }}>
                      {merchant.transactions.length} transactions
                    </p>
                  </div>

                  {merchant.isBill ? (
                    <button
                      className="merchantButton"
                      onClick={() => handleRemoveBill(merchant.id)}
                    >
                      Remove bill
                    </button>
                  ) : (
                    <button className="merchantButton" onClick={() => handleAddAsBill(merchant.id)}>
                      Add as bill
                    </button>
                  )}
                </div>
                <div className="transactionsContainer">
                  <table style={{ marginLeft: 128, marginRight: 20, marginBottom: 20 }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left' }}>Date</th>
                        <th style={{ textAlign: 'right' }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Spread the transactions array into a new copy to enable sorting */}
                      {[...merchant.transactions]
                        .sort((a: Transaction, b: Transaction) => {
                          return +new Date(b.date) - +new Date(a.date);
                        })
                        .map((transaction) => (
                          <tr key={transaction.id}>
                            <td style={{ textAlign: 'left' }}>
                              {format(Date.parse(transaction.date), 'd MMM y')}
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              {new Intl.NumberFormat('en-GB', {
                                style: 'currency',
                                currency: 'GBP',
                              }).format(transaction.amount)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
