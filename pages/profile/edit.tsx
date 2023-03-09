import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}
interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);
  const onValid = ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return; // 유저가 버튼을 미친듯이 누를 경우를 대비하여
    if (!email && !phone && !name)
      setError("formErrors", {
        message: "Email or Phone Number are required.",
      });
    editProfile({ email, phone, name });
  };
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar"); //form에서 img가 변하면 바로 인지가능
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  return (
    <Layout title="프로필 수정" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="space-y-5 px-4 py-10">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="h-14 w-14 rounded-full bg-slate-500"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium shadow-sm  transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <div className="space-y-1">
          <Input
            register={register("name")}
            label="Name"
            id="name"
            required={false} // Input에서 필수값으로 지정되어있으나 실제 profile정보를 수정할때 필수값은 아님으로 false설정!
            type="text"
          />
          <Input
            register={register("email")}
            label="Email Addres"
            id="email"
            required={false} // Input에서 필수값으로 지정되어있으나 실제 profile정보를 수정할때 필수값은 아님으로 false설정!
            type="email"
          />
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
        <Button text={loading ? "Loading..." : "Update profile"} />
      </form>
    </Layout>
  );
};

export default EditProfile;
