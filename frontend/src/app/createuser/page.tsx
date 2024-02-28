/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import { User } from "../page";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateUser = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const [newUser, setNewUser] = useState<User>({ name: "", email: "" });
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/users`, newUser);
      setUsers([response.data, ...users]);
      setNewUser({ name: "", email: "" });
    } catch (error) {
      console.log("Error creating user:", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-400 sm:p-0 pb-32">
      {/* Create user */}
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Create User
      </h1>{" "}
      <form
        onSubmit={createUser}
        className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-lg"
      >
        <input
          placeholder="Digite seu nome"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          placeholder="Digite seu email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded-lg"
        />
        <button
          className="w-full p-2 bg-gray-500 text-white rounded-lg mt-4"
          type="submit"
        >
          Criar um usuário
        </button>
      </form>
      <button
        className="w-full max-w-md p-2 bg-gray-500 text-white rounded-lg mt-3"
        onClick={() => router.push("/")}
      >
        Voltar
      </button>
    </main>
  );
};

export default CreateUser;
