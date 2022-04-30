FROM node:latest
RUN mkdir frontend
WORKDIR /frontend
COPY . .
RUN npm install && npm run build
EXPOSE 3030
CMD [ "npm", "run", "preview" ]