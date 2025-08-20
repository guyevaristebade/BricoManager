FROM node:alpine3.22

WORKDIR /app

# Installer pnpm
RUN npm install -g pnpm

# Copier d'abord les fichiers de dépendances
COPY pnpm-lock.yaml ./
COPY package.json ./

# Installer les dépendances
RUN pnpm install

# Copier les fichiers nécessaires
COPY . .

# Générer le client Prisma && compiler le code TypeScript
RUN pnpm prisma generate  &&  pnpm run build

# Exposer le port 3000
EXPOSE 3000:3000

# Démarrer l'application
CMD ["pnpm", "run", "start"]