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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="w-96 p-8 bg-white shadow-lg rounded-2xl border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <input
          type="text"
          placeholder="Email"
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-3 mb-6 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition duration-200"
        >
          Go to Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
