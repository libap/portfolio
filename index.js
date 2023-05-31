/* Toutes les données du contenu à afficher sont stockées dans un tableau renvoyé par la fonction getProjectsData(). L'intêret est de pouvoir ajouter
 un projet à venir et son detail uniquement en l'ajoutant au tableau. 
Ici, le code s'affiche dynamiquement depuis le JavaScript : le header, la liste des projets dans la page d'accueil, les outils utilisés et le footer.

Ensuite, lorsque "En savoir plus" est cliqué, la fonction generateProjectDetailHTML(id du projet) cache la liste des projets pour afficher
 les détails d'un projet. Lorsque le bouton "Retour" est cliqué, les détails générés sont cachés et la liste des projets est à nouveau affichée.*/

createMenuHeader();
createProjectsAccueil();
createToolsButtons();
createFooter();
//showOnScroll();

/* HEADER */
function createMenuHeader() {
  var headerHTML = "";
  for (var i = 0; i < 1; i++) {
    headerHTML += `
    <div class="header__content">
    <a id="btn-retour" data-id-projetAccueil="" class="hidden" onclick="toggleProjectsContent()">
      <span class="btn-retour-arrow">&#8592;</span> Retour aux projets
    </a>
    <div class="header__logo-container">
 
      <div class="header__logo-img-cont ">
        <img
          src="./assets/cv/pp.png"
          alt="Ram Maheshwari Logo Image"
          class="header__logo-img"
        />
      </div>
      <span class="header__logo-sub">Li Mandri Baptiste</span>
    
    </div>
    <div class="header__main">
      <ul class="header__links">
        <li class="header__link-wrapper">
          <a href="./index.html" class="header__link"> Accueil </a>
        </li>
        <li class="header__link-wrapper">
          <a href="./index.html#about" class="header__link"> Qui suis-je ? </a>
        </li>
        <li class="header__link-wrapper">
          <a href="./index.html#projects" class="header__link">
            Projets
          </a>
        </li>
        <li class="header__link-wrapper">
          <a href="./index.html#contact" class="header__link"> Contact </a>
        </li>
      </ul>
      <div class="header__main-ham-menu-cont">
        <img
          src="./assets/svg/ham-menu.svg"
          alt="hamburger menu"
          class="header__main-ham-menu"
        />
        <img
          src="./assets/svg/ham-menu-close.svg"
          alt="hamburger menu close"
          class="header__main-ham-menu-close d-none"
        />
      </div>
    </div>
  </div>
  <div class="header__sm-menu">
    <div class="header__sm-menu-content">
      <ul class="header__sm-menu-links">
        <li class="header__sm-menu-link">
          <a href="./index.html"> Accueil </a>
        </li>

        <li class="header__sm-menu-link">
          <a href="./index.html#about"> Qui suis-je ? </a>
        </li>

        <li class="header__sm-menu-link">
          <a href="./index.html#projects"> Projets </a>
        </li>

        <li class="header__sm-menu-link">
          <a href="./index.html#contact"> Contact </a>s
        </li>
      </ul>
    </div>
  </div>
    `;
  }
  var headerElements = document.getElementsByClassName("header");

  if (headerElements.length > 0) {
    headerElements[0].innerHTML = headerHTML;
  } else {
    console.error("Element with header not found.");
  }
  console.log("header ajouté");
}

/* FUNCTION LISTEN EVENT MENU MOBILE */
// ---
const hamMenuBtn = document.querySelector(".header__main-ham-menu-cont");
const smallMenu = document.querySelector(".header__sm-menu");
const headerHamMenuBtn = document.querySelector(".header__main-ham-menu");
const headerHamMenuCloseBtn = document.querySelector(
  ".header__main-ham-menu-close"
);
const headerSmallMenuLinks = document.querySelectorAll(".header__sm-menu-link");

hamMenuBtn.addEventListener("click", () => {
  if (smallMenu.classList.contains("header__sm-menu--active")) {
    smallMenu.classList.remove("header__sm-menu--active");
  } else {
    smallMenu.classList.add("header__sm-menu--active");
  }
  if (headerHamMenuBtn.classList.contains("d-none")) {
    headerHamMenuBtn.classList.remove("d-none");
    headerHamMenuCloseBtn.classList.add("d-none");
  } else {
    headerHamMenuBtn.classList.add("d-none");
    headerHamMenuCloseBtn.classList.remove("d-none");
  }
});

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener("click", () => {
    smallMenu.classList.remove("header__sm-menu--active");
    headerHamMenuBtn.classList.remove("d-none");
    headerHamMenuCloseBtn.classList.add("d-none");
  });
}

// ---
const headerLogoConatiner = document.querySelector(".header__logo-container");

headerLogoConatiner.addEventListener("click", () => {
  location.href = "index.html";
});




/* CREER LES PROJETS DE LA PAGE D ACCUEIL */
function createProjectsAccueil() {
  /* BOUCLE PROJETS */
  var projects = getProjectsData();
  var projectsHTML = "";

  for (var i = 0; i < projects.length; i++) {
    var project = projects[i];
    projectsHTML += `
      <span class="heading-sec__main category" data-id-projetAccueil="${i}">${project.category}</span>
      <div class="projects__row slide-in">
        <div class="projects__row-img-cont">
          <img src="${project.imageSrc}" alt="Software Screenshot" class="projects__row-img" loading="lazy" />
        </div>
        <div class="projects__row-content zoomable">
          <h3 class="projects__row-content-title">${project.title}</h3>
          <p class="projects__row-content-desc">${project.description}</p>
          <a  data-id="${i}" onclick="generateProjectDetailHTML(${i})" class="btn btn--med btn--theme dynamicBgClr">En savoir +</a>
        </div>
      </div>
    `;
  }

  var projectsContainer = document.querySelector(".projects__content");
  if (projectsContainer) {
    projectsContainer.insertAdjacentHTML("beforeend", projectsHTML);
  } else {
    console.log("Element with class 'projects__content' not found.");
  }
  console.log(projects.length, "projets ajoutés à la page d accueil");
}

