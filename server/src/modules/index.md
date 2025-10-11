# Module

## But :

Chaque feature est isolée (ex: users, tools, projects).

src/
│── app.ts # Point d’entrée de l’application (Express)
│── server.ts # Lancement du serveur
│
├── config/ # Config globale (env, DB, middlewares)
│ ├── database.ts # Prisma init
│ └── env.ts
│
├── modules/ # Chaque feature est un module
│ ├── auth/
│ │ ├── auth.controller.ts
│ │ ├── auth.service.ts
│ │ ├── auth.repository.ts
│ │ ├── auth.routes.ts
│ │ └── dto/
│ │ ├── login.dto.ts
│ │ └── register.dto.ts
│ │
│ ├── users/
│ │ ├── user.controller.ts
│ │ ├── user.service.ts
│ │ ├── user.repository.ts
│ │ ├── user.routes.ts
│ │ └── dto/
│ │ └── update-user.dto.ts
│ │
│ ├── tools/
│ │ ├── tool.controller.ts
│ │ ├── tool.service.ts
│ │ ├── tool.repository.ts
│ │ ├── tool.routes.ts
│ │ └── dto/
│ │ └── create-tool.dto.ts
│ │
│ ├── projects/
│ │ ├── project.controller.ts
│ │ ├── project.service.ts
│ │ ├── project.repository.ts
│ │ ├── project.routes.ts
│ │ └── dto/
│ │ └── create-project.dto.ts
│ │
│ ├── assignments/
│ │ ├── assignment.controller.ts
│ │ ├── assignment.service.ts
│ │ ├── assignment.repository.ts
│ │ ├── assignment.routes.ts
│ │ └── dto/
│ │ └── assign-tool.dto.ts
│
├── common/ # Utilitaires partagés
│ ├── middlewares/
│ │ └── auth.middleware.ts
│ ├── errors/
│ │ └── http-exception.ts
│ └── utils/
│ └── hash.ts
│
└── prisma/
└── schema.prisma # Modèle de données
