# UCS-HORIZON-II
Jeu de rôle survival horror

## Butin et inventaire

Les joueurs peuvent demander les objets affichés dans un panneau de butin. Le maître de jeu valide chaque demande avant que l'objet soit ajouté à l'onglet « Sur soit »; le stock visible est alors décrémenté.

Les chargeurs DRZ-32 et C17Z, les batteries portables et les lampes portent une valeur `content` dans `js/catalogue.js`. Les chargeurs commencent à 30 et 24 cartouches; batteries et lampes à 100 %. Ces valeurs sont conservées avec l'objet dans l'inventaire pour permettre d'ajouter ultérieurement leur consommation.

### Équipement, lampes et batteries

Chaque joueur a 2 mains (`hands` dans `js/catalogue.js` : lampe et arme de poing = 1, fusil = 2). Les objets équipés apparaissent dans un panneau « ÉQUIPÉ » toujours visible en bas à gauche, avec leurs boutons : « Tirer » (1 utilisation, consomme des cartouches), « Allumer/Éteindre » pour les lampes, « Ranger ». Une lampe allumée perd 1 % par minute (`lamp.drainPerMinute`), calculé par le navigateur du MJ. La lampe tactique peut se monter sur une arme (glisser ou bouton « Monter ») sans occuper de main supplémentaire et ajoute son propre bouton Allumer/Éteindre. Une batterie portable se glisse sur n'importe quelle lampe (ou sur une arme portant une lampe) pour la recharger en transférant son contenu. Pour un joueur, la recharge est une demande « Test de Comtech » : le MJ la valide ou la refuse (il valide directement ses propres recharges).

### Sauvegardes de partie

Une partie est conservée dans Firebase sous son numéro de table (généré à la création) : état du jeu, inventaires, date de création, date de dernière sauvegarde manuelle et une note libre. Le bouton « SAUVEGARDER » (colonne gauche du MJ) enregistre une copie de la partie : 3 copies maximum par table, la plus ancienne est écrasée ; « RESTAURER » recharge la copie choisie. Un chronomètre affiche le temps depuis la dernière sauvegarde : vert sous 30 min, orange de 30 à 60 min, rouge au-delà. Avec le pseudo « Dieu », le bouton « SAUVEGARDES » de l'écran de connexion (après saisie du mot de passe) remplit une liste déroulante des tables existantes ; en choisir une la reprend telle quelle, et « SUPPRIMER CETTE SAUVEGARDE » l'efface définitivement après confirmation. Dans la colonne gauche du MJ, la note se modifie avant de sauvegarder. La dernière page (zone, sous-zone, rapport) de chaque joueur est conservée sous son pseudo dans `playerViews` : en se reconnectant avec le même pseudo, le joueur revient directement là où il était (la page du MJ n'est pas sauvegardée). Le MJ doit pouvoir lire `games` et les joueurs écrire `playerViews` dans les règles Firebase.

### Interface

Le bouton « SUR SOI » est dans le pied de page, entre les deux bandeaux défilants. Côté MJ (écran paysage), les joueurs connectés (rôle, vue en cours, point vert si une lampe est allumée) sont listés à gauche et les demandes de validation s'empilent à droite, à valider dans l'ordre voulu. Un joueur peut envoyer un objet rangé à un autre joueur depuis « Sur soi » (« Envoyer à… ») : le destinataire reçoit un popup au centre de l'écran pour accepter ou refuser, puis le navigateur du MJ déplace l'objet. Ces envois passent par le chemin Firebase `transfers`, qui doit être autorisé en lecture/écriture dans les règles de la base, comme `inventoryOps`.

### Armes et chargeurs

Un équipement se monte sur une arme via des emplacements (`slots`) et des `tags` déclarés dans `js/catalogue.js` (`tags: ["arme","arme_a_feu","militaire"]`, `slots: ["lampe","sangle"]` côté arme ; `attachment: { slot, requiresTags?, items? }` côté accessoire). La lampe tactique va sur toute arme à feu ; la sangle DRZ-32 uniquement sur le DRZ-32 et ajoute « Mettre dans le dos » (libère les mains, un seul objet dans le dos, « Reprendre en main » ensuite). Les calibres fictifs (`CALIBERS` : Cal.3, 5, 7, 10 ; C17Z = Cal.3, DRZ-32 = Cal.5) lient armes, chargeurs et boîtes de munitions (60 cartouches pour le DRZ-32) : un chargeur se remplit depuis une boîte ou se vide dans une boîte du même calibre.

Dans « Sur soit »
, glissez un chargeur sur une arme compatible (ou utilisez le bouton « Charger ») pour l'insérer; « Utiliser » (dans le panneau « ÉQUIPÉ », l'arme doit être équipée) consomme des cartouches (3 pour le DRZ-32, 1 pour le C17Z) et « Retirer le chargeur » le remet dans l'inventaire avec son contenu restant. La compatibilité et la consommation se règlent via `weapon: { magazine, useAmount, useLabel }` dans `js/catalogue.js`. Ces actions ne demandent pas de validation du MJ : elles sont envoyées dans `inventoryOps` sur Firebase et appliquées automatiquement par le navigateur du MJ, qui doit donc rester connecté.
