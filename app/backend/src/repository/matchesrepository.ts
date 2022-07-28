import Model from '../database/models/Match';
import Team from '../database/models/Team';
import { IMatchModel, Match, teamLeaderboard } from '../protocols';
import 'dotenv/config';
import TeamRepository from './teamrepository';

const updateTeam = (team: any, goalsFavor: number, goalsOwn: number) => {
  const copyTeam = team;
  const aux = goalsFavor - goalsOwn;
  if (aux >= 1) {
    copyTeam.totalPoints += 3;
    copyTeam.totalVictories += 1;
  } else if (aux === 0) {
    copyTeam.totalPoints += 1;
    copyTeam.totalDraws += 1;
  } else {
    copyTeam.totalLosses += 1;
  }
  copyTeam.totalGames += 1;
  copyTeam.goalsFavor += goalsFavor;
  copyTeam.goalsOwn += goalsOwn;
  copyTeam.goalsBalance = copyTeam.goalsFavor - copyTeam.goalsOwn;
  // console.log(copyTeam);
  return copyTeam;
};

const recipeTeam = () => ({
  id: 1,
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
});

const setTeamsNames = (leaderboardEfficiency: any, teamsIds: any) => {
  const leaderboardName = leaderboardEfficiency.map((time: any) => {
    const copyTeam = time;
    const name = teamsIds.find((n1: any) => n1.id === time.id);
    copyTeam.name = name.teamName;
    return copyTeam;
  });

  const noIdLeaderboard = leaderboardName.map((time: any) => {
    const copyTeam = time;
    delete copyTeam.id;
    return copyTeam;
  });
  return noIdLeaderboard;
};

const auxMatchesHomeTeam = (matches: Match[], leaderboard: teamLeaderboard[]) => {
  let newTeam = recipeTeam();
  const copyLeaderboard = leaderboard;
  matches.forEach((match: Match) => {
    if (match.inProgress) return;
    const team = copyLeaderboard.find((time) => time.id === match.homeTeam);
    if (team) newTeam = updateTeam(team, match.homeTeamGoals, match.awayTeamGoals);
    else {
      newTeam = updateTeam(recipeTeam(), match.homeTeamGoals, match.awayTeamGoals);
      newTeam.id = match.homeTeam;
    }
    // copyLeaderboard = copyLeaderboard.filter((time) => time.id !== match.homeTeam);
    copyLeaderboard.push(newTeam);
  });

  return copyLeaderboard;
};

const auxMatchesAwayTeam = (matches: Match[], leaderboard: teamLeaderboard[]) => {
  let newAwayTeam = recipeTeam();
  const copyLeaderboard = leaderboard;
  matches.forEach((match: Match) => {
    if (match.inProgress) return;
    const awayteam = copyLeaderboard.find((time) => time.id === match.awayTeam);
    if (awayteam) newAwayTeam = updateTeam(awayteam, match.awayTeamGoals, match.homeTeamGoals);
    else {
      newAwayTeam = updateTeam(recipeTeam(), match.awayTeamGoals, match.homeTeamGoals);
      newAwayTeam.id = match.awayTeam;
    }
    copyLeaderboard.push(newAwayTeam);
  });
  return copyLeaderboard;
};

export default class MatchesRepository implements IMatchModel {
  private teamRepository;
  constructor(private model = Model) {
    this.model = model;
    this.teamRepository = new TeamRepository();
  }

