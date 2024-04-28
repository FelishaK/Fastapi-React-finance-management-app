import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../services/api_auth";
import { toast } from "react-hot-toast";

function Registration() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const err = await userRegister(data);
    if (err?.detail) {
      toast.error(err?.detail);
    } else {
      toast.success("success!");
      navigate("/signin");
    }
  };

  const password = watch("password");

  return (
    <div className="flex flex-col bg-white shadow-appShadow sm:h-dvh sm:w-[650px]">
      <header className="mt-5 flex flex-col items-center">
        <h1 className="mb mt-7 text-3xl font-bold">Expenses</h1>
        <div className="mt-12 flex flex-col">
          <h3 className="text mt-10 text-center text-2xl font-semibold tracking-widest">
            Registration
          </h3>
          <p className="mt-3">Please create an account!</p>
        </div>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        className="flex h-full w-full flex-col items-center justify-center "
      >
        <div className="flex size-9/12 flex-col  ">
          <input
            {...register("username", {
              required: {
                value: true,
                message: "You didn't choose a username!",
              },
            })}
            type="text"
            placeholder="Username"
            className="block w-full rounded-lg border px-4 py-3 text-sm outline-none focus:outline-none focus:ring focus:ring-yellow-400"
          />
          {errors?.username?.message && (
            <span className="text-base text-red-600">
              {errors.username.message}
            </span>
          )}
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="mt-5 block w-full rounded-lg border px-4 py-3 text-sm outline-none focus:outline-none focus:ring focus:ring-yellow-400"
          />

          <input
            {...register("password", {
              required: "This field is required!",
              minLength: {
                value: 6,
                message: "Password should at least contain 6 characters!",
              },
            })}
            type="password"
            placeholder="Password"
            className="mt-5 block w-full rounded-lg border px-4 py-3 text-sm outline-none focus:outline-none focus:ring focus:ring-yellow-400"
          />
          {errors?.password?.message && (
            <span className="text-base text-red-600">
              {errors.password.message}
            </span>
          )}
          <input
            {...register("confirm_password", {
              required: true,
              minLength: {
                value: 6,
                message: `Password should at least contain 6 characters!`,
              },
              validate: (value) =>
                value === password || "The passwords do not match",
            })}
            type="password"
            placeholder="Confirm password"
            className="mt-5 block w-full rounded-lg border px-4 py-3 text-sm outline-none focus:outline-none focus:ring focus:ring-yellow-400"
          />
          {errors?.confirm_password?.message && (
            <span className="text-base text-red-600">
              {errors.confirm_password.message}
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
              Already have an account?{" "}
              <Link to="/signin">
                <span className="font-semibold hover:underline">Sign in</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Registration;
