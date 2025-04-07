import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import {
  setTasks,
  setLoading,
  setError,
  setFilter,
  deleteTask,
  updateTaskStatus,
} from "../store/slices/taskSlice";
import {
  getTasks,
  deleteTask as deleteTaskApi,
  updateTaskStatus as updateTaskStatusApi,
} from "../services/api";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error, filter } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getTasks();
        dispatch(setTasks(data));
      } catch (error) {
        dispatch(setError("Failed to fetch tasks"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchTasks();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteTaskApi(id);
      dispatch(deleteTask(id));
    } catch (error) {
      dispatch(setError("Failed to delete task"));
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "active" : "finished";
    try {
      await updateTaskStatusApi(id, newStatus);
      dispatch(updateTaskStatus({ id, status: newStatus }));
    } catch (error) {
      dispatch(setError("Failed to update task status"));
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return task.status === "pending";
    if (filter === "active") return task.status === "active";
    if (filter === "finished") return task.status === "finished";
    return true;
  }).filter(task => task.userId === user.id);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
        <div className="space-x-4">
          <Link to="/add-task" className="btn-primary">
            Add New Task
          </Link>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>
      </div>

      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
          className="bg-gray-100 text-gray-800 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="finished">Finished</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="task-card">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {task.name}
                </h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">
                  Deadline: {new Date(task.deadline).toLocaleDateString()}
                </p>
                <span
                  className={`status-badge ${
                    task.status === "pending"
                      ? "status-pending"
                      : task.status === "active"
                      ? "status-active"
                      : "status-finished"
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleStatusChange(task.id, task.status)}
                  className={`status-button ${
                    task.status === "pending"
                      ? "status-button-pending"
                      : task.status === "active"
                      ? "status-button-active"
                      : "status-button-finished"
                  }`}
                >
                  {task.status === "pending"
                    ? "Start Task"
                    : task.status === "active"
                    ? "Mark as Finished"
                    : "Task Completed"}
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
