This app is based on [ACE Express template](https://bitbucket.org/atlassian/atlassian-connect-express-template/src/master/views/), 3 to 4 beers and a lot of joy learning :)

## Installation

1. Clone the repo
   `git clone https://github.com/johnny1K/linked-bugs.git`

2. Install dependencies
   `npm i`

3. Create `credentials.json`.
   [Create an API token](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) and fill in the data. Use the `credentials.json.sample` template.

4. Run
   `npm run start`

Unforutnately the ACE auto addon de-register did not work for me.
Better luck next time ;)

5. Load addon in Jira instance

- After running `npm start` locate the line which starts with `Local tunnel established...`
- Copy the `https://xxxxxx.ngrok.io/` URL
- Go to Jira > Apps > Manage Your Apps > Upload app
- Paste the copied URL into the input field and hit `Upload`
