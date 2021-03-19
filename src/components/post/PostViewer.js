import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import { withRouter } from "react-router-dom";

const PostViewerBlock = styled(Responsive)`
   margin-top: 4rem;
`;
const PostHead = styled.div`
   border-bottom: 1px solid ${palette.gray[2]};
   padding-bottom: 3rem;
   margin-bottom: 3rem;
   @media (max-width: 768px) {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
   }
   h1 {
      @media (max-width: 768px) {
         margin-left: 1rem;
         font-size: 2rem;
         padding-top: 0;
      }

      padding-top: 2rem;
      font-size: 3rem;
      line-height: 1.5;
      margin: 0;
   }
   span {
      font-size: 0.8rem;
   }
`;

const SubInfoinPost = styled.div`
   margin-top: 2rem;
   display: flex;
   margin-left: 1rem;
   font-size: 1rem;
   box-sizing: border-box;
   span + span {
      margin-left: 0.25rem;
      margin-right: 0.25rem;
   }
   span.name {
      margin-left: -0.8rem;
      @media (max-width: 768px) {
         margin-left: 0;
      }
      font-weight: bold;
   }
   span.content {
      margin-left: 0;
      font-weight: normal;
   }
`;

const PostContent = styled.div`
   font-size: 1.3125rem;
   @media (max-width: 768px) {
      margin-top: -1rem;
      width: 100%;
      margin-left: 1rem;
      font-size: 1rem;
   }
   color: ${palette.gray[8]};
`;

const PostViewer = ({
   error,
   loading,
   actionButtons,
   postId,
   postsdata,
   ownPost,
}) => {
   // const [set, onSet] = useState(false);
   // 에러 발생 시
   if (error) {
      if (error.response && error.response.status === 404) {
         return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
      }
      console.log(error);
      return <PostViewerBlock>오류 발생!</PostViewerBlock>;
   }

   // 로딩중이거나, 아직 포스트 데이터가 없을 시
   if (loading) {
      return null;
   }

   const _postId = parseInt(postId, 10);
   // postsdata 배열에서 주소와 일치하는 post 찾기
   let _data =
      postsdata &&
      postsdata.find((x) => {
         return x.pk === _postId;
      });
   // redirecting(새로고침)에서 데이터 사라짐 방지용 localStorage 저장
   if (_data !== null) {
      localStorage.setItem("data", JSON.stringify(_data));
   } else {
      _data = JSON.parse(localStorage.getItem("data"));
   }
   const { title, content, writeAt } = _data.fields;
   let postDate = writeAt.split("T");
   ownPost(_data.fields.author.fields.username);
   let post_id = _data.fields.author.fields.username;

   return (
      <PostViewerBlock>
         <PostHead>
            <h1>{title}</h1>
            <SubInfoinPost>
               <span className="name">{post_id}</span>
               <span>·</span>
               <span className="content">{postDate[0]}</span>
            </SubInfoinPost>
         </PostHead>

         {actionButtons}
         <PostContent dangerouslySetInnerHTML={{ __html: content }} />

         <PostHead />
      </PostViewerBlock>
   );
};

export default withRouter(PostViewer);
