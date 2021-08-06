#!/usr/bin/env zx

const { format } = require("date-fns");
const ora = require("ora");

$.verbose = false;
const reportFolderName = "<folder-name>";

const spinner = ora();
console.log(`Lighthouse Report Generator`);
console.log(`====================================`);
console.log(``);

const urls = {
    "<report-slug>": "<report-url>",
};

const totalURLs = Object.keys(urls).length;

console.log(`Running reports for ${totalURLs} URLs.`);
console.log(``);

const runtime = format(new Date(), "yyyy-MM-dd-HHmmss");

const reportPath = `./reports/${runtime}-${reportFolderName}`;
console.log(`Report Path: ${reportPath}`);
console.log(``);

if (!fs.existsSync(reportPath)) {
    fs.mkdirSync(reportPath);
}

let index = 1;
for (let key in urls) {
    let url = urls[key];

    console.log(`Running Lighthouse on: ${url} (${index} of ${totalURLs})`);
    spinner.start(`Desktop`);

    await $`npx lighthouse ${url} --output=html --output-path=${reportPath}/${key}-desktop.html --preset=desktop --only-categories=accessibility,best-practices,performance,seo --quiet`
        .then(() => {
            spinner.succeed(`Desktop`);
        })
        .catch(() => {
            spinner.fail(`Desktop`);
        });

    spinner.start(`Mobile`);
    await $`npx lighthouse ${url} --output=html --output-path=${reportPath}/${key}-mobile.html --form-factor=mobile --only-categories=accessibility,best-practices,performance,seo --quiet`
        .then(() => {
            spinner.succeed(`Mobile`);
        })
        .catch(() => {
            spinner.fail(`Mobile`);
        });

    console.log(``);
	index++;
}

spinner.succeed(`Reports Complete`);
