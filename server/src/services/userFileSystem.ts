import path from 'path';
import fs from 'fs/promises';
import UserInterface from '../models/user.Interface';

const userDataFilePath = path.join(__dirname, '..', 'data', 'userData.json');

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

async function getUser(userEmail: string): Promise<UserInterface | undefined> {
  try {
    const user = await findUserbyId(userEmail);
    return user;
  } catch (error) {
    console.error('정보를 가져오지 못했습니다.', error);
  }
}

export default { getUser };
