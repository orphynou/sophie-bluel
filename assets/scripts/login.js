//Ajout d'un addListener sur le bouton de connexion
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    //Empeche le fonctionnement par défaut du bouton
    event.preventDefault();

    //Récupération des valeurs des champs
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;

    //Construction du body pour la requete
    const requestBody = {
      email: email,
      password: password,
    };

    //Envoi de la requete vers l'API en convertissant en json
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      //Réponse de l'API : envoi une erreur si pas de réponse de l'API
      .then((Response) => {
        if (!Response.ok) {
          throw new Error("Erreur de connexion");
        }
        return Response.json();
      })
      //Si connecté, copie le token dans le localStorage et redirige vers la page d'accueil
      .then((data) => {
        localStorage.setItem("authToken", data.token);
        window.location.href = "index.html";
      })
      //Si mauvaise saisie, renvoi une alerte en popup du navigateur
      .catch((error) => {
        alert("L'email ou le mot de passe saisi est incorrect");
      });
  });
