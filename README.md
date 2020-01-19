# Thoughtriver test by Ben Attenborough

## How to use this app

This application consists of a front end and a back end which are seperated. The frontend requires the backend to be running in order to fetch data.

To run the backend server. From project root:

First time
`cd backend && npm intsall && npm start`

`cd backend && npm start`

Or to run in debug:

`cd backend && DEBUG=backend:* npm start`

To run the frontend sever

First time
`cd frontend && npm install && npm start`

`cd frontend && yarn start`
OR without yarn
`cd frontend && npm start`

### Possible issues.

The backend server runs on localhost:3000. If for some reason you run it on a different port you'll nned to update `/frontend/src/settings/constants.js` and amended the line `export const baseUrl = "http://localhost:4000";` to point to the server.

The port the frontend runs on is not important.

## Running tests

`cd frontend` then run `yarn test` or `npm test`

## Contact me

You can get in contact with me at battenborough@gmail.com
