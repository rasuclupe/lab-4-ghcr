# =============================================================================
# Dockerfile multi-stage — Módulo 4
# =============================================================================
# Etapa 1 (deps): instala dependencias de producción de forma aislada.
# Etapa 2 (runtime): imagen mínima, usuario no-root, solo lo necesario.
# La app no tiene dependencias externas, pero la estructura multi-stage se
# mantiene para reflejar el patrón real y ser válida en proyectos con deps.
# =============================================================================

# ---- Etapa de dependencias --------------------------------------------------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# --omit=dev evita dependencias de desarrollo en la imagen final
#RUN npm ci --omit=dev || npm install --omit=dev
RUN (npm ci --omit=dev || npm install --omit=dev) && mkdir -p node_modules

# ---- Etapa runtime ----------------------------------------------------------
FROM node:20-alpine AS runtime
WORKDIR /app

# Usuario no-root (alpine ya trae el usuario 'node' del base image de node)
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY src/ ./src/

# Puerto expuesto y healthcheck a nivel de imagen
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

USER node
CMD ["node", "src/server.js"]
