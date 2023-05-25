// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})


/* OUTILS DYNAMIQUES */
var competences = {
  HTML: {
    summary: "Permet de structurer le contenu d'une page web en utilisant des balises"
  },
  CSS: {
    summary: "Langage informatique pour styliser et mettre en forme les éléments d'une page web en appliquant des règles de style"
  },
  JAVASCRIPT: {
    summary: "Langage de programmation pour ajouter des fonctionnalités interactives et dynamiques aux pages web"
  },
  PYTHON: {
    summary: "Langage de programmation polyvalent pour diverses applications, y compris l'IA et l'analyse de données"
  },
  PHP: {
    summary: "Langage de programmation côté serveur pour la création de sites web dynamiques avec interaction avec des bases de données"
  },
  SYMFONY: {
    summary: "Framework PHP pour le développement rapide d'applications web robustes et évolutives"
  },
  SQL: {
    summary: "Langage de programmation pour gérer les bases de données"
  },
  JAVA: {
    summary: "Langage de programmation polyvalent pour créer divers types d'applications"
  },
  GITHUB: {
    summary: "Plateforme pour stocker et collaborer sur des projets informatiques entre développeurs"
  },
  SHOPIFY: {
    summary: "Plateforme en ligne qui permet de créer une boutique en ligne et de gérer les ventes"
  },
  WORDPRESS: {
    summary: "Plateforme de création de sites web et de blogs avec un CMS facile à utiliser"
  },
  FLASK: {
    summary: "Framework web léger et flexible en Python pour créer rapidement des applications web avec des fonctionnalités de base"
  },
  SQLITE3: {
    summary: "Bibliothèque de gestion de base de données relationnelle intégrable pour stocker et gérer des données localement"
  },
  DSERS: {
    summary: "Application tierce pour Shopify pour importer des produits AliExpress et gérer les commandes"
  },
  LOOX: {
    summary: "Application tierce pour Shopify pour collecter et publier des avis de clients sous forme de photos et de vidéos"
  },
  SPRING: {
    summary: "Framework Java pour le développement d'applications avec des fonctionnalités telles que la configuration flexible, la sécurité et la gestion de transactions"
  },
  INTELLIJIDEA: {
    summary: "IDE pour le développement de logiciels en Java"
  },
  SQLMARIADB: {
    summary: "Système de gestion de base de données relationnelle open source avec des fonctionnalités avancées pour les environnements d'entreprise et de cloud"
  },
  BOOTSTRAP: {
    summary: "Framework front-end open source pour la création de sites Web et d'applications réactives avec des composants et des outils de conception prêts à l'emploi"
  },
  OCEANEXTRA: {
    summary: "Permet d'étendre les fonctionnalités et les options de personnalisation d'un thème WordPress"
  },
  YOASTSEO: {
    summary: "Plugin WordPress très populaire qui aide à optimiser le référencement (SEO) d'un site web"
  },
  GIVE: {
    summary: "Permet d'ajouter un système de dons et de collecte de fonds sur un site WordPress"
  },
  FORMIDABLEFORMS: {
    summary: "Permet de créer des formulaires personnalisés avec des fonctionnalités avancées sur WordPress"
  },
  ELEMENTOR: {
    summary: "Permet de créer des pages web personnalisées et de modifier le contenu visuellement sur WordPress"
  },
  VSCODE: {
    summary: "Éditeur de code source gratuit avec de nombreuses fonctionnalités pour les développeurs"
  }
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

/* BOUCLE PROJETS */
var projects = [
  {
    category: "HTML, CSS, PHP, Symfony, SQL",
    title: "Boutique e-commerce avec Symfony",
    description: "Cette boutique permet d'afficher les produits disponibles ainsi qu'une interface d'administration permettant de vérifier les commandes passées par les clients.",
    imageSrc: "./assets/symfonyimg/indexecom.PNG",
    link: "./project-12.html"
  },
  {
    category: "HTML, CSS, JAVASCRIPT, PHP, SQL",
    title: "Boutique e-commerce en PHP",
    description: "J'ai développé une boutique eCommerce en PHP from scratch sans framework avec une architecture MVC et une base de données relationnelle pour stocker les informations nécessaires.",
    imageSrc: "./assets/boutiqueEcom/ecommerce-design1.PNG",
    link: "./project-11.html"
  },
  {
    category: "PYTHON, FLASK, SQLITE3",
    title: "Agenda collaboratif en Python",
    description: "Plusieurs personnes peuvent ajouter des événements au calendrier. Les autres membres peuvent les voir, les modifier, les supprimer en temps réel ce qui permet une meilleure organisation entre les membres d'un groupe. Ce projet utilise le framework Flask.",
    imageSrc: "./assets/pythonCalendar/calendriersansUrl.PNG",
    link: "./project-7.html"
  },
  {
    category: "JAVA, SPRING",
    title: "Blog de recettes en Java",
    description: "Le principe d'un blog de recette en Java est de créer une application web pour rechercher, visualiser et partager des recettes de cuisine, en utilisant une base de données et un framework Java comme Spring.",
    imageSrc: "./assets/javaRecette/desktopAccueil.PNG",
    link: "./project-9.html"
  },
  {
    category: "HTML, CSS, JAVASCRIPT",
    title: "Page d'accueil des actualités",
    description: "Le but est de structurer la mise en page de la page d'accueil en utilisant des grilles de lignes et de colonnes pour organiser les différents éléments de la page de manière cohérente et esthétique.",
    imageSrc: "./assets/homePage/desktop-preview.jpg",
    link: "./project-1.html"
  },
  {
    category: "HTML, CSS, JAVASCRIPT",
    title: "Page d'accueil Sunnyside",
    description: "Ce projet est une super occasion pour les développeurs web d'acquérir des compétences en matière de design et structuration de pages web grâce aux fonctionnalités de CSS Grid qui permettent de créer des pages attrayantes et professionnelles.",
    imageSrc: "./assets/sunnySide/desktop-preview.jpg",
    link: "./project-2.html"
  },
  {
    category: "HTML, CSS, JAVASCRIPT",
    title: "Page d'accueil avec un thème sombre",
    description: "Ce design de page comporte de nombreux défis de mise en page. C'est un entraînement parfait pour améliorer ses compétences en utilisant des propriétés comme Flexbox et/ou Grid.",
    imageSrc: "./assets/darkPage/desktop-design.jpg",
    link: "./project-10.html"
  },
  {
    category: "HTML, CSS, JAVASCRIPT",
    title: "Forfait avec prix dynamiques",
    description: "Ce défi amène à réfléchir à la construction d'un bouton On/Off qui, en fonction de son état, fait varier les valeurs des prix. C'est un petit projet très utile pour mieux comprendre le fonctionnement des formulaires !",
    imageSrc: "./assets/pricingToggle/desktop-design-monthly.jpg",
    link: "./project-4.html"
  },
  {
    category: "HTML, CSS, JAVASCRIPT",
    title: "Formulaire interactif pour afficher les détails d'une carte",
    description: "Ce projet amusant est un excellent moyen de pratiquer la manipulation DOM et la validation de formulaires tout en travaillant avec JavaScript pour gérer l'interactivité.",
    imageSrc: "./assets/blueCard/desktop-design.jpg",
    link: "./project-5.html"
  },
  {
    category: "HTML, CSS, JAVASCRIPT",
    title: "Page produit e-commerce",
    description: "Dans ce défi, il faut construire une belle page produit. Mes compétences JS ont été mises à l'épreuve pour réaliser une galerie de produits lightbox et une option ajouter au panier fonctionnelle !",
    imageSrc: "./assets/productEcommerce/desktop-design.jpg",
    link: "./project-6.html"
  },
  {
    category: "HTML, CSS",
    title: "Page d'accueil d'un chat de groupe",
    description: "Renforcer les bases. Ce projet, uniquement codé en HTML et CSS permet de s'attarder sur la structure et plus tard, de servir de base pour des projets plus avancés avec l'ajout de fonctionnalités interactives avec JavaScript, etc.",
    imageSrc: "./assets/meetPage/preview.jpg",
    link: "./project-3.html"
  },
  {
    category: "SHOPIFY",
    title: "Boutique Shopify e-commerce fonctionnelle",
    description: "L'objectif de ce projet a été de créer une boutique en ligne entièrement fonctionnelle en utilisant la plateforme Shopify et d'intégrer les applications DSers et Loox pour améliorer l'expérience client.",
    imageSrc: "./assets/shopifyLamp/desktop-accueil.png",
    link: "./project-8.html"
  },
  {
    category: "WORDPRESS.ORG",
    title: "Site de l'association Enfants d'Afrique",
    description: "L'objectif principal de ce site est de promouvoir les actions menées par l'association en faveur des enfants défavorisés. Le site permet aux visiteurs de découvrir les projets de l'association, de faire des dons et de suivre les actualités de l'association.",
    imageSrc: "./assets/wordpress/accueilDesign.PNG",
    link: "./project-13.html"
  }
];

var projectsHTML = "";

for (var i = 0; i < projects.length; i++) {
  var project = projects[i];

  projectsHTML += `
    <span class="heading-sec__main category">${project.category}</span>
    <div class="projects__row slide-in">
      <div class="projects__row-img-cont">
        <img src="${project.imageSrc}" alt="Software Screenshot" class="projects__row-img" loading="lazy" />
      </div>
      <div class="projects__row-content zoomable">
        <h3 class="projects__row-content-title">${project.title}</h3>
        <p class="projects__row-content-desc">${project.description}</p>
        <a href="${project.link}" class="btn btn--med btn--theme dynamicBgClr">En savoir +</a>
      </div>
    </div>
  `;
}

var projectsContainer = document.querySelector(".projects__content");
projectsContainer.insertAdjacentHTML('beforeend', projectsHTML);



// Sélectionner tous les "projects__row"
const rows = document.querySelectorAll('.projects__row');

// Ajouter un gestionnaire d'événement "scroll" sur la fenêtre
window.addEventListener('scroll', () => {
  // Boucler sur chaque "projects__row"
  rows.forEach(row => {
    // Vérifier si le haut et le bas de la "projects__row" sont visibles dans la fenêtre
    const rowTop = row.getBoundingClientRect().top;
    const rowBottom = row.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    if (rowTop < windowHeight && rowBottom >= 0) {
      // Ajouter la classe "slide-in" après un délai de 500ms
      setTimeout(() => {
        row.classList.add('slide-in');
        row.classList.remove('slide-in-hidden');
      }, 250);
    } else {
      // Supprimer la classe "slide-in" si elle a été ajoutée précédemment
      row.classList.remove('slide-in');
      row.classList.add('slide-in-hidden');
    }
  });
});
