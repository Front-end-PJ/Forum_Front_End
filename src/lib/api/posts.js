import qs from "qs";
import client from "./client";
// 게시판 목록 불러오기
export const getBoard = (posts) => (posts = client.get(`/board`));

// 글쓰기
export const writePost = ({ title, pk, content }) => {
  const queryString = qs.stringify({
    title,
    pk,
    content,
  });
  console.log("postitem", queryString);
  return client.post("/post", queryString);
};

// 댓글 쓰기
export const writeCommnet = ({ pk, content }) => {
  const queryString = qs.stringify({
    pk,
    content,
  });
  console.log(("query", queryString));
  return client.post("/reply", queryString);
};

// 글 수정하기
export const updatePost = ({ pk, content }) => {
  const queryString = qs.stringify({
    pk,
    content,
  });
  return client.put("/post", queryString);
};

// 댓글 수정하기
export const changeComment = ({ pk, content }) => {
  const queryString = qs.stringify({
    pk,
    content,
  });
  return client.put("/reply", queryString);
};
// 대댓글 수정하기
export const changeReComment = ({ pk, content }) => {
  const qeryString = qs.stringify({
    pk,
    content,
  });
  return client.put("/answer_reply", qeryString);
};

// 댓글 삭제하기
export const deleteComment = ({ pk }) => {
  const queryString = qs.stringify({ pk });
  console.log("hajsdfhajsdf", pk);
  return client.delete("/reply", {
    data: queryString,
  });
  // return client.delete("/reply", queryString);
};

export const deleteRecomment = ({ pk }) => {
  const queryString = qs.stringify({ pk });
  return client.delete("/answer_reply", { data: queryString });
};

// 글 삭제하기
export const deletePost = ({ pk }) => {
  const queryString = qs.stringify({ pk });
  return client.delete("/post", { data: queryString });
};

export const writeReCommnet = ({ pk, content }) => {
  const queryString = qs.stringify({
    pk,
    content,
  });
  return client.post(`/answer_reply?pk=${pk}`, queryString);
};

// 댓글 읽어오기
export const readComment = (id) => client.get(`/reply?pk=${id}`);

// 모든 댓글 읽어오기
export const readComments = (id) => client.get(`/replies?pk=${id}`);

// 대댓글 읽어오기
export const readRecoment = (id) => client.get(`/answer_reply?pk=${id}`);

// 글 읽어오기
export const readPost = ({ id, start, end }) =>
  client.get(`/post?pk=${id}&start=${start}&end=${end}`);
