import axios from 'axios';
import UserInterface from '../src/models/user.interface';
import { UserStore } from '../src/models/user.interface';
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
      console.log('로그인에 성공했습니다.');
      return { token, user };
    } else {
      throw new Error('유저 아이디가 일치하지 않습니다.');
    }
  } catch (error) {
    console.error('로그인 에러 발생');
    throw error;
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
// 유저 정보 업데이트
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

export async function getUserStore(userEmail: string, token: string): Promise<UserStore[] | undefined> {
  try {
    const res = await userRestaurentAxios.get(`/user/${userEmail}/store`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log('유저의 스토어 정보를 가져올 수 없습니다.');
  }
}

// 유저의 특정 스토어 정보

export async function getOneUserStore(
  userEmail: string,
  storeId: string,
  token: string,
): Promise<UserStore | undefined> {
  try {
    const res = await userRestaurentAxios.get(`/user/${userEmail}/store/${storeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log('유저의 스토어 정보를 가져올 수 없습니다.');
  }
}

// 유저의 스토어를 만듦

export async function createStore(
  userEmail: string,
  placeName: string,
  foodType: string,
  address: string,
  imageUrl: string,
  review: string,
  visitedDate: string[],
  token: string,
): Promise<UserStore | undefined> {
  try {
    const res = await userRestaurentAxios.post(
      `/user/${userEmail}/store`,
      {
        placeName,
        foodType,
        address,
        imageUrl,
        review,
        visitedDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('스토어 생성 완료!');
    return res.data;
  } catch (error) {
    console.log('유저의 스토어를 생성할 수 없습니다.');
  }
}

//유저의 스토어를 업데이트

export async function updateStore(
  storeId: string,
  userEmail: string,
  token: string,
  placeName: string,
  foodType: string,
  address: string,
  imageUrl?: string,
  review?: string,
  visitedDate?: string[],
): Promise<UserStore | undefined> {
  try {
    const res = await userRestaurentAxios.put(
      `/user/${userEmail}/store/update/${storeId}`,
      {
        placeName,
        foodType,
        address,
        imageUrl,
        review,
        visitedDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.log('유저의 스토어 업데이트에 실패했습니다.');
  }
}

// 유저의 특정 스토어를 삭제
export async function deleteOneStore(
  userEmail: string,
  storeId: string,
  token: string,
): Promise<UserStore | undefined> {
  try {
    const res = await userRestaurentAxios.delete(`/user/${userEmail}/store/${storeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log('유저의 스토어 삭제에 실패했습니다.', error);
  }
}
