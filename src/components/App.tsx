import React, { useState } from "react";
import { Footer } from "./Footer/Footer";
import { GithubSearchScheme } from "../utils/GraphQlSchemes/github.scheme";
import { useDispatch, useSelector } from "react-redux";
import { startPending, set } from "../utils/slices/repoSlice/repo";
import { Header } from "./Header/Header";
import { Repositories } from "./Repositories/Repositories";
import { Repository, StoreStateReposType } from "../utils/types/repository";
import { Grid } from "@mui/material";
import { SelectedRepository } from "./SelectedRepository/SelectedRepository";

import "../assets/styles/App.scss";

const accessToken =
  "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";

// интерфейс полученных с сервера данных
interface FetchRepositories {
  data: {
    search: {
      nodes: Repository[];
    };
  };
}

// компонент контейнер
function App() {
  const [repoName, setRepoName] = useState("");

  // получение репозиториев из хранилища
  const { repositories } = useSelector(
    ({ repos }: StoreStateReposType) => repos
  );

  const dispatch = useDispatch();

  function search() {
    dispatch(startPending());
    fetch("https://api.github.com/graphql", {
      method: "post",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },

      body: JSON.stringify({
        query: GithubSearchScheme,
        variables: {
          repoName: repoName,
        },
      }),
    })
      .then((res) => res.json())
      .then((data: FetchRepositories) => {
        dispatch(set(data.data.search.nodes));
      });
  }

  return (
    <>
      <Header
        onClick={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRepoName(e.target.value)
        }
      />
      <Grid container spacing={2}>
        <Grid item xs={repositories ? 8 : 12}>
          <Repositories repos={repositories} />
        </Grid>
        {repositories && (
          <Grid item xs={4}>
            <SelectedRepository />
          </Grid>
        )}
      </Grid>

      <Footer />
    </>
  );
}

export default App;
