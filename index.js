import { getCountriesFromGithub, getCountriesFromCountryAPI } from './teams.js'
import Mundial from './classes/Mundial.js'


try {
    const paises = await getCountriesFromGithub();
    //const paises = await getCountriesFromCountryAPI(42); // Número de países como parámetro. 0 para todos.
  
    const mundial = new Mundial("Mundial", paises);
    
    mundial.startMundial();

    mundial.displayEliminatorias();
 
} catch (error) {
    console.error('ERROR', error)
}
