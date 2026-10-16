        const LOOT_GROUPS = {
            inf_a: [
                {
                    id: "tools",
                    title: "SI RÉCUPÉRATION DES OUTILLAGES SUR LES PINCES",
                    items: [
                        "5x Scalpels automatiques (usagés / non stériles)",
                        "3x Pinces",
                        "18x Injecteurs (vides)",
                        "2x Scies osseuses compactes"
                    ]
                },
                {
                    id: "room",
                    title: "SI FOUILLE DE LA SALLE DE SOINS PRINCIPALE",
                    items: [
                        "2x Injecteurs d'adrénaline -2 Tension (2 utilisations max)",
                        "1x Kit de pansements synthétiques sous vide",
                        "1x Analgésiques lourds -4 Tension (effets secondaires)",
                        "1x Antalgiques puissants",
                        "15x Cartouches de sérum physiologique",
                        "1x Stimulants (-2 Tension)",
                        "2x Patchs thermiques médicaux"
                    ]
                }
            ],
            inf_b: [
                {
                    id: "main",
                    title: "MATÉRIEL RÉCUPÉRABLE",
                    items: [
                        "1x Scalpel laser de précision (Batterie 45%)",
                        "3x Doseurs d'Analgésique puissant (Morph-Synth)",
                        "1x Défibrillateur portatif haute capacité",
                        "2x Combinaisons étanches de bloc opératoire (Taille L)"
                    ]
                }
            ],
            inf_c: [
                {
                    id: "main",
                    title: "MATÉRIEL RÉCUPÉRABLE",
                    items: [
                        "1x Antalgiques puissants",
                        "2x Morphiniques (permet d’endormir)",
                        "2x Outils chirurgicaux portatifs",
                        "10x Sprays cryogéniques médicaux",
                        "30x Couvertures thermiques"
                    ]
                }
            ],
            inf_d: [
                {
                    id: "main",
                    title: "MATÉRIEL RÉCUPÉRABLE",
                    items: [
                        "1x Disque dur crypté d'archives médicales de la station",
                        "1x Injecteur universel d'Antidote expérimental (1 dose)",
                        "1x Carnet de notes personnelles du Dr. Becker",
                        "100x Crédits réseau sous forme de puces magnétiques"
                    ]
                }
            ],
            hangar_a: [
                {
                    id: "observation",
                    title: "OBSERVATION DES LIEUX",
                    collectible: false,
                    items: [
                        "Sas inférieur non étanche",
                        "Joint du sas à remplacer",
                        "Câble électrique sectionné",
                        "Trace de liquide séché sous le navire",
                        "Compartiments médicaux ouverts et vides",
                        "Rations disparues et caisses ouvertes",
                        "Outils mécaniques manquants",
                        "Diagnostic moteur fonctionnel",
                        "Réserves basses mais stables : rechargement nécessaire"
                    ]
                }
            ],
            hangar_b: [
                {
                    id: "materials",
                    title: "MATIÈRES PREMIÈRES ET CONSOMMABLES",
                    items: [
                        "Plaques de tôle de différentes tailles, imparfaites",
                        "Mousse isolante thermique neuve ou déjà utilisée",
                        "Câbles haute résistance, certains sur rouleau",
                        "Câblage et boutons divers en vrac",
                        "Connecteurs universels électriques",
                        "Tuyaux de diverses tailles",
                        "Bonbonnes de gaz de 25 à 50 kg",
                        "Graisse en pot ou pulvérisateur",
                        "Huile mécanique",
                        "Liquide de refroidissement",
                        "Bidon de décape-peinture",
                        "Bandes de renfort composite",
                        "Résine de colmatage thermique",
                        "Câbles de traction manuels avec cliquets",
                        "Sangles",
                        "Capteurs portables défectueux : chaleur et pression"
                    ]
                },
                {
                    id: "tools",
                    title: "OUTILS ET ÉQUIPEMENTS",
                    items: [
                        "Vieux poste à souder manuel, capricieux mais utilisable",
                        "Pinces",
                        "Clés",
                        "Torche à souder",
                        "Riveteuse électrique portative",
                        "Découpeuse à disque"
                    ]
                }
            ],
            hangar_c: [
                {
                    id: "main",
                    title: "MATÉRIEL RÉCUPÉRABLE",
                    items: [
                        "Accès aux capteurs du hangar",
                        "Panneaux de commande locaux",
                        "Anciens terminaux de maintenance",
                        "Prompteurs de supervision encore installés"
                    ]
                }
            ],
            hangar_d: [
                {
                    id: "main",
                    title: "MATÉRIEL RÉCUPÉRABLE",
                    items: [
                        "10x Couvertures thermiques",
                        "Batteries portables",
                        "4x Vieux systèmes de maintien en vie avec masque respiratoire",
                        "4x Harnais",
                        "10x Balises de localisation, portée 200 m",
                        "2x Détecteurs de balise",
                        "4x Combinaisons étanches d'entretien",
                        "Injecteurs d'adrénaline - Tension, 2 utilisations maximum",
                        "Analgésiques lourds, avec effets secondaires",
                        "1x Antiseptiques industriels",
                        "2x Attelles modulaires",
                        "1x Scanner vital ancien, lent et imprécis"
                    ]
                }
            ],
            qg_a: [
                {
                    id: "main",
                    title: "MATÉRIEL RÉCUPÉRABLE",
                    items: [
                        "1x Disque de meuleuse portative",
                        "1x Briquet a essence en bon etat",
                        "Détecteur de mouvement",
                        "Sangle détecteur de mouvement",
                        "Batterie DM18V"
                    ]
                }
            ],
            qg_b: [
                { id: "main", title: "MATÉRIEL RÉCUPÉRABLE", items: [] }
            ],
            qg_c: [
                { id: "main", title: "MATÉRIEL RÉCUPÉRABLE", items: [] }
            ],
            qg_d: [
                {
                    id: "main",
                    title: "MATÉRIEL RÉCUPÉRABLE",
                    items: [
                        "1x Trousseau de cles du bloc carceral",
                        "1x Matraque rigide (oubliee sur un banc)"
                    ]
                }
            ],
            qg_e: [
                {
                    id: "main",
                    title: "MATÉRIEL RÉCUPÉRABLE",
                    items: [
                        "Indice informatique : consultation du dossier laisse ouvert (donnees sur un incident etouffe ou identite d'un detenu transfere en urgence)",
                        "1x Veste de service d'agent",
                        "1x Badge d'acces administratif (Niveau 1)"
                    ]
                }
            ],
            qg_f: [
                {
                    id: "main",
                    title: "MATÉRIEL RÉCUPÉRABLE",
                    items: [
                        { item: "drz32_rifle", min: 1, max: 1 },
                        { item: "drz32_magazine", min: 1, max: 2 },
                        { item: "ammo_box_cal5", min: 10, max: 60 },
                        { item: "drz32_sling", min: 1, max: 2 },
                        { item: "c17_pistol", min: 1, max: 1 },
                        { item: "c17_magazine", min: 1, max: 1 },
                        { item: "tactical_light", min: 1, max: 1 },
                        { item: "motion_detector", min: 1, max: 1 },
                        { item: "motion_detector_sling", min: 1, max: 1 },
                        { item: "dm18v_battery", min: 1, max: 2 },
                        { item: "ballistic_vest", min: 1, max: 2 }
                    ]
                }
            ]
        };
