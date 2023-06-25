/* Toutes les données du contenu à afficher sont stockées dans un fichier data.json puis dans un tableau renvoyé par la fonction getProjectsData(). L'intêret est de pouvoir ajouter
 un projet à venir et son detail uniquement en l'ajoutant au tableau. 
Ici, le code s'affiche dynamiquement depuis le JavaScript : le header, la liste des projets dans la page d'accueil, les outils utilisés et le footer.

Ensuite, lorsque "En savoir plus" est cliqué, la fonction generateProjectDetailHTML(id du projet) cache la liste des projets pour afficher
 les détails d'un projet. Lorsque le bouton "Retour" est cliqué, les détails générés sont cachés et la liste des projets est à nouveau affichée.*/

createMenuHeader();
createProjectsAccueil();
createToolsButtons();
createFooter();

/* HEADER */
function createMenuHeader() {
  var headerHTML = "";
  for (var i = 0; i < 1; i++) {
    headerHTML += `
    <div class="header__content">
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
async function createProjectsAccueil() {
  var projects = await getProjectsData();
  var projectsHTML = "";

  for (var i = 0; i < projects.length; i++) {
    var project = projects[i];
    projectsHTML += `
      <span class="heading-sec__main category" data-id-projetAccueil="${i}">${project.category}</span>
      <div class="projects__row slide-in-hidden">
        <div class="projects__row-img-cont">
          <img src="${project.imageSrc}" alt="${project.title}" class="projects__row-img" loading="lazy" />
        </div>
        <div class="projects__row-content zoomable">
          <h3 class="projects__row-content-title">${project.title}</h3>
          <p class="projects__row-content-desc">${project.description}</p>
          <a href="detail.html?projectIndex=${i}" class="btn btn--med btn--theme dynamicBgClr">En savoir +</a>
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
  console.log(projects.length, "projets ajoutés à la page d'accueil");

  // Appeler la fonction d'animation après avoir créé les projets
  animateProjectsOnScroll();
}

/* SLIDE IN ON SCROLL ANIMATION PROJECT */

function animateProjectsOnScroll() {
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
}


/* GENERATION DE  SUGGESTIONS*/
async function generateProjectSuggestions(projectIndex) {
  var projects = await getProjectsData();
  var projectSuggestionsHTML = "";

  for (var i = 0; i < 3; i++) {
    var index = (projectIndex + i) % projects.length; // Calcul de l'index du projet en utilisant l'opérateur modulo (%)
    var project = projects[index];

    projectSuggestionsHTML += `
      <div class="project-suggestion zoomable" onclick="generateProjectDetailHTML(${index})">
        <img src="${project.imageSrc}" alt="Projet suivant:  ${project.title}" class="project-suggestion__image">
        <h3 class="project-suggestion__title">${project.title}</h3>
      </div>
    `;
  }
  console.log(
    "Génération des 3 suggestions des projets: ",
    projectIndex + 1,
    projectIndex + 2,
    projectIndex + 3,
    "bien réussie"
  );

  return `
    <div class="project-suggestions__container">
      ${projectSuggestionsHTML}
    </div>
  `;
}


/* GENERATION DES DETAILS*/
// Récupérer le paramètre projectIndex depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const projectIndex = parseInt(urlParams.get('projectIndex'));
// Vérifier si projectIndex est un nombre valide avant d'appeler la fonction generateProjectDetailHTML
if (!isNaN(projectIndex)) {
  generateProjectDetailHTML(projectIndex);
}
async function generateProjectDetailHTML(projectIndex) {
  console.log("---------------------------------");
  console.log("Affichage du détail projet: ", projectIndex);
  // Génération de la section des détails du projet sélectionné
  var projects = await getProjectsData();
  var projectDetailsHTML = "";
  for (var i = 0; i < projects.length; i++) {
    var project = projects[i];
    if (i === projectIndex) {
      console.log("i === projectIndex");
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
              <img src="${project.details.imageSrc}" class="project-details__showcase-img">
            </div>
            <div class="project-details__content-main">
              <div class="project-details__desc">
                <h3 class="project-details__content-title">${project.details.descTitle}</h3>
                <ul class="project-details__desc-para">
                  ${project.details.descList
                    .map((item) => `<li><strong>${item.strong}</strong> ${item.content}</li>`)
                    .join("")}
                </ul>
              </div>
              <div class="project-details__tools-used">
                <h3 class="project-details__content-title">Outils utilisés</h3>
                <div class="skills">
                  ${project.details.tools
                    .map((tool) => `<div class="outilsDetails" data-name="${tool}"></div>`)
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
                project.details.mobileImages && project.details.mobileImages.length > 0
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
          <h3 id="titleSuggestions">Projets suivants: </h3>
          ${await generateProjectSuggestions(projectIndex + 1)}
        </div>
      `;
    }
  }
  var detail = document.querySelector(".projectDetail");
  if (detail) {
    detail.innerHTML = projectDetailsHTML;
    window.scrollTo(0, 0);
  } else {
    console.log("Element with class 'projectDetail' not found.");
  }
  console.log("Fonction generateProjectDetailHTML bien exécutée");

  createToolsButtons();
}



/* AFFICHE LES SUGGESTIONS DE PROJETS AU SCROLL*/
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
} window.addEventListener("scroll", showOnScroll);



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
                <img class="main-footer__icon" src="./assets/png/linkedin-ico.png" alt="icone linkedin account" />
              </a>
              <a target="_blank" rel="noreferrer" href="https://github.com/libap">
                <img class="main-footer__icon" src="./assets/png/github-ico.png" alt="icone github account" />
              </a>
            </div>
            <ul>
              <li class="main-footer__short-desc">Tel: <a href="tel:0683838338">0695789353</a></li>
              <li class="main-footer__short-desc">Mail: <a href="mailto:limandribaptiste@gmail.com">limandribaptiste@gmail.com</a></li>
            </ul>
          </div>
          <div class="main-footer__row main-footer__row-2">
            <h3 class="heading heading-sm text-lt">li mandri baptiste</h3>
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


//L'INTEGRALITE DU CONTENU DES PROJETS *//*
function getProjectsData() {
  return new Promise(function (resolve, reject) {
    fetch('data.json')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        resolve(data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
