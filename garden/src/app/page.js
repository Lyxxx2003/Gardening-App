// our main page
'use client'
import { db } from './firebase-config'; // refer to firebase-config, backend
import { collection, addDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import Navbar from "../components/Navbar"; // refer to Navbar component

<style jsx>{`
  .custom-form-width {
    max-width: 800px; /* Custom width or use a percentage like 80% */
  }
`}</style>

// add data to firebase
async function addDataToFireStore(name, email, message) {
  try {
    const docRef = await addDoc(collection(db, "messages"),{
      name: name,
      email: email,
      message: message,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error ("Error adding document ", error)
    return false;
  }
}

// main page
export default function Home() {
  // handle submission of the form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const added = await addDataToFireStore(name, email, message);
    if(added){
      setName("");
      setEmail("");
      setMessage("");
      alert("Data added to firestore DB!!");
    }
  };

  return (
    <div>
      <Navbar/> {/* Include Navbar in page */}
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        {/* Text */}
        <h1 className = "text-5xl font-bold m-10">
          Welcome to GreenBird
        </h1>

        {/* Show the login form */}
        <form onSubmit={ handleSubmit } className = 'max-w-md mx-auto p-4 bg-white shadow-md rounded-lg'>
          <div className = 'mb-4'>
            <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
              Name
            </label>
            <input type = 'text' id = 'name' className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500' 
              value =  {name}
              onChange = {(e) => setName(e.target.value)}/>

            <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
              Email
            </label>
            <input type = 'text' id = 'email' className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500' 
              value =  {email}
              onChange = {(e) => setEmail(e.target.value)}/>

            <label htmlFor='message' className='block text-gray-700 font-bold mb-2'>
              Message
            </label>
            <textarea
              row = {5}
              id = 'message' className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500' 
              value =  {message}
              onChange = {(e) => setMessage(e.target.value)}> 
            </textarea>
          </div>

          {/* The submit button */}
          <div className='text-center'>
            <button
              type = 'submit'
              className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg'>
              Submit
            </button>
          </div>
        </form>

      </main>
    </div>
  );
}