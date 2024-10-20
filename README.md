# 🌐 DFS-BFS Graph Traversal: Dive into Graph Adventures!

Welcome to the **DFS-BFS Graph Traversal** project—a place where graphs come to life! Whether you're a curious student, an algorithm enthusiast, or a graph geek, this project will be your gateway to understanding the magical world of graph traversal using **Depth-First Search (DFS)** and **Breadth-First Search (BFS)**. 🌟

<div style="text-align: center;">
  <img src="https://raw.githubusercontent.com/alo7lika/DFS-BFS-Graph-Travers/refs/heads/master/DALL%C2%B7E%202024-10-16%2010.59.04%20-%20A%20project%20diagram%20showcasing%20the%20structure%20of%20a%20web%20application%20for%20DFS-BFS%20Graph%20Traversal.%20The%20diagram%20includes%20key%20components%20such%20as%20a%20user%20interf.webp" alt="Project Diagram" width="500">
</div>


### 🚀 What Makes This Special?
This isn't just another graph tool. Along with offering powerful graph traversal algorithms, the project features a smooth and secure **Login** and **Signup** system, making sure your data is always safe and sound 🔐. Right now, user data is stored in **LocalStorage**, but don't worry—big plans are on the horizon with **OAuth integration** for easy login via Google and more!

### 🔧 Why You'll Love It
- 💡 **Interactive Graph Creation**: Create custom graphs with just a few clicks! Add nodes and edges, and watch as DFS and BFS algorithms traverse through your data.
- 🔍 **Instant Visual Feedback**: See real-time graph traversal with visual results, so you know exactly how your data is flowing.
- 🖥️ **Full-Stack Powerhouse**: The frontend is built using **Angular** for a seamless experience, while the backend is powered by **Node.js** and **Express.js**, ensuring you get top-notch performance and scalability.

