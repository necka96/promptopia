"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/profile";

const UserProfile = ({ params }) => {
  const serachPrams = useSearchParams();
  const userName = serachPrams.get("name");
  const [userPosts, setUserPost] = useState([]);
  useEffect(() => {
    const feactPost = async () => {
      const res = await fetch(`/api/users/${params.id}/posts`);
      const data = await res.json();
      setUserPost(data);
    };
    if (params.id) {
      feactPost();
    }
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile and expolore ${userName} propmts, be inspirated to create your own prompt`}
      data={userPosts}
    />
  );
};

export default MyProfile;
