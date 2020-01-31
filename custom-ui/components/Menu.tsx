import { Fragment } from "react";
import Link from "next/link";

import theme from "../theme";
import { FaChartBar, FaThLarge } from "react-icons/fa";

export default ({
  activeItem,
  containerStyle
}: {
  activeItem?: string;
  containerStyle?: { [style: string]: string };
}) => {
  const menuItems = [
    { link: "/", title: "Modules", icon: <FaThLarge /> },
    { link: "/dashboards", title: "Dashboards", icon: <FaChartBar /> }
  ];

  return (
    <Fragment>
      <nav style={containerStyle}>
        {menuItems.map((menuItem, key) => (
          <Link href={menuItem.link} key={key}>
            <div className={`menu-item cursor-pointer ${menuItem.title}`}>
              <div className="menu-icon">{menuItem.icon}</div>
              {menuItem.title}
            </div>
          </Link>
        ))}
      </nav>
      <style jsx>{`
        .menu-item {
          ${(theme.hoverOut, theme.paddingMedium)}
        }

        .menu-item:hover {
          ${theme.hoverIn}
          font-weight: bold;
        }

        .menu-item.${activeItem} {
          cursor: default;
        }

        .menu-icon {
          display: inline-block;
          margin-right: 10px;
          ${theme.paddingSmall}
        }
      `}</style>
    </Fragment>
  );
};
