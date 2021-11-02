$(document).ready(function () {
    // cache la deuxième partie de la page qui est le tirage lui-même
    $("#tiragePret").addClass("d-none");

    // initialisation du tableau vide servant au tirage au sort
    var tableauDeBase = [];

    // on ajoute les éléments qu'on souhaite au tableau qui va servir pour le tirage au sort quand on clique sur "ajouter"
    $("#addElement").click(function () {
        var elementTirage = $("#elementTirage").val();
        tableauDeBase.push(elementTirage);
        $(".tableauDeBase").html(tableauDeBase.join(" "));

        clearForm();
    });
    
    //fait comme un changement de page, la div de préparation du tirage disparait pour faire apparaitre 
    $("#goTirage").click(function (event) {
        event.preventDefault();
        $("#preparationTirage").addClass("d-none");
        $("#tiragePret").removeClass("d-none");
    })

    // fonction qui permet de vider le champ de saisie
    function clearForm() {
        $("#elementTirage").val("");
    }

    //initialisation d'un tableau vide qui va servir à la récupération de l'élément sortant lors du random 
    var tableauDeSortie = [];

    //initialisation du bouton de lancer
    var btnlancer = document.querySelector("#lancer");

    //création de la fonction de tirage au sort sur l'ensemble du tableau
    function doRandom(tableau) {
        return tableau[Math.floor(Math.random()*tableau.length)];
    }

    //création de la fonction qui permet de faire sortir la donnée du tableau tirée au sort (indice) en la coupant
    //du tableau d'origine et en l'ajoutant dans le tableau vide
    function sortie(tableau, indice, tableau2) {
        for (var i = 0; i < tableau.length; i++) {
            if(tableau[tableau.indexOf(indice)] == tableau[i]){
                tableau.splice(tableau.indexOf(indice),1);
                tableau2.push(indice)
            }
        }
        return indice;
    }
    //création d'une fonction permettant de désactiver le bouton lancer quand le tableau de base est vide.
    function stopTirage(tableau) {
        if(tableau.length == 0){
            $("#lancer").hide();
        }
    }
    
    //création de l'évènement: quand on clique sur le bouton "lancer", le compte à rebours de 3sec s'enclenche
    //et à sa fin (clearInterval) on annonce la personne tirée au sort, on met à jour le tableau de base,
    //et on affiche les personnes déjà tirées au sort avec le tableau vide sous forme de liste espacée de " ".
    btnlancer.addEventListener("click", function(){
            var timeleft = 3;
            var downloadTimer = setInterval(function(){
            if(timeleft <= 0){
                clearInterval(downloadTimer);
                document.getElementById("resultat").innerHTML = sortie(tableauDeBase, doRandom(tableauDeBase), tableauDeSortie);
                stopTirage(tableauDeBase);
                document.querySelector("#tableauInitial").innerHTML = tableauDeBase.join(" ");
                document.querySelector("#elementsPicked").innerHTML = "Elements sortis: "+tableauDeSortie.join(" ");
            } else {
                document.getElementById("resultat").innerHTML = timeleft;
            }
            timeleft -= 1;
            }, 1000);
    });

    // fonction pour recommencer le tirage avec les mêmes éléments. Même si on recommence en plein tirage alors qu'il reste des éléments, il reprend tous les éléments du départ MAIS pas dans le même ordre.
    $("#restart").click(function () {
        $("#lancer").show();
        tableauDeBase = tableauDeBase.concat(tableauDeSortie);
        tableauDeSortie = [];
        $(".tableauDeBase").html(tableauDeBase.join(" "));
        $("#resultat").html("");
        $("#elementsPicked").html("");
    })
})