import { Chip, type SxProps, type Theme } from "@mui/material";
import { MemberStatus } from "../../lib/members/type";

interface StatusChipProps {
  status: MemberStatus;
  sx?: SxProps<Theme>;
  "data-testid"?: string;
}

export const MemberStatusChip = ({
  status,
  sx,
  "data-testid": testId,
}: StatusChipProps) => {
  return (
    <Chip
      label={status}
      color={status === MemberStatus.Active ? "success" : "default"}
      size="small"
      data-testid={testId}
      sx={sx}
    />
  );
};
