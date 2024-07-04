import express, { Request, Response } from 'express';
import userFileSystem from './services/userFileSystem';
import cors from 'cors';
import UserInterface from './models/user.Interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const port = 4000;
const secretKey = 'secreat_dont_share';

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
  const { userEmail, password } = req.body;
  console.log(userEmail, password);
  try {
    const user = await userFileSystem.getUser(userEmail);
    console.log(user);
    if (user) {
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (passwordIsValid) {
        const token = jwt.sign({ userEmail: user.userEmail }, secretKey, { expiresIn: '10min' });
        res.status(200).send({
          message: '로그인 성공',
          user: {
            userEmail: user.userEmail,
            userNickName: user.userNickName,
          },
          token,
        });
      } else {
        res.status(401).send({ message: '비밀번호가 다릅니다.' });
      }
    } else {
      res.status(401).send({ message: '사용자를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('로그인 에러', error);
  }
});

app.post('/signup', async (req, res) => {
  const { userEmail, password, userNickName } = req.body;
  console.log(userEmail, password, userNickName);

  try {
    const newUser = await userFileSystem.createUser({
      userEmail,
      password,
      userNickName,
      userType: '맛집 탐험가 🔍',
      userImg: '',
      userRestaurent: [],
    } as UserInterface);

    if (!newUser?.userEmail) {
      return res.status(400).send({ message: '동일한 이메일이 존재합니다.' });
    } else if(!newUser?.userNickName) {
      return res.status(400).send({message : '동일한 닉네임이 존재합니다.'})
    }
    res.status(200).send({ message: '회원가입 성공!', userEmail: userEmail, userNickName: userNickName });
  } catch (error) {
    console.error('회원가입에 실패 했습니다.');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
