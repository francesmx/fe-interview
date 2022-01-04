## Cleo Frontend Interview - Bills

A React application that allows users to mark or unmark merchants as Bills, to help with budgeting.

<img src="https://i.imgur.com/iCOuXik.png" alt="Screenshot of app" width="350" />

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

App is scoring 100% for accessibility for automated checks with AXE and Lighthouse. There are some decisions I made around providing additional markup for accessibility that I'm not sure about, e.g. more descriptive aria-label text for add/remove bill, as well as the off-screen h1 tag for Bills or Potential Bills. They felt helpful to me but I would seek advice on this irl.

- [x] Design – Use accessible colours (contrast & colour blindness), font size, layout, motion & interactions

- [x] Content – Copy is written using plain language with clear and unique links & CTAs, ALT text & hidden labels

- [x] Keyboard only – Using only a keyboard (no mouse or touch), navigation is in the correct order and all interactive elements are reachable

- [x] Screen reader – Works with a screen reader with meaningful focus order, heading tags, image descriptions & hidden labels

(I did a quick test with VoiceOver, but I'm not proficient enough with the tool to audit well. It sort of works - the content reads reasonably, but it could be better. Would love tips on how to improve this.)

- [x] Magnification – Can zoom up to 400% (or down to mobile size 320px) without losing content or functionality

### To Do List

Here's a list of things I would have done if I had more time (not in any order):

- [ ] Finish writing the tests / split them up where appropriate
- [ ] Give some kind of visual confirmation to users when merchants have been updated
- [ ] Better error handling for failed merchant updates
- [ ] Display merchants in some kind of order!
- [ ] Better handling for merchants with zero transactions (but need to understand use case)
- [ ] Prettier loading state, e.g. fake / blurry Merchants (this probably has a proper name!)
- [ ] Make use of Categories information from the API
- [ ] Use Redux Sagas
- [ ] Dockerise - to standardise environment for installation and running, and for simpler deployment

### Things I'd like to discuss with a more senior engineer

- Best practices for capturing API request states in Redux, how to integrate Saga (haven't yet tried but interested to hear what it offers)
- Best practices for accessibility, e.g. hidden elements, use of aria-labels, how to audit with a screenreader
- Best practices for / idiomatic use of styled-components, e.g. architecture, naming, use of CSS variables
- How best to use Mock Service Worker, or what the alternatives might be
- How to make it more beautiful / fun, e.g. subtle animations, use of colour / imagery etc.
- Any other pointers to make my code better :)

### Design Evolution

I liked my original design idea (see below) because it was colourful and attractive. However an accessibility check made me realise that you shouldn't nest interactive elements, i.e. the show/hide toggle, and the main call to action (add/remove bill). I tried to overcome this with absolute positioning, but ultimately realised it was easier and better to re-design and take the button out of the flow.

In doing so, I de-emphasised the button's priority and re-styled as a link so that it doesn't dominate the interface but is still easy enough to access. Cleo's link styling doesn't usually include underlines but I felt this made it super clear. Another advantage of the new design is that it works well even on screen widths as low as 320px. The end result is slightly less pretty, but more usable and accessible.

<img src="https://i.imgur.com/sw12HRp.png" alt="Comparison of old vs new designs" width="800" />
