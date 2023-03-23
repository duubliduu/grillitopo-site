import { useRouter } from "next/router";

export default function Thanks() {
  const router = useRouter();

  if (!router.isReady) {
    return "redirecting...";
  }

  return (
    <main className="bg-current w-full h-full">
      <div className="max-w-xl px-4 py-8 mx-auto flex items-center flex-col">
        <h1 className="text-white text-xl">Kiitos palautteesta!</h1>
        <p>
          <a href="https://youtube.com/GrilliTopo" className="text-white">
            Takaisin GrilliTopon kanavalle
          </a>
        </p>
      </div>
    </main>
  );
}
