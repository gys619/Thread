/**
 * 强制更新
 * cron=0 0-23/12 * * *
 */

const exec = require('child_process').exec;

if(process.env.PWD==='/ql/scripts'){
  exec("cd /ql/repo/he1pu_JDHelp")
}

exec("git fetch --all; git reset --hard origin/main; git pull", (error, stdout, stderr) => {
  console.log(stdout.trim())
})

if(process.env.PWD==='/ql/scripts') {
  if (__dirname.indexOf('/ql/') > -1) {
    exec('ql repo https://github.com/he1pu/JDHelp.git "jd_|jx_|getJDCookie" "activity|backUp|jd_delCoupon" "^jd[^_]|USER|utils"', (error, stdout, stderr) => {
      console.log(stdout.trim())
    })
  }
}
