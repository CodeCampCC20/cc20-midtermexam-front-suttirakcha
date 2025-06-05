import { useNavigate } from "react-router-dom";
import FormInput from "../components/ui/FormInput";
import { registerSchema, type RegisterFields } from "../schemas/registerSchema";
import useAuthStore from "../stores/useAuthStore";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterPage() {
  const navigate = useNavigate();
  const registerData = useAuthStore((state) => state.register);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>({
    defaultValues: initialValues,
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFields> = (data) => {
    try {
      registerData(data);
      navigate("/login")
    } catch (err) {
      setError("root", {
        message: "An error occurred while trying to log in, please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="main-sec">
      <h1 className="heading">Register</h1>
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
      <FormInput
        label="Confirm password"
        errors={errors.confirmPassword}
        placeholder="Enter your confirm password"
        type="password"
        {...register("confirmPassword", {
          required: "Confirm password is required",
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
        {isSubmitting ? "REGISTERING..." : "REGISTER"}
      </button>
    </form>
  );
}

export default RegisterPage;
