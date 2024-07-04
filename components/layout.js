import Image from "next/image";
import Link from "next/link";
export default function Layout({ children }) {
  return (
    <>
      <div className="flex justify-between bg-teal-400 items-center gap-5 text-white">
        <div className="">
          <Image
            src="/rsud-logo.png"
            className="w-78"
            width={150}
            height={150}
            alt="RSUD Karawang Logo"
          />
        </div>
        <ul className="flex gap-5 text-sm font-semibold mx-10 items-center md:text-xl">
          <li className="hover:underline">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:underline">
            <Link href="/diagnose">Cek Diabetes</Link>
          </li>
          <li className="hover:underline">
            <Link href="/faq">FaQ</Link>
          </li>
          <li className="hover:underline">
            <Link href="/about">Tentang</Link>
          </li>
        </ul>
      </div>
      <main className="container mx-auto bg-zinc-100 min-h-screen px-10 py-10">
        {children}
      </main>
    </>
  );
}
