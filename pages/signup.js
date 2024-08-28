import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Input from "../components/Input";
import Button from "../components/Button";
import { signup } from "../api";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      router.push("/login");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Sign Up</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <Input
          label="Username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </Layout>
  );
}
