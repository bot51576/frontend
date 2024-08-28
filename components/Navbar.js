import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          ImageShare
        </Link>
        <div>
          {user ? (
            <>
              <Link href="/upload" className="mr-4">
                Upload
              </Link>
              <Link href={`/profile/${user.id}`} className="mr-4">
                Profile
              </Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="mr-4">
                Login
              </Link>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
