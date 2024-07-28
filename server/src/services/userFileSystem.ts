import path from 'path';
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import multer from 'multer';
import UserInterface from '../models/user.Interface';
import { UserStore } from '../models/user.Interface';
import { v4 as uuidv4 } from 'uuid';

const userDataFilePath = path.join(__dirname, '..', 'data', 'userData.json');

// 유저 데이터 파일에서 아이디로 유저를 찾는 함수
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
    return await findUserbyId(userEmail);
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
    throw error;
  }
}

// 유저 이미지 저장

const userImgUrl = '/Users/jeontaejeong/Documents/Coding/Project/MyRestaurantList/server/src/data/userImg';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, userImgUrl);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

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

async function findStorebyId(userEmail: string): Promise<UserStore[] | undefined> {
  try {
    const user = await findUserbyId(userEmail);
    if (user && user.userStore) {
      return user.userStore;
    }
  } catch (error) {
    console.error('유저 데이터를 찾는데 오류 발생', error);
  }
}

async function getStore(userEmail: string): Promise<UserStore[] | undefined> {
  try {
    return await findStorebyId(userEmail);
  } catch (error) {
    console.error('스토어 정보를 가져오지 못했습니다.', error);
  }
}
//유저의 맛집 리스트 중 특정 스토어만 가져 오는 함수
async function getOneStore(userEmail: string, storeId: string): Promise<UserStore | undefined> {
  try {
    const store = await findStorebyId(userEmail);
    return store?.find((place) => place.storeId === storeId);
  } catch (error) {
    console.error('스토어 정보를 가져오지 못했습니다.', error);
  }
}

// 유저의 맛집을 생성하는 함수
async function createStore(newStore: UserStore, userEmail: string): Promise<UserStore | undefined> {
  try {
    const data = await fs.readFile(userDataFilePath, 'utf8');
    const users: UserInterface[] = JSON.parse(data);

    const existUser = users.find((user) => user.userEmail === userEmail);
    if (!existUser) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    newStore.storeId = uuidv4();

    existUser.userStore = existUser.userStore ? [...existUser.userStore, newStore] : [newStore];
    await fs.writeFile(userDataFilePath, JSON.stringify(users, null, 2), 'utf8');
    console.log('스토어 생성 완료!');

    return newStore;
  } catch (error) {
    console.error('스토어 추가 중 오류!', error);
    throw error;
  }
}

// 유저의 맛집을 수정하는 함수
async function updateStore(
  userEmail: string,
  storeDate: {
    storeId: string;
    placeName: string;
    foodType: string;
    address: string;
    imageUrl?: string;
    review?: string;
    visitedDate?: string[];
  },
): Promise<UserInterface | undefined> {
  try {
    const data = await fs.readFile(userDataFilePath, 'utf8');
    const users: UserInterface[] = JSON.parse(data);

    const existUser = users.find((user) => user.userEmail === userEmail);
    if (!existUser) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    const store = existUser.userStore?.find((place) => place.storeId === storeDate.storeId);
    if (!store) {
      throw new Error('일치하는 맛집이 없습니다.');
    }

    store.placeName = storeDate.placeName;
    store.address = storeDate.address;
    store.foodType = storeDate.foodType;
    if (storeDate.imageUrl) store.imageUrl = storeDate.imageUrl;
    if (storeDate.review) store.review = storeDate.review;
    if (storeDate.visitedDate !== undefined) store.visitedDate = storeDate.visitedDate;

    await fs.writeFile(userDataFilePath, JSON.stringify(users, null, 2), 'utf8');
    return existUser;
  } catch (error) {
    console.error('업데이트에 실패했습니다.', error);
    return undefined;
  }
}

// 유저의 맛집 일부를 삭제하는 함수
async function deleteOneStore(userEmail: string, storeId: string): Promise<UserStore | undefined> {
  try {
    const data = await fs.readFile(userDataFilePath, 'utf8');
    const users: UserInterface[] = JSON.parse(data);

    const existUser = users.find((user) => user.userEmail === userEmail);

    if (!existUser) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    const storeIndex = existUser.userStore?.findIndex((place) => place.storeId === storeId);
    if (storeIndex === undefined || storeIndex === -1) {
      throw new Error('스토어를 찾을 수 없습니다.');
    }

    const [deletedStore] = existUser.userStore!.splice(storeIndex, 1);
    await fs.writeFile(userDataFilePath, JSON.stringify(users, null, 2), 'utf8');

    return deletedStore;
  } catch (error) {
    console.error('삭제 실패', error);
    throw error;
  }
}

// 유저 탈퇴하는 함수

export default {
  getUser,
  createUser,
  userUpdate,
  getStore,
  getOneStore,
  createStore,
  updateStore,
  deleteOneStore,
  upload,
};
