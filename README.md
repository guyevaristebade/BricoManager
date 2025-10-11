# BricoManager 🛠️

[![Feature-Based Architecture](https://img.shields.io/badge/Architecture-Feature--Based-blue)](https://martinfowler.com/articles/modular-monolith.html)
[![Modular Monolith](https://img.shields.io/badge/Pattern-Modular%20Monolith-green)](https://www.kamilgrzybek.com/design/modular-monolith-primer/)

## 📖 Présentation du projet

**BricoManager** est une application web de gestion d'outils familiaux permettant d'enregistrer, organiser et suivre l'historique des prêts d'outils. L'objectif est d'éviter les pertes d'outils et de structurer efficacement leur gestion au sein de la famille.

### 🎯 Objectifs

- **📦 Inventaire digital** : Cataloguer tous les outils avec photos et descriptions
- **📍 Localisation** : Organiser les outils par emplacements (garage, atelier, etc.)
- **📋 Gestion de projets** : Associer les outils à des projets spécifiques
- **👥 Prêts familiaux** : Suivre qui emprunte quoi et quand
- **📊 Historique** : Traçabilité complète des mouvements d'outils

## 🚀 Stack Technique

### Backend

[![Express](https://img.shields.io/badge/Express.js-000.svg?logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Zod](https://img.shields.io/badge/Zod-3A7AFE?logo=zod&logoColor=white)](https://zod.dev/)
[![Bcrypt](https://img.shields.io/badge/Bcrypt-1A237E?logo=bcrypt&logoColor=white)](https://github.com/kelektiv/node.bcrypt.js)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)](https://jestjs.io/)

### Frontend

[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)

### DevOps & Services

[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![HTTPOnly Cookie](https://img.shields.io/badge/Cookie-HTTPOnly-ffca28)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

## ✨ Fonctionnalités

### 🔐 Authentification & Sécurité

- **Inscription/Connexion** sécurisée avec validation email
- **Gestion des tokens** JWT (Access + Refresh) avec rotation automatique
- **Gestion des rôles** utilisateur (USER/ADMIN)
- **Sécurité des uploads** avec validation d'images et scan malware
- **Rate limiting** sur les endpoints sensibles

### 🛠️ Gestion des Outils

- **CRUD complet** : Créer, consulter, modifier, supprimer
- **Upload d'images** sécurisé via Cloudinary
- **Statuts multiples** : Disponible, Prêté, Cassé, Perdu
- **Catégorisation** par types d'outils
- **Localisation** par emplacements (garage, atelier, etc.)
- **Filtrage avancé** par statut, catégorie, emplacement

### 📋 Gestion des Projets

- **Planification de projets** avec timeline
- **Association outils/projets** pour le suivi
- **Statuts de projet** : Planifié, En cours, Terminé
- **Budget et dates** de réalisation
- **Upload d'images** pour documenter les projets

### 📍 Gestion des Emplacements

- **Organisation spatiale** des outils
- **Hiérarchie d'emplacements** (Maison > Garage > Établi)
- **Visualisation** des outils par emplacement
- **Images d'emplacements** pour identification visuelle

### 👥 Système d'Emprunt (Roadmap)

- **Gestion des emprunteurs** (famille, amis)
- **Historique des prêts** complet
- **Notifications** de retour d'outils
- **Statistiques** d'utilisation

### 🔍 Recherche & Filtres

- **Recherche textuelle** dans les outils
- **Filtres multiples** combinables
- **Tri** par nom, date, prix, statut
- **Export** des données

## 🎯 MVP (Minimum Viable Product)

Le MVP actuel comprend :

- ✅ **Système d'authentification** complet avec refresh token
- ✅ **Gestion des outils** (CRUD avec images)
- ✅ **Gestion des projets** (CRUD avec timeline)
- ✅ **Gestion des emplacements** (organisation spatiale)
- ✅ **Upload d'images** sécurisé

### 🚧 Prochaines étapes

- 🔲 Interface web frontend (Next.js)
- 🔲 Système d'emprunt complet
- 🔲 Dashboard analytics
- 🔲 Notifications temps réel
- 🔲 API RESTful documentée
- 🔲 Envoie d'email pour Mot de passe oublié et validation de compte
- 🔲 Tests unitaires et d'intégration

## 2. Installation

```bash
git clone https://github.com/guyevaristebade/Secure-Auth-System.git
cd Secure-Auth-System
npm install
cp .env.example .env
npm run dev
```

## 3. Variables d’environnement (.env)

PORT=

DATABASE_URL=

ACCESS_TOKEN_SECRET=

REFRESH_TOKEN_SECRET=

NODE_ENV=

CORS_ORIGIN=

## 4. Structure du projet

```bash
src/
├── common/              # Utilitaires et constantes partagées
├── config/              # Configuration de la base de données et autres
├── modules/             # Modules fonctionnels de l'application
├── server.ts            # Point d'entrée du serveur
└── app.ts               # Configuration Express
```

## 5. Endpoints API

| Méthode | Route                     | Auth ? | Rôle requis | Description             |
| ------- | ------------------------- | ------ | ----------- | ----------------------- |
| POST    | `/api/auth/register`      | ❌     | -           | Inscription             |
| POST    | `/api/auth/login`         | ❌     | -           | Connexion               |
| GET     | `/api/auth/refresh-token` | ✅     | -           | Génère un nouveau token |
| DELETE  | `/api/auth/logout`        | ✅     | -           | Déconnexion             |
| GET     | `/api/user/me`            | ✅     | -           | user information        |

## 6. Middlewares

- authenticatedUser: vérifie le JWT Access Token pour savoir si l'utilisateur est connecté

- refreshTokenValidation: vérifie validité du refresh_token

- validation(schema): valide les données avec Zod

- checkRole('ADMIN'): protège des routes par rôle
