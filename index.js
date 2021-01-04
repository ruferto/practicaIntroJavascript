import { paises, getTeamsFromGithub, getTeamsWithPromise } from './teams.js'
import Mundial from './classes/Mundial.js'


try {
    const teams = await getTeamsWithPromise()
    const premierLeagueTeams = teams.map(team => team.name)
  
    const mundial = new Mundial("Mundial", paises);
    
    mundial.startMundial();

    mundial.displayEliminatorias();
 
} catch (error) {
    console.error('ERROR', error)
}
