import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFields } from "../schemas/loginSchema";
import useAuthStore from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/ui/FormInput";
import { useEffect } from "react";

const initialValues = {
  username: "",
  password: "",
};

function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (isAuthenticated){
      navigate("/todos")
    }
  }, [isAuthenticated])

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({
    defaultValues: initialValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFields> = (data) => {
    try {
      login(data);
    } catch (err) {
      setError("root", {
        message: "An error occurred while trying to log in, please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="main-sec">
      <h1 className="heading">Welcome</h1>
      <FormInput
        label="Username"
        errors={errors.username}
        placeholder="Enter your username"
        {...register("username", {
          required: "Username is required",
        })}
      />
      <FormInput
        label="Password"
        errors={errors.password}
        placeholder="Enter your password"
        type="password"
        {...register("password", {
          required: "Password is required",
        })}
      />
      {errors.root && (
        <p className="text-red-600 text-sm">{errors.root.message}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary shadow-none w-full"
      >
        {isSubmitting ? "LOGGING IN..." : "LOG IN"}
      </button>
    </form>
  );
}

export default LoginPage;
