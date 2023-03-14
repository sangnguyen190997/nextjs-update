import Image from "next/image";

export default function Header() {
  return (
    <header>
      <div className="relative top-0 left-0 w-full h-screen ">
        <Image
          fill
          alt="intro Image"
          src="/intro.jpg"
          className="brightness-75"
        />
      </div>
    </header>
  );
}
