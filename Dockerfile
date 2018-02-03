FROM mondoshivan/rbenv:2.2.9

RUN apt-get install -y libsqlite3-dev

ENV APP_HOME /var/issue_tracker
ENV HOME /root

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY assets $APP_HOME/assets
COPY lib $APP_HOME/lib
COPY model $APP_HOME/model
COPY public $APP_HOME/public
COPY views $APP_HOME/views
COPY Gemfile $APP_HOME/Gemfile
COPY config.ru $APP_HOME/config.ru

RUN chmod -R 755 /var/issue_tracker

RUN bash -l -c "bundle install --with production"

ENV PORT 80
EXPOSE 80
CMD /bin/bash -i -c "rackup -p ${PORT} -o '0.0.0.0' -E production ${APP_HOME}/config.ru"