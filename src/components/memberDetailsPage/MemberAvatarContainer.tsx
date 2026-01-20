import React, { useCallback, useRef, useState } from "react";
import { MemberStatus } from "../../lib/members/type";
import { uploadMemberPhotoById } from "../../lib/api/fetch";
import { MemberAvatar } from "../member/MemberAvatar";
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { MemberStatusChip } from "../member/MemberStatusChip";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

interface MemberAvatarContainerProps {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string | null | undefined;
  status: MemberStatus;
  onAvatarUpdated: (photoUrl: string) => void;
}

export const MemberAvatarContainer = ({
  id,
  firstName,
  lastName,
  photoUrl,
  status,
  onAvatarUpdated,
}: MemberAvatarContainerProps) => {
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarUploadError, setAvatarUploadError] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const onEditAvatar = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onAvatarImageChanged = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) {
        return;
      }

      // Clear previous error when selecting new file
      setAvatarUploadError("");

      if (isUploadingAvatar) {
        return;
      }

      setIsUploadingAvatar(true);
      try {
        const result = await uploadMemberPhotoById({ id, file });
        if (!result.photoUrl) {
          throw new Error("Image upload failed");
        }
        onAvatarUpdated(result.photoUrl);
      } catch (err) {
        setAvatarUploadError(
          (err as Error)?.message || "Failed to upload that image.",
        );
      } finally {
        setIsUploadingAvatar(false);
      }
    },
    [id, isUploadingAvatar, onAvatarUpdated],
  );

  const name = `${firstName} ${lastName}`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Box
        sx={{ position: "relative" }}
        data-testid="member-details-avatar-area"
        role="button"
      >
        {photoUrl ? (
          <MemberAvatar url={photoUrl} alt={name} width={120} />
        ) : (
          <Avatar
            sx={{
              width: 120,
              height: 120,
              bgcolor: "primary.main",
              fontSize: "3rem",
            }}
          >
            {firstName?.charAt(0)}
          </Avatar>
        )}
        <Tooltip title="Change avatar">
          <IconButton
            onClick={onEditAvatar}
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              bgcolor: "background.paper",
              boxShadow: 1,
              "&:hover": { bgcolor: "grey.100" },
            }}
            size="small"
          >
            {isUploadingAvatar ? (
              <CircularProgress size={20} />
            ) : (
              <PhotoCameraIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
        <input
          type="file"
          ref={inputRef}
          onChange={onAvatarImageChanged}
          accept="image/png,image/jpeg,image/webp"
          style={{ display: "none" }}
        />
      </Box>

      {avatarUploadError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {avatarUploadError}
        </Alert>
      )}

      <Typography
        variant="h5"
        component="h2"
        data-testid="member-details-name"
        sx={{ fontWeight: 600, mt: 2 }}
      >
        {name}
      </Typography>

      <MemberStatusChip
        status={status}
        data-testid="member-details-status"
        sx={{ mt: 1 }}
      />
    </Box>
  );
};
