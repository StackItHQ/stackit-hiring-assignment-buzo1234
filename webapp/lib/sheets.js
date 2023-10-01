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

export async function batchUpdate(data, arr, filters) {
  try {
    const jwt = getJWT();
    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const my_range = {
      sheetId: 0,
      startRowIndex: 0,
      startColumnIndex: 0,
    };

    return await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.SPREADSHEET_ID,
      resource: {
        includeSpreadsheetInResponse: true,
        requests: [
          {
            pasteData: {
              coordinate: {
                columnIndex: 0,
                rowIndex: 0,
                sheetId: 0,
              },
              delimiter: ',',
              type: 'PASTE_NORMAL',
              data: data,
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

//batchUpdate();

export async function updateWithFilter(filterId) {
  try {
    const jwt = getJWT();
    const sheets = google.sheets({ version: 'v4', auth: jwt });

    return await sheets.spreadsheets.values.update();
  } catch (err) {
    throw err;
  }
}
