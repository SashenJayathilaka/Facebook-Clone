import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { firestore } from "../firebase/firebase";
import Post from "./Post";
import PostSkeleton from "./Skeleton";

type Props = {};

export default function Feed({}: Props) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(
    () =>
      onSnapshot(
        query(collection(firestore, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [firestore]
  );

  useEffect(() => {
    setTimeout(() => {
      if (posts) {
        setLoading(false);
      } else return;
    }, 3000);
  }, [posts]);

  return (
    <>
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {posts.map((post) => (
            <div key={post.id}>
              <Post
                id={post.id}
                author={post.data().username}
                caption={post.data().caption}
                image={post.data().image}
                profileImage={post.data().profileImage}
                timestamp={post.data().timestamp}
                isClicked={true}
              />
            </div>
          ))}
        </motion.div>
      )}
    </>
  );
}
