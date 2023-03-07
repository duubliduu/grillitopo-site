import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center p-10 bg-gray-900">
      <Image
        src="/gt-logo.png"
        alt="Grilli Topo"
        className="max-w-full h-auto"
        width="618"
        height="619"
      />
    </main>
  );
}
