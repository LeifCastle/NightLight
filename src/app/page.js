import Image from "next/image";
import Header from "./components/Header";

import Link from "next/link";

export default function Home() {
  return (
    <main className="">
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
  );
}
