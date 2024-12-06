"use client";
import { Navigation } from "../navigation/navigation";
import { MenuIcon } from "lucide-react";
import { SwitchTheme } from "../switch-theme/switch-theme";
import { useHeader } from "./use-header";
import { headerSlots } from "./header.slots";
import { LogoButton } from "../logo-button/logo-button";

export function Header() {
  const { isHeaderVisible, isMenuOpen, toggleMenu } = useHeader();

  const { header, headerContent, headerLogo, menuButton, navContainer } =
    headerSlots({
      isMenuOpen,
      isHeaderVisible,
    });

  return (
    <header className={header()}>
      <div className={headerContent()}>
        <LogoButton wrapperClass={headerLogo()} />
        <div className={navContainer()}>
          <SwitchTheme />
          <div className={menuButton()} onClick={toggleMenu}>
            <MenuIcon width={24} height={24} className="text-primary-default" />
          </div>
        </div>

        <Navigation />
      </div>
    </header>
  );
}
