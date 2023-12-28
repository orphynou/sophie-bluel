//Import des fonctions dans le fichier script.js
import { genererWorks, removeBtnAttribute } from "./script.js";

//Récupération des données depuis l'API
const works = await fetch("http://localhost:5678/api/works").then((works) =>
  works.json()
);

genererWorks(works);

// Ajout du listener pour retirer le filtre
const btnTous = document.querySelector(".btn-tous");
btnTous.addEventListener("click", function () {
  removeBtnAttribute();
  document.querySelector(".btn-tous").setAttribute("autofocus", "");
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(works);
});

// Ajout du listener pour filtrer par objet
const btnObjets = document.querySelector(".btn-objets");
btnObjets.addEventListener("click", function () {
  const objetFilter = works.filter(function (objet) {
    return objet.category.name === "Objets";
  });
  removeBtnAttribute();
  document.querySelector(".btn-objets").setAttribute("autofocus", "");
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(objetFilter);
});

// Ajout du listener pour filtrer par appartement
const btnAppartement = document.querySelector(".btn-appartement");
btnAppartement.addEventListener("click", function () {
  const appartementFilter = works.filter(function (appartement) {
    return appartement.category.name === "Appartements";
  });
  removeBtnAttribute();
  document.querySelector(".btn-appartement").setAttribute("autofocus", "");
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(appartementFilter);
});

// Ajout du listener pour filtrer par hotel et restaurant
const btnHotel = document.querySelector(".btn-hotel");
btnHotel.addEventListener("click", function () {
  const hotelFilter = works.filter(function (hotel) {
    return hotel.category.name === "Hotels & restaurants";
  });
  removeBtnAttribute();
  document.querySelector(".btn-hotel").setAttribute("autofocus", "");
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(hotelFilter);
});
