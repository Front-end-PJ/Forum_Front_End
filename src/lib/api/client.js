import axios from "axios";

// axios 인스턴스 생성

const client = axios.create();

// // 글로벌 설정

// // API 주소 다른 곳 사용
client.defaults.baseURL = "https://djangocrudboard.ml";
client.defaults.withCredentials = true;
client.withCredentials = true;

// //header
// client.defaults.headers.common['Authorization'] = '주소';

// //인터셉터
// axios.intercepter.response.use(
//     response => {
//         //요청 성공시 특정 작업
//         return response;
//     },
//     error => {
//         //요청 실패 시 특정 작업
//         return Promise.reject(error);
//     }
// )
export default client;
