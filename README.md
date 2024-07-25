# Template d'expérience web hors-ligne

## C'est quoi ?

Ce template permet de réaliser une expérience web totalement portable et hors-ligne.

Vous développez un site statique en JS/TS/HTML/CSS, il est compilé avec Vite, puis empaqueté avec un navigateur et un serveur web pour qu'il soit autonome sur le pc/mac de production.

## Spécificités

### Le bundle
Pour permettre à l'expérience de tourner sans internet, on a besoin de mettre l'expérience dans un paquet (bundle) avec quelques outils.

Pour ça, on va utiliser **gulp** pour créer le dossier `/bundle` et y mettre :
- le code de l'expérience (le dossier `/dist`)
- un serveur web (le dossier `/.bundlebase/caddy`)
- des fichiers de commande pour démarrer l'expérience (dans `/.bundlebase/`)

Sur le pc/mac de production, il faudra mettre mettre dans le même dossier
- le bundle créé
- le dossier browsers qui contient le navigateur chromium pour lancer l'expérience en mode kioske (à télécharger en supplément, car trop lourd pour github)

### Embarquer chromium

Embarquer chromium avec nous permet de gérer pas mal de choses : 
- connaître le navigateur final durant le dev et donc éviter les bugs de compatibilité
- mettre en plein écran total
- bloquer le clic droit et autres navigations
- autoriser à jouer les sons avant que l'utilisateur ait interagi avec la page
- etc

### Démarrer l'expérience via /run

Vous aurez peut-être remarqué le fichier `/src/run/index.html`, il permet d'ouvrir la page index via JS.

C'est un hack qui permet de gérer les onglets via JS, afin de d'ouvrir une nouvelle page dans un nouvel onglet et de fermer l'ancien onglet pour libérer de la mémoire.

On isole les processus Chrome et on évite de subir des fuites mémoires.

L'expérience peut ainsi tourner toute une journée sans problème.