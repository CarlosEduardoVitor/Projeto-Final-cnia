
"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center h-[56px] px-5 bg-[#488C30]">
      <Link href="/">
        <h1 className="text-white text-2xl font-bold cursor-pointer">Products+</h1>
      </Link>
      <nav className="flex gap-3">
        <Link href="/login">
          <button className="bg-transparent py-2 px-6 rounded-full text-white border-2 border-white transition hover:scale-105 hover:bg-white hover:text-[#488C30] hover:font-bold">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="bg-transparent py-2 px-6 rounded-full text-white border-2 border-white transition hover:scale-105 hover:bg-white hover:text-[#488C30] hover:font-bold">
            Register
          </button>
        </Link>
      </nav>
    </header>
  );
}
