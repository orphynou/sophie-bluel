//Import des fonctions dans le fichier script.js
import {
  genererWorks,
  filterBtn,
  loginLogoutBtn,
  hiddenElement,
} from "./script.js";

//Récupération des données depuis l'API
const works = await fetch("http://localhost:5678/api/works").then((works) =>
  works.json()
);
//Création de variable pour stocker le token s'il y en a un
const authToken = localStorage.getItem("authToken");

//Génération du la galerie complète depuis l'API
genererWorks(works);

if (authToken) {
  console.log("Je suis connecté et j'ai un token");
  loginLogoutBtn();
} else {
  filterBtn();
  hiddenElement();
}
