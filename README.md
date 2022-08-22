------ BEM VINDO AO TRYBE FUTEBOL CLUBE -------

Este é um projeto desenvolvido por Vitor Campos

Este projeto simula um app com front-end, back-end e banco de dados,
onde é possivel fazer login, ver times do campeonato e classificação deles, inserir, atualizar e finalizar jogos. 

Para rodar o Projeto

npm install
npm run compose:up:dev

-- Insomnia ou Postman --

GET

leaderboard/home - classifição dos times somente com partidas em casa
leaderboard/away - classifição dos times somente com partidas fora de casa
leaderboard/ - classificação geral
/login/validate - verifica se o token esta no header como authorization e retorna tipo de usuario
/teams - retorna todos os times
/teams/:id - retorna time especifico
/matches - retorna todas as partidas


POST

/login - verifica dados e retorna token
    body - {
  "email": "admin@admin.com",
  "password": "secret_amin"
}
*rode este endpoit primerio e coloque o token no headers.authorization para
usa-lo em algumas das proximas nas requisições*

/matches - cria nova partida
    body - {
  "homeTeam": 16, // valor deve ser o id do time
  "awayTeam": 8, // valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}


PATCH 

/matches/:id/finish - finaliza partida por id
/matches/:id - atualiza partida em andamento
    body - {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
