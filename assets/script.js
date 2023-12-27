//Récupération des données depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

//Boucle for pour récupérer tous les objets disponibles sur le serveur works
for (let i = 0; i < works.length; i++) {
  const gallery = works[i];

  //Récupération de l'élément du DOM pour la gallerie
  const galleryElement = document.querySelector(".gallery");

  //Création d'une balise dédiée à chaque projet
  const figureElement = document.createElement("figure");

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
