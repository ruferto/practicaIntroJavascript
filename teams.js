import axios from 'axios'

export const paises = [
    "Argelia","Argentina","Australia", "Bélgica",
    "Brasil","Camerún","Canadá","Chile",
    "China", "Chipre", "Corea del Sur", "Ecuador",
    "España", "Grecia","Italia","Jamaica",
    "Japón", "Latveria", "Méjico", "Nigeria",
    "Nueva Zelanda", "Perú", "Palombia","Symkaria",
    "Portugal", "Rumanía", "Rusia", "Sudáfrica",
    "Turquía", "Vietnam","Wakanda", "Zimbabue"
]

export async function getTeamsFromGithub() {
    const url = 'https://raw.githubusercontent.com/openfootball/football.json/master/2020-21/en.1.clubs.json'
    const response = await axios.get(url)
    return response.data.clubs
}

export function getTeamsWithPromise() {
    const url = 'https://raw.githubusercontent.com/openfootball/football.json/master/2020-21/en.1.clubs.json'
    return new Promise(function(resolve, reject) {
        axios.get(url).then(function(response) {
            resolve(response.data.clubs)
        }, function(error) {
            reject(error)
        })
    })
}
   