"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setContacts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Loading contacts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8">
          Contact Directory
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center sm:flex-row sm:items-start mb-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    contact.name
                  )}&background=random&color=fff`}
                  alt={contact.name}
                  className="w-16 h-16 rounded-full shadow-md mb-4 sm:mb-0"
                />
                <div className="text-center sm:ml-4 sm:text-left">
                  <h2 className="text-xl font-bold text-gray-800">{contact.name}</h2>
                  <p className="text-gray-500 text-sm">{contact.company.name}</p>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span> {contact.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Phone:</span> {contact.phone}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Website:</span>{" "}
                  <a
                    href={`http://${contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {contact.website}
                  </a>
                </p>
                <p className="text-gray-500 text-sm">
                  <span className="font-semibold">City:</span> {contact.address.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
