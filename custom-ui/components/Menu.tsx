import { Fragment } from "react";
import Link from "next/link";
import theme from "../theme";

// Components
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
          ${theme.hoverOut}
          padding: ${theme.padding.medium};
          font-size: ${theme.fonts.medium};
        }

        .menu-item:hover {
          ${theme.hoverIn}
        }

        .menu-item.${activeItem} {
          cursor: default;
        }

        .menu-icon {
          display: inline-block;
          vertical-align: middle;
          margin-right: ${theme.margin.medium};
          padding: ${theme.padding.small};
        }
      `}</style>
    </Fragment>
  );
};
