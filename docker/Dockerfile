FROM mhart/alpine-node:4.3.1

ENV NODE_ENV=production MYSQL_URI=mysql://webconsole@mysql/IOTDB PORT=8080 ADDRESS=0.0.0.0

# Define working directory.
WORKDIR /app/

ADD dist /app

RUN /usr/bin/npm install --prod

# Define default command.
CMD ["npm", "start"]

# Expose ports.
EXPOSE 8080
