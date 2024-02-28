"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { useRouter } from "next/navigation";

export interface User {
  id?: number;
  name?: string;
  email?: string;
}

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const router = useRouter();

  // Fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Create user
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/users`, newUser);
      setUsers([response.data, ...users]);
      setNewUser({ name: "", email: "" });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Delete user
  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`${apiUrl}/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-800 pb-32">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-200 text-center mb-4">
          User Management App
        </h1>
        <button
          className="w-full md:w-1/3 p-2 bg-gray-500 text-white rounded-lg my-4"
          onClick={() => router.push("/createuser")}
        >
          Create User
        </button>

        {/* Display users */}
        <div className="space-y-4">
          {users.map((user: any) => (
            <div
              key={user.id}
              className="flex flex-col md:flex-row items-center justify-between bg-gray-200 p-4 rounded-lg shadow"
            >
              <CardComponent card={user} />
              <div className="flex justify-center w-full mt-3 md:mt-0 gap-6">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="w-full md:w-40 p-2 bg-red-500 text-white rounded-lg mr-2 md:mr-0"
                >
                  Delete User
                </button>
                <button
                  className="w-full md:w-40 p-2 bg-gray-500 text-white rounded-lg"
                  onClick={() => router.push("/edituser")}
                >
                  Edit User
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
