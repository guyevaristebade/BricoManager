import { prisma } from '../src/config';

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

// Données de seed pour les emplacements
const locationsData = [
    {
        locationName: 'Garage - Étagère A',
        locationImgUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    },
    {
        locationName: 'Garage - Étagère B',
        locationImgUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    },
    {
        locationName: 'Atelier - Établi',
        locationImgUrl: 'https://images.unsplash.com/photo-1581092795442-5d8e564b7e0d?w=400',
    },
    {
        locationName: 'Atelier - Armoire',
        locationImgUrl: 'https://images.unsplash.com/photo-1581092795442-5d8e564b7e0d?w=400',
    },
    {
        locationName: 'Abri de jardin',
        locationImgUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    },
    {
        locationName: 'Cave - Rangement',
        locationImgUrl: 'https://images.unsplash.com/photo-1609684935665-87a9b57c7a8e?w=400',
    },
    {
        locationName: 'Placard - Outils électriques',
        locationImgUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    },
    {
        locationName: 'Garage - Sol (gros outils)',
        locationImgUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    },
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

        // Créer les emplacements
        console.log('📍 Création des emplacements...');
        const locations = await prisma.location.createMany({
            data: locationsData,
            skipDuplicates: true,
        });
        console.log(`✅ ${locations.count} emplacements créés`);

        // Afficher un résumé
        const totalCategories = await prisma.category.count();
        const totalLocations = await prisma.location.count();

        console.log('\n📊 Résumé du seeding :');
        console.log(`   - Catégories : ${totalCategories}`);
        console.log(`   - Emplacements : ${totalLocations}`);
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
