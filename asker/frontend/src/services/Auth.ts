import axios from 'axios';

type SignInResponse = {
  authToken: string;
  idToken: string;
  refreshToken: string;
};

export class Auth {
  public static async singIn(username: string, password: string): Promise<SignInResponse> {
    const signInUrl = `${process.env.REACT_APP_AUTH_URL}/sign-in`;
    try {
      const data = {
        clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
        username,
        password,
      };

      const response = await axios.post(signInUrl, data);
      return response.data;
    } catch (e) {
      throw e.message;
    }
  }
}
