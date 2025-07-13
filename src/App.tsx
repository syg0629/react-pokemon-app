// uuid는 js로 만들어진 파일이기 때문에 ts프로젝트에서 오류가 남.
// uuid.d.ts 파일을 만들어서 타입을 정의해주면 오류가 사라짐.(자바스크립트로 된 모듈에 type을 지정해 주는 방법 => .d.ts파일 생성)
// 그런데 uuid.d.ts가 아닌 다른 파일을 만들면 아래왁 같은 삼중 주석으로 path를 정해주면 사용 가능.
//// <reference path="./main.d.ts" />
// 하지만 https://github.com/DefinitelyTyped/DefinitelyTyped에 있는 이미 정의된 타입을 가져다 쓰는 것이 좋음.
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <br />
      <br />
      <br />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/pokemon/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
