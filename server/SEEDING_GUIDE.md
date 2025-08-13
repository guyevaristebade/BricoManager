# Guide d'utilisation des Seeds avec Prisma

## 📋 Description

Ce guide vous explique comment utiliser les scripts de seeding pour peupler votre base de données avec des données initiales pour les catégories d'outils et les emplacements.

## 🚀 Installation et Configuration

### Prérequis

- Node.js installé
- Base de données PostgreSQL configurée
- Variables d'environnement configurées dans `.env`

### Configuration de la base de données

Assurez-vous que votre fichier `.env` contient :

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
```

## 📖 Commandes disponibles

### Générer le client Prisma

```bash
npm run db:generate
```

### Pousser le schéma vers la base de données

```bash
npm run db:push
```

### Exécuter le seeding

```bash
npm run db:seed
```

### Ouvrir Prisma Studio (interface graphique)

```bash
npm run db:studio
```

### Réinitialiser la base de données (ATTENTION : supprime toutes les données)

```bash
npm run db:reset
```

## 🌱 Utilisation du Seeding

### Étapes pour peupler votre base de données :

1. **Préparer la base de données**

    ```bash
    npm run db:push
    ```

2. **Exécuter le seeding**

    ```bash
    npm run db:seed
    ```

3. **Vérifier les données** (optionnel)
    ```bash
    npm run db:studio
    ```

### Ce qui est créé par le script de seed :

#### 📁 Catégories d'outils (30+ catégories) :

- Outils électriques
- Perceuses et visseuses
- Outils de jardinage
- Outils de plomberie
- Matériel de peinture
- Outils de menuiserie
- Et bien d'autres...

#### 📍 Emplacements (8 emplacements) :

- Garage - Étagère A/B
- Atelier - Établi/Armoire
- Abri de jardin
- Cave - Rangement
- Placard - Outils électriques
- Garage - Sol (gros outils)

## 🔧 Personnalisation du Seeding

### Modifier les données de seed :

Éditez le fichier `prisma/seed.ts` pour :

- Ajouter de nouvelles catégories
- Modifier les emplacements
- Ajouter d'autres types de données

### Exemple d'ajout de catégorie :

```typescript
const newCategories = [
    { categoryName: 'Ma nouvelle catégorie' },
    // ...
];
```

## ⚠️ Bonnes pratiques

### Avant de lancer le seeding :

1. **Sauvegardez** vos données importantes
2. **Testez** d'abord sur une base de développement
3. **Vérifiez** que votre schéma Prisma est à jour

### Gestion des erreurs courantes :

#### Erreur "Table doesn't exist" :

```bash
npm run db:push
```

#### Erreur de connexion à la base :

Vérifiez votre `DATABASE_URL` dans `.env`

#### Conflits de données :

Le script utilise `skipDuplicates: true` pour éviter les doublons

## 🔄 Workflow recommandé

### Pour le développement :

1. Modifier le schéma Prisma
2. `npm run db:push`
3. `npm run db:seed`
4. Tester votre application

### Pour la production :

1. Utiliser les migrations Prisma
2. Exécuter le seeding une seule fois
3. Ne pas utiliser `db:reset` en production

## 📊 Monitoring

Après le seeding, vous devriez voir :

- ✅ Nombre de catégories créées
- ✅ Nombre d'emplacements créés
- ✅ Résumé des données insérées

## 🆘 Aide et Dépannage

Si vous rencontrez des problèmes :

1. Vérifiez les logs d'erreur
2. Contrôlez votre configuration de base de données
3. Assurez-vous que Prisma Client est généré
4. Vérifiez les permissions de votre base de données

## 📚 Ressources utiles

- [Documentation Prisma Seeding](https://www.prisma.io/docs/guides/migrate/seed-database)
- [Prisma Client Reference](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Prisma Studio](https://www.prisma.io/studio)
