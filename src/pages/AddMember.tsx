import { useCallback } from "react";

import { MemberForm } from "../components/memberForm/MemberForm";
import { PageHeader } from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { createMember } from "../lib/api/fetch";
import type { MemberFormData } from "../components/memberForm/types";

export const AddMember = () => {
  const navigate = useNavigate();

  const onSubmit = useCallback(async (data: MemberFormData) => {
    const newMember = await createMember(data);

    navigate(`/members/${newMember.id}`);
  }, []);

  const onCancel = useCallback(() => {
    navigate("/");
  }, []);

  return (
    <div>
      <PageHeader title="Members Portal" subtitle="Manage your members." />

      <MemberForm {...{ onSubmit, onCancel }} />
    </div>
  );
};
