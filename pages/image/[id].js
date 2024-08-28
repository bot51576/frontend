import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../../components/Layout";
import CommentSection from "../../components/CommentSection";
import Button from "../../components/Button";
import { getImageDetails, likeImage, addComment } from "../../api";
import { useAuth } from "../../hooks/useAuth";

export default function ImageDetail() {
  const [image, setImage] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      async function fetchImageData() {
        const fetchedImage = await getImageDetails(id);
        setImage(fetchedImage);
      }
      fetchImageData();
    }
  }, [id]);

  const handleLike = async () => {
    if (user) {
      await likeImage(id);
      setImage({ ...image, likes: image.likes + 1 });
    } else {
      router.push("/login");
    }
  };

  const handleAddComment = async (text) => {
    if (user) {
      const newComment = await addComment(id, text);
      setImage({ ...image, comments: [...image.comments, newComment] });
    } else {
      router.push("/login");
    }
  };

  if (!image) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Image
          src={image.url}
          alt={image.title}
          width={800}
          height={600}
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <h1 className="text-3xl font-bold mt-4">{image.title}</h1>
        <p className="text-gray-600 mt-2">{image.description}</p>
        <div className="mt-4 flex items-center">
          <Button onClick={handleLike} className="mr-4">
            Like ({image.likes})
          </Button>
          <span>{image.comments.length} comments</span>
        </div>
        <CommentSection
          comments={image.comments}
          onAddComment={handleAddComment}
        />
      </div>
    </Layout>
  );
}
