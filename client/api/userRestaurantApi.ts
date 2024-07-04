import axios from 'axios';
import UserInterface from '../src/models/user.interface';
const apiUrl = 'http://127.0.0.1:4000/';

const userRestaurentAxios = axios.create({ baseURL: apiUrl });

export async function login(userEmail: string, password: string): Promise<UserInterface | undefined> {
  try {
    const res = await userRestaurentAxios.post('/login', { userEmail, password });
    console.log('서버 응답:', res.data);
    const { user } = res.data;
    if (user.userEmail === userEmail) {
      return user;
    } else {
      throw new Error('유저 이메일이 일치하지 않습니다.');
    }
  } catch (error) {
    console.error('로그인 에러 발생');
  }
}

export async function signup(
  userEmail: string,
  password: string,
  userNickName: string,
): Promise<UserInterface | undefined> {
  try {
    const res = await userRestaurentAxios.post('./signup', { userEmail, password, userNickName });
    return res.data;
  } catch (error) {
    console.error('에러발생');
  }
}
