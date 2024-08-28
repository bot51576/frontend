import Image from "next/image";
import Link from "next/link";

export default function ImageCard({ image }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <Link href={`/image/${image.id}`}>
        <Image
          src={image.url}
          alt={image.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{image.title}</h3>
        <div className="flex items-center text-gray-600">
          <span className="mr-2">{image.likes} likes</span>
          <span>{image.comments} comments</span>
        </div>
      </div>
    </div>
  );
}
