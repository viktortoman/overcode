FROM node:20-alpine

RUN apk add --no-cache curl zsh git emacs vim;

# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#global-npm-dependencies
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# node:node is 1000:1000 so good for us
USER node

ARG OH_MY_ZSH_THEME=cloud
RUN set -eux; \
		sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"; \
		sed -i "s/\(^ZSH_THEME=\).*/\1$OH_MY_ZSH_THEME/" ~/.zshrc; \
		npm install -g \
			@nestjs/cli \
			@vue/cli

WORKDIR /app

CMD [ "zsh", "npm", "run", "serve" ]