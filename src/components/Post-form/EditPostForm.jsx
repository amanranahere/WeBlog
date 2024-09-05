import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select, Footer } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader";

export default function EditPostForm({ post }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setLoading(true);

    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }

    setLoading(false);
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .substring(0, 36)
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return loading ? (
    <Loader />
  ) : (
    <form onSubmit={handleSubmit(submit)} className="w-full h-screen">
      <div className="min-h-screen flex flex-col lg:mt-12 justify-between">
        <div className=" flex-grow flex flex-col lg:flex-row justify-evenly">
          <div className="flex flex-col w-full my-auto lg:w-1/2 h-full">
            <div className="w-full h-full mt-28 mb-6 md:mt-24 lg:mt-16 flex justify-center items-center">
              <div className="text-[6rem] sm:text-[8rem] lg:text-[10rem] text-nowrap font-unicaOne font-semibold opacity-25 leading-3 tracking-tighter">
                Edit Blog
              </div>
            </div>

            {/* Input fields */}
            <div className="w-full flex flex-col px-4 sm:px-10 py-6 sm:py-12 justify-center items-center">
              <Input
                label="TITLE"
                placeholder="Enter the blog title"
                className="mb-6 w-full sm:w-4/5 md:w-full"
                {...register("title", { required: true })}
              />
              <Input
                label="SLUG"
                placeholder="Auto-generated from title"
                className="mb-6 w-full sm:w-4/5 md:w-full"
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />
              <Input
                label="FEATURED IMAGE"
                type="file"
                className="mb-6 w-full sm:w-4/5 md:w-full px-4 sm:px-8 py-4 sm:py-8"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
              />

              <div className="w-full mt-4 flex flex-col sm:flex-row justify-between">
                <div className="w-full sm:w-2/5 mb-4 sm:mb-0">
                  <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="text-xl py-3 w-full"
                    {...register("status", { required: true })}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full sm:w-1/2 border-0 bg-gray-500/20 rounded-xl shadow-[inset_0_0_0_0_#333] transition ease-out duration-300 text-xl outline-none hover:shadow-[inset_400px_0_0_0_#333] hover:text-white cursor-pointer active:scale-90"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>

          {/* Text Editor */}
          <div className="w-full max-h-max pb-12 lg:pb-0 lg:w-1/2 ">
            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
        </div>

        {post && (
          <div className="w-full h-full flex justify-center items-center my-8">
            <div className="w-4/5 h-4/5 items-center">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </form>
  );
}
