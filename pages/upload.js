import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Input from "../components/Input";
import Button from "../components/Button";
import { uploadImage } from "../api";
import { useAuth } from "../hooks/useAuth";

export default function Upload() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    if (e.target.id === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    try {
      await uploadImage(formData);
      router.push("/");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Upload Image</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <Input
          label="Title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          label="Description"
          id="description"
          as="textarea"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Input
          label="Image File"
          id="file"
          type="file"
          onChange={handleChange}
          required
        />
        <Button type="submit">Upload</Button>
      </form>
    </Layout>
  );
}
