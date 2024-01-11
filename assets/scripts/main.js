//Import des fonctions dans le fichier script.js
import { filterBtn, hiddenElement, loginLogoutBtn } from "./script.js";

import { loadingWorks } from "./works.js";

import { modalElement } from "./modal.js";

//Récupération des données depuis l'API
const worksFetch = () =>
  fetch("http://localhost:5678/api/works").then((works) => works.json());

//Création de variable pour stocker le token s'il y en a un
const token = localStorage.getItem("authToken");

//Génération du la galerie complète depuis l'API
loadingWorks(worksFetch);

if (token) {
  loginLogoutBtn();
  modalElement();
} else {
  filterBtn();
  hiddenElement();
}
