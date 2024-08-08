import { Button, Container, Stack } from "@mui/material";
import React from "react";

// пропсы для Header
interface HeaderComponentProps {
  onChange: React.ChangeEventHandler;
  onClick: React.FormEventHandler;
}

// строка поиска
export const Header = ({
  onChange,
  onClick,
}: HeaderComponentProps): JSX.Element => {
  // функция отправки данных
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <Container style={{ maxWidth: "100%" }} disableGutters className="header">
      <form onSubmit={onSubmit}>
        <Stack direction="row" spacing={2}>
          <input
            onChange={onChange}
            type="text"
            placeholder="Введите свой запрос"
          />

          <Button variant="contained" onClick={onSubmit}>
            Искать
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
