FROM node:20 AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --force
RUN npm ci --legacy-peer-deps --no-audit --no-fund && npm cache clean --force

FROM node:20 AS builder
WORKDIR /app
ARG DATABASE_URL
ARG NEXT_PUBLIC_API_URL
ARG JWT_SECRET
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET
ARG CLOUDINARY_CLOUD_NAME
ARG CLOUDINARY_UPLOAD_PRESET
ENV NODE_ENV=production
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV JWT_SECRET=$JWT_SECRET
ENV UMAMI_SITE_ID=$UMAMI_SITE_ID
ENV UMAMI_API_KEY=$UMAMI_API_KEY
ENV CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY
ENV CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET
ENV CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME
ENV CLOUDINARY_UPLOAD_PRESET=$CLOUDINARY_UPLOAD_PRESET
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npx prisma generate
RUN npm run build

FROM node:20 AS runner
WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]