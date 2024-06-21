# Atfarm End-to-End Testing Automation

This repository contains functional and end-to-end tests for Atfarm, using Playwright for automation.

## Getting Started

Follow these steps to set up the project:

### 1. Clone the Repository

Clone this repository to your local machine using:

git clone <https://github.com/niksaklecak/at-farm-project>

### 2. Install Dependencies

Navigate to the project directory and install the necessary dependencies with:

npm install

### 3. Set Up VSCode Extensions

We recommend installing the following Visual Studio Code extensions for a better development experience:

- Prettier - for code formatting
- Playwright Test for VSCode - for running and debugging tests

## Running Tests

We have predefined several npm scripts for running tests:

- `run_tests_ui`: Run tests with Playwright's UI.
- `run_tests_headed`: Run tests in headed mode.
- `codegen`: Generate code with Playwright.
- `run_tests_chromium`: Run tests in Chromium.
- `run_tests_safari`: Run tests in Safari.
- `run_tests_firefox`: Run tests in Firefox.
- `run_tests_Chrome`: Run tests in Google Chrome.
- `run_tests_Edge`: Run tests in Microsoft Edge.
- `run_all_tests_headless`: Run all tests in headless mode.

You can run these scripts with `npm run <script-name>`. For example, to run tests in headed mode, use:

npm run run_tests_headed

## Code Formatting

We use Prettier for code formatting. You can format your code with:
npm run format

To check the format of your code, use:
npm run check-format

To format all files, use:
npm run format-all

## Project Structure

Here's a high-level overview of our project structure:

- `tests`: This directory contains all the test files.
- `page-objects`: This directory contains Page Object Models (POMs) for different pages of the application.
- `data`: This directory contains all the hardcoded data used for tests
- `helpers`: This directory contains utility functions and custom commands used across tests.
- `env`: This file contains all the information related to environment on which the tests are running
- `unit-tests`: This directory contains all the unit tests
