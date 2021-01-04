import PointsBasedLeague from './PointsBasedLeague.js'

export default class Mundial {
    constructor(name, teams=[]) {
        this.name=name;
        this.groups=this.initGroups(teams.shuffle());
        this.ligas=[];
        this.eliminatorias=
            {
                equipos: [],
                partidos: [],
                siguiente: null
            };
    }

    initGroups(teams){

        const grupos=[];
        const letras = ['A','B','C','D','E','F','G','H'];
        const tam = teams.length/letras.length;
        for(let i=0; i<letras.length; i++){
            grupos.push({letter: letras[i], groupTeams: teams.slice(i*tam,(i+1)*tam)});
        }
        return grupos;
    }

    startMundial(){
        console.log(`\nGrupos y equipos\n===============================`);
        this.groups.forEach( grupo => {
            const liga = new PointsBasedLeague(grupo.letter, grupo.groupTeams);
            this.ligas.push(liga);
            console.log(`\n-----------------\nGrupo ${liga.name}\n-----------------`);
            liga.teams.forEach( team =>{
                console.log(team.name);
            })
            console.log('');
            liga.scheduleMatchDays()
            // Mostramos por pantala las jornadas y sus partidos
            liga.displayMatches();

            liga.start();

            this.eliminatorias.equipos.push(liga.teams[0].name, liga.teams[1].name);

        })

        console.log(`\n\n===============================================\n============== COMIENZA EL MUNDIAL ============\n===============================================`)

        // mostrar por pantalla los resultados de cada jornada y la clasificación

        const numJornadas = this.ligas[0].summaries.length;

        for(let i=0; i<numJornadas; i++){
            this.ligas.forEach( liga => {
                liga.displayResults(i);
                // Mostramos el total de goles y el total de puntos en la última jornada,
                // así como los equipos seleccionados.
                if(i==numJornadas){
                    liga.displayTotals();
                    console.log(`Seleccionados: ${liga.teams[0].name} y ${liga.teams[1].name} para el mundial`);
                }
            })
            
        }


        this.playEliminatorias(this.eliminatorias);
    }

    playEliminatorias(eliminatorias){
        let mitad=eliminatorias.equipos.length/2;

        if(mitad>=1){

            if(eliminatorias.partidos.length==0){ // Primera ronda de eliminatorias
                for(let k=0; k<eliminatorias.equipos.length-1; k++){            // Se reparten partidos de manera distinta
                    
                    if(k%2==0){
                        eliminatorias.partidos.push([eliminatorias.equipos[k], eliminatorias.equipos[k+3]]);
                    }else{
                        eliminatorias.partidos.push([eliminatorias.equipos[k], eliminatorias.equipos[k+1]]);
                        k+=2;
                    }

                }

                for(let i=1; i<(eliminatorias.partidos.length/2); i+=2){
                    let aux = eliminatorias.partidos[i];
                    eliminatorias.partidos[i]=eliminatorias.partidos[i+mitad/2];
                    eliminatorias.partidos[i+mitad/2]=aux;
                }
            }

            eliminatorias.siguiente = {
                equipos : [],
                partidos : [],
                siguiente : null
            }

            if(mitad==2) eliminatorias.puestos3y4=[];

            eliminatorias.partidos.forEach( partido => {
                const winner=this.playMatch(partido);
                eliminatorias.siguiente.equipos.push(winner);
                partido.push(winner);

                if(mitad==2){
                    const loser=partido.find( equipo => equipo != winner)
                    
                    eliminatorias.puestos3y4.push(loser)
                    
                }
            
            });

            if(mitad==2){
                eliminatorias.third=this.playMatch(eliminatorias.puestos3y4);
                eliminatorias.fourth = eliminatorias.puestos3y4.find( equipo => equipo != eliminatorias.third);
            }


            for(let k=0; k < mitad ; k+=2){
                eliminatorias.siguiente.partidos.push([eliminatorias.siguiente.equipos[k], eliminatorias.siguiente.equipos[k+1]]);
            }
            
            this.playEliminatorias(eliminatorias.siguiente);
        }
    }


    displayEliminatorias(){
        console.log('\n======================================\n¡COMIENZO DE LA FASE DE ELIMINATORIAS!\n======================================');
        let stop = false;
        let aux=this.eliminatorias;
        while(!stop){
            const tam=aux.equipos.length;
            let nombre="";
            switch(tam/2){
                case 8:
                    nombre="N LOS OCTAVOS!!";
                    break;
                case 4:
                    nombre="N LOS CUARTOS!!";
                    break;
                case 2:
                    nombre="N LAS SEMIFINALES!!";
                    break;
                case 1:
                    nombre=" LA FINAL!!";      
            }
            if(tam >1){
            
                console.log(`\n========¡¡COMIENZA${nombre}========`);

                console.log(`Compiten los equipos: ${aux.equipos}\n`);
                aux.partidos.forEach( partido => {
                    console.log(`${partido[0]} Vs ${partido[1]} \t\t===>  gana ${partido[2]}`);
                });
                
                if(tam/2==2){
                    console.log("\nCompiten por el tercer y cuarto puesto: ");
                    console.log(`${aux.puestos3y4[0]} Vs ${aux.puestos3y4[1]} \t\t===>  gana ${aux.third}`);
                    console.log(`\nTercer puesto: ${aux.third}\nCuarto puesto: ${aux.fourth}`);
                }
            }else{
                console.log(`\n================================================`);
                console.log(`\t¡¡¡${aux.equipos[0].toUpperCase()} gana el mundial!!!`)
                console.log(`================================================\n`);
            }
            aux=aux.siguiente;
            stop = (!aux);
        }
    }
    
    generateGoals() {
        return Math.round(Math.random() * 10)
    }
    playMatch(equipos) {
        let goals1=0;
        let goals2=0;
        
        do{
            goals1 = this.generateGoals()
            goals2 = this.generateGoals()
        }while(goals1 == goals2);

        return (goals1>goals2 ? equipos[0] : equipos[1]);
    }
}

