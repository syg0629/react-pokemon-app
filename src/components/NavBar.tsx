import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  type User,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import app from "../firebase";
import storage from "../utils/storage";

// const userDataFromLocalStorage = localStorage.getItem("userData");

// const initialUserData = userDataFromLocalStorage
//   ? JSON.parse(userDataFromLocalStorage)
//   : null;

const initialUserData = storage.get<User>("userData");

const NavBar = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState<User | null>(initialUserData);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else if (user && pathname === "/login") {
        navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [pathname]);

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        // localStorage.setItem("userData", JSON.stringify(result.user));
        storage.set("userData", result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const listener = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // localStorage.removeItem("userData");
        storage.remove("userData");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <NavWrapper show={show}>
      <Logo>
        <Image
          alt="Poke logo"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>
      {pathname === "/login" ? (
        <Login onClick={handleAuth}>로그인</Login>
      ) : (
        <SignOut>
          {userData?.photoURL && (
            <UserImg src={userData.photoURL} alt="user photo" />
          )}
          <DropDown>
            <span onClick={handleLogout}>Sign Out</span>
          </DropDown>
        </SignOut>
      )}
    </NavWrapper>
  );
};

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 6px;
  text-transform: uppercase;
  letter-spacing: 1.55px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  color: white;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Image = styled.img`
  cursor: pointer;
  width: 100%;
`;

const Logo = styled.a`
  padding: 0;
  width: 50px;
  margin-top: 4px;
`;

const NavWrapper = styled.nav<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 100;
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  color: white;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default NavBar;
