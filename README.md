# 🚀 MegaBlogProject: A Full-Stack Blog Platform (https://mega-blog-project-2.netlify.app/)

This is a comprehensive, full-stack blogging application built using **React** and leveraging **Appwrite** as the backend service. It features robust user authentication, post management with rich text editing, and a modern, responsive design powered by **Tailwind CSS** and **Flowbite-React**.

-----

## ✨ Features

The application provides a complete set of blogging features for both authenticated and guest users:

  * **User Authentication:** Secure **Sign-up**, **Login**, and **Logout** functionality.
  * **Route Protection:** Uses an `AuthLayout` component to protect sensitive routes like "All Posts" and "Add Post," ensuring only logged-in users can access them.
  * **Post Management (CRUD):** Complete **Create, Read, Update, and Delete** operations for blog posts.
  * **Rich Text Editor (RTE):** Integrated **TinyMCE** editor for creating and formatting rich blog post content.
  * **Featured Images:** Ability to upload an image for each post, with image management (upload, delete, preview) handled by Appwrite Storage.
  * **Content Workflow:** Posts can be set to **'active'** or **'inactive'** status, allowing for draft management.
  * **Dynamic Slugging:** The URL slug for a post is automatically generated and transformed from the post's title.
  * **Global State:** Centralized state management using **Redux Toolkit** to handle user status and a global list of posts.

-----

## 🛠️ Tech Stack

The project is built with the following core technologies:

| Category | Technology | Purpose / Source |
| :--- | :--- | :--- |
| **Frontend** | **React** (with Vite) | Main UI library |
| **Backend** | **Appwrite** | BaaS (Backend as a Service) for Auth, DB, and Storage |
| **State Management** | **Redux Toolkit** (RTK) | Predictable state container |
| **Styling** | **Tailwind CSS**, **Flowbite-React** | Utility-first CSS framework and UI components |
| **Routing** | **React Router DOM** | Declarative routing for React |
| **Forms** | **React Hook Form** | Flexible form validation and management |
| **RTE** | **TinyMCE** | Rich Text Editor for blog content |

-----

## ⚙️ Installation and Setup

Follow these steps to get your local copy up and running.

### Prerequisites

You must have **Node.js** (version 18 or higher) and **npm** installed.

### 1\. Clone the repository

```bash
git clone <repository-url>
cd react-blog-project
```

### 2\. Install dependencies

```bash
npm install
```

### 3\. Appwrite Backend Setup

This project requires an **Appwrite** instance.

1.  Set up an Appwrite project (local or cloud).
2.  Create the necessary services (Database, Tables, Storage Bucket) as referenced in the configuration.

### 4\. Environment Variables

Create a file named `.env` in the root directory to store your Appwrite credentials. These variables are securely loaded using `import.meta.env` in the configuration.

Add the following variables to your `.env` file:

```
VITE_APPWRITE_URL="[Your-Appwrite-Endpoint]"
VITE_APPWRITE_PROJECT_ID="[Your-Project-ID]"
VITE_APPWRITE_DATABASE_ID="[Your-Database-ID]"
VITE_APPWRITE_TABLES_ID="[Your-Posts-Table-ID]"
VITE_APPWRITE_BUCKET_ID="[Your-Storage-Bucket-ID]"
# You will also need to replace the TinyMCE API key in src/components/RTE.jsx with your own.
```

### 5\. Run the application

Start the development server using the script defined in `package.json`:

```bash
npm run dev
```

The application will typically be available at `http://localhost:5173`.

-----

## 📁 Project Structure

The codebase is organized into logical directories for clear separation of concerns:

```
src/
├── appwrite/             # Appwrite service files (Auth and Database/Storage config)
├── assets/               # Static assets
├── components/           # Reusable UI components
│   ├── Header/           # Header and Logout button
│   ├── Footer/           # Footer component
│   ├── post-form/        # PostForm component (used for Add and Edit)
│   ├── AuthLayout.jsx    # HOC for protecting routes
│   ├── RTE.jsx           # Rich Text Editor wrapper
│   └── ...               # Input, Button, Logo, Select, etc.
├── conf/                 # Environment variable configuration
├── pages/                # Route-level components
├── store/                # Redux Toolkit setup
│   ├── blogSlice.js      # Auth state slice
│   ├── postSlice.js      # Post data slice (uses createAsyncThunk for fetching)
│   └── store.js          # Redux store configuration
├── App.jsx               # Main application layout and global auth check
├── main.jsx              # App entry point and React Router setup
├── index.css             # Global and Tailwind CSS imports
└── ...
```

-----

## 📜 Available Scripts

In the project directory, you can run the following scripts:

| Script | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode using **Vite**. |
| `npm run build` | Builds the app for production to the `dist` folder. |
| `npm run lint` | Lints the code using the configured **ESLint** rules. |
| `npm run preview` | Serves the production build locally. |
