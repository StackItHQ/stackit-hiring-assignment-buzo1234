import { getGoogleOauthToken, getGoogleUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const GET = async (request, response) => {
  try {
    const {
      nextUrl: { searchParams },
    } = request;

    const code = searchParams.get('code');
    if (!code) {
      return NextResponse.json({ message: 'Code not found' }, { status: 400 });
    }

    // Use the code to get the id and access tokens
    const { id_token, access_token } = await getGoogleOauthToken({ code });

    // Use the token to get the User
    const { name, picture } = await getGoogleUser({
      id_token,
      access_token,
    });

    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('access_token', access_token);
    loginUrl.searchParams.set('name', name);
    loginUrl.searchParams.set('photo', picture);
    // And redirect to the new URL
    return NextResponse.redirect(loginUrl);
  } catch (err) {
    return NextResponse.json(
      { message: 'POST Error', err: err },
      { status: 500 }
    );
  }
};
