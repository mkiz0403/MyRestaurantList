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

//로그인
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

// 회원가입
app.post('/signup', async (req, res) => {
  const { userEmail, password, userNickName } = req.body;
  console.log(userEmail, password, userNickName);

  try {
    const newUser = await userFileSystem.createUser({
      userNickName: userNickName,
      userEmail: userEmail,
      password: password,
      userImg: '',
      userType: '맛집 탐험가 🧭',
      userRestaurent: [],
      newPassword: '',
      confirmNewPassword: '',
    });

    if (!newUser?.userEmail) {
      return res.status(400).send({ message: '동일한 이메일이 존재합니다.' });
    } else if (!newUser?.userNickName) {
      return res.status(400).send({ message: '동일한 닉네임이 존재합니다.' });
    }
    res.status(200).send({ message: '회원가입 성공!', userEmail: userEmail, userNickName: userNickName });
  } catch (error) {
    console.error('회원가입에 실패 했습니다.');
  }
});

// 유저 불러오기
app.get('/user/:userEmail', async (req, res) => {
  const { userEmail } = req.params;

  try {
    const user = await userFileSystem.getUser(userEmail);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('정보를 가져오지 못했습니다.', error);
    res.status(500).json({ message: '유저 정보를 가져오는 중 오류가 발생했습니다.' });
  }
});

// 유저 업데이트
app.put('/user/update/:userEmail', async (req, res) => {
  const { password, userNickName, userImg, newPassword, confirmNewPassword } = req.body;
  const userEmail = req.params.userEmail;

  try {
    const updatedUser = await userFileSystem.userUpdate(userEmail, {
      password,
      userNickName,
      userImg,
      newPassword,
      confirmNewPassword,
    });

    if (updatedUser) {
      res.status(200).json({ message: '업데이트가 성공했습니다.', user: updatedUser });
    } else {
      res.status(400).json({ message: '유저 정보를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('업데이트 실패');
    res.status(500).json({ message: '업데이트 중 오류 발생!!!' });
  }
});

// 유저의 스토어 정보 불러오기
app.get('/user/:userEmail/restaurnet', async (req, res) => {
  const { userEmail } = req.params;

  try {
    const store = await userFileSystem.getRestaruantData(userEmail);
    if (store) {
      res.status(200).json(store);
    } else {
      res.status(404).json({ message: '유저의 스토어 정보를 찾을 수 없습니다' });
    }
  } catch (error) {
    console.error('레스토랑 불러오기 실패');
    res.status(500).json({ message: '유저 스토어 정보를 가져오는 중 오류가 발생했습니다.' });
  }
});

// 특정 스토어 정보 불러오기
app.get('/user/:userEmail/restaurant/:storeId', async (req, res) => {
  try {
  } catch (error) {
    console.error('일치하는 음식점이 없습니다.');
  }
});

// 스토어 등록하기
app.post('/user/:userEmail/restaurant', async (req, res) => {
  try {
  } catch (error) {
    console.error('음식점 생성 실패');
  }
});

// 스토어 정보 업데이트 하기
app.put('/user/:userEmail/restaurant/update/:storeId', async (req, res) => {
  try {
  } catch (error) {
    console.error('음식점 업데이트 실패');
  }
});

// 스토어 삭제하기
app.delete('/user/:userEmail/restaurant/:storeId', async (req, res) => {
  try {
  } catch (error) {
    console.error('음식점 삭제 실패');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
