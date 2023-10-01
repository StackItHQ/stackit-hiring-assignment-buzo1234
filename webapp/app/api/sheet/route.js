import { NextResponse } from 'next/server';
import { batchUpdate } from '@/lib/sheets';

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { csvString, headers } = body;

    let arr = [];
    let count = 0;
    headers.map((h) => {
      if (!h.selected) {
        arr.push({
          deleteDimension: {
            range: {
              sheetId: 0,
              dimension: 'COLUMNS',
              startIndex: h.id - count,
              endIndex: h.id + 1 - count,
            },
          },
        });

        count++;
      }
    });

    const res = await batchUpdate(csvString, arr);
    console.log(res);

    if (res.status === 200) {
      return NextResponse.json(
        { message: 'Done', message: res },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: 'Error', err }, { status: 500 });
  } catch (err) {
    return NextResponse.json(
      { message: 'POST  Error', err: err },
      { status: 500 }
    );
  }
};
