import axios from 'axios'

// export const paises = [
//     "Argelia-A","Argentina-A","Australia-A", "Bélgica-A",
//     "Brasil-B","Camerún-B","Canadá-B","Chile-B",
//     "China-C", "Chipre-C", "Corea del Sur-C", "Ecuador-C",
//     "España-D", "Grecia-D","Italia-D","Jamaica-D",
//     "Japón-E", "Latveria-E", "Méjico-E", "Nigeria-E",
//     "Nueva Zelanda-F", "Perú-F", "Palombia-F","Symkaria-F",
//     "Portugal-G", "Rumanía-G", "Rusia-G", "Sudáfrica-G",
//     "Turquía-H", "Vietnam-H","Wakanda-H", "Zimbabue-H"
// ]
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
   