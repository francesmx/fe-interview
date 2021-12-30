## Cleo Frontend Interview - Bills

A React application that allows users to mark or unmark merchants as Bills, to help with budgeting.

<img src="https://i.imgur.com/uhrD3h6.png" alt="Screenshot of app" width="400" />

### Instructions

1. Make sure you're using node v14.15.0, or just run:

   ```
   nvm use
   ```

2. Install dependencies

   ```
   yarn install
   ```

3. Start the json-api server

   ```
   yarn api
   ```

4. In another tab, start the dev server

   ```
   yarn start
   ```

5. In another tab, run tests

   ```
   yarn test
   ```

6. To see the app, go to http://localhost:3001

### The Task

- [x] Create a Tabs component that allows multiple pages to be switched between.
- [x] One tab should show a list of merchants with transactions that have been marked as bills. These can be found at http://localhost:3002/merchants. Merchant's marked as bills, have a flag `isBill` set to `true`.
- [x] Another tab should show a list of merchants with transactions which are potential bills. These can also be found at http://localhost:3002/merchants. Merchant's that could be potentially bills have a flag `isBill` set to `false`.
- [x] Under each merchant row for both lists, should be a hidden list of transactions for that merchant. This should show when the merchant row is clicked.
- [x] Under the name of each merchant should show a count of the transactions for it
- [x] Add an action to the bills tab for each merchant called "remove bill" which updates the relevant merchant's `isBill` flag to `false`. You can use a `PATCH` request to `http://localhost:3002/merchants/:id` using the id of the merchant to update the resource.
- [x] Add an action to the potential bills tab for each merchant called "Add as bill" which updates the relevant merchant's `isBill` flag to `true`.
- [x] After each action, the lists should reflect the changes.

### Notes

- Please aim to spend 2-3 hours completing this task
- We'd like to see state management tools being used
- Tools we use at Cleo include styled-components, Typescript and Redux (with Sagas)
- Style the components however you see fit. SASS or PostCSS are fine, but we'd prefer CSS in JS
- We love tests, linted code and great looking UIs
- The API contains other data, feel free to use this creatively if you have the time
- Remember to check your project runs before submitting

### Accessibility Checklist

- [x] Design – Use accessible colours (contrast & colour blindness), font size, layout, motion & interactions

- [x] Content – Copy is written using plain language with clear and unique links & CTAs, ALT text & hidden labels

- [x] Keyboard only – Using only a keyboard (no mouse or touch), navigation is in the correct order and all interactive elements are reachable

- [] Screen reader – Works with a screen reader with meaningful focus order, heading tags, image descriptions & hidden labels

- [] Magnification – Can zoom up to 400% (or down to mobile size 320px) without losing content or functionality

### To Do List

- [] Dockerise
- [] Use Styled Components
- [] Use Redux Sagas
- [] Make use of Categories information from the API
