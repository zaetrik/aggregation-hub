import Link from "next/link";
import { Box, Text } from "grommet";

const Footer = () => {
  const footerItems = [
    // { link: "/privacy", title: "Privacy" },
    // { link: "/contact", title: "Contact" }
  ];

  return (
    <Box fill direction="row" as="footer">
      {footerItems.map(footerItem => {
        return (
          <Box
            a11yTitle={`Footer link to ${footerItem.title}`}
            key={footerItem.title}
            pad="small"
            direction="column"
            align="center"
            justify="between"
            fill
            animation="fadeIn"
          >
            <Link href={footerItem.link}>
              <Text className="cursor-pointer" alignSelf="center" size="small">
                {footerItem.title}
              </Text>
            </Link>
          </Box>
        );
      })}
    </Box>
  );
};

export default Footer;
