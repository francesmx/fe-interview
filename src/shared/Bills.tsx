import './Bills.css';
import { useState } from 'react';
import { useFetch } from 'use-http';
import { APIConstants } from './constants';
import { Img } from 'react-image';
import cleoCoin from '../assets/cleo_coin.jpg';
import loaderGif from '../assets/loader.gif';
import showMoreIcon from '../assets/show-more.png';
import showLessIcon from '../assets/show-less.png';
import { format } from 'date-fns';

type Transaction = {
  amount: number;
  date: string;
  id: number;
};

type Merchant = {
  categoryID: number;
  iconUrl: string;
  id: string;
  isBill: boolean;
  name: string;
  transactions: Array<Transaction>;
};

// use Axios instead of Fetch?
// might be better supported

export const Bills: React.FC = () => {
  const MERCHANTS_URL = `${APIConstants.base}/merchants`;
  const { data, loading } = useFetch(MERCHANTS_URL, []);
  const [request, response] = useFetch(MERCHANTS_URL);

  const [viewBills, setViewBills] = useState(true);

  const handleClickBills = () => {
    setViewBills(true);
  };

  const handleClickPotentialBills = () => {
    setViewBills(false);
  };

  // The patch request is working.
  // However the following request.get isn't getting the new data
  // We also have data in two objects (data and response.data)
  // But we don't want the data object to be mutable
  // Can re-look at use-http docs to see how they manage handling onMount and onClick events together
  // Should probably do that AND considering using Redux at this point to manage state

  const handleClickRemoveBill = async (merchantId: string) => {
    await request.patch(`/${merchantId}`, { isBill: false });
    if (response.ok) {
      await request.get();
    }
  };

  const handleClickAddAsBill = async (merchantId: string) => {
    await request.patch(`/${merchantId}`, { isBill: true });
    if (response.ok) {
      await request.get();
    }
  };

  // if viewBills add class selectedTab

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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignContent: 'space-around',
        }}
      >
        {loading && <div>Loading...</div>}
        {data
          ?.filter((merchant: Merchant) => (viewBills ? merchant.isBill : !merchant.isBill))
          .map((merchant: Merchant) => {
            return (
              <div
                key={merchant.id}
                style={{ border: 'dashed 1px gray', marginTop: 20, borderRadius: 10 }}
              >
                <div
                  style={{
                    display: 'flex',
                    margin: '10 auto',
                    padding: 10,
                    width: 520,
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
                  {merchant.transactions.map((transaction) => (
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
