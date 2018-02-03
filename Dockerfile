FROM mondoshivan/rbenv:2.2.9

RUN apt-get install -y libsqlite3-dev

RUN mkdir -p /var/issue_tracker

COPY ./assets /var/issue_tracker/assets
COPY ./lib /var/issue_tracker/lib
COPY ./model /var/issue_tracker/model
COPY ./public /var/issue_tracker/public
COPY ./views /var/issue_tracker/views
COPY ./Gemfile /var/issue_tracker/Gemfile
COPY ./config.ru /var/issue_tracker/config.ru

RUN bash -l -c "bundle install --gemfile /var/issue_tracker/Gemfile"

EXPOSE 4567

CMD ['ruby', '/var/issue_tracker/config.ru']
