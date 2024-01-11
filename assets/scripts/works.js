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
        console.log("L'image a été effacé");
        //Suppression des 2 images (site et modal en même temps)
        modalFigure.remove();
        siteFigure.remove();
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    alert("ID de l'image non trouvé", imgId);
  }
}
