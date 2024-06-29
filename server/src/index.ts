import express, { Request, Response } from 'express';
import userFileSystem from './services/userFileSystem';

const app = express();
const port = 4000;

app.use(express.json());

app.post('/login', async (req, res) => {
  const { userEmail, password } = req.body;
  console.log(userEmail, password);
  try {
    const user = await userFileSystem.getUser(userEmail);
    console.log(user);
    if (user) {
      if (user.password === password) {
        res.status(200).send({
          message: '로그인 성공',
          user: {
            userEmail: user.userEmail,
            userNickName: user.userNickName,
          },
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
