# CheckQuest

CheckQuest is an interview management application designed to help interviewers create structured checklists, conduct interviews, and score candidates consistently.
Application is available at: https://checkquest.komlev.me/

## Features

- **Checklist management**: Create and maintain reusable interview checklists
- **Customizable Checklists**: Design section-based checklists with weighted scoring
- **Interview Tracking**: Conduct and record interviews with consistent evaluation criteria
- **Scoring System**: Automatically calculate candidate scores based on completed checklist items

## Tech Stack

- React - view
- TailwindCSS and DaisyUI - UI
- Nanostores - state
- Wouter - routing
- Typescript, Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm, npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/komlev/checkquest.git
   cd checkquest
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Start the development server

   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

The flow is pretty straighforward. There is a checklists section and an interviews section.
First you add a checklist with sections/questions and you assign a score to each question. There might be "extra" questions which are not required but they add bonus points.
After checklist creation you can start an interview and check all the necessary questions.
All data is stored locally in the browser.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Icons
Icons are from [FontAwesome](https://fontawesome.com/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
