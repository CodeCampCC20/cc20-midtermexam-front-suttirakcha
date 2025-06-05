import { type FormInputProps } from "../../types/types";

function FormInput({ label, errors, className, ...props }: FormInputProps) {
  return (
    <div className="space-y-1">
      <label className="flex flex-col gap-1">
        {label && <p className="font-medium">{label}</p>}
        <input
          className={`bg-gray-200 px-4 py-2 rounded-md w-full ${className}`}
          {...props}
        />
      </label>
      {errors && <p className="text-red-600 text-sm">{errors.message}</p>}
    </div>
  );
}

export default FormInput;
