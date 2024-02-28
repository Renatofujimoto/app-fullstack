"use client";
import CardComponent from "@/components/CardComponent";
import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id?: number;
  name?: string;
  email?: string;
}
export default function Home() {
  const apiUrl = process.env.NEXT_PIUBLIC_API_URL || "http://localhost:4000";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
  });

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-400">
        <div className="space-y-4 w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            User Management App
          </h1>

          {/* Display users */}
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between bg-gray-300 shadow-sm p-4 rounded-lg"
              >
                <CardComponent card={user} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