### 🔮 Future Upgrades Await
This is just the beginning! With plans to incorporate advanced algorithms (Dijkstra's, A*) 🧠, user dashboards 📊, and mobile-friendly features 📱, we’re on the path to making this project an indispensable tool for graph lovers everywhere.

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
8. 📚 [API Documentation](#-api-documentation)
9. 🔐 [Login and Signup Pages](#-login-and-signup-pages)
10. 🖥️ [How the Server Works](#-how-the-server-works)
11. 📊 [Graph Feature](#-how-the-graph-feature-works)
12. 🗺️ [Roadmap](#-roadmap)
13. 🤝 [Contributing](#-contributing)
14. 👥 [Contributors](#-our-contributors)
15. 📜 [License](#-license)
---

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

## 🧪 Testing Instructions

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

---

## 📚 API Documentation

### Base URL
[http://localhost:PORT/api]
*Replace `PORT` with the port number your backend is running on (default is usually 3000).*

### Endpoints

#### 1. **User Authentication**

- **Signup**
  - **URL**: `/signup`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Response**:
    - **201 Created**: User registered successfully.
    - **400 Bad Request**: Invalid input or username already exists.

- **Login**
  - **URL**: `/login`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Response**:
    - **200 OK**: User logged in successfully, returns user details.
    - **401 Unauthorized**: Invalid credentials.

#### 2. **Graph Traversal**

- **DFS Traversal**
  - **URL**: `/traverse/dfs`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "nodes": ["string"],
      "edges": ["string"]
    }
    ```
  - **Response**:
    - **200 OK**: Returns the order of nodes visited in DFS traversal.

- **BFS Traversal**
  - **URL**: `/traverse/bfs`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "nodes": ["string"],
      "edges": ["string"]
    }
    ```
  - **Response**:
    - **200 OK**: Returns the order of nodes visited in BFS traversal.

### Example Request

**DFS Traversal Request Example**:
```bash
curl -X POST http://localhost:3000/api/traverse/dfs \
-H "Content-Type: application/json" \
-d '{
  "nodes": ["A", "B", "C", "D"],
  "edges": ["A-B", "A-C", "B-D"]
}'
```

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

## 🗺️ Roadmap

| **Timeline**   | **Milestone**                  | **Description**                                                                                         |
|----------------|--------------------------------|---------------------------------------------------------------------------------------------------------|
| **2024**       | **Q4 2024**                    | 🔍 **Enhanced User Authentication**: Implement OAuth for third-party authentication (Google, Facebook) and improve security measures for password storage. |
| **2025**       | **Q1 2025**                    | 📈 **Advanced Graph Algorithms**: Integrate additional graph traversal algorithms (e.g., Dijkstra's and A*) and provide visualizations for different traversal methods. |
|                | **Q2 2025**                    | 🖥️ **User Dashboard**: Develop a dashboard for users to view their traversal history and saved graphs. Enable features for users to share their graphs with others. |
|                | **Q3 2025**                    | 📱 **Mobile-Friendly Version**: Ensure the application is responsive and works well on mobile devices. Create a mobile application version for iOS and Android. |
|                | **Q4 2025**                    | 🌐 **Multilingual Support**: Add support for multiple languages to enhance accessibility. Enable user-selectable language options in the application settings. |


## Contributing
We welcome contributions from developers of all experience levels. Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## 👀 Our Contributors

- We extend our heartfelt gratitude for your invaluable contribution to our project! Your efforts play a pivotal role in elevating this project to greater heights.
- Make sure you show some love by giving ⭐ to our repository.

<div align="center">

| Rank | Contributor                       | Avatar                                                         |
|------|----------------------------------|----------------------------------------------------------------|
| 1    | [Shubham Agarwal](https://github.com/shubhagarwal1)      | ![Shubham Agarwal](https://github.com/shubhagarwal1.png)      |
| 2    | [Mehul Prajapati](https://github.com/mehul-m-prajapati)   | ![Mehul Prajapati](https://github.com/mehul-m-prajapati.png)   |
| 3    | [Sakeel](https://github.com/sakeel-103)                  | ![Sakeel](https://github.com/sakeel-103.png)                   |
| 4    | [Jashwanth R](https://github.com/Jashwanth-rit)          | ![Jashwanth R](https://github.com/Jashwanth-rit.png)           |
| 5    | [Ananya Gupta](https://github.com/ananyag309)            | ![Ananya Gupta](https://github.com/ananyag309.png)             |
| 6    | [Alolika Bhowmik](https://github.com/alo7lika)           | ![Alolika Bhowmik](https://github.com/alo7lika.png)            |
| 7    | [Muskan Sharma](https://github.com/muskan171105)         | ![Muskan Sharma](https://github.com/muskan171105.png)          |
| 8    | [Aditya Kalburgi](https://github.com/adityakalburgi)     | ![Aditya Kalburgi](https://github.com/adityakalburgi.png)      |
| 9    | [Life Hashed](https://github.com/LifeHashed)             | ![Life Hashed](https://github.com/LifeHashed.png)              |
| 10   | [Varsha](https://github.com/Varsha567)                    | ![Varsha](https://github.com/Varsha567.png)                    |
| 11   | [Viv](https://github.com/09viv)                           | ![Viv](https://github.com/09viv.png)                            |
| 12   | [Shariq](https://github.com/Shariq2003)                  | ![Shariq](https://github.com/Shariq2003.png)                   |
| 13   | [Himanshu Kumar](https://github.com/Himanshu-kumar025)   | ![Himanshu Kumar](https://github.com/Himanshu-kumar025.png)   |
| 14   | [Avisha](https://github.com/avisha191)                    | ![Avisha](https://github.com/avisha191.png)                    |
| 15   | [Mausumi](https://github.com/Mausumi134)                  | ![Mausumi](https://github.com/Mausumi134.png)                  |
| 16   | [Bindu](https://github.com/itbindu)                       | ![Bindu](https://github.com/itbindu.png)                       |
| 17   | [Dipesh](https://github.com/dipkulkhandelwal21)          | ![Dipesh](https://github.com/dipkulkhandelwal21.png)          |
| 18   | [Mahaveer Gurjar](https://github.com/mahaveergurjar)     | ![Mahaveer Gurjar](https://github.com/mahaveergurjar.png)     |
| 19   | [Rudra Pratap](https://github.com/rudrapratap63)          | ![Rudra Pratap](https://github.com/rudrapratap63.png)          |
| 20   | [Sawan Kushwah](https://github.com/Sawan-Kushwah)         | ![Sawan Kushwah](https://github.com/Sawan-Kushwah.png)         |
| 21   | [Rahul Prabhu](https://github.com/T-Rahul-prabhu-38)      | ![Rahul Prabhu](https://github.com/T-Rahul-prabhu-38.png)     |
| 22   | [Aditi Jain](https://github.com/Aditijainnn)              | ![Aditi Jain](https://github.com/Aditijainnn.png)              |
| 23   | [Saurabh](https://github.com/saurabh-dev-vns)            | ![Saurabh](https://github.com/saurabh-dev-vns.png)            |
| 24   | [Smog Root](https://github.com/smog-root)                 | ![Smog Root](https://github.com/smog-root.png)                 |
| 25   | [Endless](https://github.com/iamendless10)                | ![Endless](https://github.com/iamendless10.png)                |
| 26   | [Aswani Bolisetti](https://github.com/AswaniBolisetti)    | ![Aswani Bolisetti](https://github.com/AswaniBolisetti.png)    |
| 27   | [Supratit Datta](https://github.com/SupratitDatta)        | ![Supratit Datta](https://github.com/SupratitDatta.png)        |
| 28   | [Khurshed](https://github.com/khurshed07)                 | ![Khurshed](https://github.com/khurshed07.png)                 |
| 29   | [Mani](https://github.com/devxMani)                        | ![Mani](https://github.com/devxMani.png)                        |
| 30   | [Dipu](https://github.com/Dipu2552003)                    | ![Dipu](https://github.com/Dipu2552003.png)                    |
| 31   | [Sandi Gupta](https://github.com/Sandigupta)              | ![Sandi Gupta](https://github.com/Sandigupta.png)              |
| 32   | [Thunder Shadows](https://github.com/ThunderShadows)      | ![Thunder Shadows](https://github.com/ThunderShadows.png)      |

</div>


---
## 📜 License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software under the terms of the license. 
---

### 📬 Feel free to contribute or open issues if you find any bugs!

