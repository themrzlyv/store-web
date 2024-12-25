import { SiMedium } from "react-icons/si";
import { IoIosMail } from "react-icons/io";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";

export const socialFields: Array<{
  name: "social.github" | "social.linkedin" | "social.mail" | "social.medium";
  placeholder: string;
  icon: JSX.Element;
}> = [
  {
    name: "social.github",
    placeholder: "Github URL",
    icon: <FaGithub size="20" />,
  },
  {
    name: "social.linkedin",
    placeholder: "LinkedIn URL",
    icon: <FaLinkedinIn size="18" />,
  },
  {
    name: "social.mail",
    placeholder: "Email Address",
    icon: <IoIosMail size="25" />,
  },
  {
    name: "social.medium",
    placeholder: "Medium URL",
    icon: <SiMedium size="18" />,
  },
];
