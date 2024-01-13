"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const search = useSearchParams();
  console.log(search);
  const router = useRouter();
  const [posts, setPost] = useState([]);
  useEffect(() => {
    const feactPost = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPost(data);
    };
    if (session?.user.id) {
      feactPost();
    }
  }, []);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    // confirm - brauzer api
    const hasComfirmed = confirm("Are you shure to delte this promopt");
    if (hasComfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filderedPost = posts.filter((p) => p._id !== post._id);

        setPost(filderedPost);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name='My'
      desc='Welcome to your perosonalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
