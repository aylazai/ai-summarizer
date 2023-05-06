# Article Summarizer Application

This is a web application that allows users to summarize articles using OpenAI's GPT model. It is built using ReactJS and Vite, and features a responsive and visually appealing UI/UX with glass morphism effects created using Tailwind CSS. The application also implements advanced RTK query API requests that fire on condition, saves history using local storage, handles form events and catches errors, and implements copy to clipboard functionality.

The deployed application can be found here: https://jade-travesseiro-76dd55.netlify.app/

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the project:

```bash
npm run dev
```

## Usage

To use the application, simply enter the URL of an article you wish to summarize and select the desired summary length. The application will then generate a summary using OpenAI's GPT model.

The application also allows you to view your history of summarized articles and copy summaries to your clipboard for easy sharing.

## API

The application uses the OpenAI GPT model to generate article summaries. To use this feature, you will need to sign up for an OpenAI API key and provide it in the `.env` file.

## Contributing

If you would like to contribute to the project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature/bug fix
3. Make your changes and commit them with descriptive commit messages
4. Push your changes to your fork
5. Submit a pull request

Please make sure to write clean code and follow best practices when contributing.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
