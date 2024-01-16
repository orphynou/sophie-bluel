import { createModalElement } from "./modal.js";

//Fonction pour récupérer les données depuis l'API
const worksFetch = () =>
  fetch("http://localhost:5678/api/works").then((response) => response.json());

//Fonction pour générer la page de galerie pour le filtre
export function filterWorks(works) {
  //Récupération de l'élément du DOM pour la gallerie
  const galleryElement = document.querySelector(".gallery");
  //Vidage du contenu de la galerie pour éviter les doublons
  galleryElement.innerHTML = "";

  //Boucle for pour récupérer tous les objets disponibles sur le serveur works
  for (let i = 0; i < works.length; i++) {
    const gallery = works[i];

    //Création d'une balise dédiée à chaque projet
    const figureElement = document.createElement("figure");
    figureElement.classList.add("siteFigure");
    figureElement.dataset.id = gallery.id;

    //Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = gallery.imageUrl;
    imageElement.alt = gallery.title;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = gallery.title;

    //On rattache la balise figure à la class gallery
    galleryElement.appendChild(figureElement);

    //On rattache l'image et le titre à la balise figure
    figureElement.appendChild(imageElement);
    figureElement.appendChild(titleElement);
  }
}

//Fonction pour générer la page de galerie une fois connecté
export function loadingWorks(fetchFunction) {
  const galleryElement = document.querySelector(".gallery");
  document.querySelector(".gallery").innerHTML = "";

  fetchFunction().then((data) => {
    for (let i = 0; i < data.length; i++) {
      const gallery = data[i];

      const figureElement = document.createElement("figure");
      figureElement.classList.add("siteFigure");
      figureElement.dataset.id = gallery.id;

      const imageElement = document.createElement("img");
      imageElement.src = gallery.imageUrl;
      imageElement.alt = gallery.title;
      const titleElement = document.createElement("figcaption");
      titleElement.innerText = gallery.title;

      galleryElement.appendChild(figureElement);

      figureElement.appendChild(imageElement);
      figureElement.appendChild(titleElement);
    }
  });
}

//Fonction pour générer la page de galerie pour la modale
export function loadingEditWorks(fetchFunction) {
  const galleryElement = document.querySelector(".editGallery");
  document.querySelector(".editGallery").innerHTML = "";

  fetchFunction().then((data) => {
    for (let i = 0; i < data.length; i++) {
      const gallery = data[i];

      const figureElement = document.createElement("figure");
      figureElement.classList.add("modalFigure");
      figureElement.dataset.id = gallery.id;

      const imageElement = document.createElement("img");
      imageElement.src = gallery.imageUrl;
      imageElement.alt = gallery.title;

      //Création du bouton pour la poubelle
      figureElement.innerHTML = `<button class="trashBtn"><i class="fa-solid fa-trash-can"></i></button>`;
      galleryElement.appendChild(figureElement);
      figureElement.appendChild(imageElement);
    }
  });
}

//Fonction d'envoi de la requête DELETE et et suppression de l'élément du DOM
export function deleteWorksById(imgId) {
  //Récupération du token depuis le localStorage
  const token = localStorage.getItem("authToken");
  //Récupération des balises "figure" du site et de la modale
  const siteFigure = document.querySelector(
    `figure.siteFigure[data-id="${imgId}"]`
  );
  const modalFigure = document.querySelector(
    `figure.modalFigure[data-id="${imgId}"]`
  );
  // Vérification de la présence de l'id
  if (imgId) {
    // Envoyer la requête DELETE pour supprimer l'image
    fetch(`http://localhost:5678/api/works/${imgId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de l'image");
        }
        //Suppression des 2 images (site et modal en même temps)
        modalFigure.remove();
        siteFigure.remove();
        alert("La photo a bien été supprimé");
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    alert("ID de l'image non trouvé", imgId);
  }
}

//Fonction pour ajouter une photo
export function AddWorksSubmit() {
  //Récupération du token et des données nécessaires pour l'envoi
  const authToken = localStorage.getItem("authToken");
  const imageFile = document.getElementById("file").files[0];
  const imageName = document.getElementById("title").value;
  const imageCategory = document.getElementById("category").value;

  //Objet pour comparer les clés/valeurs
  const categoryToInt = {
    Objets: 1,
    Appartements: 2,
    HotelsRestaurants: 3,
  };

  //Stock la valeur en INT du la catégorie
  const intCategory = categoryToInt[imageCategory];

  //Création d'un objet contenant les données nécessaire pour l'API avec le token en headers
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("title", imageName);
  formData.append("category", intCategory);

  const headers = new Headers({
    Authorization: `Bearer ${authToken}`,
  });

  const requestData = {
    method: "POST",
    headers: headers,
    body: formData,
  };

  //Requete API avec les données requises
  fetch("http://localhost:5678/api/works", requestData)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur de réseau ou de serveur");
      }
      return response.json();
    })
    .then((data) => {
      alert("L'image a bien été ajouté");
      createModalElement();
      loadingWorks(worksFetch);
    })
    .catch((error) => {
      alert("Une erreur s'est produite, veuillez retenter plus tard");
      console.error(error);
    });
}
