import { useDispatch } from "react-redux";
import { signup } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signup());
    navigate("/"); // go to Home after signup
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSignup}
        className="w-96 p-8 bg-white shadow-lg rounded-2xl border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Email"
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-3 mb-6 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Sign Up
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition duration-200"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
