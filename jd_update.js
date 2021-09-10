/**
 * 强制更新
 * cron=0 0-23/12 * * *
 */

const exec = require('child_process').exec;

exec("cd /ql/repo/JDHelp_jd_scripts; git fetch --all; git reset --hard origin/main; git pull", (error, stdout, stderr) => {
  console.log(1, error)
  console.log(2, stdout.trim())
  console.log(3, stderr)
})

if (__dirname.indexOf('/ql/') > -1) {
  exec('ql repo https://github.com/he1pu/JDHelp.git "jd_|jx_|getJDCookie" "activity|backUp|jd_delCoupon" "^jd[^_]|USER|MovementFaker|JDJRValidator_Pure|sign_graphics_validate|ZooFaker_Necklace"
', (error, stdout, stderr) => {
    console.log(1, error)
    console.log(2, stdout.trim())
    console.log(3, stderr)
  })
}
