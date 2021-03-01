// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import { readRecomment } from '../../modules/comment';
// import PostRecommentItem from '../../components/post/PostRecommentItem';

// const PostRecommentContainer = ({ id }) => {
//   const { recomment, recommentdata, user } = useSelector(
//     ({ comment, user, commentwrite }) => ({
//       recomment: comment.recomment,
//       recommentdata: comment.recommentdata,
//       user: user.user,
//     }),
//   );

//   const dispatch = useDispatch();

//   useEffect(() => {
//     // dispatch(readPost(postId));
//     // 언마운트될 때 리덕스에서 포스트 데이터 없애기
//     dispatch(initialize());
//     dispatch(readRecomment(id));
//     return () => {
//       dispatch(initialize());
//     };
//   }, [dispatch]);
//   const onClickRe = () => {};
//   return <PostRecommentItem></PostRecommentItem>;
// };

// export default withRouter(PostRecommentContainer);
