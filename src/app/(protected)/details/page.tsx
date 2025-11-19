"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useUser from "@/features/users/hooks/useUser";
import useChangePassword from "@/features/users/hooks/useChangePassword";
import { toast } from "sonner";
import { useTranslations } from "next-intl"; 

export default function Details() {
  const t = useTranslations("Auth"); 
  const router = useRouter();
  const { data: user, isLoading: userLoading, refresh } = useUser();
  const changePasswordMutation = useChangePassword();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error(t('toast_fill_all_fields')); 
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t('toast_passwords_not_match')); 
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword,
        newPassword,
        confirmNewPassword: confirmPassword, 
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      await refresh();

      toast.success(t('toast_password_change_success')); 
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || t('toast_password_change_error')); 
    }
  }

  if (userLoading) return <p>{t('loading_data')}</p>; 

  return (
    <div className="p-8 max-w-md mx-auto">
      <h4 className="text-xl font-semibold mb-4">{t('title_profile')}</h4> // i18n

      <Input value={user?.name ?? ""} placeholder="Nome" readOnly className="mb-2" />
      <Input value={user?.email ?? ""} placeholder="Email" readOnly className="mb-2" />
      <Input
        value={user?.phone ?? ""}
        placeholder="Telefone"
        onChange={() => {}}
        className="mb-4"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          type="password"
          placeholder={t('password_current_placeholder')} 
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder={t('password_new_placeholder')}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder={t('password_confirm_placeholder')} 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" disabled={changePasswordMutation.isLoading} className="mt-2">
          {changePasswordMutation.isLoading ? t('loading_saving') : t('btn_change_password')} // i18n
        </Button>
      </form>
    </div>
  );
}