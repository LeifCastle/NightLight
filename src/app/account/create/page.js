"use client";
import axios from "axios";
import { useState } from "react";

export default function Create() {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  function handleNewInput(e) {
    switch (e.target.name) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  }

  function createAccount() {
    const data = {
      firstName: firstName,
      lastName: lastName,
      userName: username,
      password: password,
    };
    console.log(data);
    axios
      .post("http://localhost:8000/account/new", data)
      .then((user) => {
        console.log(`Success: ${user}`);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }

  return (
    <div className="flex-col items-center w-200px h-200px bg-qrHeader">
      <p>First Name</p>
      <input
        name="firstName"
        className="text-black"
        type="text"
        placeholder="Darth"
        onChange={handleNewInput}
      ></input>
      <p>Last Name</p>
      <input
        name="lastName"
        className="text-black"
        type="text"
        placeholder="Vader"
        onChange={handleNewInput}
      ></input>
      <p>Username</p>
      <input
        name="username"
        className="text-black"
        type="text"
        placeholder="LordVader77"
        onChange={handleNewInput}
      ></input>
      <p>Password</p>
      <input
        name="password"
        className="text-black"
        type="password"
        onChange={handleNewInput}
      ></input>
      <br />
      <button className="bg-qrButtonActive" onClick={createAccount}>
        Create Account
      </button>
    </div>
  );
}
