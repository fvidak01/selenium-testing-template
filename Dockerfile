FROM alpine:3.15.0 as BUILD_IMAGE

WORKDIR /root
RUN apk update && \
    apk --no-cache add zsh yarn
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
RUN mkdir .jest && touch .jest/setEnvVars.js
COPY . .

ENTRYPOINT ["yarn", "jest", "--maxWorkers=2", "--watchAll"]
