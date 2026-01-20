import { SocialAccountProps } from "@/types";
import {
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaFacebook,
} from "react-icons/fa6";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const PlatformNames: Record<string, string> = {
  INSTAGRAM: "Instagram",
  TWITTER: "Twitter",
  FACEBOOK: "Facebook",
  LINKEDIN: "LinkedIn",
};

export default function SocialsItem({
  item,
  onConnect,
  isLoading,
  onDisconnect,
}: {
  item: SocialAccountProps;
  onConnect: () => void;
  isLoading: boolean;
  onDisconnect: () => void;
}) {
  const PlatformIcon =
    {
      INSTAGRAM: FaInstagram,
      TWITTER: FaXTwitter,
      FACEBOOK: FaFacebook,
      LINKEDIN: FaLinkedin,
    }[item.platform] || FaInstagram;

  return (
    <div className="flex items-center gap-3 p-4 border border-border rounded-lg bg-white justify-between">
      <div className=" h-full w-full flex items-center justify-start gap-3">
        <PlatformIcon className="h-5 w-5" />
        <div>
          <h3 className="font-semibold text-base">
            {PlatformNames[item.platform]}
          </h3>
          {item.isActive ? (
            <Badge variant="default" className="bg-accent text-xs">
              Connected
            </Badge>
          ) : (
            <Badge variant="outline">Not connected</Badge>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end">
        {item.isActive ? (
          <Button variant="outline" disabled={isLoading} onClick={onDisconnect}>
            Disconnect
          </Button>
        ) : (
          <Button disabled={isLoading} onClick={onConnect}>
            Connect
          </Button>
        )}
      </div>
    </div>
  );
}
