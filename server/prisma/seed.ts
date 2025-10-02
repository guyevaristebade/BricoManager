import prisma from '../src/config/db';

// Données de seed pour les catégories d'outils - Collection complète
const categoriesData = [
    // =================== OUTILS ÉLECTRIQUES ===================
    { categoryName: 'Outils électriques' },
    { categoryName: 'Perceuses et visseuses' },
    { categoryName: 'Scies électriques' },
    { categoryName: 'Ponceuses' },
    { categoryName: 'Meuleuses' },
    { categoryName: 'Défonceuses' },
    { categoryName: 'Raboteuses électriques' },
    { categoryName: 'Décapeurs thermiques' },
    { categoryName: 'Pistolets à colle' },
    { categoryName: 'Perforateurs' },
    { categoryName: 'Boulonneuses' },
    { categoryName: 'Affûteuses' },
    { categoryName: 'Cloueuses et agrafeuses' },
    { categoryName: 'Compresseurs' },

    // =================== OUTILS À MAIN ===================
    { categoryName: 'Outils de mesure' },
    { categoryName: 'Tournevis et clés' },
    { categoryName: 'Marteaux et massettes' },
    { categoryName: 'Scies à main' },
    { categoryName: 'Pinces et tenailles' },
    { categoryName: 'Limes et râpes' },
    { categoryName: 'Ciseaux et gouges' },
    { categoryName: 'Établis et étaux' },
    { categoryName: 'Clés plates et à pipe' },
    { categoryName: 'Tournevis spécialisés' },
    { categoryName: 'Couteaux et cutters' },
    { categoryName: 'Burins et pointeaux' },

    // =================== JARDINAGE ===================
    { categoryName: 'Outils de jardinage' },
    { categoryName: 'Tondeuses et taille-haies' },
    { categoryName: 'Arrosage' },
    { categoryName: 'Bêches et pelles' },
    { categoryName: 'Sécateurs et cisailles' },
    { categoryName: 'Râteaux et balais' },
    { categoryName: 'Tronçonneuses' },
    { categoryName: 'Broyeurs de végétaux' },
    { categoryName: 'Motobineuses et motoculteurs' },
    { categoryName: 'Souffleurs et aspirateurs de feuilles' },
    { categoryName: 'Épandeurs et pulvérisateurs' },
    { categoryName: 'Outils de plantation' },

    // =================== PLOMBERIE ===================
    { categoryName: 'Outils de plomberie' },
    { categoryName: 'Clés à molette' },
    { categoryName: 'Débouchoirs' },
    { categoryName: 'Chalumeaux et brasage' },
    { categoryName: 'Coupe-tubes' },
    { categoryName: 'Cintreuses' },
    { categoryName: 'Clés à sangle' },
    { categoryName: 'Détecteurs de fuite' },
    { categoryName: 'Fileteuses' },
    { categoryName: 'Ventouses' },

    // =================== ÉLECTRICITÉ ===================
    { categoryName: 'Outils électriques (métier)' },
    { categoryName: 'Multimètres' },
    { categoryName: 'Détecteurs' },
    { categoryName: 'Fers à souder' },
    { categoryName: 'Pinces électricien' },
    { categoryName: 'Dénudeurs de câbles' },
    { categoryName: 'Testeurs de tension' },
    { categoryName: 'Tire-fils' },
    { categoryName: 'Perforateurs de cloisons' },
    { categoryName: 'Caméras endoscopiques' },

    // =================== PEINTURE ===================
    { categoryName: 'Matériel de peinture' },
    { categoryName: 'Pinceaux et rouleaux' },
    { categoryName: 'Échelles et échafaudages' },
    { categoryName: 'Pistolets à peinture' },
    { categoryName: 'Bacs et grilles' },
    { categoryName: 'Spatules et grattoirs' },
    { categoryName: 'Masquage et protection' },
    { categoryName: 'Mélangeurs et malaxeurs' },

    // =================== MENUISERIE ===================
    { categoryName: 'Outils de menuiserie' },
    { categoryName: 'Rabots et ciseaux' },
    { categoryName: 'Serre-joints' },
    { categoryName: 'Équerre et règles' },
    { categoryName: 'Mortaiseuses' },
    { categoryName: 'Toupies' },
    { categoryName: 'Scies à onglet' },
    { categoryName: 'Compas et troussequins' },
    { categoryName: 'Planes et spokeshaves' },
    { categoryName: 'Assemblage et collage' },

    // =================== MAÇONNERIE ===================
    { categoryName: 'Outils de maçonnerie' },
    { categoryName: 'Truelles et spatules' },
    { categoryName: 'Niveaux' },
    { categoryName: 'Auges et seaux' },
    { categoryName: 'Maillets et masses' },
    { categoryName: 'Fil à plomb' },
    { categoryName: 'Lisseuses et taloche' },
    { categoryName: 'Bétonneuses' },
    { categoryName: 'Marteaux-piqueurs' },
    { categoryName: 'Carrelage et faïence' },

    // =================== CARROSSERIE ET MÉCANIQUE ===================
    { categoryName: 'Outils de mécanique automobile' },
    { categoryName: 'Clés à cliquet' },
    { categoryName: 'Douilles et embouts' },
    { categoryName: 'Clés dynamométriques' },
    { categoryName: 'Vérins et chandelles' },
    { categoryName: 'Extracteurs' },
    { categoryName: 'Compressomètres' },
    { categoryName: 'Outils de carrosserie' },

    // =================== NETTOYAGE ET ENTRETIEN ===================
    { categoryName: 'Matériel de nettoyage' },
    { categoryName: 'Aspirateurs' },
    { categoryName: 'Nettoyeurs haute pression' },
    { categoryName: 'Balais et serpillières' },
    { categoryName: "Produits d'entretien" },
    { categoryName: 'Chiffons et éponges' },
    { categoryName: 'Seaux et bassines' },

    // =================== LEVAGE ET MANUTENTION ===================
    { categoryName: 'Matériel de levage' },
    { categoryName: 'Sangles et cordes' },
    { categoryName: 'Poulies et treuils' },
    { categoryName: 'Diables et transpalettes' },
    { categoryName: 'Palans' },
    { categoryName: 'Élingues' },

    // =================== SOUDAGE ET MÉTALLURGIE ===================
    { categoryName: 'Matériel de soudage' },
    { categoryName: 'Postes à souder' },
    { categoryName: 'Électrodes et baguettes' },
    { categoryName: 'Chalumeaux' },
    { categoryName: 'Lunettes et masques de soudage' },
    { categoryName: 'Étaux et enclumes' },
    { categoryName: 'Forgeage' },

    // =================== OUTILLAGE SPÉCIALISÉ ===================
    { categoryName: 'Outils de précision' },
    { categoryName: 'Optique et horlogerie' },
    { categoryName: 'Bijouterie' },
    { categoryName: 'Gravure' },
    { categoryName: 'Modélisme' },
    { categoryName: 'Cuir et sellerie' },
    { categoryName: 'Textiles' },

    // =================== ÉQUIPEMENTS DE PROTECTION ===================
    { categoryName: 'Équipements de protection individuelle' },
    { categoryName: 'Casques et lunettes' },
    { categoryName: 'Gants de protection' },
    { categoryName: 'Chaussures de sécurité' },
    { categoryName: 'Harnais et cordages' },
    { categoryName: 'Masques et respirateurs' },
    { categoryName: 'Vêtements de travail' },

    // =================== STOCKAGE ET ORGANISATION ===================
    { categoryName: 'Rangement et stockage' },
    { categoryName: 'Boîtes à outils' },
    { categoryName: 'Servantes et armoires' },
    { categoryName: 'Panneaux perforés' },
    { categoryName: 'Bacs et tiroirs' },
    { categoryName: 'Étiquetage' },

    // =================== AUTRES ET DIVERS ===================
    { categoryName: 'Outils de bricolage général' },
    { categoryName: 'Accessoires et consommables' },
    { categoryName: 'Pièces détachées' },
    { categoryName: 'Lubrifiants et adhésifs' },
    { categoryName: 'Quincaillerie' },
    { categoryName: 'Visserie et boulonnerie' },
    { categoryName: 'Matériaux divers' },
    { categoryName: 'Autres' },
];

async function main() {
    console.log('🌱 Début du seeding...');

    try {
        // Nettoyer les données existantes (optionnel - à utiliser avec précaution)
        console.log('🧹 Nettoyage des données existantes...');
        await prisma.category.deleteMany({});

        // Créer les catégories
        console.log('📁 Création des catégories...');
        const categories = await prisma.category.createMany({
            data: categoriesData,
            skipDuplicates: true, // Ignore les doublons si ils existent
        });
        console.log(`✅ ${categories.count} catégories créées`);

        // Afficher un résumé
        const totalCategories = await prisma.category.count();

        console.log('\n📊 Résumé du seeding :');
        console.log(`   - Catégories : ${totalCategories}`);
        console.log('\n🎉 Seeding terminé avec succès !');
    } catch (error) {
        console.error('❌ Erreur during seeding:', error);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
