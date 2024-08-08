import { CircularProgress, Container } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { Repository, StoreStateReposType } from "../../utils/types/repository";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../../utils/slices/repoSlice/repo";

// настройка таблицы
const columns = [
  {
    field: "name",
    headerName: "Название",
    sortable: false,
    disableColumnMenu: true,
    width: 185,
  },
  {
    field: "primarylanguage",
    headerName: "Язык",
    sortable: false,
    disableColumnMenu: true,
    width: 170,
    valueGetter: (val: any, row: Repository) =>
      row.primaryLanguage ? row.primaryLanguage.language : "Не известно",
  },
  {
    field: "forkCount",
    headerName: "Число форков",
    width: 185,

    disableColumnMenu: true,
  },
  {
    field: "stargazerCount",
    headerName: "Число звезд",
    disableColumnMenu: true,
    width: 185,
  },
  {
    field: "updatedAt",
    headerName: "Дата обновления",
    disableColumnMenu: true,
    width: 170,
  },
];

// пропсы для репозиториев
type RepositoriesComponentProps = {
  repos: Repository[] | null;
};

// таблица найденных репозиториев
export const Repositories = ({
  repos,
}: RepositoriesComponentProps): JSX.Element => {
  const pending = useSelector(
    ({ repos }: StoreStateReposType) => repos.pending
  );
  const dispatch = useDispatch();
  return (
    <Container style={{ maxWidth: "100%" }} className="main">
      {!repos && !pending && <h1 className="welcome-text">Добро пожаловать</h1>}
      {pending && (
        <div className="loader">
          <CircularProgress size={100} />
        </div>
      )}
      {repos && !pending ? (
        <div className="result-wrapper">
          <h1 style={{ margin: "15px 0" }}>Результат поиска</h1>
          <DataGrid
            style={{ border: "none" }}
            rows={repos}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            onRowClick={({ row }: GridRowParams<Repository>) => {
              dispatch(select(row));
            }}
            pageSizeOptions={[5, 10, 20]}
          />
        </div>
      ) : null}
    </Container>
  );
};
