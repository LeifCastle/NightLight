"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  let Home;
  if (pathname != "/") {
    Home = <Link href="/">Home</Link>;
  }

  return (
    <div className="flex justify-evenly items-center w-screen h-[8%] bg-Dark2 text-slate-300 rounded-bl-lg rounded-br-lg">
      <div className="basis-33%">{Home}</div>
      <h1 className="basis-33% text-4xl">Night Light</h1>
      <div className="basis-33%">
        <button>Login</button>
      </div>
    </div>
  );
}
