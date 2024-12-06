import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "@/modules/blog/infra/post.api";
import { PostEntity } from "@/modules/blog/domain/entities/post.entity";
import { postFormSchema } from "../../data/form-schemas";
import { PostFormInputType } from "@/modules/blog/infra/types/post-form.input";
import { toFormData } from "@/lib/utils";
import { useAppDispatch } from "@/lib/store";
import { closeSideModal } from "@/shared/components/side-modal/side-modal.slice";

type Props = {
  post?: PostEntity;
  isEdit?: boolean;
};

export function usePostForm({ post, isEdit }: Props) {
  const dispatch = useAppDispatch();
  const [createPostMutation, { isLoading: isCreatePostLoading }] =
    useCreatePostMutation();
  const [updatePostMutation, { isLoading: isUpdatePostLoading }] =
    useUpdatePostMutation();

  const form = useForm<PostFormInputType>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      id: post?.id,
      title: post?.title || "",
      content: post?.content || "",
      image: undefined,
      imageUrl: post?.image || "",
      published: post?.published,
      views: post?.views,
    },
  });

  const onSubmit = (values: PostFormInputType) => {
    const formData = toFormData<PostFormInputType>(values);

    if (isEdit) {
      updatePostMutation(formData).then(() => {
        form.reset();
        dispatch(closeSideModal());
      });
      return;
    }

    createPostMutation(formData).then(() => {
      form.reset();
    });
  };

  return {
    form,
    onSubmit,
    isLoading: isCreatePostLoading || isUpdatePostLoading,
  };
}
