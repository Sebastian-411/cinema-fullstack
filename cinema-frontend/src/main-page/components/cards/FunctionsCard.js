import React from 'react';

function FunctionCard({ url, name, description, id, schedules }) {
  return (
    <a href={id}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          className="w-full h-48 object-cover"
          src={url}
          alt={name}
        />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-gray-600">Director: {description.director}</p>
          <p className="text-gray-600">Duration: {description.duration} min</p>
          <p className="text-gray-600">Release Date: {new Date(description.releaseDate).toLocaleDateString()}</p>
          {schedules && schedules.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold">Horarios Disponibles:</h4>
              <ul className="list-disc pl-5 mt-2">
                {schedules.map((schedule, index) => (
                  <li key={index} className="text-gray-600">{new Date(schedule.dateInit).toLocaleString()}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

export default FunctionCard;
