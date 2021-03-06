import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  fireEvent,
  render,
  screen,
  within,
  waitForElementToBeRemoved,
} from '../../../shared/utils/test-utils';
import { MerchantsList } from './MerchantsList';
import { Provider } from 'react-redux';
import { APIConstants } from '../../../shared/utils/constants';
import { store } from '../../../store/store';

describe('Merchants List', () => {
  describe('Happy paths', () => {
    // Returns four merchants - two bills and two potential bills
    const mockResponseWithFourMerchants = [
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

    const mockResponseSkyTvAfterRemoval = {
      categoryId: 2,
      iconUrl: 'https://i.imgur.com/cIABrGH.png',
      id: '5a5caa8efe33900100fd8ed6',
      isBill: false,
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
    };

    const skyTvId = '5a5caa8efe33900100fd8ed6';

    // Intercepts network requests and returns mock responses after 150ms
    const handlers = [
      rest.get(`${APIConstants.base}/merchants`, (req, res, ctx) => {
        return res(ctx.json(mockResponseWithFourMerchants), ctx.delay(150));
      }),
      rest.patch(`${APIConstants.base}/merchants/${skyTvId}`, (req, res, ctx) => {
        return res(ctx.json(mockResponseSkyTvAfterRemoval), ctx.delay(150));
      }),
    ];

    const server = setupServer(...handlers);

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('renders a loading state, then a list of merchants', async () => {
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

    it('allows you to toggle between bills and potential bills', async () => {
      render(
        <Provider store={store}>
          <MerchantsList />
        </Provider>
      );

      // Destructure the first two buttons, which are the tabs
      const buttons = screen.getAllByRole('button');
      const [bills, potentialBills] = buttons;

      // They should be labelled Bills, and Potential Bills
      expect(bills).toHaveTextContent('Bills');
      expect(potentialBills).toHaveTextContent('Potential Bills');

      // Because Bills is the default tab, it should be disabled
      expect(bills).toBeDisabled();
      expect(potentialBills).not.toBeDisabled();

      // The two merchants showing are the ones currently marked as bills
      const skyTvMerchant = await screen.findByText(/Sky TV/);
      const hsbcMerchant = screen.getByText(/HSBC Mortgage/);

      // Click on Potential Bills to change tab
      fireEvent.click(potentialBills);

      // Now Potential Bills should be disabled and Bills not
      await expect(potentialBills).toBeDisabled();
      expect(bills).not.toBeDisabled();

      // The two previous merchants should no longer be showing
      expect(skyTvMerchant).not.toBeInTheDocument();
      expect(hsbcMerchant).not.toBeInTheDocument();

      // And the other merchants, marked as potential bills should be there instead
      screen.findByText(/Vodafone/);
      screen.getByText(/Sainsbury's/);
    });

    it('allows you to toggle to show or hide transactions', async () => {
      render(
        <Provider store={store}>
          <MerchantsList />
        </Provider>
      );

      // By default transactions should be hidden
      const skyTvMerchant = await screen.findByText(/Sky TV/);
      let transactionsTable = within(skyTvMerchant).queryByRole('table');
      expect(transactionsTable).not.toBeInTheDocument();

      // Click on the merchant to show transactions
      fireEvent.click(skyTvMerchant);
      transactionsTable = await screen.findByRole('table');

      // Table should have 6 rows (1 header, 5 transactions)
      const transactionRows = within(transactionsTable).getAllByRole('row');
      expect(transactionRows.length).toEqual(6);

      // Transactions should display in most recent order
      const [headerRow, row1, row2, row3, row4, row5] = transactionRows;

      expect(
        within(headerRow)
          .getAllByRole('columnheader')
          .map((cell) => cell.textContent)
      ).toMatchInlineSnapshot(`
            Array [
              "Date",
              "Amount",
            ]
        `);

      expect(
        within(row1)
          .getAllByRole('cell')
          .map((cell) => cell.textContent)
      ).toMatchInlineSnapshot(`
            Array [
              "1 May 2018",
              "??82.17",
            ]
        `);

      expect(
        within(row2)
          .getAllByRole('cell')
          .map((cell) => cell.textContent)
      ).toMatchInlineSnapshot(`
            Array [
              "1 Apr 2018",
              "??82.17",
            ]
        `);

      expect(
        within(row3)
          .getAllByRole('cell')
          .map((cell) => cell.textContent)
      ).toMatchInlineSnapshot(`
            Array [
              "1 Mar 2018",
              "??82.17",
            ]
        `);

      expect(
        within(row4)
          .getAllByRole('cell')
          .map((cell) => cell.textContent)
      ).toMatchInlineSnapshot(`
            Array [
              "1 Feb 2018",
              "??82.17",
            ]
        `);

      expect(
        within(row5)
          .getAllByRole('cell')
          .map((cell) => cell.textContent)
      ).toMatchInlineSnapshot(`
            Array [
              "1 Jan 2018",
              "??82.17",
            ]
        `);

      // Click again on the merchant to hide transactions
      fireEvent.click(skyTvMerchant);
      expect(transactionsTable).not.toBeInTheDocument();
    });

    it('persists the show/hide transactions status for each merchant when going between tabs', async () => {
      render(
        <Provider store={store}>
          <MerchantsList />
        </Provider>
      );

      // By default transactions should be hidden
      const skyTvMerchant = await screen.findByText(/Sky TV/);

      const skyTvTransactions = screen.queryByLabelText('Transactions for Sky TV');
      expect(skyTvTransactions).not.toBeInTheDocument();

      // Click on Sky TV to show transactions
      fireEvent.click(skyTvMerchant);
      const skyTransactionsTable = await screen.findByRole('table');

      // Table should have 6 rows (1 header, 5 transactions)
      const skyTransactionRows = within(skyTransactionsTable).getAllByRole('row');
      expect(skyTransactionRows.length).toEqual(6);

      // Click on Potential Bills
      const potentialBillsButton = screen.getByRole('button', {
        name: /Potential Bills/i,
      });
      fireEvent.click(potentialBillsButton);

      // Sainsbury's should be there, with transactions not showing by default
      const sainsburysMerchant = await screen.findByText(/Sainsbury's/);
      const sainsburysTransactions = screen.queryByLabelText("Transactions for Sainsbury's");
      expect(sainsburysTransactions).not.toBeInTheDocument();

      // Click on Sainsburys to show transactions
      fireEvent.click(sainsburysMerchant);
      const sainsburysTransactionsTable = await screen.findByRole('table');

      // Table should have 6 rows (1 header, 5 transactions)
      const sainsburysTransactionRows = within(sainsburysTransactionsTable).getAllByRole('row');
      expect(sainsburysTransactionRows.length).toEqual(6);

      // Navigate back to Bills
      const billsButton = screen.getByRole('button', {
        name: /^Bills$/,
      });
      fireEvent.click(billsButton);

      // Sky TV transactions should still be showing
      await screen.findByLabelText('Transactions for Sky TV');
    });

    it('allows you to mark a merchant as not being a bill', async () => {
      render(
        <Provider store={store}>
          <MerchantsList />
        </Provider>
      );

      // Await the merchants marked as Bills
      await screen.findByText(/Sky TV/);

      // Click Remove Bill
      const removeButton = screen.getByLabelText('Remove Sky TV as a bill');
      fireEvent.click(removeButton);

      // Sky TV should no longer be found
      await waitForElementToBeRemoved(() => screen.queryByText(/Sky TV/));

      // Click on Potential Bills
      const potentialBillsButton = screen.getByRole('button', {
        name: /Potential Bills/i,
      });
      fireEvent.click(potentialBillsButton);

      // Sky TV should be there
      await screen.findByText(/Sky TV/);
    });

    it('allows you to mark a potential bill as a bill', async () => {});

    it('does not allow you to action a merchant that was just actioned', async () => {});
  });

  describe('Other states', () => {
    it('renders an error message if the API call has gone wrong', async () => {});

    it('renders a no merchants found message if the API returns no relevant merchants', async () => {});

    it('renders a no merchants found message if all merchants have been moved to the other tab', async () => {});
  });
});
