import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Feedback = () => {
  const [message, setMessage] = useState("");
  const [nick, setNick] = useState("");
  const [showError, setShowError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setISent] = useState(false);

  const router = useRouter();

  const resetForm = () => {
    setMessage("");
    setNick("");
    setShowError("");
    setIsLoading(false);
    setISent(true);
  };

  const handleError = (error: Error) => {
    setShowError(error.message || "Viestin lähettäminen ei onnistu!");
  };

  const handleSubmit = () => {
    if (!nick.trim() || !message.trim()) {
      setShowError("Nimimerkki ja viesti ovat pakollisia!");
      return;
    }

    setIsLoading(true);

    fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ nick, message }),
    })
      .then(resetForm)
      .catch(handleError);
  };

  useEffect(() => {
    if (isSent) {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [router, isSent]);

  return (
    <main className="bg-gray-900 w-full h-full sm:py-4 sm:px-4 flex items-center justify-center">
      <div className="max-w-xl px-4 py-4 sm:px-8 sm:py-8 rounded bg-current grow">
        <section className="w-full aspect-video">
          {showError && (
            <div className="rounded my-4 p-1 bg-white">
              <div className="border-red-500 rounded border-2 p-2 text-red-500">
                <span className="font-bold">Ooops! </span>
                {showError}
              </div>
            </div>
          )}
          {isSent ? (
            <div className="py-48 flex flex-col justify-center align-middle">
              <h1 className="text-white text-4xl mb-8 font-bold text-center">
                Kiitos PALAUTTEESTA!
              </h1>
              <p className="text-white text-center">
                <Link href="/">Takaisin etusivulle</Link>
              </p>
            </div>
          ) : (
            <div>
              <h1 className="text-white text-4xl mb-8 font-bold">
                GrilliTopolle palautetta!
              </h1>
              <div className="flex flex-col ">
                <label className="text-white">Nimimerkki</label>
                <input
                  name="nick"
                  value={nick}
                  disabled={isLoading}
                  onChange={(e) => setNick(e.target.value)}
                  placeholder="esim. Matti Meikäläinen"
                  className="rounded p-2 my-4"
                />
                <label className="text-white mt-2">Palautteesi</label>
                <textarea
                  value={message}
                  rows={10}
                  name="message"
                  disabled={isLoading}
                  className="my-4 p-2"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="bg-white rounded p-2 my-4"
                >
                  Lähetä
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Feedback;
