// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

/* ce code fontionne tres bien mais nus souhaitons ajouter une balise dedie a la piece automobile
//const article = pieces[0];
for(let article of pieces){
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix}  ${article.prix < 35 ? '€':'€€'}`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "catégorie encours de redaction...";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description || "Pas de description pour le moment....";
    const enstockElement = document.createElement("p");
    enstockElement.innerText = article.disponibilite ? "  En stoc...." : "Rupture de stock....";
    //rattache les elements crees au parents
    const sectionFiches = document.querySelector(".fiches");
    sectionFiches.appendChild(imageElement);
    sectionFiches.appendChild(nomElement);
    sectionFiches.appendChild(prixElement);
    sectionFiches.appendChild(categorieElement);
    sectionFiches.appendChild(descriptionElement);
    sectionFiches.appendChild(enstockElement);
}
*/
function genererPieces(pieces){
for(let i= 0; i < pieces.length; i++){
    const article = pieces[i];
    const pieceElement = document.createElement("article");
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix}  ${article.prix < 35 ? '€':'€€'}`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "catégorie encours de redaction...";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description || "Pas de description pour le moment....";
    const enstockElement = document.createElement("p");
    enstockElement.innerText = article.disponibilite ? "  En stoc...." : "Rupture de stock....";

    //rattache les elements crees au parents
    const sectionFiches = document.querySelector(".fiches");
    sectionFiches.appendChild(pieceElement);
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(enstockElement);
}
}
genererPieces(pieces);
//fonction sort permet de filter les objet par ordre de prix croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    // si appel sort sur pieces les elements de la liste dorigine changent d'ordre ce qui n'est pas bon
    //pour eviter ce comportement on va creer une copies de notre liste avec la fonction array.from
    const piecesOrdonnees = Array.from(pieces); 
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    document.querySelector(".fiches").innerHTML = '';
    genererPieces(piecesOrdonnees);
    console.log(piecesOrdonnees);
});
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
    // ic on souhat filter les articles 
    //si l'articles se trouve dans la liste filtree la fonction de filtrage renvoit true
        //si l'articles ne se trouve pas dans la liste filtree la fonction de filtrage renvoit false
    const piecesFiltrees = pieces.filter(function (a) {
        return a.prix < 35;
    });
    document.querySelector(".fiches").innerHTML = '';
    genererPieces(piecesFiltrees);
    console.log(piecesFiltrees);
});
//ici on va trier les piece par ordre decroissant
const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
     });
     document.querySelector(".fiches").innerHTML = '';
     genererPieces(piecesOrdonnees);
     console.log(piecesOrdonnees);
});
//ici on va demende d'afficher les pieces qui ont une description
const boutonNoDescription = document.querySelector(".btn-nodesc");

boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description;
    });
    document.querySelector(".fiches").innerHTML = '';
    genererPieces(piecesFiltrees);
   console.log(piecesFiltrees)
});
/* on peut pour toute ces fonctons utliser une fonction lamba qui racorci tout le code de la fonction
comme ceci qui donne les meme resltats
boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(piece => piece.description) ;
   //console.log(piecesFiltrees)
});
 */
//pour transformer une liste des objets en tableau on utlise la fonction map avec la notation lamda on a:
//ici on recupere tous les nom des objets de la liste pieces
const listeNoms = document.querySelector(".btn-liste-nom");

listeNoms.addEventListener("click", function () {
    const noms = pieces.map(piece => piece.nom);
   console.log(noms);
   for(let i= 0; i < noms.length; i++){
    const boutElement = document.createElement("button");
    boutElement.innerText = noms[i]; 
    const btliste = document.querySelector(".btn-liste");
    btliste.appendChild(boutElement);
    
  }
});

 


const inputPrixMaxs = document.querySelector('#prix-maxs')
inputPrixMaxs.addEventListener('input', function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMaxs.value;
       
    });
    document.querySelector("#ranges").innerText =inputPrixMaxs.value;
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);  
    console.log(piecesFiltrees)
});
const inputPrixMax = document.querySelector('#prix-max')
inputPrixMax.addEventListener('input', function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);  
    console.log(piecesFiltrees)
});