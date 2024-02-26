"use client";

import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [seacrchResult, setSearchResult] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [post, setPost] = useState([]);

useEffect(() => {
    const feactPost = async () => {
      const res = await fetch("/api/prompt", {next: {revalidate: 1000}});
      const data = await res.json();
      setPost(data);
    };
    feactPost();
  }, []);

  const handeleSearch = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchRes = post.filter(
          (item) =>
            item.creator.username
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            item.tag.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResult(searchRes);
      }, 500)
    );
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchRes = post.filter((item) =>
      item.tag.toLowerCase().includes(tagName.toLowerCase())
    );
    setSearchResult(searchRes);
  };
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for tag or userName'
          value={searchText}
          onChange={handeleSearch}
          required
          className='search_input peer'
        />
      </form>
      {searchText ? (
        <PromptCardList data={seacrchResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={post} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
