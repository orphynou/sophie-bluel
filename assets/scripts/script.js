//Import des fonctions dans le fichier script.js
import { filterWorks } from "./works.js";

//Récupération des données depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

//Fonction qui gère les boutons de filtre par catégorie
export function filterBtn() {
  // Ajout du listener pour retirer le filtre
  const btnTous = document.querySelector(".btn-tous");
  btnTous.addEventListener("click", function () {
    removeBtnAttribute();
    document.querySelector(".btn-tous").setAttribute("autofocus", "");
    filterWorks(works);
  });

  // Ajout du listener pour filtrer par objet
  const btnObjets = document.querySelector(".btn-objets");
  btnObjets.addEventListener("click", function () {
    const objetFilter = works.filter(function (objet) {
      return objet.category.name === "Objets";
    });
    removeBtnAttribute();
    document.querySelector(".btn-objets").setAttribute("autofocus", "");
    filterWorks(objetFilter);
  });

  // Ajout du listener pour filtrer par appartement
  const btnAppartement = document.querySelector(".btn-appartement");
  btnAppartement.addEventListener("click", function () {
    const appartementFilter = works.filter(function (appartement) {
      return appartement.category.name === "Appartements";
    });
    removeBtnAttribute();
    document.querySelector(".btn-appartement").setAttribute("autofocus", "");
    filterWorks(appartementFilter);
  });

  // Ajout du listener pour filtrer par hotel et restaurant
  const btnHotel = document.querySelector(".btn-hotel");
  btnHotel.addEventListener("click", function () {
    const hotelFilter = works.filter(function (hotel) {
      return hotel.category.name === "Hotels & restaurants";
    });
    removeBtnAttribute();
    document.querySelector(".btn-hotel").setAttribute("autofocus", "");
    filterWorks(hotelFilter);
  });
}

//Fonction pour supprimer l'attribut autofocus des balises button
function removeBtnAttribute() {
  let allBtn = document.querySelectorAll("button");
  for (let i = 0; i < allBtn.length; i++) {
    allBtn[i].removeAttribute("autofocus");
  }
}

//Fonction pour cacher les élements non dispo pour les non loggé
export function hiddenElement() {
  const editBar = document.getElementById("editModeBar");
  const editBtn = document.getElementById("editModeBtn");

  editBar.remove();
  editBtn.innerHTML = "";
}

//Fonction qui affiche le bouton login ou logout selon présence du token
export function isLogin() {
  //Récupération des liens pour le login et logout par leur id
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  document.querySelector(".filter-menu").innerHTML = "";
  loginBtn.style.display = "none";
  logoutBtn.style.display = "block";
  //Addlistener pour supprimer le token et se déconnecter en retournant à la page d'accueil
  logoutBtn.addEventListener("click", () => {
    const confirmLogout = window.confirm(
      "Confirmez-vous votre intention de vous déconnecter ?"
    );
    if (confirmLogout) {
      localStorage.removeItem("authToken");
      window.location.href = "index.html";
    }
  });
}
