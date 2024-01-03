//Récupération des données depuis l'API
const works = await fetch("http://localhost:5678/api/works").then((works) =>
  works.json()
);

//Fonction pour générer la page de galerie
export function genererWorks(works) {
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
}

//Fonction pour supprimer l'attribut autofocus des balises button
function removeBtnAttribute() {
  let allBtn = document.querySelectorAll("button");
  for (let i = 0; i < allBtn.length; i++) {
    allBtn[i].removeAttribute("autofocus");
  }
}

//Fonction qui gère les boutons de filtre par catégorie
export function filterBtn() {
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
}

//Fonction qui affiche le bouton login ou logout selon présence du token
export function loginLogoutBtn() {
  //Récupération des liens pour le login et logout par leur id
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  document.querySelector(".filter-menu").innerHTML = "";
  loginBtn.style.display = "none";
  logoutBtn.style.display = "block";
  //Addlistener pour supprimer le token et se déconnecter en retournant à la page d'accueil
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    window.location.href = "index.html";
  });
}

//Fonction pour cacher les élements non dispo pour les non loggé
export function hiddenElement() {
  const editBar = document.getElementById("editModeBar");
  const editBtn = document.getElementById("editModeBtn");

  editBar.remove();
  editBtn.innerHTML = "";
}
