import "./LoginPage.css";
import { useState } from "react";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

function LoginPage() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveLoginInfo, setSaveLoginInfo] = useState(false);

  async function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (!userEmail) {
      alert("등록된 아이디가 아닙니다.");
      return;
    }

    if (!password) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }

    try {
      console.log("로그인 성공!");
      console.log(userEmail, password);
      if (saveLoginInfo) {
        localStorage.setItem("userId", userEmail);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("userId");
        localStorage.removeItem("password");
      }
      navigate("/");
      console.log(saveLoginInfo);
    } catch (error) {
      console.error("로그인 실패");
    }
  }

  return (
    <div className="loginMain">
      <Box component="form" noValidate autoComplete="off">
        <div>
          <h1>로그인</h1>
        </div>
        <div>
          <TextField
            required
            id="userEmail"
            label="유저 이메일"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            sx={{ mb: "1rem", width: "20rem" }}
          />
        </div>
        <div>
          <TextField
            required
            id="password"
            label="패스트워드"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: "0.5rem", width: "20rem" }}
          />
        </div>
        <div className="checkbox">
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                checked={saveLoginInfo}
                onChange={() => setSaveLoginInfo(!saveLoginInfo)}
              />
            }
            label="자동 입력"
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            onClick={handleLogin}
            sx={{ mb: "1rem", width: "20rem" }}
          >
            로그인 하기
          </Button>
        </div>
        <div className="signup">
          <p> 회원이 아니시라면 👉</p>
          <Link to={"./signup"}> 회원 가입하기 </Link>
        </div>
      </Box>
    </div>
  );
}
export default LoginPage;
