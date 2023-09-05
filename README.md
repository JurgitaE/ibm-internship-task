![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)

# CryptoChart App

## 🌟 About

The CryptoChart App is a web application that provides cryptocurrency price visualization, utilizing daily close data from the Binance exchange. This project adheres to the mandatory task requirements for the JavaScript Application Developer internship at IBM.

## 🎯 Project Features/Goals

-   Responsive layout
-   Cryptocurrency search and selection
-   Input validation
-   Date range selection
-   Price chart display
-   User actions logging

## ✔️ Technical IBM Requirements (Mandatory)

1.  **Frontend**: The frontend is built using React.
1.  **Backend**: The backend is built using Node.js.
1.  **Styling**: Custom styling is implemented using Sass and Tailwind CSS.
1.  **Source Code Management**: The project's source code is - hosted on GitHub.
1.  **Documentation**: Documentation is provided in this README.

## 🏭 Key Technologies and Choices

-   **Cryptocurrency Exchange**: Binance exchange was selected as the primary data source for cryptocurrency information.
-   **Styling**: The project utilizes a combination of Sass and Tailwind CSS for styling.
-   **API Interaction**: Axios is used for making HTTP requests from the frontend to the backend.
-   **Express**: The backend is powered by Express, a popular Node.js web application framework.
-   **Charting Library (react-chartjs-2)**: The project uses react-chartjs-2 to create historical data charts.

## 📝 Side Notes

-   **Logging search in the server**: A timeout of 0.2 seconds was set for logging cryptocurrency search. This ensures that user searches are logged with a slight delay to prevent excessive logging.

-   **Default End Date**: If no end date is selected, the current date is automatically used as the end date in date picker.

-   **Default Start Date**: If no start date is selected, it is automatically set to 30 days prior to the end date.

## 🧰 Getting Started

### 💻 Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js - [Download and install](https://nodejs.org)
-   Git - [Download and install](https://git-scm.com)

### 🏃 Run Locally

To run the project locally, follow these steps:

1. Clone the repository

    ```sh
    git clone https://github.com/JurgitaE/ibm-internship-task.git
    ```

2. Install frontend NPM packages in ibm-internship-task/react folder

    ```sh
    npm install
    ```

3. Start the second terminal for the backend ibm-internship-task/react folder

    ```sh
    npm run dev
    ```

4. Install backend NPM packages in ibm-internship-task/server folder

    ```sh
    npm install
    ```

5. Start the backend terminal in ibm-internship-task/server folder

    ```sh
    npm start
    ```

6. Open a web browser and navigate to [http://localhost:5173](http://localhost:5173) to access react application.

### 🧪 Running Tests

There are no tests for this project.

## 👩‍💻 Authors

Jurgita: [Github](https://github.com/JurgitaE)

## ⚠️ License

Distributed under the MIT License. See LICENSE for more information.

## 🔗 Other Resources

No other resources
