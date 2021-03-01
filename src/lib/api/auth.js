import client from './client';
import qs from 'qs';

// 회원가입

export const register = ({ username, email, password }) =>
  client.post('/register', qs.stringify({ username, email, password }));

// 로그인
export const login = ({ username, password }) =>
  client.post('/login', qs.stringify({ username, password }));

// 로그인 상태 확인
export const check = (user) => client.get(`/user?username=${user}`);

// 로그아웃
export const logout = () => client.get('/logout');
