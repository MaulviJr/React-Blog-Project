import React from 'react';
import service from '../appwrite/config';
import {Link} from 'react-router-dom'
function PostCard({$id,title,featured_image}) {

    return (
    <Link to={`/post/${$id}`}>
       <div
      className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow"
    >
      {/* Post Thumbnail */}
      <img
        src={service.previewFile(featured_image)}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Post Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        {/* <p className="text-gray-600 text-sm">
          A short description of the blog post will go here…
        </p> */}

        {/* Actions (you can link later) */}
        <div className="mt-3 flex justify-between items-center">
          <button className="text-sm text-blue-600 font-medium hover:underline">
            Read More
          </button>
        </div>
      </div>
    </div>
    </Link>
    );
}

export default PostCard;