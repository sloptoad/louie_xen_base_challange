FROM ruby:3.1.4

RUN apt-get update && apt-get install -y --no-install-recommends sqlite3

WORKDIR /usr/src/app
COPY Gemfile* ./

RUN bundle install

COPY . .

RUN ./bin/rake db:setup

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
