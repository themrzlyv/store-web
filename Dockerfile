FROM node:20 AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20 AS builder
WORKDIR /app
ENV NEXT_PUBLIC_NODE_ENV=production
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:20 AS runner
WORKDIR /app
ENV NEXT_PUBLIC_NODE_ENV=production
COPY package.json package-lock.json ./
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]