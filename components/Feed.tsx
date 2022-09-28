import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import Post from "./Post";

type Props = {};

export default function Feed({}: Props) {
  const [posts, setPosts] = useState<any[]>([]);

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

  return (
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
  );
}
