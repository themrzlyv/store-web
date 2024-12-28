import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { RiShare2Line } from "react-icons/ri";
import { LuClipboardCopy, LuCheck } from "react-icons/lu";
import { Typography } from "../typography/typography";
import { useState } from "react";

export function ShareLink() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setIsCopied(true);
        setIsOpenMenu(true);
        setTimeout(() => setIsCopied(false), 500);
      })
      .catch(() => setIsCopied(false));
  };

  return (
    <DropdownMenu open={isOpenMenu} onOpenChange={open => setIsOpenMenu(open)}>
      <DropdownMenuTrigger asChild>
        <button className="px-2 flex items-center gap-2 focus:outline-none">
          <RiShare2Line size={16} className="text-gray-500" />
          <Typography
            element="span"
            variant="small-text"
            className="text-gray-500"
          >
            Share
          </Typography>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-max">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={e => {
              e.preventDefault();
              handleCopyLink();
            }}
            className="flex items-center justify-between"
          >
            Copy link
            {isCopied ? (
              <LuCheck size="12" className="text-green-500" />
            ) : (
              <LuClipboardCopy size="12" className="text-gray-600" />
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <a
              href={
                "https://www.linkedin.com/sharing/share-offsite/?url=" +
                window.location.href
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Share on LinkedIn
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
