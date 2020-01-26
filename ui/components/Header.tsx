import Link from "next/link";
import { withRouter, useRouter } from "next/router";
import {
  Box,
  Text,
  ResponsiveContext,
  Menu,
  Header as HeaderComponent,
  Button
} from "grommet";
import * as Icons from "grommet-icons";

const Header = () => {
  const Router = useRouter();
  const menuItems = [
    { link: "/", title: "Home" },
    { link: "/modules", title: "Modules" }
  ];

  const changeRoute = (route: string) => {
    Router.push({
      pathname: route
    });
  };

  return (
    <ResponsiveContext.Consumer>
      {size => {
        if (size === "small") {
          return (
            <HeaderComponent background="brand">
              <Button
                icon={<Icons.Home />}
                hoverIndicator
                onClick={() => changeRoute("/")}
              />
              <Menu
                size="medium"
                label="Menu"
                items={[
                  { label: "Modules", onClick: () => changeRoute("/modules") }
                ]}
              />
            </HeaderComponent>
          );
        } else {
          return (
            <Box fill direction="row" as="header">
              {menuItems.map(menuItem => {
                return (
                  <Box
                    a11yTitle={`Menu link to ${menuItem.title}`}
                    key={menuItem.title}
                    pad="medium"
                    direction="column"
                    align="center"
                    justify="between"
                    fill
                    animation="fadeIn"
                  >
                    <Link href={menuItem.link}>
                      <Text
                        weight="bold"
                        className="cursor-pointer"
                        alignSelf="center"
                        size="large"
                      >
                        {menuItem.title}
                      </Text>
                    </Link>
                  </Box>
                );
              })}
            </Box>
          );
        }
      }}
    </ResponsiveContext.Consumer>
  );
};

export default withRouter(Header);
