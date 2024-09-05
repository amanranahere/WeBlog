import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Transition from "../components/transition";
import Loader from "../components/Loader";

function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          setLoading(false);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > window.innerHeight * 0.5) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const deletePost = () => {
    setLoading(true);
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return post ? (
    <Container>
      <div className="relative flex flex-col items-end">
        <div
          className={`w-full h-100vh flex justify-center items-center mb-4 lg:sticky lg:top-0 sm:transition-none md:transition-none lg:transition-transform duration-700 ${
            scrolled
              ? "sm:transform-none md:transform-none lg:transform lg:-translate-x-2/3"
              : ""
          }`}
        >
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="max-h-full max-w-full object-cover"
          />

          {isAuthor && (
            <div>
              <div className="absolute right-4 top-12 sm:right-10 sm:top-20">
                <Link to={`/edit-post/${post.$id}`}>
                  <button className="edit-button">
                    <svg className="edit-svgIcon" viewBox="0 0 512 512">
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                    </svg>
                  </button>
                </Link>
              </div>

              <div className="absolute right-4 top-28 sm:right-10 sm:top-40">
                <button onClick={deletePost} className="button">
                  <svg viewBox="0 0 448 512" className="svgIcon">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="w-full lg:w-2/3 pt-10 lg:pt-80 pb-4 text-xl lg:text-2xl flex flex-col justify-center items-end">
          <div className="w-full mb-4 lg:mb-6">
            <h1 className="text-4xl lg:text-6xl px-4 lg:px-20 font-bold font-Lato">
              {post.title}
            </h1>
          </div>
          <div className="w-full px-4 lg:px-12 flex flex-col justify-center items-center">
            <div className="w-full px-2 lg:px-8 font-SpaceGrotesk break-words leading-7 lg:leading-10">
              {parse(post.content)}
            </div>
            <div className="h-96 lg:h-[60rem] mt-10 lg:mt-20">***</div>
          </div>
        </div>
      </div>
    </Container>
  ) : null;
}

export default Transition(Post);
