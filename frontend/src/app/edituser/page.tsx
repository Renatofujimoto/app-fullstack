/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import { User } from "../page";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateUser = () => {
  const apiUrl = process.env.NEXT_PIUBLIC_API_URL || "http://localhost:4000";

  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  //update user
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/users/${updateUser.id}`, {
        name: updateUser.name,
        email: updateUser.email,
      });
      setUpdateUser({ id: "", name: "", email: "" });
      setUsers(
        users.map((user) => {
          if (user.id === parseInt(updateUser.id)) {
            return { ...user, name: updateUser.name, email: updateUser.email };
          }
          return user;
        })
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-400 sm:p-0 pb-32">
        {/* Update user */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Edit User
        </h1>{" "}
        <form
          onSubmit={handleUpdateUser}
          className="p-4 bg-gray-100 rounded-lg shadow-lg"
        >
          <input
            placeholder="User ID"
            value={updateUser.id}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, id: e.target.value })
            }
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <input
            placeholder="New Name"
            value={updateUser.name}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, name: e.target.value })
            }
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <input
            placeholder="New Email"
            value={updateUser.email}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, email: e.target.value })
            }
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full p-2 text-white bg-gray-500 rounded hover:bg-gray-600 mt-4"
          >
            Update User
          </button>
        </form>
        <button
          className="w-[56%] p-2 bg-gray-500 text-white rounded-lg mt-6"
          onClick={() => router.push("/")}
        >
          Voltar
        </button>
      </main>
    </>
  );
};

export default CreateUser;
