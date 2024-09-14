import { useState } from 'react';
import Customers from './customer/Customer';
import Collaborators from './collaborator/Collaborators';
import Movies from './movies/Movie';
import Showtimes from './showtime/Showtime';
import Reservations from './reservation/Reservation';
import TheaterRooms from './room/TheaterRooms';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('customers');

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Tab Navigation */}
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('customers')}
          className={`mr-4 px-4 py-2 rounded ${activeTab === 'customers' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Clientes
        </button>
        <button
          onClick={() => setActiveTab('collaborators')}
          className={`mr-4 px-4 py-2 rounded ${activeTab === 'collaborators' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Colaboradores
        </button>
        <button
          onClick={() => setActiveTab('movies')}
          className={`mr-4 px-4 py-2 rounded ${activeTab === 'movies' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Películas
        </button>
        <button
          onClick={() => setActiveTab('showtimes')}
          className={`mr-4 px-4 py-2 rounded ${activeTab === 'showtimes' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Funciones
        </button>
        <button
          onClick={() => setActiveTab('reservations')}
          className={`mr-4 px-4 py-2 rounded ${activeTab === 'reservations' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Reservas
        </button>

        <button
          onClick={() => setActiveTab('rooms')}
          className={`px-4 py-2 rounded ${activeTab === 'reservations' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Salas
        </button>

      </div>
      
      {/* Tab Content */}
      <div>
        {activeTab === 'customers' && <Customers />}
        {activeTab === 'collaborators' && <Collaborators />}
        {activeTab === 'movies' && <Movies />}
        {activeTab === 'showtimes' && <Showtimes />}
        {activeTab === 'reservations' && <Reservations />}
        {activeTab === 'rooms' && <TheaterRooms />}
      </div>
    </div>
  );
}
