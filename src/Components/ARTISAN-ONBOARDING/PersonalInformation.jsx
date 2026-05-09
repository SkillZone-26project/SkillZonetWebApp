import { useForm } from "react-hook-form";
import { Mail, Phone, Lock, User, ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";

function PersonalInformation() {
  const navigate = useNavigate();
  const { formValues, setFormValues } = useOutletContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: formValues,
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const role = localStorage.getItem("userRole");

    const updatedData = {
      ...formValues,

      fullName: `${data.firstName} ${data.lastName}`.trim(),

      age: Number(data.age),

      sex: data.sex,

      email: data.email,

      phone: data.phone,

      password: data.password,

      role,
    };

    setFormValues(updatedData);

    navigate("/artisan-onboarding/professional-details");
  };

  return (
    <div>
      {/* Icon & Header */}
      <div className="flex justify-center mb-4">
        <div className="bg-bgActive p-3 rounded-full text-thisMonth">
          <User className="w-[32px] h-[32px]" />
        </div>
      </div>

      <h2 className="text-textColor font-semibold text-[24px] text-center">
        Personal Information
      </h2>

      <p className="text-textGray mb-8 text-center">
        Let's start with your basic details
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">

        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-semibold">First Name *</label>
            <input
              {...register("firstName", {
                required: "First name is required",
              })}
              placeholder="John"
              className="w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm outline-none"
            />
            {errors.firstName && (
              <p className="text-xs text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">Last Name *</label>
            <input
              {...register("lastName", {
                required: "Last name is required",
              })}
              placeholder="Mensah"
              className="w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm outline-none"
            />
            {errors.lastName && (
              <p className="text-xs text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Age & Sex */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-semibold">Age *</label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 18,
                  message: "Minimum age is 18",
                },
              })}
              placeholder="28"
              className="w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm outline-none"
            />
            {errors.age && (
              <p className="text-xs text-red-500">
                {errors.age.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">Sex *</label>
            <select
              {...register("sex", {
                required: "Sex is required",
              })}
              className="w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm outline-none"
            >
              <option value="">Select Sex</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>

            {errors.sex && (
              <p className="text-xs text-red-500">
                {errors.sex.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-semibold">Email *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-textGray" size={18} />
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              placeholder="john@email.com"
              className="w-full h-[36px] bg-bgGray rounded-[8px] pl-[36px] pr-[12px] text-sm outline-none"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-semibold">Phone *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-textGray" size={18} />
            <input
              {...register("phone", {
                required: "Phone is required",
              })}
              placeholder="+234..."
              className="w-full h-[36px] bg-bgGray rounded-[8px] pl-[36px] pr-[12px] text-sm outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-semibold">Create Password *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-textGray" size={18} />
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              placeholder="Min 8 characters"
              className="w-full h-[36px] bg-bgGray rounded-[8px] pl-[36px] pr-[12px] text-sm outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center mt-8">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-[297px] h-[36px] bg-white border rounded-[8px] flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            type="submit"
            disabled={!isValid}
            className="w-[297px] h-[36px] rounded-[8px] flex items-center justify-center gap-2 bg-black text-white"
          >
            Continue
            <ArrowRight size={16} />
          </button>

        </div>
      </form>
    </div>
  );
}

export default PersonalInformation;