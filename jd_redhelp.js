/*
年货节助力

变量
export CODENHJ=""  //自行获取金粉码

开始时间：2022.12.29 20:00-2023.1.15 23.59
更新:
12.29:优化显示
12.30: 其他修正
12.31：自动助力前排账号，领取红包
1.4:日志详细显示，内部助力

建议禁用，避免其他问题 需要的请填写自己的码子，
cron:0 0,12,20 * * *
============Quantumultx===============
[task_local]
#年货节助力
0 0,12,20 * * * jd_redhelp.js, tag=年货节助力, enabled=true
*/
const $ = new Env('年货节助力');
var iｉl='jsjiami.com.v6',iｉl_=['iｉl'],i1l1i=[iｉl,'\x69\x73\x4e\x6f\x64\x65','\x2e\x2f\x6a\x64\x43\x6f\x6f\x6b\x69\x65\x2e\x6a\x73','\x2e\x2f\x73\x65\x6e\x64\x4e\x6f\x74\x69\x66\x79','\x6a\x73\x64\x6f\x6d','\x43\x72\x79\x70\x74\x6f\x4a\x53','\x63\x72\x79\x70\x74\x6f\x2d\x6a\x73','\x6b\x65\x79\x73','\x66\x6f\x72\x45\x61\x63\x68','\x70\x75\x73\x68','\x65\x6e\x76','\x4a\x44\x5f\x44\x45\x42\x55\x47','\x66\x61\x6c\x73\x65','\x6c\x6f\x67','\x67\x65\x74\x64\x61\x74\x61','\x43\x6f\x6f\x6b\x69\x65\x4a\x44','\x43\x6f\x6f\x6b\x69\x65\x4a\x44\x32','\x43\x6f\x6f\x6b\x69\x65\x73\x4a\x44','\x6d\x61\x70','\x63\x6f\x6f\x6b\x69\x65','\x66\x69\x6c\x74\x65\x72','\x73\x68\x61\x72\x65\x43\x6f\x75\x6e\x74','\x73\x70\x6c\x69\x74','\x74\x69\x6d\x65','\x79\x79\x79\x79\x2d\x4d\x4d\x2d\x64\x64\x20\x48\x48\x3a\x6d\x6d\x3a\x73\x73','\x75\x69\x55\x70\x64\x61\x74\x65\x54\x69\x6d\x65','\x65\x6e\x64\x46\x6c\x61\x67','\x72\x75\x6e\x45\x6e\x64','\x67\x65\x74\x48\x35\x73\x74\x5f\x57\x51\x5f\x41\x72\x72','\x72\x75\x6e\x41\x72\x72','\x43\x4f\x44\x45\x4e\x48\x4a','\x32\x30\x32\x33\x2f\x30\x31\x2f\x31\x36\x20\x30\x30\x3a\x30\x30\x3a\x30\x30\x2b\x30\x38\x3a\x30\x30','\x67\x65\x74\x54\x69\x6d\x65','\x67\x65\x74\x54\x69\x6d\x65\x7a\x6f\x6e\x65\x4f\x66\x66\x73\x65\x74','\x55\x56\x43\x6f\x6f\x6b\x69\x65\x41\x72\x72','\x55\x56\x43\x6f\x6f\x6b\x69\x65','\x79\x79\x79\x79\x2d\x4d\x4d\x2d\x64\x64','\x6d\x73\x67','\x6e\x61\x6d\x65','\u3010\u63d0\u793a\u3011\u8bf7\u5148\u83b7\u53d6\x63\x6f\x6f\x6b\x69\x65\x0a\u76f4\u63a5\u4f7f\u7528\x4e\x6f\x62\x79\x44\x61\u7684\u4eac\u4e1c\u7b7e\u5230\u83b7\u53d6','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x62\x65\x61\x6e\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f','\u6d3b\u52a8\u5df2\u7ed3\u675f','\u8bf7\u5220\u9664\u6b64\u811a\u672c','\x73\x65\x74\x64\x61\x74\x61','\x4a\x44\x5f\x6e\x68\x6a\x5f\x52\x65\x64\x73','\x4a\x44\x5f\x6e\x68\x6a\x5f\x52\x65\x64','\x4a\x44\x5f\x6e\x68\x6a\x5f\x52\x65\x64\x5f\x70\x69\x6e','\x73\x68\x61\x72\x65\x43\x6f\x64\x65\x41\x72\x72','\x73\x68\x61\x72\x65\x43\x6f\x64\x65\x50\x69\x6e\x41\x72\x72','\x73\x68\x61\x72\x65\x43\x6f\x64\x65','\x61\x67\x61\x69\x6e','\x68\x74\x74\x70\x3a\x2f\x2f\x63\x6f\x64\x65\x2e\x6b\x69\x6e\x67\x72\x61\x6e\x2e\x67\x61\x2f\x6e\x68\x6a\x2e\x6a\x73\x6f\x6e','\x67\x65\x74\x41\x75\x74\x68\x6f\x72\x43\x6f\x64\x65\x4c\x69\x73\x74\x65\x72\x72','\x62\x55\x74\x53\x57\x6c\x5a\x7a\x4f\x43\x78\x74\x64\x31\x4a\x54\x63\x58\x6b\x33\x4c\x47\x31\x30\x55\x6d\x34\x7a\x5a\x30\x59\x73\x62\x58\x52\x53\x65\x55\x64\x68\x4f\x53\x78\x74\x64\x46\x49\x77\x4d\x6c\x64\x58\x4c\x47\x31\x4c\x55\x6b\x4a\x6d\x4f\x55\x38\x73\x62\x58\x52\x53\x4d\x44\x4a\x58\x56\x79\x78\x74\x53\x31\x4a\x43\x5a\x6a\x6c\x50','\x66\x72\x6f\x6d','\x62\x61\x73\x65\x36\x34','\x74\x6f\x53\x74\x72\x69\x6e\x67','\x65\x6e\x64','\x6c\x65\x6e\x67\x74\x68','\x55\x73\x65\x72\x4e\x61\x6d\x65','\x6d\x61\x74\x63\x68','\x69\x6e\x64\x65\x78','\x0a\x0a\x2a\x2a\x2a\x2a\x2a\x2a\u5f00\u59cb\u3010\u4eac\u4e1c\u8d26\u53f7','\x6e\x69\x63\x6b\x4e\x61\x6d\x65','\x2a\x2a\x2a\x2a\x2a\x2a\x2a\x2a\x2a\x0a','\x69\x6e\x63\x6c\x75\x64\x65\x73','\x61\x70\x70\x5f\x6f\x70\x65\x6e','\x77\x61\x69\x74','\x72\x61\x6e\x64\x6f\x6d','\x63\x61\x74\x63\x68','\x6c\x6f\x67\x45\x72\x72','\x66\x69\x6e\x61\x6c\x6c\x79','\x63\x6c\x6f\x73\x65','\x64\x6f\x6e\x65','\u5df2\u586b\u5199\u53d8\u91cf\uff1a','\x73\x68\x61\x72\x65\x46\x6c\x61\x67','\x66\x6c\x61\x67','\x75\x72\x6c\x31','\u83b7\u53d6\x75\x72\x6c\x31\u5931\u8d25','\x75\x72\x6c\x32','\x67\x65\x74\x55\x56\x43\x6f\x6f\x6b\x69\x65','\u83b7\u53d6\u4e0d\u5230\u7ea2\u5305\u9875\u9762','\x74\x65\x73\x74','\x26\x64\x3d','\u6539\u8fd4\u5229\x75\x72\x6c\uff1a\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f','\x20\u53ef\u80fd\u4e0d\u662f\u7ea2\u5305\u9875\u9762','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x70\x72\x6f\x64\x65\x76\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x6d\x61\x6c\x6c\x2f\x61\x63\x74\x69\x76\x65\x2f\x43\x5a\x56\x77\x4b\x37\x35\x75\x6f\x33\x38\x79\x37\x59\x64\x43\x32\x76\x38\x64\x4a\x36\x54\x48\x39\x53\x53\x2f\x69\x6e\x64\x65\x78\x2e\x68\x74\x6d\x6c\x3f\x75\x6e\x69\x6f\x6e\x41\x63\x74\x49\x64\x3d\x33\x31\x31\x35\x35\x26\x64\x3d','\x26\x63\x75\x3d\x74\x72\x75\x65\x26\x75\x74\x6d\x5f\x73\x6f\x75\x72\x63\x65\x3d\x6b\x6f\x6e\x67\x26\x75\x74\x6d\x5f\x6d\x65\x64\x69\x75\x6d\x3d\x6a\x69\x6e\x67\x66\x65\x6e','\x61\x63\x74\x49\x64','\x43\x5a\x56\x77\x4b\x37\x35\x75\x6f\x33\x38\x79\x37\x59\x64\x43\x32\x76\x38\x64\x4a\x36\x54\x48\x39\x53\x53','\x65\x69\x64','\x67\x65\x74\x4f\x77\x6e\x50\x72\x6f\x70\x65\x72\x74\x79\x4e\x61\x6d\x65\x73','\x63\x6f\x75\x6e\x74','\x67\x65\x74\x6c\x6a','\u52a9\u529b\x5b','\x63\x6f\x64\x65','\u3010\u4eac\u4e1c\u8d26\u53f7','\x0a\u83b7\u53d6\u65b0\u7684\u52a9\u529b\u4fe1\u606f','\x75\x70\x64\x61\x74\x65\x54\x69\x6d\x65','\x69\x6e\x64\x65\x78\x4f\x66','\x33\x31\x31\x35\x35','\x61\x70\x70\x6c\x65','\x38\x2e\x33\x2e\x36','\x67\x65\x74\x43\x6f\x75\x70\x6f\x6e\x73','\x36\x61\x39\x38\x64','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x61\x70\x69\x3f\x66\x75\x6e\x63\x74\x69\x6f\x6e\x49\x64\x3d\x67\x65\x74\x43\x6f\x75\x70\x6f\x6e\x73\x26\x61\x70\x70\x69\x64\x3d\x75\x26\x5f\x3d','\x26\x6c\x6f\x67\x69\x6e\x54\x79\x70\x65\x3d\x32\x26\x62\x6f\x64\x79\x3d','\x74\x6f\x53\x74\x72','\x26\x63\x6c\x69\x65\x6e\x74\x3d\x61\x70\x70\x6c\x65\x26\x63\x6c\x69\x65\x6e\x74\x56\x65\x72\x73\x69\x6f\x6e\x3d\x38\x2e\x33\x2e\x36\x26\x68\x35\x73\x74\x3d','\x2a\x2f\x2a','\x7a\x68\x2d\x63\x6e','\x67\x7a\x69\x70\x2c\x20\x64\x65\x66\x6c\x61\x74\x65\x2c\x20\x62\x72','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x70\x72\x6f\x64\x65\x76\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x70\x72\x6f\x64\x65\x76\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x6d\x61\x6c\x6c\x2f\x61\x63\x74\x69\x76\x65\x2f\x43\x5a\x56\x77\x4b\x37\x35\x75\x6f\x33\x38\x79\x37\x59\x64\x43\x32\x76\x38\x64\x4a\x36\x54\x48\x39\x53\x53\x2f\x69\x6e\x64\x65\x78\x2e\x68\x74\x6d\x6c','\x68\x65\x61\x64\x65\x72\x73','\x52\x65\x66\x65\x72\x65\x72','\x67\x65\x74','\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x74\x6f\x4f\x62\x6a','\x6f\x62\x6a\x65\x63\x74','\u4e0d\u5c55\u793a\u5f39\u5c42','\u9886\u53d6\u4e0a\u9650','\u6d3b\u52a8\u672a\u5f00\u59cb','\x64\x61\x74\x61','\x75\x6e\x64\x65\x66\x69\x6e\x65\x64','\x6a\x6f\x69\x6e\x4e\x75\x6d','\x6a\x6f\x69\x6e\x53\x75\x66\x66\x69\x78','\x63\x6f\x75\x70\x6f\x6e\x4c\x69\x73\x74','\x74\x79\x70\x65','\u83b7\u5f97\x5b\u7ea2\u5305\x5d\ud83e\udde7','\x64\x69\x73\x63\x6f\x75\x6e\x74','\u5143\x20\u4f7f\u7528\u65f6\u95f4\x3a','\x62\x65\x67\x69\x6e\x54\x69\x6d\x65','\x65\x6e\x64\x54\x69\x6d\x65','\u83b7\u5f97\x5b\u4f18\u60e0\u5238\x5d\ud83c\udf9f\ufe0f\u6ee1','\x71\x75\x6f\x74\x61','\x20\u4f7f\u7528\u65f6\u95f4\x3a','\u83b7\u5f97\x5b\u6253\u6298\u5238\x5d\x5d\ud83c\udfab\u6ee1','\u6298\x20\u4f7f\u7528\u65f6\u95f4\x3a','\u83b7\u5f97\x5b\u672a\u77e5\x5d\ud83c\udf89','\x67\x72\x6f\x75\x70\x44\x61\x74\x61','\x67\x72\x6f\x75\x70\x49\x6e\x66\x6f','\x73\x74\x61\x74\x75\x73','\u52a9\u529b\u6ee1\u53ef\u4ee5\u9886\u53d6','\x69\x6e\x66\x6f','\u5143\u7ea2\u5305\ud83e\udde7','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x61\x70\x69\x3f\x66\x75\x6e\x63\x74\x69\x6f\x6e\x49\x64\x3d\x73\x68\x6f\x77\x43\x6f\x75\x70\x6f\x6e\x26\x61\x70\x70\x69\x64\x3d\x75\x26\x5f\x3d','\x6e\x6f\x77','\x26\x6c\x6f\x67\x69\x6e\x54\x79\x70\x65\x3d\x32\x26\x62\x6f\x64\x79\x3d\x7b\x25\x32\x32\x61\x63\x74\x49\x64\x25\x32\x32\x3a\x25\x32\x32','\x25\x32\x32\x2c\x25\x32\x32\x75\x6e\x69\x6f\x6e\x41\x63\x74\x49\x64\x25\x32\x32\x3a\x25\x32\x32\x33\x31\x31\x35\x35\x25\x32\x32\x2c\x25\x32\x32\x75\x6e\x70\x6c\x25\x32\x32\x3a\x25\x32\x32','\x75\x6e\x70\x6c','\x25\x32\x32\x2c\x25\x32\x32\x70\x6c\x61\x74\x66\x6f\x72\x6d\x25\x32\x32\x3a','\x2c\x25\x32\x32\x75\x6e\x69\x6f\x6e\x53\x68\x61\x72\x65\x49\x64\x25\x32\x32\x3a\x25\x32\x32\x25\x32\x32\x2c','\x25\x32\x32\x75\x69\x55\x70\x64\x61\x74\x65\x54\x69\x6d\x65\x25\x32\x32\x3a','\x25\x32\x32\x64\x25\x32\x32\x3a\x25\x32\x32','\x25\x32\x32\x2c\x25\x32\x32\x65\x69\x64\x25\x32\x32\x3a\x25\x32\x32','\x25\x32\x32\x7d\x26\x63\x6c\x69\x65\x6e\x74\x3d\x69\x50\x68\x6f\x6e\x65\x26\x63\x6c\x69\x65\x6e\x74\x56\x65\x72\x73\x69\x6f\x6e\x3d\x26\x6f\x73\x56\x65\x72\x73\x69\x6f\x6e\x3d\x69\x4f\x53\x26\x73\x63\x72\x65\x65\x6e\x3d\x34\x31\x34\x2a\x38\x39\x36\x26\x64\x5f\x62\x72\x61\x6e\x64\x3d\x69\x50\x68\x6f\x6e\x65\x26\x64\x5f\x6d\x6f\x64\x65\x6c\x3d\x69\x50\x68\x6f\x6e\x65\x26\x6c\x61\x6e\x67\x3d\x7a\x68\x2d\x63\x6e\x26\x73\x64\x6b\x56\x65\x72\x73\x69\x6f\x6e\x3d\x26\x6f\x70\x65\x6e\x75\x64\x69\x64\x3d','\x6e\x75\x6d','\u3010\u8d26\u53f7','\u3011\u7f13\u5b58\u5206\u4eab\u7801\x3a','\x72\x65\x70\x6c\x61\x63\x65','\x2a\x2a\x2a\x24\x31','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x61\x70\x69\x3f\x66\x75\x6e\x63\x74\x69\x6f\x6e\x49\x64\x3d\x73\x68\x61\x72\x65\x55\x6e\x69\x6f\x6e\x43\x6f\x75\x70\x6f\x6e\x26\x61\x70\x70\x69\x64\x3d\x75\x26\x5f\x3d','\x26\x6c\x6f\x67\x69\x6e\x54\x79\x70\x65\x3d\x32\x26\x62\x6f\x64\x79\x3d\x7b\x25\x32\x32\x75\x6e\x69\x6f\x6e\x41\x63\x74\x49\x64\x25\x32\x32\x3a\x25\x32\x32\x33\x31\x31\x35\x35\x25\x32\x32\x2c\x25\x32\x32\x61\x63\x74\x49\x64\x25\x32\x32\x3a\x25\x32\x32','\x25\x32\x32\x2c\x25\x32\x32\x70\x6c\x61\x74\x66\x6f\x72\x6d\x25\x32\x32\x3a\x34\x2c\x25\x32\x32\x75\x6e\x69\x6f\x6e\x53\x68\x61\x72\x65\x49\x64\x25\x32\x32\x3a\x25\x32\x32\x25\x32\x32\x2c\x25\x32\x32\x64\x25\x32\x32\x3a\x25\x32\x32','\x25\x32\x32\x2c\x25\x32\x32\x73\x75\x70\x70\x6f\x72\x74\x50\x69\x63\x25\x32\x32\x3a\x32\x2c\x25\x32\x32\x73\x75\x70\x70\x6f\x72\x74\x4c\x75\x63\x6b\x79\x43\x6f\x64\x65\x25\x32\x32\x3a\x30\x2c\x25\x32\x32\x65\x69\x64\x25\x32\x32\x3a\x25\x32\x32','\x73\x68\x61\x72\x65\x55\x72\x6c','\u3011\u5206\u4eab\u7801\uff1a','\x6c\x6f\x63\x61\x74\x69\x6f\x6e','\x4c\x6f\x63\x61\x74\x69\x6f\x6e','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f','\x3f\x73\x3d','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x67\x69\x61\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x66\x63\x66\x2e\x68\x74\x6d\x6c\x3f\x61\x3d','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x78\x2d\x77\x77\x77\x2d\x66\x6f\x72\x6d\x2d\x75\x72\x6c\x65\x6e\x63\x6f\x64\x65\x64\x3b\x63\x68\x61\x72\x73\x65\x74\x3d\x55\x54\x46\x2d\x38','\x70\x6f\x73\x74','\x2a\x5f\x2a','\x70\x61\x72\x73\x65','\u4eac\u4e1c\x61\x70\x69\u8fd4\u56de\u6570\u636e\u4e3a\u7a7a\uff0c\u8bf7\u68c0\u67e5\u81ea\u8eab\u539f\u56e0','\x73\x65\x74\x2d\x63\x6f\x6f\x6b\x69\x65','\x53\x65\x74\x2d\x43\x6f\x6f\x6b\x69\x65','\x74\x72\x69\x6d','\x4d\x6f\x7a\x69\x6c\x6c\x61\x2f\x35\x2e\x30\x20\x28\x69\x50\x68\x6f\x6e\x65\x3b\x20\x43\x50\x55\x20\x69\x50\x68\x6f\x6e\x65\x20\x4f\x53\x20\x31\x33\x5f\x32\x5f\x33\x20\x6c\x69\x6b\x65\x20\x4d\x61\x63\x20\x4f\x53\x20\x58\x29\x20\x41\x70\x70\x6c\x65\x57\x65\x62\x4b\x69\x74\x2f\x36\x30\x35\x2e\x31\x2e\x31\x35\x20\x28\x4b\x48\x54\x4d\x4c\x2c\x20\x6c\x69\x6b\x65\x20\x47\x65\x63\x6b\x6f\x29\x20\x56\x65\x72\x73\x69\x6f\x6e\x2f\x31\x33\x2e\x30\x2e\x33\x20\x4d\x6f\x62\x69\x6c\x65\x2f\x31\x35\x45\x31\x34\x38\x20\x53\x61\x66\x61\x72\x69\x2f\x36\x30\x34\x2e\x31','\x53\x48\x41\x31','\x72\x65\x64\x73','\x6a\x64\x61\x70\x70\x3b\x69\x50\x68\x6f\x6e\x65\x3b\x31\x30\x2e\x31\x2e\x34\x3b\x31\x34\x2e\x33\x3b','\x3b\x4d\x2f\x35\x2e\x30\x3b\x6e\x65\x74\x77\x6f\x72\x6b\x2f\x77\x69\x66\x69\x3b\x41\x44\x49\x44\x2f\x3b\x6d\x6f\x64\x65\x6c\x2f\x69\x50\x68\x6f\x6e\x65\x31\x32\x2c\x31\x3b\x61\x64\x64\x72\x65\x73\x73\x69\x64\x2f\x3b\x61\x70\x70\x42\x75\x69\x6c\x64\x2f\x31\x36\x37\x38\x31\x34\x3b\x6a\x64\x53\x75\x70\x70\x6f\x72\x74\x44\x61\x72\x6b\x4d\x6f\x64\x65\x2f\x30\x3b\x4d\x6f\x7a\x69\x6c\x6c\x61\x2f\x35\x2e\x30\x20\x28\x69\x50\x68\x6f\x6e\x65\x3b\x20\x43\x50\x55\x20\x69\x50\x68\x6f\x6e\x65\x20\x4f\x53\x20\x31\x34\x5f\x33\x20\x6c\x69\x6b\x65\x20\x4d\x61\x63\x20\x4f\x53\x20\x58\x29\x20\x41\x70\x70\x6c\x65\x57\x65\x62\x4b\x69\x74\x2f\x36\x30\x35\x2e\x31\x2e\x31\x35\x20\x28\x4b\x48\x54\x4d\x4c\x2c\x20\x6c\x69\x6b\x65\x20\x47\x65\x63\x6b\x6f\x29\x20\x4d\x6f\x62\x69\x6c\x65\x2f\x31\x35\x45\x31\x34\x38\x3b\x73\x75\x70\x70\x6f\x72\x74\x4a\x44\x53\x48\x57\x4b\x2f\x31','\x73\x74\x72\x69\x6e\x67','\u8bf7\u52ff\u968f\u610f\u5728\x42\x6f\x78\x4a\x73\u8f93\u5165\u6846\u4fee\u6539\u5185\u5bb9\x0a\u5efa\u8bae\u901a\u8fc7\u811a\u672c\u53bb\u83b7\u53d6\x63\x6f\x6f\x6b\x69\x65','\x6a\x64\x61\x70\x70\x3b\x69\x50\x68\x6f\x6e\x65\x3b\x31\x30\x2e\x31\x2e\x34\x3b\x31\x34\x2e\x33\x3b\x3b\x4d\x2f\x35\x2e\x30\x3b\x6e\x65\x74\x77\x6f\x72\x6b\x2f\x77\x69\x66\x69\x3b\x41\x44\x49\x44\x2f\x3b\x6d\x6f\x64\x65\x6c\x2f\x69\x50\x68\x6f\x6e\x65\x31\x32\x2c\x31\x3b\x61\x64\x64\x72\x65\x73\x73\x69\x64\x2f\x3b\x61\x70\x70\x42\x75\x69\x6c\x64\x2f\x31\x36\x37\x38\x31\x34\x3b\x6a\x64\x53\x75\x70\x70\x6f\x72\x74\x44\x61\x72\x6b\x4d\x6f\x64\x65\x2f\x30\x3b\x4d\x6f\x7a\x69\x6c\x6c\x61\x2f\x35\x2e\x30\x20\x28\x69\x50\x68\x6f\x6e\x65\x3b\x20\x43\x50\x55\x20\x69\x50\x68\x6f\x6e\x65\x20\x4f\x53\x20\x31\x34\x5f\x33\x20\x6c\x69\x6b\x65\x20\x4d\x61\x63\x20\x4f\x53\x20\x58\x29\x20\x41\x70\x70\x6c\x65\x57\x65\x62\x4b\x69\x74\x2f\x36\x30\x35\x2e\x31\x2e\x31\x35\x20\x28\x4b\x48\x54\x4d\x4c\x2c\x20\x6c\x69\x6b\x65\x20\x47\x65\x63\x6b\x6f\x29\x20\x4d\x6f\x62\x69\x6c\x65\x2f\x31\x35\x45\x31\x34\x38\x3b\x73\x75\x70\x70\x6f\x72\x74\x4a\x44\x53\x48\x57\x4b\x2f\x31','\x64\x61\x6e\x67\x65\x72\x6f\x75\x73\x6c\x79','\x52\x65\x73\x6f\x75\x72\x63\x65\x4c\x6f\x61\x64\x65\x72','\x56\x69\x72\x74\x75\x61\x6c\x43\x6f\x6e\x73\x6f\x6c\x65','\x3c\x62\x6f\x64\x79\x3e\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x3c\x73\x63\x72\x69\x70\x74\x20\x73\x72\x63\x3d\x22\x68\x74\x74\x70\x73\x3a\x2f\x2f\x73\x74\x61\x74\x69\x63\x2e\x33\x36\x30\x62\x75\x79\x69\x6d\x67\x2e\x63\x6f\x6d\x2f\x73\x69\x74\x65\x70\x70\x53\x74\x61\x74\x69\x63\x2f\x73\x63\x72\x69\x70\x74\x2f\x6d\x65\x73\x63\x72\x6f\x6c\x6c\x2f\x6d\x61\x70\x2e\x6a\x73\x22\x3e\x3c\x2f\x73\x63\x72\x69\x70\x74\x3e\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x3c\x73\x63\x72\x69\x70\x74\x20\x73\x72\x63\x3d\x22\x68\x74\x74\x70\x73\x3a\x2f\x2f\x73\x74\x6f\x72\x61\x67\x65\x2e\x33\x36\x30\x62\x75\x79\x69\x6d\x67\x2e\x63\x6f\x6d\x2f\x77\x65\x62\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72\x2f\x6a\x73\x5f\x73\x65\x63\x75\x72\x69\x74\x79\x5f\x76\x33\x2e\x6a\x73\x22\x3e\x3c\x2f\x73\x63\x72\x69\x70\x74\x3e\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x3c\x73\x63\x72\x69\x70\x74\x20\x73\x72\x63\x3d\x22\x68\x74\x74\x70\x73\x3a\x2f\x2f\x73\x74\x61\x74\x69\x63\x2e\x33\x36\x30\x62\x75\x79\x69\x6d\x67\x2e\x63\x6f\x6d\x2f\x73\x69\x74\x65\x70\x70\x53\x74\x61\x74\x69\x63\x2f\x73\x63\x72\x69\x70\x74\x2f\x75\x74\x69\x6c\x73\x2e\x6a\x73\x22\x3e\x3c\x2f\x73\x63\x72\x69\x70\x74\x3e\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x3c\x2f\x62\x6f\x64\x79\x3e','\x77\x69\x6e\x64\x6f\x77','\x6c\x6f\x63\x61\x6c\x53\x74\x6f\x72\x61\x67\x65','\x73\x65\x74\x49\x74\x65\x6d','\x57\x51\x5f\x5f\x64\x79\x5f\x74\x6b\x5f\x73\x5f','\x57\x51\x5f\x5f\x64\x79\x5f\x61\x6c\x67\x6f\x5f\x73\x5f','\x57\x51\x5f\x71\x65\x5f','\x73\x69\x67\x6e\x57\x61\x61\x70','\x66\x75\x6e\x63\x74\x69\x6f\x6e','\x67\x65\x74\x49\x74\x65\x6d','\x6c\x74\x72','\x64\x6f\x63\x75\x6d\x65\x6e\x74','\x5f\x5f\x6a\x64\x63\x3d\x31\x32\x33\x3b','\x70\x72\x6f\x64\x65\x76\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d','\x6e\x61\x76\x69\x67\x61\x74\x6f\x72','\x68\x72\x65\x66','\x68\x72\x65\x66\x73','\x63\x6f\x6f\x6b\x69\x65\x73','\x75\x73\x65\x72\x41\x67\x65\x6e\x74','\x75\x73\x65\x72\x41\x67\x65\x6e\x74\x73','\x72\x6f\x75\x6e\x64','\x32\x30\x32\x32\x2d\x30\x39\x2d\x30\x32','\x5f\x5f\x6a\x64\x61','\x5f\x5f\x6a\x64\x62','\x5f\x5f\x6a\x64\x76','\x5f\x5f\x6a\x64\x63','\x67\x65\x74\x43\x6f\x6f\x6b\x69\x65','\x63\x6b\x4a\x64\x61','\x63\x6b\x4a\x64\x62','\x63\x6b\x4a\x64\x76','\x63\x6b\x4a\x64\x63','\x64\x69\x72\x65\x63\x74','\x6e\x6f\x6e\x65','\x73\x75\x62\x73\x74\x72','\x67\x65\x6e\x55\x75\x69\x64','\x75\x75\x69\x64','\x67\x65\x74\x50\x61\x72\x61\x6d\x65\x74\x65\x72','\x75\x74\x6d\x5f\x73\x6f\x75\x72\x63\x65','\x75\x74\x6d\x5f\x63\x61\x6d\x70\x61\x69\x67\x6e','\x75\x74\x6d\x5f\x6d\x65\x64\x69\x75\x6d','\x75\x74\x6d\x5f\x74\x65\x72\x6d','\x72\x65\x66\x55\x72\x6c','\x63\x6b\x44\x6f\x6d\x61\x69\x6e','\x73\x65\x6f','\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65','\x6f\x72\x67\x61\x6e\x69\x63','\x6e\x6f\x74\x20\x73\x65\x74','\x7a\x6f\x6c\x2e\x63\x6f\x6d\x2e\x63\x6e','\x63\x70\x63','\x72\x65\x66\x65\x72\x72\x61\x6c','\x67\x65\x74\x50\x61\x67\x65\x50\x61\x72\x61\x6d\x46\x72\x6f\x6d\x53\x64\x6b','\x76\x74\x73','\x73\x65\x71','\x67\x65\x6e\x48\x61\x73\x68','\x73\x65\x74\x43\x6f\x6f\x6b\x69\x65','\x6a\x6f\x69\x6e','\x63\x6b\x4a\x64\x61\x45\x78\x70','\x63\x6b\x4a\x64\x62\x45\x78\x70','\x73\x65\x74\x4a\x64\x76','\x6d\x62\x61\x5f\x73\x69\x64','\x6d\x62\x61\x5f\x6d\x75\x69\x64','\x72\x70\x44\x6f\x6d\x61\x69\x6e','\x75\x72\x61\x6e\x75\x73\x2e\x6a\x64\x2e\x63\x6f\x6d','\x6c\x6f\x67\x55\x72\x6c','\x2f\x6c\x6f\x67\x2f\x6d','\x6c\x6f\x67\x54\x79\x70\x65','\x30\x30\x30\x30\x30\x31','\x75\x73\x65\x54\x6d\x70\x43\x6f\x6f\x6b\x69\x65','\x5f\x5f\x74\x72\x61','\x5f\x5f\x74\x72\x62','\x5f\x5f\x74\x72\x63','\x63\x6b\x4a\x64\x75','\x5f\x5f\x74\x72\x75','\x5f\x5f\x6a\x64\x75','\x63\x6b\x57\x78\x41\x70\x70\x43\x6b','\x5f\x5f\x6a\x64\x77\x78\x61\x70\x70','\x63\x6b\x52\x65\x66\x43\x6c\x73','\x5f\x5f\x6a\x64\x5f\x72\x65\x66\x5f\x63\x6c\x73','\x63\x6b\x4a\x64\x75\x45\x78\x70','\x63\x6b\x4a\x64\x76\x45\x78\x70','\x63\x6b\x4a\x64\x76\x45\x6d\x62\x65\x64\x64\x65\x64\x45\x78\x70','\x63\x6b\x57\x78\x41\x70\x70\x43\x6b\x45\x78\x70','\x6d\x74\x53\x75\x62\x73\x69\x74\x65\x45\x78\x70','\x64\x6f\x6d\x61\x69\x6e','\x74\x69\x74\x6c\x65','\x72\x65\x66\x65\x72\x72\x65\x72','\x69\x2e\x65\x61\x73\x6f\x75\x2e\x63\x6f\x6d\x3a\x71','\x6d\x2e\x62\x61\x69\x64\x75\x2e\x63\x6f\x6d\x3a\x77\x6f\x72\x64','\x6d\x2e\x73\x6d\x2e\x63\x6e\x3a\x71','\x6d\x2e\x73\x6f\x2e\x63\x6f\x6d\x3a\x71','\x77\x61\x70\x2e\x73\x6f\x67\x6f\x75\x2e\x63\x6f\x6d\x3a\x6b\x65\x79\x77\x6f\x72\x64','\x6d\x2e\x73\x6f\x67\x6f\x75\x2e\x63\x6f\x6d\x3a\x6b\x65\x79\x77\x6f\x72\x64','\x77\x61\x70\x2e\x73\x6f\x67\x6f\x2e\x63\x6f\x6d\x3a\x6b\x65\x79\x77\x6f\x72\x64','\x6d\x2e\x73\x6f\x67\x6f\x2e\x63\x6f\x6d\x3a\x6b\x65\x79\x77\x6f\x72\x64','\x70\x61\x67\x65\x2e\x72\x6f\x62\x6f\x6f\x2e\x63\x6f\x6d\x3a\x71','\x61\x73\x6b\x2e\x63\x6f\x6d\x3a\x71','\x62\x61\x69\x64\x75\x3a\x77\x6f\x72\x64','\x62\x61\x69\x64\x75\x3a\x77\x64','\x62\x69\x6e\x67\x3a\x71','\x65\x61\x73\x6f\x75\x3a\x71','\x67\x6f\x6f\x67\x6c\x65\x3a\x71','\x72\x6f\x62\x6f\x6f\x3a\x77\x6f\x72\x64','\x72\x6f\x62\x6f\x6f\x3a\x71','\x73\x6d\x2e\x63\x6e\x3a\x71','\x73\x6f\x2e\x63\x6f\x6d\x3a\x71','\x73\x6f\x67\x6f\x75\x3a\x6b\x65\x79\x77\x6f\x72\x64','\x73\x6f\x67\x6f\x75\x3a\x71\x75\x65\x72\x79','\x73\x6f\x67\x6f\x2e\x63\x6f\x6d\x3a\x6b\x65\x79\x77\x6f\x72\x64','\x73\x6f\x67\x6f\x2e\x63\x6f\x6d\x3a\x71\x75\x65\x72\x79','\x79\x61\x68\x6f\x6f\x3a\x70','\x79\x61\x6e\x64\x65\x78\x3a\x74\x65\x78\x74','\x79\x69\x63\x68\x61\x3a\x6b\x65\x79','\x73\x65\x74\x54\x69\x6d\x65','\x3b\x65\x78\x70\x69\x72\x65\x73\x3d','\x74\x6f\x47\x4d\x54\x53\x74\x72\x69\x6e\x67','\x69\x73\x50\x72\x65\x79','\x7c\x64\x69\x72\x65\x63\x74\x7c\x2d\x7c\x6e\x6f\x6e\x65\x7c\x2d\x7c','\x69\x73\x45\x6d\x62\x65\x64\x64\x65\x64','\x28\x5e\x7c\x20\x29','\x3d\x28\x5b\x5e\x3b\x5d\x2a\x29\x28\x3b\x7c\x24\x29','\x75\x72\x6c\x44\x65\x63\x6f\x64\x65','\x28\x3f\x3a\x5e\x7c\x26\x7c\x5b\x3f\x5d\x7c\x5b\x2f\x5d\x29','\x3d\x28\x5b\x5e\x26\x5d\x2a\x29','\x65\x78\x65\x63','\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74','\x69\x73\x4a\x64\x4c\x6f\x67','\x3b\x6a\x64\x6c\x6f\x67\x3b','\x4a\x44\x4d\x41\x55\x6e\x69\x66\x79\x42\x72\x69\x64\x67\x65','\x4a\x44\x4d\x41\x47\x65\x74\x4d\x50\x61\x67\x65\x50\x61\x72\x61\x6d','\x77\x65\x62\x6b\x69\x74','\x6d\x65\x73\x73\x61\x67\x65\x48\x61\x6e\x64\x6c\x65\x72\x73','\x4a\x44\x4d\x41\x53\x65\x74\x4d\x50\x61\x67\x65\x50\x61\x72\x61\x6d','\x70\x72\x6f\x6d\x70\x74','\x67\x65\x74\x4d\x6f\x6e\x74\x68','\x67\x65\x74\x44\x61\x74\x65','\x67\x65\x74\x48\x6f\x75\x72\x73','\x67\x65\x74\x4d\x69\x6e\x75\x74\x65\x73','\x67\x65\x74\x53\x65\x63\x6f\x6e\x64\x73','\x66\x6c\x6f\x6f\x72','\x67\x65\x74\x4d\x69\x6c\x6c\x69\x73\x65\x63\x6f\x6e\x64\x73','\x67\x65\x74\x46\x75\x6c\x6c\x59\x65\x61\x72','\x4d\x6f\x7a\x69\x6c\x6c\x61\x2f\x35\x2e\x30\x20\x28\x69\x50\x68\x6f\x6e\x65\x3b\x20\x43\x50\x55\x20\x69\x50\x68\x6f\x6e\x65\x20\x4f\x53\x20\x31\x33\x5f\x32\x5f\x33\x20\x6c\x69\x6b\x65\x20\x4d\x61\x63\x20\x4f\x53\x20\x58\x29\x20\x41\x70\x70\x6c\x65\x57\x65\x62\x4b\x69\x74\x2f\x36\x30\x35\x2e\x31\x2e\x31\x35\x20\x28\x4b\x48\x54\x4d\x4c\x2c\x20\x6c\x69\x6b\x65\x20\x47\x65\x63\x6b\x6f\x29\x20\x56\x65\x72\x73\x69\x6f\x6e\x2f\x31\x33\x2e\x30\x2e\x33\x20\x4d\x6f\x62\x69\x6c\x65\x2f\x31\x35\x45\x31\x34\x38\x20\x53\x61\x66\x61\x72\x69\x2f\x36\x30\x34\x2e\x31\x20\x45\x64\x67\x2f\x38\x37\x2e\x30\x2e\x34\x32\x38\x30\x2e\x38\x38','\x72\x77\x72\x6a\x4d\x73\x6a\x53\x69\x46\x61\x6d\x42\x66\x69\x2e\x70\x63\x71\x67\x49\x66\x6f\x6d\x2e\x6b\x76\x71\x36\x3d\x3d'];function Iil1Il(_0x360bef,_0x56e468){_0x360bef=~~'0x'['concat'](_0x360bef['slice'](0x0));var _0x41fd97=i1l1i[_0x360bef];return _0x41fd97;};(function(_0x5e0acd,_0x5d3c43){var _0x42f674=0x0;for(_0x5d3c43=_0x5e0acd['shift'](_0x42f674>>0x2);_0x5d3c43&&_0x5d3c43!==(_0x5e0acd['pop'](_0x42f674>>0x3)+'')['replace'](/[rwrMSFBfpqgIfkq=]/g,'');_0x42f674++){_0x42f674=_0x42f674^0x11e944;}}(i1l1i,Iil1Il));const jdCookieNode=$[Iil1Il('0')]()?require(Iil1Il('1')):'';const notify=$[Iil1Il('0')]()?require(Iil1Il('2')):'';const jsdom=require(Iil1Il('3'));$[Iil1Il('4')]=require(Iil1Il('5'));let cookiesArr=[],cookie='';if($[Iil1Il('0')]()){Object[Iil1Il('6')](jdCookieNode)[Iil1Il('7')](I1lli1=>{cookiesArr[Iil1Il('8')](jdCookieNode[I1lli1]);});if(process[Iil1Il('9')][Iil1Il('a')]&&process[Iil1Il('9')][Iil1Il('a')]===Iil1Il('b'))console[Iil1Il('c')]=()=>{};}else{cookiesArr=[$[Iil1Il('d')](Iil1Il('e')),$[Iil1Il('d')](Iil1Il('f')),...jsonParse($[Iil1Il('d')](Iil1Il('10'))||'\x5b\x5d')[Iil1Il('11')](IlI1i=>IlI1i[Iil1Il('12')])][Iil1Il('13')](Iii11i=>!!Iii11i);}let rebateCodes='';let rebatePin='';let redTimes=0x0;$[Iil1Il('14')]=parseInt($[Iil1Il('14')],0xa)||0x0;let iiIii1l1=rebatePin&&rebatePin[Iil1Il('15')]('\x2c')||[];rebateCode=rebateCodes+'';$[Iil1Il('16')](Iil1Il('17'));message='';newCookie='';resMsg='';$[Iil1Il('18')]='';$[Iil1Il('19')]=![];$[Iil1Il('1a')]=![];let Ii111Ii={};$[Iil1Il('1b')]={};$[Iil1Il('1c')]={};let krflCode=null;if($[Iil1Il('0')]()&&process[Iil1Il('9')][Iil1Il('1d')]){krflCode=process[Iil1Il('9')][Iil1Il('1d')];}let iIl11111=null;const lilI1lI=Iil1Il('1e');let IIi1l1I=new Date()[Iil1Il('1f')]()+new Date()[Iil1Il('20')]()*0x3c*0x3e8+0x8*0x3c*0x3c*0x3e8;let I1lIIi1I=$[Iil1Il('16')]('\x48',IIi1l1I);$[Iil1Il('21')]={};lr={};$[Iil1Il('22')]='';let II1iIilI='';let I1Iii='';$[Iil1Il('16')](Iil1Il('23'));iliIIlI();!(async()=>{if(!cookiesArr[0x0]){$[Iil1Il('24')]($[Iil1Il('25')],Iil1Il('26'),Iil1Il('27'),{'open-url':Iil1Il('27')});return;}if(IIi1l1I>new Date(lilI1lI)[Iil1Il('1f')]()){$[Iil1Il('24')]($[Iil1Il('25')],Iil1Il('28'),Iil1Il('29'));$[Iil1Il('2a')]('',Iil1Il('2b'));$[Iil1Il('2a')]('',Iil1Il('2c'));$[Iil1Il('2a')]('',Iil1Il('2d'));return;}$[Iil1Il('2e')]={};$[Iil1Il('2f')]=$[Iil1Il('d')](Iil1Il('2d'))||{};$[Iil1Il('30')]='';$[Iil1Il('31')]=![];authorCodeList=await getAuthorCodeList(Iil1Il('32'));if($[Iil1Il('33')]==![]){let Iii11l=Iil1Il('34');authorCodeList=Buffer[Iil1Il('35')](Iii11l,Iil1Il('36'))[Iil1Il('37')]()[Iil1Il('15')]('\x2c');}let iii1II=![];await lIi1III();if($[Iil1Il('38')])return;for(let Iil1Ii=0x0;Iil1Ii<cookiesArr[Iil1Il('39')]&&!$[Iil1Il('1a')];Iil1Ii++){if($[Iil1Il('19')])break;cookie=cookiesArr[Iil1Ii];if(cookie){$[Iil1Il('3a')]=decodeURIComponent(cookie[Iil1Il('3b')](/pt_pin=([^; ]+)(?=;?)/)&&cookie[Iil1Il('3b')](/pt_pin=([^; ]+)(?=;?)/)[0x1]);$[Iil1Il('3c')]=Iil1Ii+0x1;if($[Iil1Il('1c')][$[Iil1Il('3a')]])continue;console[Iil1Il('c')](Iil1Il('3d')+$[Iil1Il('3c')]+'\u3011'+($[Iil1Il('3e')]||$[Iil1Il('3a')])+Iil1Il('3f'));let I1iIlI=0x1;if(!cookie[Iil1Il('40')](Iil1Il('41'))){I1iIlI=0x2;}await il1l1iii(I1iIlI);await liiiii1();if($[Iil1Il('3c')]%0x5==0x0)await $[Iil1Il('42')](parseInt(Math[Iil1Il('43')]()*0x7d0+0x1388,0xa));if($[Iil1Il('19')])break;}$[Iil1Il('2a')]($[Iil1Il('2f')],Iil1Il('2d'));}$[Iil1Il('2a')]($[Iil1Il('2f')],Iil1Il('2d'));})()[Iil1Il('44')](iIIIII=>$[Iil1Il('45')](iIIIII))[Iil1Il('46')](()=>{if(iIl11111)iIl11111[Iil1Il('47')]();$[Iil1Il('48')]();});async function liiiii1(lI1IlI=0x0){try{krrebateCode=krflCode?krflCode:authorCodeList[random(0x0,authorCodeList[Iil1Il('39')])];rebateCode=krrebateCode;if(krflCode!=null){console[Iil1Il('c')](Iil1Il('49')+rebateCode);}$[Iil1Il('22')]=$[Iil1Il('21')][$[Iil1Il('3a')]]||'';if(!$[Iil1Il('22')]){iliIIlI();}resMsg='';let lilIl1=![];let i1l1ii=0x0;let i1l1=0x0;let IIII1i=0x0;$[Iil1Il('4a')]=!![];do{if(i1l1>0x2)i1l1ii=0x0;$[Iil1Il('4b')]=0x0;newCookie='';$[Iil1Il('4c')]='';await lIliIII();if(!$[Iil1Il('4c')]){console[Iil1Il('c')](Iil1Il('4d'));$[Iil1Il('38')]=!![];break;}$[Iil1Il('4e')]='';$[Iil1Il('22')]=II1iIilI[Iil1Il('4f')]('','',$[Iil1Il('4c')],$[Iil1Il('22')]);$[Iil1Il('21')][$[Iil1Il('3a')]]=$[Iil1Il('22')]+'';await ll1l1lIl();if(!$[Iil1Il('4e')]){console[Iil1Il('c')](Iil1Il('50'));break;}if(!/unionActId=\d+/[Iil1Il('51')]($[Iil1Il('4e')])&&!new RegExp(Iil1Il('52')+rebateCode)[Iil1Il('51')]($[Iil1Il('4e')])){console[Iil1Il('c')](Iil1Il('53')+rebateCode+Iil1Il('54'));$[Iil1Il('1a')]=!![];return;}if(!$[Iil1Il('4e')])$[Iil1Il('4e')]=Iil1Il('55')+rebateCode+Iil1Il('56');$[Iil1Il('57')]=$[Iil1Il('4e')][Iil1Il('3b')](/mall\/active\/([^\/]+)\/index\.html/)&&$[Iil1Il('4e')][Iil1Il('3b')](/mall\/active\/([^\/]+)\/index\.html/)[0x1]||Iil1Il('58');$[Iil1Il('22')]=II1iIilI[Iil1Il('4f')]('','',$[Iil1Il('4e')],$[Iil1Il('22')]);$[Iil1Il('21')][$[Iil1Il('3a')]]=$[Iil1Il('22')]+'';$[Iil1Il('59')]='';if(!$[Iil1Il('59')]){$[Iil1Il('59')]=-0x1;}if(lI1IlI==0x0){let IiilI1=0x0;let IIII1l=!![];let i1ili1=0x0;if(Object[Iil1Il('5a')](Ii111Ii)[Iil1Il('39')]>i1l1ii&&$[Iil1Il('4a')]){for(let i1l1l1 in Ii111Ii||{}){if(i1l1l1==$[Iil1Il('3a')]){$[Iil1Il('4b')]=0x1;continue;}if(IiilI1==i1l1ii){$[Iil1Il('4b')]=0x0;$[Iil1Il('30')]=Ii111Ii[i1l1l1]||'';if($[Iil1Il('2f')][i1l1l1]&&$[Iil1Il('2f')][i1l1l1][Iil1Il('40')]($[Iil1Il('3a')])){i1ili1++;continue;}if($[Iil1Il('30')][Iil1Il('5b')]>=$[Iil1Il('2e')][Iil1Il('14')]){i1ili1++;continue;}$[Iil1Il('5c')]=![];if($[Iil1Il('30')])console[Iil1Il('c')](Iil1Il('5d')+i1l1l1+'\x5d');let IlI1I=await I1I1i1($[Iil1Il('30')][Iil1Il('5e')],0x1);if(/重复助力/[Iil1Il('51')](IlI1I)){if(!$[Iil1Il('2f')][i1l1l1])$[Iil1Il('2f')][i1l1l1]=[];$[Iil1Il('2f')][i1l1l1][Iil1Il('8')]($[Iil1Il('3a')]);i1l1ii--;IIII1i--;}else if(/助力/[Iil1Il('51')](IlI1I)&&/上限/[Iil1Il('51')](IlI1I)){$[Iil1Il('4a')]=![];}else if(!/领取上限/[Iil1Il('51')](IlI1I)&&$[Iil1Il('5c')]==!![]){if(!$[Iil1Il('2f')][i1l1l1])$[Iil1Il('2f')][i1l1l1]=[];if(!$[Iil1Il('2f')][i1l1l1][Iil1Il('40')]($[Iil1Il('3a')])){$[Iil1Il('2f')][i1l1l1][Iil1Il('8')]($[Iil1Il('3a')]);}i1l1ii--;}else{IIII1l=![];}}IiilI1++;}}if(IIII1l&&i1ili1==Object[Iil1Il('5a')](Ii111Ii)[Iil1Il('39')]){lilIl1=!![];}if(IiilI1==0x0){$[Iil1Il('5c')]=![];let II11Ii=await I1I1i1('',0x1);if(!/领取上限/[Iil1Il('51')](II11Ii)&&$[Iil1Il('5c')]==!![]){i1l1ii--;}}if($[Iil1Il('19')])break;}else{let II11Il=await l1l1IIIi();if(!$[Iil1Il('19')]&&II11Il&&$[Iil1Il('31')]==![])await lil11Iil();if($[Iil1Il('31')]==![])break;}if($[Iil1Il('31')]==!![]&&i1l1<0x1){i1l1++;$[Iil1Il('31')]=![];}i1l1ii++;IIII1i++;if($[Iil1Il('4b')]==0x1){await $[Iil1Il('42')](parseInt(Math[Iil1Il('43')]()*0x1f4+0x64,0xa));}if(redTimes>0x0&&redTimes<=IIII1i)break;}while($[Iil1Il('4b')]==0x1&&i1l1ii<0x5);if($[Iil1Il('19')])return;if(resMsg){message+=Iil1Il('5f')+$[Iil1Il('3c')]+'\u3011\x0a'+resMsg;}if(lilIl1){console[Iil1Il('c')](Iil1Il('60'));await lIi1III(0x1);}await $[Iil1Il('42')](parseInt(Math[Iil1Il('43')]()*0x1f4+0xc8,0xa));}catch(IlI11){console[Iil1Il('c')](IlI11);}}async function lIi1III(iIIIIl=0x0){try{let II1Il=0x2;if(iIIIIl==0x1)II1Il=0x1;let lilIlI=0x0;for(let iIIIIi in $[Iil1Il('2e')]||{}){if(iIIIIi===Iil1Il('4b')||iIIIIi===Iil1Il('61')||iIIIIi===Iil1Il('14'))continue;if($[Iil1Il('2e')][iIIIIi]&&$[Iil1Il('2e')][Iil1Il('14')]&&$[Iil1Il('2e')][iIIIIi][Iil1Il('5b')]<$[Iil1Il('2e')][Iil1Il('14')])lilIlI++;}for(let iii1I1=0x0;iii1I1<cookiesArr[Iil1Il('39')]&&!$[Iil1Il('1a')];iii1I1++){cookie=cookiesArr[iii1I1];if(cookie){$[Iil1Il('3a')]=decodeURIComponent(cookie[Iil1Il('3b')](/pt_pin=([^; ]+)(?=;?)/)&&cookie[Iil1Il('3b')](/pt_pin=([^; ]+)(?=;?)/)[0x1]);if(iiIii1l1[Iil1Il('39')]>0x0&&iiIii1l1[Iil1Il('62')]($[Iil1Il('3a')])==-0x1||$[Iil1Il('2e')][$[Iil1Il('3a')]])continue;$[Iil1Il('3c')]=iii1I1+0x1;await il1l1iii();await liiiii1(0x1);let II1Ii=0x0;for(let iIIIIi in $[Iil1Il('2e')]||{}){if(iIIIIi===Iil1Il('4b')||iIIIIi===Iil1Il('61')||iIIIIi===Iil1Il('14'))continue;if($[Iil1Il('2e')][iIIIIi]&&$[Iil1Il('2e')][Iil1Il('14')]&&$[Iil1Il('2e')][iIIIIi][Iil1Il('5b')]<$[Iil1Il('2e')][Iil1Il('14')])II1Ii++;}if($[Iil1Il('19')]||II1Ii-lilIlI>=II1Il||$[Iil1Il('38')])break;}}}catch(I1iIl1){console[Iil1Il('c')](I1iIl1);}if(Object[Iil1Il('5a')]($[Iil1Il('2e')])[Iil1Il('39')]>0x0){for(let i1il in $[Iil1Il('2e')]||{}){if(i1il===Iil1Il('4b')||i1il===Iil1Il('61')||i1il===Iil1Il('14'))continue;if($[Iil1Il('2e')][i1il])Ii111Ii[i1il]=$[Iil1Il('2e')][i1il];}}}function I1I1i1(lI1Il1='',lilIi1=0x1){return new Promise(async IiilII=>{$[Iil1Il('22')]=II1iIilI[Iil1Il('4f')]('','',$[Iil1Il('4e')],$[Iil1Il('22')]);$[Iil1Il('21')][$[Iil1Il('3a')]]=$[Iil1Il('22')]+'';let IliI1I='';let lI1Iii=new Date()[Iil1Il('1f')]()+new Date()[Iil1Il('20')]()*0x3c*0x3e8+0x8*0x3c*0x3c*0x3e8;let i1li=0x1;if($[Iil1Il('16')]('\x48',lI1Iii)=='\x32\x30'){i1li=0x4;}const li1II={'platform':i1li,'unionActId':Iil1Il('63'),'actId':$[Iil1Il('57')],'d':rebateCode,'unionShareId':lI1Il1,'type':lilIi1,'eid':$[Iil1Il('59')]};const IliI11={'appid':'\x75','body':li1II,'client':Iil1Il('64'),'clientVersion':Iil1Il('65'),'functionId':Iil1Il('66')};IliI1I=await iiIilIlI(Iil1Il('67'),IliI11);IliI1I=encodeURIComponent(IliI1I);let i1ll='';let i1l1lI={'url':Iil1Il('68')+lI1Iii+Iil1Il('69')+encodeURIComponent($[Iil1Il('6a')](li1II))+Iil1Il('6b')+IliI1I,'headers':{'accept':Iil1Il('6c'),'Accept-Language':Iil1Il('6d'),'Accept-Encoding':Iil1Il('6e'),'Cookie':''+$[Iil1Il('22')]+newCookie+'\x20'+cookie,'origin':Iil1Il('6f'),'Referer':Iil1Il('70'),'User-Agent':$['\x55\x41']}};if($[Iil1Il('4e')])i1l1lI[Iil1Il('71')][Iil1Il('72')]=$[Iil1Il('4e')];$[Iil1Il('73')](i1l1lI,async(i1iliI,I1iIii,IllII1)=>{try{if(i1iliI){console[Iil1Il('c')](''+$[Iil1Il('6a')](i1iliI));console[Iil1Il('c')]($[Iil1Il('25')]+Iil1Il('74'));}else{let I1iIil=$[Iil1Il('75')](IllII1,IllII1);if(typeof I1iIil==Iil1Il('76')){if(I1iIil[Iil1Il('24')]){i1ll=I1iIil[Iil1Il('24')];console[Iil1Il('c')](I1iIil[Iil1Il('24')]);}if(I1iIil[Iil1Il('24')][Iil1Il('62')](Iil1Il('77'))>-0x1&&lilIi1==0x1)$[Iil1Il('31')]=!![];if(I1iIil[Iil1Il('24')][Iil1Il('62')](Iil1Il('78'))===-0x1&&I1iIil[Iil1Il('24')][Iil1Il('62')]('\u767b\u5f55')===-0x1){if(lilIi1==0x1)$[Iil1Il('4b')]=0x1;}if(I1iIil[Iil1Il('24')][Iil1Il('62')](Iil1Il('28'))>-0x1||I1iIil[Iil1Il('24')][Iil1Il('62')](Iil1Il('79'))>-0x1){$[Iil1Il('19')]=!![];return;}if(lI1Il1&&typeof I1iIil[Iil1Il('7a')]!==Iil1Il('7b')&&typeof I1iIil[Iil1Il('7a')][Iil1Il('7c')]!==Iil1Il('7b')){console[Iil1Il('c')]('\u5f53\u524d'+I1iIil[Iil1Il('7a')][Iil1Il('7d')]+'\x3a'+I1iIil[Iil1Il('7a')][Iil1Il('7c')]);}if(I1iIil[Iil1Il('5e')]==0x0&&I1iIil[Iil1Il('7a')]){if(lilIi1==0x1)$[Iil1Il('30')][Iil1Il('5b')]++;let lI1Iil='';for(let lilIiI of I1iIil[Iil1Il('7a')][Iil1Il('7e')]){if(lilIiI[Iil1Il('7f')]==0x1){$[Iil1Il('5c')]=!![];lI1Iil+=(lI1Iil?'\x0a':'')+Iil1Il('80')+lilIiI[Iil1Il('81')]+Iil1Il('82')+$[Iil1Il('16')](Iil1Il('23'),lilIiI[Iil1Il('83')])+'\x20'+$[Iil1Il('16')](Iil1Il('23'),lilIiI[Iil1Il('84')]);}else if(lilIiI[Iil1Il('7f')]==0x3){$[Iil1Il('5c')]=!![];lI1Iil+=(lI1Iil?'\x0a':'')+Iil1Il('85')+lilIiI[Iil1Il('86')]+'\u51cf'+lilIiI[Iil1Il('81')]+Iil1Il('87')+$[Iil1Il('16')](Iil1Il('23'),lilIiI[Iil1Il('83')])+'\x20'+$[Iil1Il('16')](Iil1Il('23'),lilIiI[Iil1Il('84')]);}else if(lilIiI[Iil1Il('7f')]==0x6){$[Iil1Il('5c')]=!![];lI1Iil+=(lI1Iil?'\x0a':'')+Iil1Il('88')+lilIiI[Iil1Il('86')]+'\u6253'+lilIiI[Iil1Il('81')]*0xa+Iil1Il('89')+$[Iil1Il('16')](Iil1Il('23'),lilIiI[Iil1Il('83')])+'\x20'+$[Iil1Il('16')](Iil1Il('23'),lilIiI[Iil1Il('84')]);}else{$[Iil1Il('5c')]=!![];lI1Iil+=(lI1Iil?'\x0a':'')+Iil1Il('8a')+(lilIiI[Iil1Il('86')]||'')+'\x20'+lilIiI[Iil1Il('81')]+Iil1Il('87')+$[Iil1Il('16')](Iil1Il('23'),lilIiI[Iil1Il('83')])+'\x20'+$[Iil1Il('16')](Iil1Il('23'),lilIiI[Iil1Il('84')]);console[Iil1Il('c')](lilIiI);}}if(lI1Iil){resMsg+=lI1Iil+'\x0a';console[Iil1Il('c')](lI1Iil);}}if(lilIi1==0x1&&typeof I1iIil[Iil1Il('7a')]!==Iil1Il('7b')&&typeof I1iIil[Iil1Il('7a')][Iil1Il('8b')]!==Iil1Il('7b')&&typeof I1iIil[Iil1Il('7a')][Iil1Il('8b')][Iil1Il('8c')]!==Iil1Il('7b')){for(let i1l1I of I1iIil[Iil1Il('7a')][Iil1Il('8b')][Iil1Il('8c')]||[]){if(i1l1I[Iil1Il('8d')]==0x2){console[Iil1Il('c')](Iil1Il('8e')+i1l1I[Iil1Il('8f')]+Iil1Il('90'));await $[Iil1Il('42')](parseInt(Math[Iil1Il('43')]()*0x7d0+0x7d0,0xa));await I1I1i1('',0x2);}}}}else{console[Iil1Il('c')](IllII1);}}}catch(IiilIi){$[Iil1Il('45')](IiilIi,I1iIii);}finally{IiilII(i1ll);}});});}function l1l1IIIi(IiilIl=''){let iii1Ii=!![];return new Promise(iii1Il=>{$[Iil1Il('22')]=II1iIilI[Iil1Il('4f')]('','',$[Iil1Il('4e')],$[Iil1Il('22')]);$[Iil1Il('21')][$[Iil1Il('3a')]]=$[Iil1Il('22')]+'';let lI1IiI=new Date()[Iil1Il('1f')]()+new Date()[Iil1Il('20')]()*0x3c*0x3e8+0x8*0x3c*0x3c*0x3e8;let i1lI=0x1;if($[Iil1Il('16')]('\x48',lI1IiI)=='\x32\x30'){i1lI=0x4;}let IlI1l={'url':Iil1Il('91')+Date[Iil1Il('92')]()+Iil1Il('93')+$[Iil1Il('57')]+Iil1Il('94')+$[Iil1Il('95')]+Iil1Il('96')+i1lI+Iil1Il('97')+($[Iil1Il('18')]?Iil1Il('98')+$[Iil1Il('18')]+'\x2c':'')+Iil1Il('99')+rebateCode+Iil1Il('9a')+$[Iil1Il('59')]+Iil1Il('9b'),'headers':{'accept':Iil1Il('6c'),'Accept-Language':Iil1Il('6d'),'Accept-Encoding':Iil1Il('6e'),'Cookie':''+$[Iil1Il('22')]+newCookie+'\x20'+cookie,'origin':Iil1Il('6f'),'Referer':Iil1Il('70'),'User-Agent':$['\x55\x41']}};if($[Iil1Il('4e')])IlI1l[Iil1Il('71')][Iil1Il('72')]=$[Iil1Il('4e')];$[Iil1Il('73')](IlI1l,async(lilIil,i1l11,i1l1li)=>{try{if(lilIil){console[Iil1Il('c')](''+$[Iil1Il('6a')](lilIil));console[Iil1Il('c')]($[Iil1Il('25')]+Iil1Il('74'));}else{let i1ilii=$[Iil1Il('75')](i1l1li,i1l1li);if(typeof i1ilii==Iil1Il('76')){if(i1ilii[Iil1Il('24')])console[Iil1Il('c')](i1ilii[Iil1Il('24')]);if(i1ilii[Iil1Il('24')][Iil1Il('62')](Iil1Il('77'))>-0x1)$[Iil1Il('31')]=!![];if(i1ilii[Iil1Il('24')][Iil1Il('62')](Iil1Il('78'))>-0x1)$[Iil1Il('1c')][$[Iil1Il('3a')]]=!![];if(i1ilii[Iil1Il('24')][Iil1Il('62')]('\u4e0a\u9650')===-0x1&&i1ilii[Iil1Il('24')][Iil1Il('62')]('\u767b\u5f55')===-0x1){$[Iil1Il('4b')]=0x1;}if(i1ilii[Iil1Il('24')][Iil1Il('62')](Iil1Il('28'))>-0x1||i1ilii[Iil1Il('24')][Iil1Il('62')](Iil1Il('79'))>-0x1){$[Iil1Il('19')]=!![];return;}if(i1ilii[Iil1Il('7a')][Iil1Il('18')])$[Iil1Il('18')]=i1ilii[Iil1Il('7a')][Iil1Il('18')];if(typeof i1ilii[Iil1Il('7a')]!==Iil1Il('7b')&&typeof i1ilii[Iil1Il('7a')][Iil1Il('8b')]!==Iil1Il('7b')&&typeof i1ilii[Iil1Il('7a')][Iil1Il('8b')][Iil1Il('7c')]!==Iil1Il('7b')){$[Iil1Il('7c')]=i1ilii[Iil1Il('7a')][Iil1Il('8b')][Iil1Il('7c')];let iIIII1=0x0;for(let i1l1ll of i1ilii[Iil1Il('7a')][Iil1Il('8b')][Iil1Il('8c')]){if(iIIII1<i1l1ll[Iil1Il('9c')])iIIII1=i1l1ll[Iil1Il('9c')];}if($[Iil1Il('14')]>0x0&&iIIII1>$[Iil1Il('14')])iIIII1=$[Iil1Il('14')];if($[Iil1Il('2e')][$[Iil1Il('3a')]]){$[Iil1Il('2e')][$[Iil1Il('3a')]][Iil1Il('5b')]=iIIII1;}$[Iil1Il('2e')][Iil1Il('14')]=iIIII1;if(iIIII1<=$[Iil1Il('7c')]){if(!$[Iil1Il('2e')][$[Iil1Il('3a')]])$[Iil1Il('2e')][$[Iil1Il('3a')]]={};$[Iil1Il('2e')][$[Iil1Il('3a')]][Iil1Il('5b')]=$[Iil1Il('7c')];iii1Ii=![];}console[Iil1Il('c')](Iil1Il('9d')+$[Iil1Il('3c')]+'\u3011'+($[Iil1Il('3e')]||$[Iil1Il('3a')])+'\x20'+$[Iil1Il('7c')]+'\x2f'+iIIII1+'\u4eba');}if(i1ilii[Iil1Il('24')][Iil1Il('62')](Iil1Il('28'))>-0x1){iii1Ii=![];}if(typeof i1ilii[Iil1Il('7a')]!==Iil1Il('7b')&&typeof i1ilii[Iil1Il('7a')][Iil1Il('8b')]!==Iil1Il('7b')&&typeof i1ilii[Iil1Il('7a')][Iil1Il('8b')][Iil1Il('8c')]!==Iil1Il('7b')){for(let I1iIiI of i1ilii[Iil1Il('7a')][Iil1Il('8b')][Iil1Il('8c')]||[]){if(I1iIiI[Iil1Il('8d')]==0x2){console[Iil1Il('c')](Iil1Il('8e')+I1iIiI[Iil1Il('8f')]+Iil1Il('90'));await $[Iil1Il('42')](parseInt(Math[Iil1Il('43')]()*0x7d0+0x7d0,0xa));await I1I1i1('',0x2);}}}}else{console[Iil1Il('c')](i1l1li);}}}catch(li1I1){$[Iil1Il('45')](li1I1,i1l11);}finally{iii1Il(iii1Ii);}});});}function lil11Iil(){if($[Iil1Il('2e')][$[Iil1Il('3a')]]){console[Iil1Il('c')](Iil1Il('9d')+$[Iil1Il('3c')]+Iil1Il('9e')+$[Iil1Il('2e')][$[Iil1Il('3a')]][Iil1Il('5e')][Iil1Il('9f')](/.+(.{3})/,Iil1Il('a0')));return;}return new Promise(i1ilil=>{let lilIii={'url':Iil1Il('a1')+Date[Iil1Il('92')]()+Iil1Il('a2')+$[Iil1Il('57')]+Iil1Il('a3')+rebateCode+Iil1Il('a4')+$[Iil1Il('59')]+Iil1Il('9b'),'headers':{'accept':Iil1Il('6c'),'Accept-Language':Iil1Il('6d'),'Accept-Encoding':Iil1Il('6e'),'Cookie':''+$[Iil1Il('22')]+newCookie+'\x20'+cookie,'origin':Iil1Il('6f'),'Referer':Iil1Il('70'),'User-Agent':$['\x55\x41']}};$[Iil1Il('73')](lilIii,async(i1ill1,iIIl1l,llIli1)=>{try{if(i1ill1){console[Iil1Il('c')](''+$[Iil1Il('6a')](i1ill1));console[Iil1Il('c')]($[Iil1Il('25')]+Iil1Il('74'));}else{let iliIII=$[Iil1Il('75')](llIli1,llIli1);if(typeof iliIII==Iil1Il('76')){if(iliIII[Iil1Il('5e')]==0x0&&iliIII[Iil1Il('7a')]&&iliIII[Iil1Il('7a')][Iil1Il('a5')]){let iIIl1i=iliIII[Iil1Il('7a')][Iil1Il('a5')][Iil1Il('3b')](/\?s=([^&]+)/)&&iliIII[Iil1Il('7a')][Iil1Il('a5')][Iil1Il('3b')](/\?s=([^&]+)/)[0x1]||'';if(iIIl1i){console[Iil1Il('c')](Iil1Il('9d')+$[Iil1Il('3c')]+Iil1Il('a6')+iIIl1i[Iil1Il('9f')](/.+(.{3})/,Iil1Il('a0')));$[Iil1Il('2e')][$[Iil1Il('3a')]]={'code':iIIl1i,'count':$[Iil1Il('7c')]};}}}else{console[Iil1Il('c')](llIli1);}}}catch(I1lllI){$[Iil1Il('45')](I1lllI,iIIl1l);}finally{i1ilil();}});});}function ll1l1lIl(){return new Promise(ill111=>{const Iliil1={'url':$[Iil1Il('4c')],'followRedirect':![],'headers':{'Cookie':''+$[Iil1Il('22')]+newCookie+'\x20'+cookie,'User-Agent':$['\x55\x41']}};$[Iil1Il('73')](Iliil1,async(i1III,Ii1iIi,iliIIl)=>{try{IiiII1ll(Ii1iIi);$[Iil1Il('4e')]=Ii1iIi&&Ii1iIi[Iil1Il('71')]&&(Ii1iIi[Iil1Il('71')][Iil1Il('a7')]||Ii1iIi[Iil1Il('71')][Iil1Il('a8')]||'')||'';$[Iil1Il('4e')]=decodeURIComponent($[Iil1Il('4e')]);$[Iil1Il('4e')]=$[Iil1Il('4e')][Iil1Il('3b')](/(https:\/\/prodev[\.m]{0,}\.jd\.com\/mall[^'"]+)/)&&$[Iil1Il('4e')][Iil1Il('3b')](/(https:\/\/prodev[\.m]{0,}\.jd\.com\/mall[^'"]+)/)[0x1]||'';}catch(Ii1iIl){$[Iil1Il('45')](Ii1iIl,Ii1iIi);}finally{ill111(iliIIl);}});});}function lIliIII(){return new Promise(iliIIi=>{const ill11I={'url':Iil1Il('a9')+rebateCode+($[Iil1Il('30')]&&Iil1Il('aa')+$[Iil1Il('30')]||''),'followRedirect':![],'headers':{'Cookie':''+$[Iil1Il('22')]+newCookie+'\x20'+cookie,'User-Agent':$['\x55\x41']}};$[Iil1Il('73')](ill11I,async(Iliiil,li1Il,li1Ii)=>{try{IiiII1ll(li1Il);$[Iil1Il('4c')]=li1Ii&&li1Ii[Iil1Il('3b')](/(https:\/\/u\.jd\.com\/jda[^']+)/)&&li1Ii[Iil1Il('3b')](/(https:\/\/u\.jd\.com\/jda[^']+)/)[0x1]||'';}catch(Iliiii){$[Iil1Il('45')](Iliiii,li1Il);}finally{iliIIi(li1Ii);}});});}function lilIiI1I(i1illI){return new Promise(i1IIl=>{const I1lll1={'url':Iil1Il('ab')+i1illI['\x61'],'body':'\x64\x3d'+i1illI['\x64'],'headers':{'Content-Type':Iil1Il('ac'),'User-Agent':$['\x55\x41']}};$[Iil1Il('ad')](I1lll1,async(i1IIi,IIII1I,Iii111)=>{try{if(i1IIi){}else{if(Iii111[Iil1Il('62')](Iil1Il('ae'))>0x0){Iii111=Iii111[Iil1Il('15')](Iil1Il('ae'),0x2);Iii111=JSON[Iil1Il('af')](Iii111[0x1]);$[Iil1Il('59')]=Iii111[Iil1Il('59')];}else{console[Iil1Il('c')](Iil1Il('b0'));}}}catch(l1l1II){$[Iil1Il('45')](l1l1II,IIII1I);}finally{i1IIl(Iii111);}});});}function IiiII1ll(Iil1I1){let Ii1iII=Iil1I1&&Iil1I1[Iil1Il('71')]&&(Iil1I1[Iil1Il('71')][Iil1Il('b1')]||Iil1I1[Iil1Il('71')][Iil1Il('b2')]||'')||'';let l1i11I='';if(Ii1iII){if(typeof Ii1iII!=Iil1Il('76')){l1i11I=Ii1iII[Iil1Il('15')]('\x2c');}else l1i11I=Ii1iII;for(let II11II of l1i11I){let Ii1iI1=II11II[Iil1Il('15')]('\x3b')[0x0][Iil1Il('b3')]();if(Ii1iI1[Iil1Il('15')]('\x3d')[0x1]){if(Ii1iI1[Iil1Il('15')]('\x3d')[0x0]==Iil1Il('95')&&Ii1iI1[Iil1Il('15')]('\x3d')[0x1]){$[Iil1Il('95')]=Ii1iI1[Iil1Il('15')]('\x3d')[0x1];}if(newCookie[Iil1Il('62')](Ii1iI1[Iil1Il('15')]('\x3d')[0x1])==-0x1)newCookie+=Ii1iI1[Iil1Il('9f')](/ /g,'')+'\x3b\x20';}}}}function il1l1iii(lilIli=0x1){lilIli=0x1;if(lilIli==0x2){$['\x55\x41']=Iil1Il('b4');}else{let Iliili=$[Iil1Il('4')][Iil1Il('b5')]($[Iil1Il('3a')]+Iil1Il('b6'))[Iil1Il('37')]();$['\x55\x41']=Iil1Il('b7')+Iliili+Iil1Il('b8');}}function IIi1Iiii(Iliill){if(typeof Iliill==Iil1Il('b9')){try{return JSON[Iil1Il('af')](Iliill);}catch(IIII11){console[Iil1Il('c')](IIII11);$[Iil1Il('24')]($[Iil1Il('25')],'',Iil1Il('ba'));return[];}}}async function I1IlllII(i1illi){return new Promise(i1illl=>setTimeout(i1illl,i1illi));}async function iii1(){try{const {JSDOM}=jsdom;let I1llil={'url':Iil1Il('55')+rebateCode+Iil1Il('56'),'referrer':Iil1Il('a9'),'userAgent':Iil1Il('bb'),'runScripts':Iil1Il('bc'),'resources':new jsdom[(Iil1Il('bd'))]({'userAgent':Iil1Il('bb'),'referrer':Iil1Il('a9')}),'includeNodeLocations':!![],'storageQuota':0x989680,'pretendToBeVisual':!![],'virtualConsole':new jsdom[(Iil1Il('be'))]()};const I1llii=new JSDOM(Iil1Il('bf'),I1llil);await I1IlllII(0x3e8);iIl11111=I1llii[Iil1Il('c0')];}catch(lilIll){console[Iil1Il('c')](lilIll);}}async function iiIilIlI(l1i111,iliII1){if(!$[Iil1Il('1b')][$[Iil1Il('3a')]])$[Iil1Il('1b')][$[Iil1Il('3a')]]={};let II11I1=$[Iil1Il('1b')][$[Iil1Il('3a')]];if(!iIl11111){await iii1();}iIl11111[Iil1Il('c1')][Iil1Il('c2')](Iil1Il('c3')+l1i111,II11I1[Iil1Il('c3')+l1i111]||'');iIl11111[Iil1Il('c1')][Iil1Il('c2')](Iil1Il('c4')+l1i111,II11I1[Iil1Il('c4')+l1i111]||'');iIl11111[Iil1Il('c1')][Iil1Il('c2')](Iil1Il('c5')+l1i111,II11I1[Iil1Il('c5')+l1i111]||'');return new Promise(async Iii11I=>{let Iil1II='';try{if(typeof iIl11111[Iil1Il('c6')]===Iil1Il('c7')){Iil1II=await iIl11111[Iil1Il('c6')](l1i111,iliII1);}else{let iIIl1I=0x0;timer=setInterval(async()=>{iIIl1I++;if(typeof iIl11111[Iil1Il('c6')]===Iil1Il('c7')){clearInterval(timer);timer=null;Iil1II=await iIl11111[Iil1Il('c6')](l1i111,iliII1);}if(iIIl1I>=0x64){clearInterval(timer);}},0x64);}}catch(I1iIli){console[Iil1Il('c')](I1iIli);}finally{if(Iil1II){II11I1[Iil1Il('c3')+l1i111]=iIl11111[Iil1Il('c1')][Iil1Il('c8')](Iil1Il('c3')+l1i111);II11I1[Iil1Il('c4')+l1i111]=iIl11111[Iil1Il('c1')][Iil1Il('c8')](Iil1Il('c4')+l1i111);II11I1[Iil1Il('c5')+l1i111]=iIl11111[Iil1Il('c1')][Iil1Il('c8')](Iil1Il('c5')+l1i111);}Iii11I(Iil1II);}});}function iliIIlI(){class lI1Ill{constructor(){this[Iil1Il('22')]='';this[Iil1Il('c9')]=0x0;this['\x6d\x72']=[0x1,0x0];this[Iil1Il('ca')]={'cookie':'','cookies':Iil1Il('cb'),'domain':Iil1Il('cc'),'referrer':Iil1Il('a9'),'location':{'href':Iil1Il('70'),'hrefs':Iil1Il('70')}};this[Iil1Il('cd')]={'userAgent':Iil1Il('b4'),'userAgents':Iil1Il('b4')};this[Iil1Il('c0')]={};}[Iil1Il('4f')](lI1Ili='',IliilI='',i1II1='',iIIl11=''){try{this[Iil1Il('ca')][Iil1Il('a7')][Iil1Il('ce')]=this[Iil1Il('ca')][Iil1Il('a7')][Iil1Il('cf')]+'';this[Iil1Il('ca')][Iil1Il('12')]=this[Iil1Il('ca')][Iil1Il('d0')]+'';if(i1II1)this[Iil1Il('ca')][Iil1Il('a7')][Iil1Il('ce')]=i1II1;if(iIIl11)this[Iil1Il('ca')][Iil1Il('12')]=iIIl11;this[Iil1Il('22')]='';this[Iil1Il('cd')][Iil1Il('d1')]=this[Iil1Il('cd')][Iil1Il('d2')]+'';this[Iil1Il('c9')]=0x3f3+Math[Iil1Il('d3')](0x1f*Math[Iil1Il('43')]());if(![]){this['\x6d\x72'][0x1]++;if(this['\x6d\x72'][0x1]>=0x13a){this['\x6d\x72'][0x1]=Math[Iil1Il('d3')](0x1f*Math[Iil1Il('43')]());}if(!IliilI){IliilI=$[Iil1Il('4')][Iil1Il('b5')]('')[Iil1Il('37')]();}let l1l1I1=0x0;while(!![]){this['\x6d\x72'][0x0]=parseInt(IliilI[Iil1Il('3b')](/\d/g)[l1l1I1]);l1l1I1++;if(this['\x6d\x72'][0x0]>0x0||l1l1I1>=IliilI[Iil1Il('3b')](/\d/g)[Iil1Il('39')]){break;}}this['\x6d\x72'][0x0]+=Math[Iil1Il('d3')]((new Date()[Iil1Il('1f')]()-new Date(Iil1Il('d4'))[Iil1Il('1f')]())/0x5265c00);}if(lI1Ili)this[Iil1Il('cd')][Iil1Il('d1')]=lI1Ili;this['\x6c\x72']={'ckJda':Iil1Il('d5'),'ckJdb':Iil1Il('d6'),'ckJdv':Iil1Il('d7'),'ckJdc':Iil1Il('d8'),'refUrl':Iil1Il('a9')};this['\x71']();this['\x73'](IliilI);return this[Iil1Il('22')];}catch(I1iIll){console[Iil1Il('c')](I1iIll);}}['\x73'](I1lliI=''){var llIllI,I1ilI1,iillll,lIIilI,II1li1=(this[Iil1Il('d9')](this['\x6c\x72'][Iil1Il('da')])||'')[Iil1Il('15')]('\x2e'),l1lIlI=(this[Iil1Il('d9')](this['\x6c\x72'][Iil1Il('db')])||'')[Iil1Il('15')]('\x2e'),IiiIl1=(this[Iil1Il('d9')](this['\x6c\x72'][Iil1Il('dc')])||'')[Iil1Il('15')]('\x7c'),lIIil1=this[Iil1Il('d9')](this['\x6c\x72'][Iil1Il('dd')])||'',IIli1=parseInt((new Date()[Iil1Il('1f')]()-this[Iil1Il('c9')])/0x3e8),II1liI=0x0,IlI1i1=0x1,l1lIl1=Iil1Il('de'),IiiIlI='\x2d',Iilli1=Iil1Il('df'),I1l1Il='\x2d';if(II1li1[Iil1Il('39')]>0x3)for(var llIll1=0x2;llIll1<0x5&&llIll1<II1li1[Iil1Il('39')];llIll1++){var Illl1l=II1li1[llIll1];Illl1l[Iil1Il('39')]>0xa&&(II1li1[llIll1]=Illl1l[Iil1Il('e0')](0x0,0xa));}II1li1[Iil1Il('39')]>0x5?(iillll=II1li1[0x0],lIIilI=II1li1[0x1],llIllI=parseInt(II1li1[0x2],0xa),I1ilI1=parseInt(II1li1[0x3],0xa),IIli1=parseInt(II1li1[0x4],0xa),IlI1i1=parseInt(II1li1[0x5],0xa)||IlI1i1):(lIIilI=this[Iil1Il('e1')](),llIllI=IIli1,I1ilI1=IIli1),this['\x6c\x72'][Iil1Il('e2')]=lIIilI,l1lIlI[Iil1Il('39')]>0x3&&(iillll||(iillll=l1lIlI[0x0]),II1liI=parseInt(l1lIlI[0x1],0xa)||0x0),IiiIl1[Iil1Il('39')]>0x4&&(iillll||(iillll=IiiIl1[0x0]),l1lIl1=IiiIl1[0x1],IiiIlI=IiiIl1[0x2],Iilli1=IiiIl1[0x3],I1l1Il=IiiIl1[0x4]),lIIil1&&''!==lIIil1&&(iillll||(iillll=lIIil1));var Illl1i,lIIiil=[],l1lIii=l1lIlI[Iil1Il('39')]<0x4,I11iI1=this[Iil1Il('e3')](Iil1Il('e4')),l1lIil=!0x1;if(I11iI1){var IiiIli=this[Iil1Il('e3')](Iil1Il('e5')),iillli=this[Iil1Il('e3')](Iil1Il('e6')),I1l1Ii=this[Iil1Il('e3')](Iil1Il('e7'));lIIiil[Iil1Il('8')](I11iI1||l1lIl1),lIIiil[Iil1Il('8')](IiiIli||IiiIlI),lIIiil[Iil1Il('8')](iillli||Iilli1),lIIiil[Iil1Il('8')](I1l1Ii||I1l1Il),I1l1Il=lIIiil[0x3],l1lIil=!0x0;}else{var I1i11i,I1i11l=this['\x6c\x72'][Iil1Il('e8')]&&this['\x6c\x72'][Iil1Il('e8')][Iil1Il('15')]('\x2f')[0x2],llIlii=!0x1;if(I1i11l&&I1i11l[Iil1Il('62')](this['\x6c\x72'][Iil1Il('e9')])<0x0){for(I1i11i=this['\x6c\x72'][Iil1Il('ea')],llIll1=0x0;llIll1<I1i11i[Iil1Il('39')];llIll1++){var llIlil=I1i11i[llIll1][Iil1Il('15')]('\x3a');if(I1i11l[Iil1Il('62')](llIlil[0x0][Iil1Il('eb')]())>-0x1&&this['\x6c\x72'][Iil1Il('e8')][Iil1Il('62')]((llIlil[0x1]+'\x3d')[Iil1Il('eb')]())>-0x1){var IIlil=this[Iil1Il('e3')](llIlil[0x1],this['\x6c\x72'][Iil1Il('e8')]);/[^\x00-\xff]/[Iil1Il('51')](IIlil)&&(IIlil=encodeURIComponent(IIlil)),lIIiil[Iil1Il('8')](llIlil[0x0]),lIIiil[Iil1Il('8')]('\x2d'),lIIiil[Iil1Il('8')](Iil1Il('ec')),lIIiil[Iil1Il('8')](IIlil||Iil1Il('ed')),I1l1Il=lIIiil[0x3],llIlii=!0x0;break;}}llIlii||(I1i11l[Iil1Il('62')](Iil1Il('ee'))>-0x1?(lIIiil[Iil1Il('8')](Iil1Il('ee')),lIIiil[Iil1Il('8')]('\x2d'),lIIiil[Iil1Il('8')](Iil1Il('ef')),lIIiil[Iil1Il('8')](Iil1Il('ed'))):(lIIiil[Iil1Il('8')](I1i11l),lIIiil[Iil1Il('8')]('\x2d'),lIIiil[Iil1Il('8')](Iil1Il('f0')),lIIiil[Iil1Il('8')]('\x2d')));}}Illl1i=lIIiil[Iil1Il('39')]>0x0&&(lIIiil[0x0]!==l1lIl1||lIIiil[0x1]!==IiiIlI||lIIiil[0x2]!==Iilli1)&&Iil1Il('f0')!==lIIiil[0x2],l1lIii||!l1lIii&&Illl1i?(l1lIl1=lIIiil[0x0]||l1lIl1,IiiIlI=lIIiil[0x1]||IiiIlI,Iilli1=lIIiil[0x2]||Iilli1,I1l1Il=lIIiil[0x3]||I1l1Il,II1li1[Iil1Il('39')]>0x5?(llIllI=parseInt(II1li1[0x2],0xa),I1ilI1=parseInt(II1li1[0x4],0xa),IIli1=parseInt((new Date()[Iil1Il('1f')]()-this[Iil1Il('c9')])/0x3e8),IlI1i1++,II1liI=0x1):(IlI1i1=0x1,II1liI=0x1)):II1liI++;var ilI1lI=this[Iil1Il('f1')]();if(ilI1lI&&ilI1lI[Iil1Il('f2')]){var IiiIll=0x1*ilI1lI[Iil1Il('f2')],IIlii=0x1*ilI1lI[Iil1Il('f3')];(IiiIll>IlI1i1||IiiIll===IlI1i1&&IIlii>=II1liI)&&(IlI1i1=IiiIll,II1liI=IIlii+0x1);}if(iillll||(iillll=this[Iil1Il('f4')](this['\x6c\x72'][Iil1Il('e9')])),this[Iil1Il('f5')](this['\x6c\x72'][Iil1Il('da')],[iillll,lIIilI,llIllI,I1ilI1,IIli1,IlI1i1||0x1][Iil1Il('f6')]('\x2e'),this['\x6c\x72'][Iil1Il('e9')],this['\x6c\x72'][Iil1Il('f7')]),this[Iil1Il('f5')](this['\x6c\x72'][Iil1Il('db')],[iillll,II1liI,lIIilI+'\x7c'+IlI1i1,IIli1][Iil1Il('f6')]('\x2e'),this['\x6c\x72'][Iil1Il('e9')],this['\x6c\x72'][Iil1Il('f8')]),l1lIil||Illl1i||IiiIl1[Iil1Il('39')]<0x5){var IlI1il=[iillll,l1lIl1||Iil1Il('de'),IiiIlI||'\x2d',Iilli1||Iil1Il('df'),I1l1Il||'\x2d',new Date()[Iil1Il('1f')]()-this[Iil1Il('c9')]][Iil1Il('f6')]('\x7c');this[Iil1Il('f9')](IlI1il=encodeURIComponent(IlI1il),iillll);}this[Iil1Il('f5')](this['\x6c\x72'][Iil1Il('dd')],iillll,this['\x6c\x72'][Iil1Il('e9')]);if(![]){this[Iil1Il('f5')](Iil1Il('fa'),this['\x6d\x72'][Iil1Il('f6')]('\x2e'),this['\x6c\x72'][Iil1Il('e9')]);this[Iil1Il('f5')](Iil1Il('fb'),[lIIilI,this['\x6d\x72'][0x0],new Date()[Iil1Il('1f')]()][Iil1Il('f6')]('\x2e'),this['\x6c\x72'][Iil1Il('e9')]);var II1liI=0x0;var IlI1ii='';if(I1lliI){while(!![]){IlI1ii+=I1lliI[Iil1Il('3b')](/\d/g)[II1liI];II1liI++;if(IlI1ii[Iil1Il('15')]('')[Iil1Il('39')]>=0x2||II1liI>=I1lliI[Iil1Il('3b')](/\d/g)[Iil1Il('39')]){break;}}}}}['\x71'](){this['\x6c\x72'][Iil1Il('fc')]=this['\x6c\x72'][Iil1Il('fc')]||Iil1Il('fd'),this['\x6c\x72'][Iil1Il('fe')]='\x2f\x2f'+this['\x6c\x72'][Iil1Il('fc')]+Iil1Il('ff'),this['\x6c\x72'][Iil1Il('100')]={'pv':'\x31','pf':'\x32','cl':'\x33','od':'\x34','pd':'\x35','hm':'\x36','magic':Iil1Il('101')},this['\x6c\x72'][Iil1Il('102')]?(this['\x6c\x72'][Iil1Il('da')]=Iil1Il('103'),this['\x6c\x72'][Iil1Il('db')]=Iil1Il('104'),this['\x6c\x72'][Iil1Il('dd')]=Iil1Il('105'),this['\x6c\x72'][Iil1Il('106')]=Iil1Il('107')):(this['\x6c\x72'][Iil1Il('da')]=Iil1Il('d5'),this['\x6c\x72'][Iil1Il('db')]=Iil1Il('d6'),this['\x6c\x72'][Iil1Il('dd')]=Iil1Il('d8'),this['\x6c\x72'][Iil1Il('106')]=Iil1Il('108')),this['\x6c\x72'][Iil1Il('dc')]=Iil1Il('d7'),this['\x6c\x72'][Iil1Il('109')]=Iil1Il('10a'),this['\x6c\x72'][Iil1Il('10b')]=Iil1Il('10c'),this['\x6c\x72'][Iil1Il('f7')]=0x39ef8b000,this['\x6c\x72'][Iil1Il('f8')]=0x1b7740,this['\x6c\x72'][Iil1Il('10d')]=0x39ef8b000,this['\x6c\x72'][Iil1Il('10e')]=0x4d3f6400,this['\x6c\x72'][Iil1Il('10f')]=0x5265c00,this['\x6c\x72'][Iil1Il('110')]=0x39ef8b000,this['\x6c\x72'][Iil1Il('111')]=0x757b12c00,this['\x6c\x72'][Iil1Il('e9')]=(this[Iil1Il('ca')][Iil1Il('112')][Iil1Il('3b')](/[^.]+\.(com.cn|net.cn|org.cn|gov.cn|edu.cn)$/)||[''])[0x0]||this[Iil1Il('ca')][Iil1Il('112')][Iil1Il('9f')](/.*?([^.]+\.[^.]+)$/,'\x24\x31'),this['\x6c\x72'][Iil1Il('113')]=this[Iil1Il('ca')][Iil1Il('113')],this['\x6c\x72'][Iil1Il('e8')]=this[Iil1Il('ca')][Iil1Il('114')],this['\x6c\x72'][Iil1Il('ea')]=[Iil1Il('115'),Iil1Il('116'),Iil1Il('117'),Iil1Il('118'),Iil1Il('119'),Iil1Il('11a'),Iil1Il('11b'),Iil1Il('11c'),Iil1Il('11d'),Iil1Il('11e'),Iil1Il('11f'),Iil1Il('120'),Iil1Il('121'),Iil1Il('122'),Iil1Il('123'),Iil1Il('124'),Iil1Il('125'),Iil1Il('126'),Iil1Il('127'),Iil1Il('128'),Iil1Il('129'),Iil1Il('12a'),Iil1Il('12b'),Iil1Il('12c'),Iil1Il('12d'),Iil1Il('12e')];}[Iil1Il('f5')](lIIiii,iI1lli,ll1iI,iI1lll){if(lIIiii){var l1lIll='';if(iI1lll){var I1l1II=new Date();I1l1II[Iil1Il('12f')](I1l1II[Iil1Il('1f')]()-this[Iil1Il('c9')]+iI1lll),l1lIll=Iil1Il('130')+I1l1II[Iil1Il('131')]();}this[Iil1Il('22')]+=lIIiii+'\x3d'+iI1lli+'\x3b\x20';}}[Iil1Il('f9')](IIli1I,I1i11I,llIliI){var I1l1I1='';I1l1I1=this[Iil1Il('132')](0xa)&&(!IIli1I||IIli1I[Iil1Il('39')]>0x190)?I1i11I+Iil1Il('133')+(new Date()[Iil1Il('1f')]()-this[Iil1Il('c9')]):IIli1I;var I1i111=llIliI||this[Iil1Il('134')]()?this['\x6c\x72'][Iil1Il('10f')]:this['\x6c\x72'][Iil1Il('10e')];this[Iil1Il('f5')](this['\x6c\x72'][Iil1Il('dc')]||Iil1Il('d7'),I1l1I1,this['\x6c\x72'][Iil1Il('e9')],I1i111);}[Iil1Il('d9')](ilI1li,IIliI){var ilI1ll=this[Iil1Il('ca')][Iil1Il('12')][Iil1Il('3b')](new RegExp(Iil1Il('135')+ilI1li+Iil1Il('136')));return null!==ilI1ll?IIliI?ilI1ll[0x2]:this[Iil1Il('137')](ilI1ll[0x2]):'';}[Iil1Il('e1')](){return new Date()[Iil1Il('1f')]()-this[Iil1Il('c9')]+''+parseInt(0x7fffffff*Math[Iil1Il('43')]());}[Iil1Il('e3')](Iillii,IlI1iI){var Iillil=IlI1iI||this[Iil1Il('ca')][Iil1Il('a7')][Iil1Il('ce')],l1lIli=new RegExp(Iil1Il('138')+Iillii+Iil1Il('139'))[Iil1Il('13a')](Iillil);return l1lIli?this[Iil1Il('137')](l1lIli[0x1]):null;}[Iil1Il('137')](lIIiiI){try{return decodeURIComponent(lIIiiI);}catch(II1lil){return lIIiiI;}}[Iil1Il('f4')](IIli1l){var II1lii,lIIii1=0x1,ll1i1=0x0;if(IIli1l)for(lIIii1=0x0,II1lii=IIli1l[Iil1Il('39')]-0x1;II1lii>=0x0;II1lii--){lIIii1=0x0!==(ll1i1=0xfe00000&(lIIii1=(lIIii1<<0x6&0xfffffff)+(ll1i1=IIli1l[Iil1Il('13b')](II1lii))+(ll1i1<<0xe)))?lIIii1^ll1i1>>0x15:lIIii1;}return lIIii1;}[Iil1Il('132')](IIli1i){if(IIli1i>=0x64)return!0x0;var I1iIi1=this['\x6c\x72'][Iil1Il('e2')],lliil1=I1iIi1[Iil1Il('e0')](I1iIi1[Iil1Il('39')]-0x2);return!!lliil1&&0x1*lliil1<IIli1i;}[Iil1Il('134')](){var IIllI=this[Iil1Il('cd')][Iil1Il('d1')]||'';return/^(jdapp|jdltapp|jdpingou);/[Iil1Il('51')](IIllI)||this[Iil1Il('13c')]();}[Iil1Il('13c')](){return(this[Iil1Il('cd')][Iil1Il('d1')]||'')[Iil1Il('62')](Iil1Il('13d'))>-0x1;}[Iil1Il('f1')](){var lliilI,lili1;try{this[Iil1Il('c0')][Iil1Il('13e')]&&this[Iil1Il('c0')][Iil1Il('13e')][Iil1Il('13f')]?lili1=JDMAUnifyBridge[Iil1Il('13f')]():this[Iil1Il('c0')][Iil1Il('13f')]?lili1=JDMAGetMPageParam():this[Iil1Il('c0')][Iil1Il('140')]&&this[Iil1Il('c0')][Iil1Il('140')][Iil1Il('141')]&&this[Iil1Il('c0')][Iil1Il('140')][Iil1Il('141')][Iil1Il('142')]&&(lili1=this[Iil1Il('c0')][Iil1Il('143')](Iil1Il('13f'),'')),lili1&&(lliilI=JSON[Iil1Il('af')](lili1));}catch(ll1l1){}return lliilI;}[Iil1Il('16')](IllIIi,IllIIl=null){const IiiIi1=IllIIl?new Date(IllIIl):new Date();let l1ii1={'M+':IiiIi1[Iil1Il('144')]()+0x1,'d+':IiiIi1[Iil1Il('145')](),'H+':IiiIi1[Iil1Il('146')](),'m+':IiiIi1[Iil1Il('147')](),'s+':IiiIi1[Iil1Il('148')](),'q+':Math[Iil1Il('149')]((IiiIi1[Iil1Il('144')]()+0x3)/0x3),'S':IiiIi1[Iil1Il('14a')]()};/(y+)/[Iil1Il('51')](IllIIi)&&(IllIIi=IllIIi[Iil1Il('9f')](RegExp['\x24\x31'],(IiiIi1[Iil1Il('14b')]()+'')[Iil1Il('e0')](0x4-RegExp['\x24\x31'][Iil1Il('39')])));for(let IllIIl in l1ii1)new RegExp('\x28'+IllIIl+'\x29')[Iil1Il('51')](IllIIi)&&(IllIIi=IllIIi[Iil1Il('9f')](RegExp['\x24\x31'],0x1==RegExp['\x24\x31'][Iil1Il('39')]?l1ii1[IllIIl]:('\x30\x30'+l1ii1[IllIIl])[Iil1Il('e0')]((''+l1ii1[IllIIl])[Iil1Il('39')])));return IllIIi;}}II1iIilI=new lI1Ill();};function getAuthorCodeList(IliI1l){return new Promise(lliiil=>{const lliiii={'\x75\x72\x6c':IliI1l+'\x3f'+new Date(),'\x74\x69\x6d\x65\x6f\x75\x74':0x2710,'\x68\x65\x61\x64\x65\x72\x73':{'User-Agent':Iil1Il('14c')}};$[Iil1Il('73')](lliiii,async(IliI1i,ll1ii,IIli11)=>{try{if(IliI1i){$[Iil1Il('33')]=![];}else{if(IIli11)IIli11=JSON[Iil1Il('af')](IIli11);$[Iil1Il('33')]=!![];}}catch(IllIII){$[Iil1Il('45')](IllIII,ll1ii);IIli11=null;}finally{lliiil(IIli11);}});});}function random(ii1li,IIll1){return Math[Iil1Il('149')](Math[Iil1Il('43')]()*(IIll1-ii1li))+ii1li;};iｉl='jsjiami.com.v6';
function randomString(e) {
    e = e || 32;
    let t = "abcdef0123456789", a = t.length, n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}


const navigator = {
  userAgent: `jdapp;iPhone;10.1.4;14.3;${$.CryptoJS.SHA1(randomString(40)).toString()};M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
  plugins: { length: 0 },
  language: "zh-CN",
};
const screen = {
  availHeight: 812,
  availWidth: 375,
  colorDepth: 24,
  height: 812,
  width: 375,
  pixelDepth: 24,
};
const window = {};
const document = {
  location: {
    ancestorOrigins: {},
    href: "https://prodev.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html",
    origin: "https://prodev.m.jd.com",
    protocol: "https:",
    host: "prodev.m.jd.com",
    hostname: "prodev.m.jd.com",
    port: "",
    pathname: "/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html",
    search: "",
    hash: "",
  },
};
var start_time = new Date().getTime(),
  _jdfp_canvas_md5 = "",
  _jdfp_webgl_md5 = "",
  _fingerprint_step = 1,
  _JdEid = "",
  _eidFlag = !1,
  risk_jd_local_fingerprint = "",
  _jd_e_joint_;

function generateUuid() {
    var t = Math
    for (
        var g = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split(""),
        m = 0,
        a = g.length;
        m < a;
        m++
    )
        switch (g[m]) {
        case "x":
            g[m] = t.floor(16 * t.random()).toString(16);
            break;
        case "y":
            g[m] = (t.floor(4 * t.random()) + 8).toString(16);
        }
    return g.join("");
}
function t(a) {
  if (null == a || void 0 == a || "" == a) return "NA";
  if (null == a || void 0 == a || "" == a) var b = "";
  else {
    b = [];
    for (var c = 0; c < 8 * a.length; c += 8)
      b[c >> 5] |= (a.charCodeAt(c / 8) & 255) << c % 32;
  }
  a = 8 * a.length;
  b[a >> 5] |= 128 << a % 32;
  b[(((a + 64) >>> 9) << 4) + 14] = a;
  a = 1732584193;
  c = -271733879;
  for (var l = -1732584194, h = 271733878, q = 0; q < b.length; q += 16) {
    var z = a,
      C = c,
      D = l,
      B = h;
    a = v(a, c, l, h, b[q + 0], 7, -680876936);
    h = v(h, a, c, l, b[q + 1], 12, -389564586);
    l = v(l, h, a, c, b[q + 2], 17, 606105819);
    c = v(c, l, h, a, b[q + 3], 22, -1044525330);
    a = v(a, c, l, h, b[q + 4], 7, -176418897);
    h = v(h, a, c, l, b[q + 5], 12, 1200080426);
    l = v(l, h, a, c, b[q + 6], 17, -1473231341);
    c = v(c, l, h, a, b[q + 7], 22, -45705983);
    a = v(a, c, l, h, b[q + 8], 7, 1770035416);
    h = v(h, a, c, l, b[q + 9], 12, -1958414417);
    l = v(l, h, a, c, b[q + 10], 17, -42063);
    c = v(c, l, h, a, b[q + 11], 22, -1990404162);
    a = v(a, c, l, h, b[q + 12], 7, 1804603682);
    h = v(h, a, c, l, b[q + 13], 12, -40341101);
    l = v(l, h, a, c, b[q + 14], 17, -1502002290);
    c = v(c, l, h, a, b[q + 15], 22, 1236535329);
    a = x(a, c, l, h, b[q + 1], 5, -165796510);
    h = x(h, a, c, l, b[q + 6], 9, -1069501632);
    l = x(l, h, a, c, b[q + 11], 14, 643717713);
    c = x(c, l, h, a, b[q + 0], 20, -373897302);
    a = x(a, c, l, h, b[q + 5], 5, -701558691);
    h = x(h, a, c, l, b[q + 10], 9, 38016083);
    l = x(l, h, a, c, b[q + 15], 14, -660478335);
    c = x(c, l, h, a, b[q + 4], 20, -405537848);
    a = x(a, c, l, h, b[q + 9], 5, 568446438);
    h = x(h, a, c, l, b[q + 14], 9, -1019803690);
    l = x(l, h, a, c, b[q + 3], 14, -187363961);
    c = x(c, l, h, a, b[q + 8], 20, 1163531501);
    a = x(a, c, l, h, b[q + 13], 5, -1444681467);
    h = x(h, a, c, l, b[q + 2], 9, -51403784);
    l = x(l, h, a, c, b[q + 7], 14, 1735328473);
    c = x(c, l, h, a, b[q + 12], 20, -1926607734);
    a = u(c ^ l ^ h, a, c, b[q + 5], 4, -378558);
    h = u(a ^ c ^ l, h, a, b[q + 8], 11, -2022574463);
    l = u(h ^ a ^ c, l, h, b[q + 11], 16, 1839030562);
    c = u(l ^ h ^ a, c, l, b[q + 14], 23, -35309556);
    a = u(c ^ l ^ h, a, c, b[q + 1], 4, -1530992060);
    h = u(a ^ c ^ l, h, a, b[q + 4], 11, 1272893353);
    l = u(h ^ a ^ c, l, h, b[q + 7], 16, -155497632);
    c = u(l ^ h ^ a, c, l, b[q + 10], 23, -1094730640);
    a = u(c ^ l ^ h, a, c, b[q + 13], 4, 681279174);
    h = u(a ^ c ^ l, h, a, b[q + 0], 11, -358537222);
    l = u(h ^ a ^ c, l, h, b[q + 3], 16, -722521979);
    c = u(l ^ h ^ a, c, l, b[q + 6], 23, 76029189);
    a = u(c ^ l ^ h, a, c, b[q + 9], 4, -640364487);
    h = u(a ^ c ^ l, h, a, b[q + 12], 11, -421815835);
    l = u(h ^ a ^ c, l, h, b[q + 15], 16, 530742520);
    c = u(l ^ h ^ a, c, l, b[q + 2], 23, -995338651);
    a = w(a, c, l, h, b[q + 0], 6, -198630844);
    h = w(h, a, c, l, b[q + 7], 10, 1126891415);
    l = w(l, h, a, c, b[q + 14], 15, -1416354905);
    c = w(c, l, h, a, b[q + 5], 21, -57434055);
    a = w(a, c, l, h, b[q + 12], 6, 1700485571);
    h = w(h, a, c, l, b[q + 3], 10, -1894986606);
    l = w(l, h, a, c, b[q + 10], 15, -1051523);
    c = w(c, l, h, a, b[q + 1], 21, -2054922799);
    a = w(a, c, l, h, b[q + 8], 6, 1873313359);
    h = w(h, a, c, l, b[q + 15], 10, -30611744);
    l = w(l, h, a, c, b[q + 6], 15, -1560198380);
    c = w(c, l, h, a, b[q + 13], 21, 1309151649);
    a = w(a, c, l, h, b[q + 4], 6, -145523070);
    h = w(h, a, c, l, b[q + 11], 10, -1120210379);
    l = w(l, h, a, c, b[q + 2], 15, 718787259);
    c = w(c, l, h, a, b[q + 9], 21, -343485551);
    a = A(a, z);
    c = A(c, C);
    l = A(l, D);
    h = A(h, B);
  }
  b = [a, c, l, h];
  a = "";
  for (c = 0; c < 4 * b.length; c++)
    a +=
      "0123456789abcdef".charAt((b[c >> 2] >> ((c % 4) * 8 + 4)) & 15) +
      "0123456789abcdef".charAt((b[c >> 2] >> ((c % 4) * 8)) & 15);
  return a;
}

function u(a, b, c, l, h, q) {
  a = A(A(b, a), A(l, q));
  return A((a << h) | (a >>> (32 - h)), c);
}

function v(a, b, c, l, h, q, z) {
  return u((b & c) | (~b & l), a, b, h, q, z);
}

function x(a, b, c, l, h, q, z) {
  return u((b & l) | (c & ~l), a, b, h, q, z);
}

function w(a, b, c, l, h, q, z) {
  return u(c ^ (b | ~l), a, b, h, q, z);
}

function A(a, b) {
  var c = (a & 65535) + (b & 65535);
  return (((a >> 16) + (b >> 16) + (c >> 16)) << 16) | (c & 65535);
}
_fingerprint_step = 2;
var y = "",
  n = navigator.userAgent.toLowerCase();
n.indexOf("jdapp") && (n = n.substring(0, 90));
var e = navigator.language,
  f = n;
-1 != f.indexOf("ipad") ||
  -1 != f.indexOf("iphone os") ||
  -1 != f.indexOf("midp") ||
  -1 != f.indexOf("rv:1.2.3.4") ||
  -1 != f.indexOf("ucweb") ||
  -1 != f.indexOf("android") ||
  -1 != f.indexOf("windows ce") ||
  f.indexOf("windows mobile");
var r = "NA",
  k = "NA";
try {
  -1 != f.indexOf("win") &&
    -1 != f.indexOf("95") &&
    ((r = "windows"), (k = "95")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("98") &&
      ((r = "windows"), (k = "98")),
    -1 != f.indexOf("win 9x") &&
      -1 != f.indexOf("4.90") &&
      ((r = "windows"), (k = "me")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("nt 5.0") &&
      ((r = "windows"), (k = "2000")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("nt") &&
      ((r = "windows"), (k = "NT")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("nt 5.1") &&
      ((r = "windows"), (k = "xp")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("32") &&
      ((r = "windows"), (k = "32")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("nt 5.1") &&
      ((r = "windows"), (k = "7")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("6.0") &&
      ((r = "windows"), (k = "8")),
    -1 == f.indexOf("win") ||
      (-1 == f.indexOf("nt 6.0") && -1 == f.indexOf("nt 6.1")) ||
      ((r = "windows"), (k = "9")),
    -1 != f.indexOf("win") &&
      -1 != f.indexOf("nt 6.2") &&
      ((r = "windows"), (k = "10")),
    -1 != f.indexOf("linux") && (r = "linux"),
    -1 != f.indexOf("unix") && (r = "unix"),
    -1 != f.indexOf("sun") && -1 != f.indexOf("os") && (r = "sun os"),
    -1 != f.indexOf("ibm") && -1 != f.indexOf("os") && (r = "ibm os/2"),
    -1 != f.indexOf("mac") && -1 != f.indexOf("pc") && (r = "mac"),
    -1 != f.indexOf("aix") && (r = "aix"),
    -1 != f.indexOf("powerpc") && (r = "powerPC"),
    -1 != f.indexOf("hpux") && (r = "hpux"),
    -1 != f.indexOf("netbsd") && (r = "NetBSD"),
    -1 != f.indexOf("bsd") && (r = "BSD"),
    -1 != f.indexOf("osf1") && (r = "OSF1"),
    -1 != f.indexOf("irix") && ((r = "IRIX"), (k = "")),
    -1 != f.indexOf("freebsd") && (r = "FreeBSD"),
    -1 != f.indexOf("symbianos") &&
      ((r = "SymbianOS"), (k = f.substring(f.indexOf("SymbianOS/") + 10, 3)));
} catch (a) {}
_fingerprint_step = 3;
var g = "NA",
  m = "NA";
try {
  -1 != f.indexOf("msie") &&
    ((g = "ie"),
    (m = f.substring(f.indexOf("msie ") + 5)),
    m.indexOf(";") && (m = m.substring(0, m.indexOf(";"))));
  -1 != f.indexOf("firefox") &&
    ((g = "Firefox"), (m = f.substring(f.indexOf("firefox/") + 8)));
  -1 != f.indexOf("opera") &&
    ((g = "Opera"), (m = f.substring(f.indexOf("opera/") + 6, 4)));
  -1 != f.indexOf("safari") &&
    ((g = "safari"), (m = f.substring(f.indexOf("safari/") + 7)));
  -1 != f.indexOf("chrome") &&
    ((g = "chrome"),
    (m = f.substring(f.indexOf("chrome/") + 7)),
    m.indexOf(" ") && (m = m.substring(0, m.indexOf(" "))));
  -1 != f.indexOf("navigator") &&
    ((g = "navigator"), (m = f.substring(f.indexOf("navigator/") + 10)));
  -1 != f.indexOf("applewebkit") &&
    ((g = "applewebkit_chrome"),
    (m = f.substring(f.indexOf("applewebkit/") + 12)),
    m.indexOf(" ") && (m = m.substring(0, m.indexOf(" "))));
  -1 != f.indexOf("sogoumobilebrowser") &&
    (g = "\u641c\u72d7\u624b\u673a\u6d4f\u89c8\u5668");
  if (-1 != f.indexOf("ucbrowser") || -1 != f.indexOf("ucweb"))
    g = "UC\u6d4f\u89c8\u5668";
  if (-1 != f.indexOf("qqbrowser") || -1 != f.indexOf("tencenttraveler"))
    g = "QQ\u6d4f\u89c8\u5668";
  -1 != f.indexOf("metasr") && (g = "\u641c\u72d7\u6d4f\u89c8\u5668");
  -1 != f.indexOf("360se") && (g = "360\u6d4f\u89c8\u5668");
  -1 != f.indexOf("the world") &&
    (g = "\u4e16\u754c\u4e4b\u7a97\u6d4f\u89c8\u5668");
  -1 != f.indexOf("maxthon") && (g = "\u9068\u6e38\u6d4f\u89c8\u5668");
} catch (a) {}

class JdJrTdRiskFinger {
  f = {
    options: function () {
      return {};
    },
    nativeForEach: Array.prototype.forEach,
    nativeMap: Array.prototype.map,
    extend: function (a, b) {
      if (null == a) return b;
      for (var c in a) null != a[c] && b[c] !== a[c] && (b[c] = a[c]);
      return b;
    },
    getData: function () {
      return y;
    },
    get: function (a) {
      var b = 1 * m,
        c = [];
      "ie" == g && 7 <= b
        ? (c.push(n),
          c.push(e),
          (y = y + ",'userAgent':'" + t(n) + "','language':'" + e + "'"),
          this.browserRedirect(n))
        : ((c = this.userAgentKey(c)), (c = this.languageKey(c)));
      c.push(g);
      c.push(m);
      c.push(r);
      c.push(k);
      y =
        y +
        ",'os':'" +
        r +
        "','osVersion':'" +
        k +
        "','browser':'" +
        g +
        "','browserVersion':'" +
        m +
        "'";
      c = this.colorDepthKey(c);
      c = this.screenResolutionKey(c);
      c = this.timezoneOffsetKey(c);
      c = this.sessionStorageKey(c);
      c = this.localStorageKey(c);
      c = this.indexedDbKey(c);
      c = this.addBehaviorKey(c);
      c = this.openDatabaseKey(c);
      c = this.cpuClassKey(c);
      c = this.platformKey(c);
      c = this.hardwareConcurrencyKey(c);
      c = this.doNotTrackKey(c);
      c = this.pluginsKey(c);
      c = this.canvasKey(c);
      c = this.webglKey(c);
      b = this.x64hash128(c.join("~~~"), 31);
      return a(b);
    },
    userAgentKey: function (a) {
      a.push(navigator.userAgent),
        (y = y + ",'userAgent':'" + t(navigator.userAgent) + "'"),
        this.browserRedirect(navigator.userAgent);
      return a;
    },
    replaceAll: function (a, b, c) {
      for (; 0 <= a.indexOf(b); ) a = a.replace(b, c);
      return a;
    },
    browserRedirect: function (a) {
      var b = a.toLowerCase();
      a = "ipad" == b.match(/ipad/i);
      var c = "iphone os" == b.match(/iphone os/i),
        l = "midp" == b.match(/midp/i),
        h = "rv:1.2.3.4" == b.match(/rv:1.2.3.4/i),
        q = "ucweb" == b.match(/ucweb/i),
        z = "android" == b.match(/android/i),
        C = "windows ce" == b.match(/windows ce/i);
      b = "windows mobile" == b.match(/windows mobile/i);
      y =
        a || c || l || h || q || z || C || b
          ? y + ",'origin':'mobile'"
          : y + ",'origin':'pc'";
    },
    languageKey: function (a) {
      "" ||
        (a.push(navigator.language),
        (y =
          y +
          ",'language':'" +
          this.replaceAll(navigator.language, " ", "_") +
          "'"));
      return a;
    },
    colorDepthKey: function (a) {
      "" ||
        (a.push(screen.colorDepth),
        (y = y + ",'colorDepth':'" + screen.colorDepth + "'"));
      return a;
    },
    screenResolutionKey: function (a) {
      if (!this.options.excludeScreenResolution) {
        var b = this.getScreenResolution();
        "undefined" !== typeof b &&
          (a.push(b.join("x")),
          (y = y + ",'screenResolution':'" + b.join("x") + "'"));
      }
      return a;
    },
    getScreenResolution: function () {
      return this.options.detectScreenOrientation
        ? screen.height > screen.width
          ? [screen.height, screen.width]
          : [screen.width, screen.height]
        : [screen.height, screen.width];
    },
    timezoneOffsetKey: function (a) {
      this.options.excludeTimezoneOffset ||
        (a.push(new Date().getTimezoneOffset()),
        (y =
          y +
          ",'timezoneOffset':'" +
          new Date().getTimezoneOffset() / 60 +
          "'"));
      return a;
    },
    sessionStorageKey: function (a) {
      !this.options.excludeSessionStorage &&
        this.hasSessionStorage() &&
        (a.push("sessionStorageKey"), (y += ",'sessionStorage':true"));
      return a;
    },
    localStorageKey: function (a) {
      !this.options.excludeSessionStorage &&
        this.hasLocalStorage() &&
        (a.push("localStorageKey"), (y += ",'localStorage':true"));
      return a;
    },
    indexedDbKey: function (a) {
      !this.options.excludeIndexedDB &&
        this.hasIndexedDB() &&
        (a.push("indexedDbKey"), (y += ",'indexedDb':true"));
      return a;
    },
    addBehaviorKey: function (a) {
      document.body &&
      !this.options.excludeAddBehavior &&
      document.body.addBehavior
        ? (a.push("addBehaviorKey"), (y += ",'addBehavior':true"))
        : (y += ",'addBehavior':false");
      return a;
    },
    openDatabaseKey: function (a) {
      !this.options.excludeOpenDatabase && window.openDatabase
        ? (a.push("openDatabase"), (y += ",'openDatabase':true"))
        : (y += ",'openDatabase':false");
      return a;
    },
    cpuClassKey: function (a) {
      this.options.excludeCpuClass ||
        (a.push(this.getNavigatorCpuClass()),
        (y = y + ",'cpu':'" + this.getNavigatorCpuClass() + "'"));
      return a;
    },
    platformKey: function (a) {
      this.options.excludePlatform ||
        (a.push(this.getNavigatorPlatform()),
        (y = y + ",'platform':'" + this.getNavigatorPlatform() + "'"));
      return a;
    },
    hardwareConcurrencyKey: function (a) {
      var b = this.getHardwareConcurrency();
      a.push(b);
      y = y + ",'ccn':'" + b + "'";
      return a;
    },
    doNotTrackKey: function (a) {
      this.options.excludeDoNotTrack ||
        (a.push(this.getDoNotTrack()),
        (y = y + ",'track':'" + this.getDoNotTrack() + "'"));
      return a;
    },
    canvasKey: function (a) {
      if (!this.options.excludeCanvas && this.isCanvasSupported()) {
        var b = this.getCanvasFp();
        a.push(b);
        _jdfp_canvas_md5 = t(b);
        y = y + ",'canvas':'" + _jdfp_canvas_md5 + "'";
      }
      return a;
    },
    webglKey: function (a) {
      if (!this.options.excludeWebGL && this.isCanvasSupported()) {
        var b = this.getWebglFp();
        _jdfp_webgl_md5 = t(b);
        a.push(b);
        y = y + ",'webglFp':'" + _jdfp_webgl_md5 + "'";
      }
      return a;
    },
    pluginsKey: function (a) {
      this.isIE()
        ? (a.push(this.getIEPluginsString()),
          (y = y + ",'plugins':'" + t(this.getIEPluginsString()) + "'"))
        : (a.push(this.getRegularPluginsString()),
          (y = y + ",'plugins':'" + t(this.getRegularPluginsString()) + "'"));
      return a;
    },
    getRegularPluginsString: function () {
      return this.map(
        navigator.plugins,
        function (a) {
          var b = this.map(a, function (c) {
            return [c.type, c.suffixes].join("~");
          }).join(",");
          return [a.name, a.description, b].join("::");
        },
        this
      ).join(";");
    },
    getIEPluginsString: function () {
      return window.ActiveXObject
        ? this.map(
            "AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);Scripting.Dictionary;SWCtl.SWCtl;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;Skype.Detection;TDCCtl.TDCCtl;WMPlayer.OCX;rmocx.RealPlayer G2 Control;rmocx.RealPlayer G2 Control.1".split(
              ";"
            ),
            function (a) {
              try {
                return new ActiveXObject(a), a;
              } catch (b) {
                return null;
              }
            }
          ).join(";")
        : "";
    },
    hasSessionStorage: function () {
      try {
        return !!window.sessionStorage;
      } catch (a) {
        return !0;
      }
    },
    hasLocalStorage: function () {
      try {
        return !!window.localStorage;
      } catch (a) {
        return !0;
      }
    },
    hasIndexedDB: function () {
      return true;
      return !!window.indexedDB;
    },
    getNavigatorCpuClass: function () {
      return navigator.cpuClass ? navigator.cpuClass : "NA";
    },
    getNavigatorPlatform: function () {
      return navigator.platform ? navigator.platform : "NA";
    },
    getHardwareConcurrency: function () {
      return navigator.hardwareConcurrency
        ? navigator.hardwareConcurrency
        : "NA";
    },
    getDoNotTrack: function () {
      return navigator.doNotTrack ? navigator.doNotTrack : "NA";
    },
    getCanvasFp: function () {
      return "";
      var a = navigator.userAgent.toLowerCase();
      if (
        (0 < a.indexOf("jdjr-app") || 0 <= a.indexOf("jdapp")) &&
        (0 < a.indexOf("iphone") || 0 < a.indexOf("ipad"))
      )
        return null;
      a = document.createElement("canvas");
      var b = a.getContext("2d");
      b.fillStyle = "red";
      b.fillRect(30, 10, 200, 100);
      b.strokeStyle = "#1a3bc1";
      b.lineWidth = 6;
      b.lineCap = "round";
      b.arc(50, 50, 20, 0, Math.PI, !1);
      b.stroke();
      b.fillStyle = "#42e1a2";
      b.font = "15.4px 'Arial'";
      b.textBaseline = "alphabetic";
      b.fillText("PR flacks quiz gym: TV DJ box when? \u2620", 15, 60);
      b.shadowOffsetX = 1;
      b.shadowOffsetY = 2;
      b.shadowColor = "white";
      b.fillStyle = "rgba(0, 0, 200, 0.5)";
      b.font = "60px 'Not a real font'";
      b.fillText("No\u9a97", 40, 80);
      return a.toDataURL();
    },
    getWebglFp: function () {
      var a = navigator.userAgent;
      a = a.toLowerCase();
      if (
        (0 < a.indexOf("jdjr-app") || 0 <= a.indexOf("jdapp")) &&
        (0 < a.indexOf("iphone") || 0 < a.indexOf("ipad"))
      )
        return null;
      a = function (D) {
        b.clearColor(0, 0, 0, 1);
        b.enable(b.DEPTH_TEST);
        b.depthFunc(b.LEQUAL);
        b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
        return "[" + D[0] + ", " + D[1] + "]";
      };
      var b = this.getWebglCanvas();
      if (!b) return null;
      var c = [],
        l = b.createBuffer();
      b.bindBuffer(b.ARRAY_BUFFER, l);
      var h = new Float32Array([
        -0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0,
      ]);
      b.bufferData(b.ARRAY_BUFFER, h, b.STATIC_DRAW);
      l.itemSize = 3;
      l.numItems = 3;
      h = b.createProgram();
      var q = b.createShader(b.VERTEX_SHADER);
      b.shaderSource(
        q,
        "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"
      );
      b.compileShader(q);
      var z = b.createShader(b.FRAGMENT_SHADER);
      b.shaderSource(
        z,
        "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"
      );
      b.compileShader(z);
      b.attachShader(h, q);
      b.attachShader(h, z);
      b.linkProgram(h);
      b.useProgram(h);
      h.vertexPosAttrib = b.getAttribLocation(h, "attrVertex");
      h.offsetUniform = b.getUniformLocation(h, "uniformOffset");
      b.enableVertexAttribArray(h.vertexPosArray);
      b.vertexAttribPointer(h.vertexPosAttrib, l.itemSize, b.FLOAT, !1, 0, 0);
      b.uniform2f(h.offsetUniform, 1, 1);
      b.drawArrays(b.TRIANGLE_STRIP, 0, l.numItems);
      null != b.canvas && c.push(b.canvas.toDataURL());
      c.push("extensions:" + b.getSupportedExtensions().join(";"));
      c.push("extensions:" + b.getSupportedExtensions().join(";"));
      c.push("w1" + a(b.getParameter(b.ALIASED_LINE_WIDTH_RANGE)));
      c.push("w2" + a(b.getParameter(b.ALIASED_POINT_SIZE_RANGE)));
      c.push("w3" + b.getParameter(b.ALPHA_BITS));
      c.push("w4" + (b.getContextAttributes().antialias ? "yes" : "no"));
      c.push("w5" + b.getParameter(b.BLUE_BITS));
      c.push("w6" + b.getParameter(b.DEPTH_BITS));
      c.push("w7" + b.getParameter(b.GREEN_BITS));
      c.push(
        "w8" +
          (function (D) {
            var B,
              F =
                D.getExtension("EXT_texture_filter_anisotropic") ||
                D.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
                D.getExtension("MOZ_EXT_texture_filter_anisotropic");
            return F
              ? ((B = D.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)),
                0 === B && (B = 2),
                B)
              : null;
          })(b)
      );
      c.push("w9" + b.getParameter(b.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
      c.push("w10" + b.getParameter(b.MAX_CUBE_MAP_TEXTURE_SIZE));
      c.push("w11" + b.getParameter(b.MAX_FRAGMENT_UNIFORM_VECTORS));
      c.push("w12" + b.getParameter(b.MAX_RENDERBUFFER_SIZE));
      c.push("w13" + b.getParameter(b.MAX_TEXTURE_IMAGE_UNITS));
      c.push("w14" + b.getParameter(b.MAX_TEXTURE_SIZE));
      c.push("w15" + b.getParameter(b.MAX_VARYING_VECTORS));
      c.push("w16" + b.getParameter(b.MAX_VERTEX_ATTRIBS));
      c.push("w17" + b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
      c.push("w18" + b.getParameter(b.MAX_VERTEX_UNIFORM_VECTORS));
      c.push("w19" + a(b.getParameter(b.MAX_VIEWPORT_DIMS)));
      c.push("w20" + b.getParameter(b.RED_BITS));
      c.push("w21" + b.getParameter(b.RENDERER));
      c.push("w22" + b.getParameter(b.SHADING_LANGUAGE_VERSION));
      c.push("w23" + b.getParameter(b.STENCIL_BITS));
      c.push("w24" + b.getParameter(b.VENDOR));
      c.push("w25" + b.getParameter(b.VERSION));
      try {
        var C = b.getExtension("WEBGL_debug_renderer_info");
        C &&
          (c.push("wuv:" + b.getParameter(C.UNMASKED_VENDOR_WEBGL)),
          c.push("wur:" + b.getParameter(C.UNMASKED_RENDERER_WEBGL)));
      } catch (D) {}
      return c.join("\u00a7");
    },
    isCanvasSupported: function () {
      return true;
      var a = document.createElement("canvas");
      return !(!a.getContext || !a.getContext("2d"));
    },
    isIE: function () {
      return "Microsoft Internet Explorer" === navigator.appName ||
        ("Netscape" === navigator.appName &&
          /Trident/.test(navigator.userAgent))
        ? !0
        : !1;
    },
    getWebglCanvas: function () {
      return null;
      var a = document.createElement("canvas"),
        b = null;
      try {
        var c = navigator.userAgent;
        c = c.toLowerCase();
        ((0 < c.indexOf("jdjr-app") || 0 <= c.indexOf("jdapp")) &&
          (0 < c.indexOf("iphone") || 0 < c.indexOf("ipad"))) ||
          (b = a.getContext("webgl") || a.getContext("experimental-webgl"));
      } catch (l) {}
      b || (b = null);
      return b;
    },
    each: function (a, b, c) {
      if (null !== a)
        if (this.nativeForEach && a.forEach === this.nativeForEach)
          a.forEach(b, c);
        else if (a.length === +a.length)
          for (
            var l = 0, h = a.length;
            l < h && b.call(c, a[l], l, a) !== {};
            l++
          );
        else
          for (l in a)
            if (a.hasOwnProperty(l) && b.call(c, a[l], l, a) === {}) break;
    },
    map: function (a, b, c) {
      var l = [];
      if (null == a) return l;
      if (this.nativeMap && a.map === this.nativeMap) return a.map(b, c);
      this.each(a, function (h, q, z) {
        l[l.length] = b.call(c, h, q, z);
      });
      return l;
    },
    x64Add: function (a, b) {
      a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
      b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
      var c = [0, 0, 0, 0];
      c[3] += a[3] + b[3];
      c[2] += c[3] >>> 16;
      c[3] &= 65535;
      c[2] += a[2] + b[2];
      c[1] += c[2] >>> 16;
      c[2] &= 65535;
      c[1] += a[1] + b[1];
      c[0] += c[1] >>> 16;
      c[1] &= 65535;
      c[0] += a[0] + b[0];
      c[0] &= 65535;
      return [(c[0] << 16) | c[1], (c[2] << 16) | c[3]];
    },
    x64Multiply: function (a, b) {
      a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
      b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
      var c = [0, 0, 0, 0];
      c[3] += a[3] * b[3];
      c[2] += c[3] >>> 16;
      c[3] &= 65535;
      c[2] += a[2] * b[3];
      c[1] += c[2] >>> 16;
      c[2] &= 65535;
      c[2] += a[3] * b[2];
      c[1] += c[2] >>> 16;
      c[2] &= 65535;
      c[1] += a[1] * b[3];
      c[0] += c[1] >>> 16;
      c[1] &= 65535;
      c[1] += a[2] * b[2];
      c[0] += c[1] >>> 16;
      c[1] &= 65535;
      c[1] += a[3] * b[1];
      c[0] += c[1] >>> 16;
      c[1] &= 65535;
      c[0] += a[0] * b[3] + a[1] * b[2] + a[2] * b[1] + a[3] * b[0];
      c[0] &= 65535;
      return [(c[0] << 16) | c[1], (c[2] << 16) | c[3]];
    },
    x64Rotl: function (a, b) {
      b %= 64;
      if (32 === b) return [a[1], a[0]];
      if (32 > b)
        return [
          (a[0] << b) | (a[1] >>> (32 - b)),
          (a[1] << b) | (a[0] >>> (32 - b)),
        ];
      b -= 32;
      return [
        (a[1] << b) | (a[0] >>> (32 - b)),
        (a[0] << b) | (a[1] >>> (32 - b)),
      ];
    },
    x64LeftShift: function (a, b) {
      b %= 64;
      return 0 === b
        ? a
        : 32 > b
        ? [(a[0] << b) | (a[1] >>> (32 - b)), a[1] << b]
        : [a[1] << (b - 32), 0];
    },
    x64Xor: function (a, b) {
      return [a[0] ^ b[0], a[1] ^ b[1]];
    },
    x64Fmix: function (a) {
      a = this.x64Xor(a, [0, a[0] >>> 1]);
      a = this.x64Multiply(a, [4283543511, 3981806797]);
      a = this.x64Xor(a, [0, a[0] >>> 1]);
      a = this.x64Multiply(a, [3301882366, 444984403]);
      return (a = this.x64Xor(a, [0, a[0] >>> 1]));
    },
    x64hash128: function (a, b) {
      a = a || "";
      b = b || 0;
      var c = a.length % 16,
        l = a.length - c,
        h = [0, b];
      b = [0, b];
      for (
        var q,
          z,
          C = [2277735313, 289559509],
          D = [1291169091, 658871167],
          B = 0;
        B < l;
        B += 16
      )
        (q = [
          (a.charCodeAt(B + 4) & 255) |
            ((a.charCodeAt(B + 5) & 255) << 8) |
            ((a.charCodeAt(B + 6) & 255) << 16) |
            ((a.charCodeAt(B + 7) & 255) << 24),
          (a.charCodeAt(B) & 255) |
            ((a.charCodeAt(B + 1) & 255) << 8) |
            ((a.charCodeAt(B + 2) & 255) << 16) |
            ((a.charCodeAt(B + 3) & 255) << 24),
        ]),
          (z = [
            (a.charCodeAt(B + 12) & 255) |
              ((a.charCodeAt(B + 13) & 255) << 8) |
              ((a.charCodeAt(B + 14) & 255) << 16) |
              ((a.charCodeAt(B + 15) & 255) << 24),
            (a.charCodeAt(B + 8) & 255) |
              ((a.charCodeAt(B + 9) & 255) << 8) |
              ((a.charCodeAt(B + 10) & 255) << 16) |
              ((a.charCodeAt(B + 11) & 255) << 24),
          ]),
          (q = this.x64Multiply(q, C)),
          (q = this.x64Rotl(q, 31)),
          (q = this.x64Multiply(q, D)),
          (h = this.x64Xor(h, q)),
          (h = this.x64Rotl(h, 27)),
          (h = this.x64Add(h, b)),
          (h = this.x64Add(this.x64Multiply(h, [0, 5]), [0, 1390208809])),
          (z = this.x64Multiply(z, D)),
          (z = this.x64Rotl(z, 33)),
          (z = this.x64Multiply(z, C)),
          (b = this.x64Xor(b, z)),
          (b = this.x64Rotl(b, 31)),
          (b = this.x64Add(b, h)),
          (b = this.x64Add(this.x64Multiply(b, [0, 5]), [0, 944331445]));
      q = [0, 0];
      z = [0, 0];
      switch (c) {
        case 15:
          z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 14)], 48));
        case 14:
          z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 13)], 40));
        case 13:
          z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 12)], 32));
        case 12:
          z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 11)], 24));
        case 11:
          z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 10)], 16));
        case 10:
          z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 9)], 8));
        case 9:
          (z = this.x64Xor(z, [0, a.charCodeAt(B + 8)])),
            (z = this.x64Multiply(z, D)),
            (z = this.x64Rotl(z, 33)),
            (z = this.x64Multiply(z, C)),
            (b = this.x64Xor(b, z));
        case 8:
          q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 7)], 56));
        case 7:
          q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 6)], 48));
        case 6:
          q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 5)], 40));
        case 5:
          q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 4)], 32));
        case 4:
          q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 3)], 24));
        case 3:
          q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 2)], 16));
        case 2:
          q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 1)], 8));
        case 1:
          (q = this.x64Xor(q, [0, a.charCodeAt(B)])),
            (q = this.x64Multiply(q, C)),
            (q = this.x64Rotl(q, 31)),
            (q = this.x64Multiply(q, D)),
            (h = this.x64Xor(h, q));
      }
      h = this.x64Xor(h, [0, a.length]);
      b = this.x64Xor(b, [0, a.length]);
      h = this.x64Add(h, b);
      b = this.x64Add(b, h);
      h = this.x64Fmix(h);
      b = this.x64Fmix(b);
      h = this.x64Add(h, b);
      b = this.x64Add(b, h);
      return (
        ("00000000" + (h[0] >>> 0).toString(16)).slice(-8) +
        ("00000000" + (h[1] >>> 0).toString(16)).slice(-8) +
        ("00000000" + (b[0] >>> 0).toString(16)).slice(-8) +
        ("00000000" + (b[1] >>> 0).toString(16)).slice(-8)
      );
    },
  };
}

class JDDMAC {
  static t() {
    return "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D"
      .split(" ")
      .map(function (v) {
        return parseInt(v, 16);
      });
  }

  mac(v) {
    for (var x = -1, w = 0, A = v.length; w < A; w++)
      x = (x >>> 8) ^ t[(x ^ v.charCodeAt(w)) & 255];
    return (x ^ -1) >>> 0;
  }
}

var _CurrentPageProtocol =
    "https:" == document.location.protocol ? "https://" : "http://",
  _JdJrTdRiskDomainName = window.__fp_domain || "gia.jd.com",
  _url_query_str = "",
  _root_domain = "",
  _CurrentPageUrl = (function () {
    var t = document.location.href.toString();
    try {
      _root_domain =
        /^https?:\/\/(?:\w+\.)*?(\w*\.(?:com\.cn|cn|com|net|id))[\\\/]*/.exec(
          t
        )[1];
    } catch (v) {}
    var u = t.indexOf("?");
    0 < u &&
      ((_url_query_str = t.substring(u + 1)),
      500 < _url_query_str.length &&
        (_url_query_str = _url_query_str.substring(0, 499)),
      (t = t.substring(0, u)));
    return (t = t.substring(_CurrentPageProtocol.length));
  })(),
  jd_shadow__ = (function () {
    try {
      var t = $.CryptoJS,
        u = [];
      u.push(_CurrentPageUrl);
      var v = generateUuid();
      u.push(v);
      var x = new Date().getTime();
      u.push(x);
      var w = t.SHA1(u.join("")).toString().toUpperCase();
      u = [];
      u.push("JD3");
      u.push(w);
      var A = new JDDMAC().mac(u.join(""));
      u.push(A);
      var y = t.enc.Hex.parse("30313233343536373839616263646566"),
        n = t.enc.Hex.parse("4c5751554935255042304e6458323365"),
        e = u.join("");
      return t.AES.encrypt(t.enc.Utf8.parse(e), n, {
        mode: t.mode.CBC,
        padding: t.pad.Pkcs7,
        iv: y,
      }).ciphertext.toString(t.enc.Base32);
    } catch (f) {
      console.log(f);
    }
  })();
var td_collect = new (function () {
  function t() {
    var n =
      window.webkitRTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.RTCPeerConnection;
    if (n) {
      var e = function (k) {
          var g = /([0-9]{1,3}(\.[0-9]{1,3}){3})/,
            m =
              /\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*/;
          try {
            var a = g.exec(k);
            if (null == a || 0 == a.length || void 0 == a) a = m.exec(k);
            var b = a[1];
            void 0 === f[b] && w.push(b);
            f[b] = !0;
          } catch (c) {}
        },
        f = {};
      try {
        var r = new n({
          iceServers: [
            {
              url: "stun:stun.services.mozilla.com",
            },
          ],
        });
      } catch (k) {}
      try {
        void 0 === r &&
          (r = new n({
            iceServers: [],
          }));
      } catch (k) {}
      if (r || window.mozRTCPeerConnection)
        try {
          r.createDataChannel("chat", {
            reliable: !1,
          });
        } catch (k) {}
      r &&
        ((r.onicecandidate = function (k) {
          k.candidate && e(k.candidate.candidate);
        }),
        r.createOffer(
          function (k) {
            r.setLocalDescription(
              k,
              function () {},
              function () {}
            );
          },
          function () {}
        ),
        setTimeout(function () {
          try {
            r.localDescription.sdp.split("\n").forEach(function (k) {
              0 === k.indexOf("a=candidate:") && e(k);
            });
          } catch (k) {}
        }, 800));
    }
  }

  function u(n) {
    var e;
    return (e = document.cookie.match(
      new RegExp("(^| )" + n + "=([^;]*)(;|$)")
    ))
      ? e[2]
      : "";
  }

  function v() {
    function n(g) {
      var m = {};
      r.style.fontFamily = g;
      document.body.appendChild(r);
      m.height = r.offsetHeight;
      m.width = r.offsetWidth;
      document.body.removeChild(r);
      return m;
    }

    var e = ["monospace", "sans-serif", "serif"],
      f = [],
      r = document.createElement("span");
    r.style.fontSize = "72px";
    r.style.visibility = "hidden";
    r.innerHTML = "mmmmmmmmmmlli";
    for (var k = 0; k < e.length; k++) f[k] = n(e[k]);
    this.checkSupportFont = function (g) {
      for (var m = 0; m < f.length; m++) {
        var a = n(g + "," + e[m]),
          b = f[m];
        if (a.height !== b.height || a.width !== b.width) return !0;
      }
      return !1;
    };
  }

  function x(n) {
    var e = {};
    e.name = n.name;
    e.filename = n.filename.toLowerCase();
    e.description = n.description;
    void 0 !== n.version && (e.version = n.version);
    e.mimeTypes = [];
    for (var f = 0; f < n.length; f++) {
      var r = n[f],
        k = {};
      k.description = r.description;
      k.suffixes = r.suffixes;
      k.type = r.type;
      e.mimeTypes.push(k);
    }
    return e;
  }

  this.bizId = "";
  this.bioConfig = {
    type: "42",
    operation: 1,
    duraTime: 2,
    interval: 50,
  };
  this.worder = null;
  this.deviceInfo = {
    userAgent: "",
    isJdApp: !1,
    isJrApp: !1,
    sdkToken: "",
    fp: "",
    eid: "",
  };
  this.isRpTok = !1;
  this.obtainLocal = function (n) {
    n = "undefined" !== typeof n && n ? !0 : !1;
    var e = {};
    try {
      var f = document.cookie.replace(
        /(?:(?:^|.*;\s*)3AB9D23F7A4B3C9B\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      0 !== f.length && (e.cookie = f);
    } catch (k) {}
    try {
      window.localStorage &&
        null !== window.localStorage &&
        0 !== window.localStorage.length &&
        (e.localStorage = window.localStorage.getItem("3AB9D23F7A4B3C9B"));
    } catch (k) {}
    try {
      window.sessionStorage &&
        null !== window.sessionStorage &&
        (e.sessionStorage = window.sessionStorage["3AB9D23F7A4B3C9B"]);
    } catch (k) {}
    try {
      p.globalStorage &&
        (e.globalStorage =
          window.globalStorage[".localdomain"]["3AB9D23F7A4B3C9B"]);
    } catch (k) {}
    try {
      d &&
        "function" == typeof d.load &&
        "function" == typeof d.getAttribute &&
        (d.load("jdgia_user_data"),
        (e.userData = d.getAttribute("3AB9D23F7A4B3C9B")));
    } catch (k) {}
    try {
      E.indexedDbId && (e.indexedDb = E.indexedDbId);
    } catch (k) {}
    try {
      E.webDbId && (e.webDb = E.webDbId);
    } catch (k) {}
    try {
      for (var r in e)
        if (32 < e[r].length) {
          _JdEid = e[r];
          n || (_eidFlag = !0);
          break;
        }
    } catch (k) {}
    try {
      ("undefined" === typeof _JdEid || 0 >= _JdEid.length) &&
        this.db("3AB9D23F7A4B3C9B");
      if ("undefined" === typeof _JdEid || 0 >= _JdEid.length)
        _JdEid = u("3AB9D23F7A4B3C9B");
      if ("undefined" === typeof _JdEid || 0 >= _JdEid.length) _eidFlag = !0;
    } catch (k) {}
    return _JdEid;
  };
  var w = [],
    A =
      "Abadi MT Condensed Light;Adobe Fangsong Std;Adobe Hebrew;Adobe Ming Std;Agency FB;Arab;Arabic Typesetting;Arial Black;Batang;Bauhaus 93;Bell MT;Bitstream Vera Serif;Bodoni MT;Bookman Old Style;Braggadocio;Broadway;Calibri;Californian FB;Castellar;Casual;Centaur;Century Gothic;Chalkduster;Colonna MT;Copperplate Gothic Light;DejaVu LGC Sans Mono;Desdemona;DFKai-SB;Dotum;Engravers MT;Eras Bold ITC;Eurostile;FangSong;Forte;Franklin Gothic Heavy;French Script MT;Gabriola;Gigi;Gisha;Goudy Old Style;Gulim;GungSeo;Haettenschweiler;Harrington;Hiragino Sans GB;Impact;Informal Roman;KacstOne;Kino MT;Kozuka Gothic Pr6N;Lohit Gujarati;Loma;Lucida Bright;Lucida Fax;Magneto;Malgun Gothic;Matura MT Script Capitals;Menlo;MingLiU-ExtB;MoolBoran;MS PMincho;MS Reference Sans Serif;News Gothic MT;Niagara Solid;Nyala;Palace Script MT;Papyrus;Perpetua;Playbill;PMingLiU;Rachana;Rockwell;Sawasdee;Script MT Bold;Segoe Print;Showcard Gothic;SimHei;Snap ITC;TlwgMono;Tw Cen MT Condensed Extra Bold;Ubuntu;Umpush;Univers;Utopia;Vladimir Script;Wide Latin".split(
        ";"
      ),
    y =
      "4game;AdblockPlugin;AdobeExManCCDetect;AdobeExManDetect;Alawar NPAPI utils;Aliedit Plug-In;Alipay Security Control 3;AliSSOLogin plugin;AmazonMP3DownloaderPlugin;AOL Media Playback Plugin;AppUp;ArchiCAD;AVG SiteSafety plugin;Babylon ToolBar;Battlelog Game Launcher;BitCometAgent;Bitdefender QuickScan;BlueStacks Install Detector;CatalinaGroup Update;Citrix ICA Client;Citrix online plug-in;Citrix Receiver Plug-in;Coowon Update;DealPlyLive Update;Default Browser Helper;DivX Browser Plug-In;DivX Plus Web Player;DivX VOD Helper Plug-in;doubleTwist Web Plugin;Downloaders plugin;downloadUpdater;eMusicPlugin DLM6;ESN Launch Mozilla Plugin;ESN Sonar API;Exif Everywhere;Facebook Plugin;File Downloader Plug-in;FileLab plugin;FlyOrDie Games Plugin;Folx 3 Browser Plugin;FUZEShare;GDL Object Web Plug-in 16.00;GFACE Plugin;Ginger;Gnome Shell Integration;Google Earth Plugin;Google Earth Plug-in;Google Gears 0.5.33.0;Google Talk Effects Plugin;Google Update;Harmony Firefox Plugin;Harmony Plug-In;Heroes & Generals live;HPDetect;Html5 location provider;IE Tab plugin;iGetterScriptablePlugin;iMesh plugin;Kaspersky Password Manager;LastPass;LogMeIn Plugin 1.0.0.935;LogMeIn Plugin 1.0.0.961;Ma-Config.com plugin;Microsoft Office 2013;MinibarPlugin;Native Client;Nitro PDF Plug-In;Nokia Suite Enabler Plugin;Norton Identity Safe;npAPI Plugin;NPLastPass;NPPlayerShell;npTongbuAddin;NyxLauncher;Octoshape Streaming Services;Online Storage plug-in;Orbit Downloader;Pando Web Plugin;Parom.TV player plugin;PDF integrado do WebKit;PDF-XChange Viewer;PhotoCenterPlugin1.1.2.2;Picasa;PlayOn Plug-in;QQ2013 Firefox Plugin;QQDownload Plugin;QQMiniDL Plugin;QQMusic;RealDownloader Plugin;Roblox Launcher Plugin;RockMelt Update;Safer Update;SafeSearch;Scripting.Dictionary;SefClient Plugin;Shell.UIHelper;Silverlight Plug-In;Simple Pass;Skype Web Plugin;SumatraPDF Browser Plugin;Symantec PKI Client;Tencent FTN plug-in;Thunder DapCtrl NPAPI Plugin;TorchHelper;Unity Player;Uplay PC;VDownloader;Veetle TV Core;VLC Multimedia Plugin;Web Components;WebKit-integrierte PDF;WEBZEN Browser Extension;Wolfram Mathematica;WordCaptureX;WPI Detector 1.4;Yandex Media Plugin;Yandex PDF Viewer;YouTube Plug-in;zako".split(
        ";"
      );
  this.toJson = "object" === typeof JSON && JSON.stringify;
  this.init = function () {
    _fingerprint_step = 6;
    t();
    _fingerprint_step = 7;
    "function" !== typeof this.toJson &&
      (this.toJson = function (n) {
        var e = typeof n;
        if ("undefined" === e || null === n) return "null";
        if ("number" === e || "boolean" === e) return n + "";
        if ("object" === e && n && n.constructor === Array) {
          e = [];
          for (var f = 0; n.length > f; f++) e.push(this.toJson(n[f]));
          return "[" + (e + "]");
        }
        if ("object" === e) {
          e = [];
          for (f in n)
            n.hasOwnProperty(f) && e.push('"' + f + '":' + this.toJson(n[f]));
          return "{" + (e + "}");
        }
      });
    this.sdkCollectInit();
  };
  this.sdkCollectInit = function () {
    try {
      try {
        bp_bizid && (this.bizId = bp_bizid);
      } catch (f) {
        this.bizId = "jsDefault";
      }
      var n = navigator.userAgent.toLowerCase(),
        e =
          !n.match(/(iphone|ipad|ipod)/i) &&
          (-1 < n.indexOf("android") || -1 < n.indexOf("adr"));
      this.deviceInfo.isJdApp = -1 < n.indexOf("jdapp");
      this.deviceInfo.isJrApp = -1 < n.indexOf("jdjr");
      this.deviceInfo.userAgent = navigator.userAgent;
      this.deviceInfo.isAndroid = e;
      this.createWorker();
    } catch (f) {}
  };
  this.db = function (n, e) {
    try {
      _fingerprint_step = "m";
      if (window.openDatabase) {
        var f = window.openDatabase(
          "sqlite_jdtdstorage",
          "",
          "jdtdstorage",
          1048576
        );
        void 0 !== e && "" != e
          ? f.transaction(function (r) {
              r.executeSql(
                "CREATE TABLE IF NOT EXISTS cache(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, value TEXT NOT NULL, UNIQUE (name))",
                [],
                function (k, g) {},
                function (k, g) {}
              );
              r.executeSql(
                "INSERT OR REPLACE INTO cache(name, value) VALUES(?, ?)",
                [n, e],
                function (k, g) {},
                function (k, g) {}
              );
            })
          : f.transaction(function (r) {
              r.executeSql(
                "SELECT value FROM cache WHERE name=?",
                [n],
                function (k, g) {
                  1 <= g.rows.length && (_JdEid = g.rows.item(0).value);
                },
                function (k, g) {}
              );
            });
      }
      _fingerprint_step = "n";
    } catch (r) {}
  };
  this.setCookie = function (n, e) {
    void 0 !== e &&
      "" != e &&
      (document.cookie =
        n +
        "=" +
        e +
        "; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/; domain=" +
        _root_domain);
  };
  this.tdencrypt = function (n) {
    n = this.toJson(n);
    n = encodeURIComponent(n);
    var e = "",
      f = 0;
    do {
      var r = n.charCodeAt(f++);
      var k = n.charCodeAt(f++);
      var g = n.charCodeAt(f++);
      var m = r >> 2;
      r = ((r & 3) << 4) | (k >> 4);
      var a = ((k & 15) << 2) | (g >> 6);
      var b = g & 63;
      isNaN(k) ? (a = b = 64) : isNaN(g) && (b = 64);
      e =
        e +
        "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(
          m
        ) +
        "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(
          r
        ) +
        "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(
          a
        ) +
        "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(
          b
        );
    } while (f < n.length);
    return e + "/";
  };
  this.collect = function () {
    var n = new Date();
    try {
      var e = document.createElement("div"),
        f = {},
        r =
          "ActiveBorder ActiveCaption AppWorkspace Background ButtonFace ButtonHighlight ButtonShadow ButtonText CaptionText GrayText Highlight HighlightText InactiveBorder InactiveCaption InactiveCaptionText InfoBackground InfoText Menu MenuText Scrollbar ThreeDDarkShadow ThreeDFace ThreeDHighlight ThreeDLightShadow ThreeDShadow Window WindowFrame WindowText".split(
            " "
          );
      if (window.getComputedStyle)
        for (var k = 0; k < r.length; k++)
          document.body.appendChild(e),
            (e.style.color = r[k]),
            (f[r[k]] = window.getComputedStyle(e).getPropertyValue("color")),
            document.body.removeChild(e);
    } catch (D) {}
    e = {
      ca: {},
      ts: {},
      m: {},
    };
    r = e.ca;
    r.tdHash = _jdfp_canvas_md5;
    var g = !1;
    if ((k = window.WebGLRenderingContext))
      (k = navigator.userAgent),
        (k = k.toLowerCase()),
        (k =
          (0 < k.indexOf("jdjr-app") || 0 <= k.indexOf("jdapp")) &&
          (0 < k.indexOf("iphone") || 0 < k.indexOf("ipad"))
            ? !0
            : !1),
        (k = !k);
    if (k) {
      var m = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
        a = [],
        b;
      for (k = 0; k < m.length; k++)
        try {
          var c = !1;
          (c = document.createElement("canvas").getContext(m[k], {
            stencil: !0,
          })) &&
            c &&
            ((b = c), a.push(m[k]));
        } catch (D) {}
      a.length &&
        (g = {
          name: a,
          gl: b,
        });
    }
    if (g) {
      k = g.gl;
      r.contextName = g.name.join();
      r.webglversion = k.getParameter(k.VERSION);
      r.shadingLV = k.getParameter(k.SHADING_LANGUAGE_VERSION);
      r.vendor = k.getParameter(k.VENDOR);
      r.renderer = k.getParameter(k.RENDERER);
      b = [];
      try {
        (b = k.getSupportedExtensions()), (r.extensions = b);
      } catch (D) {}
      try {
        var l = k.getExtension("WEBGL_debug_renderer_info");
        l &&
          ((r.wuv = k.getParameter(l.UNMASKED_VENDOR_WEBGL)),
          (r.wur = k.getParameter(l.UNMASKED_RENDERER_WEBGL)));
      } catch (D) {}
    }
    e.m.documentMode = document.documentMode;
    e.m.compatMode = document.compatMode;
    l = [];
    // r = new v;
    // for (k = 0; k < A.length; k++) b = A[k], r.checkSupportFont(b) && l.push(b);
    e.fo = l;
    k = {};
    l = [];
    for (var h in navigator)
      "object" != typeof navigator[h] && (k[h] = navigator[h]), l.push(h);
    k.enumerationOrder = l;
    k.javaEnabled = false;
    try {
      k.taintEnabled = navigator.taintEnabled();
    } catch (D) {}
    e.n = k;
    k = navigator.userAgent.toLowerCase();
    if ((h = k.match(/rv:([\d.]+)\) like gecko/))) var q = h[1];
    if ((h = k.match(/msie ([\d.]+)/))) q = h[1];
    h = [];
    if (q)
      for (
        q =
          "AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);rmocx.RealPlayer G2 Control;Scripting.Dictionary;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;SWCtl.SWCtl;TDCCtl.TDCCtl;WMPlayer.OCX".split(
            ";"
          ),
          k = 0;
        k < q.length;
        k++
      ) {
        var z = q[k];
        try {
          var C = new ActiveXObject(z);
          l = {};
          l.name = z;
          try {
            l.version = C.GetVariable("$version");
          } catch (D) {}
          try {
            l.version = C.GetVersions();
          } catch (D) {}
          (l.version && 0 < l.version.length) || (l.version = "");
          h.push(l);
        } catch (D) {}
      }
    else {
      q = navigator.plugins;
      l = {};
      for (k = 0; k < q.length; k++) (z = q[k]), (l[z.name] = 1), h.push(x(z));
      for (k = 0; k < y.length; k++)
        (C = y[k]), l[C] || ((z = q[C]), z && h.push(x(z)));
    }
    q =
      "availHeight availWidth colorDepth bufferDepth deviceXDPI deviceYDPI height width logicalXDPI logicalYDPI pixelDepth updateInterval".split(
        " "
      );
    z = {};
    for (k = 0; q.length > k; k++)
      (C = q[k]), void 0 !== screen[C] && (z[C] = screen[C]);
    q = ["devicePixelRatio", "screenTop", "screenLeft"];
    l = {};
    for (k = 0; q.length > k; k++)
      (C = q[k]), void 0 !== window[C] && (l[C] = window[C]);
    e.p = h;
    e.w = l;
    e.s = z;
    e.sc = f;
    e.tz = n.getTimezoneOffset();
    e.lil = w.sort().join("|");
    e.wil = "";
    f = {};
    try {
      (f.cookie = navigator.cookieEnabled),
        (f.localStorage = !!window.localStorage),
        (f.sessionStorage = !!window.sessionStorage),
        (f.globalStorage = !!window.globalStorage),
        (f.indexedDB = !!window.indexedDB);
    } catch (D) {}
    e.ss = f;
    e.ts.deviceTime = n.getTime();
    e.ts.deviceEndTime = new Date().getTime();
    return this.tdencrypt(e);
  };
  this.collectSdk = function (n) {
    try {
      var e = this,
        f = !1,
        r = e.getLocal("BATQW722QTLYVCRD");
      if (null != r && void 0 != r && "" != r)
        try {
          var k = JSON.parse(r),
            g = new Date().getTime();
          null != k &&
            void 0 != k.t &&
            "number" == typeof k.t &&
            (12e5 >= g - k.t &&
            void 0 != k.tk &&
            null != k.tk &&
            "" != k.tk &&
            k.tk.startsWith("jdd")
              ? ((e.deviceInfo.sdkToken = k.tk), (f = !0))
              : void 0 != k.tk &&
                null != k.tk &&
                "" != k.tk &&
                (e.deviceInfo.sdkToken = k.tk));
        } catch (m) {}
      r = !1;
      e.deviceInfo.isJdApp
        ? ((e.deviceInfo.clientVersion = navigator.userAgent.split(";")[2]),
          (r = 0 < e.compareVersion(e.deviceInfo.clientVersion, "7.0.2")) &&
            !f &&
            e.getJdSdkCacheToken(function (m) {
              e.deviceInfo.sdkToken = m;
              (null != m && "" != m && m.startsWith("jdd")) ||
                e.getJdBioToken(n);
            }))
        : e.deviceInfo.isJrApp &&
          ((e.deviceInfo.clientVersion = navigator.userAgent.match(
            /clientVersion=([^&]*)(&|$)/
          )[1]),
          (r = 0 < e.compareVersion(e.deviceInfo.clientVersion, "4.6.0")) &&
            !f &&
            e.getJdJrSdkCacheToken(function (m) {
              e.deviceInfo.sdkToken = m;
              (null != m && "" != m && m.startsWith("jdd")) ||
                e.getJdJrBioToken(n);
            }));
      "function" == typeof n && n(e.deviceInfo);
    } catch (m) {}
  };
  this.compareVersion = function (n, e) {
    try {
      if (n === e) return 0;
      var f = n.split(".");
      var r = e.split(".");
      for (n = 0; n < f.length; n++) {
        var k = parseInt(f[n]);
        if (!r[n]) return 1;
        var g = parseInt(r[n]);
        if (k < g) break;
        if (k > g) return 1;
      }
    } catch (m) {}
    return -1;
  };
  this.isWKWebView = function () {
    return this.deviceInfo.userAgent.match(/supportJDSHWK/i) ||
      1 == window._is_jdsh_wkwebview
      ? !0
      : !1;
  };
  this.getErrorToken = function (n) {
    try {
      if (n) {
        var e = (n + "").match(/"token":"(.*?)"/);
        if (e && 1 < e.length) return e[1];
      }
    } catch (f) {}
    return "";
  };
  this.getJdJrBioToken = function (n) {
    var e = this;
    "undefined" != typeof JrBridge &&
      null != JrBridge &&
      "undefined" != typeof JrBridge._version &&
      (0 > e.compareVersion(JrBridge._version, "2.0.0")
        ? console.error(
            "\u6865\u7248\u672c\u4f4e\u4e8e2.0\u4e0d\u652f\u6301bio"
          )
        : JrBridge.callNative(
            {
              type: e.bioConfig.type,
              operation: e.bioConfig.operation,
              biometricData: {
                bizId: e.bizId,
                duraTime: e.bioConfig.duraTime,
                interval: e.bioConfig.interval,
              },
            },
            function (f) {
              try {
                "object" != typeof f && (f = JSON.parse(f)),
                  (e.deviceInfo.sdkToken = f.token);
              } catch (r) {
                console.error(r);
              }
              null != e.deviceInfo.sdkToken &&
                "" != e.deviceInfo.sdkToken &&
                ((f = {
                  tk: e.deviceInfo.sdkToken,
                  t: new Date().getTime(),
                }),
                e.store("BATQW722QTLYVCRD", JSON.stringify(f)));
            }
          ));
  };
  this.getJdJrSdkCacheToken = function (n) {
    var e = this;
    try {
      "undefined" == typeof JrBridge ||
        null == JrBridge ||
        "undefined" == typeof JrBridge._version ||
        0 > e.compareVersion(JrBridge._version, "2.0.0") ||
        JrBridge.callNative(
          {
            type: e.bioConfig.type,
            operation: 5,
            biometricData: {
              bizId: e.bizId,
              duraTime: e.bioConfig.duraTime,
              interval: e.bioConfig.interval,
            },
          },
          function (f) {
            var r = "";
            try {
              "object" != typeof f && (f = JSON.parse(f)), (r = f.token);
            } catch (k) {
              console.error(k);
            }
            null != r &&
              "" != r &&
              "function" == typeof n &&
              (n(r),
              r.startsWith("jdd") &&
                ((f = {
                  tk: r,
                  t: new Date().getTime(),
                }),
                e.store("BATQW722QTLYVCRD", JSON.stringify(f))));
          }
        );
    } catch (f) {}
  };
  this.getJdBioToken = function (n) {
    var e = this;
    n = JSON.stringify({
      businessType: "bridgeBiologicalProbe",
      callBackName: "_bioDeviceCb",
      params: {
        pin: "",
        jsonData: {
          type: e.bioConfig.type,
          operation: e.bioConfig.operation,
          data: {
            bizId: e.bizId,
            duraTime: e.bioConfig.duraTime,
            interval: e.bioConfig.interval,
          },
          biometricData: {
            bizId: e.bizId,
            duraTime: e.bioConfig.duraTime,
            interval: e.bioConfig.interval,
          },
        },
      },
    });
    e.isWKWebView()
      ? window.webkit.messageHandlers.JDAppUnite.postMessage({
          method: "notifyMessageToNative",
          params: n,
        })
      : window.JDAppUnite && window.JDAppUnite.notifyMessageToNative(n);
    window._bioDeviceCb = function (f) {
      try {
        var r = "object" == typeof f ? f : JSON.parse(f);
        if (void 0 != r && null != r && "0" != r.status) return;
        null != r.data.token &&
          void 0 != r.data.token &&
          "" != r.data.token &&
          (e.deviceInfo.sdkToken = r.data.token);
      } catch (k) {
        (f = e.getErrorToken(f)),
          null != f && "" != f && (e.deviceInfo.sdkToken = f);
      }
      null != e.deviceInfo.sdkToken &&
        "" != e.deviceInfo.sdkToken &&
        ((f = {
          tk: e.deviceInfo.sdkToken,
          t: new Date().getTime(),
        }),
        e.store("BATQW722QTLYVCRD", JSON.stringify(f)));
    };
  };
  this.getJdSdkCacheToken = function (n) {
    try {
      var e = this,
        f = JSON.stringify({
          businessType: "bridgeBiologicalProbe",
          callBackName: "_bioDeviceSdkCacheCb",
          params: {
            pin: "",
            jsonData: {
              type: e.bioConfig.type,
              operation: 5,
              data: {
                bizId: e.bizId,
                duraTime: e.bioConfig.duraTime,
                interval: e.bioConfig.interval,
              },
              biometricData: {
                bizId: e.bizId,
                duraTime: e.bioConfig.duraTime,
                interval: e.bioConfig.interval,
              },
            },
          },
        });
      e.isWKWebView()
        ? window.webkit.messageHandlers.JDAppUnite.postMessage({
            method: "notifyMessageToNative",
            params: f,
          })
        : window.JDAppUnite && window.JDAppUnite.notifyMessageToNative(f);
      window._bioDeviceSdkCacheCb = function (r) {
        var k = "";
        try {
          var g = "object" == typeof r ? r : JSON.parse(r);
          if (void 0 != g && null != g && "0" != g.status) return;
          k = g.data.token;
        } catch (m) {
          k = e.getErrorToken(r);
        }
        null != k &&
          "" != k &&
          "function" == typeof n &&
          (n(k),
          k.startsWith("jdd") &&
            ((r = {
              tk: k,
              t: new Date().getTime(),
            }),
            e.store("BATQW722QTLYVCRD", JSON.stringify(r))));
      };
    } catch (r) {}
  };
  this.store = function (n, e) {
    try {
      this.setCookie(n, e);
    } catch (f) {}
    try {
      window.localStorage && window.localStorage.setItem(n, e);
    } catch (f) {}
    try {
      window.sessionStorage && window.sessionStorage.setItem(n, e);
    } catch (f) {}
    try {
      window.globalStorage &&
        window.globalStorage[".localdomain"].setItem(n, e);
    } catch (f) {}
    try {
      this.db(n, _JdEid);
    } catch (f) {}
  };
  this.getLocal = function (n) {
    var e = {},
      f = null;
    try {
      var r = document.cookie.replace(
        new RegExp("(?:(?:^|.*;\\s*)" + n + "\\s*\\=\\s*([^;]*).*$)|^.*$"),
        "$1"
      );
      0 !== r.length && (e.cookie = r);
    } catch (g) {}
    try {
      window.localStorage &&
        null !== window.localStorage &&
        0 !== window.localStorage.length &&
        (e.localStorage = window.localStorage.getItem(n));
    } catch (g) {}
    try {
      window.sessionStorage &&
        null !== window.sessionStorage &&
        (e.sessionStorage = window.sessionStorage[n]);
    } catch (g) {}
    try {
      p.globalStorage &&
        (e.globalStorage = window.globalStorage[".localdomain"][n]);
    } catch (g) {}
    try {
      d &&
        "function" == typeof d.load &&
        "function" == typeof d.getAttribute &&
        (d.load("jdgia_user_data"), (e.userData = d.getAttribute(n)));
    } catch (g) {}
    try {
      E.indexedDbId && (e.indexedDb = E.indexedDbId);
    } catch (g) {}
    try {
      E.webDbId && (e.webDb = E.webDbId);
    } catch (g) {}
    try {
      for (var k in e)
        if (32 < e[k].length) {
          f = e[k];
          break;
        }
    } catch (g) {}
    try {
      if (null == f || "undefined" === typeof f || 0 >= f.length) f = u(n);
    } catch (g) {}
    return f;
  };
  this.createWorker = function () {
    if (window.Worker) {
      try {
        var n = new Blob(
          [
            "onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, false);\n            httpRequest['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};",
          ],
          {
            type: "application/javascript",
          }
        );
      } catch (e) {
        (window.BlobBuilder =
          window.BlobBuilder ||
          window.WebKitBlobBuilder ||
          window.MozBlobBuilder),
          (n = new BlobBuilder()),
          n.append(
            "onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, false);\n            httpRequest['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};"
          ),
          (n = n.getBlob());
      }
      try {
        this.worker = new Worker(URL.createObjectURL(n));
      } catch (e) {}
    }
  };
  this.reportWorker = function (n, e, f, r) {
    try {
      null != this.worker &&
        (this.worker.postMessage(
          JSON.stringify({
            url: n,
            data: e,
            success: !1,
            async: !1,
          })
        ),
        (this.worker.onmessage = function (k) {}));
    } catch (k) {}
  };
})();

function td_collect_exe() {
  _fingerprint_step = 8;
  var t = td_collect.collect();
  td_collect.collectSdk();
  var u = "string" === typeof orderId ? orderId : "",
    v = "undefined" !== typeof jdfp_pinenp_ext && jdfp_pinenp_ext ? 2 : 1;
  u = {
    pin: _jdJrTdCommonsObtainPin(v),
    oid: u,
    p: "https:" == document.location.protocol ? "s" : "h",
    fp: risk_jd_local_fingerprint,
    ctype: v,
    v: "2.7.10.4",
    f: "3",
  };
  try {
    (u.o = _CurrentPageUrl), (u.qs = _url_query_str);
  } catch (w) {}
  _fingerprint_step = 9;
  0 >= _JdEid.length &&
    ((_JdEid = td_collect.obtainLocal()), 0 < _JdEid.length && (_eidFlag = !0));
  u.fc = _JdEid;
  try {
    u.t = jd_risk_token_id;
  } catch (w) {}
  try {
    if ("undefined" != typeof gia_fp_qd_uuid && 0 <= gia_fp_qd_uuid.length)
      u.qi = gia_fp_qd_uuid;
    else {
      var x = _JdJrRiskClientStorage.jdtdstorage_cookie("qd_uid");
      u.qi = void 0 == x ? "" : x;
    }
  } catch (w) {}
  "undefined" != typeof jd_shadow__ &&
    0 < jd_shadow__.length &&
    (u.jtb = jd_shadow__);
  try {
    td_collect.deviceInfo &&
    void 0 != td_collect.deviceInfo &&
    null != td_collect.deviceInfo.sdkToken &&
    "" != td_collect.deviceInfo.sdkToken
      ? ((u.stk = td_collect.deviceInfo.sdkToken), (td_collect.isRpTok = !0))
      : (td_collect.isRpTok = !1);
  } catch (w) {
    td_collect.isRpTok = !1;
  }
  x = td_collect.tdencrypt(u);
  // console.log(u)
  return { a: x, d: t };
}

function _jdJrTdCommonsObtainPin(t) {
  var u = "";
  "string" === typeof jd_jr_td_risk_pin && 1 == t
    ? (u = jd_jr_td_risk_pin)
    : "string" === typeof pin
    ? (u = pin)
    : "object" === typeof pin &&
      "string" === typeof jd_jr_td_risk_pin &&
      (u = jd_jr_td_risk_pin);
  return u;
}

function getBody(userAgent, url = document.location.href) {
  navigator.userAgent = userAgent;
  let href = url;
  let choose = /((https?:)\/\/([^\/]+))(.+)/.exec(url);
  let [, origin, protocol, host, pathname] = choose;
  document.location.href = href;
  document.location.origin = origin;
  document.location.protocol = protocol;
  document.location.host = host;
  document.location.pathname = pathname;
  const JF = new JdJrTdRiskFinger();
  let fp = JF.f.get(function (t) {
    risk_jd_local_fingerprint = t;
    return t;
  });
  let arr = td_collect_exe();
  return { fp, ...arr };
}

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date(new Date().getTime()+new Date().getTimezoneOffset()*60*1000+8*60*60*1000);let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}