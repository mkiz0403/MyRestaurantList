import path from 'path';
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import UserInterface from '../models/user.Interface';

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

async function userUpdate(userEmail: string, updateUser: UserInterface): Promise<UserInterface | undefined> {
  try {
    const data = await fs.readFile(userDataFilePath, 'utf8');
    const users: UserInterface[] = JSON.parse(data);

    const findUser = users.findIndex((user) => user.userEmail === userEmail);
    if (!findUser) {
      console.log('유저를 찾을 수 없습니다.');
    }

    let user = users[findUser];

    if (updateUser.password) {
      const saltRound = 10;
      user.password = await bcrypt.hash(updateUser.password, saltRound);
    }

    if (updateUser.userNickName) {
      user.userNickName = updateUser.userNickName;
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
  // 유저 데이터 파일을 읽는다.
  // 해당 유저와 일치하는 유저의 데이터를 찾는다
  // 기존 유저의 데이터를 가져온다.
  // 업데이트할 필드만 업데이트 한다.
  // 업데이트한 유저의 데이터 저장
  // 파일 저장
}

// 유저의 맛집 리스트를 불러오는 함수

async function getRestaruantData() {}

// 유저의 맛집 리스트 아이템을 생성하는 함수
async function createItem() {}

// 유저의 맛집 리스트 아이템을 수정하는 함수
async function updateItem() {}

// 유저의 맛집 리스트의 일부를 삭제하는 함수
async function deleteOneItem() {}

// 유저 탈퇴하는 함수

export default { getUser, createUser, userUpdate, getRestaruantData, createItem, updateItem, deleteOneItem };
