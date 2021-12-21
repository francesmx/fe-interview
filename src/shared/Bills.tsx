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
  const URL = `${APIConstants.base}/merchants`;
  const { data, loading } = useFetch(URL, []);
  const [viewBills, setViewBills] = useState(true);

  const handleClickBills = () => {
    setViewBills(true);
  };

  const handleClickPotentialBills = () => {
    setViewBills(false);
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
                loader={<Img src={loaderGif} />}
                alt={`${merchant.name} logo`}
                style={{ width: 50, height: 50, float: 'left' }}
              />
              <h3>{merchant.name}</h3>
              <p>{merchant.transactions.length} transactions</p>
              {merchant.isBill ? <button>Remove bill</button> : <button>Add as bill</button>}
            </div>
          );
        })}
    </div>
  );
};
