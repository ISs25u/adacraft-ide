FROM python:2.7

ENV NODE_VERSION 6.10.0
RUN curl -sSLo- "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  | tar xJ -C /usr/local --strip-components=1

ENV YARN_VERSION 0.21.3
RUN curl -sSLo- https://yarnpkg.com/downloads/0.21.3/yarn-v$YARN_VERSION.tar.gz \
  | tar xz -C /opt --transform=s/^dist/yarn/ \
  && ln -s /opt/yarn/bin/yarn /usr/local/bin/

WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/

RUN pip install --no-cache-dir -r requirements.txt

COPY package.json yarn.lock /usr/src/app/

ENV NODE_ENV production
RUN yarn install

COPY . /usr/src/app/

RUN yarn build -- -p

EXPOSE 5000
CMD [ "python", "./main.py" ]
