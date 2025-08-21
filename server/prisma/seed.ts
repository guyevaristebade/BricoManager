import prisma from '../src/config/db.config';

// Données de seed pour les catégories d'outils
const categoriesData = [
    // Outils électriques
    { categoryName: 'Outils électriques' },
    { categoryName: 'Perceuses et visseuses' },
    { categoryName: 'Scies électriques' },
    { categoryName: 'Ponceuses' },
    { categoryName: 'Meuleuses' },

    // Outils à main
    { categoryName: 'Outils de mesure' },
    { categoryName: 'Tournevis et clés' },
    { categoryName: 'Marteaux et massettes' },
    { categoryName: 'Scies à main' },
    { categoryName: 'Pinces et tenailles' },

    // Jardinage
    { categoryName: 'Outils de jardinage' },
    { categoryName: 'Tondeuses et taille-haies' },
    { categoryName: 'Arrosage' },
    { categoryName: 'Bêches et pelles' },

    // Plomberie
    { categoryName: 'Outils de plomberie' },
    { categoryName: 'Clés à molette' },
    { categoryName: 'Débouchoirs' },

    // Électricité
    { categoryName: 'Outils électriques (métier)' },
    { categoryName: 'Multimètres' },
    { categoryName: 'Détecteurs' },

    // Peinture
    { categoryName: 'Matériel de peinture' },
    { categoryName: 'Pinceaux et rouleaux' },
    { categoryName: 'Échelles et échafaudages' },

    // Menuiserie
    { categoryName: 'Outils de menuiserie' },
    { categoryName: 'Rabots et ciseaux' },
    { categoryName: 'Serre-joints' },

    // Maçonnerie
    { categoryName: 'Outils de maçonnerie' },
    { categoryName: 'Truelles et spatules' },
    { categoryName: 'Niveaux' },

    // Nettoyage et entretien
    { categoryName: 'Matériel de nettoyage' },
    { categoryName: 'Aspirateurs' },
    { categoryName: 'Nettoyeurs haute pression' },
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
