import useSWR from "swr";
import { DataGrid, type GridRowParams } from "@mui/x-data-grid";

import { loadMembers } from "../../lib/api/fetch";
import { useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { type Member } from "../../lib/members/type";
import { useMembersListPager } from "./hooks/useMembersListPager";
import { useMembersListColumns } from "./hooks/useMembersListColumns";

const DATA_GRID_PAGINATION_MODE = "server";
const DATA_GRID_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
const DATA_GRID_ROW_HEIGHT = 64;

export const MembersList = () => {
  const navigate = useNavigate();
  const { paginationModel, onPaginationModelChange, page, pageSize } =
    useMembersListPager();
  const columns = useMembersListColumns();

  const { data, isLoading, error } = useSWR(["members", page, pageSize], () =>
    loadMembers({
      page,
      limit: pageSize,
    }),
  );

  const onRowClick = useCallback(
    (params: GridRowParams<Member>) => {
      navigate(`/members/${params.id}`);
    },
    [navigate],
  );

  if (error) {
    return <Notice>Failed to load members ...</Notice>;
  }

  if (isLoading) {
    return <Notice>Loading ...</Notice>;
  }

  const members = data.data;
  const numMembers = data.totalItems;

  return (
    <div data-testid="members-list-grid">
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
