**Final Evaluation Project: Task Management Application**

Features & Requirements:

1️⃣ Authentication

Implement a Login Form where users enter their credentials.(emai(should be in email formate and requiredl-username required- password required min 8 characters)

Restrict access to the application—users cannot access any pages if they are not authenticated.

Include a Logout Button to log out and redirect users to the login page.

2️⃣ Welcome Page (Dashboard)

Upon login, users are redirected to a Welcome Page displaying all their tasks.  
Each task will include:  
Task Name  
Task Description  
Deadline  
Status: (Pending, Finished, Active)

3️⃣ Task Management

✅ Adding Tasks:  
Clicking the “Add New Task” button opens a separate page with a form to create a new task.  
The form includes:  
Task Name required  
Task Description required  
Deadline required , date formate  
Upon submission, the task is added to the list.

✅ Checkbox For each task , once clicked , convert status pending Active

✅ Deleting Tasks:  
Clicking the “Delete” button removes the task from the list.

4️⃣ Task Filtering  
Implement filtering options to view tasks by their status (Pending, Finished, Active).

5️⃣ API Integration  
Students will be provided with API endpoints for:  
Fetching all tasks  
Adding a new task  
Deleting a task  
API calls must handle loading states and errors appropriately.

6️⃣ Styling  
Students can use any library (e.g., Tailwind CSS, Bootstrap, Material-UI) for styling.

Note: try to use the advanced feature if needed as we discussed in the last session  
 Use Redux toolkit or Context api of needed

Fake Api:  
We will fake the data using json server with this following steps:

1- add this library to the your project :  
npm install json-server

Documentation: [https://www.npmjs.com/package/json-server](https://www.npmjs.com/package/json-server)

2- create a file called db.json in the root directory not in src folder

3- in this file we will add example for json task object

{

"tasks": \[

    { "id": "1", "name": "a title",”description”:”test”, "status": “pending”,”deadline”:”2022-06-17T11:06:50.369Z”

} \]

}

3-Run this command in the vsc terminal

npx json-server db.json

4- you url will be [http://localhost:3000](http://localhost:3000)

With the following

GET /tasks

GET /tasks/:id

POST /tasks

PUT /tasks/:id

PATCH /tasks/:id

DELETE /tasks/:id

5- with this library if you add any task using the api it will be added automatically to the json file and so on with delete it will be from the json file

After finishing the project send the github repo link to: [mennaayman94@gmail.com](mailto:mennaayman94@gmail.com)

Deadline: 22/4/2025
