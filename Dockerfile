FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json ./
RUN npm install --ignore-scripts --legacy-peer-deps

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* is inlined into the client bundle at build time, so it has to be
# present HERE, not only in the runtime environment. Passing it only to the
# container fixed SSR and still threw on hydration, because the browser chunk had
# `undefined` baked into it.
ARG NEXT_PUBLIC_AANTEKENINGEN_APP_URL
ENV NEXT_PUBLIC_AANTEKENINGEN_APP_URL=$NEXT_PUBLIC_AANTEKENINGEN_APP_URL
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4302
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 4302
CMD ["node", "server.js"]
