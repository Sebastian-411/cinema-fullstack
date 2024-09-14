import React from 'react';

function MovieCard({ url, name, description, id }) {
  return (
    <section className="grid place-items-center p-8">
      <a
        href={id}
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"
      >
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src={url}
          alt={name}
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {name}
          </h5>
          <p className="mb-3 font-normal text-gray-700">
            <p className="text-gray-600">Director: {description.director}</p>
            <p className="text-gray-600">Duration: {description.duration} min</p>
            <p className="text-gray-600">Release Date: {new Date(description.releaseDate).toLocaleDateString()}</p>
          </p>
        </div>
      </a>
    </section>
  );
}

export default MovieCard;
