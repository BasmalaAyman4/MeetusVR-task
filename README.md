# MeetusAR Task: Login & Dashboard

This is a Next.js application demonstrating a complete authentication flow. It features a login page that authenticates against an external API and a protected dashboard page that is only accessible after a successful login. The project is built with the Next.js App Router, TypeScript, and Zustand for state management.

## Features

- **User Authentication**: Secure login form with email and password validation.
- **Protected Routes**: The dashboard route (`/dashboard`) is protected and requires authentication.
- **Session Management**: Uses secure, HTTP-only cookies to manage user sessions.
- **State Management**: Utilizes Zustand for managing UI state (e.g., loading states, password visibility) and authentication state on the client.
- **Animated UI**: Employs Framer Motion for smooth page transitions and component animations.
- **Custom UI Components**: Includes custom, reusable `Button` and `Input` components.
- **Server-Side Logic**: Leverages Next.js Server Actions for handling authentication logic, separating it from the client.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15 (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [CSS Modules](https://github.com/css-modules/css-modules)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Iconsax-react](https://iconsax-react.pages.dev/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm (or yarn/pnpm) installed on your machine.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/basmalaayman4/meetusar-task.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd meetusar-task
    ```
3.  Install dependencies:
    ```sh
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

### Running the Application

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the login page.

## Project Structure

The project is organized into the following directories:

- `app/`: Contains the application's routes, including the main login page (`/`) and the protected dashboard (`/dashboard`).
- `components/`: Holds reusable React components like `LoginForm`, `Dashboard`, and UI elements (`Button`, `Input`).
- `lib/`: Includes server-side logic, API service calls (`api.ts`), authentication helpers (`auth.ts`), and server actions (`action.ts`).
- `store/`: Contains Zustand stores for managing global state (`authStore.ts`, `uiStore.ts`).
- `styles/`: CSS Modules for styling individual components.
- `types/`: TypeScript type definitions for the application, primarily for authentication data.

## Authentication Flow

1.  The user navigates to the root URL (`/`), which renders the `LoginForm` component.
2.  The user enters their credentials. The form submission is handled by a Next.js Server Action (`loginAction`).
3.  The server action calls the external API endpoint (`https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token`) to validate the credentials.
4.  If the login is successful, the API returns a JWT token. This token is set as a secure, `httpOnly` cookie.
5.  The user is then redirected to the `/dashboard` page.
6.  The `/dashboard` page is a Server Component that first checks for the presence of a valid auth token using `getCurrentUser`.
7.  If the token is valid, the page renders the `Dashboard` component, which displays the user's information. If the token is missing or invalid, the user is redirected back to the login page.
8.  The dashboard provides a "Logout" button, which triggers a server action to clear the auth cookie and redirect the user to the login page.
"# MeetusVR-task" 
