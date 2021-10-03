FROM ubuntu:21.04
ARG PUSH_URL=https://github.com/kangwenhang/docker.git
ARG PUSH_BRANCH=master
ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
    LANG=zh_CN.UTF-8 \
    LC_ALL=C \
    SHELL=/bin/bash \
    DEBIAN_FRONTEND=noninteractive \
    PS1="\u@\h:\w \$ " \
    dir_root=/push
SHELL ["/bin/bash", "-c"]
WORKDIR ${dir_root}
RUN sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list \
    && apt-get upgrade \
    && apt-get update \
    && apt-get install -y bash \
                          git \
                          curl \
                          wget \
                          cron \
                          tzdata \
                          tar \
                          jq \
                          vim \
                          busybox \
                          rsyslog \
                          sudo \
                          postfix \
    && apt-get clean \
    && apt-get autoclean \
    && rm -rf /var/lib/apt/lists/* \
    && sed -i 's/$PrivDrop/# $PrivDrop/g' /etc/rsyslog.conf \
    && sed -i '/imklog/s/^/#/' /etc/rsyslog.conf \
    && sed -i 's/#cron/cron/g' /etc/rsyslog.d/50-default.conf \
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && git clone -b ${PUSH_BRANCH} ${PUSH_URL} ${dir_root} \
    && ln -sf ${dir_root}/shell/run.sh /usr/local/bin/run \
    && ln -sf ${dir_root}/shell/push.sh /usr/local/bin/push \
    && ln -sf ${dir_root}/shell/update.sh /usr/local/bin/update \
    && ln -sf ${dir_root}/shell/upcron.sh /usr/local/bin/upcron \
    && ln -sf ${dir_root}/shell/rmlog.sh /usr/local/bin/rmlog \
    && chmod -R 777 ${dir_root}
ENTRYPOINT ["./docker/docker-entrypoint.sh"]
