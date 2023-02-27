import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import useUser from "@/libs/client/useUser";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditProfileForm {
  email?: string;
  phone?: string;
  formErrors?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);
  const onValid = ({ email, phone }: EditProfileForm) => {
    if (!email && !phone)
      setError("formErrors", {
        message: "Email or Phone Number are required.",
      });
  };
  return (
    <Layout title="프로필 수정" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="space-y-5 px-4 py-10">
        <div className="flex items-center space-x-3">
          <div className="h-14 w-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium shadow-sm  transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <div className="space-y-1">
          <Input
            register={register("email")}
            label="Email Addres"
            id="email"
            required={false} // Input에서 필수값으로 지정되어있으나 실제 profile정보를 수정할때 필수값은 아님으로 false설정!
            type="email"
          />
        </div>
        <div className="space-y-1">
          <Input
            register={register("phone")}
            label="Phone Number"
            id="phone"
            kind="phone"
            type="phone"
            required={false} // Input에서 필수값으로 지정되어있으나 실제 profile정보를 수정할때 필수값은 아님으로 false설정!
          />
        </div>
        {errors.formErrors ? (
          <span className="my-2 block text-center font-medium text-red-500">
            {errors.formErrors.message}
          </span>
        ) : null}{" "}
        <Button text="Update Profile" />
      </form>
    </Layout>
  );
};

export default EditProfile;