/* SLIDE IN ON SCROLL ANIMATION PROJECT */
const rows = document.querySelectorAll(".projects__row");
// Ajouter un gestionnaire d'événement "scroll" sur la fenêtre
window.addEventListener("scroll", () => {
  // Boucler sur chaque "projects__row"
  rows.forEach((row) => {
    // Vérifier si le haut et le bas de la "projects__row" sont visibles dans la fenêtre
    const rowTop = row.getBoundingClientRect().top;
    const rowBottom = row.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    if (rowTop < windowHeight && rowBottom >= 0) {
      // Ajouter la classe "slide-in" après un délai de 500ms
      setTimeout(() => {
        row.classList.add("slide-in");
        row.classList.remove("slide-in-hidden");
      }, 250);
    } else {
      // Supprimer la classe "slide-in" si elle a été ajoutée précédemment
      row.classList.remove("slide-in");
      row.classList.add("slide-in-hidden");
    }
  });
});

/* GENERATION DE  SUGGESTIONS*/
function generateProjectSuggestions(projectIndex) {
  var projects = getProjectsData();
  var projectSuggestionsHTML = "";

  for (var i = 0; i < 3; i++) {
    var index = (projectIndex + i) % projects.length; // Calcul de l'index du projet en utilisant l'opérateur modulo (%)
    var project = projects[index];

    projectSuggestionsHTML += `
      <div class="project-suggestion zoomable" onclick="generateProjectDetailHTML(${index})">
        <img src="${project.imageSrc}" alt="Projet ${
      index + 1
    }" class="project-suggestion__image">
        <h3 class="project-suggestion__title">${project.title}</h3>
      </div>
      `;
  }
  console.log(
    "Géneration des 3 suggestions des projets: ",
    projectIndex + 1,
    projectIndex + 2,
    projectIndex + 3,
    " bien réussi"
  );

  return `
    <div class="project-suggestions__container">
      ${projectSuggestionsHTML}
    </div>
  `;
}

function showOnScroll() {
  var projectSuggestions = document.querySelectorAll(".project-suggestion");
  var windowHeight = window.innerHeight;

  projectSuggestions.forEach(function (project, index) {
    var rect = project.getBoundingClientRect();
    var offsetTop = rect.top;

    if (offsetTop < windowHeight) {
      setTimeout(function () {
        project.classList.add("show");
      }, index * 400); // Ajoute un délai entre chaque élément pour un effet d'apparition progressive
    } else {
      project.classList.remove("show");
    }
  });
}
window.addEventListener("scroll", showOnScroll);

function generateProjectDetailHTML(projectIndex) {
  console.log("---------------------------------");
  console.log("Affichage du détail projet: ", projectIndex);
  // Génération de la section des détails du projet sélectionné
  var projects = getProjectsData();
  var projectDetailsHTML = "";
  for (var i = 0; i < projects.length; i++) {
    var project = projects[i];
    if (i === projectIndex) {
      projectDetailsHTML = ` 
    
        <section class="project-cs-hero" id="header${projectIndex}">
          <div class="project-cs-hero__content">
            <h1 class="heading-primary">${project.title}</h1>
            <div class="project-cs-hero__info"></div>
          </div>
        </section>
        <section class="project-details">
          <div class="project-details__content">
            <div class="project-details__showcase-img-cont">
              <img src="${
                project.imageSrc
              }" alt="Project Image" class="project-details__showcase-img">
            </div>
            <div class="project-details__content-main">
              <div class="project-details__desc">
                <h3 class="project-details__content-title">${
                  project.details.descTitle
                }</h3>
                <ul class="project-details__desc-para">
                  ${project.details.descList
                    .map(
                      (item) =>
                        `<li><strong>${item.strong}</strong> ${item.content}</li>`
                    )
                    .join("")}
                </ul>
              </div>
              <div class="project-details__tools-used">
                <h3 class="project-details__content-title">Outils utilisés</h3>
                <div class="skills">
                  ${project.details.tools
                    .map(
                      (tool) =>
                        `<div class="outilsDetails" data-name="${tool}"></div>`
                    )
                    .join("")}
                </div>
              </div>
              ${
                project.details.siteLink || project.details.codeLink
                  ? `
                <div class="project-details__links">
                  <h3 class="project-details__content-title">Projet fini</h3>
                  ${
                    project.details.siteLink
                      ? `<a href="${project.details.siteLink}" class="btn btn--med btn--theme project-details__links-btn" target="_blank">voir le site</a>`
                      : ""
                  }
                  ${
                    project.details.codeLink
                      ? `<a href="${project.details.codeLink}" class="btn btn--med btn--theme-inv project-details__links-btn" target="_blank">voir le code</a>`
                      : ""
                  }
                </div>
              `
                  : ""
              }
              ${
                project.details.mobileImages &&
                project.details.mobileImages.length > 0
                  ? `
              <div class="project-details__presentation">
                <h3 class="project-details__content-title">Version mobile</h3>
                <div class="container">
                  ${project.details.mobileImages
                    .map(
                      (image) =>
                        `<div class="imgProjet" style="background-image: url('${image}');"></div>`
                    )
                    .join("")}
                </div>
              </div>
            `
                  : ""
              }
            </div>
          </div>
        </section>

        <div class="project-details__suggestions">
          <h3  id="titleSuggestions">Projets suivants: </h3>
          ${generateProjectSuggestions(projectIndex + 1)}
        </div>
            `;
    }
  }
  var btnRetour = document.getElementById("btn-retour");

  // Attribuer dynamiquement les éléments au bouton
  btnRetour.setAttribute("data-id-projetAccueil", i);
  btnRetour.setAttribute(
    "onclick",
    "toggleProjectsContent(" + projectIndex + ")"
  );
  btnRetour.classList.remove("hidden");

  var projectsContentDiv = document.querySelector(".projects__content");
  var homeHeroDiv = document.querySelector(".home-hero");
  var headingDiv = document.querySelector("#h2heading");
  var aboutDiv = document.querySelector("#about");
  var headerLogoContainer = document.querySelector(".header__logo-container");

  projectsContentDiv.classList.add("hidden");
  homeHeroDiv.classList.add("hidden");
  headingDiv.classList.add("hidden");
  aboutDiv.classList.add("hidden");
  headerLogoContainer.classList.add("hidden");
  var detail = document.querySelector(".projectDetail");
  if (detail) {
    detail.innerHTML = projectDetailsHTML;
    detail.classList.remove("hidden");
  } else {
    console.log("Element with class 'projectDetail' not found.");
  }
  var projectHeroElement = document.querySelector(".project-cs-hero");
  projectHeroElement.scrollIntoView({ behavior: "smooth", block: "start" });
  console.log(
    "Affichage du détail du projet d index ",
    projectIndex,
    " bien réussi"
  );
  createToolsButtons();
}

