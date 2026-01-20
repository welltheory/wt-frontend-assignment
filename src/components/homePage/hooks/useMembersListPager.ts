import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useMembersListContext,
  type PaginationModel,
} from "../../../context/MembersListContext";

const DATA_GRID_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export const useMembersListPager = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { paginationModel, setPaginationModel } = useMembersListContext();

  // Sync URL params and context on mount
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const pageSizeParam = searchParams.get("page_size");

    if (pageParam || pageSizeParam) {
      // URL has params - sync them to context if different
      const page = pageParam
        ? Math.max(1, parseInt(pageParam, 10)) - 1
        : paginationModel.page;
      const pageSize = pageSizeParam
        ? DATA_GRID_PAGE_SIZE_OPTIONS.includes(parseInt(pageSizeParam, 10))
          ? parseInt(pageSizeParam, 10)
          : paginationModel.pageSize
        : paginationModel.pageSize;

      if (
        page !== paginationModel.page ||
        pageSize !== paginationModel.pageSize
      ) {
        setPaginationModel({ page, pageSize });
      }

      // Ensure both params are in URL
      if (!pageParam || !pageSizeParam) {
        setSearchParams({
          page: String(page + 1),
          page_size: String(pageSize),
        });
      }
    } else {
      // No URL params - add them from context state
      setSearchParams({
        page: String(paginationModel.page + 1),
        page_size: String(paginationModel.pageSize),
      });
    }
  }, []); // Only run on mount

  const onPaginationModelChange = useCallback(
    (model: PaginationModel) => {
      setPaginationModel(model);
      // Sync pagination state to URL query params
      setSearchParams({
        page: String(model.page + 1),
        page_size: String(model.pageSize),
      });
    },
    [setPaginationModel, setSearchParams],
  );

  return {
    paginationModel,
    onPaginationModelChange,
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  };
};
