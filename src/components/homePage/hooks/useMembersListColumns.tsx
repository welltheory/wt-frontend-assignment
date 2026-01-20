import { type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import { capitalize } from "@mui/material";
import styled from "styled-components";

import { MemberAvatar } from "../../member/MemberAvatar";
import { MemberStatusChip } from "../../member/MemberStatusChip";
import { type Member } from "../../../lib/members/type";
import { formatBirthday } from "../../../lib/members/utils/formatBirthday";

export const useMembersListColumns = (): GridColDef[] => {
  const columns: GridColDef[] = [
    {
      field: "member",
      headerName: "Member",
      minWidth: 200,
      renderCell: (params: GridRenderCellParams<Member>) => {
        const {
          row: { firstName, lastName, photoUrl },
        } = params;
        const name = `${firstName} ${lastName}`;
        return (
          <MemberCell>
            {photoUrl && <MemberAvatar url={photoUrl} width={40} alt={name} />}
            <div>{name}</div>
          </MemberCell>
        );
      },
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      minWidth: 100,
      renderCell: (params: GridRenderCellParams<Member>) => {
        const {
          row: { dateOfBirth },
        } = params;

        return <div>{formatBirthday(dateOfBirth)}</div>;
      },
    },
    {
      field: "sex",
      headerName: "Sex",
      renderCell: (params: GridRenderCellParams<Member>) => {
        const { row } = params;
        return <div>{capitalize(row.sex)}</div>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      renderCell: (params: GridRenderCellParams<Member>) => {
        const {
          row: { status },
        } = params;
        return <MemberStatusChip status={status} />;
      },
    },
  ];

  return columns;
};

const MemberCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