function toggleProjectsContent(projectIndex) {
  var projectsContentDiv = document.querySelector(".projects__content");
  var projectDetailDiv = document.querySelector(".projectDetail");
  var homeHeroDiv = document.querySelector(".home-hero");
  var headingDiv = document.querySelector("#h2heading");
  var aboutDiv = document.querySelector("#about");
  var btnRetour = document.getElementById("btn-retour");
  var headerLogoContainer = document.querySelector(".header__logo-container");

  if (
    projectsContentDiv &&
    projectDetailDiv &&
    homeHeroDiv &&
    headingDiv &&
    aboutDiv
  ) {
    projectsContentDiv.classList.toggle("hidden");
    projectDetailDiv.classList.toggle("hidden");
    homeHeroDiv.classList.toggle("hidden");
    headingDiv.classList.toggle("hidden");
    aboutDiv.classList.toggle("hidden");
    btnRetour.classList.toggle("hidden");
    headerLogoContainer.classList.toggle("hidden");

    // Renvoyer à la position du projet sur la page d'accueil
    var projectAccueil = document.querySelector(
      `[data-id-projetAccueil="${projectIndex}"]`
    );
    if (projectAccueil) {
      projectAccueil.scrollIntoView({ behavior: "smooth", block: "start" });
      console.log(
        "Retour, renvoie sur l element de la page d accueil d index: ",
        projectIndex
      );
    }
  } else {
    console.log(
      "Element with class 'projects__content', 'projectDetail', 'home-hero', '#h2heading', or '#about' not found."
    );
  }
}

/* FOOTER */
function createFooter() {
  var footerHTML = "";
  for (var i = 0; i < 1; i++) {
    footerHTML += `
      <div class="main-container">
        <div class="main-footer__upper">
          <div class="main-footer__row main-footer__row-1">
            <h2 class="heading heading-sm main-footer__heading-sm">
              <span>ME CONTACTER</span>
            </h2>
            <div class="main-footer__social-cont">
              <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/baptiste-li-mandri-1636a5178/">
                <img class="main-footer__icon" src="./assets/png/linkedin-ico.png" alt="icon" />
              </a>
              <a target="_blank" rel="noreferrer" href="https://github.com/libap">
                <img class="main-footer__icon" src="./assets/png/github-ico.png" alt="icon" />
              </a>
            </div>
            <ul>
              <li class="main-footer__short-desc">Tel: <a href="tel:0683838338">0695789353</a></li>
              <li class="main-footer__short-desc">Mail: <a href="mailto:limandribaptiste@gmail.com">limandribaptiste@gmail.com</a></li>
            </ul>
          </div>
          <div class="main-footer__row main-footer__row-2">
            <h4 class="heading heading-sm text-lt">li mandri baptiste</h4>
            <p class="main-footer__short-desc">
              En 2ème année d'un bachelor de développement web Full Stack, je peux construire le Frontend et le Backend de sites web et/ou d'applications web.
            </p>
          </div>
        </div>
        <div class="main-footer__lower">
          &copy; Copyright 2023.ss
          Codé par Li Mandri Baptiste depuis le code Open-Source de
          <a rel="noreferrer" target="_blank" href="https://dev.to/rammcodes/i-created-an-opensource-portfolio-template-for-developers-1ij9">
            Ram Maheshwari
          </a>
        </div>
      </div>
    `;
  }
  var footerElements = document.getElementsByClassName("main-footer");

  if (footerElements.length > 0) {
    footerElements[0].innerHTML = footerHTML;
  } else {
    console.error("Element with class 'main-footer' not found.");
  }
  console.log("footer ajouté");
}


/* OUTILS DYNAMIQUES */
function createToolsButtons() {
  var competences = {
    HTML: {
      summary:
        "Permet de structurer le contenu d'une page web en utilisant des balises",
    },
    CSS: {
      summary:
        "Langage informatique pour styliser et mettre en forme les éléments d'une page web en appliquant des règles de style",
    },
    JAVASCRIPT: {
      summary:
        "Langage de programmation pour ajouter des fonctionnalités interactives et dynamiques aux pages web",
    },
    PYTHON: {
      summary:
        "Langage de programmation polyvalent pour diverses applications, y compris l'IA et l'analyse de données",
    },
    PHP: {
      summary:
        "Langage de programmation côté serveur pour la création de sites web dynamiques avec interaction avec des bases de données",
    },
    SYMFONY: {
      summary:
        "Framework PHP pour le développement rapide d'applications web robustes et évolutives",
    },
    SQL: {
      summary: "Langage de programmation pour gérer les bases de données",
    },
    JAVA: {
      summary:
        "Langage de programmation polyvalent pour créer divers types d'applications",
    },
    GITHUB: {
      summary:
        "Plateforme pour stocker et collaborer sur des projets informatiques entre développeurs",
    },
    SHOPIFY: {
      summary:
        "Plateforme en ligne qui permet de créer une boutique en ligne et de gérer les ventes",
    },
    WORDPRESS: {
      summary:
        "Plateforme de création de sites web et de blogs avec un CMS facile à utiliser",
    },
    FLASK: {
      summary:
        "Framework web léger et flexible en Python pour créer rapidement des applications web avec des fonctionnalités de base",
    },
    SQLITE3: {
      summary:
        "Bibliothèque de gestion de base de données relationnelle intégrable pour stocker et gérer des données localement",
    },
    DSERS: {
      summary:
        "Application tierce pour Shopify pour importer des produits AliExpress et gérer les commandes",
    },
    LOOX: {
      summary:
        "Application tierce pour Shopify pour collecter et publier des avis de clients sous forme de photos et de vidéos",
    },
    SPRING: {
      summary:
        "Framework Java pour le développement d'applications avec des fonctionnalités telles que la configuration flexible, la sécurité et la gestion de transactions",
    },
    INTELLIJIDEA: {
      summary: "IDE pour le développement de logiciels en Java",
    },
    SQLMARIADB: {
      summary:
        "Système de gestion de base de données relationnelle open source avec des fonctionnalités avancées pour les environnements d'entreprise et de cloud",
    },
    BOOTSTRAP: {
      summary:
        "Framework front-end open source pour la création de sites Web et d'applications réactives avec des composants et des outils de conception prêts à l'emploi",
    },
    OCEANEXTRA: {
      summary:
        "Permet d'étendre les fonctionnalités et les options de personnalisation d'un thème WordPress",
    },
    YOASTSEO: {
      summary:
        "Plugin WordPress très populaire qui aide à optimiser le référencement (SEO) d'un site web",
    },
    GIVE: {
      summary:
        "Permet d'ajouter un système de dons et de collecte de fonds sur un site WordPress",
    },
    FORMIDABLEFORMS: {
      summary:
        "Permet de créer des formulaires personnalisés avec des fonctionnalités avancées sur WordPress",
    },
    ELEMENTOR: {
      summary:
        "Permet de créer des pages web personnalisées et de modifier le contenu visuellement sur WordPress",
    },
    VSCODE: {
      summary:
        "Éditeur de code source gratuit avec de nombreuses fonctionnalités pour les développeurs",
    },
  };

  // Sélectionner toutes les divs avec la classe "outilsDetails"
  var outilsDivs = document.querySelectorAll(".outilsDetails");

  // Parcourir les divs et modifier le contenu et les attributs
  for (var i = 0; i < outilsDivs.length; i++) {
    var div = outilsDivs[i];
    var name = div.getAttribute("data-name");
    // Vérifier si la compétence existe dans le tableau
    if (competences.hasOwnProperty(name)) {
      // Obtenir les attributs de la compétence correspondante
      var competence = competences[name];
      var summary = competence.summary;
      // Modifier le contenu et les attributs de la div
      div.innerHTML = name;
      div.setAttribute("data-summary", summary);
      div.classList.add("skills__skill");
    }
  }
  console.log("Outils utilisés bien ajoutés");
}

