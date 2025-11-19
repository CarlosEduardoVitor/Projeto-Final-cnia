import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#5EBD3C] w-full h-[calc(100vh-56px)] flex flex-col items-center justify-center">
      <p className="text-white text-2xl">Seja bem-vindo ao </p>
      <h1 className={`text-white text-6xl`}>Products<span>+</span></h1>
    </main>
  );
}
