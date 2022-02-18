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

const $ = new Env('CJ组队瓜分京豆');
var _0xodl='jsjiami.com.v6',_0xodl_=['_0xodl'],_0x3c82=[_0xodl,'\x69\x73\x4e\x6f\x64\x65','\x2e\x2f\x73\x65\x6e\x64\x4e\x6f\x74\x69\x66\x79','\x2e\x2f\x6a\x64\x43\x6f\x6f\x6b\x69\x65\x2e\x6a\x73','\x67\x65\x74\x64\x61\x74\x61','\x6a\x64\x5f\x6b\x72\x5f\x63\x6a\x68\x79\x5f\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64','\x6a\x64\x5f\x6b\x72\x5f\x63\x6a\x68\x79\x5f\x61\x63\x74\x69\x76\x69\x74\x79\x55\x72\x6c','\x65\x6e\x76','\x6a\x64\x5f\x63\x6a\x68\x79\x5f\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64','\x6a\x64\x5f\x63\x6a\x68\x79\x5f\x61\x63\x74\x69\x76\x69\x74\x79\x55\x72\x6c','\x73\x74\x72\x69\x6e\x67\x69\x66\x79','\x69\x6e\x64\x65\x78\x4f\x66','\x47\x49\x54\x48\x55\x42','\x65\x78\x69\x74','\x6b\x65\x79\x73','\x66\x6f\x72\x45\x61\x63\x68','\x70\x75\x73\x68','\x4a\x44\x5f\x44\x45\x42\x55\x47','\x66\x61\x6c\x73\x65','\x6c\x6f\x67','\x43\x6f\x6f\x6b\x69\x65\x4a\x44','\x43\x6f\x6f\x6b\x69\x65\x4a\x44\x32','\x74\x6f\x4f\x62\x6a','\x43\x6f\x6f\x6b\x69\x65\x73\x4a\x44','\x6d\x61\x70','\x63\x6f\x6f\x6b\x69\x65','\x66\x69\x6c\x74\x65\x72','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x63\x6c\x69\x65\x6e\x74\x2e\x61\x63\x74\x69\x6f\x6e','\x75\x6e\x64\x65\x66\x69\x6e\x65\x64','\x64\x6f\x6e\x65','\x0a\u3010\u5982\u679c\u663e\u793a\uff1a\u5956\u54c1\u4e0e\u60a8\u64e6\u80a9\u800c\u8fc7\u4e86\u54df\uff0c\u606d\u559c\u4f60\x20\u6b64\u811a\u672c\u4e0d\u7528\u8dd1\u4e86\uff01\x20\u3011\x0a\u3010\u5982\u679c\u663e\u793a\uff1a\x52\x65\x73\x70\x6f\x6e\x73\x65\x20\x63\x6f\x64\x65\x20\x34\x39\x33\x20\uff0c\u606d\u559c\u4f60\x20\u6b64\u5bb9\u5668\x20\x49\x50\x20\u9ed1\u4e86\uff01\x20\u3011\x0a','\x6d\x73\x67','\x6e\x61\x6d\x65','\u6d3b\u52a8\x69\x64\u4e0d\u5b58\u5728','\u3010\u63d0\u793a\u3011\u8bf7\u5148\u83b7\u53d6\u4eac\u4e1c\u8d26\u53f7\u4e00\x63\x6f\x6f\x6b\x69\x65\x0a\u76f4\u63a5\u4f7f\u7528\x4e\x6f\x62\x79\x44\x61\u7684\u4eac\u4e1c\u7b7e\u5230\u83b7\u53d6','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x62\x65\x61\x6e\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f','\x6d\x65\x6d\x62\x65\x72\x43\x6f\x75\x6e\x74','\u6d3b\u52a8\x69\x64\x3a\x0a','\x74\x6f\x61\x63\x74\x69\x76\x69\x74\x79','\x6c\x65\x6e\x67\x74\x68','\x55\x73\x65\x72\x4e\x61\x6d\x65','\x6d\x61\x74\x63\x68','\x69\x6e\x64\x65\x78','\x69\x73\x4c\x6f\x67\x69\x6e','\x6e\x69\x63\x6b\x4e\x61\x6d\x65','\x0a\x2a\x2a\x2a\x2a\x2a\x2a\u5f00\u59cb\u3010\u4eac\u4e1c\u8d26\u53f7','\x2a\x2a\x2a\x2a\x2a\x2a\x2a\x2a\x2a\x0a','\u3010\u63d0\u793a\u3011\x63\x6f\x6f\x6b\x69\x65\u5df2\u5931\u6548','\u4eac\u4e1c\u8d26\u53f7','\x0a\u8bf7\u91cd\u65b0\u767b\u5f55\u83b7\u53d6\x0a\x68\x74\x74\x70\x73\x3a\x2f\x2f\x62\x65\x61\x6e\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f','\x73\x65\x6e\x64\x4e\x6f\x74\x69\x66\x79','\x63\x6f\x6f\x6b\x69\x65\u5df2\u5931\u6548\x20\x2d\x20','\x0a\u8bf7\u91cd\u65b0\u767b\u5f55\u83b7\u53d6\x63\x6f\x6f\x6b\x69\x65','\x6d\x61\x78\x54\x65\x61\x6d','\u961f\u4f0d\u4eba\u6570\x20','\x63\x61\x74\x63\x68','\x2c\x20\u5931\u8d25\x21\x20\u539f\u56e0\x3a\x20','\x66\x69\x6e\x61\x6c\x6c\x79','\x73\x69\x64','\x75\x73\x65\x72\x49\x64','\x36\x39\x31\x33\x39\x39','\x54\x6f\x6b\x65\x6e','\x50\x69\x6e','\x68\x69\x73\x50\x69\x6e','\x63\x61\x72\x64','\x73\x61\x76\x65\x54\x65\x61\x6d','\u83b7\u53d6\x5b\x74\x6f\x6b\x65\x6e\x5d\u5931\u8d25\uff01','\x41\x55\x54\x48\x5f\x43\x5f\x55\x53\x45\x52','\x46\x34\x65\x56\x2b\x46\x74\x63\x45\x64\x54\x4e\x4f\x43\x4c\x77\x6d\x52\x67\x4f\x45\x74\x41\x31\x44\x72\x71\x33\x7a\x61\x34\x6c\x68\x36\x4c\x46\x4c\x66\x6c\x65\x64\x46\x31\x63\x64\x53\x69\x71\x4d\x62\x43\x78\x35\x65\x64\x45\x45\x61\x4c\x33\x52\x6e\x43\x53\x6b\x64\x4b\x33\x72\x4c\x42\x51\x70\x45\x51\x48\x39\x56\x34\x74\x64\x72\x72\x68\x30\x77\x3d\x3d','\x77\x61\x69\x74','\x70\x69\x6e\x3a','\u961f\u4f0d\u5df2\u6ee1\u5458','\u3010\u4eac\u4e1c\u8d26\u53f7','\u3011\x20\u672a\u80fd\u83b7\u53d6\u6d3b\u52a8\u4fe1\u606f','\u3011\x20\u672a\u80fd\u83b7\u53d6\u6d3b\u52a8\u4fe1\u606f\x0a','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d\x2f\x77\x78\x43\x6f\x6d\x6d\x6f\x6e\x49\x6e\x66\x6f\x2f\x67\x65\x74\x53\x79\x73\x74\x65\x6d\x43\x6f\x6e\x66\x69\x67','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d\x2f\x77\x78\x54\x65\x61\x6d\x2f\x61\x63\x74\x69\x76\x69\x74\x79\x3f\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3d','\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64','\x26\x73\x68\x61\x72\x65\x55\x75\x69\x64\x3d','\x73\x68\x61\x72\x65\x55\x75\x69\x64','\x67\x65\x74','\x74\x6f\x53\x74\x72','\x20\x63\x6f\x6f\x6b\x69\x65\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x68\x65\x61\x64\x65\x72\x73','\x73\x65\x74\x2d\x63\x6f\x6f\x6b\x69\x65','\x53\x65\x74\x2d\x43\x6f\x6f\x6b\x69\x65','\x6f\x62\x6a\x65\x63\x74','\x73\x70\x6c\x69\x74','\x74\x72\x69\x6d','\x4c\x5a\x5f\x54\x4f\x4b\x45\x4e\x5f\x4b\x45\x59\x3d','\x72\x65\x70\x6c\x61\x63\x65','\x4c\x5a\x5f\x54\x4f\x4b\x45\x4e\x5f\x56\x41\x4c\x55\x45\x3d','\x6c\x6f\x67\x45\x72\x72','\x6a\x64\x61\x70\x70\x3b\x69\x50\x68\x6f\x6e\x65\x3b\x31\x30\x2e\x33\x2e\x30\x3b\x3b\x3b\x4d\x2f\x35\x2e\x30\x3b\x61\x70\x70\x42\x75\x69\x6c\x64\x2f\x31\x36\x37\x39\x30\x33\x3b\x6a\x64\x53\x75\x70\x70\x6f\x72\x74\x44\x61\x72\x6b\x4d\x6f\x64\x65\x2f\x30\x3b\x65\x66\x2f\x31\x3b\x65\x70\x2f\x25\x37\x42\x25\x32\x32\x63\x69\x70\x68\x65\x72\x74\x79\x70\x65\x25\x32\x32\x25\x33\x41\x35\x25\x32\x43\x25\x32\x32\x63\x69\x70\x68\x65\x72\x25\x32\x32\x25\x33\x41\x25\x37\x42\x25\x32\x32\x75\x64\x25\x32\x32\x25\x33\x41\x25\x32\x32\x5a\x57\x59\x35\x59\x74\x54\x76\x59\x77\x56\x73\x43\x7a\x59\x34\x44\x57\x59\x6e\x59\x32\x56\x74\x44\x4e\x55\x30\x5a\x74\x56\x77\x43\x4e\x55\x32\x45\x51\x54\x74\x5a\x74\x59\x31\x44\x74\x54\x75\x44\x74\x75\x34\x44\x6d\x25\x33\x44\x25\x33\x44\x25\x32\x32\x25\x32\x43\x25\x32\x32\x73\x76\x25\x32\x32\x25\x33\x41\x25\x32\x32\x43\x4a\x47\x6b\x45\x4b\x25\x33\x44\x25\x33\x44\x25\x32\x32\x25\x32\x43\x25\x32\x32\x69\x61\x64\x25\x32\x32\x25\x33\x41\x25\x32\x32\x25\x32\x32\x25\x37\x44\x25\x32\x43\x25\x32\x32\x74\x73\x25\x32\x32\x25\x33\x41\x31\x36\x34\x35\x30\x36\x38\x35\x34\x39\x25\x32\x43\x25\x32\x32\x68\x64\x69\x64\x25\x32\x32\x25\x33\x41\x25\x32\x32\x4a\x4d\x39\x46\x31\x79\x77\x55\x50\x77\x66\x6c\x76\x4d\x49\x70\x59\x50\x6f\x6b\x30\x74\x74\x35\x6b\x39\x6b\x57\x34\x41\x72\x4a\x45\x55\x33\x6c\x66\x4c\x68\x78\x42\x71\x77\x25\x33\x44\x25\x32\x32\x25\x32\x43\x25\x32\x32\x76\x65\x72\x73\x69\x6f\x6e\x25\x32\x32\x25\x33\x41\x25\x32\x32\x31\x2e\x30\x2e\x33\x25\x32\x32\x25\x32\x43\x25\x32\x32\x61\x70\x70\x6e\x61\x6d\x65\x25\x32\x32\x25\x33\x41\x25\x32\x32\x63\x6f\x6d\x2e\x33\x36\x30\x62\x75\x79\x2e\x6a\x64\x6d\x6f\x62\x69\x6c\x65\x25\x32\x32\x25\x32\x43\x25\x32\x32\x72\x69\x64\x78\x25\x32\x32\x25\x33\x41\x2d\x31\x25\x37\x44\x3b\x4d\x6f\x7a\x69\x6c\x6c\x61\x2f\x35\x2e\x30\x20\x28\x69\x50\x68\x6f\x6e\x65\x3b\x20\x43\x50\x55\x20\x69\x50\x68\x6f\x6e\x65\x20\x4f\x53\x20\x31\x34\x5f\x38\x20\x6c\x69\x6b\x65\x20\x4d\x61\x63\x20\x4f\x53\x20\x58\x29\x20\x41\x70\x70\x6c\x65\x57\x65\x62\x4b\x69\x74\x2f\x36\x30\x35\x2e\x31\x2e\x31\x35\x20\x28\x4b\x48\x54\x4d\x4c\x2c\x20\x6c\x69\x6b\x65\x20\x47\x65\x63\x6b\x6f\x29\x20\x4d\x6f\x62\x69\x6c\x65\x2f\x31\x35\x45\x31\x34\x38\x3b\x73\x75\x70\x70\x6f\x72\x74\x4a\x44\x53\x48\x57\x4b\x2f\x31\x3b','\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3d','\x70\x6f\x73\x74','\x2f\x63\x75\x73\x74\x6f\x6d\x65\x72\x2f\x67\x65\x74\x53\x69\x6d\x70\x6c\x65\x41\x63\x74\x49\x6e\x66\x6f\x56\x6f','\x20\x67\x65\x74\x53\x69\x6d\x70\x6c\x65\x41\x63\x74\x49\x6e\x66\x6f\x56\x6f\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x73\x74\x61\x74\x75\x73','\x61\x62\x63\x64\x65\x66\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39','\x63\x68\x61\x72\x41\x74','\x66\x6c\x6f\x6f\x72','\x72\x61\x6e\x64\x6f\x6d','\x2f\x77\x78\x54\x65\x61\x6d\x2f\x61\x63\x74\x69\x76\x69\x74\x79\x3f\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3d','\x61\x64\x69\x64\x3d\x37\x42\x34\x31\x31\x43\x44\x39\x2d\x44\x36\x32\x43\x2d\x34\x32\x35\x42\x2d\x42\x30\x38\x33\x2d\x39\x41\x46\x43\x34\x39\x42\x39\x34\x32\x32\x38\x26\x61\x72\x65\x61\x3d\x31\x36\x5f\x31\x33\x33\x32\x5f\x34\x32\x39\x33\x32\x5f\x34\x33\x31\x30\x32\x26\x62\x6f\x64\x79\x3d\x25\x37\x42\x25\x32\x32\x75\x72\x6c\x25\x32\x32\x25\x33\x41\x25\x32\x32\x68\x74\x74\x70\x73\x25\x33\x41\x25\x35\x43\x2f\x25\x35\x43\x2f\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d\x25\x32\x32\x25\x32\x43\x25\x32\x32\x69\x64\x25\x32\x32\x25\x33\x41\x25\x32\x32\x25\x32\x32\x25\x37\x44\x26\x62\x75\x69\x6c\x64\x3d\x31\x36\x37\x35\x34\x31\x26\x63\x6c\x69\x65\x6e\x74\x3d\x61\x70\x70\x6c\x65\x26\x63\x6c\x69\x65\x6e\x74\x56\x65\x72\x73\x69\x6f\x6e\x3d\x39\x2e\x34\x2e\x30\x26\x64\x5f\x62\x72\x61\x6e\x64\x3d\x61\x70\x70\x6c\x65\x26\x64\x5f\x6d\x6f\x64\x65\x6c\x3d\x69\x50\x68\x6f\x6e\x65\x38\x25\x32\x43\x31\x26\x65\x69\x64\x3d\x65\x69\x64\x49\x64\x31\x30\x62\x38\x31\x32\x31\x39\x31\x73\x65\x42\x43\x46\x47\x6d\x74\x62\x65\x54\x58\x32\x76\x58\x46\x33\x6c\x62\x67\x44\x41\x56\x77\x51\x68\x53\x41\x38\x77\x4b\x71\x6a\x36\x4f\x41\x39\x4a\x34\x66\x6f\x50\x51\x6d\x33\x55\x7a\x52\x77\x72\x72\x4c\x64\x4f\x32\x33\x42\x33\x45\x32\x77\x43\x55\x59\x2f\x62\x4f\x44\x48\x30\x31\x56\x6e\x78\x69\x45\x6e\x41\x55\x76\x6f\x4d\x36\x53\x69\x45\x6e\x6d\x50\x33\x49\x50\x71\x52\x75\x4f\x25\x32\x42\x79\x2f\x25\x32\x42\x5a\x6f\x26\x69\x73\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x3d\x4e\x26\x6a\x6f\x79\x63\x69\x6f\x75\x73\x3d\x34\x38\x26\x6c\x61\x6e\x67\x3d\x7a\x68\x5f\x43\x4e\x26\x6e\x65\x74\x77\x6f\x72\x6b\x54\x79\x70\x65\x3d\x77\x69\x66\x69\x26\x6e\x65\x74\x77\x6f\x72\x6b\x6c\x69\x62\x74\x79\x70\x65\x3d\x4a\x44\x4e\x65\x74\x77\x6f\x72\x6b\x42\x61\x73\x65\x41\x46\x26\x6f\x70\x65\x6e\x75\x64\x69\x64\x3d\x32\x66\x37\x35\x37\x38\x63\x62\x36\x33\x34\x30\x36\x35\x66\x39\x62\x65\x61\x65\x39\x34\x64\x30\x31\x33\x66\x31\x37\x32\x65\x31\x39\x37\x64\x36\x32\x32\x38\x33\x26\x6f\x73\x56\x65\x72\x73\x69\x6f\x6e\x3d\x31\x33\x2e\x31\x2e\x32\x26\x70\x61\x72\x74\x6e\x65\x72\x3d\x61\x70\x70\x6c\x65\x26\x72\x66\x73\x3d\x30\x30\x30\x30\x26\x73\x63\x6f\x70\x65\x3d\x31\x31\x26\x73\x63\x72\x65\x65\x6e\x3d\x37\x35\x30\x25\x32\x41\x31\x33\x33\x34\x26\x73\x69\x67\x6e\x3d\x36\x30\x62\x64\x65\x35\x31\x62\x34\x62\x37\x66\x37\x66\x66\x36\x65\x31\x62\x63\x31\x66\x34\x37\x33\x65\x63\x66\x33\x64\x34\x31\x26\x73\x74\x3d\x31\x36\x31\x33\x37\x32\x30\x32\x30\x33\x39\x30\x33\x26\x73\x76\x3d\x31\x31\x30\x26\x75\x74\x73\x3d\x30\x66\x33\x31\x54\x56\x52\x6a\x42\x53\x74\x47\x39\x4e\x6f\x5a\x4a\x64\x58\x4c\x47\x64\x39\x33\x39\x57\x76\x34\x41\x6c\x73\x57\x4e\x41\x65\x4c\x31\x6e\x78\x61\x66\x55\x73\x5a\x71\x69\x56\x34\x4e\x4c\x73\x56\x45\x6c\x7a\x36\x41\x6a\x43\x34\x4c\x37\x74\x73\x6e\x5a\x31\x6c\x6f\x65\x54\x32\x41\x38\x5a\x35\x2f\x4b\x66\x49\x2f\x59\x6f\x4a\x41\x55\x66\x4a\x7a\x54\x64\x38\x6b\x43\x65\x64\x66\x6e\x4c\x47\x35\x32\x32\x79\x64\x49\x30\x70\x34\x30\x6f\x69\x38\x68\x54\x32\x70\x32\x73\x4e\x5a\x69\x49\x49\x52\x59\x43\x66\x6a\x49\x72\x37\x49\x41\x4c\x25\x32\x42\x46\x6b\x4c\x73\x72\x57\x64\x53\x69\x50\x5a\x50\x35\x51\x4c\x70\x74\x63\x38\x43\x79\x34\x4f\x64\x36\x2f\x63\x64\x59\x69\x64\x43\x6c\x52\x30\x4e\x77\x50\x4d\x64\x35\x38\x4b\x35\x4a\x39\x6e\x61\x72\x7a\x37\x38\x79\x39\x6f\x63\x47\x65\x38\x75\x54\x66\x79\x42\x49\x6f\x41\x39\x61\x43\x64\x2f\x58\x33\x4d\x75\x78\x77\x25\x33\x44\x25\x33\x44\x26\x75\x75\x69\x64\x3d\x68\x6a\x75\x64\x77\x67\x6f\x68\x78\x7a\x56\x75\x39\x36\x6b\x72\x76\x2f\x54\x36\x48\x67\x25\x33\x44\x25\x33\x44\x26\x77\x69\x66\x69\x42\x73\x73\x69\x64\x3d\x39\x63\x66\x39\x30\x63\x35\x38\x36\x63\x34\x34\x36\x38\x65\x30\x30\x36\x37\x38\x35\x34\x35\x62\x31\x36\x31\x37\x36\x65\x64\x32','\x3f\x66\x75\x6e\x63\x74\x69\x6f\x6e\x49\x64\x3d\x69\x73\x76\x4f\x62\x66\x75\x73\x63\x61\x74\x6f\x72','\x20\x32\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x70\x61\x72\x73\x65','\x63\x6f\x64\x65','\x74\x6f\x6b\x65\x6e','\u5f02\u5e38\x32\uff1a','\x75\x73\x65\x72\x49\x64\x3d','\x26\x74\x6f\x6b\x65\x6e\x3d','\x26\x66\x72\x6f\x6d\x54\x79\x70\x65\x3d\x41\x50\x50\x26\x72\x69\x73\x6b\x54\x79\x70\x65\x3d\x31','\x2f\x63\x75\x73\x74\x6f\x6d\x65\x72\x2f\x67\x65\x74\x4d\x79\x50\x69\x6e\x67','\x20\x33\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x72\x65\x73\x75\x6c\x74','\x64\x61\x74\x61','\x73\x65\x63\x72\x65\x74\x50\x69\x6e','\u5f02\u5e38\x33\uff1a','\x2f\x77\x78\x54\x65\x61\x6d\x2f\x73\x68\x6f\x70\x49\x6e\x66\x6f','\x20\x31\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x73\x68\x6f\x70\x4e\x61\x6d\x65','\u5f02\u5e38\x31\uff1a','\x76\x65\x6e\x64\x65\x72\x49\x64\x3d','\x26\x62\x75\x79\x65\x72\x50\x69\x6e\x3d','\x2f\x6d\x63\x2f\x6e\x65\x77\x2f\x62\x72\x61\x6e\x64\x43\x61\x72\x64\x2f\x63\x6f\x6d\x6d\x6f\x6e\x2f\x73\x68\x6f\x70\x41\x6e\x64\x42\x72\x61\x6e\x64\x2f\x67\x65\x74\x4f\x70\x65\x6e\x43\x61\x72\x64\x49\x6e\x66\x6f','\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x6f\x70\x65\x6e\x43\x61\x72\x64\x4c\x69\x6e\x6b','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x63\x6c\x69\x65\x6e\x74\x2e\x61\x63\x74\x69\x6f\x6e\x3f\x61\x70\x70\x69\x64\x3d\x6a\x64\x5f\x73\x68\x6f\x70\x5f\x6d\x65\x6d\x62\x65\x72\x26\x66\x75\x6e\x63\x74\x69\x6f\x6e\x49\x64\x3d\x62\x69\x6e\x64\x57\x69\x74\x68\x56\x65\x6e\x64\x65\x72\x26\x62\x6f\x64\x79\x3d','\x26\x63\x6c\x69\x65\x6e\x74\x3d\x48\x35\x26\x63\x6c\x69\x65\x6e\x74\x56\x65\x72\x73\x69\x6f\x6e\x3d\x39\x2e\x32\x2e\x30\x26\x75\x75\x69\x64\x3d\x38\x38\x38\x38\x38\x26\x6a\x73\x6f\x6e\x70\x3d\x6a\x73\x6f\x6e\x70\x5f\x31\x36\x31\x33\x37\x31\x38\x33\x33\x33\x33\x31\x37\x5f\x35\x34\x34\x38\x39','\u5f02\u5e38\x34\uff1a','\x2a\x2f\x2a','\x67\x7a\x69\x70\x2c\x20\x64\x65\x66\x6c\x61\x74\x65\x2c\x20\x62\x72','\x7a\x68\x2d\x63\x6e','\x6b\x65\x65\x70\x2d\x61\x6c\x69\x76\x65','\x61\x70\x69\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d','\x20\u5165\u4f1a\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x70\x69\x6e\x3d','\x2f\x77\x78\x41\x63\x74\x69\x6f\x6e\x43\x6f\x6d\x6d\x6f\x6e\x2f\x67\x65\x74\x55\x73\x65\x72\x49\x6e\x66\x6f','\x20\x36\x2d\x31\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x61\x74\x74\x72\x54\x6f\x75\x58\x69\x61\x6e\x67','\x79\x75\x6e\x4d\x69\x64\x49\x6d\x61\x67\x65\x55\x72\x6c','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x69\x6d\x67\x31\x30\x2e\x33\x36\x30\x62\x75\x79\x69\x6d\x67\x2e\x63\x6f\x6d\x2f\x69\x6d\x67\x7a\x6f\x6e\x65\x2f\x6a\x66\x73\x2f\x74\x31\x2f\x32\x31\x33\x38\x33\x2f\x32\x2f\x36\x36\x33\x33\x2f\x33\x38\x37\x39\x2f\x35\x63\x35\x31\x33\x38\x64\x38\x45\x30\x39\x36\x37\x63\x63\x66\x32\x2f\x39\x31\x64\x61\x35\x37\x63\x35\x65\x32\x31\x36\x36\x30\x30\x35\x2e\x6a\x70\x67','\u5f02\u5e38\x36\x2d\x32\uff1a','\x26\x70\x69\x6e\x3d','\x73\x69\x67\x6e\x55\x75\x69\x64','\x26\x73\x69\x67\x6e\x55\x75\x69\x64\x3d','\x2f\x77\x78\x54\x65\x61\x6d\x2f\x61\x63\x74\x69\x76\x69\x74\x79\x43\x6f\x6e\x74\x65\x6e\x74','\x20\x35\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x61\x63\x74\x69\x76\x65','\x65\x6e\x64\x54\x69\x6d\x65\x53\x74\x72','\x67\x65\x74\x54\x69\x6d\x65','\u6d3b\u52a8\u7ed3\u675f','\u6d3b\u52a8\u7ed3\u675f\x0a','\x63\x61\x6e\x43\x72\x65\x61\x74\x65','\x6c\x69\x73\x74','\u4eba\u6570\u5df2\u6ee1\x0a','\x73\x68\x61\x72\x65','\x74\x65\x61\x6d\x4e\x75\x6d','\x61\x63\x74\x52\x75\x6c\x65','\u6700\u591a\u53ef\u4ee5\u7ec4\u5efa','\u4e2a\u6218\u961f','\u52a0\u5165\u961f\u4f0d\x20\x69\x64\x3a\x20','\u961f\u4f0d\x69\x64\x3a\x20','\u3011\x20\u521b\u5efa\u961f\u4f0d\x69\x64\x3a\x20','\u5f02\u5e38\x35\uff1a','\x26\x70\x69\x6e\x49\x6d\x67\x3d','\x2f\x77\x78\x54\x65\x61\x6d\x2f\x73\x61\x76\x65\x43\x61\x70\x74\x61\x69\x6e','\x20\x36\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\u521b\u5efa\u961f\u4f0d\u6210\u529f\x20\x69\x64\x3a\x20','\u5f02\u5e38\x36\uff1a','\x65\x72\x72\x6f\x72\x4d\x65\x73\x73\x61\x67\x65','\u4e0d\u662f\u5e97\u94fa\u4f1a\u5458','\u5956\u54c1\u4e0e\u60a8\u64e6\u80a9\u800c\u8fc7','\x2f\x77\x78\x54\x65\x61\x6d\x2f\x73\x61\x76\x65\x4d\x65\x6d\x62\x65\x72','\x20\x37\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\u3011\x20\u52a0\u5165\u961f\u4f0d\x0a','\u52a0\u5165\u961f\u4f0d\u6210\u529f','\u961f\u4f0d\u5df2\u7ecf\u6ee1\u5458','\u5f02\u5e38\x37\uff1a','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d\x2f\x6d\x69\x63\x72\x6f\x44\x7a\x2f\x69\x6e\x76\x69\x74\x65\x2f\x61\x63\x74\x69\x76\x69\x74\x79\x2f\x77\x78\x2f\x67\x65\x74\x4f\x70\x65\x6e\x43\x61\x72\x64\x41\x6c\x6c\x53\x74\x61\x74\x75\x65\x73\x4e\x65\x77','\x3b\x49\x73\x76\x54\x6f\x6b\x65\x6e\x3d','\x3b\x41\x55\x54\x48\x5f\x43\x5f\x55\x53\x45\x52\x3d','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x78\x2d\x77\x77\x77\x2d\x66\x6f\x72\x6d\x2d\x75\x72\x6c\x65\x6e\x63\x6f\x64\x65\x64\x3b\x20\x63\x68\x61\x72\x73\x65\x74\x3d\x55\x54\x46\x2d\x38','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d\x2f\x6d\x69\x63\x72\x6f\x44\x7a\x2f\x69\x6e\x76\x69\x74\x65\x2f\x61\x63\x74\x69\x76\x69\x74\x79\x2f\x77\x78\x2f\x76\x69\x65\x77\x2f\x69\x6e\x64\x65\x78\x3f\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3d','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x6a\x73\x6f\x6e\x2c\x20\x74\x65\x78\x74\x2f\x6a\x61\x76\x61\x73\x63\x72\x69\x70\x74\x2c\x20\x2a\x2f\x2a\x3b\x20\x71\x3d\x30\x2e\x30\x31','\x69\x73\x49\x6e\x76\x69\x74\x65\x64\x3d\x30\x26\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3d','\x69\x73\x43\x61\x6e\x4a\x6f\x69\x6e','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x6a\x73\x6f\x6e','\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x78\x2d\x77\x77\x77\x2d\x66\x6f\x72\x6d\x2d\x75\x72\x6c\x65\x6e\x63\x6f\x64\x65\x64','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x71\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x75\x73\x65\x72\x2f\x69\x6e\x66\x6f\x2f\x51\x75\x65\x72\x79\x4a\x44\x55\x73\x65\x72\x49\x6e\x66\x6f\x3f\x73\x63\x65\x6e\x65\x76\x61\x6c\x3d\x32','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x6a\x73\x6f\x6e\x2c\x74\x65\x78\x74\x2f\x70\x6c\x61\x69\x6e\x2c\x20\x2a\x2f\x2a','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x71\x73\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x6d\x79\x2f\x6a\x69\x6e\x67\x64\x6f\x75\x2f\x6d\x79\x2e\x73\x68\x74\x6d\x6c\x3f\x73\x63\x65\x6e\x65\x76\x61\x6c\x3d\x32','\x20\x41\x50\x49\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u8def\u91cd\u8bd5','\x72\x65\x74\x63\x6f\x64\x65','\u4eac\u4e1c\u670d\u52a1\u5668\u8fd4\u56de\u7a7a\u6570\u636e','\u4eac\u4e1c\u670d\u52a1\u5668\u8bbf\u95ee\u6570\u636e\u4e3a\u7a7a\uff0c\u8bf7\u68c0\u67e5\u81ea\u8eab\u8bbe\u5907\u7f51\u7edc\u60c5\u51b5','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d\x2f\x63\x6f\x6d\x6d\x6f\x6e\x2f\x61\x63\x63\x65\x73\x73\x4c\x6f\x67','\x2f\x77\x78\x54\x65\x61\x6d\x2f\x61\x63\x74\x69\x76\x69\x74\x79\x3f\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64','\x76\x65\x6e\x64\x65\x72\x49\x64\x3d\x36\x39\x31\x33\x39\x39\x26\x63\x6f\x64\x65\x3d\x31\x30\x32\x26\x70\x69\x6e\x3d','\x26\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3d','\x26\x70\x61\x67\x65\x55\x72\x6c\x3d\x68\x74\x74\x70\x73\x25\x33\x41\x25\x32\x46\x25\x32\x46\x63\x6a\x68\x79\x64\x7a\x2d\x69\x73\x76\x2e\x69\x73\x76\x6a\x63\x6c\x6f\x75\x64\x2e\x63\x6f\x6d\x25\x32\x46\x6d\x69\x63\x72\x6f\x44\x7a\x25\x32\x46\x69\x6e\x76\x69\x74\x65\x25\x32\x46\x61\x63\x74\x69\x76\x69\x74\x79\x25\x32\x46\x77\x78\x25\x32\x46\x76\x69\x65\x77\x25\x32\x46\x69\x6e\x64\x65\x78\x25\x33\x46\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x25\x33\x44','\x26\x73\x75\x62\x54\x79\x70\x65\x3d\x61\x70\x70','\x6a\x6f\x69\x6e','\x73\x74\x72\x69\x6e\x67','\u4e0d\u8981\u5728\x42\x6f\x78\x4a\x53\u624b\u52a8\u590d\u5236\u7c98\u8d34\u4fee\u6539\x63\x6f\x6f\x6b\x69\x65','\x75\x72\x6c','\x62\x6f\x64\x79','\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3a\x20','\x61\x63\x74\x69\x76\x69\x74\x79\x55\x72\x6c\x3a\x20','\x73\x65\x74\x64\x61\x74\x61','\u83b7\u53d6\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3a\x20\u6210\u529f','\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x3a','\x0a\x61\x63\x74\x69\x76\x69\x74\x79\x55\x72\x6c\x3a','\u627e\u4e0d\u5230\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64','\x43\x47\x6a\x73\x50\x6a\x57\x51\x48\x69\x72\x61\x65\x4e\x78\x6d\x69\x2e\x63\x7a\x6f\x6d\x2e\x79\x76\x36\x77\x78\x4e\x56\x44\x3d\x3d'];function _0xa087(_0x3f4dd8,_0x47806f){_0x3f4dd8=~~'0x'['concat'](_0x3f4dd8['slice'](0x0));var _0x41830d=_0x3c82[_0x3f4dd8];return _0x41830d;};(function(_0x2bc851,_0xbb5eaf){var _0x540044=0x0;for(_0xbb5eaf=_0x2bc851['shift'](_0x540044>>0x2);_0xbb5eaf&&_0xbb5eaf!==(_0x2bc851['pop'](_0x540044>>0x3)+'')['replace'](/[CGPWQHreNxzywxNVD=]/g,'');_0x540044++){_0x540044=_0x540044^0xd187e;}}(_0x3c82,_0xa087));const notify=$[_0xa087('0')]()?require(_0xa087('1')):'';const jdCookieNode=$[_0xa087('0')]()?require(_0xa087('2')):'';let cookiesArr=[],cookie='',message='',messageTitle='';activityId=$[_0xa087('3')](_0xa087('4'))?$[_0xa087('3')](_0xa087('4')):jd_cjhy_activityId;activityUrl=$[_0xa087('3')](_0xa087('5'))?$[_0xa087('3')](_0xa087('5')):jd_cjhy_activityUrl;let activityCookie='';if($[_0xa087('0')]()){if(process[_0xa087('6')][_0xa087('7')])activityId=process[_0xa087('6')][_0xa087('7')];if(process[_0xa087('6')][_0xa087('8')])activityUrl=process[_0xa087('6')][_0xa087('8')];if(JSON[_0xa087('9')](process[_0xa087('6')])[_0xa087('a')](_0xa087('b'))>-0x1)process[_0xa087('c')](0x0);Object[_0xa087('d')](jdCookieNode)[_0xa087('e')](_0x513741=>{cookiesArr[_0xa087('f')](jdCookieNode[_0x513741]);});if(process[_0xa087('6')][_0xa087('10')]&&process[_0xa087('6')][_0xa087('10')]===_0xa087('11'))console[_0xa087('12')]=()=>{};}else{cookiesArr=[$[_0xa087('3')](_0xa087('13')),$[_0xa087('3')](_0xa087('14')),...$[_0xa087('15')]($[_0xa087('3')](_0xa087('16'))||'\x5b\x5d')[_0xa087('17')](_0x5be7e0=>_0x5be7e0[_0xa087('18')])][_0xa087('19')](_0x285009=>!!_0x285009);}const JD_API_HOST=_0xa087('1a');let isGetCookie=typeof $request!==_0xa087('1b');if(isGetCookie){GetCookie();$[_0xa087('1c')]();}!(async()=>{console[_0xa087('12')](_0xa087('1d'));if(!activityId){$[_0xa087('1e')]($[_0xa087('1f')],'',_0xa087('20'));$[_0xa087('1c')]();return;}if(!cookiesArr[0x0]){$[_0xa087('1e')]($[_0xa087('1f')],_0xa087('21'),_0xa087('22'),{'open-url':_0xa087('22')});return;}$[_0xa087('23')]=0x0;messageTitle+=_0xa087('24')+activityId+'\x0a';$[_0xa087('25')]=[];for(let _0x133ac2=0x0;_0x133ac2<cookiesArr[_0xa087('26')];_0x133ac2++){if(cookiesArr[_0x133ac2]){cookie=cookiesArr[_0x133ac2];$[_0xa087('27')]=decodeURIComponent(cookie[_0xa087('28')](/pt_pin=(.+?);/)&&cookie[_0xa087('28')](/pt_pin=(.+?);/)[0x1]);$[_0xa087('29')]=_0x133ac2+0x1;$[_0xa087('2a')]=!![];$[_0xa087('2b')]='';console[_0xa087('12')](_0xa087('2c')+$[_0xa087('29')]+'\u3011'+($[_0xa087('2b')]||$[_0xa087('27')])+_0xa087('2d'));if(!$[_0xa087('2a')]){$[_0xa087('1e')]($[_0xa087('1f')],_0xa087('2e'),_0xa087('2f')+$[_0xa087('29')]+'\x20'+($[_0xa087('2b')]||$[_0xa087('27')])+_0xa087('30'),{'open-url':_0xa087('22')});if($[_0xa087('0')]()){await notify[_0xa087('31')]($[_0xa087('1f')]+_0xa087('32')+$[_0xa087('27')],_0xa087('2f')+$[_0xa087('29')]+'\x20'+$[_0xa087('27')]+_0xa087('33'));}continue;}await jrzd();if(!$[_0xa087('25')]||$[_0xa087('34')]){break;}}}messageTitle+=_0xa087('35')+$[_0xa087('23')]+'\x0a';await showMsg();})()[_0xa087('36')](_0x4e25ff=>{$[_0xa087('12')]('','\x20'+$[_0xa087('1f')]+_0xa087('37')+_0x4e25ff+'\x21','');})[_0xa087('38')](()=>{$[_0xa087('1c')]();});async function jrzd(){getUA();$[_0xa087('39')]='';$[_0xa087('3a')]=_0xa087('3b');$[_0xa087('3c')]='';$[_0xa087('3d')]='';$[_0xa087('3e')]='';$[_0xa087('3f')]=[];$[_0xa087('40')]=![];await getCk();await getToken();if($[_0xa087('3c')]==''){console[_0xa087('12')](_0xa087('41'));return;}$[_0xa087('42')]=_0xa087('43');await getSimpleActInfoVo();await getshopInfo();await $[_0xa087('44')](0x3e8);if($[_0xa087('39')]&&$[_0xa087('3a')]){await getToken();if($[_0xa087('3c')])await getPin();console[_0xa087('12')](_0xa087('45')+$[_0xa087('3d')]);await $[_0xa087('44')](0x3e8);await accessLog();await $[_0xa087('44')](0x3e8);await getUserInfo();await $[_0xa087('44')](0x3e8);await getTeam();await $[_0xa087('44')](0x3e8);if($[_0xa087('34')]){console[_0xa087('12')](_0xa087('46'));return;}}else{console[_0xa087('12')](_0xa087('47')+$[_0xa087('29')]+_0xa087('48'));message+=_0xa087('47')+$[_0xa087('29')]+_0xa087('49');}}function token(){return new Promise(_0xfb2c5e=>{let _0x9de708={'\x75\x72\x6c':_0xa087('4a'),'\x68\x65\x61\x64\x65\x72\x73':{'Cookie':activityCookie+'\x20'+cookie,'Referer':_0xa087('4b')+$[_0xa087('4c')]+_0xa087('4d')+$[_0xa087('4e')],'User-Agent':$['\x55\x41']}};$[_0xa087('4f')](_0x9de708,async(_0x1ddd9e,_0x3c3c45,_0x570f5a)=>{try{if(_0x1ddd9e){console[_0xa087('12')](''+$[_0xa087('50')](_0x1ddd9e));console[_0xa087('12')]($[_0xa087('1f')]+_0xa087('51'));}else{let _0x26e76a='';let _0x120d21='';let _0x15d895=_0x3c3c45[_0xa087('52')][_0xa087('53')]||_0x3c3c45[_0xa087('52')][_0xa087('54')]||'';let _0x52de31='';if(_0x15d895){if(typeof _0x15d895!=_0xa087('55')){_0x52de31=_0x15d895[_0xa087('56')]('\x2c');}else _0x52de31=_0x15d895;for(let _0x31bee3 of _0x52de31){let _0x2b0b45=_0x31bee3[_0xa087('56')]('\x3b')[0x0][_0xa087('57')]();if(_0x2b0b45[_0xa087('56')]('\x3d')[0x1]){if(_0x2b0b45[_0xa087('a')](_0xa087('58'))>-0x1)_0x26e76a=_0x2b0b45[_0xa087('59')](/ /g,'')+'\x3b';if(_0x2b0b45[_0xa087('a')](_0xa087('5a'))>-0x1)_0x120d21=_0x2b0b45[_0xa087('59')](/ /g,'')+'\x3b';}}}if(_0x26e76a&&_0x120d21)activityCookie=_0x26e76a+'\x20'+_0x120d21;}}catch(_0x446f49){$[_0xa087('5b')](_0x446f49,_0x3c3c45);}finally{_0xfb2c5e();}});});}function getUA(){$['\x55\x41']=_0xa087('5c');}function showMsg(){return new Promise(_0x110eb5=>{$[_0xa087('1e')]($[_0xa087('1f')],'','\x0a'+message);_0x110eb5();});}function getSimpleActInfoVo(){return new Promise(_0x2e3214=>{let _0x44d6ae=_0xa087('5d')+activityId;$[_0xa087('5e')](taskPostUrl(_0xa087('5f'),_0x44d6ae),async(_0x5f3d67,_0x1e8f79,_0x1c7fae)=>{try{if(_0x5f3d67){console[_0xa087('12')](''+$[_0xa087('50')](_0x5f3d67));console[_0xa087('12')]($[_0xa087('1f')]+_0xa087('60'));}else{if(_0x1e8f79[_0xa087('61')]==0xc8){refreshToken(_0x1e8f79);}}}catch(_0x403beb){$[_0xa087('5b')](_0x403beb,_0x1e8f79);}finally{_0x2e3214();}});});}function randomString(_0x351484){_0x351484=_0x351484||0x20;let _0x202c60=_0xa087('62'),_0x54ac18=_0x202c60[_0xa087('26')],_0x5d9a4f='';for(i=0x0;i<_0x351484;i++)_0x5d9a4f+=_0x202c60[_0xa087('63')](Math[_0xa087('64')](Math[_0xa087('65')]()*_0x54ac18));return _0x5d9a4f;}function getCk(){return new Promise(_0x366608=>{let _0x1d82bf={'\x75\x72\x6c':activityUrl+_0xa087('66')+activityId,'\x68\x65\x61\x64\x65\x72\x73':{'\x43\x6f\x6f\x6b\x69\x65':cookie,'User-Agent':$['\x55\x41']}};$[_0xa087('4f')](_0x1d82bf,async(_0x2dd02b,_0xebd70c,_0x3b9fdf)=>{try{if(_0x2dd02b){console[_0xa087('12')](''+JSON[_0xa087('9')](_0x2dd02b));console[_0xa087('12')]($[_0xa087('1f')]+_0xa087('51'));}else{if(_0xebd70c[_0xa087('61')]==0xc8){refreshToken(_0xebd70c);}}}catch(_0x43b948){$[_0xa087('5b')](_0x43b948,_0xebd70c);}finally{_0x366608();}});});}function getToken(){return new Promise(_0x1eadd2=>{let _0x4d30d6=_0xa087('67');$[_0xa087('5e')](taskUrl(_0xa087('68'),_0x4d30d6),async(_0x14e1cb,_0x2f5027,_0x1a7df6)=>{try{if(_0x14e1cb){console[_0xa087('12')](''+JSON[_0xa087('9')](_0x14e1cb));console[_0xa087('12')]($[_0xa087('1f')]+_0xa087('69'));}else{if(safeGet(_0x1a7df6)){_0x1a7df6=JSON[_0xa087('6a')](_0x1a7df6);if(_0x1a7df6[_0xa087('6b')]==0x0&&_0x1a7df6[_0xa087('6c')]){$[_0xa087('3c')]=_0x1a7df6[_0xa087('6c')];}else{console[_0xa087('12')](_0xa087('6d')+JSON[_0xa087('9')](_0x1a7df6));}}}}catch(_0x1bd054){$[_0xa087('5b')](_0x1bd054,_0x2f5027);}finally{_0x1eadd2();}});});}function getPin(){return new Promise(_0x10159b=>{let _0x22b315=_0xa087('6e')+$[_0xa087('3a')]+_0xa087('6f')+$[_0xa087('3c')]+_0xa087('70');$[_0xa087('5e')](taskPostUrl(_0xa087('71'),_0x22b315),async(_0x467dba,_0x36ab7d,_0xb014b0)=>{try{if(_0x467dba){console[_0xa087('12')](''+JSON[_0xa087('9')](_0x467dba));console[_0xa087('12')]($[_0xa087('1f')]+_0xa087('72'));}else{if(safeGet(_0xb014b0)){_0xb014b0=JSON[_0xa087('6a')](_0xb014b0);if(_0xb014b0[_0xa087('73')]&&_0xb014b0[_0xa087('74')]){$[_0xa087('3d')]=_0xb014b0[_0xa087('74')][_0xa087('75')];}else{console[_0xa087('12')](_0xa087('76')+JSON[_0xa087('9')](_0xb014b0));}}}}catch(_0x33d60a){$[_0xa087('5b')](_0x33d60a,_0x36ab7d);}finally{_0x10159b();}});});}function getshopInfo(){return new Promise(_0x1ffe20=>{$[_0xa087('5e')](taskPostUrl(_0xa087('77'),_0xa087('5d')+activityId),async(_0x2e3326,_0x44eec1,_0x180400)=>{try{if(_0x2e3326){console[_0xa087('12')](''+JSON[_0xa087('9')](_0x2e3326));console[_0xa087('12')]($[_0xa087('1f')]+_0xa087('78'));}else{if(_0x180400&&safeGet(_0x180400)){_0x180400=JSON[_0xa087('6a')](_0x180400);if(_0x180400[_0xa087('74')]){$[_0xa087('39')]=_0x180400[_0xa087('74')][_0xa087('39')];$[_0xa087('3a')]=_0x180400[_0xa087('74')][_0xa087('3a')];$[_0xa087('79')]=_0x180400[_0xa087('74')][_0xa087('79')];}else{console[_0xa087('12')](_0xa087('7a')+JSON[_0xa087('9')](_0x180400));}}}}catch(_0x22de7f){$[_0xa087('5b')](_0x22de7f,_0x44eec1);}finally{_0x1ffe20();}});});}function joinShop(){return new Promise(_0x12ec18=>{let _0x205e01=_0xa087('7b')+$[_0xa087('3a')]+_0xa087('7c')+encodeURIComponent($[_0xa087('3d')]);$[_0xa087('5e')](taskPostUrl(_0xa087('7d'),_0x205e01),async(_0x16272d,_0x3e6338,_0x3d0cb7)=>{try{if(_0x16272d){console[_0xa087('12')](''+JSON[_0xa087('9')](_0x16272d));console[_0xa087('12')]($[_0xa087('1f')]+_0xa087('7e'));}else{if(safeGet(_0x3d0cb7)){_0x3d0cb7=JSON[_0xa087('6a')](_0x3d0cb7);if(_0x3d0cb7[_0xa087('73')]&&_0x3d0cb7[_0xa087('74')]){if(_0x3d0cb7[_0xa087('74')][_0xa087('7f')]){let _0x4a5fb9=_0x3d0cb7[_0xa087('74')][_0xa087('7f')][_0xa087('28')](/channel=(\d+)/);const _0x205e01={'venderId':$[_0xa087('3a')],'shopId':$[_0xa087('39')],'bindByVerifyCodeFlag':0x1,'registerExtend':{},'writeChildFlag':0x0,'channel':_0x4a5fb9[0x1]};let _0x31c727=_0xa087('80')+encodeURIComponent(JSON[_0xa087('9')](_0x205e01))+_0xa087('81');let _0x5846d1=''+_0x3d0cb7[_0xa087('74')][_0xa087('7f')];await jiaru(_0x31c727,_0x5846d1);}}else{console[_0xa087('12')](_0xa087('82')+JSON[_0xa087('9')](_0x3d0cb7));}}}}catch(_0x13131c){$[_0xa087('5b')](_0x13131c,_0x3e6338);}finally{_0x12ec18();}});});}function jiaru(_0x4a560c,_0x27d7b9){return new Promise(_0x308896=>{let _0xd77753={'url':_0x4a560c,'headers':{'Accept':_0xa087('83'),'Accept-Encoding':_0xa087('84'),'Accept-Language':_0xa087('85'),'Connection':_0xa087('86'),'Host':_0xa087('87'),'Referer':_0x27d7b9,'Cookie':cookie,'User-Agent':$['\x55\x41']}};$[_0xa087('4f')](_0xd77753,async(_0x402a01,_0x2f05bc,_0x3e3617)=>{try{if(_0x402a01){console[_0xa087('12')](''+JSON[_0xa087('9')](_0x402a01));console[_0xa087('12')]($[_0xa087('1f')]+_0xa087('88'));}else{$[_0xa087('12')](_0x3e3617);}}catch(_0x251417){$[_0xa087('5b')](_0x251417,_0x2f05bc);}finally{_0x308896();}});});}function getUserInfo(){return new Promise(_0x108e5b=>{let _0x2d0f4b=_0xa087('89')+encodeURIComponent($[_0xa087('3d')]);$[_0xa087('5e')](taskPostUrl(_0xa087('8a'),_0x2d0f4b),async(_0x2ceb3e,_0x12f750,_0x17807e)=>{try{if(_0x2ceb3e){console[_0xa087('12')](''+JSON[_0xa087('9')](_0x2ceb3e));console[_0xa087('12')]($[_0xa087('1f')]+_0xa087('8b'));}else{if(safeGet(_0x17807e)){_0x17807e=JSON[_0xa087('6a')](_0x17807e);if(_0x17807e[_0xa087('73')]&&_0x17807e[_0xa087('74')]){$[_0xa087('8c')]=_0x17807e[_0xa087('74')][_0xa087('8d')]?_0x17807e[_0xa087('74')][_0xa087('8d')]:_0xa087('8e');}else{console[_0xa087('12')](_0xa087('8f')+JSON[_0xa087('9')](_0x17807e));}}}}catch(_0x15fae2){$[_0xa087('5b')](_0x15fae2,_0x12f750);}finally{_0x108e5b();}});});}function getTeam(){return new Promise(_0x14f16b=>{let _0x2aaaa6=_0xa087('5d')+activityId+_0xa087('90')+encodeURIComponent(encodeURIComponent($[_0xa087('3d')]));if($[_0xa087('91')])_0x2aaaa6+=_0xa087('92')+$[_0xa087('91')];$[_0xa087('5e')](taskPostUrl(_0xa087('93'),_0x2aaaa6),async(_0x1d40b8,_0x5d942d,_0x93f3c4)=>{try{if(_0x1d40b8){console[_0xa087('12')](''+JSON[_0xa087('9')](_0x1d40b8));console[_0xa087('12')]($[_0xa087('1f')]+_0xa087('94'));}else{if(safeGet(_0x93f3c4)){_0x93f3c4=JSON[_0xa087('6a')](_0x93f3c4);if(_0x93f3c4[_0xa087('73')]&&_0x93f3c4[_0xa087('74')]){if(new Date(_0x93f3c4[_0xa087('74')][_0xa087('95')][_0xa087('96')][_0xa087('59')](/-/g,'\x2f'))[_0xa087('97')]()<new Date()[_0xa087('97')]()){$[_0xa087('25')]=![];console[_0xa087('12')](_0xa087('98'));messageTitle+=_0xa087('99');message+=_0xa087('99');_0x14f16b();}else{if(!_0x93f3c4[_0xa087('74')][_0xa087('9a')]&&_0x93f3c4[_0xa087('74')][_0xa087('9b')]==null)message+=_0xa087('9c');if(_0x93f3c4[_0xa087('74')][_0xa087('9d')]){$[_0xa087('23')]=parseInt(_0x93f3c4[_0xa087('74')][_0xa087('9d')][_0xa087('23')],0xa)+0x1;}else{$[_0xa087('23')]=0x0;}if($[_0xa087('29')]==0x1){$[_0xa087('40')]=!![];$[_0xa087('9e')]=_0x93f3c4[_0xa087('74')][_0xa087('95')][_0xa087('9f')][_0xa087('28')](/最多可以组建(\d+)个战队/);if($[_0xa087('9e')]){$[_0xa087('9e')]=$[_0xa087('9e')][0x1];messageTitle+=_0xa087('a0')+$[_0xa087('9e')]+_0xa087('a1');}}if($[_0xa087('91')]){$[_0xa087('12')](_0xa087('a2')+$[_0xa087('91')]);await $[_0xa087('44')](0x3e8);await joinTeam();}if($[_0xa087('40')]){if(_0x93f3c4[_0xa087('74')][_0xa087('9a')]){await $[_0xa087('44')](0x3e8);await saveTeam();}else{$[_0xa087('91')]=_0x93f3c4[_0xa087('74')][_0xa087('91')];messageTitle+=_0xa087('a3')+$[_0xa087('91')]+'\x0a';message+=_0xa087('47')+$[_0xa087('29')]+_0xa087('a4')+$[_0xa087('91')];$[_0xa087('12')](_0xa087('a3')+$[_0xa087('91')]);$[_0xa087('44')](0x3e8);$[_0xa087('12')](_0xa087('a2')+$[_0xa087('91')]);await joinTeam();}}}}else{console[_0xa087('12')](_0xa087('a5')+JSON[_0xa087('9')](_0x93f3c4));}}}}catch(_0x53c698){$[_0xa087('5b')](_0x53c698,_0x5d942d);}finally{_0x14f16b(_0x14f16b);}});});}function saveTeam(_0x5239da=0x0){return new Promise(_0x256b35=>{let _0x13e2ab=encodeURIComponent(encodeURIComponent($[_0xa087('3d')]));if(_0x5239da==0x1)_0x13e2ab=encodeURIComponent(encodeURIComponent($[_0xa087('3d')]));let _0x2f667f=_0xa087('5d')+activityId+_0xa087('90')+_0x13e2ab+_0xa087('a6')+encodeURIComponent(encodeURIComponent($[_0xa087('8c')]));$[_0xa087('5e')](taskPostUrl(_0xa087('a7'),_0x2f667f),async(_0x2d1805,_0x2ef96f,_0x5de006)=>{try{if(_0x2d1805){console[_0xa087('12')](''+JSON[_0xa087('9')](_0x2d1805));console[_0xa087('12')]($[_0xa087('1f')]+_0xa087('a8'));}else{if(safeGet(_0x5de006)){_0x5de006=JSON[_0xa087('6a')](_0x5de006);if(_0x5de006[_0xa087('73')]&&_0x5de006[_0xa087('74')]){message+=_0xa087('47')+$[_0xa087('29')]+_0xa087('a4')+_0x5de006[_0xa087('74')][_0xa087('91')]+'\x20';console[_0xa087('12')](_0xa087('a9')+_0x5de006[_0xa087('74')][_0xa087('91')]);$[_0xa087('91')]=_0x5de006[_0xa087('74')][_0xa087('91')];messageTitle+=_0xa087('a3')+$[_0xa087('91')]+'\x20';}else{console[_0xa087('12')](_0xa087('aa')+JSON[_0xa087('9')](_0x5de006));if(_0x5de006[_0xa087('ab')][_0xa087('a')](_0xa087('ac'))>-0x1&&_0x5239da!=0x3){await joinShop();await $[_0xa087('44')](0x3e8);await saveTeam(0x3);}else if(_0x5de006[_0xa087('ab')][_0xa087('a')](_0xa087('ad'))>-0x1&&_0x5239da==0x0){await $[_0xa087('44')](0x3e8);await saveTeam(0x1);}}}}}catch(_0x5c00c8){$[_0xa087('5b')](_0x5c00c8,_0x2ef96f);}finally{_0x256b35();}});});}function joinTeam(_0x55e58b=0x0){return new Promise(_0xc53c87=>{let _0x28bd76=encodeURIComponent(encodeURIComponent($[_0xa087('3d')]));if(_0x55e58b==0x1)_0x28bd76=encodeURIComponent(encodeURIComponent($[_0xa087('3d')]));let _0x3a4a6e=_0xa087('5d')+activityId+_0xa087('92')+$[_0xa087('91')]+_0xa087('90')+_0x28bd76+_0xa087('a6')+encodeURIComponent(encodeURIComponent($[_0xa087('8c')]));$[_0xa087('5e')](taskPostUrl(_0xa087('ae'),_0x3a4a6e),async(_0x2b0d71,_0x1b77c2,_0x283bab)=>{try{if(_0x2b0d71){console[_0xa087('12')](''+JSON[_0xa087('9')](_0x2b0d71));console[_0xa087('12')]($[_0xa087('1f')]+_0xa087('af'));}else{if(safeGet(_0x283bab)){_0x283bab=JSON[_0xa087('6a')](_0x283bab);if(_0x283bab[_0xa087('73')]&&_0x283bab[_0xa087('74')]){message+=_0xa087('47')+$[_0xa087('29')]+_0xa087('b0');$[_0xa087('12')](_0xa087('b1'));}else{if(_0x283bab[_0xa087('ab')][_0xa087('a')](_0xa087('ac'))>-0x1&&_0x55e58b!=0x3){await joinShop();await joinTeam(0x3);}else if(_0x283bab[_0xa087('ab')][_0xa087('a')](_0xa087('b2'))>-0x1){$[_0xa087('34')]=!![];}else if(_0x283bab[_0xa087('ab')][_0xa087('a')](_0xa087('ad'))>-0x1&&_0x55e58b==0x0){await joinTeam(0x1);}else{console[_0xa087('12')](_0xa087('b3')+JSON[_0xa087('9')](_0x283bab));message+=_0xa087('47')+$[_0xa087('29')]+'\u3011\x20'+_0x283bab[_0xa087('ab')]+'\x0a';}}}}}catch(_0x28bd78){$[_0xa087('5b')](_0x28bd78,_0x1b77c2);}finally{_0xc53c87();}});});}function getOpenCardAllStatuesNew(){return new Promise(_0x44d1d2=>{let _0x12e89d={'\x75\x72\x6c':_0xa087('b4'),'\x68\x65\x61\x64\x65\x72\x73':{'\x63\x6f\x6f\x6b\x69\x65':activityCookie+_0xa087('b5')+$[_0xa087('3c')]+_0xa087('b6')+$[_0xa087('3d')],'\x43\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e':_0xa087('86'),'Accept-Encoding':_0xa087('84'),'Content-Type':_0xa087('b7'),'User-Agent':$['\x55\x41'],'Accept-Language':_0xa087('85'),'\x52\x65\x66\x65\x72\x65\x72':_0xa087('b8')+activityId,'\x41\x63\x63\x65\x70\x74':_0xa087('b9')},'\x62\x6f\x64\x79':_0xa087('ba')+activityId+_0xa087('90')+encodeURIComponent(encodeURIComponent($[_0xa087('3d')]))};$[_0xa087('5e')](_0x12e89d,async(_0x4d7bca,_0x34cec7,_0x25a95b)=>{try{if(_0x4d7bca){console[_0xa087('12')](''+JSON[_0xa087('9')](_0x4d7bca));console[_0xa087('12')]($[_0xa087('1f')]+_0xa087('78'));}else{if(_0x25a95b&&safeGet(_0x25a95b)){_0x25a95b=JSON[_0xa087('6a')](_0x25a95b);if(_0x25a95b[_0xa087('74')]&&_0x25a95b[_0xa087('74')][_0xa087('bb')]){(_0x25a95b[_0xa087('74')][_0xa087('9b')]||[])[_0xa087('e')](_0x9f2e0f=>{if(_0x9f2e0f[_0xa087('7f')]){$[_0xa087('3f')][_0xa087('f')](_0x9f2e0f[_0xa087('7f')]);}});}}}}catch(_0x248887){$[_0xa087('5b')](_0x248887,_0x34cec7);}finally{_0x44d1d2();}});});}function taskPostUrl(_0x44a3e1,_0xf5b08a){return{'\x75\x72\x6c':''+activityUrl+_0x44a3e1,'\x62\x6f\x64\x79':_0xf5b08a,'\x68\x65\x61\x64\x65\x72\x73':{'\x41\x63\x63\x65\x70\x74':_0xa087('bc'),'Accept-Encoding':_0xa087('84'),'Accept-Language':_0xa087('85'),'\x43\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e':_0xa087('86'),'\x48\x6f\x73\x74':_0xa087('bd'),'\x4f\x72\x69\x67\x69\x6e':_0xa087('be'),'Content-Type':_0xa087('bf'),'\x52\x65\x66\x65\x72\x65\x72':activityUrl+_0xa087('66')+activityId,'\x43\x6f\x6f\x6b\x69\x65':cookie+activityCookie+_0xa087('b5')+$[_0xa087('3c')]+_0xa087('b6')+$[_0xa087('42')],'User-Agent':$['\x55\x41']}};}function taskUrl(_0x1674f7,_0x3ede66){return{'\x75\x72\x6c':_0xa087('1a')+_0x1674f7,'\x62\x6f\x64\x79':_0x3ede66,'\x68\x65\x61\x64\x65\x72\x73':{'\x41\x63\x63\x65\x70\x74':_0xa087('83'),'Accept-Encoding':_0xa087('84'),'Accept-Language':_0xa087('85'),'\x43\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e':_0xa087('86'),'Content-Type':_0xa087('bf'),'\x48\x6f\x73\x74':_0xa087('87'),'\x43\x6f\x6f\x6b\x69\x65':cookie,'User-Agent':$['\x55\x41']}};}function TotalBean(){return new Promise(async _0x24076a=>{const _0x1222eb={'url':_0xa087('c0'),'headers':{'Accept':_0xa087('c1'),'Content-Type':_0xa087('bf'),'Accept-Encoding':_0xa087('84'),'Accept-Language':_0xa087('85'),'Connection':_0xa087('86'),'Cookie':cookie,'Referer':_0xa087('c2'),'User-Agent':$['\x55\x41']}};$[_0xa087('5e')](_0x1222eb,(_0x2c2ad7,_0x5e1ac5,_0x3faaca)=>{try{if(_0x2c2ad7){console[_0xa087('12')](''+JSON[_0xa087('9')](_0x2c2ad7));console[_0xa087('12')]($[_0xa087('1f')]+_0xa087('c3'));}else{if(_0x3faaca){_0x3faaca=JSON[_0xa087('6a')](_0x3faaca);if(_0x3faaca[_0xa087('c4')]===0xd){$[_0xa087('2a')]=![];return;}}else{console[_0xa087('12')](_0xa087('c5'));}}}catch(_0xda122){$[_0xa087('5b')](_0xda122,_0x5e1ac5);}finally{_0x24076a();}});});}function safeGet(_0x2b652c){try{if(typeof JSON[_0xa087('6a')](_0x2b652c)==_0xa087('55')){return!![];}}catch(_0x3d61e8){console[_0xa087('12')](_0x3d61e8);console[_0xa087('12')](_0xa087('c6'));return![];}}function accessLog(){return new Promise(async _0xa09041=>{const _0x589565={'\x75\x72\x6c':_0xa087('c7'),'\x68\x65\x61\x64\x65\x72\x73':{'\x41\x63\x63\x65\x70\x74':_0xa087('bc'),'Accept-Encoding':_0xa087('84'),'Accept-Language':_0xa087('85'),'\x43\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e':_0xa087('86'),'\x48\x6f\x73\x74':_0xa087('bd'),'\x4f\x72\x69\x67\x69\x6e':_0xa087('be'),'Content-Type':_0xa087('bf'),'\x52\x65\x66\x65\x72\x65\x72':activityUrl+_0xa087('c8')+activityId,'\x43\x6f\x6f\x6b\x69\x65':cookie+activityCookie+_0xa087('b5')+$[_0xa087('3c')]+_0xa087('b6')+$[_0xa087('42')],'User-Agent':$['\x55\x41']},'\x62\x6f\x64\x79':_0xa087('c9')+encodeURIComponent(encodeURIComponent($[_0xa087('3d')]))+_0xa087('ca')+activityId+_0xa087('cb')+activityId+_0xa087('cc')};$[_0xa087('5e')](_0x589565,(_0x5d1077,_0x3d92dc,_0x2c25ab)=>{try{if(_0x5d1077){console[_0xa087('12')](''+JSON[_0xa087('9')](_0x5d1077));console[_0xa087('12')]($[_0xa087('1f')]+_0xa087('c3'));}else{if(_0x3d92dc[_0xa087('61')]==0xc8){refreshToken(_0x3d92dc);}}}catch(_0x4093a4){$[_0xa087('5b')](_0x4093a4,_0x3d92dc);}finally{_0xa09041();}});});}function refreshToken(_0xa8b7c3){let _0x31718f=_0xa8b7c3[_0xa087('52')][_0xa087('53')];if(_0x31718f){activityCookie=_0x31718f[_0xa087('17')](_0x33a43e=>{return _0x33a43e[_0xa087('56')]('\x3b')[0x0];})[_0xa087('cd')]('\x3b');}}function jsonParse(_0x4a6660){if(typeof strv==_0xa087('ce')){try{return JSON[_0xa087('6a')](_0x4a6660);}catch(_0x225064){console[_0xa087('12')](_0x225064);$[_0xa087('1e')]($[_0xa087('1f')],'',_0xa087('cf'));return[];}}}function GetCookie(){if($request[_0xa087('d0')][_0xa087('a')](_0xa087('77'))>-0x1){if($request[_0xa087('d1')]){let _0xa00798=$request[_0xa087('d1')][_0xa087('28')](/activityId=([a-zA-Z0-9._-]+)/);if(_0xa00798){let _0x8a7c27=$request[_0xa087('d0')][_0xa087('56')]('\x2f');console[_0xa087('12')](_0xa087('d2')+_0xa00798[0x1]);console[_0xa087('12')](_0xa087('d3')+_0x8a7c27[0x0]+'\x2f\x2f'+_0x8a7c27[0x2]);$[_0xa087('d4')](_0xa00798[0x1],_0xa087('4'));$[_0xa087('d4')](_0x8a7c27[0x0]+'\x2f\x2f'+_0x8a7c27[0x2],_0xa087('5'));$[_0xa087('1e')]($[_0xa087('1f')],_0xa087('d5'),_0xa087('d6')+_0xa00798[0x1]+_0xa087('d7')+_0x8a7c27[0x0]+'\x2f\x2f'+_0x8a7c27[0x2]);}else{$[_0xa087('1e')]($[_0xa087('1f')],_0xa087('d8'),'');}}}};;_0xodl='jsjiami.com.v6';

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
