import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userLogin } from "../services/api_auth";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";
import { getAuthedUserInfo } from "../services/api_auth";

function Login() {
  const { dispatch } = useContext(PageContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const resp = await userLogin(data);
    if (resp.status > 400) {
      toast.error(resp.data.detail);
    } else {
      const res = await getAuthedUserInfo();
      localStorage.setItem("username", res.username);
      toast.success("success!");
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col bg-white shadow-appShadow sm:h-dvh sm:w-[650px]">
      <header className="mt-5 flex flex-col items-center">
        <h1 className="mb mt-7 text-3xl font-bold">Expenses</h1>
        <div className="mt-12 flex flex-col">
          <h3 className="text mt-10 text-center text-2xl font-semibold tracking-widest">
            Login
          </h3>
          <p className="mt-3">Please login to your account!</p>
        </div>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col items-center justify-center "
      >
        <div className="flex size-9/12 flex-col  ">
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="block w-full rounded-lg border px-4 py-3 text-sm outline-none focus:outline-none focus:ring focus:ring-yellow-400"
          />
          <input
            {...register("password", {
              required: {
                value: true,
                message: "This is a required field",
              },
            })}
            type="password"
            placeholder="Password"
            className="mt-10 block w-full rounded-lg border px-4 py-3 text-sm outline-none focus:outline-none focus:ring focus:ring-yellow-400"
          />
          {errors?.password?.message && (
            <span className="text-base text-red-600">
              {errors.password.message}
            </span>
          )}

          <div className="mt-12 text-center">
            <button
              type="submit"
              className="w-64 rounded-2xl bg-yellow-400 py-3 text-xl outline-none hover:bg-yellow-300 active:bg-yellow-500"
            >
              Sign in
            </button>
            <p className="mt-2 cursor-pointer text-sm ">
              You don&apos;t have an account yet?{" "}
              <Link to="/signup">
                <span className="font-semibold hover:underline">Register</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
