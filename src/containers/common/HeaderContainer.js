import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Headers from "../../components/common/Headers";
import { readBoard, toggleMenu } from "../../modules/posts";
import { logout } from "../../modules/user";

const HeaderContainer = () => {
  const { user, toggle, boards, data } = useSelector(({ user, posts }) => ({
    user: user.user,
    toggle: posts.toggle,
    boards: posts.boards,
    data: posts.data,
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  //게시판 목록 불러오기
  useEffect(() => {
    dispatch(readBoard());
  }, [dispatch]);
  const onClick = () => {
    dispatch(toggleMenu(toggle));
  };
  return (
    <>
      <Headers
        user={user}
        onLogout={onLogout}
        onClick={onClick}
        boards={boards}
        data={data}
      />
    </>
  );
};

export default HeaderContainer;
