FROM --platform=linux/amd64 node:21-alpine3.18
WORKDIR /app/KubernetesAssignmentC2
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]