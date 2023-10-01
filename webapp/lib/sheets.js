import { google } from 'googleapis';

const target = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive',
];

const getJWT = () => {
  const jwt = new google.auth.JWT(
    process.env.SERVICE_EMAIL,
    null,
    (process.env.PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    target
  );

  return jwt;
};

const getAuth = (token) => {
  const auth = new google.auth.OAuth2({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID, // Replace with your OAuth2 client ID
    clientSecret: process.env.CLIENT_SECRET, // Replace with your OAuth2 client secret
    redirectUri: process.env.NEXT_PUBLIC_CALLBACK_URL, // Replace with your redirect URI
  });

  auth.setCredentials({
    access_token: token,
  });

  console.log('in f', auth);

  return auth;
};

export async function batchUpdate(
  data,
  arr,
  filters,
  sorts,
  spreadSheetId,
  sheetId,
  token
) {
  try {
    //const jwt = getJWT();
    const auth = getAuth(token);
    console.log('out f', auth);
    //const sheets = google.sheets({ version: 'v4', auth: jwt });
    const sheets = google.sheets({ version: 'v4', auth: auth });
    const ssheetId = spreadSheetId;
    const sheetid = sheetId;
    const my_range = {
      sheetId: sheetid,
      startRowIndex: 0,
      startColumnIndex: 0,
    };

    return await sheets.spreadsheets.batchUpdate({
      spreadsheetId: ssheetId,
      resource: {
        includeSpreadsheetInResponse: true,
        requests: [
          {
            clearBasicFilter: {
              sheetId: sheetid,
            },
          },

          {
            pasteData: {
              coordinate: {
                columnIndex: 0,
                rowIndex: 0,
                sheetId: sheetid,
              },
              delimiter: ',',
              type: 'PASTE_NORMAL',
              data: data,
            },
          },
          {
            sortRange: {
              range: {
                sheetId: sheetid,
                startRowIndex: 1,
                startColumnIndex: 0,
              },
              sortSpecs: sorts,
            },
          },
          {
            setBasicFilter: {
              filter: {
                /* title: `Filter #${Math.floor(Math.random() * 100)}`, */
                range: my_range,
                filterSpecs: filters,
              },
            },
          },
          ...arr,
        ],
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}
