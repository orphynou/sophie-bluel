//Import des fonctions dans le fichier script.js
import { deleteWorksById, loadingEditWorks } from "./works.js";

//Récupération des données depuis l'API
const worksFetch = () =>
  fetch("http://localhost:5678/api/works").then((works) => works.json());

//Fonction regroupant toutes les fonctions à lancer pour l'exporter vers le main.js
export function modalElement() {
  createModalElement();
  initAddEventListenerAll();
}

//Fonction pour la création des éléments de la modale pour la galerie
function createModalElement() {
  const modal = document.querySelector(".modal");
  modal.innerHTML = "";
  modal.innerHTML = `
  <div class="popup">
    <div class="mainPopup">
      <i class="fa-solid fa-x"></i>
      <div class="namePopup">Galerie photo</div>
      <div class="editGallery"></div>
      <div class="popupBar"></div>
      <button id="btnAddPic">Ajouter une photo</button>
    </div>
  </div>`;
  loadingEditWorks(worksFetch);
}

//Fonction pour afficher la modale pour l'ajout de photos
function addWorksModal() {
  const modal = document.querySelector(".modal");
  modal.innerHTML = "";
  modal.innerHTML = `
  <div class="popup">
    <div class="mainPopup">
      <i class="fa-solid fa-arrow-left"></i>
      <i class="fa-solid fa-x"></i>
      <div class="namePopup">Ajout photo</div>
      <div class="formAddWorks">
        <label for="file"><i class="fa-regular fa-image"></i></label>
				<input type="file" name="file" id="file" required>
				<label for="title">Titre</label>
				<input type="text" name="title" id="title" required>
				<label for="category">Catégorie</label>
				<select name="category" id="category">
        <option value=""></option>
        <option value="objets">Objets</option>
        <option value="appartements">Appartements</option>
        <option value="hotels-restaurants">Hotels & restaurants</option>
        </select>
      </div>
      <div class="popupBar"></div>
      <input type="submit" id="validateBtn" class="validateBtnOff" value="Valider">
    </div>
  </div>`;
}

//Fonction pour le gestionnaire d'évenement
function initAddEventListenerAll() {
  document.body.addEventListener("click", function (event) {
    if (event.target.id === "editModeBtn") {
      displayModal();
    } else if (
      event.target.classList.contains("fa-x") ||
      event.target.classList.contains("modal")
    ) {
      hideModal();
    } else if (event.target.closest(".trashBtn")) {
      const imgId = event.target.closest("figure").dataset.id;
      deleteWorksById(imgId);
    } else if (event.target.id === "btnAddPic") {
      addWorksModal();
    } else if (event.target.classList.contains("fa-arrow-left")) {
      createModalElement();
    } else if (event.target.id === "validateBtn") {
      console.log("J'ai cliqué sur le bouton valider");
    }
  });
}

//Fonction pour ouvrir la modale
function displayModal() {
  const modal = document.querySelector(".modal");
  const body = document.querySelector("body");
  //Ajoute la classe "active" à la balise aside qui l'affiche grâce au css
  modal.classList.add("active");
  //Pour éviter le scroll en arrière plan
  body.classList.add("modal-open");
}

//Fonction pour fermer la modale
function hideModal() {
  const modal = document.querySelector(".modal");
  const body = document.querySelector("body");
  //Retrait de la classe "active" pour masqué la modale
  modal.classList.remove("active");
  body.classList.remove("modal-open");
  createModalElement();
}

// //Fonction pour ajouter une photo
// function AddWorksSubmit() {
//   const validBtn = document.getElementById("validateBtn");
//   validBtn.addEventListener("submit", function (event) {
//     console.log("J'ai cliqué sur valider");
//     //Empeche le fonctionnement par défaut du bouton
//     event.preventDefault();
//     const file = document.getElementById("file").value;
//     const title = document.getElementById("title").value;
//     const category = document.getElementById("category").value;
//     console.log(file);
//     console.log(title);
//     console.log(category);
//   });
// }
