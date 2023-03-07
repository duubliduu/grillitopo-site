import Image from "next/image";
import {IconBrandInstagram, IconBrandTiktok, IconBrandTwitch, IconBrandYoutube} from "@tabler/icons-react";


const channels = [
  {
    name: "YouTube",
    url: "https://www.youtube.com/GrilliTopo",
    Icon: IconBrandYoutube
  },
  {
    name: "Twitch",
    url: "https://www.twitch.tv/grillitopo",
    Icon: IconBrandTwitch
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@grillitopo",
    Icon: IconBrandTiktok
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/grillitopo",
    Icon: IconBrandInstagram
  }
]


export default function Home() {
  return (
    <main className="w-full h-full relative">
      <video className="w-full h-full object-cover" muted autoPlay playsInline loop>
        <source src="https://grillitopo.com/grillitopo-site.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-900/[0.7]">
        <Image
          src="/gt-logo.png"
          alt="Grilli Topo"
          className="max-w-full h-auto"
          width="618"
          height="619"
        />
        <div className="text-white flex flex-row items-center justify-center space-x-4">
          {channels.map((channel) => (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              >
              <channel.Icon size={64} />
            </a>
            ))}
        </div>
      </div>
    </main>
  );
}
