import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../../../data/form-schemas";
import { SignInFormType } from "@/modules/auth/infra/types/sign-in-form";
import { useLoginUserMutation } from "@/modules/auth/infra/auth.api";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/shared/data/constants";

export function useLoginForm() {
  const router = useRouter();

  const [loginMutation] = useLoginUserMutation();

  const form = useForm<SignInFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInFormType) => {
    loginMutation(values).then(() => {
      router.push(DEFAULT_LOGIN_REDIRECT_URL);
    });
  };

  return {
    form,
    onSubmit,
  };
}
