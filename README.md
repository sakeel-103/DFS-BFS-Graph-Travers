

# 🧭 DFS-BFS Graph Traversal

This project implements **Depth-First Search (DFS)** and **Breadth-First Search (BFS)** algorithms for graph traversal. The backend includes user authentication functionality with a **Login** and **Signup** page. The project currently stores user data in **local storage**.

## 🌟 Features

- 🔑 User **Login** and **Signup** system
- 🔍 DFS and BFS graph traversal algorithms
- 💾 Data persistence using **LocalStorage**
- 🖥️ Frontend built with **Angular**
- 🔧 Backend using **Node.js** with **Express.js**

---

## 📂 Project Structure

```bash
.vscode/                    # Contains workspace settings for VSCode
backend/                    # Backend directory (Node.js/Express)
public/                     # Public assets like images, logos, etc.
src/                        # Angular application source code
.editorconfig               # Editor configuration for consistent coding style
.gitignore                  # Git ignore file to exclude certain files from being committed
CODE_OF_CONDUCT.md          # Code of conduct for contributors
CONTRIBUTING.md             # Guidelines for contributing to the project
README.md                   # Project documentation file
angular.json                # Angular workspace configuration
netlify.toml                # Configuration for deploying to Netlify
package-lock.json           # Locked versions of installed npm dependencies
package.json                # Project metadata and npm dependencies
tsconfig.app.json           # TypeScript configuration for the app
tsconfig.json               # General TypeScript configuration
tsconfig.spec.json          # TypeScript configuration for testing
```

---

## ⚙️ Prerequisites

Make sure you have the following installed before running the project:

- 🟢 [Node.js](https://nodejs.org/en/download/) (v14 or above)
- 📦 npm (comes with Node.js)
- 🅰️ [Angular CLI](https://angular.io/cli) (globally installed)

---

## 🚀 How to Set Up and Run the Project

### 🛠️ Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/dfs-bfs-graph-traversal.git
cd GRAPH-TRAVERSAL
```

### 🛠️ Step 2: Install Frontend Dependencies

```bash
npm install
```

### 🛠️ Step 3: Navigate to Backend Directory and Install Backend Dependencies

```bash
cd backend
npm install
```

### 🛠️ Step 4: Run the Backend Server

From the `backend` directory, start the backend:

```bash
node server.js
```

Alternatively, you can use **nodemon** for automatic restarts:

```bash
npm install -g nodemon
nodemon server.js
```

### 🛠️ Step 5: Start the Frontend Server

Go back to the project root (`GRAPH-TRAVERSAL`) and run the Angular development server:

```bash
ng serve
```

Your frontend will be running at `http://localhost:5000` 🌐.

---

## 🔐 Login and Signup Pages

- The **Signup Page** allows users to register by entering a username and password, which is stored in **LocalStorage**.
- The **Login Page** checks credentials against the data stored in LocalStorage.

### 🛠️ How to Access Signup Details from LocalStorage

1. 🖱️ Right-click on the **Signup page** and select **Inspect**.
2. 🧰 Navigate to the **Application** tab in the developer tools.
3. 📂 Under **Storage**, expand **LocalStorage**.
4. 🔍 You’ll find the stored signup details there.

---

## 🖥️ How the Server Works

The backend server, built with **Node.js** and **Express.js**, handles:

- 🛡️ **User Authentication**: A basic registration and login system.
- 🔄 **Graph Traversal**: Provides APIs for DFS and BFS traversals.

## 📊 How the Graph Feature Works

- Input your nodes. **Make sure it is in A,B,... format. Comma is necessary**
- Input your edges. **Make sure it is in the [to]-[from] format. Eg: 0-1**
- Click on **create custom graph** button 🔵
- See how the magic happens

Example: 

![alt text](image.png)

Output:

![alt text](image-1.png)

## Contributing
We welcome contributions from developers of all experience levels. Please refer to the CONTRIBUTING.md file for guidelines.

---

### 📬 Feel free to contribute or open issues if you find any bugs!

