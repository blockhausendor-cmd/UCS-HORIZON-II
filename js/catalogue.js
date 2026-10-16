        // Calibres fictifs : une arme, un chargeur et une boîte de munitions doivent partager le même.
        const CALIBERS = {
            cal3: "Cal.3",
            cal5: "Cal.5",
            cal7: "Cal.7",
            cal10: "Cal.10"
        };

        // Équipements sur arme : une arme déclare ses `tags` et ses emplacements (`slots`).
        // Un accessoire déclare `attachment: { slot, requiresTags?, items? }` :
        // il se monte si l'arme a l'emplacement, et porte tous les tags requis ou figure dans `items`.
        // Emplacements existants : "lampe", "sangle". Tags existants : arme, arme_a_feu, militaire, civil.
        const LOOT_CATALOG = {
            drz32_rifle: {
                name: "Fusil automatique court DRZ-32",
                description: "Fusil automatique compact de fabrication militaire, conçu pour les engagements rapprochés.",
                hands: 2,
                tags: ["arme", "arme_a_feu", "militaire"],
                slots: ["lampe", "sangle"],
                weapon: { magazine: "drz32_magazine", caliber: "cal5", useAmount: 3, useLabel: "Tirer (rafale de 3)" }
            },
            drz32_magazine: {
                name: "Chargeur pour fusil DRZ-32",
                description: "Chargeur de 30 coups à balles perforantes de qualité militaire pour DRZ-32.",
                content: { capacity: 30, unit: "cartouches" },
                ammo: { caliber: "cal5", magazine: true }
            },
            drz32_sling: {
                name: "Sangle pour fusil DRZ-32",
                description: "Sangle réglable destinée au transport et au maintien d'un fusil DRZ-32.",
                attachment: { slot: "sangle", items: ["drz32_rifle"] }
            },
            c17_pistol: {
                name: "Arme de poing C17Z",
                description: "Arme de poing compacte réglementaire, encore en état d'utilisation.",
                hands: 1,
                tags: ["arme", "arme_a_feu", "civil"],
                slots: ["lampe"],
                weapon: { magazine: "c17_magazine", caliber: "cal3", useAmount: 1, useLabel: "Tirer (1 cartouche)" }
            },
            c17_magazine: {
                name: "Chargeur pour arme C17Z",
                description: "Chargeur standard compatible avec l'arme de poing C17Z.",
                content: { capacity: 24, unit: "cartouches" },
                ammo: { caliber: "cal3", magazine: true }
            },
            ammo_box_cal3: {
                name: "Boîte de cartouches Cal.3",
                description: "Boîte de 30 cartouches de calibre 3, compatibles avec la plupart des armes de poing.",
                content: { capacity: 30, unit: "cartouches" },
                ammo: { caliber: "cal3", box: true }
            },
            ammo_box_cal5: {
                name: "Boîte de cartouches Cal.5",
                description: "Boîte de 60 cartouches de calibre 5.",
                content: { capacity: 60, unit: "cartouches" },
                ammo: { caliber: "cal5", box: true }
            },
            ammo_box_cal7: {
                name: "Boîte de cartouches Cal.7",
                description: "Boîte de 30 cartouches de calibre 7 compatible avec certain fusils ou arme de point de fort calibre.",
                content: { capacity: 30, unit: "cartouches" },
                ammo: { caliber: "cal7", box: true }
            },
            ammo_box_cal10: {
                name: "Boîte de cartouches Cal.10",
                description: "Boîte de 20 cartouches de calibre 10.",
                content: { capacity: 20, unit: "cartouches" },
                ammo: { caliber: "cal10", box: true }
            },
            tactical_light: {
                name: "Lampe tactique",
                description: "Lampe tactique à fixation universelle pour arme à feu, utile dans les zones privées d'éclairage. Celle peut être fixé sur certaine arme équipé de rail. Vous pouvez ainsi l'utiliser depuis une arme équipé sans utilsé de main pour la tenir",
                content: { capacity: 80, unit: "%" },
                hands: 1,
                lamp: { drainPerMinute: 1 },
                attachment: { slot: "lampe", requiresTags: ["arme_a_feu"] }
            },
            ballistic_vest: {
                name: "Gilet pare-éclats",
                description: "Protection souple conçue pour limiter les blessures dues aux éclats et aux débris."
            },
            automatic_scalpel: {
                name: "Scalpel automatique",
                description: "Instrument chirurgical motorisé, usagé et non stérile."
            },
            precision_laser_scalpel: {
                name: "Scalpel laser de précision",
                description: "Scalpel laser compact, avec une batterie restante à 45 %."
            },
            medical_forceps: {
                name: "Pince médicale",
                description: "Pince chirurgicale destinée aux manipulations médicales précises."
            },
            empty_injector: {
                name: "Injecteur vide",
                description: "Injecteur médical réutilisable, actuellement dépourvu de produit."
            },
            compact_bone_saw: {
                name: "Scie osseuse compacte",
                description: "Outil chirurgical motorisé conçu pour sectionner les os."
            },
            adrenaline_injector: {
                name: "Injecteur d'adrénaline",
                description: "Injecteur d'adrénaline à deux utilisations, au coût de -2 Tension."
            },
            synthetic_bandage_kit: {
                name: "Kit de pansements synthétiques sous vide",
                description: "Kit stérile de pansements synthétiques conditionnés sous vide."
            },
            heavy_analgesic: {
                name: "Analgésiques lourds",
                description: "Analgésiques puissants procurant -4 Tension, avec effets secondaires."
            },
            powerful_painkillers: {
                name: "Antalgiques puissants",
                description: "Médicaments antalgiques destinés aux douleurs sévères."
            },
            morph_synth_doser: {
                name: "Doseur d'analgésique puissant Morph-Synth",
                description: "Doseur individuel contenant un analgésique Morph-Synth puissant."
            },
            morphine: {
                name: "Morphinique",
                description: "Substance médicale permettant d'endormir un patient."
            },
            saline_cartridge: {
                name: "Cartouche de sérum physiologique",
                description: "Cartouche de sérum physiologique destinée aux perfusions."
            },
            stimulant: {
                name: "Stimulant",
                description: "Stimulant médical procurant -2 Tension."
            },
            thermal_patch: {
                name: "Patch thermique médical",
                description: "Patch chauffant à appliquer sur le corps pour favoriser le réchauffement."
            },
            medical_cryogenic_spray: {
                name: "Spray cryogénique médical",
                description: "Spray médical permettant de refroidir rapidement une zone ciblée."
            },
            portable_surgical_tools: {
                name: "Outil chirurgical portatif",
                description: "Instrument chirurgical compact conçu pour intervenir hors bloc médical."
            },
            portable_defibrillator: {
                name: "Défibrillateur portatif haute capacité",
                description: "Défibrillateur autonome destiné aux interventions d'urgence."
            },
            waterproof_surgical_suit: {
                name: "Combinaison étanche de bloc opératoire, taille L",
                description: "Combinaison étanche protégeant le personnel pendant les interventions médicales."
            },
            industrial_antiseptic: {
                name: "Antiseptique industriel",
                description: "Produit antiseptique à usage technique et médical."
            },
            modular_splint: {
                name: "Attelle modulaire",
                description: "Attelle adaptable pour immobiliser différents membres."
            },
            old_vital_scanner: {
                name: "Scanner vital ancien",
                description: "Scanner vital lent et imprécis, mais encore fonctionnel."
            },
            thermal_blanket: {
                name: "Couverture thermique",
                description: "Couverture isolante destinée à limiter les pertes de chaleur."
            },
            life_support_system: {
                name: "Système de maintien en vie avec masque respiratoire",
                description: "Système ancien de maintien en vie équipé d'un masque respiratoire."
            },
            maintenance_waterproof_suit: {
                name: "Combinaison étanche d'entretien",
                description: "Combinaison de maintenance protégeant de l'humidité et des projections."
            },
            harness: {
                name: "Harnais",
                description: "Harnais de sécurité destiné aux déplacements et interventions techniques."
            },
            location_beacon: {
                name: "Balise de localisation",
                description: "Balise portable avec une portée d'environ 200 mètres."
            },
            beacon_detector: {
                name: "Détecteur de balise",
                description: "Appareil permettant de repérer les balises de localisation proches."
            },
            portable_battery: {
                name: "Batterie portable",
                description: "Batterie autonome destinée à alimenter des équipements portatifs.",
                content: { capacity: 100, unit: "%" },
                recharger: true
            },
            manual_welder: {
                name: "Vieux poste à souder manuel",
                description: "Poste à souder capricieux, mais encore utilisable."
            },
            welding_torch: {
                name: "Torche à souder",
                description: "Torche portable destinée aux opérations de soudage et de chauffe."
            },
            electric_riveter: {
                name: "Riveteuse électrique portative",
                description: "Outil électrique compact destiné à fixer des rivets."
            },
            disc_cutter: {
                name: "Découpeuse à disque",
                description: "Outil de découpe portatif équipé d'un disque abrasif."
            },
            paint_strip_can: {
                name: "Bidon de décape-peinture",
                description: "Produit chimique destiné à retirer les couches de peinture et de revêtement."
            },
            assorted_pliers_keys: {
                name: "Pinces et clés diverses",
                description: "Ensemble hétéroclite d'outils manuels pour les réparations courantes."
            },
            metal_sheets: {
                name: "Plaques de tôle",
                description: "Plaques métalliques de tailles variées, parfois imparfaites."
            },
            thermal_insulation_foam: {
                name: "Mousse isolante thermique",
                description: "Mousse d'isolation thermique neuve ou déjà utilisée."
            },
            high_strength_cable: {
                name: "Câble haute résistance",
                description: "Câble renforcé, dont certains exemplaires sont encore sur rouleau."
            },
            assorted_wiring_buttons: {
                name: "Câblage et boutons divers",
                description: "Composants électriques récupérés et mélangés en vrac."
            },
            universal_electrical_connectors: {
                name: "Connecteur électrique universel",
                description: "Connecteur compatible avec de nombreux circuits électriques de la station."
            },
            assorted_pipes: {
                name: "Tuyaux de diverses tailles",
                description: "Tuyaux métalliques et composites de diamètres variés."
            },
            gas_cylinder: {
                name: "Bonbonne de gaz",
                description: "Bonbonne industrielle de gaz, d'un poids compris entre 25 et 50 kg."
            },
            grease: {
                name: "Graisse mécanique",
                description: "Graisse industrielle conditionnée en pot ou en pulvérisateur."
            },
            mechanical_oil: {
                name: "Huile mécanique",
                description: "Huile destinée à la lubrification et à l'entretien des mécanismes."
            },
            coolant: {
                name: "Liquide de refroidissement",
                description: "Liquide technique utilisé pour maintenir les systèmes à température."
            },
            composite_reinforcement_bands: {
                name: "Bandes de renfort composite",
                description: "Bandes renforcées destinées à consolider une structure ou une réparation."
            },
            manual_ratchet_cable: {
                name: "Câble de traction manuel avec cliquet",
                description: "Câble de traction manuel équipé d'un mécanisme à cliquet."
            },
            technical_sling: {
                name: "Sangle technique",
                description: "Sangle polyvalente destinée au maintien ou au transport de matériel."
            },
            defective_portable_sensor: {
                name: "Capteur portable défectueux",
                description: "Capteur portable de chaleur et de pression, fonctionnant de manière intermittente."
            },
            bloodstained_scalpel: {
                name: "Bistouri maculé",
                description: "Un outil chirurgical tranchant, couvert de sang séché et entouré de ruban adhésif sur le manche."
            },
            frantic_notes_notebook: {
                name: "Carnet de notes frénétiques",
                description: "Un journal couvert de symboles répétitifs et de la phrase \"Ne dors pas\" écrite des dizaines de fois."
            },
            sealed_noise_protection_headphones: {
                name: "Casque antibruit collé",
                description: "Un casque industriel recouvert de mastic pour le fixer à la tête, utilisé pour tenter d'étouffer les murmures."
            },
            empty_antipsychotics_blister: {
                name: "Plaquette d'antipsychotiques vide",
                description: "Un emballage de sédatifs lourds entièrement vidé à la hâte."
            },
            opened_solvent_bottle: {
                name: "Bouteille de solvant entamée",
                description: "Un bidon de produit chimique industriel ouvert, dégageant une odeur forte et toxique."
            },
            bent_iron_bar: {
                name: "Barre de fer tordue",
                description: "Une rambarde arrachée de force pour servir d'arme de fortune."
            },
            punctured_fire_extinguisher: {
                name: "Extincteur percuté",
                description: "Un extincteur vide dont le corps en métal porte des traces d'impacts répétés."
            },
            security_baton: {
                name: "Matraque d'agent de sécurité",
                description: "Arme de maintien de l'ordre abandonnée au sol, voyant de batterie clignotant au rouge."
            },
            overturned_backpack: {
                name: "Sac à dos renversé",
                description: "Un sac à moitié fouillé d'où s'échappent des affaires personnelles et des vêtements."
            },
            lone_magnetic_boot: {
                name: "Botte magnétique solitaire",
                description: "Une chaussure de travail abandonnée à la hâte lors d'un mouvement de foule."
            },
            half_eaten_food_ration: {
                name: "Ration alimentaire entamée",
                description: "Un paquet de nourriture de synthèse à moitié consommé, commençant à sécher."
            },
            stale_synth_coffee_cup: {
                name: "Tasse de synth-café rance",
                description: "Une tasse oubliée sur une table, couverte d'une pellicule sèche au fond."
            },
            blinking_tactical_pad: {
                name: "PAD tactique clignotant",
                description: "Un écran personnel dont la batterie faiblit, affichant un message de détresse non envoyé."
            },
            weak_flashlight: {
                name: "Lampe de poche affaiblie",
                description: "Une torche posée sur le flanc dont le faisceau lumineux grésille faiblement.",
                content: { capacity: 50, unit: "%" },
                hands: 1,
                lamp: { drainPerMinute: 1 }
            },
            looted_first_aid_kit: {
                name: "Kit de soins pillé",
                description: "Une boîte de premiers secours ouverte, débarrassée de ses bandes et antiseptiques."
            },
            sealed_adrenaline_injector: {
                name: "Injecteur d'adrénaline scellé",
                description: "Une dose de secours tombée de la veste d'un secouriste pendant la panique."
            },
            bloodstained_access_badge: {
                name: "Badge d'accès ensanglanté",
                description: "Pass de sécurité niveau 1 abandonné près d'un sas verrouillé."
            }
        };
//============================================================================================
// DONNEES DES SECTEURS, PORTES
//============================================================================================
