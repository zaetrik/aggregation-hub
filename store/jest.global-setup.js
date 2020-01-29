const shell = require("shelljs");

const waitForServiceToBeUp = (url, httpCode) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`SERVICE ${url} NOT AVAILABLE`));
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
  shell.exec("docker-compose -f docker-compose.test.yml up --build -d");

  await waitForServiceToBeUp("http://elasticsearch_1:9200", 200);
};
