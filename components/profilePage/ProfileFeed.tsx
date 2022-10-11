import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import Post from "../Post";
import PostSkeleton from "../Skeleton";

type ProfileFeedProps = {
  setUserDetails: any;
  userName: any;
};

const ProfileFeed: React.FC<ProfileFeedProps> = ({
  setUserDetails,
  userName,
}) => {
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
    }, 4000);
    setUserDetails(posts);
  }, [posts]);

  /*   console.log(userName); */

  return (
    <>
      {loading ? (
        <>
          {posts.map((data) => (
            <div key={data.id}>
              {data.data().username === userName && (
                <PostSkeleton key={data.id} loading={loading} />
              )}
            </div>
          ))}
        </>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              {post.data().username === userName && (
                <div key={post.id}>
                  <Post
                    id={post.id}
                    author={post.data().username}
                    caption={post.data().caption}
                    image={post.data().image}
                    profileImage={post.data().profileImage}
                    timestamp={post.data().timestamp}
                    isClicked={false}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default ProfileFeed;
