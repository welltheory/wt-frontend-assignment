import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
  useCallback,
} from "react";

const DEFAULT_PAGE_SIZE = 10;
const DATA_GRID_PAGE_SIZE_OPTIONS = [5, DEFAULT_PAGE_SIZE, 20, 50];

export interface PaginationModel {
  page: number;
  pageSize: number;
}

interface MembersListContextType {
  paginationModel: PaginationModel;
  setPaginationModel: (model: PaginationModel) => void;
}

const MembersListContext = createContext<MembersListContextType | undefined>(
  undefined,
);

export const MembersListContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [paginationModel, setPaginationModelState] = useState<PaginationModel>({
    page: 0, // DataGrid uses 0-indexed pages
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const setPaginationModel = useCallback((model: PaginationModel) => {
    // Validate pageSize against allowed options
    const validPageSize = DATA_GRID_PAGE_SIZE_OPTIONS.includes(model.pageSize)
      ? model.pageSize
      : DEFAULT_PAGE_SIZE;
    const validPage = Math.max(0, model.page);

    setPaginationModelState({
      page: validPage,
      pageSize: validPageSize,
    });
  }, []);

  const contextValue = useMemo(
    () => ({ paginationModel, setPaginationModel }),
    [paginationModel, setPaginationModel],
  );

  return (
    <MembersListContext.Provider value={contextValue}>
      {children}
    </MembersListContext.Provider>
  );
};

export const useMembersListContext = (): MembersListContextType => {
  const context = useContext(MembersListContext);
  if (!context) {
    throw new Error(
      "useMembersListContext must be used within a MembersListProvider",
    );
  }
  return context;
};
