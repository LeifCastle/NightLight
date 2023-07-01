import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="h-screen">
      <Header />
      <main className="bg-Dark1 w-screen h-[92%]">
        <p>Content</p>
      </main>
    </div>
  );
}
