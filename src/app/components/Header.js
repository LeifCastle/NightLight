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
    <div className="flex justify-center items-center w-screen h-[8%] text-headerText bg-pageHeader text-center rounded-bl-lg rounded-br-lg">
      <div className="basis-1/3 flex justify-center">
        <div className="w-20 bg-inherit border-2 border-headerBorder text-headerBText rounded-md">
          {Home}
        </div>
      </div>
      <h1 className="basis-1/3 font-md font-sans text-4xl">Night Light</h1>
      <div className="basis-1/3">
        <button className="bg-pageHeader pl-2 pr-2 border-2 border-headerBorder text-headerBText rounded-md">
          Login
        </button>
      </div>
    </div>
  );
}
