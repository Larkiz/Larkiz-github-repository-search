import { Container, Stack } from "@mui/material";
import { StoreStateReposType } from "../../utils/types/repository";
import { useSelector } from "react-redux";
import { Star } from "@mui/icons-material";

// разбиение числа по пробелам
function numberWithSpaces(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// меню выбранного репозитория
export const SelectedRepository = () => {
  // получение выбранного репозитория
  const selected = useSelector(
    ({ repos }: StoreStateReposType) => repos.selected
  );

  return (
    <Container className="selected-repo" style={{ maxWidth: "100%" }}>
      {!selected && (
        <h4 style={{ fontFamily: "Roboto" }} className="welcome-text">
          Выберите репозиторий
        </h4>
      )}
      {selected && (
        <>
          <h1 className="h1">{selected.name}</h1>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <div
              style={{
                backgroundColor: selected.primaryLanguage?.color,
              }}
              className={selected.primaryLanguage ? "language" : undefined}
            >
              {selected.primaryLanguage?.language}
            </div>

            <Stack direction="row" gap={1} alignItems="center">
              <Star style={{ color: "#ffb400", fontSize: "24px" }} />
              {numberWithSpaces(selected.stargazerCount)}
            </Stack>
          </Stack>
          <Stack
            style={{ flexWrap: "wrap" }}
            direction="row"
            gap={1}
            alignItems="center"
          >
            {selected.languages.nodes.length
              ? selected.languages.nodes.map((language, key) => {
                  return (
                    <div key={key} className="language">
                      {language.name}
                    </div>
                  );
                })
              : null}
          </Stack>
          <p>{selected.description}</p>
          <p>{selected.licenseInfo?.name}</p>
        </>
      )}
    </Container>
  );
};
