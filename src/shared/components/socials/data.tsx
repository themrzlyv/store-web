import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export const socialFields: Array<{
  name:
    | "social.github"
    | "social.linkedin"
    | "social.mail"
    | "social.instagram";
  placeholder: string;
  icon: JSX.Element;
}> = [
  {
    name: "social.github",
    placeholder: "Github URL",
    icon: <Github width={20} height={20} />,
  },
  {
    name: "social.linkedin",
    placeholder: "LinkedIn URL",
    icon: <Linkedin width={20} height={20} />,
  },
  {
    name: "social.mail",
    placeholder: "Email Address",
    icon: <Mail width={20} height={20} />,
  },
  {
    name: "social.instagram",
    placeholder: "Instagram URL",
    icon: <Instagram width={20} height={20} />,
  },
];
