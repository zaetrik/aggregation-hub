// Components
import Heading from "./Heading";

export default ({
  title,
  subHeading
}: {
  title: string;
  subHeading?: string;
}) => {
  return (
    <Heading subHeading={subHeading ? subHeading : undefined} size="xxlarge">
      {title}
    </Heading>
  );
};
