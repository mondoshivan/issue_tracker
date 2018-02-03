FROM mondoshivan/rbenv:2.2.9

RUN apt-get install -y libsqlite3-dev

RUN mkdir -p /var/issue_tracker
WORKDIR /var/issue_tracker

COPY assets /var/issue_tracker/assets
COPY lib /var/issue_tracker/lib
COPY model /var/issue_tracker/model
COPY public /var/issue_tracker/public
COPY views /var/issue_tracker/views
COPY Gemfile /var/issue_tracker/Gemfile
COPY config.ru /var/issue_tracker/config.ru
COPY start.sh /var/issue_tracker/start.sh

RUN bash -l -c "bundle install --with production"

EXPOSE 4567
ENTRYPOINT ['./start.sh']
CMD ['ruby', 'config.ru']
