import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ImageCard from "../components/ImageCard";
import { getImages } from "../api";

export default function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const fetchedImages = await getImages();
      setImages(fetchedImages);
    }
    fetchImages();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Latest Images</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </Layout>
  );
}
