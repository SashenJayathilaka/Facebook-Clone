import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
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
      } else {
        setLoading(true);
      }
    }, 6000);
  }, [posts]);

  return (
    <>
      {loading ? (
        <>
          {posts.map((data) => (
            <PostSkeleton key={data.id} loading={loading} />
          ))}
        </>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <Post
                id={post.id}
                author={post.data().username}
                caption={post.data().caption}
                image={post.data().image}
                profileImage={post.data().profileImage}
                timestamp={post.data().timestamp}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
