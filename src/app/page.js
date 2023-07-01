import Image from "next/image";
import Header from "./components/Header";
// import Journal from "./journal/page";
import Link from "next/link";

const express = require("express");

export default function Home() {
  return (
    <div className="h-screen">
      <Header />
      <main className="bg-Dark1 w-screen h-[92%]">
        <div>
          <Link href="/journal">Journal</Link>
          <br />
          <Link href="/connect">Connect</Link>
          <br />
          <Link href="/stats">Stats</Link>
          <br />
          <Link href="/docs">Docs</Link>
        </div>
      </main>
    </div>
  );
}
