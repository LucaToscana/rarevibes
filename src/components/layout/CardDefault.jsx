import React from 'react';

export default function CardForm() {
  return (
    <div className="relative w-80 p-6 bg-white border-[8px] border-black shadow-[15px_15px_0px_#000] rotate-[-2deg] transition-all duration-300 ease-in-out hover:rotate-0 hover:scale-105 hover:shadow-[20px_20px_0px_#000] active:animate-shake overflow-hidden">
      
      {/* Banner diagonale */}
      <div className="absolute top-1 right-[-95px] w-[350px] bg-black text-white py-3 text-center text-[18px] font-bold tracking-widest rotate-45 transition-colors duration-500 hover:bg-red-600 overflow-hidden">
        <div className="relative w-full h-full">
          <span className="absolute left-[13%] top-1/2 -translate-y-1/2 transition-all duration-500 banner-text">
            JOIN NOW
          </span>
          <span className="absolute left-[13%] top-1/2 -translate-y-1/2 opacity-0 translate-y-[60%] transition-all duration-500 banner-text-hover">
            LET'S GO!
          </span>
        </div>
      </div>

      {/* Titolo */}
      <h2 className="text-2xl font-bold uppercase mb-2 border-b-2 border-black w-1/2">
        Sign Up
      </h2>

      {/* Sottotitolo */}
      <p className="text-base text-gray-700 mb-5 pb-2 leading-snug">
        Create your account to access exclusive features.
      </p>

      {/* Form */}
      <form className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          className="p-3 border-[4px] border-black text-base transition-transform focus:outline-none focus:scale-105"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 border-[4px] border-black text-base transition-transform focus:outline-none focus:scale-105"
        />
        <button
          type="submit"
          className="border-[4px] border-black bg-black text-white py-3 text-lg font-bold uppercase transition-all hover:bg-white hover:text-black hover:-translate-y-1 hover:shadow-[0_5px_0_#000] active:translate-y-0 active:shadow-none"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