function getProjectsData() {
  var projects = [
    {
      category: "Symfony, HTML, CSS, SQL",
      title: "Boutique e-commerce avec Symfony",
      description:
        "Cette boutique e-commerce développée avec Symfony permet aux utilisateurs de créer un compte, de passer des commandes, et à l'administrateur de gérer les commandes passées. Les données sont stockées dans une base de données SQL.",
      imageSrc: "./assets/symfonyimg/indexecom.PNG",
      link: "./project-3.html",
      details: {
        id: "header3",
        title: "Boutique e-commerce avec Symfony",
        imageSrc: "./assets/symfonyimg/ecomDetail.PNG",
        descTitle: "Présentation du projet",
        descList: [
          {
            strong: "Projet Symfony avec boutique en ligne :",
            content:
              "Ma boutique en ligne Symfony est un site permettant aux utilisateurs de créer un compte et de passer des commandes.",
          },
          {
            strong: "Inscription et commande :",
            content:
              "Les acheteurs peuvent créer un compte sur le site et passer des commandes.",
          },
          {
            strong: "Administration des commandes :",
            content:
              "L'administrateur peut se connecter en tant qu'administrateur et visualiser les commandes passées.",
          },
          {
            strong: "Base de données :",
            content:
              "Les données des utilisateurs, des produits et des commandes sont stockées dans une base de données MySQL ou tout autre système de gestion de base de données utilisé par Symfony.",
          },
          {
            strong: "Utilisation du framework Symfony :",
            content:
              "Le projet utilise le framework Symfony pour gérer les requêtes HTTP, le routage, la sécurité et la gestion des dépendances.",
          },
          {
            strong: "Modèle MVC :",
            content:
              "Le projet suit l'architecture Modèle-Vue-Contrôleur (MVC) de Symfony pour organiser le code et la logique de l'application.",
          },
          {
            strong: "Front-end personnalisé :",
            content:
              "Le site présente un design et une mise en page personnalisés en utilisant des templates Twig et des feuilles de style CSS.",
          },
          {
            strong: "Résumé du projet :",
            content:
              "En résumé, ce projet Symfony de boutique en ligne permet aux utilisateurs de créer un compte, de passer des commandes et à l'administrateur de visualiser les commandes passées. Les données sont stockées dans une base de données, et le projet utilise le framework Symfony pour gérer les requêtes HTTP et la sécurité. L'interface utilisateur est personnalisée en utilisant des templates Twig et des feuilles de style CSS.",
          },
        ],
        tools: [
          "HTML",
          "CSS",
          "SQLMARIADB",
          "SYMFONY",
          "PHP",
          "VSCODE",
          "GITHUB",
        ],
        codeLink: "https://github.com/libap/symfonyEcommerce",
      },
    },
    {
      category: "PHP, HTML, CSS, JAVASCRIPT",
      title: "Boutique e-commerce en PHP",
      description:
        "Cette boutique e-commerce en PHP a été développée à partir de zéro, sans framework et avec architecture MVC ainsi qu'une base de données relationnelle pour stocker données. Le projet permet aux clients de trouver des produits, d'ajouter au panier, de parcourir différentes catégories et d'afficher les détails des produits. ",
      imageSrc: "./assets/boutiqueEcom/voiture.PNG",
      link: "./project-2.html",
      details: {
        id: "header2",
        title: "Boutique e-commerce en PHP",
        imageSrc: "./assets/boutiqueEcom/ecommerce-design1.PNG",
        descTitle: "Présentation du projet",
        descList: [
          {
            strong: "Le projet :",
            content:
              "Le développement d'une boutique eCommerce en PHP avec l'architecture MVC.",
          },
          {
            strong: "Objectifs :",
            content:
              "Créer une plateforme en ligne permettant aux clients de naviguer sur le site, de trouver des produits qu'ils souhaitent acheter, de passer commande, d'ajouter au panier, de naviguer entre les différentes catégories, d'afficher les détails d'un produit.",
          },
          {
            strong: "Architecture MVC :",
            content:
              "Utilisée pour séparer les différentes fonctionnalités du site en trois parties distinctes : le modèle, la vue et le contrôleur.",
          },
          {
            strong: "Framework PHP :",
            content:
              "Aucun framework PHP n'a été utilisé pour réaliser la structure côté backend du site.",
          },
          {
            strong: "Fonctionnalités supplémentaires :",
            content:
              "Ajout au panier, tri par catégorie, page contact et page produits.",
          },
          {
            strong: "Base de données :",
            content:
              "Une base de données relationnelle a été créée pour stocker les informations nécessaires à l'exécution des fonctionnalités.",
          },
          {
            strong: "Développement et installation :",
            content:
              "Le site eCommerce a été développé en local et est installé sur un serveur web local WAMP.",
          },
        ],
        tools: [
          "HTML",
          "CSS",
          "BOOTSTRAP",
          "JAVASCRIPT",
          "SQLMARIADB",
          "PHP",
          "VSCODE",
          "GITHUB",
        ],
        codeLink: "https://github.com/libap/boutiqueEcommerce",
        mobileImages: [
          "./assets/boutiqueEcom/mobile1.PNG",
          "./assets/boutiqueEcom/mobile2.PNG",
        ],
      },
    },
    {
      category: "HTML, CSS, PYTHON, FLASK, SQLITE3",
      title: "Agenda collaboratif en Python",
      description:
        "Plusieurs personnes peuvent ajouter des événements au calendrier. Les autres membres peuvent les voir, les modifier, les supprimer en temps réel ce qui permet une meilleure organisation entre les membres d'un groupe. Ce projet utilise le framework Flask.",
      imageSrc: "./assets//pythonCalendar/calendarPreview.PNG",
      link: "./project-4.html",
      details: {
        id: "header4",
        title: "Agenda collaboratif en Python",
        imageSrc: "./assets//pythonCalendar/calendarDev.PNG",
        descTitle: "Présentation du projet",
        descList: [
          {
            strong: "Agenda Flask avec SQLite3 :",
            content:
              "J'ai développé un agenda en utilisant Flask et SQLite3. Plusieurs personnes peuvent ajouter des événements au calendrier, et les autres membres peuvent les voir et y accéder en temps réel, ce qui permet une meilleure organisation entre les membres d'un groupe.",
          },
          {
            strong: "Partage d'agenda par e-mail :",
            content:
              "Chaque calendrier peut être partagé par e-mail en envoyant l'URL du calendrier contenant un hash précis. Seules les personnes ayant accès à ce lien spécifique pourront accéder au calendrier.",
          },
          {
            strong: "Structure de données avec SQLite3 :",
            content:
              "Les événements du calendrier sont stockés dans une base de données SQLite3, ce qui permet de les organiser et de les récupérer facilement.",
          },
          {
            strong: "Utilisation de SQLite3 :",
            content:
              "Le choix de SQLite3 comme système de gestion de base de données permet une intégration simple avec Flask. SQLite3 est une base de données légère et autonome, idéale pour les petites applications.",
          },
          {
            strong: "Interface utilisateur :",
            content:
              "L'interface utilisateur permet aux utilisateurs de créer, modifier et supprimer des événements dans le calendrier. Ils peuvent également voir les événements ajoutés par les autres membres en temps réel.",
          },
          {
            strong: "Utilisation de Flask :",
            content:
              "Le projet utilise le framework Flask pour gérer les requêtes HTTP, le routage et la gestion des dépendances. Flask facilite le développement d'applications web en Python.",
          },
          {
            strong: "Sécurité :",
            content:
              "Des mesures de sécurité sont mises en place pour garantir que seules les personnes ayant le lien du calendrier peuvent y accéder. Les URL sont générées avec des hashs précis pour renforcer la sécurité.",
          },
          {
            strong: "Résumé du projet :",
            content:
              "En résumé, ce projet Flask avec SQLite3 est un agenda collaboratif qui permet à plusieurs utilisateurs d'ajouter, modifier et supprimer des événements dans un calendrier partagé. Les événements sont stockés dans une base de données SQLite3 et l'application utilise le framework Flask pour la gestion des requêtes HTTP. La sécurité est renforcée en générant des URL avec des hashs précis pour limiter l'accès aux calendriers partagés.",
          },
        ],

        tools: [
          "HTML",
          "CSS",
          "PYTHON",
          "FLASK",
          "SQLITE3",
          "VSCODE",
          "GITHUB",
        ],
        codeLink: "https://github.com/Matthh69/calendarpy/tree/main/app",
      },
    },
    {
      category: "HTML, CSS, JAVA, SPRING",
      title: "Blog de recettes en Java",
      description:
        "Le principe d'un blog de recette en Java est de créer une application web pour rechercher, visualiser et partager des recettes de cuisine, en utilisant une base de données et un framework Java comme Spring.",
      imageSrc: "./assets/javaRecette/desktopAccueil.PNG",
      link: "./project-9.html",
      details: {
        id: "header3",
        title: "Blog de recettes en Java",
        imageSrc: "./assets/javaRecette/desktopAccueil.PNG",
        descTitle: "Présentation du projet",
        descList: [
          {
            strong: "Projet Java avec Spring :",
            content:
              "Le projet Java avec Spring que je vais résumer est un blog de recettes.",
          },
          {
            strong: "Inscription et consultation sans compte utilisateur :",
            content:
              "Bien que ce projet ne soit pas déployé en ligne, les utilisateurs peuvent s'inscrire sans avoir de compte et accéder à une liste de recettes.",
          },
          {
            strong: "Pas de fonctionnalité de recherche :",
            content:
              "Il n'y a pas de fonctionnalité de recherche dans ce projet.",
          },
          {
            strong: "Stockage local des données :",
            content:
              "Les données sont stockées localement dans un fichier, ce qui signifie que le projet n'utilise pas de base de données MySQL ou tout autre système de gestion de base de données.",
          },
          {
            strong: "Utilisation de Spring :",
            content:
              "Le projet utilise le framework Spring pour gérer les requêtes HTTP, le routage, la sécurité et la gestion des dépendances.",
          },
          {
            strong: "Programmation orientée objet en Java :",
            content:
              "Le projet est développé en Java et suit les conventions de programmation orientée objet.",
          },
          {
            strong: "Stockage des recettes sous forme d'objets :",
            content:
              "Les recettes sont stockées sous forme d'objets et peuvent être créées, modifiées ou supprimées à partir de l'interface utilisateur.",
          },
          {
            strong: "Résumé du projet :",
            content:
              "En résumé, ce projet Java avec Spring est un blog de recettes qui permet aux utilisateurs de consulter une liste de recettes sans avoir à créer un compte. Les données sont stockées localement dans un fichier, et le projet utilise le framework Spring pour gérer les requêtes HTTP et la sécurité. Bien qu'il n'y ait pas de fonctionnalité de recherche, les utilisateurs peuvent créer, modifier et supprimer des recettes à partir de l'interface utilisateur.",
          },
        ],
        tools: ["HTML", "CSS", "JAVA", "SPRING", "INTELLIJIDEA", "GITHUB"],
        codeLink: "https://github.com/libap/blogSpring",
        mobileImages: [
          "./assets/javaRecette/mobileAccueil.PNG",
          "./assets/javaRecette/mobileDetail.PNG",
          "./assets/javaRecette/mobileFormActive.PNG",
        ],
      },
    },
    {
      category: "HTML, CSS, JAVASCRIPT",
      title: "Page produit e-commerce",
      description:
        "L'objctif est de créer une page produit conçue pour être entièrement responsive et fonctionnelle avec des fonctionnalités avancées telles que la possibilité de choisir la quantité du produit, l'ajout du produit au panier et la visualisation du contenu du panier.",
      imageSrc: "./assets/productEcommerce/active-states-basket-filled.jpg",
      link: "./project-2.html",
      details: {
        id: "header2",
        title: "Page produit e-commerce",
        imageSrc: "./assets/productEcommerce/active-states-basket-filled.jpg",
        descTitle: "Présentation du projet",
        descList: [
          {
            strong: "Créer une page de produit pour un site de e-commerce :",
            content:
              "Cette page doit être conçue pour être entièrement responsive et fonctionnelle, avec des fonctionnalités avancées telles que la possibilité de choisir la quantité du produit, l'ajout du produit au panier et la visualisation du contenu du panier.",
          },
          {
            strong: "Reproduire un design spécifique :",
            content:
              "Plus précisément, on nous demande de reproduire un design spécifique fourni dans le défi en utilisant HTML, CSS et JavaScript. Le design comprend une image du produit, un titre, une description, un prix, un sélecteur de quantité, un bouton d'ajout au panier et un panier.",
          },
          {
            strong: "Développer des compétences en Javascript :",
            content:
              "En somme, le projet 'Product Ecommerce' de Frontend Mentor offre une excellente occasion de mettre en pratique mes compétences en développement web principalement au niveau du Javascript.",
          },
        ],
        tools: ["HTML", "CSS", "JAVASCRIPT", "VSCODE", "GITHUB"],
        siteLink: "https://libap.github.io/ecomProduct/",
        codeLink: "https://github.com/libap/ecomProduct",
        mobileImages: [
          "./assets/productEcommerce/mobile-design.jpg",
          "./assets/productEcommerce/mobile-design-basket-filled.jpg",
          "./assets/productEcommerce/mobile-menu.jpg",
        ],
      },
    },
    {
      category: "HTML, CSS, JAVASCRIPT",
      title: "Récuperer les données d'une carte",
      description:
        "Dans ce projet est une expérience de conception web intéressante avec un formulaire interactif pour capturer les détails d'une carte. En utilisant HTML, CSS et JavaScript, j'ai implémenté des fonctionnalités de manipulation du DOM et de validation des formulaires pour garantir une expérience utilisateur fluide et sécurisée. ",
      imageSrc: "./assets/blueCard/active-states.jpg",
      link: "./project-4.html",
      details: {
        id: "header4",
        title: "Formulaire interactif pour afficher les détails d'une carte",
        imageSrc: "./assets/blueCard/active-states.jpg",
        descTitle: "Présentation du projet",
        descList: [
          {
            strong: "Créer un formulaire interactif :",
            content:
              "Le projet de conception web vise à créer un formulaire interactif pour saisir les détails d'une carte de crédit.",
          },
          {
            strong: "Garantir une fonctionnalité complète :",
            content:
              "Le formulaire doit être entièrement fonctionnel et permettre à l'utilisateur de saisir les informations de sa carte de crédit de manière efficace et sécurisée.",
          },
          {
            strong:
              "Ajouter des fonctionnalités interactives avec JavaScript :",
            content:
              "La partie JavaScript du défi consiste à ajouter des fonctionnalités interactives au formulaire, comme s'assurer que tous les champs obligatoires sont remplis et qu'ils contiennent des données valides.",
          },
          {
            strong: "Recommandation :",
            content:
              "Je recommanderais ce défi à tous les développeurs web qui cherchent à améliorer leurs compétences web et qui souhaitent créer un formulaire de qualité professionnelle.",
          },
        ],
        tools: ["HTML", "CSS", "JAVASCRIPT", "VSCODE", "GITHUB"],
        siteLink: "https://libap.github.io/paiement/",
        codeLink: "https://github.com/libap/paiement",
        mobileImages: [
          "./assets/blueCard/mobile-design.jpg",
          "./assets/blueCard/complete-state-mobile.jpg",
        ],
      },
    },
    {
      category: "HTML, CSS, JAVASCRIPT",
      title: "Forfait avec prix dynamiques",
      description:
        "Ce défi amène à réfléchir à la construction d'un bouton On/Off qui, en fonction de son état, fait varier les valeurs des prix. C'est un petit projet très utile pour mieux personnaliser le fonctionnement des formulaires !",
      imageSrc: "./assets/pricingToggle/desktop-design-monthly.jpg",
      link: "./project-3.html",
      details: {
        id: "header3",
        title: "Forfait avec prix dynamiques",
        imageSrc: "./assets/pricingToggle/desktop-design-annually.jpg",
        descTitle: "Présentation du projet",
        descList: [
          {
            strong: "Objectif :",
            content:
              "Afficher trois forfaits avec des prix dynamiques en fonction de l'option de paiement choisie (annuel ou mensuel).",
          },
          {
            strong: "Technologies utilisées :",
            content:
              "Techniques CSS pour créer le bouton de sélection de l'option de paiement. Flexbox pour rendre la page responsive. Quelques lignes de JavaScript pour la fonctionnalité interactive du bouton, mais surtout du CSS.",
          },
          {
            strong: "Enjeux :",
            content:
              "Ce projet m'a permis de mettre en pratique mes compétences en HTML et en CSS, ainsi que de relever le défi d'améliorer mes compétences en conception web.",
          },
          {
            strong: "Bilan :",
            content:
              "Grâce à ce projet, j'ai été en mesure de développer mes compétences en conception web et de me perfectionner dans l'utilisation de CSS pour la création de boutons interactifs. J'ai également pu découvrir et pratiquer l'utilisation de Flexbox pour rendre une page responsive.",
          },
        ],
        tools: ["HTML", "CSS", "JAVASCRIPT", "VSCODE", "GITHUB"],
        siteLink: "https://libap.github.io/Pricing-et-toggle/",
        codeLink: "https://github.com/libap/Pricing-et-toggle",
        mobileImages: [
          "./assets/pricingToggle/mobile-design-monthly.jpg",
          "./assets/pricingToggle/mobile-design-annually.jpg",
        ],
      },
    },
    {
      category: "HTML, CSS, JAVASCRIPT",
      title: "Page d'accueil avec un thème sombre",
      description:
        "Création d'une page web attrayante et conviviale avec une mise en page claire et facile à comprendre pour les utilisateurs. Les images sont pertinentes et de haute qualité pour renforcer le message visuel de la page.",
      imageSrc: "./assets/darkPage/desktop-design.jpg",
      link: "./project-2.html",
      details: {
        id: "header2",
        title: "Page d'accueil avec un thème sombre",
        imageSrc: "./assets/darkPage/hugeMobile.jpeg",
        descTitle: "Présentation du projet",
        descList: [
          {
            strong: "Conception :",
            content:
              "Créer une page web attrayante et conviviale avec une mise en page claire et facile à comprendre pour les utilisateurs. Utiliser des images pertinentes et de haute qualité pour renforcer le message visuel de la page.",
          },
          {
            strong: "Thème sombre :",
            content:
              "Utiliser un thème sombre pour donner un look moderne et sophistiqué à la page tout en améliorant l'expérience utilisateur en réduisant la fatigue visuelle.",
          },
          {
            strong: "Responsive design :",
            content:
              "La page doit être responsive pour une expérience utilisateur optimale sur différents appareils. Utiliser Grid et Flexbox pour créer une mise en page dynamique et adaptable.",
          },
          {
            strong: "Optimisation des performances :",
            content:
              "La page doit se charger rapidement pour éviter de frustrer les utilisateurs.",
          },
          {
            strong: "Mise en pratique :",
            content:
              "L'utilisation de Grid et Flexbox a permis de créer une mise en page dynamique et responsive. De plus, l'ajout de JavaScript a permis d'ajouter des fonctionnalités interactives, telles que des animations et des effets visuels. En fin de compte, le résultat final a été satisfaisant.",
          },
        ],
        tools: ["HTML", "CSS", "JAVASCRIPT", "VSCODE", "GITHUB"],
        siteLink: "https://libap.github.io/fylo/",
        codeLink: "https://github.com/libap/fylo",
        mobileImages: ["./assets/darkPage/mobile-design.jpg"],
      },
    },
    {
      category: "HTML, CSS, JAVASCRIPT",
      title: "Page d'accueil des actualités",
      description:
        "Le but est de structurer la mise en page de la page d'accueil en utilisant des grilles de lignes et de colonnes pour organiser les différents éléments de la page de manière cohérente et esthétique.",
      imageSrc: "./assets/homePage/desktop-preview.jpg",
      link: "./project-1.html",
      details: {
        id: "header1",
        title: "Page d'accueil des actualités",
        imageSrc: "./assets/homePage/active-states.jpg",
        descTitle: "Présentation du projet",
        descList: [
          {
            strong: "Objectif :",
            content:
              "Créer la page d'accueil d'un site d'actualités en respectant la maquette et en garantissant une expérience utilisateur optimale.",
          },
          {
            strong: "Contraintes à respecter :",
            content:
              "Adapter l'interface en fonction de la taille de l'écran de chaque utilisateur. Ajouter des états de survol et de focus pour tous les éléments interactifs de la page.",
          },
          {
            strong: "Mise en pratique :",
            content:
              "Cette tâche a été une excellente occasion pour moi de mettre en pratique mes compétences en CSS Grid. J'ai dû prendre de nombreuses décisions délicates et j'ai pu en apprendre davantage sur ce sujet.",
          },
        ],
        tools: ["HTML", "CSS", "JAVASCRIPT", "VSCODE", "GITHUB"],
        siteLink: "https://libap.github.io/newsPage/",
        codeLink: "https://github.com/libap/newsPage",
        mobileImages: [
          "./assets/homePage/mobile-design-split-up.jpg",
          "./assets/homePage/mobile-design-split-down.jpg",
          "./assets/homePage/mobile-menu.jpg",
        ],
      },
    },

    {
      category: "HTML, CSS, JAVASCRIPT",
      title: "Page d'accueil Sunnyside",
      description:
        "Ce projet est une super occasion pour les développeurs web d'acquérir des compétences en matière de design et structuration de pages web grâce aux fonctionnalités de CSS Grid qui permettent de créer des pages attrayantes et bien structurées.",
      imageSrc: "./assets/sunnySide/desktop-preview.jpg",
      link: "./project-2.html",
      details: {
        id: "header2",
        title: "Page d'accueil sunnyside",
        imageSrc: "./assets/sunnySide/active-states.jpg",
        descTitle: "Présentation du projet",
        descList: [
          {
            strong: "Objectif :",
            content:
              "Créer la page d'accueil d'un site d'actualités en respectant la maquette et en utilisant principalement HTML et CSS, avec un peu de JavaScript pour la version mobile du menu.",
          },
          {
            strong: "Choix techniques :",
            content:
              "Utilisation de JavaScript pour le menu mobile afin de faciliter la modification et l'ajout de fonctionnalités, mais cela reste faisable sans JavaScript.",
          },
          {
            strong: "Contraintes à respecter :",
            content:
              "Adapter l'interface en fonction de la taille de l'écran de chaque utilisateur. Ajouter des états de survol et de focus pour tous les éléments interactifs de la page.",
          },
          {
            strong: "Mise en pratique :",
            content:
              "Cette tâche sera une excellente occasion pour moi de mettre en pratique à nouveau mes compétences en CSS Grid. De plus, l'utilisation de JavaScript peut aider à améliorer l'expérience utilisateur en offrant une navigation plus fluide et une meilleure réactivité aux actions de l'utilisateur.",
          },
        ],
        tools: ["HTML", "CSS", "JAVASCRIPT", "VSCODE", "GITHUB"],
        siteLink: "https://libap.github.io/sunnysideFront/",
        codeLink: "https://github.com/libap/sunnysideFront",
        mobileImages: [
          "./assets/sunnySide/15-11-4u1.jpg",
          "./assets/sunnySide/15-21-4u1.jpg",
          "./assets/sunnySide/15-31-4u1.jpg",
          "./assets/sunnySide/mobile-menu.jpg",
        ],
      },
    },
    {
      category: "HTML, CSS",
      title: "Page d'accueil d'un chat de groupe",
      description:
        "C'est un projet visant à renforcer les bases du développement web. Cette page d'accueil d'un chat de groupe est entièrement codée en HTML et CSS. L'objectif principal est de se concentrer sur la mise en place de la structure du site. Ce projet peut servir de fondation pour des projets plus avancés.",
      imageSrc: "./assets/meetPage/preview.jpg",
      link: "./project-3.html",
      details: {
        id: "header3",
        title: "Page d'accueil d'un chat de groupe",
        imageSrc: "./assets/meetPage/preview.jpg",
        descTitle: "Présentation du projet",
        descList: [
          {
            strong: "Conception :",
            content:
              "Créer une page web attrayante et conviviale avec une mise en page claire et facile à comprendre pour les utilisateurs.",
          },
          {
            strong: "Contenu :",
            content:
              "La page doit présenter clairement les informations relatives aux groupes de chat disponibles, y compris les sujets de discussion et les membres actifs. Les descriptions des groupes de chat doivent être succinctes et attractives pour les utilisateurs.",
          },
          {
            strong: "Responsive design :",
            content:
              "La page doit être responsive pour une expérience utilisateur optimale sur différents appareils.",
          },
          {
            strong: "Optimisation des performances :",
            content:
              "La page doit se charger rapidement pour éviter de frustrer les utilisateurs.",
          },
          {
            content:
              "La création de cette page d'accueil de chat de groupe nécessitait des compétences en matière de mise en forme, de structure et de gestion de l'expérience utilisateur.",
          },
        ],
        tools: ["HTML", "CSS", "VSCODE", "GITHUB"],
        siteLink: "https://libap.github.io/meetPage/",
        codeLink: "https://github.com/libap/meetPage",
        mobileImages: [
          "./assets/meetPage/mobile1.png",
          "./assets/meetPage/mobile2.png",
          "./assets/meetPage/mobile3.png",
        ],
      },
    },
    {
      category: "SHOPIFY",
      title: "Boutique Shopify e-commerce fonctionnelle",
      description:
        "L'objectif de ce projet a été de créer une boutique en ligne entièrement fonctionnelle en utilisant la plateforme Shopify et d'intégrer les applications DSers et Loox pour améliorer l'expérience client.",
      imageSrc: "./assets/shopifyLamp/desktop-accueil.png",
      link: "./project-8.html",
      details: {
        id: "header8",
        title: "Boutique e-commerce fonctionnelle",
        imageSrc: "./assets/shopifyLamp/desktop-accueil.png",
        descTitle: "Présentation du projet",
        descList: [
          {
            strong: "Objectif :",
            content:
              "Afficher trois forfaits avec des prix dynamiques en fonction de l'option de paiement choisie (annuel ou mensuel).",
          },
          {
            strong: "Technologies utilisées :",
            content:
              "Techniques CSS pour créer le bouton de sélection de l'option de paiement. Flexbox pour rendre la page responsive. Quelques lignes de JavaScript pour la fonctionnalité interactive du bouton, mais surtout du CSS.",
          },
          {
            strong: "Enjeux :",
            content:
              "Ce projet m'a permis de mettre en pratique mes compétences en HTML et en CSS, ainsi que de relever le défi d'améliorer mes compétences en conception web.",
          },
          {
            strong: "Bilan :",
            content:
              "Grâce à ce projet, j'ai été en mesure de développer mes compétences en conception web et de me perfectionner dans l'utilisation de CSS pour la création de boutons interactifs. J'ai également pu découvrir et pratiquer l'utilisation de Flexbox pour rendre une page responsive.",
          },
        ],
        tools: ["SHOPIFY", "DSERS", "LOOX"],
        siteLink: "https://nice-lamp.com/",
        mobileImages: [
          "./assets/shopifyLamp/mobile-desktop.png",
          "./assets/shopifyLamp/mobile-produit.png",
          "./assets/shopifyLamp/mobil-paiement.png",
        ],
      },
    },
    {
      category: "WORDPRESS.ORG",
      title: "Association Enfants d'Afrique",
      description:
        "L'objectif principal de ce site est de promouvoir les actions menées par l'association en faveur des enfants défavorisés. Le site permet aux visiteurs de découvrir les projets de l'association, de faire des dons et de suivre les actualités de l'association.",
      imageSrc: "./assets/wordpress/accueilDesign.PNG",
      link: "./project-13.html",
      details: {
        id: "header13",
        title: "Site de l'association Enfants d'Afrique",
        imageSrc: "./assets/wordpress/accueilDesign.PNG",
        descTitle: "Présentation du projet",
        descList: [
          {
            strong: "Plugins utilisés :",
            content: "",
          },
          {
            strong: "Yoast SEO :",
            content:
              "J'ai utilisé Yoast SEO pour optimiser le référencement et l'optimisation des moteurs de recherche de mon site.",
          },
          {
            strong: "Ocean Extra :",
            content:
              "J'ai étendu les fonctionnalités et les options de personnalisation de mon thème WordPress en utilisant Ocean Extra.",
          },
          {
            strong: "Give - Extension de don :",
            content:
              "J'ai ajouté un système de dons et de collecte de fonds sur mon site WordPress en utilisant l'extension Give.",
          },
          {
            strong: "Formidable Forms :",
            content:
              "J'ai créé des formulaires personnalisés avec des fonctionnalités avancées sur WordPress grâce à Formidable Forms.",
          },
          {
            strong: "Elementor :",
            content:
              "J'ai utilisé Elementor pour créer des pages web personnalisées et modifier visuellement le contenu sur mon site WordPress.",
          },
          {
            strong: "Résumé de mon travail :",
            content:
              "J'ai utilisé ces plugins pour développer mon site WordPress, en optimisant son référencement avec Yoast SEO, en personnalisant le thème avec Ocean Extra, en ajoutant un système de dons avec Give, en créant des formulaires avancés avec Formidable Forms et en concevant des pages visuellement attrayantes avec Elementor. Le résultat est un site fonctionnel, optimisé pour les utilisateurs et les moteurs de recherche, avec des fonctionnalités supplémentaires pour faciliter les dons et les interactions des visiteurs.",
          },
        ],
        tools: [
          "WORDPRESS.ORG",
          "YOASTSEO",
          "OCEANEXTRA",
          "GIVE",
          "FORMIDABLEFORMS",
          "ELEMENTOR",
        ],
      },
    },
  ];

  return projects;
}
