import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import ImageCard from "../../components/ImageCard";
import { getUserProfile, getUserImages } from "../../api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [images, setImages] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchProfileData() {
        const fetchedProfile = await getUserProfile(id);
        setProfile(fetchedProfile);
        const fetchedImages = await getUserImages(id);
        setImages(fetchedImages);
      }
      fetchProfileData();
    }
  }, [id]);

  if (!profile) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{profile.username}</h1>
        <p className="text-gray-600">{profile.email}</p>
      </div>
      <h2 className="text-2xl font-bold mb-4">User Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </Layout>
  );
}
