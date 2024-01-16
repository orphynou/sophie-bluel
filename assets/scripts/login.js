//Ajout d'un addListener sur le bouton de connexion
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    //Empeche le fonctionnement par défaut du bouton
    event.preventDefault();

    //Récupération des valeurs des champs
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;

    //Création d'un objet pour l'envoi de la requête
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
      //Vérification si la réponse http est réussi avec un statut 2xx, si ok, renvoi en json
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      //Si json ok, copie le token dans le localStorage et charge vers la page d'accueil
      .then((data) => {
        localStorage.setItem("authToken", data.token);
        window.location.href = "index.html";
      })
      //Si erreur réponse, renvoi une alerte en popup du navigateur
      .catch((error) => {
        if (error.message === "401" || error.message === "404") {
          alert("L'email ou le mot de passe saisi est incorrect");
        } else {
          alert("Erreur de connexion. Veuillez réessayer plus tard.");
        }
      });
  });
