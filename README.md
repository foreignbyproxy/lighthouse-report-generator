# bld-lighthouse-reports

This project takes a number of URLs,  runs Lighthouse (Desktop and Mobile) and saves the HTML report to the `reports/` directory.

## Installation
Clone the repository and run `npm install` in the directory to set up the project.

## Usage
Open the project in your favorite code editor and edit the `./src/main.mjs` file. Update `reportFolderName`, add the URLs to the `urls` object and save the file. The reports are saved to the `reports/` dirtectory under a timestamped directory name.

Run the `npm start` command in your terminal to start running the reports.
