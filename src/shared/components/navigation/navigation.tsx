import { menuRoutes } from "@/shared/data/routes";
import { usePathname } from "next/navigation";
import { SwitchTheme } from "../switch-theme/switch-theme";
import { NavigationItem } from "./navigation-item";
import { navigationSlots } from "./navigation.slots";
import { MdStarBorder } from "react-icons/md";
import Button from "@/ui/button";

export function Navigation() {
  const pathname = usePathname();
  const { root } = navigationSlots();
  return (
    <nav className={root()}>
      {menuRoutes.map(route => {
        const isActive = pathname.startsWith(route.path) || false;
        return (
          <NavigationItem key={route.path} route={route} isActive={isActive} />
        );
      })}
      <SwitchTheme className="hidden md:flex" />
      {/* TODO: Add rating logic */}
      <Button variant="ghost" size="md">
        <MdStarBorder size={20} />
      </Button>
    </nav>
  );
}
