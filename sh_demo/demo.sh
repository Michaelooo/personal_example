#!/bin/bash

cd /opt/gf/t2sdk

filename=t2sdk.ini

# exec 1>$filename

t2sdk=(login_name license_no servers init_recv_buf_size init_send_buf_size send_queue_size)
# export login=123
# export name=456

echo "[t2sdk]" >> $filename
for ENV_NAME in ${t2sdk[*]};
do
    echo $ENV_NAME=${!ENV_NAME} >> $filename
    #eval echo \${$env}
done

proxy=(proxy_type ip port user_name password)
echo "[proxy]" >> $filename
for ENV_NAME in ${proxy[*]};
do
    echo $ENV_NAME=${!ENV_NAME} >> $filename
    #eval echo \${$env}
done


safe=(safe_level client_id comm_pwd cert_file cert_pwd)
echo "[safe]" >> $filename
for ENV_NAME in ${safe[*]};
do
    echo $ENV_NAME=${!ENV_NAME} >> $filename
    #eval echo \${$env}
done

sleep 1

node proxy
tail -f /etc/hosts
