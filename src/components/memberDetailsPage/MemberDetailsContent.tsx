import { useNavigate } from "react-router-dom";
import { type Member } from "../../lib/members/type";
import { deleteMemberById } from "../../lib/api/fetch";
import { formatBirthday } from "../../lib/members/utils/formatBirthday";
import { useCallback } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MemberAvatarContainer } from "./MemberAvatarContainer";

export const MemberDetailsContent = ({
  member,
  onEdit,
  onAvatarUpdated,
}: {
  member: Member;
  onEdit: () => void;
  onAvatarUpdated: (photoUrl: string) => void;
}) => {
  const navigate = useNavigate();

  const { id, firstName, lastName, dateOfBirth, sex, status, photoUrl } =
    member;

  const onDelete = useCallback(async () => {
    const didConfirm = window.confirm(
      "Are you sure you want to delete this member? This cannot be undone.",
    );

    if (!didConfirm) {
      return;
    }

    await deleteMemberById({ id: id! });

    navigate("/");
  }, [id, navigate]);

  const detailConfigs = [
    {
      label: "Birthday",
      value: formatBirthday(dateOfBirth),
      testId: "member-details-birthday",
    },
    {
      label: "Sex",
      value: sex,
      testId: "member-details-sex",
      capitalize: true,
    },
  ];

  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "0 auto",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        {/* Avatar centered at top */}
        <MemberAvatarContainer
          id={id!}
          firstName={firstName}
          lastName={lastName}
          photoUrl={photoUrl}
          status={status}
          onAvatarUpdated={onAvatarUpdated}
        />

        <Divider sx={{ mb: 3 }} />

        {/* Details section - declarative rendering */}
        <Stack spacing={2}>
          {detailConfigs.map(({ label, value, testId, capitalize }) => (
            <Box
              key={label}
              data-testid={testId}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography color="text.secondary">{label}</Typography>
              <Typography
                fontWeight={500}
                sx={capitalize ? { textTransform: "capitalize" } : undefined}
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Action buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={onEdit}
            data-testid="member-details-edit-button"
          >
            Edit
          </Button>
          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            data-testid="member-details-delete-button"
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
