#!/bin/bash

date

# build if webhook.php was called
if grep -q "please build" /home/build; then
        echo "building" > /home/build && \
         cd /home/site && npm run build && \
         echo "built"
fi

# send e-mail in case of build-error
LOG=/var/log/build.log
RECIPIENTS=admin@ivanne.de
if grep -q 'ERR!\|ERROR' $LOG; then
  printf '\n\n*******************\nSENT BY build.sh' >> $LOG
  /usr/bin/mutt -s "ERR found in $LOG $(date +%F)" $RECIPIENTS < $LOG && \
   echo "mail sent to $RECIPIENTS" > $LOG && \
   date >> $LOG
fi

date