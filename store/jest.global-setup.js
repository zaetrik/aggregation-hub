const shell = require("shelljs");

const waitForServiceToBeUp = (url, httpCode) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`SERVICE ${url} NOT AVAILABLE`));
    }, 120000);

    setInterval(() => {
      const response = shell.exec(
        `curl -s -o /dev/null -w "%{http_code}" ${url}`
      );
      if (response == httpCode) resolve();
    }, 1000);
  });
};

module.exports = async () => {
  if (process.env.CI === "false") {
    if (!shell.which("docker-compose")) {
      shell.echo("Sorry, this script requires docker-compose");
      shell.exit(1);
    }
    shell.exec("docker-compose -f docker-compose.test.yml up --build -d");

    await waitForServiceToBeUp(`http://localhost:9200`, 200);
  } else {
    const { spawn } = require("child_process");

    spawn("npm", ["run", "dev"]);
    shell.exec("sleep 10");
  }
  return;
};
