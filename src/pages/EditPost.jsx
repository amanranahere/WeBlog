import React, { useEffect, useState } from "react";
import { Container, EditPostForm, Loader } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import Transition from "../components/transition";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return loading ? (
    <Loader />
  ) : (
    <Container showFooter={false}>
      <div>
        <EditPostForm post={post} />
      </div>
    </Container>
  );
}

export default Transition(EditPost);
