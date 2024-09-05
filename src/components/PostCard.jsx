import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="relative w-full h-full">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="w-full h-full object-cover rounded-2xl "
        />
      </div>

      {/* Text overlay */}

      <div className="content">
        <span className="drop-shadow-2xl">{title}</span>
      </div>
    </Link>
  );
}

export default PostCard;
