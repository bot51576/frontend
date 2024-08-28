import { useState } from "react";

export default function CommentSection({ comments, onAddComment }) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="bg-gray-100 p-4 rounded">
            <p className="font-bold">{comment.user.name}</p>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
}
