import asyncio
from dotenv import load_dotenv
import os
import re
import threading
from telethon import TelegramClient
from telethon.helpers import TotalList

api_id = int(os.getenv("TG_API_ID") or 0)
api_hash = os.getenv("TG_API_HASH") or ''

if not api_id and not api_hash:
    print("请设置TG_API_ID和TG_API_HASH")
    exit()
client = TelegramClient('anon', api_id, api_hash, proxy=('http', '127.0.0.1', 1080))


async def click(msg):
    print('click')
    await msg.click(0)


async def main():
    env_path = '.env'
    load_dotenv(env_path)
    new_msg_id = ''

    if os.getenv('PANDA_BUTTON_MSG_ID'):
        msg_id = int(os.getenv('PANDA_BUTTON_MSG_ID'))
    else:
        msg = await client.send_message('@pang_da_bot', '/start')
        msg_id = msg.id + 1
        new_msg_id = msg.id + 1
    await asyncio.sleep(2)

    msg = await client.get_messages('@pang_da_bot', ids=msg_id)
    print('get_messages', msg)
    if type(msg) == list:
        msg = msg[0]
    t = threading.Thread(target=asyncio.run, args=(click(msg),))
    t.daemon = True
    t.start()
    await asyncio.sleep(2)

    print('main')
    msg = await client.get_messages('@pang_da_bot', limit=1)
    if type(msg) == TotalList:
        msg = msg[0]

    token = re.search(r"你的Token (.*)\n", msg.message).group(1)
    print('token:', token)

    if not os.path.exists('.env'):
        print('create .env')
        os.system('cp .env.example .env')
    with open(env_path, 'r') as f:
        txt = f.read()
        txt = txt.replace(re.search(r'(PANDA_TOKEN=".*")', txt).group(1), f'PANDA_TOKEN="{token}"')
        if new_msg_id:
            print('获取到新msg_id')
            txt = txt.replace(re.search(r'(PANDA_BUTTON_MSG_ID=".*")', txt).group(1), f'PANDA_BUTTON_MSG_ID="{new_msg_id}"')
    with open(env_path, 'w') as f:
        f.write(txt)


with client:
    client.loop.run_until_complete(main())