import './Merchants.css';
import { useEffect, useState } from 'react';
import { Img } from 'react-image';
import cleoCoin from '../../../assets/cleo_coin.jpg';
import loaderGif from '../../../assets/loader.gif';
import showMoreIcon from '../../../assets/show-more-icon.svg';
import showLessIcon from '../../../assets/show-less-icon.svg';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  fetchMerchants,
  removeBill,
  addBill,
  toggleShowTransactions,
  Merchant,
  Transaction,
} from './merchantsSlice';

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
    dispatch(removeBill(merchantId));
  };

  const handleAddAsBill = async (merchantId: string) => {
    dispatch(addBill(merchantId));
  };

  const handleToggleTransactions = (merchantId: string) => {
    dispatch(toggleShowTransactions({ id: merchantId }));
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
                <div
                  className="merchantContainer"
                  onClick={() => handleToggleTransactions(merchant.id)}
                >
                  {!merchant.showTransactions ? (
                    <Img
                      src={showMoreIcon}
                      alt={`Show transactions for ${merchant.name}`}
                      className="showTransactionsToggleIcon"
                    />
                  ) : (
                    <Img
                      src={showLessIcon}
                      alt={`Hide transactions for ${merchant.name}`}
                      className="showTransactionsToggleIcon"
                    />
                  )}

                  <Img
                    src={[merchant.iconUrl, cleoCoin]}
                    loader={<Img src={loaderGif} className="merchantLogo" />}
                    alt={`${merchant.name} logo`}
                    className="merchantLogo"
                  />
                  <div className="merchantNameAndTransactionsContainer">
                    <p className="merchantName">{merchant.name}</p>
                    <p style={{ padding: 0, margin: 0, fontSize: '1rem' }}>
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
                {merchant.showTransactions && (
                  <div className="transactionsContainer">
                    <table className="transactionsTable">
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
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
