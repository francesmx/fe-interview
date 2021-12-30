import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '../../../common/utils/test-utils';
import { MerchantsList } from './MerchantsList';
import { Provider } from 'react-redux';
import { APIConstants } from '../../../common/utils/constants';
import { store } from '../../../app/store';

const mockApiResponseMerchants = [
  {
    categoryId: 1,
    iconUrl: 'https://pbs.twimg.com/profile_images/1151788824093188097/wHfb5mYZ_bigger.png',
    id: '5a5caa1efe33900100fd8ed5',
    isBill: false,
    name: 'Vodafone',
    transactions: [
      {
        amount: 12.34,
        date: '2018-01-13',
        id: 36,
      },
      {
        amount: 14.34,
        date: '2018-02-13',
        id: 37,
      },
      {
        amount: 15.54,
        date: '2018-03-13',
        id: 38,
      },
      {
        amount: 11.34,
        date: '2018-04-13',
        id: 39,
      },
      {
        amount: 18.99,
        date: '2018-05-13',
        id: 40,
      },
    ],
  },
  {
    categoryId: 2,
    iconUrl: 'https://i.imgur.com/cIABrGH.png',
    id: '5a5caa8efe33900100fd8ed6',
    isBill: true,
    name: 'Sky TV',
    transactions: [
      {
        amount: 82.17,
        date: '2018-01-01',
        id: 41,
      },
      {
        amount: 82.17,
        date: '2018-02-01',
        id: 42,
      },
      {
        amount: 82.17,
        date: '2018-03-01',
        id: 43,
      },
      {
        amount: 82.17,
        date: '2018-04-01',
        id: 44,
      },
      {
        amount: 82.17,
        date: '2018-05-01',
        id: 45,
      },
    ],
  },
  {
    categoryId: 3,
    iconUrl: 'https://i.imgur.com/HqkjARG.png',
    id: '5a5caad4fe33900100fd8ed7',
    isBill: true,
    name: 'HSBC Mortgage',
    transactions: [
      {
        amount: 1023,
        date: '2018-01-01',
        id: 1,
      },
      {
        amount: 1023,
        date: '2018-02-01',
        id: 2,
      },
      {
        amount: 1023,
        date: '2018-03-01',
        id: 3,
      },
      {
        amount: 1023,
        date: '2018-04-01',
        id: 4,
      },
      {
        amount: 1023,
        date: '2018-05-01',
        id: 5,
      },
    ],
  },
  {
    categoryId: 5,
    iconUrl: 'https://makemefallback/notgoingtowork.jpg',
    id: '5a5cac65fe33900100fd8edc',
    isBill: false,
    name: "Sainsbury's",
    transactions: [
      {
        amount: 18.92,
        date: '2018-01-22',
        id: 26,
      },
      {
        amount: 6.34,
        date: '2018-02-22',
        id: 27,
      },
      {
        amount: 112.34,
        date: '2018-03-10',
        id: 28,
      },
      {
        amount: 565.27,
        date: '2018-04-21',
        id: 29,
      },
      {
        amount: 8,
        date: '2018-07-02',
        id: 30,
      },
    ],
  },
];

// Intercepts network request and return mock response after 150ms
export const handlers = [
  rest.get(`${APIConstants.base}/merchants`, (req, res, ctx) => {
    return res(ctx.json(mockApiResponseMerchants), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

describe('Merchants List', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders a list of merchants', async () => {
    render(
      <Provider store={store}>
        <MerchantsList />
      </Provider>
    );

    // There should be two buttons
    const tabs = screen.getAllByRole('button');
    expect(tabs.length).toEqual(2);

    // They should be labelled Bills, and Potential Bills
    const [bills, potentialBills] = tabs;
    expect(bills).toHaveTextContent('Bills');
    expect(potentialBills).toHaveTextContent('Potential Bills');

    // Initially there should be a loading state
    screen.getByText(/Loading.../);

    // Eventually, two merchants should show
    await screen.findByText(/Sky TV/);
    screen.getByText(/HSBC Mortgage/);
  });
});