  async showMatches(): Promise<Match[]> {
    const matches = await this.model
      .findAll({ include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }] });
    return matches;
  }

  async createMatch(data: Match): Promise<Match> {
    const homeTeam = await this.teamRepository.showIds(data.homeTeam);
    const awayTeam = await this.teamRepository.showIds(data.awayTeam);

    if (!homeTeam || !awayTeam) throw new Error('There is no team with such id!');

    const newMatch = await this.model.create(data);
    return newMatch;
  }

  async updateMatch(data: Omit<Match, 'homeTeam' | 'awayteam'>, id: number): Promise<void> {
    const helpData = data;
    const aux1 = data.awayTeamGoals.toString();
    helpData.awayTeamGoals = parseInt(aux1, 10);
    const aux2 = data.homeTeamGoals.toString();
    helpData.homeTeamGoals = parseInt(aux2, 10);
    await this.model.update(helpData, { where: { id } });
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async setLeaderboard(): Promise<any> {
    const leaderboard: any[] = [];
    const matches = await this.model.findAll();
    const newLeaderboard = auxMatchesHomeTeam(matches, leaderboard);
    // console.log(newLeaderboard);
    // leaderboard = leaderboard.filter((time) => time.id !== newTeam.id);
    // leaderboard.push(newTeam);
    // const fullLeaderboard = auxMatchesAwayTeam(matches, newLeaderboard);
    // leaderboard = leaderboard.filter((time) => time.id !== newAwayTeam.id);
    // leaderboard.push(newAwayTeam);
    const leaderboardEfficiency = newLeaderboard.map((time) => {
      const efficiency = (time.totalPoints / (time.totalGames * 3)) * 100;
      const efficiency2 = parseFloat(efficiency.toFixed(2));
      const copyTeam = time;
      copyTeam.efficiency = efficiency2;
      return copyTeam;
    });

    const teamsIds = await this.teamRepository.showTeams();
    const leaderboardName = setTeamsNames(leaderboardEfficiency, teamsIds);

    return leaderboardName;
  }

  async setLeaderboardAway(): Promise<any> {
    const leaderboard: any[] = [];
    const matches = await this.model.findAll();
    // const newLeaderboard = auxMatchesHomeTeam(matches, leaderboard);
    // console.log(newLeaderboard);
    // leaderboard = leaderboard.filter((time) => time.id !== newTeam.id);
    // leaderboard.push(newTeam);
    const fullLeaderboard = auxMatchesAwayTeam(matches, leaderboard);
    // leaderboard = leaderboard.filter((time) => time.id !== newAwayTeam.id);
    // leaderboard.push(newAwayTeam);
    const leaderboardEfficiency = fullLeaderboard.map((time) => {
      const efficiency = (time.totalPoints / (time.totalGames * 3)) * 100;
      const efficiency2 = parseFloat(efficiency.toFixed(2));
      const copyTeam = time;
      copyTeam.efficiency = efficiency2;// so fazer ultimo endpoint e consertar lint
      return copyTeam;
    });

    const teamsIds = await this.teamRepository.showTeams();
    const leaderboardName = setTeamsNames(leaderboardEfficiency, teamsIds);

    return leaderboardName;
  }

  async setLeaderboardFull(): Promise<any> {
    const leaderboard: any[] = [];
    const matches = await this.model.findAll();
    const newLeaderboard = auxMatchesHomeTeam(matches, leaderboard);
    // console.log(newLeaderboard);
    // leaderboard = leaderboard.filter((time) => time.id !== newTeam.id);
    // leaderboard.push(newTeam);
    const fullLeaderboard = auxMatchesAwayTeam(matches, newLeaderboard);
    // leaderboard = leaderboard.filter((time) => time.id !== newAwayTeam.id);
    // leaderboard.push(newAwayTeam);
    const leaderboardEfficiency = fullLeaderboard.map((time) => {
      const efficiency = (time.totalPoints / (time.totalGames * 3)) * 100;
      const efficiency2 = parseFloat(efficiency.toFixed(2));
      const copyTeam = time;
      copyTeam.efficiency = efficiency2;// so fazer ultimo endpoint e consertar lint
      return copyTeam;
    });

    const teamsIds = await this.teamRepository.showTeams();
    const leaderboardName = setTeamsNames(leaderboardEfficiency, teamsIds);

    return leaderboardName;
  }
}
