# IELTS Course Product Page

This project implements a dynamic and localized product page for an IELTS Course, built with Next.js (App Router), TypeScript and Tailwind CSS. It fetches product data from an external API and supports internationalization (English and Bengali).

## Features

*   **Dynamic Product Data:** Fetches course details, instructors, features, and media from a remote API.
*   **Internationalization (i18n):** Supports English (EN) and Bengali (BN) languages, with content fetched dynamically based on the selected locale.
*   **Responsive Design:** Optimized for various screen sizes using Tailwind CSS.
*   **Sticky Navigation:** Horizontal scrollable navigation bar for quick access to different sections.
*   **Media Gallery:** Displays course videos and images with navigation controls.
*   **SEO Optimization:** Dynamically sets page metadata (title, description, keywords) based on API data for better search engine visibility.
*   **Containerization Ready:** Includes a Dockerfile for easy setup and deployment in a containerized environment.

## Technologies Used

*   **Next.js 15 (App Router):** React framework for building full-stack web applications.
*   **React 19:** JavaScript library for building user interfaces.
*   **TypeScript:** Strongly typed superset of JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Lucide React:** Icon library.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed:

*   Node.js 
*   npm 
*   Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nbappi13/mission-10-min-school.git 
    cd mission-10-min-school
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

To run the application in development mode:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The application will automatically redirect to the default English locale (`/en/product/ielts-course`).

You can also access specific locales directly:
*   English: [http://localhost:3000/en/product/ielts-course](http://localhost:3000/en/product/ielts-course)
*   Bengali: [http://localhost:3000/bn/product/ielts-course](http://localhost:3000/bn/product/ielts-course)

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

This command will create an optimized build of your application in the `.next` directory.

### Running in Production Mode (Locally)

After building, you can run the production build locally:

```bash
npm start
# or
yarn start
```

This will start the Next.js server on [http://localhost:3000](http://localhost:3000).

## Docker Setup 

This project includes a `Dockerfile` to containerize the application.

### Build the Docker Image

Navigate to the project root directory and run:

```bash
docker build -t ielts-course-app .
```

### Run the Docker Container

Once the image is built, you can run it:

```bash
docker run -p 3000:3000 ielts-course-app
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---



