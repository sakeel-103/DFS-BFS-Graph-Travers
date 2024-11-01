<a id="top"></a>
<h1 align="center">🧭 DFS-BFS Graph Traversal</h1>

This project implements **Depth-First Search (DFS)** and **Breadth-First Search (BFS)** algorithms for graph traversal. The backend includes user authentication functionality with a **Login** and **Signup** page. The project currently stores user data in **local storage**.

### 🔮 Future Upgrades Await
This is just the beginning! With plans to incorporate advanced algorithms (Dijkstra's, A*) 🧠, user dashboards 📊, and mobile-friendly features 📱, we’re on the path to making this project an indispensable tool for graph lovers everywhere.

<table align="center">
    <thead align="center">
        <tr border: 2px;>
            <td><b>🌟 Stars</b></td>
            <td><b>🍴 Forks</b></td>
            <td><b>🐛 Issues</b></td>
            <td><b>🔔 Open PRs</b></td>
            <td><b>🔕 Close PRs</b></td>
        </tr>
     </thead>
    <tbody>
         <tr>
            <td><img alt="Stars" src="https://img.shields.io/github/stars/sakeel-103/DFS-BFS-Graph-Travers?style=flat&logo=github"/></td>
             <td><img alt="Forks" src="https://img.shields.io/github/forks/sakeel-103/DFS-BFS-Graph-Travers?style=flat&logo=github"/></td>
            <td><img alt="Issues" src="https://img.shields.io/github/issues/sakeel-103/DFS-BFS-Graph-Travers?style=flat&logo=github"/></td>
            <td><img alt="Open Pull Requests" src="https://img.shields.io/github/issues-pr/sakeel-103/DFS-BFS-Graph-Travers?style=flat&logo=github"/></td>
           <td><img alt="Close Pull Requests" src="https://img.shields.io/github/issues-pr-closed/sakeel-103/DFS-BFS-Graph-Travers?style=flat&color=critical&logo=github"/></td>
        </tr>
    </tbody>
</table>

<img src="https://raw.githubusercontent.com/alo7lika/DFS-BFS-Graph-Travers/refs/heads/master/Images/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

### This project is now OFFICIALLY accepted for

<div align="center">
  <img src="https://raw.githubusercontent.com/alo7lika/DFS-BFS-Graph-Travers/refs/heads/master/Images/329829127-e79eb6de-81b1-4ffb-b6ed-f018bb977e88.png" alt="GSSoC 2024 Extd" width="80%">
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/alo7lika/DFS-BFS-Graph-Travers/refs/heads/master/Images/hacktober.png" alt="Hacktober fest 2024" width="80%">
</div>

<br>

<!--Line-->
<img src="https://raw.githubusercontent.com/alo7lika/DFS-BFS-Graph-Travers/refs/heads/master/Images/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">


## 📑 Table of Contents


1. 🌟 [Features](#-features)
2. 🛠️ [Technical Stack](#-technical-stack)
3. 📝 [Changelog](#-changelog)
4. 📂 [Project Structure](#-project-structure)
5. ⚙️ [Prerequisites](#-prerequisites)
6. 🚀 [How to Set Up and Run the Project](#-how-to-set-up-and-run-the-project)
7. 🧪 [Testing Instructions](#-testing-instructions)
8. 🔐 [Login and Signup Pages](#-login-and-signup-pages)
9. 🖥️ [How the Server Works](#-how-the-server-works)
10. 📊 [Graph Feature](#-how-the-graph-feature-works)
11. 🗺️ [Roadmap](#-roadmap)
12. 🤝 [Contribution Guide](#-contribution-guide)
13. 👥 [Our Contributors](#-our-contributors)
14. 📜 [License](#-license)


## 🌟 Features

- 🔑 User **Login** and **Signup** system
- 🔍 DFS and BFS graph traversal algorithms
- 💾 Data persistence using **LocalStorage**
- 🖥️ Frontend built with **Angular**
- 🔧 Backend using **Node.js** with **Express.js**

---
## 🛠️ Technical Stack

| **Component**        | **Technology**                                                                 |
|----------------------|-------------------------------------------------------------------------------|
| **Frontend**         | Angular 🅰️                                                                    |
| **Backend**          | Node.js 🟢, Express.js ⚙️                                                    |
| **Authentication**   | LocalStorage 🔒 (with plans to integrate OAuth 🔑)                            |
| **Database**         | LocalStorage for user data 💾 (future plans for database integration 📊)      |
| **Graph Algorithms** | DFS and BFS implemented for traversal 📈                                      |
| **Deployment**       | Netlify configuration for frontend 🌐 
---

## 📝 Changelog

### Version 1.0.0 (Initial Release)
- Implemented **DFS** and **BFS** graph traversal algorithms. 🔍
- Added **Login** and **Signup** pages with user data stored in **LocalStorage**. 🔑
- Basic project structure setup with Angular for the frontend and Node.js/Express.js for the backend. 🏗️


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


 <details>
   <summary><h2>🚀 How to Set Up and Run the Project</h2></summary>

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


</details>

<hr>

<details>
   <summary><h2>🧪 Testing Instructions</h2></summary>


To ensure the reliability and functionality of the project, follow these testing instructions:

### Unit Testing

1. **Navigate to the frontend directory**:
   ```bash
   cd src
   ```
2. **Run the unit tests:**
   ```bash
   ng test
   ```
### End-to-End Testing

1. **Install Protractor (if not already installed)**:
   ```bash
   npm install -g protractor
   ```
2. **Start the Protractor server**:
   ```bash
   webdriver-manager update
   webdriver-manager start
   ```
3. **Run the end-to-end tests**:
   ```bash
   ng e2e
   ```
### Manual Testing

- After running the application, perform manual testing by interacting with the **Login** and **Signup** pages to ensure functionality.
- Test the **graph traversal features** by creating graphs with various nodes and edges, checking for expected behavior.



</details>

<hr>

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
 

<details>
   <summary><h3>Example: </h3></summary>

![alt text](image.png)

Output:

![alt text](image-1.png)

</details>

<hr>

## 🗺️ Roadmap

| **Timeline**   | **Milestone**                  | **Description**                                                                                         |
|----------------|--------------------------------|---------------------------------------------------------------------------------------------------------|
| **2024**       | **Q4 2024**                    | 🔍 **Enhanced User Authentication**: Implement OAuth for third-party authentication (Google, Facebook) and improve security measures for password storage. |
| **2025**       | **Q1 2025**                    | 📈 **Advanced Graph Algorithms**: Integrate additional graph traversal algorithms (e.g., Dijkstra's and A*) and provide visualizations for different traversal methods. |
|                | **Q2 2025**                    | 🖥️ **User Dashboard**: Develop a dashboard for users to view their traversal history and saved graphs. Enable features for users to share their graphs with others. |
|                | **Q3 2025**                    | 📱 **Mobile-Friendly Version**: Ensure the application is responsive and works well on mobile devices. Create a mobile application version for iOS and Android. |
|                | **Q4 2025**                    | 🌐 **Multilingual Support**: Add support for multiple languages to enhance accessibility. Enable user-selectable language options in the application settings. |


## 🤝 Contribution Guide

We welcome contributions of all kinds—whether it’s fixing bugs, adding new features, or improving documentation. Before you start contributing, please take a moment to review our guidelines to ensure smooth collaboration.

### Getting Started

To contribute to this project, follow these steps:

1. **Read the Contributing Guide**: We’ve provided a detailed guide to help you get started with contributing. It includes all the steps you need to follow, from setting up the repository to submitting a pull request.
   
   👉 **[Check out the Contributing Guide](./CONTRIBUTING.md)**

2. **Fork the Repository**: Fork the project repository to your GitHub account, so you can make changes without affecting the original project.

3. **Make Meaningful Changes**: Whether you’re adding a new feature, fixing bugs, or improving documentation, ensure that your contributions are significant and add value to the project.

4. **Write Clean Code**: Follow the code style and best practices outlined in the project. Clean, readable, and well-documented code helps keep the project maintainable and easier to review.

5. **Testing**: If you're adding a feature or fixing a bug, ensure you write relevant tests to maintain the integrity of the project’s functionality.

### Submitting a Pull Request

Once your changes are ready, you can submit a pull request by following these steps:

1. **Commit Your Changes**: Write descriptive commit messages that explain the changes you’ve made.
   
2. **Push to Your Fork**: Push the changes to your forked repository and create a new branch for your feature or fix.

3. **Open a Pull Request**: Navigate to the original repository and create a pull request, describing your changes in detail and why they are necessary.

By following these guidelines, you’ll ensure that your contributions align with the project’s goals and maintain a high standard. We appreciate your efforts in making this project better! 😊

For more detailed instructions, please refer to our full **[Contributing Guide](./CONTRIBUTING.md)**.

<hr>

<h2 align = "center">Our Contributors ❤️</h2>

- We extend our heartfelt gratitude for your invaluable contribution to our project! Your efforts play a pivotal role in elevating this project to greater heights.
- Make sure you show some love by giving ⭐ to our repository.

<p align="center">
    <img src="https://api.vaunt.dev/v1/github/entities/sakeel-103/repositories/DFS-BFS-Graph-Travers/contributors?format=svg&limit=54" width="700" height="250" />
</p>

<p align="center">
<a href="https://github.com/sakeel-103/DFS-BFS-Graph-Travers/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sakeel-103/DFS-BFS-Graph-Travers" />
</a>
</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Stargazers ❤️

<div align='left'>

[![Stargazers repo roster for @sakeel-103/DFS-BFS-Graph-Travers](https://reporoster.com/stars/dark/sakeel-103/DFS-BFS-Graph-Travers)](https://github.com/sakeel-103/DFS-BFS-Graph-Travers/stargazers)


</div>

## Forkers ❤️

[![Forkers repo roster for @sakeel-103/DFS-BFS-Graph-Travers](https://reporoster.com/forks/dark/sakeel-103/DFS-BFS-Graph-Travers)](https://github.com/sakeel-103/DFS-BFS-Graph-Travers/network/members)


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)



## 📜 License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.

By contributing to this repository, you agree that your contributions will be licensed under its MIT License.
---

### 📬 Feel free to contribute or open issues if you find any bugs!


<hr>
<div>
  <h2><img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f64f_1f3fb/512.webp" width="35" height="35"> Support </h2>
</div>

<div>
  Don't forget to leave a star<img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31f/512.webp" width="35" height="30"> for this project!
</div> 
<hr>

<a href="#top" style="position: fixed; bottom: 20px; right: 20px; background-color: black ; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; font-family: Arial; font-size: 16px;">Go to Top</a>

## Connect with Me

Feel free to connect with me on social platforms:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/mdsakeel103/)
[![LeetCode](https://img.shields.io/badge/LeetCode-Profile-orange?style=for-the-badge&logo=leetcode)](https://leetcode.com/u/mdsakeel-103/)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=for-the-badge&logo=github)](https://github.com/sakeel-103/)
