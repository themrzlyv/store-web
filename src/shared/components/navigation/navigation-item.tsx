import Link from "next/link";
import { navigationSlots } from "./navigation.slots";
import { Typography } from "../typography/typography";

type Props = {
  isActive: boolean;
  route: {
    path: string;
    name: string;
  };
};

export function NavigationItem({ isActive, route }: Props) {
  const { navigationItem, itemText } = navigationSlots({ isActive });

  return (
    <div className={navigationItem()}>
      <Link href={route.path}>
        <Typography variant="menu-text" element="h4" className={itemText()}>
          {route.name}
        </Typography>
      </Link>
    </div>
  );
}
