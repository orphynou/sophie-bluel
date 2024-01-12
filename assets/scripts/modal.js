//Import des fonctions dans le fichier script.js
import {
  deleteWorksById,
  loadingEditWorks,
  loadingWorks,
  AddWorksSubmit,
} from "./works.js";

//Fonction pour récupérer les données depuis l'API
const worksFetch = () =>
  fetch("http://localhost:5678/api/works").then((works) => works.json());

//Fonction regroupant toutes fonctions essentielles à lancer au démarrage
export function modalElement() {
  createModalElement();
  initAddEventListenerAll();
}

//Fonction pour la création des éléments de la modale pour la galerie
export function createModalElement() {
  const modal = document.querySelector(".modal");
  modal.innerHTML = "";
  modal.innerHTML = `
  <div class="popup">
    <div class="mainPopup">
      <i class="fa-solid fa-x"></i>
      <div class="namePopup">Galerie photo</div>
      <div class="editGallery"></div>
      <div class="barSubmitContainer">
        <div class="popupBar"></div>
        <input type="submit" id="btnAddPic" value="Ajouter une photo"</input>
      </div>
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
      <form id="addWorksForm" class="addWorksForm">
        <div class="file-preview-container">
          <label for="file" class="custom-file-upload" id="previewContainer">
            <i class="fa-regular fa-image"></i>
            <div class="btn-add-pic">+ Ajouter photo</div>
            <p>jpg, png : 4mo max</p>
          </label>
          <input type="file" name="file" id="file" required>
        </div>
        <div class="inputAddForm">
				  <label for="title">Titre</label>
				  <input type="text" name="title" id="title" required>
				  <label for="category">Catégorie</label>
				  <select name="category" id="category" required>
          <option value=""></option>
          <option value="Objets">Objets</option>
          <option value="Appartements">Appartements</option>
          <option value="HotelsRestaurants">Hotels & restaurants</option>
          </select>
        </div>
        <div class="barSubmitContainer">
          <div class="popupBar"></div>
          <input type="submit" id="validateBtn" class="disabled" value="Valider">
        </div>
      </form>
    </div>
  </div>`;
}

//Fonction pour la gestion d'évenement au clic
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
      initAddEventToChange();
    } else if (event.target.classList.contains("fa-arrow-left")) {
      createModalElement();
    } else if (event.target.id === "validateBtn") {
      event.preventDefault();
      if (
        document.getElementById("validateBtn").classList.contains("disabled")
      ) {
        alert("Veuillez remplir tous les champs du formulaire.");
      } else {
        AddWorksSubmit();
      }
    }
  });
}

//Fonction de gestion des événements changeante
function initAddEventToChange() {
  document.getElementById("file").addEventListener("change", validateBtnState);
  document.getElementById("title").addEventListener("input", validateBtnState);
  document
    .getElementById("category")
    .addEventListener("change", validateBtnState);
  document.getElementById("file").addEventListener("change", previewImage);
}

//Fonction pour la vérification des champs du formulaire
function validateBtnState() {
  const imageFile = document.getElementById("file").files[0];
  const imageName = document.getElementById("title").value;
  const imageCategory = document.getElementById("category").value;
  const validateBtn = document.getElementById("validateBtn");

  //Vérification que les champs ne sont pas vides
  const allInputRequired = imageFile && imageName && imageCategory;

  //Supprime ou ajoute la classe selon le résultat
  if (allInputRequired) {
    validateBtn.classList.remove("disabled");
  } else {
    validateBtn.classList.add("disabled");
  }
  console.log("État des champs : ", { imageFile, imageName, imageCategory });
  console.log(
    "Le bouton Valider est actif : ",
    validateBtn.classList.contains("disabled") ? "Non" : "Oui"
  );
}

//Fonction pour ouvrir la modale
function displayModal() {
  const modal = document.querySelector(".modal");
  const body = document.querySelector("body");
  //Ajoute la classe "active" à la balise aside puis gérer en css
  modal.classList.add("active");
  //Pour éviter le scroll en arrière plan
  body.classList.add("modal-open");
  loadingEditWorks(worksFetch);
}

//Fonction pour fermer la modale
function hideModal() {
  const modal = document.querySelector(".modal");
  const body = document.querySelector("body");
  //Retrait de la classe "active" et "modal-open" pour masquer la modale
  modal.classList.remove("active");
  body.classList.remove("modal-open");
  createModalElement();
  loadingWorks(worksFetch);
}

//Fonction pour afficher la mibiature de l'image choisie
function previewImage() {
  const fileInput = document.getElementById("file");
  const previewContainer = document.getElementById("previewContainer");

  //Vide le conteneur actuel
  previewContainer.innerHTML = "";

  //Vérification qu'un fichier est bien sélectionné
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];

    //Créer un élément pour la miniature
    const imageElement = document.createElement("img");
    imageElement.classList.add("preview-image");

    //Charger l'image en tant que source
    const imageURL = URL.createObjectURL(file);
    imageElement.src = imageURL;

    //Ajouter l'élément image au conteneur parent
    previewContainer.appendChild(imageElement);

    //Ajouter un écouteur d'événement au clic sur l'image pour changer l'image
    imageElement.addEventListener("click", function () {
      //Vider et remettre le contenur initial
      fileInput.value = "";
      previewContainer.innerHTML = `
      <i class="fa-regular fa-image upload-icon"></i>
      <div class="btn-add-pic">+ Ajouter photo</div>
      <p>jpg, png : 4mo max</p>`;
      initAddEventToChange();
    });
  }
}
