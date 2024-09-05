import React from "react";
import { Container, PostForm } from "../components";
import Transition from "../components/transition";

function AddPost() {
  return (
    <Container showFooter={false}>
      <PostForm />
    </Container>
  );
}

export default Transition(AddPost);
