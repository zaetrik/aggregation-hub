const shell = require("shelljs");

const waitForServiceToBeUp = (url, httpCode) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("SERVICE NOT AVAILABLE"));
    }, 60000);

    setInterval(() => {
      const response = shell.exec(
        `curl -s -o /dev/null -w "%{http_code}" ${url}`
      );
      if (response == httpCode) resolve();
    }, 1000);
  });
};

module.exports = async () => {
  if (!shell.which("docker-compose")) {
    shell.echo("Sorry, this script requires docker-compose");
    shell.exit(1);
  }
  shell.exec(
    `MODULE_PORT=${process.env.MODULE_PORT} docker-compose -f docker-compose.test.yml up --build -d`
  );

  await waitForServiceToBeUp(
    `http://localhost:${process.env.PORT}/modules`,
    200
  );
};
