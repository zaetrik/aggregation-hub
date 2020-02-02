import { Fragment } from "react";
import Link from "next/link";
import theme from "../theme";

// Components
import { FaChartBar, FaThLarge } from "react-icons/fa";
import Icon from "./Icon";

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
              <Icon
                icon={menuItem.icon}
                margin={`0 ${theme.margin.medium}`}
                padding="small"
              />
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
      `}</style>
    </Fragment>
  );
};
