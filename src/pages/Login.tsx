import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login());
    navigate("/"); // go to Home
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow rounded w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="text"
          placeholder="Email"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-2 w-full"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mb-2"
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="w-full bg-gray-300 text-black p-2 rounded"
        >
          Go to Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
