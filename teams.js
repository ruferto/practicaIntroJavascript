import axios from 'axios'

const paisesB = [
    "Argelia","Argentina","Australia", "Bélgica",
    "Brasil","Camerún","Canadá","Chile",
    "China", "Chipre", "Corea del Sur", "Ecuador",
    "España", "Grecia", "Italia", "Jamaica",
    "Japón", "Latveria", "Méjico", "Nigeria",
    "Nueva Zelanda", "Perú", "Palombia", "Symkaria",
    "Portugal", "Rumania", "Rusia", "Sudáfrica",
    "Turquía", "Vietnam","Wakanda", "Zimbabue"
]

export async function getCountriesFromGithub() {
    try{

        const url = 'https://raw.githubusercontent.com/usuario616/repoTest/main/paises.json';
        const response = await axios.get(url);
        const paises=response.data.map( pais => pais.country );
        return paises;

    }catch{
        
        //Si el repo está caído o lo que sea.
        console.warn("Aviso: No se pudo obtener los países desde el repositorio.\nSe recogen desde una lista local");
        return paisesB;
        
    }
    
}

export async function getCountriesFromCountryAPI() {
    try{

        const url = 'http://countryapi.gear.host/v1/Country/getCountries';
        const response = await axios.get(url);
        //console.log(response.data.Response);
        const paises=response.data.Response.map( pais => pais.Name );
        return paises;

    }catch{
        
        //Si el repo está caído o lo que sea.
        console.warn("Aviso: No se pudo obtener los países desde el repositorio.\nSe recogen desde una lista local");
        return paisesB;
        
    }
}

   