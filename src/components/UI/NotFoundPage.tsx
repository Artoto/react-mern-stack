// src/pages/NotFoundPage.tsx

import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-12 rounded-xl shadow-2xl transform hover:shadow-3xl transition duration-500 ease-in-out">
        <h1 className="text-9xl font-extrabold text-indigo-600 tracking-widest mb-4">
          404
        </h1>
        <p className="text-2xl font-semibold text-gray-800 mb-6">
          🚨 Page Not Found.
        </p>
        <p className="text-gray-500 mb-10">
          ขออภัยครับ, เราไม่พบหน้าที่คุณกำลังมองหา อาจเป็นเพราะ URL ผิด
          หรือหน้านี้ถูกลบไปแล้ว
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11v10a1 1 0 001 1h3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          กลับสู่หน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
