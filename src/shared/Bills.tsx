import { useFetch } from 'use-http';
import { APIConstants } from './constants';
import { Img } from 'react-image';
import cleoCoin from '../assets/cleo_coin.jpg';
import loaderGif from '../assets/loader.gif';
import { useState } from 'react';

type Transaction = {
  amount: number;
  date: Date;
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

  return (
    <div>
      <button onClick={handleClickBills}>Bills</button>
      <button onClick={handleClickPotentialBills}>Potential Bills</button>
      {loading && <div>Loading...</div>}
      {data
        ?.filter((merchant: Merchant) => (viewBills ? merchant.isBill : !merchant.isBill))
        .map((merchant: Merchant) => {
          return (
            <div key={merchant.id} style={{ marginTop: 30, width: 500, textAlign: 'left' }}>
              <Img
                src={[merchant.iconUrl, cleoCoin]}
                loader={<Img src={loaderGif} style={{ width: 50, height: 50, float: 'left' }} />}
                alt={`${merchant.name} logo`}
                style={{ width: 50, height: 50, float: 'left' }}
              />
              <h3>{merchant.name}</h3>
              <p>{merchant.transactions.length} transactions</p>
              {merchant.isBill ? (
                <button onClick={() => handleClickRemoveBill(merchant.id)}>Remove bill</button>
              ) : (
                <button onClick={() => handleClickAddAsBill(merchant.id)}>Add as bill</button>
              )}
            </div>
          );
        })}
    </div>
  );
};
