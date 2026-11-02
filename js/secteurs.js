        const DOOR_RULES = {
            retryDelayMsByLevel: { 0: 5 * 60 * 1000, 1: 60 * 1000 },
            outcomes: [
                "La porte reste verrouillee.",
                "La porte bouge, mais pas suffisamment.",
                "La porte s'ouvre juste de quoi se glisser a l'interieur.",
                "La porte s'ouvre difficilement, mais vous pouvez passer.",
                "La porte cede.",
                "La porte cede."
            ]
        };

        // Pièce scellée : le MJ lance le compte à rebours, puis la porte se verrouille jusqu'à la réparation du badge.
        const SEALED_SUITES = {
            suite_1408: {
                title: "APPARTEMENT 1408",
                sector: "pantheon",
                entryZone: "pantheon_h_1408",
                graceMs: 2 * 60 * 1000,
                badgeItem: "suite_master_badge",
                code: "6194",
                steps: [
                    { id: "pry", label: "OUVRIR LE BOÎTIER", item: "suite_silver_spoon", text: "La petite cuillère en argent sert de levier pour faire sauter le boîtier fissuré du badge." },
                    { id: "clean", label: "NETTOYER LA PUCE", item: "suite_longevity_serum", text: "Le sérum périmé dissout la cire noire et la suie qui enrobent la puce." },
                    { id: "wire", label: "RÉPARER L'ANTENNE", item: "suite_copper_wire", text: "Le fil de cuivre ciselé remplace l'antenne rompue du badge." },
                    { id: "power", label: "ALIMENTER LA PISTE", item: "suite_clock_cell", text: "La cellule d'horlogerie donne au badge assez de courant pour être lu une fois." }
                ]
            }
        };

        const DOOR_SYSTEM = {
            qg_a_door: { title: "FORCER LA PORTE BLINDEE DU QG DE LA SECURITE", difficulty: 2 },
            qg_b_door: { title: "FORCER LA PORTE DU FOND", difficulty: 1 },
            infirmerie_c_door: { title: "FORCER LA PORTE DU STOCKAGE MEDICAL", difficulty: 1 },
            pantheon_vance_door: { title: "FORCER LE SAS PRIVÉ DU PENTHOUSE VANCE", difficulty: 2 },
            terr_william_door: { title: "FORCER LA PORTE BARRICADÉE DU 404", difficulty: 2 },
            terr_410_door: { title: "FORCER LA PORTE BARRICADÉE DU 410", difficulty: 1 },
            pantheon_barricade_door: { title: "FORCER LA PORTE BARRICADÉE DE LA RÉSIDENCE ASHFORD", difficulty: 1 },
            lis_110_door: { title: "FORCER LA PORTE BARRICADÉE DU 110", difficulty: 1 }
        };

        function getDoorDefinition(doorTag) {
            const doorDefinition = DOOR_SYSTEM[doorTag.name];
            return doorDefinition ? {
                ...DOOR_RULES,
                ...doorDefinition,
                id: doorTag.name,
                difficulty: doorTag.difficulty,
                outcomes: DOOR_RULES.outcomes
            } : null;
        }

        function getDoorState(door, result) {
            const hasResult = Number.isInteger(result);
            return {
                hasResult,
                isOpen: hasResult && result >= door.difficulty,
                outcome: hasResult ? door.outcomes[result] : ''
            };
        }

        function getDoorRetryDelay(door, result) {
            return door.retryDelayMsByLevel?.[result] || 0;
        }

        const DATA_ZONES = {
//============================================================================
// SECTEUR 01 - INFIRMERIE
//============================================================================
            infirmerie: {
                title: "SECTEUR 01 - INFIRMERIE",
                description: "L’air est plus chaud ici.\n Pas confortable, mais tiède comparé au reste de la station.\n Au fond à droite une porte avec une grande partie vitrée, on voit des lits médicaux. Tout à gauche deux porte autour de l’angle. A l’entrée à droite il y a une autre porte noté « urgence »\n Les lumières fonctionnent encore, mais à moitié.\n \n Il y a des traces d’éclaboussures pâlies,\n •	Traînées frottées,\n •	Marques de mains sur les parois.\n Quelqu’un a essayé de nettoyer.\n Pas de tout faire disparaître.\n Juste… rendre la pièce praticable.",
                zones: [
                    {
                        id: "inf_a",
                        code: "ZONE A",
                        name: "Accueil et salle de soins principale",
                        desc: "Certaines rampes sont réglées en mode chirurgie : blanches, crues, de l’autre côté de la vitre.\nD’autres clignotent doucement, comme si le système hésitait à s’éteindre.\nÇa sent le désinfectant, le plastique chauffé…\nEt quelque chose de plus ancien, plus lourd, incrusté dans les surfaces.\nLes murs sont propres en apparence.\nTrop propres par rapport à la station.\nMais en s’approchant, on voit les traces mal effacées :\nTrois lits médicaux, disposés en étoile autour d’un bras chirurgical motorisé.\n• Un lit est intact.\n• Le deuxième est taché, sang séché sur les sangles.\n• Le troisième a été arraché de ses rails muraux et repoussé contre le mur.\nSur les bras mécaniques :\n• Scalpels automatiques,\n• Pinces,\n• Injecteurs,\n• Scies osseuses compactes.",
                        lootGroups: LOOT_GROUPS.inf_a,
                        reports: [
                            {
                                id: "rep_inf_1",
                                code: "LOG-MED-01",
                                title: "Journal de Garde - Infirmière Hofmann",
                                author: "Infirmière L. Hofmann",
                                date: "14/11/2088 - 03:14",
                                text: "SERVICE MÉDICAL – RAPPORTS D'ADMISSION\nMédecin responsable : Dr. Thomas Becker\n\nPatient : Inconnu (badge illisible)\nÉtat à l'arrivée : Vivant – critique\nLieu de récupération : Couloir non chauffé du secteur technique\n\n[CONSTAT INITIAL]\n- Température corporelle extrêmement basse.\n- Peau froide, rigide par endroits, respiration lente mais présente.\n- Présence de multiples plaies auto-infligées aux bras et à l'abdomen.\n- Saignements ralentis par l'hypothermie.\n\n[PROCÉDURE D'URGENT ENGAGÉE]\n- Couvertures thermiques x2\n- Patchs chauffants thoraciques et dorsaux\n- Perfusion saline tiédie\n- Compression des plaies principales\n- Analgésiques lourds (-4 Tension / effets secondaires)\n- Antalgiques puissants\n\n[RÉACTION AU TRAITEMENT]\nLes patchs chauffants ont eu un effet positif immédiat sur l'état général : respiration plus ample, coloration cutanée légèrement améliorée, reprise d'un pouls périphérique faible mais perceptible.\n\n[OBSERVATIONS COMPORTEMENTALES]\n- État délirant persistant malgré la stabilisation partielle.\n- Agitation par à-coups, crispations musculaires marquées lors des soins.\n- Murmures répétés, non cohérents :\n  • \"Encore… trop tôt…\"\n  • \"Il regarde…\"\n  • \"C'est pas fini…\"\nLe patient semblait ressentir pleinement la douleur, sans capacité à la verbaliser ni à s'y soustraire.\n\n[ÉVOLUTION]\n- Dégradation brutale de l'état cardiaque.\n- Tachycardie sévère suivie d'un arrêt cardiaque.\n- Les manœuvres de réanimation ont échoué.\n\n[CONCLUSION]\nLe froid a ralenti l'hémorragie et retardé l'issue. Les patchs chauffants ont temporairement amélioré les fonctions vitales. Mais le cœur n'a pas supporté la multiplication des traumatismes, la douleur prolongée et l'état délirant constant.",
                                doctorNote: "NOTE PERSONNELLE : Il n'était pas censé tenir aussi longtemps. Et pourtant… quelqu'un lui a donné les moyens de tenir. Juste assez.",
                            },
                            {
                                id: "rep_inf_2",
                                code: "LOG-MED-02",
                                title: "Rapport d'incident Triage",
                                author: "Sécurité Station - Agent Vance",
                                date: "14/11/2088 - 05:40",
                                text: "Un patient du secteur d'attente a tenté de forcer la grille du sas intérieur. Utilisation de la force non létale nécessaire. Il hurlait à propos d'une 'lumière sous la peau'. Il a été placé sous contrainte en Zone C.",
                            },
                        ]
                    },
//============================================================================
// SALLE DES URGENCES
//============================================================================

                    {
                        id: "inf_b",
                        code: "ZONE B",
                        name: "Salle urgences ",
                        desc: "Une zone plus petite, plus étroite.\nPensée pour les situations de crise.\nLe sol est marqué de traînées parallèles, comme si des corps avaient été déplacés rapidement.\nUn chariot médical renversé :\n• Poches de sang éventrées,\n• Cathéters,\n• Compresses abandonnées.\nCe qu’ils peuvent récupérer :\n• Sacs de perfusion,\n• Outils de suture,\n• Antiseptiques,\n• Masques respiratoires.\nÀ gauche un comptoir pour deux infirmières. Les ordinateurs sont cassés.\nSur le mur, une liste écrite à la main, partiellement effacée :\n• Noms barrés,\n• Annotations rapides,\n• Puis… plus rien.\nQuelqu’un s’est arrêté d’écrire avant la fin.",
                        lootGroups: LOOT_GROUPS.inf_b,
                        reports: [
                            {
                                id: "rep_inf_93",
                                code: "LOG-MED-03",
                                title: "Rapport Urgence : Poste Médical Secondaire",
                                author: "Infirmière Lena Hofmann",
                                date: "03:17",
                                text: "SERVICE MÉDICAL – RAPPORTS D'ADMISSION\n\nPatient : Inconnu (badge illisible)\nÉtat à l'arrivée : Vivant – critique\nLieu de récupération : Couloir non chauffé du secteur technique\n\n[CONSTAT INITIAL]\n- Température corporelle extrêmement basse.\n- Peau froide, rigide par endroits, respiration lente mais présente.\n- Présence de multiples plaies auto-infligées aux bras et à l'abdomen.\n- Saignements ralentis par l'hypothermie.\n\n[PROCÉDURE D'URGENT ENGAGÉE]\n- Couvertures thermiques x2\n- Patchs chauffants thoraciques et dorsaux\n- Perfusion saline tiédie\n- Compression des plaies principales\n- Analgésiques lourds (-4 Tension / effets secondaires)\n- Antalgiques puissants\n\n[RÉACTION AU TRAITEMENT]\nLes patchs chauffants ont eu un effet positif immédiat sur l'état général : respiration plus ample, coloration cutanée légèrement améliorée, reprise d'un pouls périphérique faible mais perceptible.\n\n[OBSERVATIONS COMPORTEMENTALES]\n- État délirant persistant malgré la stabilisation partielle.\n- Agitation par à-coups, crispations musculaires marquées lors des soins.\n- Murmures répétés, non cohérents :\n  • \"Encore… trop tôt…\"\n  • \"Il regarde…\"\n  • \"C'est pas fini…\"\nLe patient semblait ressentir pleinement la douleur, sans capacité à la verbaliser ni à s'y soustraire.\n\n[ÉVOLUTION]\n- Dégradation brutale de l'état cardiaque.\n- Tachycardie sévère suivie d'un arrêt cardiaque.\n- Les manœuvres de réanimation ont échoué.\n\n[CONCLUSION]\nLe froid a ralenti l'hémorragie et retardé l'issue. Les patchs chauffants ont temporairement amélioré les fonctions vitales. Mais le cœur n'a pas supporté la multiplication des traumatismes, la douleur prolongée et l'état délirant constant.",
                                doctorNote: "NOTE PERSONNELLE : \n\nIl n'était pas censé tenir aussi longtemps. \nEt pourtant… quelqu'un lui a donné les moyens de tenir. \nJuste assez."
                            },
                            
                            {
                             id: "rep_inf_104",
                            code: "LOG-MED-04",
                             title: "Rapport Urgence : Poste Médical Secondaire",
                            author: "Infirmière Élodie Varnier",
                             date: "ARCHIVES MÉDICALES - 19:18",
                            text: "RAPPORT D'URGENCE – INFIRMERIE CENTRALE\nRédigé par : Infirmière Élodie Varnier\nHorodatage : 19:18\nPatient : Femme, env. 30–35 ans\nAdmission : Vivante / état critique\n\n[CONSTAT À L'ARRIVÉE]\nLa patiente a été amenée consciente, marchant seule, accompagnée à distance par deux membres de la maintenance qui ont refusé de s'approcher davantage, l'ayant déclarée extrêmement violente.\nElle tenait quelque chose contre son abdomen avec les deux mains. Ils pensaient qu'il s'agissait d'un vêtement. Ce n'était pas le cas.\n\n- Plaie abdominale large, ouverte volontairement, incision nette mais irrégulière.\n- Absence d'hémorragie massive immédiate, ce qui est médicalement difficile à expliquer vu l'étendue de la blessure.\n- La patiente avait commencé à extraire ses propres organes. Un segment intestinal était déjà sectionné et maintenu hors de la cavité abdominale, enveloppé grossièrement dans un tissu isolant récupéré sur place.\n- Elle respirait rapidement mais restait étonnamment stable.\n\n[COMPORTEMENT OBSERVÉ]\n- Aucune panique.\n- Aucune plainte liée à la douleur.\n- Elle répétait calmement : \"Ce n'est pas à sa place.\" \"Il faut que ça sorte.\"\n- Lorsqu'on lui a demandé pourquoi, elle a simplement répondu : \"Parce qu'il regarde.\"\n\nElle a refusé toute aide tant que nous tentions de refermer la plaie. Non réponse à la sédation.\nEn revanche, elle a cessé toute résistance lorsque nous avons stabilisé les organes extraits, comme si l'important n'était pas sa survie.\n\n[INTERVENTION]\n- Compression abdominale\n- Tentative de sédation (efficacité partielle)\n- Réchauffement progressif\n\nÀ noter : augmentation brutale de la fréquence cardiaque et de l'agitation lors du réchauffement. La patiente a alors repris l'extraction avec plus de force, utilisant ses ongles et ses dents pour sectionner des tissus déjà fragilisés. Elle pleurait, mais ne criait pas.\n\n[DÉCÈS]\nArrêt cardiaque consécutif à une défaillance multiple des organes. Décès sur table, sans lutte finale. Au moment de l'arrêt, elle a souri.",
                             doctorNote: "REMARQUE INFIRMIÈRE : \n\nElle ne cherchait pas à mourir. \nElle cherchait à se vider. Comme si quelqu'un lui avait appris que certaines choses ne devaient pas rester à l'intérieur. \n\nJe ne suis pas sûre que ce soit encore des suicides."
                            },
                            {
                             id: "rep_inf_111",
                              code: "LOG-ADM-111",
                             title: "Rapport Urgence : Poste Médical Secondaire",
                             author: "Infirmière Élodie Varnier",
                             date: "ARCHIVES MÉDICALES - 03:42",
                            text: "SERVICE MÉDICAL – RAPPORTS D'ADMISSION\nMédecin responsable : Dr. Thomas Becker\nHorodatage : 03:42\n\nPatient : Homme, env. 40-45 ans (Ingénieur structure)\nÉtat à l'arrivée : Vivant – Coma catatonique\nLieu de découverte : Conduit de ventilation principal - Niveau -2\n\n[CONSTAT INITIAL]\n- Le patient s'est introduit de lui-même dans une conduite d'aération étroite (diamètre < 45 cm) en retirant ses vêtements.\n- Présence de lubrifiant industriel et de sang sur l'ensemble du corps, facilitant sa progression forcée dans le conduit.\n- Retrouvé bloqué à la verticale, la tête vers le bas, bloqué par les épaules.\n\n[LÉSIONS OBSERVÉES]\n- Fractures ouvertes et dislocations multiples des deux clavicules et des omoplates (auto-infligées par contrainte mécanique pour réduire sa largeur corporelle).\n- Infiltration massive de fines particules métalliques et de suie dans la cavité buccale, le pharynx et les voies respiratoires supérieures.\n- Absence totale de réflexe de déglutition ou de toux malgré la présence d'obstructions denses.\n\n[COMPORTEMENT ET ÉTAT NEUROLOGIQUE]\n- Aucune réponse aux stimuli douloureux profonds.\n- Yeux grand ouverts, pupilles en mydriase fixe. Aucune lésion oculaire, mais présence d'un clignement synchronisé anormal : exactement une fois toutes les 60 secondes.\n- Activité encéphalographique mesurée : pics d'ondes thêta d'une amplitude irréaliste lors des phases d'auscultation du thorax.\n\n[REMARQUES CLINIQUES]\nAu vu des fractures osseuses au niveau de la ceinture scapulaire, la douleur aurait dû provoquer un évanouissement immédiat. Pourtant, la position du corps et l'usure de la paroi du conduit montrent qu'il a continué d'avancer en se tractant avec la pointe des doigts sur plus de quinze mètres après s'être brisé les épaules.",
                             doctorNote: "NOTE PERSONNELLE : \n\nIl ne cherchait pas à s'échapper."
                            },
                            {
                               id: "rep_inf_114",
                             code: "LOG-ADM-114",
                             title: "Rapport Urgence : Intégration Structurelle Non Identifiée",
                             author: "Infirmière Élodie Varnier",
                            date: "ARCHIVES MÉDICALES - 04:15",
                             text: "SERVICE MÉDICAL – RAPPORTS D'ADMISSION\nRédigé par : Infirmière Élodie Varnier (sans supervision du Dr. Becker)\nHorodatage : 04:15\n\nPatient : Technicien de maintenance (Plaque matricule illisible)\nÉtat à l'arrivée : Indéterminé / Inclassable\nLieu de découverte : Sub-niveau 14 - Compartiment de tuyauterie terciaire\n\n[CONSTAT INITIAL]\nLe patient n'a pas pu être transporté seul. L'équipe d'intervention a dû découper un tronçon de cloison métallique avec une scie à plasma pour l'apporter jusqu'à l'infirmerie. \nIl est arrivé fixé à la plaque de métal par un clouage pneumatique auto infligé. Littéralement fixé.\n\n[LÉSIONS OBSERVÉES ET MODIFICATIONS CORPORALLES]\n- Décapage cutané chirurgical et méthodique sur l'ensemble du thorax, de l'abdomen et de la face antérieure des cuisses (la peau a été incisée puis rabattue sur les côtés comme un vêtement ouvert).\n- La chair à vif, le tissu adipeux et le fascia musculaire ont été appliqués directement contre l'acier à nu de la station.\n- Le sang et les fluides corporels ont séché et coagulé au contact du métal froid, créant une adhérence structurelle totale en plus des clous. Par endroits, le tissu cutané semble avoir fusionné ou s'être incrusté dans les micro-fissures de la paroi. (combien de temps il faut pour ceci?)\n\n[EXAMEN DÉTAILLÉ]\nJe... je ne sais pas comment documenter ça correctement.\nEn nettoyant autour du point de jonction entre son sternum et la cloison, j'ai remarqué que le métal sous sa chair présentait des traces de corrosion acide anormales. On dirait que la sueur et le sang ont attaqué la peinture. Je soupçone l'utilisation de diluants. \n\nAu-dessus de sa tête, gravé à même la peinture jaune de la cloison avec un morceau d'ongle arraché et du sang séché, on peut lire :\n\"NOUS NE FAISONS QU'UN, IL ME L'A DIT\"\n\n[COMPORTEMENT ET ÉTAT VITAL]\n- Le patient respire encore. Les mouvements de sa cage thoracique font grimacer et tordre la peinture du panneau.\n- Pas de réponse aux stimuli verbal ou tactile.\n- Ses yeux suivent mes mouvements par instant. Il ne cligne pas. Il ne pleure pas. Il regarde juste le plafond quand je ne suis pas là.\n- Quand j'ai essayé de glisser un scalpel entre son thorax et la plaque pour tenter de le décoller... le panneau métallique a émis un son j'en suis sur, j'ai enttendu quelques chose. Et son regard sur moi... Pas un bruit de métal. Un bruit d'aspiration ou une voix. Je suis sûr d'avoir enttendu quelque chose.\n\n J'ai posé le scalpel. Je n'y touche plus.",
                            doctorNote: "NOTE PERSONNELLE : \n\nJe n'en peux plus. Les ciseaux tremblent dans mes mains. Ce n'est pas lui qui est collé à la station... j'ai l'impression que c'est la station qui est en train de le digérer. Si Becker ne revient pas du secteur B d'ici une heure, je verrouille la porte du poste d'urgence et je brûle le registre."
                            },
                            {
                             id: "rep_inf_117",
                             code: "LOG-ADM-117",
                             title: "Rapport d'incident interne : Décès du personnel soignant",
                              author: "Infirmière Lena Hofmann",
                             date: "ARCHIVES MÉDICALES - 06:50",
                            text: "SERVICE MÉDICAL – RAPPORT D'INCIDENT EXCEPTIONNEL\nRédigé par : Infirmière Lena Hofmann\nHorodatage : 06:50\n\nVictime : Élodie Varnier (Infirmière diplômée d'État - Matricule INF-204)\nStatut : Décédée sur coup / Constat à 06:22\nLieu du drame : Poste d'urgence - Réserve d'instruments stériles\n\n[CIRCONSTANCES DE LA DÉCOUVERTE]\nAprès l'absence de réponse aux appels radio répétés, je me suis rendue au poste d'urgence. La porte était verrouillée de l'intérieur. J'ai dû forcer le panneau d'accès manuel. \nJ'ai découvert le corps de l'infirmière Varnier affalé au sol, entre les chariots d'instruments. Le patient du rapport 111 (technicien fixé à la paroi) était toujours sur table, immobile.\n\n[CONSTAT MÉDICO-LÉGAL INITIAL]\n- Suffocation aiguë provoquée par une obstruction massive et volontaire des voies aériennes supérieures et du pharynx.\n- La victime s'est introduit de force plusieurs instruments chirurgicaux dans la cavité buccale et la gorge.\n- Présence de perforations majeures de l'œsophage et hémorragie interne massive au niveau cervical et thoracique.\n\n[DÉTAIL DES OBJETS RETROUVÉS (INCRIMINÉS)]\n- 1x Scalpel chirurgical manche plat N°4 (lame de taille 22 consommée / manche enfoncé dans le larynx).\n- 2x Pinces d'Esmarch (dont une bloquée en position ouverte dans l'oropharynx).\n- Divers fragments de verre provenant d'ampoules de sédatifs brisées à dents nues.\n\n[OBSERVATIONS PHYSIQUES]\nIl n'y a aucune trace de lutte ou d'intervention d'un tiers. Les blessures aux lèvres et aux gencives démontrent que l'infirmière Varnier a accompli cet acte seule, avec une force et une détermination inexplicables. Ses doigts étaient crispés sur le manche du dernier outil.\nSur la table d'examen, le terminal d'Élodie était encore allumé sur son dernier rapport (LOG-ADM-111). Le scalpel manquant dans son kit d'urgence était celui qu'elle avait posé à côté du patient.",
                           doctorNote: "NOTE PERSONNELLE : \n\nJ'ai mal à la gorge. Je n'arrête pas de me racler la gorge depuis deux heures. Est-ce que c'est l'air ? Est-ce que c'est la poussière ? Ou est-ce que ça commence comme ça ?\n\nÉlodie était la plus calme d'entre nous. Si elle a fait ça... si elle s'est enfoncé ça dans la bouche jusqu'à ce que le sang sorte par le nez... c'est que quelque chose lui a fait croire que c'était la seule solution. \n\nMes mains n'arrêtent pas de trembler. Je regarde les armoires à instruments et j'ai l'impression que les miroirs des scalpels me fixent. Je ne veux pas rester seule ici. Où est Becker ? POURQUOI PERSONNE NE RÉPOND SUR LE CANAL GÉNÉRAL ? Je dois cacher les trousses de dissection. Je dois tout verrouiller avant que mes mains ne décident à ma place."
                            },
                        ]
                    },
                    {
                        id: "inf_c",
                        code: "ZONE C",
                        name: "Stockage médical / pharmacie",
                        door: { name: "infirmerie_c_door", difficulty: 1 },
                        desc: "Une pièce fermée, température légèrement plus basse.\n\nLes armoires sont partiellement vidées.\n\nPas pillées au hasard : sélectionnées.\n\nIl reste :\n\n- Médicaments lourds,\n- Matériel technique,\n- Équipements que seuls des professionnels sauraient utiliser.",
                        lootGroups: LOOT_GROUPS.inf_c,
                        reports: [
                            {
                                id: "rep_inf_5",
                                code: "LOG-MED-05",
                                title: "Note de service #12",
                                author: "Dr. Becker",
                                date: "XX/XX/XXXX - 08:15",
                                text: "Nous avons verrouillé la zone C suite à un suicide ayant eu lieu tôt ce matin."
                            }
                        ]
                    },
//============================================================================
// BUREAU DU DR. BECKER
//============================================================================
                    {
                        id: "inf_d",
                        code: "ZONE D",
                        name: "Bureau Privé du Dr. Becker",
                        desc: "Un bureau en acajou de synth-bois, couvert de dossiers confidentiels et d'échantillons sous scellés. Un coffre mural fort reste entrouvert.",
                        lootGroups: LOOT_GROUPS.inf_d,
                        doctorLootNote: `Lettre manuscrite personnelle - Dr. Thomas Becker

(non datée - retrouvée pliée)

J'écris ceci pour tenter de remettre de l'ordre dans mes pensées.

Depuis plusieurs semaines, je fais face à des patients qui arrivent morts ou aux portes de la mort, présentant des mutilations que je n'aurais jamais cru possibles sans perte de conscience immédiate. Ce constat, à lui seul, suffirait à troubler n'importe quel praticien. Pourtant, ce n'est pas la gravité des blessures qui m'inquiète le plus, mais ce qui les précède.

Ces personnes ne se connaissaient pas. Elles n'exerçaient pas les mêmes fonctions. Elles ne partageaient ni croyances communes, ni passés similaires. En apparence, rien ne permet de les relier.

Et pourtant, dès que l'on observe leurs derniers comportements, un motif se dessine. Une convergence inquiétante. Une peur diffuse, une paranoïa grandissante, une obsession d'être observé, jugé, désigné comme fautif.

Je me surprends à envisager une forme de contamination psychique. Pas une pathologie identifiable, ni un agent biologique ; toutes les analyses sont négatives. Mais un phénomène comportemental. Un délire mimétique, peut-être... La peur comme vecteur. La mise en scène des morts comme catalyseur. Une spirale où chaque découverte alimente la suivante.

Le Conseil, de son côté, est incapable de trancher. Ils débattent sans fin, pesant chaque décision comme si le temps n'était pas un facteur critique. Ils veulent des certitudes là où il n'y en a plus. Leur immobilisme me fatigue plus que je ne sache l'admettre à voix haute. Ils ne savent pas quoi faire du nouvel arrivant du fond spatial, mais les problèmes ont commencé avec son arrivée.

Je me surprends à regretter l'époque où cette colonie n'était pas dirigée par un organe aussi fragmenté. Lorsque les dogmes ne régissaient pas la vie ici, tout était plus simple. Brutal, parfois absurde, mais cohérent au final. Aujourd'hui, nous avons remplacé des règles sociales imparfaites par un vide décisionnel.

Je continue de remplir des rapports.

Je continue de signer des certificats de décès.

Mais chaque jour, je comprends un peu moins ce que j'atteste.`,
                        doctorLootNote2: `Lettre personnelle II - Dr. Thomas Becker

(non datée - écriture tremblée, encre appuyée)

Je dois admettre que ce que j'ai écrit précédemment ne me suffit plus.

Les explications rationnelles que je tentais de formuler ne tiennent plus face aux faits récents.

Ce qui se passe sur cette station ne relève plus d'un phénomène de contamination psychique au sens classique. Il y a dans ces morts une intention qui dépasse le simple délire individuel. Les gestes sont trop précis. Trop répétés. Les mises en scène suivent une logique interne que je commence à percevoir sans pouvoir la formuler clairement.

J'ai vu des patients mourir non pas pour fuir la souffrance. Leurs esprits se fragmentent.

Ils parlaient peu, mais leurs regards étaient fixés. Ils ne demandaient pas d'aide.

Ils ne semblaient même plus comprendre ou réagir à la réalité.

Le Conseil est désormais touché à son tour. Les accusations circulent. Les soupçons se cristallisent. Deux membres se sont donné la mort. Peut-être trois, disparu actuellement. Les informations se contredisent, ou sont volontairement dissimulées. Ce qui était censé gouverner la station est devenu une arène silencieuse où chacun redoute d'être le prochain désigné par une accusation. Et toujours rien concernant nos nouveaux pensionnaires... La clef, j'en suis sûr !

La station n'est plus un lieu de soin. Elle s'est transformée en tribunal.

Un tribunal sans juge visible, sans loi écrite, mais dont les sentences sont irrévocables.

Ce qui me terrifie le plus, ce n'est pas la mort.

C'est l'acceptation. Personne ne réclame de défense. Personne ne nie vraiment.

Ils semblent tous persuadés qu'une faute existe, même s'ils ne savent pas laquelle.

Je ne crois plus que la science suffise à expliquer ce que nous vivons.

Je ne crois pas non plus qu'il s'agisse d'un retour au religieux, au sens humain du terme. C'est autre chose. Quelque chose qui observe, qui attend, et qui pousse sans se montrer.

Et j'ai la certitude glaçante que`,
                        reports: [
                            {
                                id: "rep_inf_101",
                                code: "LOG-ADM-101",
                                title: "Rapport d'admission n°101",
                                author: "Dr. Thomas Becker",
                                date: "ARCHIVES MEDICALES",
                                text: "SERVICE MÉDICAL – RAPPORTS D'ADMISSION\nMédecin responsable : Dr. Thomas Becker\n\nPatient : Homme, 37 ans\nÉtat à l'arrivée : Décédé\n\n[CONSTAT INITIAL]\nLe patient a été découvert dans sa chambre, assis sur une chaise, face à la porte. Un de ses poumons dans une main.\n\n[LÉSIONS OBSERVÉES]\n- Ouverture thoracique large, réalisée par l'avant.\n- Un poumon manquant.\n- Aucune trace d'outil médical.\n\n[REMARQUES CLINIQUES]\nL'extraction a été effectuée grossièrement, à l'aide d'une scie circulaire portable et de tournevis.\n\n[INCOHÉRENCE PHYSIOLOGIQUE]\nLe patient aurait dû perdre connaissance bien avant la fin des gestes observés. Je m'inquiète qu'il puisse y avoir un règlement de compte en cours."
                            },
                            {
                                id: "rep_inf_104",
                                code: "LOG-ADM-104",
                                title: "Rapport d'admission n°104",
                                author: "Dr. Thomas Becker",
                                date: "ARCHIVES MEDICALES",
                                text: "SERVICE MÉDICAL – RAPPORTS D'ADMISSION\nMédecin responsable : Dr. Thomas Becker\n\nPatient : Femme, 24 ans\nÉtat à l'arrivée : Moribonde : décès sur la table (12 min après admission)\n\n[CONSTAT INITIAL]\nArrivée consciente, délirante.\n\n[LÉSIONS OBSERVÉES]\n- Ablation complète de la langue.\n- Section partielle des tendons des poignets.\n- Incisions profondes et régulières sur les avant-bras.\n\n[REMARQUES CLINIQUES]\n- Aucune tentative de garrot.\n- Aucune panique visible malgré l'hémorragie.\n\n[INCOHÉRENCE PHYSIOLOGIQUE]\nLa patiente est restée consciente pendant une durée incompatible avec la perte sanguine observée."
                            },
                            {
                                id: "rep_inf_107",
                                code: "LOG-ADM-107",
                                title: "Rapport d'admission n°107",
                                author: "Dr. Thomas Becker",
                                date: "ARCHIVES MEDICALES",
                                text: "SERVICE MÉDICAL – RAPPORTS D'ADMISSION\nMédecin responsable : Dr. Thomas Becker\n\nPatient : Homme, 51 ans\nÉtat à l'arrivée : Décédé\n\n[CONSTAT INITIAL]\n- Retrouvé allongé sur le sol de l'infirmerie secondaire.\n- Regard ouvert.\n- Sourire léger.\n\n[LÉSIONS OBSERVÉES]\n- Énucléation bilatérale.\n- Aucune autre blessure.\n\n[REMARQUES CLINIQUES]\nLes globes oculaires ont été retirés avec une relative précision. Pas de lacération excessive. Les yeux ont été déposés dans un réchauffeur à micro-ondes."
                            },
                            {
                                id: "rep_inf_111",
                                code: "LOG-ADM-111",
                                title: "Rapport d'admission n°111",
                                author: "Dr. Thomas Becker",
                                date: "ARCHIVES MEDICALES",
                                text: "SERVICE MÉDICAL – RAPPORTS D'ADMISSION\nMédecin responsable : Dr. Thomas Becker\n\nPatient : Femme, âge 45\nÉtat à l'arrivée : Décédée\n\n[CONSTAT INITIAL]\n- Corps amené par l'équipe de sécurité.\n- Aucune résistance lors de l'extraction.\n\n[LÉSIONS OBSERVÉES]\n- Auto-amputation de la main gauche.\n- Amputation par morsures répétées.\n- Morsures profondes sur les doigts restants.\n\n[REMARQUES CLINIQUES]\nLes dents correspondent à la patiente. La section osseuse est irrégulière. Les tendons retiennent encore la main."
                            },
                            {
                                id: "rep_inf_114",
                                code: "LOG-ADM-114",
                                title: "Rapport d'admission n°114",
                                author: "Dr. Thomas Becker",
                                date: "ARCHIVES MEDICALES",
                                text: "SERVICE MÉDICAL – RAPPORTS D'ADMISSION\nMédecin responsable : Dr. Thomas Becker\n\nPatient : Homme, 42 ans\nÉtat à l'arrivée : Décédé\nLieu de découverte : Couloir technique – niveau inférieur\n\n[CONSTAT INITIAL]\nLe corps a été découvert empalé verticalement, à environ deux mètres du sol, fixé sur un renfort structurel du couloir. Aucune trace de lutte dans la zone. Aucune trace de déplacement visible.\n\n[LÉSIONS OBSERVÉES]\n- Multiples lacérations auto-infligées aux avant-bras, au thorax et à l'abdomen.\n- Hémorragies compatibles avec un suicide par exsanguination.\n\n[CAUSE DU DÉCÈS]\nPerte sanguine massive, antérieure à l'empalement. L'empalement a été réalisé après le décès. Les tissus ne présentent aucune réaction inflammatoire. Aucune contraction musculaire réflexe. L'angle de pénétration est précis. La force appliquée est suffisante pour traverser les tissus mous et s'ancrer dans la structure métallique.\n\n[INCOHÉRENCES RELEVÉES]\nLe patient ne pouvait pas, seul, se placer dans cette position après la perte de conscience. Aucune trace de matériel de levage. Aucun témoin. Aucune trace de pas supplémentaires.\n\n[REMARQUES CLINIQUES]\nLes blessures auto-infligées sont compatibles avec les cas précédents. L'empalement ne l'est pas. Il ne s'agit pas d'un accident. Il ne s'agit pas d'une mise en scène spontanée. Quelqu'un… ou quelque chose… a déplacé le corps.",
                                doctorNote: "NOTE PERSONNELLE :\n \nLe patient s'est donné la mort.\n Mais quelqu'un a décidé de ce qu'il deviendrait après.\n Ce détail me perturbe plus que les mutilations.\n Si les corps peuvent être déplacés ainsi, sans témoins, sans lutte, sans traces,\n \nalors le problème n'est plus médical.\n \nJe crains pour l'état mental de l'ensemble de la station.\n Pas seulement des patients.\n \n \n \nDe tout le monde."

                            },
                            {
                                id: "rep_inf_118",
                                code: "LOG-ADM-118",
                                title: "Rapport d'admission n°118",
                                author: "Dr. Thomas Becker",
                                date: "ARCHIVES MEDICALES",
                                text: "SERVICE MÉDICAL – RAPPORTS D'ADMISSION\nMédecin responsable : Dr. Thomas Becker\n\nPatient : Homme, 31 ans\nÉtat à l'arrivée : Décédé\nLieu de découverte : Zone d'habitation B - Couloir 4\n\n[CONSTAT INITIAL]\n- Retrouvé prostré au sol, doigts verrouillés en contraction tétanique.\n- Des lambeaux d'épithélium et de tissu adipeux retrouvés sous les ongles du sujet.\n\n[LÉSIONS OBSERVÉES]\n- Excoriations massives et profondes sur les deux cuisses, le thorax et l'abdomen.\n- Décapage cutané total au niveau du visage : absence quasi complète d'épiderme et de derme sur la joue droite et le front, mettant à nu la structure osseuse maxillaire.\n- Lacérations bilatérales des canaux lacrymaux.\n\n[CAUSE DU DÉCÈS]\nChoc hypovolémique consécutif à une exsangue hémorragie cutanée et veineuse superficielle.\n\n[REMARQUES CLINIQUES]\nLe patient a littéralement pelé sa propre peau par grattage compulsif sur une surface corporelle excédant 40%. La profondeur des plaies au niveau de la carotide et du visage a provoqué une perte sanguine dévastatrice en quelques minutes.\n\n[INCOHÉRENCE PHYSIOLOGIQUE]\nAu vu du volume de sang perdu au niveau du thorax, la perte de connaissance aurait dû intervenir en moins de deux minutes. Pourtant, l'étendue des lésions du visage – d'une profondeur méthodique – démontre que le sujet a continué de s'écorcher activement au moins dix minutes après le seuil critique de syncope. Il est scientifiquement impossible qu'il ait pu accomplir cela seul jusqu'au bout tout en restant conscient.",
                                doctorNote: "NOTE PERSONNELLE : Ce n'est plus de la folie. C'est une contagion psychique. Ils cherchent à enlever la chair pour 'laisser sortir la lumière'. Je dois cacher mes scalpels."
                            }
                        ]
                    }
                ]
            },
//============================================================================
// SECTEUR 02 - HANGAR-02
//============================================================================
            hangar02: {
                title: "HANGAR-02",
                description: "Le hangar est silencieux, calme et semble en ordre.\n\nLe navire est sanglé au sol sur la partie droite, avec un arrimage improvisé mais solide. Une passerelle court au-dessus de la zone et dessert plusieurs prompteurs et commandes locales. À gauche, une cloison mobile délimite le stockage technique. Plusieurs petits sas donnent accès au hangar, dont le sas logistique de la ZONE D.",
                zones: [
                    {
                        id: "hangar_a",
                        code: "ZONE A",
                        name: "Le vaisseau UCS-Horizon",
                        desc: "Il y a la place pour deux vaisseaux de cette taille, mais celui-ci est seul dans le hangar.\n\nDEPUIS L'EXTÉRIEUR\n- Sas inférieur découpé au plasma.\n- Métal replié vers l'intérieur : c'est clairement le point d'entrée de l'équipe de fret.\n\nOBSERVATION\n- Sas non étanche.\n- Joint à remplacer.\n- Câble électrique sectionné.\n- Trace de liquide séché sous le navire, probablement laissée lorsque le givre a dégelé.\n\nÀ L'INTÉRIEUR\nARRIÈRE : compartiments médicaux ouverts et vides, rations disparues, caisses laissées ouvertes et outils mécaniques manquants.\nAVANT : diagnostic moteur fonctionnel. Les réserves sont basses mais stables et devront être rechargées.",
                        lootGroups: LOOT_GROUPS.hangar_a,
                        reports: [
                            {
                                id: "rep_hangar_a_1",
                                code: "TECH-H02-01",
                                title: "Diagnostic technique du vaisseau",
                                author: "Terminal de maintenance du HANGAR-02",
                                date: "ARCHIVES DE MAINTENANCE",
                                text: "DIAGNOSTIC MOTEUR : FONCTIONNEL\n\n- Réserves basses mais stables.\n- Rechargement recommandé avant tout départ.\n- Sas inférieur non étanche.\n- Joint à remplacer.\n- Câble électrique sectionné.\n\nLe système moteur répond aux commandes locales. Aucun défaut critique détecté sur le circuit de propulsion."
                            },
                            {
                                id: "rep_hangar_a_2",
                                code: "OBS-H02-02",
                                title: "Traces d'intrusion et de récupération",
                                author: "Système d'observation du hangar",
                                date: "ENREGISTREMENT PARTIEL",
                                text: "Le sas inférieur a été découpé au plasma depuis l'extérieur. Le métal a été replié vers l'intérieur.\n\nLa présence de liquide séché sous la coque correspond à un dégivrage après ouverture. Les compartiments médicaux et les réserves ont été vidés méthodiquement. Les outils mécaniques ont été retirés, sans signe de panique ou de lutte à l'intérieur du vaisseau."
                            }
                        ]
                    },
                    {
                        id: "hangar_b",
                        code: "ZONE B",
                        name: "Stockage technique",
                        desc: "Une cloison mobile sépare cette zone du reste du hangar. Elle semble ancienne, mais le matériel porte les marques d'une utilisation récente : tâches au sol, traces de chariot, vis éparses et caisses ouvertes. Le désordre est celui d'un travail précipité, pas celui d'une fuite ou d'une panique.\n\nDe hauts rayonnages métalliques occupent la pièce. Des chariots techniques sont abandonnés près des établis, au milieu de bacs de quincaillerie, de rabiots et d'un rack de tôles et de matières premières.",
                        lootGroups: LOOT_GROUPS.hangar_b,
                        reports: [
                            {
                                id: "rep_hangar_b_1",
                                code: "OBS-H02-03",
                                title: "État du stockage technique",
                                author: "Système d'observation du hangar",
                                date: "DERNIÈRES ACTIVITÉS : RÉCENTES",
                                text: "Les traces de chariot et les vis au sol montrent que le stockage a servi dans les derniers jours. Les caisses ont été ouvertes par sélection.\n\nAucune trace de lutte, de fouille désordonnée ou d'abandon précipité. Le matériel semble avoir été prélevé pour des réparations ou une récupération technique."
                            }
                        ]
                    },
                    {
                        id: "hangar_c",
                        code: "ZONE C",
                        name: "Passerelles supérieures",
                        desc: "Des passerelles métalliques grillagées courent juste au-dessus des têtes et offrent une vue plongeante sur le hangar et le vaisseau. L'éclairage est partiel, avec des zones d'ombre naturelles.\n\nLa passerelle donne accès aux capteurs du hangar, aux panneaux de commande locaux et à d'anciens terminaux de maintenance. Quelques prompteurs sont encore en place, probablement utilisés pour gérer les lumières et l'activité générale du hangar.",
                        lootGroups: LOOT_GROUPS.hangar_c,
                        reports: [
                            {
                                id: "rep_hangar_c_1",
                                code: "SYS-H02-04",
                                title: "Réseau de supervision du hangar",
                                author: "Terminal de maintenance supérieur",
                                date: "SIGNAL LOCAL STABLE",
                                text: "Les capteurs du hangar répondent de façon intermittente. Les commandes d'éclairage et les panneaux locaux restent accessibles depuis la passerelle.\n\nAucune alarme active. Les prompteurs sont alimentés, mais plusieurs affichages sont incomplets."
                            }
                        ]
                    },
                    {
                        id: "hangar_d",
                        code: "ZONE D",
                        name: "Sas logistique et atelier de récupération",
                        desc: "Une porte est entrouverte et coincée, probablement à cause de la vieillesse du site. Des traces de passages répétés, des éraflures anciennes et récentes marquent le seuil.\n\nÀ l'intérieur, l'air sent l'huile, la graisse de moteur et un peu la transpiration. Le chauffage tourne trop fort. La ventilation grince et siffle, diffusant une chaleur lourde mêlée à l'odeur du métal. Une vieille odeur de café reste accrochée aux surfaces et aux cinq sièges raccommodés.\n\nUne table de travail branlante contient des tiroirs de pièces détachées. Des établis graisseux sont couverts d'outils suspendus ou posés sur le métal. La lumière crue vient de lampes suspendues, dont certaines oscillent légèrement.",
                        lootGroups: LOOT_GROUPS.hangar_d,
                        reports: [
                            {
                                id: "rep_hangar_d_1",
                                code: "NOTE-H02-05",
                                title: "Note interne - Équipe technique de récupération",
                                author: "Jarek Havel, chef technique - Fret minier Lysithea",
                                date: "À L'ATTENTION DU CONSEIL ET DES INTENDANTS",
                                text: "NOTE INTERNE - ÉQUIPE TECHNIQUE DE RÉCUPÉRATION\n\nJe rédige cette note parce que personne d'autre ne le fera. Parce que les chiffres ne suffisent pas quand ce sont des visages que l'on enterre.\n\nL'équipe de récupération envoyée sur le vaisseau à la dérive a mené sa mission à terme. Le vaisseau de sauvetage amarré sur la partie supérieure a été ramené. Impossible d'entamer la coque du plus gros navire portant le nom UCS-Horizon.\n\nL'équipage, lui, est resté là-bas... ou presque.\n\nIls étaient cinq à partir.\n\nMorozov, manutentionnaire et soudeur principal, est mort lors des opérations de récupération. Un accident grave. Une erreur de calcul sans doute, une pièce qui a cédé dans le vaisseau de sauvetage. Il n'a pas souffert longtemps. C'est tout ce que je peux écrire sans mentir.\n\nSoren, Martal et Lucien se sont donné la mort pendant le voyage de retour. Je n'entrerai pas dans les détails, mais ils étaient clairement dans un état de déroute. Nous travaillons ensemble depuis assez longtemps pour que je sache reconnaître la honte dans leurs silences. Je pense qu'ils n'ont pas supporté ce qu'ils avaient vu durant l'accident... ou ce qu'ils n'avaient pas vu assez tôt.\n\nEthan Cole, le pilote, est en vie. Il a ramené seul le Lysithea à la station. Il pilotait pendant que les autres se donnaient la mort derrière lui. Il l'ignore encore, parfois. Parfois il le sait trop bien. Il ne dort plus. Il murmure des prénoms à voix basse.\n\nJe demande officiellement l'ouverture d'une cagnotte communautaire pour les familles de Morozov, Kallio, Weiss et Perrin. Ils n'étaient pas des héros. Ils étaient présents chaque jour. Ils faisaient leur travail. Ils méritent que nous portions une part de ce qu'ils ont laissé derrière eux.\n\nNotre dogme nous enseigne que certains fardeaux ne sont pas faits pour être compris, seulement partagés. Que le silence peut être une prière. Et que détourner le regard n'efface rien.\n\nQue ceux qui sont morts reposent dans le froid qu'ils connaissaient. Que ceux qui vivent encore trouvent la force de rester droits.\n\nJarek Havel\nChef technique - Lysithea"
                            }
                        ]
                    }
                ]
            },
//============================================================================
// SECTEUR 03 - QG DE LA SECURITE
//============================================================================
            qg_securite: {
                title: "SECTEUR 03 - QG DE LA SECURITE",
                description: "L'air est plus lourd ici. Ca sent la poussiere d'acier, le cablage brule et le metal froid.\n\nLe couloir menant au poste de securite est desert. Il parait presque normal au milieu du chaos de la station.\n\nAu centre du couloir, sur votre gauche, une porte blindee a taille humaine mene au poste. Celle-ci est fermee, mais meme a distance, on voit que d'autres ont tente de l'ouvrir par la force.\n\nFace a vous, au bout du couloir, un sas mene a une autre section. Le couloir est tout aussi frais que le reste de la station, mais une etrange odeur d'acier chauffe impregne encore l'air ambiant.",
                zones: [
                    {
                        id: "qg_a",
                        code: "ZONE A",
                        name: "Le Sas de liaison",
                        desc: "En vous approchant, vos craintes se confirment : d'autres ont eu la meme idee. Mais a premiere vue, toutes les tentatives pour l'ouvrir ont ete des echecs.\n\nLa porte comporte des traces de brulures. Au sol, une trace noire est jonchee de debris de verre. La porte a ete griffee, comme si certains avaient tente de taper dessus avec des barres de fer. Mais elle est solide, et meme les quelques traces de meuleuse semblent ne pas en avoir venu a bout.",
                        door: { name: "qg_a_door", difficulty: 2 },
                        lootGroups: LOOT_GROUPS.qg_a,
                        reports: []
                    },
                    {
                        id: "qg_b",
                        code: "ZONE B",
                        name: "Couloir d'accueil des reclamations",
                        parentZone: "qg_a",
                        accessRequires: "qg_a",
                        desc: "Un couloir rectiligne de facilement 20 metres de long. De chaque cote, de grandes fenetres sans tain blindees bordent les murs.\n\nSur la gauche, on distingue nettement deux guichets de presentation pour les reclamations. Des haut-parleurs fixes sont suspendus au plafond pour diffuser des annonces.\n\nAu plafond, une camera pointe vers l'entree, mais son voyant de fonctionnement est eteint.\n\nAu fond du couloir se dresse une porte solide, non blindee, equipee d'une petite lucarne coulissante actuellement fermee.\n\nAccessible une fois la porte blindee deverrouillee ou forcee.",
                        door: { name: "qg_b_door", difficulty: 2 },
                        lootGroups: LOOT_GROUPS.qg_b,
                        reports: []
                    },
                    {
                        id: "qg_c",
                        code: "ZONE C",
                        name: "Le Carrefour d'acces",
                        parentZone: "qg_b",
                        accessRequires: "qg_b",
                        desc: "Derriere la porte du fond se trouve une intersection tres etriquee. Quatre directions s'offrent a vous :\n\nA droite : Porte notee Armurerie et Salle de repos\n\nEn face : Porte notee Cellules\n\nA gauche : Porte notee Administratif",
                        lootGroups: LOOT_GROUPS.qg_c,
                        reports: []
                    },
                    {
                        id: "qg_d",
                        code: "ZONE D",
                        name: "Les Cellules",
                        parentZone: "qg_c",
                        accessRequires: "qg_c",
                        desc: "Un alignement sombre de 24 cellules tres etroites. Chacune est concue pour contenir au maximum 2 personnes assises.\n\nL'etat general est assez moyen. Toutes les grilles sont grandes ouvertes.\n\nL'endroit semble abandonne a la hate : un trousseau de cles pend encore sur la serrure de l'une des grilles.",
                        lootGroups: LOOT_GROUPS.qg_d,
                        reports: []
                    },
                    {
                        id: "qg_e",
                        code: "ZONE E",
                        name: "Pole Administratif",
                        parentZone: "qg_c",
                        accessRequires: "qg_c",
                        desc: "Un espace mal range. Il y a clairement eu du mouvement ici, mais pas d'attaque ni de debordement violent. On sent nettement que les agents ont simplement commence a negliger les taches basiques de rangement au fur et a mesure que la crise s'intensifiait.\n\nDes tasses trainent, des feuilles volantes jonchent le sol.\n\nPlusieurs ordinateurs sont encore allumes. La plupart sont verrouilles par mot de passe, mais l'un d'eux a ete laisse ouvert en plein sur la page d'un dossier confidentiel.",
                        lootGroups: LOOT_GROUPS.qg_e,
                        reports: []
                    },
                    {
                        id: "qg_f",
                        code: "ZONE F",
                        name: "Armurerie et Salle de repos",
                        parentZone: "qg_c",
                        accessRequires: "qg_c",
                        desc: "Sur la droite, une rangee de chaises et des postes informatiques en piteux etat. Le corps d'un agent de securite est affale sur une chaise, le visage ecrase contre le bureau.\n\nSur la gauche de la piece se dresse une cage d'armes en grillage renforce.",
                        lootGroups: LOOT_GROUPS.qg_f,
                        reports: []
                    }
                ]
            },
//============================================================================
// SECTEUR 04 - ANNEAU CENTRAL : LE PANTHEON
//============================================================================
            pantheon: {
                title: "SECTEUR 04 - ANNEAU CENTRAL : LE PANTHÉON",
                description: "L'air est étrangement doux, presque tiède, mais saturé d'un parfum artificiel et tenace d'agrumes qui tente vainement de masquer la moisissure et la chair décomposée.\n\nTout semble suspendu dans un luxe figé. Les baies vitrées factices de tout le secteur affichent le même souvenir : 12 mai 2084, 14 h 30, ciel dégagé sur Genève. Quelqu'un a synchronisé les panoramas avant de mourir ou de s'enfermer.",
                zones: [
                    {
                        id: "pantheon_a",
                        hub: true,
                        code: "ZONE A",
                        name: "La Galerie des Panoramas — couloir principal",
                        desc: "Le couloir est large et moquetté, tout en longueur, avec une légère courbe qui suit la forme de l'anneau. Il est bordé d'écrans muraux géants. Certains affichent encore un sous-bois verdoyant ou un coucher de soleil sur l'océan terrestre, régulièrement coupés par du grésillement statique.\n\nDe grands conteneurs de voyage en matériaux nobles jonchent le passage. Un panneau dynamique diffuse en boucle un message d'urgence du Conseil, désormais muet. À droite, un panneau mural factice arraché laisse voir des câbles sous tension qui étincellent faiblement et projettent des ombres étirées.\n\nLes portes qui donnent sur ce couloir sont ouvertes. Des valises abandonnées et des symboles du Conseil « libre », peints à la hâte sur plusieurs portes, témoignent de la panique. Au fond de la courbe, la porte 1408 est grande ouverte, et l'air qui s'en échappe sent la cire d'abeille.",
                        lootGroups: LOOT_GROUPS.pantheon_panorama,
                        reports: [
                            {
                                id: "pantheon_sync",
                                code: "OBS-PAN-01",
                                title: "Synchronisation des panoramas",
                                author: "Système de contrôle environnemental",
                                date: "12/05/2084 - 14:30",
                                text: "Toutes les baies vitrées factices du secteur ont été réglées manuellement sur la même date et heure de simulation : 12 mai 2084, 14 h 30, ciel dégagé sur Genève. La modification a été effectuée depuis le panneau central, quelques minutes avant la coupure du réseau."
                            }
                        ]
                    },
                    {
                        id: "pantheon_b_vane",
                        code: "ZONE B",
                        name: "Résidence du Dr. Vane — pôle scientifique et médical",
                        parentZone: "pantheon_a",
                        accessRequires: "pantheon_a",
                        desc: "Un appartement spacieux au désordre méthodique. Des étagères de livres papier, luxe inestimable sur la station, ont été renversées pour former une barricade derrière la porte blindée. Celle-ci a cédé ; l'accès n'est plus verrouillé.\n\nAu centre du salon, la simulation de la Terre clignote sous un faux ciel étoilé. Un bureau en polymère massif est couvert de dossiers médicaux frappés du sceau de la direction de la station.",
                        lootGroups: LOOT_GROUPS.pantheon_vane,
                        reports: [
                            {
                                id: "pantheon_vane_audio",
                                code: "AUDIO-PAN-02",
                                title: "Enregistrement du Dr. Vane",
                                author: "Dr. Vane",
                                date: "Fichier récupéré sur le bureau",
                                text: "« Le Conseil exige la mise en quarantaine stricte des bas niveaux, mais réquisitionne les meilleures doses de traitement pour l'élite du Panthéon. Ils appellent ça une mesure sanitaire. J'appelle ça un tri. »"
                            }
                        ]
                    },
                    {
                        id: "pantheon_c_vance",
                        code: "ZONE C",
                        name: "Penthouse d'Oren Vance — entrepreneur et marchand",
                        parentZone: "pantheon_a",
                        accessRequires: "pantheon_a",
                        door: { name: "pantheon_vance_door", difficulty: 2 },
                        desc: "Un sas privé protège ce penthouse opulent : faux parquet, bar garni de liqueurs synthétiques rares et mobilier design. L'accès est verrouillé.\n\nDeux corps en tenue de soirée sont installés dans des fauteuils face au panorama terrestre factice. Une bouteille entamée et deux verres renversés portent encore les traces d'un fluide noirâtre. Ils ont préféré choisir leur fin plutôt que d'affronter ce qui grattait à leur porte.",
                        lootGroups: LOOT_GROUPS.pantheon_vance,
                        reports: []
                    },
                    {
                        id: "pantheon_c_lounge",
                        code: "ZONE C-1",
                        name: "Salon panoramique du penthouse",
                        parentZone: "pantheon_c_vance",
                        accessRequires: "pantheon_c_vance",
                        desc: "Le salon s'ouvre sur une baie vitrée simulant Genève sous le soleil. Les deux fauteuils font face à l'image, tournant le dos à la porte. Une marque de main noire macule l'accoudoir du plus proche.",
                        lootGroups: [{ id: "main", title: "OBJETS DU SALON", items: [] }],
                        reports: []
                    },
                    {
                        id: "pantheon_c_study",
                        code: "ZONE C-2",
                        name: "Bureau et coffre mural",
                        parentZone: "pantheon_c_vance",
                        accessRequires: "pantheon_c_vance",
                        desc: "Le bureau de Vance est presque intact. Un coffre mural encastré est dissimulé derrière un panneau décoratif ; il nécessite un test de piratage ou la clé personnelle de Vance. Le contenu n'est récupérable qu'après ouverture du coffre.",
                        lootGroups: LOOT_GROUPS.pantheon_vance_study,
                        reports: []
                    },
                    {
                        id: "pantheon_d",
                        code: "ZONE D",
                        name: "Salon commun et sanctuaire du Conseil",
                        parentZone: "pantheon_a",
                        accessRequires: "pantheon_a",
                        desc: "Une vaste rotonde au plafond surélevé servait de lieu de rassemblement aux notables. Un autel de fortune, dressé sous les bannières du Conseil « libre », est couvert de bougies consumées et de symboles idéologiques.\n\nLes résidents restants venaient ici prier ou attendre des instructions qui ne sont jamais venues. Des traînées de sang séché partent du centre et remontent vers les conduits de ventilation. L'entrée du salon est grande ouverte.",
                        lootGroups: LOOT_GROUPS.pantheon_sanctuary,
                        reports: []
                    },
                    {
                        id: "pantheon_f_burned",
                        code: "ZONE E",
                        parentZone: "pantheon_a",
                        accessRequires: "pantheon_a",
                        name: "Résidence Delacroix — appartement incendié",
                        desc: "La porte, symbole du Conseil peint à la hâte, pend sur un seul gond. Le salon a été incendié : le faux parquet a gondolé, les canapés ne sont plus que des carcasses et les baies factices, fondues, affichent encore une image figée de Genève à travers la suie. Des traces de lutte mènent à la porte : les résidents ont tenté de repousser la foule avant de fuir.\n\nLe logement a été pillé avant d'être brûlé. Il ne reste rien d'utile.",
                        lootGroups: LOOT_GROUPS.pantheon_empty,
                        reports: []
                    },
                    {
                        id: "pantheon_g_barricade",
                        code: "ZONE F",
                        parentZone: "pantheon_a",
                        accessRequires: "pantheon_a",
                        door: { name: "pantheon_barricade_door", difficulty: 1 },
                        name: "Résidence Ashford — appartement barricadé",
                        desc: "La porte est verrouillée de l'intérieur, doublée d'une armoire en bois véritable poussée contre le battant. Des griffures profondes marquent la peinture, preuve qu'on a tenté de la forcer. Le Conseil « libre » est peint en lettres rouges au-dessus du judas.",
                        lootGroups: LOOT_GROUPS.pantheon_ashford,
                        reports: []
                    },
//----------------------------------------------------------------------------
// APPARTEMENT 1408 - PIECE SCELLEE (EASTER EGG) : voir SEALED_SUITES en haut du fichier
//----------------------------------------------------------------------------
                    {
                        id: "pantheon_h_1408",
                        code: "ZONE H",
                        suite: "suite_1408",
                        parentZone: "pantheon_a",
                        accessRequires: "pantheon_a",
                        name: "Appartement 1408 — La Suite Belle Époque : le Grand Salon",
                        desc: "La porte est grande ouverte. Sur le seuil, l'air est curieusement plus doux, presque parfumé à la cire d'abeille et au vieux bois. Le numéro détonne dans ce couloir : comme si cette porte avait été remplacée ou réattribuée par le passé.\n\nDès que les joueurs franchissent l'entrée, ils ont 2 minutes pour entrer et sortir librement. Passé ce délai, la porte se referme d'un coup sec et ils ne peuvent plus retourner dans le couloir. Le panneau de contrôle extérieur clignote au rouge : « ERREUR SYSTÈME — ŒUVRE EN COURS ».\n\nLe choc visuel est total. La structure métallique de la station reste devinable par moments (un rivet apparent, une canalisation technique camouflée derrière une tapisserie), mais tout a été maquillé en somptueuse chambre de la Belle Époque : fastueux, magnifique, d'un luxe insolent et anachronique, entièrement corrompu par la mort.\n\nLe salon est un fumoir bourgeois aux moulures dorées factices, tapissé de velours pourpre lourd. Un tapis d'Orient étouffe les bruits de pas. Des fauteuils capitonnés entourent une table basse en acajou. Au centre trône un projecteur holographique dissimulé dans une vasque en laiton ciselé, couplé à un autel morbide fait de bougies consumées et de suie noire sur le tapis.\n\nÉLÉMENTS DU DÉCOR (NON EMPORTABLES) :\n- Le tableau holographique 3D diffuse en boucle des suicides et des mutilations d'une précision chirurgicale. Les victimes affichent une étrange lucidité résignée.\n- Des projections secondaires montrent un homme aux mouvements lents et nonchalants qui ramasse les corps pour les emporter vers les conduits.\n- Des candélabres en argent massif brûlent d'une flamme anormalement bleutée.\n\nUn badge maître est posé en évidence sur l'autel. Il est noirci par la suie, fissuré, sa puce est enrobée de cire : il ne déverrouillera rien tel quel. Le lecteur de la porte, à côté de l'entrée, attend d'être réparé.\n\nTENSION : tant que les holobandes tournent, rester dans la suite fait monter la Tension des personnages. Le MJ ne justifie rien.",
                        lootGroups: LOOT_GROUPS.suite_salon,
                        reports: [
                            {
                                id: "suite_plaque",
                                code: "OBS-PAN-03",
                                title: "La plaque de l'autel",
                                author: "Observation des lieux",
                                date: "Gravée dans le laiton de la vasque",
                                text: "Une inscription en lettres anglaises est gravée sur le bord de la vasque :\n\n« DE LA BOUCHE À LA PEAU »\n\nQuatre pièces sont ainsi nommées en creux. Le lecteur de la porte, lui, réclame un code à quatre chiffres. Le MJ ne dit pas dans quel ordre les lire."
                            },
                            {
                                id: "suite_lecteur",
                                code: "OBS-PAN-04",
                                title: "Le lecteur de la porte",
                                author: "Écran de contrôle",
                                date: "Après la fermeture",
                                text: "[ERREUR 408 : PROTOCOLE D'ISOLATION ACTIVE]\n[ŒUVRE EN COURS — SORTIE SUSPENDUE]\n[REQUIERT : BADGE MAÎTRE, ÉTAT NOMINAL, CODE DE LA SUITE]\n\nUn rectangle de métal nu est encastré sous l'écran, là où l'on glisse le badge."
                            },
                            {
                                id: "suite_panneau",
                                code: "OBS-PAN-05",
                                title: "Le panneau de la porte",
                                author: "Observation des lieux",
                                date: "En sortant de la suite",
                                text: "En sortant, le panneau numérique de la porte n'affiche plus « 1408 » mais « Erreur système - Secteur non répertorié ».\n\nSi quelqu'un regardait par le judas de l'intérieur avant d'ouvrir, il ne verrait pas le couloir de la station, mais un vide infini ou un mur de briques froides."
                            }
                        ]
                    },
                    {
                        id: "pantheon_h_kitchen",
                        code: "ZONE H-2",
                        suite: "suite_1408",
                        parentZone: "pantheon_h_1408",
                        accessRequires: "pantheon_h_1408",
                        name: "Suite 1408 — La Cuisine (la Gourmandise brute)",
                        desc: "Une double porte coulissante en bois précieux ouvre sur un garde-manger de grand domaine bourgeois. L'air y est lourd, écœurant, acidulé par la pourriture. Le mobilier en chêne ciré contraste avec la saleté organique ; les plans de travail en marbre blanc disparaissent sous les victuailles avariées. C'est la gourmandise compulsive et destructrice.\n\nÉLÉMENTS DU DÉCOR (NON EMPORTABLES) :\n- Des montagnes de denrées de luxe déballées, moisies, qui suintent sur le mobilier.\n- Un grand réfrigérateur de style rétro, grand ouvert sur des étagères désespérément vides.\n- Dans le bac à ordures en zinc, des flaques de vomi séché témoignent des excès et du rejet.\n\nSur la grande table, six couverts sont dressés. Un seul a servi.",
                        lootGroups: LOOT_GROUPS.suite_kitchen,
                        reports: [
                            {
                                id: "suite_kitchen_digit",
                                code: "OBS-PAN-06",
                                title: "La table dressée",
                                author: "Observation des lieux",
                                date: "Sur la nappe brodée",
                                text: "Six couverts sont dressés autour de la table. Un seul a servi, et il porte la trace de dents. Le chiffre qui s'impose ici est le 6."
                            }
                        ]
                    },
                    {
                        id: "pantheon_h_bedroom",
                        code: "ZONE H-3",
                        suite: "suite_1408",
                        parentZone: "pantheon_h_1408",
                        accessRequires: "pantheon_h_1408",
                        name: "Suite 1408 — La Chambre à coucher (l'Immobilité totale)",
                        desc: "Une suite nuptiale d'époque baignée de lumière feutrée et d'un silence absolu. C'est le paroxysme d'une vie aseptisée, rigide, figée dans un ordre parfait : le repos poussé à l'excès, l'immobilité de la vie figée avant la mort. Pas une once de poussière.\n\nÉLÉMENTS DU DÉCOR (NON EMPORTABLES) :\n- Le grand lit à baldaquin, aux rideaux de velours lourd, est bordé au cordeau, sans un pli sur les draps de soie blanche. Un seul oreiller porte l'empreinte creusée d'un visage, sans qu'aucun corps n'y repose.\n- Une commode ancienne en loupe d'orme porte un sablier géant dont le sable est totalement figé en haut.\n\nLa commode est à portée de main. Le sablier repose sur un socle d'horlogerie ancien. Le placard est dissimulé derrière les panneaux de boiserie, au fond de la pièce. Le boudoir ouvre sur la chambre.",
                        lootGroups: LOOT_GROUPS.suite_bedroom,
                        reports: [
                            {
                                id: "suite_bedroom_digit",
                                code: "OBS-PAN-07",
                                title: "L'oreiller creusé",
                                author: "Observation des lieux",
                                date: "Sur le lit",
                                text: "Un seul oreiller est creusé, sur un lit fait pour deux. L'empreinte n'a pas bougé de toute la vie du lit. Le chiffre qui s'impose ici est le 1."
                            }
                        ]
                    },
                    {
                        id: "pantheon_h_closet",
                        code: "ZONE H-4",
                        suite: "suite_1408",
                        parentZone: "pantheon_h_bedroom",
                        accessRequires: "pantheon_h_bedroom",
                        name: "Suite 1408 — Le Placard (le Corps mis à nu)",
                        desc: "Un grand placard mural aux portes entrouvertes, dissimulé derrière de superbes panneaux de boiserie sculptée. L'expression « avoir des squelettes dans son placard » y prend un sens littéral : c'est la mise à nu de quelqu'un qui a voulu nettoyer ses impuretés corporelles à outrance.\n\nÉLÉMENTS DU DÉCOR (NON EMPORTABLES) :\n- Un squelette humain complet, recroquevillé et parfaitement nettoyé de toute chair, repose sur une étagère parmi des cintres en bois vernis. Les os ont été astiqués au point de luire sous une faible lueur : l'œuvre minutieuse d'une propreté maladive imposée par autrui.",
                        lootGroups: LOOT_GROUPS.suite_closet,
                        reports: [
                            {
                                id: "suite_closet_digit",
                                code: "OBS-PAN-08",
                                title: "Les cintres de bois vernis",
                                author: "Observation des lieux",
                                date: "Sur la tringle",
                                text: "Neuf cintres de bois vernis sont alignés sur la tringle. Le squelette occupe le dixième emplacement, qui manque à l'appel. Le chiffre qui s'impose ici est le 9."
                            }
                        ]
                    },
                    {
                        id: "pantheon_h_bath",
                        code: "ZONE H-5",
                        suite: "suite_1408",
                        parentZone: "pantheon_h_1408",
                        accessRequires: "pantheon_h_1408",
                        name: "Suite 1408 — La Salle de bain (le Bain acide)",
                        desc: "Une salle de bain somptueuse, habillée de marbre vert et de robinetterie en cuivre étincelant. Un temple de la propreté dévoyé : la pièce sent le produit chimique lourd, le métal et la chloramine.\n\nÉLÉMENTS DU DÉCOR (NON EMPORTABLES) :\n- Une immense baignoire sur pieds en fonte émaillée, remplie d'un bouillon rouge sirupeux et fumant : un luxe d'eau chaude inouï pour une station spatiale en crise.\n- Les restes invisibles d'un suicide par immersion dans un bain acide qui a rongé lentement et méthodiquement la chair et les organes de la victime, transformant l'eau en résidu organique.",
                        lootGroups: LOOT_GROUPS.suite_bath,
                        reports: [
                            {
                                id: "suite_bath_digit",
                                code: "OBS-PAN-09",
                                title: "La robinetterie",
                                author: "Observation des lieux",
                                date: "Au bord de la baignoire",
                                text: "Quatre robinets de cuivre sont ouverts à fond au-dessus de la baignoire. Un seul coule encore. Le chiffre qui s'impose ici est le 4."
                            }
                        ]
                    },
                    {
                        id: "pantheon_h_boudoir",
                        code: "ZONE H-6",
                        suite: "suite_1408",
                        parentZone: "pantheon_h_bedroom",
                        accessRequires: "pantheon_h_bedroom",
                        name: "Suite 1408 — Le Boudoir (l'Apparence brisée)",
                        desc: "Adjacent à la chambre, un espace intime dédié au culte de l'image de soi : le reflet de la peur panique du vieillissement et du déclassement social de l'élite. Pour les riches du Panthéon, l'apparence était une armure ; ici, elle devient un piège narcissique.\n\nÉLÉMENTS DU DÉCOR (NON EMPORTABLES) :\n- Des miroirs anciens du sol au plafond, tous tachés, griffés ou recouverts d'une pellicule de sel et de cire, forment des phrases obsessionnelles tracées au doigt : « Toujours plus net », « On ne voit rien sous la peau ».\n- Au centre, une coiffeuse de style Empire. Sur la chaise, pas de corps, mais un masque mortuaire en résine transparente, moulé sur un visage qui porte les stigmates d'une chirurgie esthétique ratée.\n- Des dizaines de flacons de crèmes de luxe et de sérums de longévité, méthodiquement alignés, tous ouverts et périmés.",
                        lootGroups: LOOT_GROUPS.suite_boudoir,
                        reports: [
                            {
                                id: "suite_boudoir_mirror",
                                code: "OBS-PAN-10",
                                title: "Les phrases sur les miroirs",
                                author: "Observation des lieux",
                                date: "Tracées au doigt",
                                text: "« Toujours plus net. »\n« On ne voit rien sous la peau. »\n\nSous la dernière phrase, quelqu'un a griffé quatre fois le verre, de haut en bas, comme on compte des jours. Le MJ ne dit pas de quoi."
                            }
                        ]
                    },
                    {
                        id: "pantheon_e",
                        code: "ZONE G",
                        name: "Carrefour des résidences",
                        parentZone: "pantheon_a",
                        accessRequires: "pantheon_a",
                        desc: "Le couloir débouche sur un carrefour circulaire qui relie les résidences, le salon commun et les ascenseurs de l'anneau central. Les portes de liaison ne sont ni verrouillées ni barricadées ; seuls les appartements disposent de leurs propres accès sécurisés.",
                        lootGroups: [{ id: "main", title: "MATÉRIEL RÉCUPÉRABLE", items: [] }],
                        reports: []
                    }
                ]
            },
//============================================================================
// SECTEUR 05 - L'ANNEAU INTERMEDIAIRE : LES TERRASSES
//============================================================================
            terrasses: {
                title: "SECTEUR 05 - L'ANNEAU INTERMÉDIAIRE : LES TERRASSES",
                description: "L'air ici est plus sec, sentant la poussière de moquette et le renfermé. Autrefois, c'était le quartier résidentiel des fonctionnaires supérieurs, des commerçants prospères et des retraités aisés de la station.\n\nAujourd'hui, le silence y est lourd, seulement brisé par le bourdonnement lointain des conduits de ventilation. Les portes des appartements s'alignent le long d'un couloir de béton composite. Certaines sont grandes ouvertes, d'autres barricadées à la hâte. Des scellés de fortune et des écriteaux au feutre témoignent de la panique : « Zone sous surveillance du Conseil », « Ne frappez pas ».",
                zones: [
                    {
                        id: "terr_a",
                        hub: true,
                        code: "ZONE A",
                        name: "Le Couloir des Portes Mitoyennes",
                        desc: "Un long couloir qui s'incurve légèrement en suivant la forme de la station. Sur les murs, les affiches publicitaires pour des croisières stellaires ou des investissements sur la planète Terre sont lacérées. Au sol, des emballages de rations vides et quelques journaux de bord datés de la veille du confinement.\n\nUne odeur d'urine animale flotte discrètement près de la porte 402. Le couloir est libre d'accès ; les portes 402, 404, 406, 408 et 410 s'ouvrent sur lui.",
                        lootGroups: LOOT_GROUPS.terr_corridor,
                        reports: [
                            {
                                id: "terr_meal_note",
                                code: "NOTE-TER-01",
                                title: "Plateau de repas sur le palier",
                                author: "Inconnu",
                                date: "Il y a plusieurs semaines",
                                text: "Sur le palier entre l'appartement 404 de William et le 402 de Mme Gonzales, quelqu'un a déposé un plateau de repas intact avec un mot griffonné à la main :\n\n« Pour Milliam. Ne reste pas seul. »\n\nLe mot a été écrit il y a des semaines. Le repas s'est momifié sur place, totalement ignoré."
                            }
                        ]
                    },
                    {
                        id: "terr_b_gonzales",
                        code: "ZONE B",
                        name: "Appartement 402 — Chez Mme Gonzales (la commerçante retraitée)",
                        parentZone: "terr_a",
                        accessRequires: "terr_a",
                        desc: "Une porte entrouverte. L'appartement est surchargé de bibelots de pacotille, de souvenirs ramenés de diverses colonies et de napperons en dentelle synthétique. L'intérieur est étrangement net, bien que le désordre règne.\n\nAssise dans un fauteuil à bascule face à une porte de placard qu'elle s'obstine à fixer, Mme Gonzales est terrifiée, un peu sénile, mais vivante. Elle râle à voix basse sur le manque de savoir-vivre des autres résidents : « Ces jeunes qui ne respectent rien, même pas le couvre-feu du Conseil ! »\n\nÀ ses pieds, son petit chien Kiki, un vieux roquet de compagnie, aboie frénétiquement en direction d'une bouche d'aération dès que quelqu'un approche.\n\nINTERACTION : si les joueurs la rassurent, Mme Gonzales peut lâcher des informations précieuses (ou être très pénible). Elle sait que William, dans l'appartement d'en face, a des provisions, et que Milliam est parti précipitamment un soir sans son manteau.",
                        lootGroups: LOOT_GROUPS.terr_gonzales,
                        reports: []
                    },
                    {
                        id: "terr_c_william",
                        code: "ZONE C",
                        name: "Appartement 404 — Le Refuge de William (garde de la cité)",
                        parentZone: "terr_a",
                        accessRequires: "terr_a",
                        door: { name: "terr_william_door", difficulty: 2 },
                        desc: "La porte est verrouillée de l'intérieur, renforcée par une barre métallique transversale. Si les joueurs insistent ou se font reconnaître comme des humains non hostiles, une voix fatiguée mais ferme résonne à travers l'interphone :\n\n« Je ne bouge pas d'ici. Le Conseil a merdé, la station est foutue, mais moi j'ai de quoi tenir. Dégagez. »\n\nWilliam, garde de la cité, s'est retranché ici. Il a compris que sa hiérarchie l'avait abandonné. Il survit grâce à ses rations militaires stockées, mais la solitude commence à lui peser.\n\nINTERACTION : persuadé ou payé en nouvelles de l'extérieur ou en broutille, William peut entrouvrir la porte, donner des conseils de survie ou échanger du matériel. Son stock n'est accessible que par la négociation ou si un malheur lui arrive. Son arme de service est jalousement gardée : il ne la lâchera qu'à contrecœur.",
                        lootGroups: LOOT_GROUPS.terr_william,
                        reports: []
                    },
                    {
                        id: "terr_d_milliam",
                        code: "ZONE D",
                        name: "Appartement 408 — Le Logis de Milliam",
                        parentZone: "terr_a",
                        accessRequires: "terr_a",
                        desc: "Une porte fermée, mais déverrouillée. En entrant, l'atmosphère est glaciale.\n\nL'appartement est curieusement vide de toute présence humaine, mais Milliam n'est pas mort. On a l'impression qu'il est sorti faire une course rapide ou qu'il a dû fuir au beau milieu d'une action : le lit est défait, une tasse de café glacée et trouble repose sur la table, et ses effets importants (papiers d'identité, chaussures de marche principales) sont encore là. Pourtant, il ne semble plus habiter les lieux depuis un moment.\n\nSur la table de la cuisine, des messages incohérents ont été gravés au tournevis.",
                        lootGroups: LOOT_GROUPS.terr_milliam,
                        reports: [
                            {
                                id: "terr_milliam_list",
                                code: "NOTE-TER-02",
                                title: "Liste de noms rayés",
                                author: "Milliam (gravé sur la table)",
                                date: "Non daté",
                                text: "Une liste de noms rayés, un à un. À la fin, gravé plus profondément que le reste :\n\n« Ils ne viennent pas nous chercher. Ils montent tous vers le Centre. »"
                            }
                        ]
                    },
                    {
                        id: "terr_f_burned",
                        code: "ZONE E",
                        parentZone: "terr_a",
                        accessRequires: "terr_a",
                        name: "Appartement 406 — Le logement incendié",
                        desc: "La porte, couverte d'un écriteau au feutre « Ne frappez pas », est noircie et entrouverte. L'intérieur a entièrement brûlé : un départ de feu dans la cuisine a gagné le salon, où des meubles avaient été entassés pour former une barricade. Les murs sont couverts de suie et les placards ont été pillés avant l'incendie. Il ne reste que des cendres.",
                        lootGroups: LOOT_GROUPS.terr_empty,
                        reports: []
                    },
                    {
                        id: "terr_g_barricade",
                        code: "ZONE F",
                        parentZone: "terr_a",
                        accessRequires: "terr_a",
                        door: { name: "terr_410_door", difficulty: 1 },
                        name: "Appartement 410 — Le logement barricadé",
                        desc: "La porte est verrouillée de l'intérieur et renforcée par des planches clouées en croix. Un scellé de fortune du Conseil, collé à la hâte, porte la mention « Zone sous surveillance ». Aucun signe de vie.",
                        lootGroups: LOOT_GROUPS.terr_410,
                        reports: []
                    }
                ]
            },
//============================================================================
// SECTEUR 06 - LA PERIPHERIE : LA LISIERE
//============================================================================
            lisiere: {
                title: "SECTEUR 06 - LA PÉRIPHÉRIE : LA LISIÈRE",
                description: "L'air y est nettement plus froid, lourd et vicié. On est tout au bord de la coque externe de la station : les cloisons vibrent en permanence du bourdonnement grave des réacteurs de stabilisation, et l'isolation phonique est quasi inexistante.\n\nLes couloirs sont étroits, les portes d'alvéoles s'alignent comme des casiers. Pas de luxe, pas de moquette : du métal brut riveté. Des câbles pendent lamentablement du plafond arraché. C'est la zone où la panique s'est transformée en chaos sanglant dès les premiers jours.\n\nEn inspectant le sol, on remarque que les traces de pas dans la poussière s'arrêtent net au milieu du couloir. Personne n'est revenu habiter ici. Les pillards eux-mêmes ont déserté la zone, probablement poussés plus bas ou plus haut par la faim... ou par ce qui rôde désormais dans les conduits.",
                zones: [
                    {
                        id: "lis_corridor",
                        hub: true,
                        code: "ZONE A",
                        name: "Le Couloir des Alvéoles — couloir principal",
                        desc: "Un long couloir étroit en métal riveté, qui s'incurve légèrement en suivant la courbe de la coque : on n'en voit jamais le bout. Les portes d'alvéoles s'alignent des deux côtés comme des casiers, certaines arrachées, d'autres noircies par le feu. Des câbles pendent du plafond arraché et des matelas, des chaises et des tôles ont été entassés contre les parois : des barricades abandonnées, forcées ou jamais utilisées.\n\nLe sol grillagé est couvert de traces sombres, de vêtements piétinés et de bocaux brisés. Les cloisons vibrent du grondement grave des réacteurs de stabilisation. Les traces de pas dans la poussière s'arrêtent net au milieu du couloir. L'accès au couloir est libre.",
                        lootGroups: LOOT_GROUPS.lis_corridor,
                        reports: []
                    },
                    {
                        id: "lis_a",
                        code: "ZONE B",
                        parentZone: "lis_corridor",
                        accessRequires: "lis_corridor",
                        name: "Appartement 102 — Le pillage méthodique et la mort sans sommation",
                        desc: "La porte coulissante est enfoncée, tordue sur son rail ; l'accès est libre. L'appartement est absolument vidé de fond en comble : placards ouverts, matelas lacérés à la recherche de cachettes, câbles muraux arrachés pour récupérer le cuivre.\n\nAu centre de la pièce principale, face à la porte, un corps gît sur le grillage métallique du sol. Un résident, abattu sommairement d'une balle de gros calibre dans le dos ou la nuque, en plein vol ou alors qu'il tentait de protéger ses derniers biens. Le sang a séché en une mare sombre sur les plaques.\n\nÀ côté de sa main tendue, un sac de toile vide, retourné, éventré d'un coup de couteau. Les pillards ont pris ce qui brillait ou ce qui se mangeait, et l'ont liquidé pour une broutille.",
                        lootGroups: LOOT_GROUPS.lis_102,
                        reports: [
                            {
                                id: "lis_102_casings",
                                code: "OBS-LIS-01",
                                title: "Douilles près du corps",
                                author: "Observation des lieux",
                                date: "Quelques jours après les émeutes",
                                text: "Des douilles de pistolet de fabrication standard de la station gisent près du corps. Ce ne sont pas des monstres venus de l'extérieur qui l'ont tué, mais un autre résident ou un milicien armé pendant les émeutes."
                            }
                        ]
                    },
                    {
                        id: "lis_b",
                        code: "ZONE C",
                        parentZone: "lis_corridor",
                        accessRequires: "lis_corridor",
                        name: "Appartement 104 — La rafle désespérée",
                        desc: "Juste en face, la porte de cette alvéole est grande ouverte, battant doucement au rythme des courants d'air de la ventilation.\n\nIci aussi, tout a été pillé, sous un angle purement alimentaire et matériel : la cuisine miniature a été saccagée, les bocaux en verre sont brisés au sol et forment un tapis de tessons collants de confiture séchée et de poudre nutritive.\n\nLes habitants s'étaient barricadés avec tout ce qu'ils pouvaient (tables, casiers de rangement), mais la porte a fini par céder sous la force d'un groupe. Il ne reste strictement rien de valeur, pas même une miette.",
                        lootGroups: LOOT_GROUPS.lis_104,
                        reports: [
                            {
                                id: "lis_104_wall",
                                code: "OBS-LIS-02",
                                title: "Décompte au charbon de bois",
                                author: "Habitant inconnu",
                                date: "Quinze jours après le confinement",
                                text: "Sur un pan de mur encore intact, quelqu'un a griffonné au charbon de bois un décompte de jours barrés un à un. Il s'arrête brusquement au quinzième jour, suivi d'un mot géant :\n\n« ILS NOUS ONT OUBLIÉS »"
                            }
                        ]
                    },
                    {
                        id: "lis_d_note",
                        code: "ZONE D",
                        parentZone: "lis_corridor",
                        accessRequires: "lis_corridor",
                        name: "Appartement 106 — L'évacuation précipitée",
                        desc: "La porte est ouverte et le logement a été vidé à la hâte, pas pillé : les tiroirs sont renversés, les valises ouvertes, un manteau d'enfant abandonné sur le seuil. Le lit est défait, mais la table est encore dressée.\n\nSur la table de la pièce principale, bien en vue, une feuille de papier a été posée sous un verre. Elle est impossible à manquer.",
                        lootGroups: LOOT_GROUPS.lis_106,
                        reports: [
                            {
                                id: "lis_106_note",
                                code: "NOTE-LIS-03",
                                title: "Note laissée sur la table",
                                author: "Résident de l'appartement 106",
                                date: "Quelques jours après le début des suicides",
                                text: "« Les enfants de l'héritier ont trouvé une nouvelle voie. Les autres ne comprennent pas, mais ils m'ont ouvert les yeux. »"
                            }
                        ]
                    },
                    {
                        id: "lis_e_burned",
                        code: "ZONE E",
                        parentZone: "lis_corridor",
                        accessRequires: "lis_corridor",
                        name: "Appartement 108 — L'alvéole incendiée",
                        desc: "La porte a fondu dans son cadre. À l'intérieur, tout a brûlé : le mobilier n'est plus qu'un amas carbonisé, les cloisons sont noires de suie jusqu'au plafond et l'air sent le plastique fondu. Quelqu'un a mis le feu pour chasser ou effacer ce qui s'y trouvait. Il ne reste rien d'utilisable.",
                        lootGroups: LOOT_GROUPS.lis_empty,
                        reports: []
                    },
                    {
                        id: "lis_f_barricade",
                        code: "ZONE F",
                        parentZone: "lis_corridor",
                        accessRequires: "lis_corridor",
                        door: { name: "lis_110_door", difficulty: 1 },
                        name: "Appartement 110 — La barricade intacte",
                        desc: "Seule porte du couloir encore debout. Elle est verrouillée de l'intérieur et renforcée par un casier de rangement poussé derrière le battant. Aucun bruit ne filtre, mais la poussière devant le seuil n'a pas été effleurée depuis des semaines.",
                        lootGroups: LOOT_GROUPS.lis_110,
                        reports: []
                    }
                ]
            }
        };

    //============================================================================================
