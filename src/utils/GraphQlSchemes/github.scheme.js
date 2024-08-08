// схема запроса к Github

export const GithubSearchScheme = `query($repoName:String!){
  search(query: $repoName, type: REPOSITORY, first: 100) {

      nodes {
        ... on Repository {id,
          name,
          forkCount,stargazerCount ,
          primaryLanguage{language:name,color}
          ,updatedAt,
          languages(first:10){
         
                nodes{
                    name,
                    color 
                }
            
          },
          description,
          licenseInfo{name}
        }
      }

  }
}
}`;
