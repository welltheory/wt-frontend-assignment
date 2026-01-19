import useSWR from "swr";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowParams,
} from "@mui/x-data-grid";

import { loadMembers } from "../../lib/api/fetch";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { MemberAvatar } from "../MemberAvatar";
import { useNavigate } from "react-router-dom";
import type { Member } from "../../lib/members/type";
import { formatBirthday } from "../../lib/members/utils/formatBirthday";

const DATA_GRID_PAGINATION_MODE = "server";
const DATA_GRID_PAGE_SIZE_OPTIONS = [10, 20, 50];
const DATA_GRID_ROW_HEIGHT = 64;

/**
 * TODO:
 * 1. load members
 * 2. show table of members
 * 3. allow clicking to see member details
 * 4. button to add a member
 */
export const MembersList = () => {
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { pageSize } = paginationModel;
  const page = paginationModel.page + 1;

  const { data, isLoading, error } = useSWR(["members", page, pageSize], () =>
    loadMembers({
      page,
      limit: pageSize,
    }),
  );

  const onPaginationModelChange = useCallback(
    (model: { page: number; pageSize: number }) => {
      setPaginationModel(model);
    },
    [],
  );

  const onRowClick = useCallback((params: GridRowParams<Member>) => {
    navigate(`/members/${params.id}`);
  }, []);

  const columns: GridColDef[] = [
    {
      field: "member",
      headerName: "Member",
      renderCell: (params: GridRenderCellParams<Member>) => {
        const {
          row: { firstName, lastName, photoUrl },
        } = params;
        const name = `${firstName} ${lastName}`;
        return (
          <MemberCell>
            {photoUrl && (
              <div>
                <MemberAvatar url={photoUrl} width={40} alt={name} />
              </div>
            )}
            <div>{name}</div>
          </MemberCell>
        );
      },
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      renderCell: (params: GridRenderCellParams<Member>) => {
        const {
          row: { dateOfBirth },
        } = params;

        return <div>{formatBirthday(dateOfBirth)}</div>;
      },
    },
    { field: "sex", headerName: "Sex" },
    { field: "status", headerName: "Status" },
  ];

  if (error) {
    return <Notice>Failed to load members ...</Notice>;
  }

  if (isLoading) {
    return <Notice>Loading ...</Notice>;
  }

  const members = data.data;
  const numMembers = data.totalItems;

  return (
    <div>
      <DataGrid
        {...{
          columns,
          rows: members,

          rowCount: numMembers,
          paginationMode: DATA_GRID_PAGINATION_MODE,
          paginationModel,
          onPaginationModelChange,
          pageSizeOptions: DATA_GRID_PAGE_SIZE_OPTIONS,
          loading: isLoading,
          getRowHeight: () => DATA_GRID_ROW_HEIGHT,
          onRowClick,
        }}
      />
    </div>
  );
};

const Notice = styled.div`
  padding: 2rem;
  text-align: center;
  color: #333;
`;

const MemberCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
