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
            addFilterView: {
              filter: {
                title: `Filter #${Math.floor(Math.random() * 100)}`,
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

export async function addFilters() {
  const jwt = getJWT();
  const sheets = google.sheets({ version: 'v4', auth: jwt });
  const my_range = {
    sheetId: 0,
    startRowIndex: 0,
    startColumnIndex: 0,
  };
  const addfilterviewrequest = {
    addFilterView: {
      filter: {
        title: 'Test Filter',
        range: my_range,
        sortSpecs: [
          {
            dimensionIndex: 4,
            sortOrder: 'DESCENDING',
          },
        ],
        criteria: {
          0: {
            hiddenValues: ['A'],
          },
        },
      },
    },
  };

  try {
    sheets.spreadsheets
      .batchUpdate({
        spreadsheetId: '1CozRRXIUDycoqOtrVN28bTzTNDyut9euvQ2vNrLubHg',
        resource: {
          includeSpreadsheetInResponse: false,
          requests: [addfilterviewrequest],
        },
      })
      .then((response) => {
        console.log(response);
      });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteDimension() {
  try {
    const jwt = getJWT();
    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const my_range = {
      sheetId: 0,
      startRowIndex: 0,
      startColumnIndex: 0,
    };

    sheets.spreadsheets
      .batchUpdate({
        spreadsheetId: '1CozRRXIUDycoqOtrVN28bTzTNDyut9euvQ2vNrLubHg',
        resource: {
          includeSpreadsheetInResponse: false,
          requests: [
            {
              updateDimensionProperties: {
                range: {
                  sheetId: 0,
                  dimension: 'COLUMNS',
                  startIndex: 0,
                  endIndex: 1,
                },
                properties: {
                  hiddenByUser: true,
                },
                fields: 'hiddenByUser',
              },
            },
            {
              updateDimensionProperties: {
                range: {
                  sheetId: 0,
                  dimension: 'COLUMNS',
                  startIndex: 1,
                  endIndex: 2,
                },
                properties: {
                  hiddenByUser: true,
                },
                fields: 'hiddenByUser',
              },
            },
          ],
        },
      })
      .then((response) => {
        console.log(response);
      });
  } catch (err) {
    console.log(err);
  }
}
