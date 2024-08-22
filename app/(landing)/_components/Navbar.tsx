import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-full p-4 bg-white">
      <div className="flex flex-row w-full mx-auto max-w-7xl">
        <Image src={"/logo.png"} width={200} height={200} alt="logo" />
      </div>
    </nav>
  );
}
