import { IconMoodSad, IconMoodSmile } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";

type FeedbackProps = {
  youtubeId: string;
};

type FormData = {
  name?: string;
  rating?: number;
  email?: string;
  content?: string;
};

export default function Feedback({ youtubeId }: FeedbackProps) {
  const [data, setData] = useState<FormData>({
    name: undefined,
    rating: undefined,
    email: undefined,
    content: undefined,
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<Record<keyof FormData, boolean>>>(
    {}
  );

  const router = useRouter();

  const handleChange =
    (
      field: keyof FormData
    ): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =>
    (event) => {
      setData((oldData) => ({ ...oldData, [field]: event.target.value }));
    };

  const validateChange = useCallback(() => {
    setError((oldError) => ({
      ...oldError,
      content: data.content?.trim() === "",
    }));
  }, [data]);

  const validateData = () => {
    setError((oldError) => ({
      ...oldError,
      content: !data.content,
    }));
    return !data.content;
  };

  const handleSubmit: ChangeEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (validateData()) {
      return false;
    }

    setLoading(true);

    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, youtubeId }),
    })
      .then(() => router.push("/feedback/thanks"))
      .catch(console.log)
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    validateChange();
  }, [validateChange]);

  if (!router.isReady) {
    return "redirecting...";
  }

  const hasErrors = Object.values(error).some((value) => value);

  return (
    <main className="bg-gray-900 w-full h-full sm:py-4 sm:px-4 flex items-center justify-center">
      <div className="max-w-xl px-4 py-4 sm:px-8 sm:py-8 rounded bg-current grow">
        <section className="w-full aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </section>
        <section>
          <form onSubmit={handleSubmit}>
            <div className="py-2 flex">
              <IconMoodSad size={64} className="text-white pr-2" />
              <input
                type="range"
                className="grow"
                onChange={handleChange("rating")}
              />
              <IconMoodSmile size={64} className="text-white pl-2" />
            </div>
            <div className="py-2 flex flex-col">
              <label className="text-slate-200 pb-2">Nimimerkki</label>
              <input
                name="name"
                placeholder="e.g. GrilliTopo"
                className="shadow-sm border px-2 py-2 rounded min-w-full"
                onChange={handleChange("name")}
                value={data.name}
              />
            </div>
            <div className="py-2 flex flex-col">
              <label className="text-slate-200 pb-2">Sähköposti</label>
              <input
                name="email"
                type="email"
                placeholder="matti.meikalainen@yritys.com"
                className="shadow-sm border px-2 py-2 rounded min-w-full"
                onChange={handleChange("email")}
                value={data.email}
              />
            </div>
            <div className="py-2 flex flex-col">
              <label className="text-slate-200 pb-2">Palaute</label>
              <textarea
                placeholder="Kirjoita palautteesi tähän"
                className={`shadow-sm border px-2 py-2 rounded min-w-full ${
                  error.content ? "border-red-600 border-2" : ""
                }`}
                onChange={handleChange("content")}
              >
                {data.content}
              </textarea>
              {error.content && (
                <span className="pt-4 text-red-600">Sanny jottai hei!</span>
              )}
            </div>
            <div className="pt-8">
              <button
                disabled={isLoading || hasErrors}
                className={`w-full ${
                  isLoading || hasErrors ? "bg-slate-700" : "bg-red-700"
                } text-white py-4 rounded`}
                type="submit"
              >
                {isLoading ? "Lähetetään..." : "Lähetä"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

const stringifyArray = (maybeArray: any) => {
  if (Array.isArray(maybeArray)) {
    return maybeArray.join(",");
  }
  return maybeArray;
};

export const getServerSideProps: GetServerSideProps<{
  youtubeId: string;
}> = async (context) => {
  const { params } = context;

  if (!params) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      youtubeId: stringifyArray(params.youtubeId),
    },
  };
};
