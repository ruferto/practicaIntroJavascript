import { getCountriesFromGithub } from './teams.js'
import Mundial from './classes/Mundial.js'


try {
    const paises = await getCountriesFromGithub()
    //const paises = paisesPre.map(paisesPre => paisesPre.country)
  
    const mundial = new Mundial("Mundial", paises);
    
    mundial.startMundial();

    mundial.displayEliminatorias();
 
} catch (error) {
    console.error('ERROR', error)
}
