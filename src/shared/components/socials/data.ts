import { icons } from "lucide-react";

export const socialFields: Array<{
  name:
    | "social.github"
    | "social.linkedin"
    | "social.mail"
    | "social.instagram";
  placeholder: string;
  icon: React.FC;
}> = [
  { name: "social.github", placeholder: "Github URL", icon: icons.Github },
  {
    name: "social.linkedin",
    placeholder: "LinkedIn URL",
    icon: icons.Linkedin,
  },
  { name: "social.mail", placeholder: "Email Address", icon: icons.Mail },
  {
    name: "social.instagram",
    placeholder: "Instagram URL",
    icon: icons.Instagram,
  },
];
