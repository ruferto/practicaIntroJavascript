import League from './League.js'
import { LOCAL_TEAM, AWAY_TEAM } from './League.js'

export default class PointsBasedLeague extends League {
    constructor(name, teams=[], config={}) {
        super(name, teams, config)
    }

    setup(config) {
        const defaultConfig = {
            rounds: 1,
            pointsPerWin: 3,
            pointsPerDraw: 1,
            pointsPerLose: 0
        }
        this.config = Object.assign(defaultConfig, config)
    }

    customizeTeam(teamName) {
        const customizedTeam = super.customizeTeam(teamName)
        return {
            points: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            winsTo:[], //Aquí se almacenan los equipos a los que va ganando.
            ...customizedTeam
        }
    }

    generateGoals() {
        return Math.round(Math.random() * 10)
    }

    play(match) {
        const homeGoals = this.generateGoals()
        const awayGoals = this.generateGoals()
        return {
            homeTeam: match[LOCAL_TEAM],
            homeGoals,
            awayTeam: match[AWAY_TEAM],
            awayGoals
        }
    }

    getTeamForName(name) {
        return this.teams.find(team => team.name == name)
    }

    updateTeams(result) {
        // buscar el equipo por su nombre en el array de equipos
        const homeTeam = this.getTeamForName(result.homeTeam)
        const awayTeam = this.getTeamForName(result.awayTeam)
        if (homeTeam && awayTeam) { // si ecuentra ambos equipos

            homeTeam.goalsFor += result.homeGoals
            homeTeam.goalsAgainst += result.awayGoals
            awayTeam.goalsFor += result.awayGoals
            awayTeam.goalsAgainst += result.homeGoals

            if (result.homeGoals > result.awayGoals) { // gana equipo local
                homeTeam.points += this.config.pointsPerWin
                homeTeam.matchesWon += 1
                awayTeam.points += this.config.pointsPerLose
                awayTeam.matchesLost += 1
                homeTeam.winsTo.push(awayTeam.name)
            } else if (result.homeGoals < result.awayGoals) { // gana equipo visitante
                homeTeam.points += this.config.pointsPerLose
                homeTeam.matchesLost += 1
                awayTeam.points += this.config.pointsPerWin
                awayTeam.matchesWon += 1
                awayTeam.winsTo.push(homeTeam.name)
            } else { // empate
                homeTeam.points += this.config.pointsPerDraw
                homeTeam.matchesDrawn += 1
                awayTeam.points += this.config.pointsPerDraw
                awayTeam.matchesDrawn += 1
            }
        }
    }

    displayMatches(){
        let i = 1
            this.matchDaySchedule.forEach(matchDay => {
                console.log(`JORNADA ${i}`)
                matchDay.forEach(match => {
                    const home = match[0] != null ? match[0] : 'DESCANSA'
                    const away = match[1] != null ? match[1] : 'DESCANSA'
                    console.log(`${home} vs ${away}`)
                })
                i++
            })
    }

    displayTotals(){
        const totalGoals = this.teams.reduce(function(goalsAccumulated, team) {
            return goalsAccumulated + team.goalsFor
         }, 0)

         const initialAccumulator = { totalGoals: 0, totalPoints: 0 }
         const totals = this.teams.reduce(function(accumulator, team) {
             accumulator.totalGoals += team.goalsFor
             accumulator.totalPoints += team.points
             return accumulator
         }, initialAccumulator)

         console.log('TOTALS', totals)
    }
    
    getStandings() {
        let partido=undefined;
        let sumarios = this.summaries;

        this.teams.sort(function(teamA, teamB) {
            if (teamA.points > teamB.points) {
                return -1
            } else if (teamA.points < teamB.points) {
                return 1
            } else { // Empatan a puntos.

                if(teamA.winsTo.find( team => team == teamB.name))
                {
                    return -1
                }else if(teamB.winsTo.find( team => team == teamA.name))
                {
                    return 1
                }else{ // Ningún equipo ha ganado al otro.
                    const goalsDiffA = teamA.goalsFor - teamA.goalsAgainst;
                    const goalsDiffB = teamB.goalsFor - teamB.goalsAgainst;
                    if (goalsDiffA > goalsDiffB) {
                        return -1;
                    } else if (goalsDiffA < goalsDiffB) {
                        return 1;
                    } else { // También empatan en diferencia de goles.
                        return teamA.name.localeCompare(teamB.name);
                                
                    }
                }
            }
        })
    }

    displayResults(i){
                // Muestra resultados para el número de jornada recibido.
                const summary = this.summaries[i];
                console.log(`\nGrupo ${this.name} Jornada ${i+1}\n----------------------`)
                summary.results.forEach(result => {
                    console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam}`)
                })
                console.table(summary.standings.map(team => {
                    return {
                        Equipo: team.name,
                        Puntos: team.points,
                        GolesAFavor: team.goalsFor,
                        GolesEnContra: team.goalsAgainst,
                        Diferencia: team.goalsFor - team.goalsAgainst
                    }
                }))
                
    }

}
