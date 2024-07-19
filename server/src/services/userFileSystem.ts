import path from 'path';
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import UserInterface from '../models/user.Interface';
import { Restaurant } from '../models/user.Interface';
import { v4 as uuidv4 } from 'uuid';

const userDataFilePath = path.join(__dirname, '..', 'data', 'userData.json');

// 유저 데이터 파일에서 이메일로 유저를 찾는 함수
async function findUserbyId(userEmail: string): Promise<UserInterface | undefined> {
  try {
    const data = await fs.readFile(userDataFilePath, 'utf8');
    console.log(userDataFilePath);
    const users: UserInterface[] = JSON.parse(data);
    return users.find((user) => user.userEmail === userEmail);
  } catch (error) {
    console.error('유저 데이터를 찾는데 오류 발생', error);
  }
}

// 유저 데이터를 가져오는 함수
async function getUser(userEmail: string): Promise<UserInterface | undefined> {
  try {
    const user = await findUserbyId(userEmail);
    return user;
  } catch (error) {
    console.error('정보를 가져오지 못했습니다.', error);
  }
}

// 새로운 유저를 생성하는 함수
async function createUser(newUser: UserInterface): Promise<UserInterface | undefined> {
  try {
    const users = JSON.parse(await fs.readFile(userDataFilePath, 'utf8')) as UserInterface[];
    const existUser = users.find((user) => user.userEmail === newUser.userEmail);
    const existUserNickName = users.find((user) => user.userNickName === newUser.userNickName);
    if (!existUser && !existUserNickName) {
      const saltRound = 10;
      const hashedPassword = await bcrypt.hash(newUser.password, saltRound);
      newUser.password = hashedPassword;
      users.push(newUser);
      await fs.writeFile(userDataFilePath, JSON.stringify(users, null, 2), 'utf8');
      return newUser;
    } else if (existUser) {
      throw new Error('이미 존재하는 사용자입니다.');
    } else {
      throw new Error('이미 존재하는 닉네임입니다.');
    }
  } catch (error) {
    console.error('회원가입 중 오류가 발생했습니다.', error);
    throw error; // 추가: 에러를 던져서 호출자가 처리하도록 합니다.
  }
}

// 기존 유저 정보를 업데이트 하는 함수

interface UserUpdateInterface {
  userEmail: string;
  userNickName: string;
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  userImg?: string;
}

async function userUpdate(
  userEmail: string,
  updateUser: Partial<UserUpdateInterface> & {
    userNickName: string;
    password?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  },
): Promise<UserInterface | undefined> {
  try {
    const data = await fs.readFile(userDataFilePath, 'utf8');
    const users: UserInterface[] = JSON.parse(data);

    const findUser = users.findIndex((user) => user.userEmail === userEmail);
    if (findUser === -1) {
      console.log('유저를 찾을 수 없습니다.');
      return undefined;
    }

    let user = users[findUser];

    if (updateUser.password) {
      const passwordMatch = await bcrypt.compare(updateUser.password!, user.password);
      if (!passwordMatch) {
        console.log('기존 비밀번호가 일치하지 않습니다.');
        return undefined;
      }

      if (updateUser.newPassword && updateUser.newPassword === updateUser.confirmNewPassword) {
        const saltRound = 10;
        user.password = await bcrypt.hash(updateUser.newPassword, saltRound);
      } else if (updateUser.newPassword !== updateUser.confirmNewPassword) {
        console.log('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
        return undefined;
      }
    }

    if (updateUser.userNickName) {
      user.userNickName = updateUser.userNickName;
    } else {
      alert('닉네임은 필수입니다.');
      return undefined;
    }

    if (updateUser.userImg) {
      user.userImg = updateUser.userImg;
    }

    users[findUser] = user;

    await fs.writeFile(userDataFilePath, JSON.stringify(users, null, 2), 'utf8');
    console.log(`유저 정보 업데이트 성공!`, user);
    return user;
  } catch (error) {
    console.error('유저 정보 업데이트 실패');
    throw error;
  }
}

// 유저의 맛집 리스트를 불러오는 함수

async function findStorebyId(userEmail: string): Promise<Restaurant[] | undefined> {
  try {
    const data = await fs.readFile(userDataFilePath, 'utf8');
    console.log(userDataFilePath);
    const users: UserInterface[] = JSON.parse(data);

    const user = users.find((user) => user.userEmail === userEmail);

    if (user && user.userRestaurent) {
      return user.userRestaurent;
    }
  } catch (error) {
    console.error('유저 데이터를 찾는데 오류 발생', error);
  }
}

async function getRestaruantData(userEmail: string): Promise<Restaurant[] | undefined> {
  try {
    const store = await findStorebyId(userEmail);
    return store;
  } catch (error) {
    console.error('스토어 정보를 가져오지 못했습니다.', error);
  }
}

// 유저의 맛집 리스트 아이템을 생성하는 함수
async function createStore(newStore: Restaurant, userEmail: string): Promise<Restaurant | undefined> {
  try {
    const data = await fs.readFile(userDataFilePath, 'utf8');
    const users: UserInterface[] = JSON.parse(data);

    const existUser = users.find((user) => user.userEmail === userEmail);
    if (!existUser) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    newStore.storeId = uuidv4();

    existUser.userRestaurent?.push(newStore);
    await fs.writeFile(userDataFilePath, JSON.stringify(users, null, 2), 'utf8');

    return newStore;
  } catch (error) {
    console.error('스토어 추가 중 오류!', error);
    throw error;
  }
}

// 유저의 맛집 리스트 아이템을 수정하는 함수
async function updateStore(
  userEmail: string,
  storeDate: {
    storeId: string;
    placeName: string;
    foodType: string;
    address: string;
    imageUrl?: string;
    review?: string;
    visitsCount?: number;
  },
): Promise<UserInterface | undefined> {
  try {
    const data = await fs.readFile(userDataFilePath, 'utf8');
    const users: UserInterface[] = JSON.parse(data);

    const existUser = users.find((user) => user.userEmail === userEmail);
    if (!existUser) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    const store = existUser.userRestaurent?.find((place) => place.storeId === storeDate.storeId);
    if (!store) {
      throw new Error('일치하는 맛집이 없습니다.');
    }

    store.placeName = storeDate.placeName;
    store.address = storeDate.address;
    store.foodType = storeDate.foodType;
    if (storeDate.imageUrl) store.imageUrl = storeDate.imageUrl;
    if (storeDate.review) store.review = storeDate.review;
    if (storeDate.visitsCount !== undefined) store.visitsCount = storeDate.visitsCount;

    await fs.writeFile(userDataFilePath, JSON.stringify(users, null, 2), 'utf8');
    return existUser;
  } catch (error) {
    console.error('업데이트에 실패했습니다.', error);
    return undefined;
  }
}

// 유저의 맛집 리스트의 일부를 삭제하는 함수
async function deleteOneStore() {}

// 유저 탈퇴하는 함수

export default { getUser, createUser, userUpdate, getRestaruantData, createStore, updateStore, deleteOneStore };
