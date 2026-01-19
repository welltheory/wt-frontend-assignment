import { useNavigate } from "react-router-dom";
import { MemberStatus, type Member } from "../../lib/members/type";
import { deleteMemberById, uploadMemberPhotoById } from "../../lib/api/fetch";
import { formatBirthday } from "../../lib/members/utils/formatBirthday";
import React, { useCallback, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { MemberAvatar } from "../MemberAvatar";
import Button from "@mui/material/Button";

export const MemberDetailsContent = ({
  member,
  onEdit,
  onAvatarUpdated,
}: {
  member: Member;
  onEdit: () => void;
  onAvatarUpdated;
}) => {
  const navigate = useNavigate();

  const { id, firstName, lastName, dateOfBirth, sex, status, photoUrl } =
    member;

  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarUploadError, setAvatarUploadError] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const onDelete = useCallback(async () => {
    const didConfirm = window.confirm(
      "Are you should you want to delete this member? This cannot be undone.",
    );

    if (!didConfirm) {
      return;
    }

    await deleteMemberById({ id: id! });

    navigate("/");
  }, [id]);

  const onEditAvatar = () => {
    inputRef.current?.click();
  };

  const onAvatarImageChanged = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (isUploadingAvatar) {
      return;
    }

    setIsUploadingAvatar(true);
    try {
      const result = await uploadMemberPhotoById({ id, file });
      if (!result.photoUrl) {
        throw new Error("Image upload failed");
      }
      onAvatarUpdated();
    } catch (err) {
      setAvatarUploadError(err?.message || "Failed to upload that image.");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const lines = [
    {
      label: "Birthday",
      render: () => {
        return <div>{formatBirthday(dateOfBirth)}</div>;
      },
    },
    {
      label: "Sex",
      render: () => {
        return <div>{sex}</div>;
      },
    },
  ];

  const name = `${firstName} ${lastName}`;

  return (
    <div>
      <div>
        <MemberHeader>
          <div role="button" onClick={onEditAvatar}>
            {photoUrl ? (
              <div>
                <MemberAvatar url={photoUrl} alt={name} width={64} />
              </div>
            ) : (
              <AvatarPlaceholder>Add Avatar</AvatarPlaceholder>
            )}
            <ImageSelectorInput
              type="file"
              ref={inputRef}
              onChange={onAvatarImageChanged}
              accept="image/png,image/jpeg,image/webp"
            />
            {isUploadingAvatar && <div>Uploading new avatar ...</div>}
            {avatarUploadError && <div>{avatarUploadError}</div>}
          </div>
          <MemberNameWrapper>
            <MemberName>{name}</MemberName>
            <StatusBadge $isActive={status === MemberStatus.Active}>
              {status}
            </StatusBadge>
          </MemberNameWrapper>
        </MemberHeader>

        <div>
          {lines.map(({ label, render }) => {
            return (
              <React.Fragment key={label}>
                <Detail>
                  <div>{label}:</div> {render()}
                </Detail>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <ControlBar>
        <Button variant="contained" onClick={onEdit}>
          Edit
        </Button>
        <Button color="warning" variant="outlined" onClick={onDelete}>
          Delete
        </Button>
      </ControlBar>
    </div>
  );
};

const Detail = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const MemberHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MemberNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MemberName = styled.h2`
  margin: 0;
`;

const StatusBadge = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  color: #ffffff;
  background: #333333;
  font-size: 0.8rem;
  font-weight: 400;
  padding: 0.1rem 0.2rem;
  height: fit-content;

  ${($isActive) => {
    if (!$isActive) {
      return;
    }
    return css`
      background: limegreen;
    `;
  }}
`;

const ControlBar = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  margin-top: 1rem;
`;

const AvatarPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  aspect-ratio: 1/1;
  background: rgba(0, 0, 0, 0.2);
`;

const ImageSelectorInput = styled.input`
  display: none;
`;
