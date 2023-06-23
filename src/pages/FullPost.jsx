import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import { useSelector } from "react-redux";

export const FullPost = () => {
  const { id } = useParams();
  const { data } = useSelector((state) => state.auth);
  const [post, setPost] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={true} isFullPost />;
  }

  return (
    <>
      <Post
        id={post._id}
        title={post.title}
        imageUrl={
          post.imageUrl ? new URL(post.imageUrl, process.env.REACT_APP_API_URL).toString() : ""
        }
        user={post.user}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={post.comments.length}
        tags={post.tags}
        isFullPost
      >
        <ReactMarkdown children={post.text} />
      </Post>
      <CommentsBlock
        items={post.comments}
        // items={[
        //   {
        //     user: {
        //       fullName: "Poks Lewz" ,
        //       avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
        //     },
        //     text: "This is a test comment 7777",
        //   },
        //   {
        //     user: {
        //       fullName: "Vova Loldr",
        //       avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
        //     },
        //     text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
        //   },
        // ]}
        isLoading={false}
      >
        {data?._id && <Index post={post} setPost={setPost} />}
      </CommentsBlock>
    </>
  );
};
