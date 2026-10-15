# UCS-HORIZON-II
Jeu de rôle survival horror

## Butin et inventaire

Les joueurs peuvent demander les objets affichés dans un panneau de butin. Le maître de jeu valide chaque demande avant que l'objet soit ajouté à l'onglet « Sur soit »; le stock visible est alors décrémenté.

Les chargeurs DRZ-32 et C17Z, les batteries portables et les lampes portent une valeur `content` dans `js/catalogue.js`. Les chargeurs commencent à 30 et 24 cartouches; batteries et lampes à 100 %. Ces valeurs sont conservées avec l'objet dans l'inventaire pour permettre d'ajouter ultérieurement leur consommation.
