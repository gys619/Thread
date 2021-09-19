FROM debian:unstable-slim
ARG PUSH_URL=https://github.com/kangwenhang/docker.git
ARG PUSH_BRANCH=master
ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
    LANG=zh_CN.UTF-8 \
    SHELL=/bin/bash \
    PS1="\u@\h:\w \$ " \
    dir_root=/push
WORKDIR ${dir_root}
RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends bash \
                             git \
                             curl \
                             wget \
                             tzdata \
                             tar \
                             jq \
                             vim \
    && rm -rf /var/cache/apk/* \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get autoremove \
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && git clone -b ${PUSH_BRANCH} ${PUSH_URL} ${dir_root} \
    && ln -sf ${dir_root}/shell/run.sh /usr/local/bin/run \
    && ln -sf ${dir_root}/shell/push.sh /usr/local/bin/push \
    && ln -sf ${dir_root}/shell/update.sh /usr/local/bin/update \
    && ln -sf ${dir_root}/shell/upcron.sh /usr/local/bin/upcron \
    && ln -sf ${dir_root}/shell/rmlog.sh /usr/local/bin/rmlog \
    && chmod -R 777 ${dir_root}
ENTRYPOINT ["./docker/docker-entrypoint.sh"]
