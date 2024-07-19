import axios from 'axios';
import UserInterface from '../src/models/user.interface';
import { Restaurant } from '../src/models/user.interface';
const apiUrl = 'http://127.0.0.1:4000/';

const userRestaurentAxios = axios.create({ baseURL: apiUrl });

export async function login(
  userEmail: string,
  password: string,
): Promise<{ token: string; user: UserInterface } | undefined> {
  try {
    const res = await userRestaurentAxios.post('/login', { userEmail, password });
    console.log('서버 응답:', res.data);
    const { token, user } = res.data;
    if (user.userEmail === userEmail) {
      return { token, user };
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
    const res = await userRestaurentAxios.post('/signup', { userEmail, password, userNickName });
    return res.data;
  } catch (error) {
    console.error('에러발생');
  }
}

export async function getUser(userEmail: string, token: string): Promise<UserInterface | undefined> {
  try {
    const res = await userRestaurentAxios.get(`/user/${userEmail}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('유저 정보를 가져올 수 없습니다.');
  }
}

export async function userUpdate(
  userEmail: string,
  userNickName: string,
  password?: string,
  newPassword?: string,
  confirmNewPassword?: string,
  userImg?: string,
): Promise<UserInterface | undefined> {
  try {
    const res = await userRestaurentAxios.put(`/user/update/${userEmail}`, {
      password,
      newPassword,
      confirmNewPassword,
      userNickName,
      userImg,
    });
    return res.data;
  } catch (error) {
    console.error('업데이트 실패', error);
  }
}

//유저 스토어 정보

export async function getUserRestaurent(userEmail: string, token: string): Promise<Restaurant[] | undefined> {
  try {
    const res = await userRestaurentAxios.get(`/user/${userEmail}/restaurant`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log('유저의 스토어 정보를 가져올 수 없습니다.');
  }
}
