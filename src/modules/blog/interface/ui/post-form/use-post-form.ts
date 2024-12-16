import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "@/modules/blog/infra/post.api";
import { postFormSchema } from "../../data/form-schemas";
import { PostFormInputType } from "@/modules/blog/infra/types/post-form.input";
import { PostEntity } from "@/modules/blog/domain/entities/post.entity";
import { useAppDispatch } from "@/lib/store";
import { closeSideModal } from "@/shared/components/side-modal/side-modal.slice";
import { useState } from "react";
import { useEditor } from "@/shared/hooks/use-editor";

type Props = {
  post?: PostEntity;
  isEdit?: boolean;
};

export function usePostForm({ post, isEdit }: Props) {
  const dispatch = useAppDispatch();

  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const [createPostMutation, { isLoading: isCreatePostLoading }] =
    useCreatePostMutation();

  const [updatePostMutation, { isLoading: isUpdatePostLoading }] =
    useUpdatePostMutation();

  const form = useForm<PostFormInputType>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      id: post?.id,
      title: post?.title || "",
      content: post?.content || {},
      image: post?.image || "",
    },
  });

  const { editor } = useEditor({
    handleChange: content => {
      form.setValue("content", content);
    },
    editable: true,
    content: post?.content,
  });

  const onSubmit = (values: PostFormInputType) => {
    if (isEdit) {
      updatePostMutation(values).then(() => {
        form.reset();
        editor?.commands.setContent("");
        dispatch(closeSideModal());
      });
      return;
    }

    createPostMutation(values).then(() => {
      form.reset();
      editor?.commands.setContent("");
    });
  };

  const handleChangeUploadLoading = (loading: boolean) => {
    setIsUploadLoading(loading);
  };

  return {
    form,
    onSubmit,
    isLoading: isCreatePostLoading || isUpdatePostLoading,
    handleChangeUploadLoading,
    isUploadLoading,
    editor,
  };
}
