import client from "./client";
import qs from "qs";

// 회원가입

export const register = ({ username, nickname, email, password }) =>
  client.post(
    "/register",
    qs.stringify({ username, nickname, email, password })
  );

// 로그인
export const login = ({ username, password }) =>
   client.post("/login", qs.stringify({ username, password }));

// 로그인 상태 확인
export const check = client.get("/login");

// 로그아웃
export const logout = () => client.get("/logout");
