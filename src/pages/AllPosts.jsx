import React, { useState, useEffect } from "react";
import { Container, Loader, PostCard, Error } from "../components";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { useParams, useNavigate, Link } from "react-router-dom";
import Transition from "../components/transition";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response && response.documents) {
          setPosts(response.documents);
        } else {
          setError(new Error("Failed to load posts"));
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [navigate]);

  const showSlider = (type) => {
    const carouselDom = document.querySelector(".carousel");
    const listItemDom = document.querySelector(".carousel .list");
    const thumbnailDom = document.querySelector(".carousel .thumbnail");
    const itemSlider = document.querySelectorAll(".carousel .list .item");
    const itemThumbnail = document.querySelectorAll(
      ".carousel .thumbnail .item"
    );

    if (type === "next") {
      listItemDom.appendChild(itemSlider[0]);
      thumbnailDom.appendChild(itemThumbnail[0]);
      carouselDom.classList.add("next");
    } else {
      const positionLastItem = itemSlider.length - 1;
      listItemDom.prepend(itemSlider[positionLastItem]);
      thumbnailDom.prepend(itemThumbnail[positionLastItem]);
      carouselDom.classList.add("prev");
    }

    setTimeout(() => {
      carouselDom.classList.remove("next");
      carouselDom.classList.remove("prev");
    }, 1000);
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center overflow-hidden">
        <Error />
      </div>
    );
  }

  return (
    <Container showFooter={false}>
      <div className="App">
        <div className="carousel">
          <div className="list">
            {posts.map((post, index) => (
              <div className="item" key={index}>
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={`img${index + 1}`}
                />
                <div className="content">
                  <div className="title">{post.title}</div>
                  <div className="des">{parse(post.content)}</div>
                  <Link to={`/post/${post.$id}`}>
                    <div className="buttons mt-5">
                      <button className="button_read">
                        <span className="button_lg">
                          <span className="button_sl"></span>
                          <span className="button_text">READ</span>
                        </span>
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="thumbnail">
            {posts.map((post) => (
              <div key={post.$id} className="item">
                <PostCard {...post} />
              </div>
            ))}
          </div>

          <div className="arrows">
            <button
              id="prev"
              className="btn-arrow"
              onClick={() => showSlider("prev")}
            >
              <span className="span">&lt;</span>
            </button>

            <button
              id="next"
              className="btn-arrow"
              onClick={() => showSlider("next")}
            >
              <span className="span">&gt;</span>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Transition(AllPosts);
