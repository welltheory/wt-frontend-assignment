import { useCallback } from "react";
import { mutate } from "swr";

import { MemberForm } from "../components/member/memberForm/MemberForm";
import { PageHeader } from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { createMember } from "../lib/api/fetch";
import type { MemberFormData } from "../components/member/memberForm/types";

export const AddMember = () => {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: MemberFormData) => {
      const newMember = await createMember(data);

      // Populate SWR cache so it's immediately available
      mutate(`/members/${newMember.id}`, newMember, false);

      navigate(`/members/${newMember.id}`);
    },
    [navigate],
  );

  const onCancel = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div>
      <PageHeader
        title="Add Member"
        subtitle="Complete the form below to add a new member."
      />

      <MemberForm {...{ onSubmit, onCancel }} />
    </div>
  );
};
