import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Side from "../../components/common/Side";

const SideContainer = () => {
   const { user, toggle, boards, data } = useSelector(({ user, posts }) => ({
      user: user.user,
      toggle: posts.toggle,
      boards: posts.boards,
      data: posts.data,
   }));
   return <Side></Side>;
};

export default SideContainer;
