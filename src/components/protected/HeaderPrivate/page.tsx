
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import avatar from '@/lib/assets/imgs/avatar.svg'
import { ReactNode } from "react";

export default function Header({ children }: { children?: ReactNode }) {
  const router = useRouter();

  function handleLogout() {
    if (confirm("Você será desconectado!")) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }

  function handleAvatar(){
    router.push("/details");
  }

  return (
    <header className="flex justify-between items-center h-[56px] px-5 bg-[#488C30]">
      <Link href="/dashboard">
        <h1 className="text-white text-2xl font-bold cursor-pointer">Products+</h1>
      </Link>
      {children}
      <nav className="flex items-center">
        <div className="h-[40px] w-[40px] rounded-full mr-[1vw] cursor-pointer overflow-hidden" onClick={handleAvatar}>
          <Image src={avatar} alt="avatar" className="w-full h-full rounded-full" />
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent py-2 px-6 rounded-full text-white border-2 border-white transition hover:scale-105 hover:bg-white hover:text-[#488C30] hover:font-bold"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
