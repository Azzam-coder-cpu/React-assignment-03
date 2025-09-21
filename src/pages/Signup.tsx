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
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSignup} className="p-6 bg-white shadow rounded w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          className="border p-2 mb-2 w-full"
        />
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
          className="w-full bg-green-500 text-white p-2 rounded mb-2"
        >
          Sign Up
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full bg-gray-300 text-black p-2 rounded"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
