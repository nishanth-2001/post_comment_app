import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PostCard from "../components/posts/cards";
import Pagination from "@mui/material/Pagination";

import Comments from "../components/posts/comments";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const limit = 4;

const PostsPage = () => {
  const navigate = useNavigate()
  const [postData, setPostData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);
  const [activePost, setActivePost] = useState(null);
  const [postTitle, setPostTitle] = useState("");

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      const start = (currentPage - 1) * limit;
      const response = await fetch(
        `http://localhost:3000/posts?_start=${start}&_limit=${limit}`,
        { method: "GET" }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong....");
      }
      const jsonData = await response.json();
      const totalCount = response.headers.get("x-total-count");
      if (totalCount && !isNaN(totalCount)) {
        const count = Math.ceil(Number(totalCount) / limit);
        setPageCount(count);
      } else {
        setPageCount(1);
      }
      return jsonData;
    };

    getPost()
      .then((initialData) => {
        setPostData(initialData);
      })
      .catch((err) => {
        setErrorMessage(err?.message || err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  if (loading) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            minHeight: "80vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (errorMessage.length > 0) {
    return (
      <>
        <Container>
          <Typography
            sx={{ textAlign: "center", mt: "20%" }}
            variant="h3"
            gutterBottom
          >
            {errorMessage}
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <div
          style={{
            display: "flex",
            marginTop: "15px",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Button
          onClick={()=>{
            navigate("/posts/new")
          }}
          variant="contained">
            +&nbsp;&nbsp;New Post{/**2space leaving */}
            </Button>
        </div>
        <Grid sx={{ mt: "50px" }} container spacing={2}>
          {postData.map((post) => {
            return (
              <Grid key={post.id} xs={12} sm={12} md={6} lg={4}>
                <PostCard
                  handleClick={(postId, newPostTitle) => {
                    setActivePost(postId);
                    setPostTitle(newPostTitle);
                  }}
                  post={post}
                />
              </Grid>
            );
          })}
        </Grid>

        <Pagination
          count={pageCount}
          page={currentPage}
          color="primary"
          onChange={(e, newPage) => {
            setcurrentPage(newPage);
          }}
          sx={{ my: 3 }}
        />

        <Comments
          open={activePost !== null}
          handleClose={() => {
            setActivePost(null);
            setPostTitle("");
          }}
          postId={activePost}
          postTitle={postTitle}
        />
      </Container>
    </>
  );
};

export default PostsPage;
