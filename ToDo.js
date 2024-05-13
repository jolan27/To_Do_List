const fs = require('fs');
const readline = require('readline');

// Création de l'interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Lie au fichier JSON
const data = require("./ToDo.json");

//fonction supprimer
function supprimerTache (supprimer){
    const index = data.findIndex(tache => tache.task === supprimer);
    if (index !== -1){
        data.splice(index, 1);
        fs.writeFileSync('./ToDo.json', JSON.stringify(data));
        console.log("La tache " + supprimer + " a bien été supprimer !")
    }else {
        console.log("la tache " + supprimer + " n'a pa été trouvé...");
    }
}

//fonction valider
function validerTache (valider){
    const index = data.findIndex(tache => tache.task === valider);
    if (index !== -1 && data[index].isDone !== true ){
        data[index].isDone = true;
        fs.writeFileSync('./ToDo.json', JSON.stringify(data));
        console.log("La tache " + valider + " a bien été validé !");
    }else {
        console.log("La tache n'a pas été trouvé ou a déja été validé...")
    }
}

// Menu d'affichage
function displayMenu() {
    console.log("1. Afficher votre ToDo list");
    console.log("2. Ajouter une tache");
    console.log("3. Supprimer une tache");
    console.log("4. Modifier une tache");
    console.log("5. Quitter");

    rl.question("Que voulez-vous faire ? ", function (choix) {
        switch (choix) {
            case "1":
                console.log(data);
                displayMenu();
                break;
            case "2":
                rl.question("Quelle tache voulez-vous créer : ", function(tache){
                    const ids = data.map (tache => tache.id) //parcour la json
                    const toDo = {
                        id : Math.max(0, ...ids)+1,
                        task : tache,
                        isDone : false
                    };
                    data.push(toDo);
                    fs.writeFileSync('./ToDo.json', JSON.stringify(data))
                    console.log(data);
                    console.log("Votre tache a été ajouter !");
                    displayMenu ();
                })
                break;
            case "3":
                rl.question("Ecrivez le nom de la tache que vous voulez supprimer : ", function(supprimer){
                    supprimerTache(supprimer);
                    console.log(data);
                    displayMenu();
                })
                break;
            case "4":
                rl.question("Ecrivez le nom de la tache que vous voulez valider : ", function(valider){
                    validerTache(valider);
                    console.log(data);
                    displayMenu();
                    
                })
                break;
            case "5":
                rl.close(); // Ferme l'interface readline
                console.log("byebye !")
                return; // Quitte la fonction displayMenu()
            default:
                console.log("Choix invalide");
                displayMenu();
                break;
        }
    });
}

//initialise l'interface
console.log("Salut toi !\nBienvenue sur ta ToDo list!");
displayMenu();