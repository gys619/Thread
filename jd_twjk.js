/*
 特务集卡
 脚本没有自动开卡，会尝试领取开卡奖励
10 10,18,20 * * * jd_twjk.js
* */
const $ = new Env('特务集卡-加密');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = [];
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
    };
} else {
    cookiesArr = [
        $.getdata("CookieJD"),
        $.getdata("CookieJD2"),
        ...$.toObj($.getdata("CookiesJD") || "[]").map((item) => item.cookie)].filter((item) => !!item);
}
console.log('\n活动地址：首页下拉，需要开卡才能100%集齐，没有开卡的手动开，集齐晚上8点后瓜分\n')
var _0xodS = 'jsjiami.com.v6',
    _0xodS_ = ['‮_0xodS'],
    _0x1904 = [_0xodS, 'w5DCt8OmJcODw4rDkQ==', 'csOrwqw=', 'Glc6wrw=', '5Li95LmQ6LeS5Y2E', 'MmHCujxU', 'w4fCmnQSHsO2BUA=', 'IUUywqvDmcKHGUE=', 'w6norKjph4fmlqbnm7LlvbfojI3ljr3DvwvCvcOXF8OwLcKcw5HDrT3DqsOcBcO4bMKtRcKiw7FIIsKsw6vCh8Kow4vDrcOIUlkfG8OgQ8KdYAjDrsOvw6M1w7BB', 'TgTCtsK8wrE=', 'wpxhFsOY', '5LqO5Liu6Lah5YyX', 'wox1w4rDs8KNWgNU', 'wqvorJ3phLjmlJvnmajlvqnojpbljrXDj8O4V8KVZsKH', 'aMOFw5nCtMOjTQ==', 'woRuOcO3RA==', 'C2LCmhx1', 'w70jwpM=', 'BcOiw6jCkg7CjRtGwoQ=', 'wrVpw4g=', '5LuV5Yil77+K', 'w7Xkv6fmg4DlvoPlu7s=', 'w5HCi8KHw5h2', 'w5k3w7DDpWM=', 'wrvClRnCk8Owfi8=', 'wpnCpFoCw6M=', 'wozCs29mw4E=', 'w5fCrcOJIcOKw4LDkg8=', 'w6zCt8OPOMOqw4LDkg8=', 'TFvDpMKLKDTCqQU=', 'V8O6wqpHaw==', 'ETfCkMKIwqY=', 'eRXDnXLCiQ==', 'w7VxwqU=', 'feS+suaAv+W8gOW7sQ==', 'w7XCqMOTOMOW', 'RBQVw47DgsKB', 'w4MkCsOmbQ==', 'BHExwqzDvA==', 'w7jDvicsAg==', 'esKnZSLDjQ==', 'ZgXCuGNo', 'TC3DkFTCuw==', 'w50gwo3DgcKw', 'wqnDpAzDk8KMNA==', 'wrnDo2zCucKC', 'w640DsOeXQ==', 'Ti9Yw70=', 'w57ojrfljq3mtoblip7or5XmgLjlpa7otbsI', 'wrbChyHCnQ==', 'Yn9zDBPCk8OSfk4=', 'K13DmsOiw5lqwoPCthZuW8KcHkw0b3Rgw4UzUMKGw4jDsOS4kOWIncKTJynDlMKXQMKjw4LDkl5qL0DCgWVtNgrCjcK+wpY9cQ==', 'YRPClMOewrc=', 'bcKjwqZqBg==', 'bMK8wohpdw==', 'BEMewr/DhQ==', 'w70pwprDlMK2w5U=', 'w63Ch8Klw4Jn', 'wq/CtnwI', 'w5fCocOPLg==', 'w6MaJg==', '5Y6T5Yu25Ym6Ew==', 'ZHhkFw==', 'w4XCtXE6AA==', 'wrHClEfCrsKFRBHDmsKHej3DhSIyXVvDiw9oRm3DocKkdcKww70xw6YGw4w=', 'MDAka8K/w6bChW/DsjM=', 'BH3ChEdlM3k8RSliK2rDjMKOLVTChivCiBk=', 'R1zDpMKSHyXCsDBhw4bDvyHDmWN6Ig==', 'wrh6wpHDvHHDmcORw61BNSY0w47CosO9IsKrw4HDr8KYwpsvwq1ocCjDj8Oiw7pDw54=', 'PcK0w6lLfELDrErDnMOlw6YbRWLDqQ7Dow==', 'QyXDnnTCvMO9wrc=', '5YmH5YmB5ouX5Yqz', 'wqjDn07CgsKfUhc=', 'ZjvDsVDCnw==', 'w63DhW3Dqw4=', 'Rwoma3Y=', 'N2DCuQ==', 'c2J7JhLCkMOe', 'GE3CnQtv', 'w5ZWw5Q=', '5Yi45YuX5q+V5peD5bSw55aV5ayq', 'GFkw', '5Yih5Yii57qS5p+F772z', 'ZgfCtMOM', 'Rj7CjEw=', 'w77DhuWlpOi3mcK2N+WPnuWassKLwpk=', 'wr9vw4HDoMKvVxc=', 'KsKWLjo=', 'eBHCvGVywrXCihZOEcKJERAGw7UNw4QH', 'wofCrUFGw4A=', 'w70kwozDncKk', 'RSrDkHvChw==', 'Mlkdwr/DmQ==', 'eMOfw4bCusO4asOxwo8TGcOAw5cuJ1rDgg==', 'wojCjE09w5M=', 'fCw6dmI=', 'bAbDlVLCmg==', '5bKm5ruL5oiY', 'wofDs27CocK7wprDjDQXS8KxO8OWw6XCvAPDhk81eRBjMw==', 'FDbCoMKNRg==', 'wp9hD8OeXg==', 'wqxFXcO/OhU=', 'bRkkeHNCGj7Cs8OEwpLCnE8KRGQ=', 'IsKWJw==', 'UxXChMK6wpgz', 'wr9DWsOjIAgsAR43', 'Mxl5TsKl', 'w7LCk8OdIsOU', 'KiHCg8KMwrzCv8ORw7Er', 'w5EBw4TDtXI=', 'f8KmQyTDtVLDo8K2eQ==', 'wqjCoGoPw65C', 'BMOzw6nCjgzCng==', 'w5PCr8KGL8ODw6zDplI=', 'IXAHwq/DoQ==', 'wrbCqn4=', 'w7Xpu5fljZg=', 'MyrCsw==', '5Yq45YqQ5oiR5Yu6', 'UFfDtMKVCiE=', 'wr5dwoA=', 'BeiOqeWNg+a1huWKtOiuqOaAtuaLkOWLiQ==', 'w4zCnXQLKcOnHHXDsW5Gw59xWGFX', 'bcK9asOmwoNeLFDCt8KpwqpURi0sJQ==', 'NQFPUcKC', 'wp3CjjvCvcO5', 'OyzCosKeRSfCuHZfcggm', 'SxAJw43DpcKdaHhCwrE=', 'YMK9Vg==', 'RALCscKGwrg=', 'eD7CqFll', 'w7PCmzI2HMKIemnDq8Ktwq3Djj0FY8OGGiQGw6BBw6tUPsOEw5U9OmMb', 'wovDrMKQKsOsw7fDrFbDqcKQKiMgw43CmG7DpUDCnVXDlQ==', 'w7jDqTsOw6NRwrHCusOJR8O4QMO2w4omwoNs', 'QsOrwrc=', '57uy5p+s77+t', 'wofDr3PCv8KGwpjDhj0A', 'wofCtnx/w61Hw64CwpgGwprDlwbDt2LDgA==', 'RhUldMOLXG0wwrTCs8KFBQ==', 'w6zCosK+w6dq', 'w6fDvHPDqC/DkcK4w7ENYw==', 'R0p3NBk=', 'RDDChg==', 'woXltIHnk4vlib8=', 'wqbDmVM=', 'Yuafk+mahum8j+aKsuiAu+aeluWJpeeTuuWJkuaUhemVnw==', 'Xz7CiF0=', 'd8KnwqB8CA==', 'asKUwptoTw==', 'UcOmw7nCi8Oe', 'SQIIw4DDkcKHZGlZwrbDvgDDhkY=', 'OcO+w7zCryM=', 'w4zDumDDrDo=', 'wrZnw5rDlcKy', 'MjIiZsKIw7zCgn/DiCPDgsK7wr3DgcKnLiM=', 'w7/CmcK+NsOj', 'Ejlf', '6aOZ5Y6T5Ym95Yms5aW35Yuz', 'wqHCkyXCmcOlVTMzw5/DnUkce8Kawo54HyJrwpzCuw==', 'wo/CuXLCucKdwo3DjD5bFcOVNMOYw7jCqmbCiwAxUwpsKsKwVGtzSBpK', 'IMO8e8OhwpZFIVnCgMKYwqpfZSYpPgLDs8KYwqgs', 'TS5Zw7zCn8O9XMKtNA==', 'fAXCpXQ=', 'w5XDmU4=', 'LDHCpsKeTyXCgmRH', 'QAPChMKmwpMpw4PDvlU3OMOQXgQ=', 'asKGR8OJwr0=', 'w5/CnMOzDMOs', 'w4XCnHA=', '5Lip5YqT77+9', 'wovkvK/mgprlvYblurc=', 'w6nDijIwDsKUdGnCp8Ojw4HDjDES', 'w5zCvMOe', 'URQ8bcOfUFAjwpTCpMKEH2k5N30=', 'QQUew4TDv8KN', 'ZwvCqw==', '5Luq5Yqq77yb', 'wo3kvIvmgprlvqnluKs=', 'asKufcO9wpA=', 'ailyCgjChsOYfRU7FXTDkcKmwqg4w6saw4J7OWPCrXbCuMOuIg3DnsOs', 'EnhOw7vCksOoTMK7OcKkw5/DtcKvJsKtNHTCqnNTwrM=', 'M0rDv8OdwovClsKjZ8KdIi7CkjTCp8K2VCQtMsKWwr03VTHDgw==', 'aRQzY3xbGgbCgsOWwojCnmgJR2Uew6HDqw==', 'w7slw4DDtGXDhMOVw69BLBcjw4rCkw==', 'M8K6wqJeelvDjEHCkMKLwr0=', 'wq1ZY8OGSsKrXz8Bwop9QcOtGyU+wo4=', 'w4vCocKS', 'w47CpcODPg==', 'wqBRw6fDiMKZ', 'bcKtbcOmwpJZNUzCmsK8woxJfyY=', 'O14xwo3DlA==', 'ScKbccOWwoc=', 'ejMAbsOe', 'c8O3wqw=', '5LmC5YiX77yz', 'OCbCgsKMwrXCtsOVw7I8RsK0fAMY', 'w57ljrvmiJzoo7Ea6K+E56uw56mS', 'wq/DjkA=', 'RyPDiFvCvMOuwoHCtVLDrQ==', '5Lm/5Yi877yb', 'XyLCssO+wrI=', 'wqpzw5/DpMKxeRxQUQXDn8O9wpxFLng=', 'InfCgsKKwqfCqsObw7JwCMOYfg8PFRHDi8O4w69NOVHDr0XCrU/Dh254Uw==', 'EVg0wqvDrsKWAGXCoG/DtcKEwq/DtcOuYsKMSF8=', 'CnPDg0h1MmkrXxR1KnTDvcKUKXjDgDM=', 'Cl1Zw4jDlcKdYGNZwpbDkwnDkwEtwr/CmA==', '5ouj6KOR57uS5pyQ772m', 'YhLCr8ORwovCksK4eMKU', 'wqXChzzCiA==', 'NTrClg==', 'wrzChzjCmQ==', 'c1lgHRU=', 'HDHCmsKwwp4=', 'b2jDosKjJA==', 'wqbDonrCrcKz', 'PcKNMjbDilnDlTNf', '5Lu35Ym/77yE', 'w7bljb7mib7ooLbCruivgeeqnueqjQ==', 'acKmag==', 'FkQ2wrfDs8KrEUnCsXnDrsKvwqjDq8O/', 'w5DDgkzDjxZp', 'RXHDsg==', '5Lqk5Yuk77+O', 'w44SE8OdcQ==', 'w4fCmsKWw5l2', 'IC3CrTZZIsOGFcO0w6zDjsODwpPCsmvCrMOiwptvwoBEdcOiw6kMw4oVJFHCgA==', 'w74QwoLCtx7DpsOZw4HCjMOqCSHDm3puVsO7byVYRg==', 'wrfCiDbCjsOuZzUTw4LDinQaZsKcwqd5Hx9q', 'bQkjeGJFAyLCn8ORwrXCgHYB', 'BTzDvAl5I8K6wqR0GMKd', '5ouo6KC557qS5py777yz', 'wq1UXMOjOAYxHi4=', 'wr3Dl13CtQ==', 'w5zDjl0=', 'VsOuwppLfg==', 'w5XDk0fDhStl', '5LiP5Yi677yb', 'Q0HDtMKJATvCqQV9w53DmyXDl3I=', 'w7VLwqUkwrY=', 'woZ3ZcO4Og==', 'w6jCnMKkw4py', 'Eg/CpcKSaA==', 'w5LCnsKUw59mwo8=', 'GsO5w70=', '5Lq15YmY772a', 'w5jCt8OZI8ODw43Dkg/DgT3DgjnCsig=', 'PeWPneaKuuijtMOJ6KyC56uc56iT', 'YsOew5PCssODTA==', 'w54iHsOTVUHChC8qajJDwpYfwq5idGjDh8KNw7c=', 'wqDDrwHDhsKBLMOUw5sCWsOWPBnDiMK/DMOYw7Ba', 'LsO+EyzDqEbDo8K3bsKAZkJ5cxoSNUTCjQ==', 'IFg5ZWBGJyPDk8Kfw4M=', 'I8Oxw55rfMKFw5fCiVpIw4hSw5Uew53DlcKDG8Omw5fCnk0nIwcWHMO5DE5kGUfDi8KtRcK/', 'w5XCq8ON', 'wq5nw4bDtQ==', 'w6HDpXU=', 'w5tKw4DCo1/Do8OUCcKHS3AKw5XCvC4z', 'worCq297w4BG', 'TR/CkA==', '5Lii5Yqn7761', 'w7slw4DDtGXDhMOVw69BLA07w5fCkw==', 'EuS+u+aBhOW+l+W7iQ==', 'woTDrnLCvg==', 'wobCsWlkw7BSw44qwoYQwqDDhAnDrnLDncKKw4Y8', 'JyvCnMKSWw==', 'w6YbJcOCUcKQUA==', 'wp3DlinDhsKU', 'w5F7w57Cv3Y=', 'w6pqwqMjwpLDsg==', 'RB4c', '5Luq5YuH77+H', 'wrXljqXmiqXooJvDi+ittuerp+eogw==', 'bAXCoWVDwoLCigVFG8KpIgYaw5gWw5M6VcKiwqc=', 'w57Dl0TDhxx4w6AMwpDDqHEOQcO+VmzDpcKYHsKhw74=', 'bsOEw5XCrcOzWMO3wq8ODsOtw58UK0zDh8O7IMON', 'd8OwQiLDrkfDqcK1IsOXIU9sVQdAfETDln/CqVZ7X1szw5vDlMKCPA==', 'YsObJTHDh0zDhSVSBMKBw4TDp8OVwrIGeQQUwooz', 'KcKGwpTCrMOvS8OAwoEZGMKmwoJY', 'e8K/d8O7', 'HT3CvcKVbQ==', 'WsOrwohdWg==', 'ECEHZMKm', 'wpNzCMOURUfCqT4tUQRJwogbwqR6', 'acK2wrdkJ1g=', 'c+S+pOaCu+W/teW4mQ==', 'cMK3wqFh', 'wpduGMOPT0PCiR4tSSlLwpIXwqh4SUXCgQ==', 'RxIHV8Oj', 'wpbCtMK1YSQ=', 'wpfDnU7CgsKE', 'wqTCnsKSbQ==', 'eRLCqcOIwpbDj8O+McKMJgbDjyrDoMK7XmcrM8KPw5tsAn7CiMKMfsKrEsKWKcO7dzLCiVt5DcKwwpzDvMK4w4LCm8OswojCtcKbwqrDtcKfYyBIZCEfwqfCkDrDrjrCjUbCrcOAL8OLw6l1w4zCnyjCpglfw5EDw5TCjsKXwrrCjcKBdiDDjAjDuHAc', 'w6PDtV8=', 'wqvDrhU=', 'wprCohfCuMOa', 'ZMKmRT3DqA/CpcO/cMKfbEhoUU0PfgzDkzLCvlBg', 'Q0LDt8KMDzbCpRR6w4bDu2vDkGRcKAXCscOfwofCj0LCpsOsEQzCrE98IzjCrnY=', 'F8Omw7PDlQ3DhBhEw5Nww7vCkg==', 'eBXCk8OXwoHCkA==', 'w47DmV7DmS/DoMKLw5o5V8ObcWs=', 'EVgh', 'VcOcwpR/THPDl3rDs8O2w5oldA==', 'ZCXCq8OLwqQ=', 'wrbCjE9Ew5Zjw70uwrs3', 'w6gQNcODSMKrVw==', 'JsKdKBPDqQ==', 'a8K7asOrwpRDOQ==', 'w7bDtG7Dig0=', 'e8K1w5FpcQ==', 'RQY6bcKDGVohwrPCq8KRAnp8Y2bDug==', 'wqPkvpTmgK7lvqXluJE=', 'w4pWw4DCvg==', 'YsOiwpt1QQ==', 'wrVYwpXCoBA=', '5LqN5Yi3776A', 'WuS9t+aDteW/ueW5mA==', 'wqrCpGsJw6c=', 'wrZTwpPCuA==', 'cjHCmsO+wrw=', 'WyvCk0BoJmkqSA==', 'ZMKjwqZo', 'clxGIyQ=', 'wpDCgFQgw6E=', 'Tl3DoA==', 'J+m6teWMuw==', 'AjcCbcKs', 'wobDvnXCtcKHwpvDig==', 'acKzwqZgRQ==', 'dsK6HC7DtQ==', 'wrZUWsO6JVt3VyAiw75bw6vCisOOaGwKwrhnw7syI2PDgBfDsB4vwqjCrMKFw7Q8wq/Cm8KSw5jCrcOBeHoOeMO3aA9BwpQ=', 'w7APe8OZEzMHORAWw4Mhw5I=', 'RsKaS8OO', 'w7kewozDgMKy', 'wrRiVsOzAg==', 'wqLDryjDosKu', 'w78awo7Dl8KU', 'LBbCq8KPwrA=', 'wqbDrg3Dn8KROQ==', 'YsOZw7jCsMOuTQ==', 'wqTCnsKYeQbCu2XCl8K1HTxNfw==', 'aRQm', 'wrFIw7fDpMKN', 'Xw7Cv8OOwrc=', 'VcKRwpdbMX1ZwqLDtn0=', 'eAwfdUA=', 'PGrCqj1NJMOE', 'SsKGwodI', 'wp7Dv2DCpsKYw4TDhgsRQMKZMsKCwrPDoHDCiRZrAUorb8OiTndOW1cCwqbDkyEgMSzCoEPDs0MVcEDCvCjCrsKhw4fChRgbw6DDosObw5nCq8KvcDfCscK8XsKGbyJQw6sMw4g9w6J5w6Q4woZJw47CtcOMXcOPDcKiw7MwQn0AwrfDhMKkckrCrgbDs8OPTMK/w4XDlsK2cxd4WsKQFMK1UUxhw7XCqcKXwqLDqApLGmt+w4Q4wqM1wrdJfAvDkcKDHMOrw7vDtDFhdTJrw6LDkV9cwrcNw4vCoVfDlsKRIsOLS8K0YcOjwpzDoA==', 'fwfCsMOd', 'w7JzwrfCkOiuiuazluWmkei2lO+/tOitjeaiu+aeq+e/oOi3sOmHgOivtw==', 'wq5BXMO5Mw==', 'eHhNChrCncOV', 'aTM/w7HDkg==', 'wqzDrBfDnMKp', 'EgxPX8KQ', 'wrTCrHoRw4xXw77DpQ==', 'MXotwrfDgA==', 'ZzApc8O4', 'woDCs8KkRzvCn1rCrQ==', 'wrbCrG9kw4dDw5cO', 'fMKzQz7Dvg==', 'w6HClsKnCMON', 'w4rDglvDizFqw7sYwow=', 'GjdMWA==', 'w4lNw4HCo0LDsMOpDsKN', 'aCUSeMOp', 'wrfDqzXDhcKZ', 'WcKhVD/DlVTDp8K1', 'Vylnw7rClsOzWw==', 'wo/CsG0=', 'NTrClsKgwqDCqg==', 'SCXDo2TCsg==', 'QjvDgm3CvQ==', 'IOafuOmbt+m8neaKjeiAsOaeoOWLoOeTnOWLq+aXtemXmA==', '5Lmm5Lqq5py55Ymg5ZqY6L+i5Zqs56uF5peV5oyu', 'wqDCgyHCn8O4cyQ=', 'wrtnw5zDpA==', 'VsO+wpxiWQ==', 'bkTDpMKrKg==', 'wrzDlWjCsMKH', 'azgGY0A=', 'dkTDhcKpAQ==', 'R8Kmwqk=', 'eGZbCjM=', 'GUFD', 'YU/DlzV1', 'Sh0fd1Y=', 'wp9hw6DDp8KQ', 'Yhs9dA==', 'w7lJw5vCi00=', 'w4HCh2MJI8KtRwrDoWRNw5Q8QQZZMsKGw4bClQDDj35nGsKGLsOEHMO7M8KRKMKKDcKKG8KTIMO1U8K0w4Q=', 'Y8Oew4LCr8O5EsKsw4EfGMOlw5ZUKwfDg8OrR8OKw47DuMOvVsOSwrFiD10Aw4HDlcO7XsKow5bCrhDDtcOACsO1wr3Dpw==', 'wrPDrFTCscKk', 'RSDCmMO6wpQ=', 'aErDrARO', 'OjrCnsKOwrvCvQ==', 'wrvCqcKiXhvCn1rCrQ==', 'w77DgSAvBw==', 'Y8Ktwr1iB1k=', 'TBHCg8Kswpw=', 'wo7Cvn51w6E=', 'wptuH8OYTg==', 'SQHCvsK4wr8=', 'wpM0w6h9w43Cq8OA5byO5aWZ44Gq5Lqp5LqW6Leb5Y2o', 'OD00Z8Kx', 'CjbCscKFbyPChmc=', 'w6/Cq0jCnsOSdsKKwrBbIw==', 'YjsdxYjiaqUHmNpSi.rcoBm.v6=='];
if (function(_0x3acd88, _0x3964a8, _0x192e3c) {
    function _0x5693ae(_0x4be0d5, _0x5a6582, _0x4f98fb, _0x4f59b0, _0x84aa15, _0x1ecb5b) {
        _0x5a6582 = _0x5a6582 >> 0x8, _0x84aa15 = 'po';
        var _0x32f29b = 'shift',
            _0x3ee591 = 'push',
            _0x1ecb5b = '‮';
        if (_0x5a6582 < _0x4be0d5) {
            while (--_0x4be0d5) {
                _0x4f59b0 = _0x3acd88[_0x32f29b]();
                if (_0x5a6582 === _0x4be0d5 && _0x1ecb5b === '‮' && _0x1ecb5b['length'] === 0x1) {
                    _0x5a6582 = _0x4f59b0, _0x4f98fb = _0x3acd88[_0x84aa15 + 'p']();
                } else if (_0x5a6582 && _0x4f98fb['replace'](/[YdxYqUHNpSrB=]/g, '') === _0x5a6582) {
                    _0x3acd88[_0x3ee591](_0x4f59b0);
                }
            }
            _0x3acd88[_0x3ee591](_0x3acd88[_0x32f29b]());
        }
        return 0xe03bc;
    };
    return _0x5693ae(++_0x3964a8, _0x192e3c) >> _0x3964a8 ^ _0x192e3c;
}(_0x1904, 0x176, 0x17600), _0x1904) {
    _0xodS_ = _0x1904['length'] ^ 0x176;
};

function _0x4c62(_0x43b2c3, _0x4c8e39) {
    _0x43b2c3 = ~~'0x' ['concat'](_0x43b2c3['slice'](0x1));
    var _0x15b9a2 = _0x1904[_0x43b2c3];
    if (_0x4c62['lnYWSZ'] === undefined) {
        (function() {
            var _0x3ed84a = typeof window !== 'undefined' ? window : typeof process === 'object' && typeof require === 'function' && typeof global === 'object' ? global : this;
            var _0x515263 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            _0x3ed84a['atob'] || (_0x3ed84a['atob'] = function(_0x192d3b) {
                var _0x5b308e = String(_0x192d3b)['replace'](/=+$/, '');
                for (var _0xf61fd5 = 0x0, _0x105ddf, _0x48a4bc, _0x44b9af = 0x0, _0x3ba983 = ''; _0x48a4bc = _0x5b308e['charAt'](_0x44b9af++); ~_0x48a4bc && (_0x105ddf = _0xf61fd5 % 0x4 ? _0x105ddf * 0x40 + _0x48a4bc : _0x48a4bc, _0xf61fd5++ % 0x4) ? _0x3ba983 += String['fromCharCode'](0xff & _0x105ddf >> (-0x2 * _0xf61fd5 & 0x6)) : 0x0) {
                    _0x48a4bc = _0x515263['indexOf'](_0x48a4bc);
                }
                return _0x3ba983;
            });
        }());

        function _0x1a7f80(_0xc9c1a2, _0x4c8e39) {
            var _0x2b3cb5 = [],
                _0x36d0db = 0x0,
                _0x4a6333, _0x4f29c1 = '',
                _0x2dce6a = '';
            _0xc9c1a2 = atob(_0xc9c1a2);
            for (var _0x368f98 = 0x0, _0x1cccb6 = _0xc9c1a2['length']; _0x368f98 < _0x1cccb6; _0x368f98++) {
                _0x2dce6a += '%' + ('00' + _0xc9c1a2['charCodeAt'](_0x368f98)['toString'](0x10))['slice'](-0x2);
            }
            _0xc9c1a2 = decodeURIComponent(_0x2dce6a);
            for (var _0x2329f2 = 0x0; _0x2329f2 < 0x100; _0x2329f2++) {
                _0x2b3cb5[_0x2329f2] = _0x2329f2;
            }
            for (_0x2329f2 = 0x0; _0x2329f2 < 0x100; _0x2329f2++) {
                _0x36d0db = (_0x36d0db + _0x2b3cb5[_0x2329f2] + _0x4c8e39['charCodeAt'](_0x2329f2 % _0x4c8e39['length'])) % 0x100;
                _0x4a6333 = _0x2b3cb5[_0x2329f2];
                _0x2b3cb5[_0x2329f2] = _0x2b3cb5[_0x36d0db];
                _0x2b3cb5[_0x36d0db] = _0x4a6333;
            }
            _0x2329f2 = 0x0;
            _0x36d0db = 0x0;
            for (var _0x42404b = 0x0; _0x42404b < _0xc9c1a2['length']; _0x42404b++) {
                _0x2329f2 = (_0x2329f2 + 0x1) % 0x100;
                _0x36d0db = (_0x36d0db + _0x2b3cb5[_0x2329f2]) % 0x100;
                _0x4a6333 = _0x2b3cb5[_0x2329f2];
                _0x2b3cb5[_0x2329f2] = _0x2b3cb5[_0x36d0db];
                _0x2b3cb5[_0x36d0db] = _0x4a6333;
                _0x4f29c1 += String['fromCharCode'](_0xc9c1a2['charCodeAt'](_0x42404b) ^ _0x2b3cb5[(_0x2b3cb5[_0x2329f2] + _0x2b3cb5[_0x36d0db]) % 0x100]);
            }
            return _0x4f29c1;
        }
        _0x4c62['WtSMRg'] = _0x1a7f80;
        _0x4c62['dExsTq'] = {};
        _0x4c62['lnYWSZ'] = !![];
    }
    var _0x5aafba = _0x4c62['dExsTq'][_0x43b2c3];
    if (_0x5aafba === undefined) {
        if (_0x4c62['mCpENP'] === undefined) {
            _0x4c62['mCpENP'] = !![];
        }
        _0x15b9a2 = _0x4c62['WtSMRg'](_0x15b9a2, _0x4c8e39);
        _0x4c62['dExsTq'][_0x43b2c3] = _0x15b9a2;
    } else {
        _0x15b9a2 = _0x5aafba;
    }
    return _0x15b9a2;
};
let shareList = [];
!(async() => {
    var _0x50d1f3 = {
        'CaCxa': _0x4c62('‫0', 'Ac#8'),
        'olepH': _0x4c62('‫1', ')iZQ'),
        'sQZHQ': function(_0x297063) {
            return _0x297063();
        },
        'HQBHi': function(_0x58c67e, _0x3470e4) {
            return _0x58c67e !== _0x3470e4;
        },
        'CphAa': '【提示】请先获取京东账号一cookie直接使用NobyDa的京东签到获取',
        'Llyrr': function(_0x4faafe, _0x38eca6) {
            return _0x4faafe < _0x38eca6;
        },
        'GwUgL': function(_0x50ed90, _0x326c35) {
            return _0x50ed90 !== _0x326c35;
        },
        'yFxcr': _0x4c62('‫2', '#cVL'),
        'TFEBq': _0x4c62('‮3', '2VG2'),
        'ATyyR': _0x4c62('‫4', 'U32)'),
        'vxavn': function(_0x3735d7, _0x3fd20f) {
            return _0x3735d7(_0x3fd20f);
        },
        'hqIwK': function(_0xebce82, _0x54537c) {
            return _0xebce82 + _0x54537c;
        },
        'otAsE': 'https://bean.m.jd.com/bean/signIndex.action',
        'sCfVo': function(_0x39233d, _0x5bb904) {
            return _0x39233d === _0x5bb904;
        },
        'PmDEY': _0x4c62('‫5', '[*W6'),
        'Hbamt': function(_0x285ddd, _0xe12dad) {
            return _0x285ddd === _0xe12dad;
        },
        'XYyEZ': _0x4c62('‫6', '2VG2'),
        'LQKAD': function(_0x14751a, _0x503d2a) {
            return _0x14751a === _0x503d2a;
        },
        'pGfuk': 'ZIQuS',
        'vuToV': function(_0x2e1def, _0x40e209) {
            return _0x2e1def(_0x40e209);
        },
        'Mxmoj': 'RaMFU',
        'puIfR': function(_0x44246f, _0x5085e2) {
            return _0x44246f < _0x5085e2;
        },
        'LmPit': function(_0x393142, _0x1beac7) {
            return _0x393142 === _0x1beac7;
        },
        'lFfCP': function(_0x17a669, _0xe56b00, _0x4910a7, _0x23c46e) {
            return _0x17a669(_0xe56b00, _0x4910a7, _0x23c46e);
        },
        'SLRLZ': 'superBrandDoTask',
        'jSTLY': _0x4c62('‫7', 'o(hE'),
        'iXlgr': _0x4c62('‮8', 'IYEt'),
        'Kpvzs': 'KyMxZ',
        'CBCRC': _0x4c62('‮9', ')Mrh')
    };
    if (!cookiesArr[0x0]) {
        if (_0x50d1f3[_0x4c62('‮a', '7y99')](_0x4c62('‮b', '[*W6'), _0x4c62('‫c', ')iZQ'))) {
            console['log'](data);
        } else {
            $['msg']($[_0x4c62('‮d', '[*W6')], _0x50d1f3[_0x4c62('‮e', '1ra3')], _0x4c62('‮f', 'Q5$('), {
                'open-url': _0x4c62('‮10', '*cXX')
            });
            return;
        }
    }
    for (let _0x44559b = 0x0; _0x50d1f3['Llyrr'](_0x44559b, cookiesArr['length']); _0x44559b++) {
        if (_0x50d1f3[_0x4c62('‫11', 'U32)')](_0x50d1f3['yFxcr'], _0x50d1f3[_0x4c62('‫12', 'TRbL')])) {
            if (cookiesArr[_0x44559b]) {
                if (_0x50d1f3[_0x4c62('‮13', '7y99')] === _0x50d1f3[_0x4c62('‮13', '7y99')]) {
                    $[_0x4c62('‫14', 'kI3^')] = cookiesArr[_0x44559b];
                    $[_0x4c62('‫15', 'w)ZP')] = _0x50d1f3[_0x4c62('‮16', 'k9zK')](decodeURIComponent, $[_0x4c62('‫17', 'h$fz')][_0x4c62('‫18', 'HPoi')](/pt_pin=([^; ]+)(?=;?)/) && $['cookie'][_0x4c62('‫19', 'LCaH')](/pt_pin=([^; ]+)(?=;?)/)[0x1]);
                    $[_0x4c62('‮1a', 'QvO(')] = _0x50d1f3[_0x4c62('‫1b', 'HPoi')](_0x44559b, 0x1);
                    $['isLogin'] = !![];
                    $['nickName'] = '';
                    console['log'](_0x4c62('‮1c', 'hP(e') + $[_0x4c62('‮1d', 'gZT1')] + '】' + ($['nickName'] || $[_0x4c62('‮1e', 't9DO')]) + _0x4c62('‮1f', 'bGBY'));
                    if (!$[_0x4c62('‮20', 'gOYP')]) {
                        $[_0x4c62('‫21', '#cVL')]($[_0x4c62('‫22', 'EzIg')], '【提示】cookie已失效', _0x4c62('‫23', 'CtI#') + $[_0x4c62('‮24', 'PcjI')] + ' ' + ($[_0x4c62('‫25', 'Q5$(')] || $[_0x4c62('‫26', 'EzIg')]) + _0x4c62('‮27', 'LCaH'), {
                            'open-url': _0x50d1f3[_0x4c62('‮28', 'HPoi')]
                        });
                        if ($['isNode']()) {
                            await notify['sendNotify']($[_0x4c62('‮29', 'QvO(')] + 'cookie已失效 - ' + $['UserName'], _0x4c62('‫2a', '2VG2') + $['index'] + ' ' + $[_0x4c62('‫2b', ')iZQ')] + _0x4c62('‫2c', 'YZTQ'));
                        }
                        continue;
                    }
                    try {
                        await main($[_0x4c62('‫2d', '*cXX')]);
                    } catch (_0x282ca) {
                        if (_0x50d1f3['sCfVo'](_0x4c62('‫2e', 'QvO('), _0x50d1f3[_0x4c62('‮2f', 'PcjI')])) {
                            return;
                        } else {
                            console[_0x4c62('‮30', 'CtI#')](JSON[_0x4c62('‮31', 'o(hE')](_0x282ca));
                        }
                    }
                } else {
                    console[_0x4c62('‫32', ')iZQ')](_0x4c62('‮33', 'Sgcg') + oneTask['assignmentName'] + _0x4c62('‮34', ')iZQ'));
                }
            }
        } else {
            data = JSON[_0x4c62('‮35', 'YZTQ')](data);
            if (data[_0x50d1f3[_0x4c62('‫36', 'Iib4')]] === 0xd) {
                $[_0x4c62('‮37', 'Ac#8')] = ![];
                return;
            }
            if (data[_0x50d1f3[_0x4c62('‫38', 'G&09')]] === 0x0) {
                $['nickName'] = data[_0x50d1f3[_0x4c62('‮39', 'LCaH')]] && data[_0x50d1f3['olepH']][_0x4c62('‮3a', 'gOYP')] || $[_0x4c62('‫3b', 'gOYP')];
            } else {
                $[_0x4c62('‫3c', '2VG2')] = $[_0x4c62('‫26', 'EzIg')];
            }
        }
    }
    if (_0x50d1f3[_0x4c62('‫3d', '#cVL')](shareList['length'], 0x0)) {
        if (_0x50d1f3[_0x4c62('‫3e', 'kI3^')]('ufIIA', _0x50d1f3[_0x4c62('‫3f', '#uUy')])) {
            console[_0x4c62('‮40', 'hP(e')]('任务：' + oneTask['assignmentName'] + _0x4c62('‫41', 'gZT1'));
        } else {
            return;
        }
    }
    let _0x2f4ff9 = [];
    for (let _0x44559b = 0x0; _0x50d1f3[_0x4c62('‮42', 'gOYP')](_0x44559b, cookiesArr[_0x4c62('‮43', ')Mrh')]); _0x44559b++) {
        if (_0x50d1f3[_0x4c62('‮44', '1PPE')](_0x50d1f3[_0x4c62('‮45', 'EzIg')], _0x50d1f3[_0x4c62('‫46', 'k9zK')])) {
            let _0x3b61e9 = cookiesArr[_0x44559b];
            let _0x7cdd5d = _0x50d1f3[_0x4c62('‫47', 'Nbk2')](decodeURIComponent, _0x3b61e9[_0x4c62('‫48', '&3$]')](/pt_pin=(.+?);/) && _0x3b61e9[_0x4c62('‫49', '#uUy')](/pt_pin=(.+?);/)[0x1]);
            for (let _0x1155c9 = 0x0; _0x50d1f3[_0x4c62('‫4a', 'CtI#')](_0x1155c9, shareList[_0x4c62('‫4b', 'bGBY')]); _0x1155c9++) {
                if (_0x50d1f3[_0x4c62('‮4c', 'U32)')] !== _0x4c62('‫4d', '1PPE')) {
                    if (shareList[_0x1155c9]['user'] === _0x7cdd5d) {
                        _0x2f4ff9[_0x4c62('‫4e', '#U0Z')](shareList[_0x1155c9]);
                        break;
                    }
                } else {
                    console['log'](_0x7cdd5d + _0x4c62('‮4f', 'QvO('));
                    return;
                }
            }
        } else {
            data = JSON['parse'](data);
            if (data && data['data'] && JSON['stringify'](data[_0x4c62('‮50', 'Ac#8')]) === '{}') {
                console['log'](JSON[_0x4c62('‮51', 'IYEt')](data));
            }
        }
    }
    console[_0x4c62('‮40', 'hP(e')](_0x4c62('‫52', 'HPoi'));
    for (let _0x44559b = 0x0; _0x50d1f3[_0x4c62('‫53', 'TRbL')](_0x44559b, cookiesArr['length']); _0x44559b++) {
        let _0x3b61e9 = cookiesArr[_0x44559b];
        let _0x7cdd5d = decodeURIComponent(_0x3b61e9[_0x4c62('‫54', 'h$fz')](/pt_pin=(.+?);/) && _0x3b61e9[_0x4c62('‫55', 'mST(')](/pt_pin=(.+?);/)[0x1]);
        let _0x4ce29d = !![];
        for (let _0x1155c9 = 0x0; _0x50d1f3[_0x4c62('‫56', 'EzIg')](_0x1155c9, _0x2f4ff9[_0x4c62('‫57', 'CtI#')]) && _0x4ce29d; _0x1155c9++) {
            let _0x383730 = _0x2f4ff9[_0x1155c9];
            if (_0x50d1f3[_0x4c62('‮58', 'YZTQ')](_0x383730[_0x4c62('‫59', 'G&09')], _0x7cdd5d) || _0x50d1f3['LmPit'](_0x383730[_0x4c62('‫5a', 'gOYP')], 0x0) || _0x383730['max']) {
                continue;
            }
            console[_0x4c62('‫5b', '1PPE')]('' + _0x7cdd5d + _0x4c62('‫5c', 'L6K@') + _0x383730[_0x4c62('‮5d', 'IYEt')]);
            let _0x224f8e = await _0x50d1f3[_0x4c62('‫5e', 'Q5$(')](takeRequest, _0x3b61e9, _0x50d1f3['SLRLZ'], _0x4c62('‮5f', 'r)na') + _0x383730[_0x4c62('‮60', 'gZT1')] + _0x4c62('‫61', 'L6K@') + _0x383730[_0x4c62('‮62', '2VG2')] + '","encryptAssignmentId":"' + _0x383730['encryptAssignmentId'] + _0x4c62('‮63', 'Iib4') + _0x383730['itemId'] + _0x4c62('‫64', '#cVL'));
            if (_0x50d1f3['LmPit'](_0x224f8e[_0x4c62('‫65', '#uUy')], '0')) {
                console['log'](_0x4c62('‫66', 'w)ZP'));
            } else if (_0x224f8e[_0x4c62('‮67', 'r)na')] === _0x50d1f3['jSTLY']) {
                if (_0x50d1f3[_0x4c62('‮68', '#uUy')](_0x50d1f3[_0x4c62('‫69', 'gP[t')], _0x50d1f3[_0x4c62('‮6a', '[*W6')])) {
                    console[_0x4c62('‫6b', 'PcjI')]('助力已满');
                    _0x383730['max'] = !![];
                } else {
                    _0x50d1f3['sQZHQ'](resolve);
                }
            } else if (_0x224f8e[_0x4c62('‮6c', 'IYEt')] === _0x50d1f3[_0x4c62('‫6d', 'PcjI')]) {
                console[_0x4c62('‫6e', '1ra3')](_0x4c62('‮6f', 'CtI#'));
                _0x4ce29d = ![];
            }
            console[_0x4c62('‮70', 'EzIg')](_0x4c62('‮71', 'k9zK') + JSON[_0x4c62('‮31', 'o(hE')](_0x224f8e));
            await $[_0x4c62('‫72', 'TRbL')](0x7d0);
        }
    }
})()['catch'](_0x307399 => {
    $['log']('', '❌ ' + $[_0x4c62('‫73', 'L6K@')] + _0x4c62('‮74', 'Ac#8') + _0x307399 + '!', '');
})[_0x4c62('‫75', ')iZQ')](() => {
    $[_0x4c62('‮76', 'N[KY')]();
});
async function main(_0x14f2ac) {
    var _0x2ef023 = {
        'brsst': function(_0x28180b, _0x38493d, _0x47cb70, _0x2f56a6) {
            return _0x28180b(_0x38493d, _0x47cb70, _0x2f56a6);
        },
        'erjqh': function(_0x26357a, _0x3a5390, _0xe3b632, _0x9206fb) {
            return _0x26357a(_0x3a5390, _0xe3b632, _0x9206fb);
        },
        'MOAwW': _0x4c62('‮77', '&3$]'),
        'KWwhp': function(_0x5d75d3, _0x49a43f) {
            return _0x5d75d3 === _0x49a43f;
        },
        'UFPvv': _0x4c62('‫78', 'LCaH'),
        'OhnAn': function(_0x3c0b42, _0x201d6b) {
            return _0x3c0b42 === _0x201d6b;
        },
        'erFIL': function(_0x56fb69, _0x4592fb, _0x3ffa62, _0x1d2bc6) {
            return _0x56fb69(_0x4592fb, _0x3ffa62, _0x1d2bc6);
        },
        'sZdYe': 'superBrandTaskLottery',
        'MHKLy': function(_0x1f0576, _0x855b35) {
            return _0x1f0576 === _0x855b35;
        },
        'VAvQd': _0x4c62('‫79', 'CtI#'),
        'XWKrl': function(_0x5f4dae, _0x26971c) {
            return _0x5f4dae < _0x26971c;
        },
        'weruf': function(_0x3c31fe, _0x56861c) {
            return _0x3c31fe === _0x56861c;
        },
        'kIgbP': 'XFrKq',
        'ZLOTT': function(_0x2278b9, _0x2772f1) {
            return _0x2278b9 === _0x2772f1;
        },
        'OhfTC': function(_0x46b8ba, _0x5086f0) {
            return _0x46b8ba !== _0x5086f0;
        },
        'uLINe': 'aoxCV',
        'oauTq': _0x4c62('‮7a', '#uUy'),
        'yWHIZ': function(_0x438a89, _0x1ef0ca) {
            return _0x438a89 === _0x1ef0ca;
        },
        'fXYFH': _0x4c62('‫7b', 'EzIg'),
        'NDoFW': function(_0x446e38, _0x27f907, _0x2609f9, _0x79e1) {
            return _0x446e38(_0x27f907, _0x2609f9, _0x79e1);
        },
        'fpcre': _0x4c62('‮7c', '*cXX'),
        'EEoYr': _0x4c62('‮7d', 'G&09'),
        'XOSsq': 'LgxlH',
        'bRaxh': function(_0x303d4f, _0x48b9aa) {
            return _0x303d4f === _0x48b9aa;
        },
        'EdkUL': function(_0x3fa15b, _0x4fa376) {
            return _0x3fa15b === _0x4fa376;
        },
        'MZeCB': 'lyUOW',
        'lTNlC': _0x4c62('‫7e', '[*W6'),
        'AgRzX': function(_0x2cf434, _0x42e9b8, _0x16c132, _0x4e678b) {
            return _0x2cf434(_0x42e9b8, _0x16c132, _0x4e678b);
        },
        'FkQEi': function(_0x5bf614, _0x516231) {
            return _0x5bf614 === _0x516231;
        },
        'IvQaa': function(_0x2daa4, _0x17937b) {
            return _0x2daa4 === _0x17937b;
        },
        'lUgsQ': '首页限时下拉',
        'BtxPS': _0x4c62('‮7f', '#uUy'),
        'xnHez': function(_0x1d7a81, _0x50361c) {
            return _0x1d7a81 !== _0x50361c;
        },
        'BzqFV': _0x4c62('‫80', 'Q5$('),
        'kBmuZ': function(_0x504b6b, _0x27c1ed) {
            return _0x504b6b === _0x27c1ed;
        },
        'AstmL': _0x4c62('‮81', 'U32)'),
        'BxibL': function(_0x54c369, _0x2de56c) {
            return _0x54c369 === _0x2de56c;
        },
        'toXqB': function(_0x2ec140, _0x4ad5dd) {
            return _0x2ec140 !== _0x4ad5dd;
        },
        'ArWfo': _0x4c62('‮82', 't9DO')
    };
    let _0xc6f9d4 = decodeURIComponent(_0x14f2ac['match'](/pt_pin=(.+?);/) && _0x14f2ac[_0x4c62('‮83', 'QvO(')](/pt_pin=(.+?);/)[0x1]);
    let _0x43a9de = await _0x2ef023['brsst'](takeRequest, _0x14f2ac, 'showSecondFloorCardInfo', '{"source":"card"}');
    if (JSON[_0x4c62('‮51', 'IYEt')](_0x43a9de) === '{}' || !_0x43a9de || !_0x43a9de[_0x4c62('‫84', 'NsjP')] || !_0x43a9de['result'][_0x4c62('‫85', '[*W6')]) {
        console[_0x4c62('‮86', 'N[KY')](_0xc6f9d4 + ',获取活动详情失败1');
        return;
    }
    let _0x215414 = _0x43a9de[_0x4c62('‫87', 'HPoi')]['activityBaseInfo'];
    let _0x23add7 = _0x215414[_0x4c62('‮88', 'NsjP')];
    let _0x5bf325 = await _0x2ef023['erjqh'](takeRequest, _0x14f2ac, _0x2ef023[_0x4c62('‫89', 'bl2w')], '{"source":"card","activityId":' + _0x23add7 + ',"assistInfoFlag":1}');
    if (_0x2ef023[_0x4c62('‮8a', 'gOYP')](JSON[_0x4c62('‫8b', 'kI3^')](_0x5bf325), '{}') || _0x2ef023[_0x4c62('‮8c', 'Iib4')](JSON[_0x4c62('‫8d', 'Nbk2')](_0x43a9de), '{}')) {
        console['log'](_0xc6f9d4 + ',获取活动详情失败2');
        return;
    }
    if (!_0x5bf325 || !_0x5bf325[_0x4c62('‫8e', 'G&09')] || !_0x5bf325[_0x4c62('‫8f', 'o(hE')][_0x4c62('‫90', 'mO$O')]) {
        if (_0x2ef023['KWwhp']('drKPI', _0x2ef023[_0x4c62('‫91', 'EzIg')])) {
            console[_0x4c62('‫92', 'G&09')](_0xc6f9d4 + _0x4c62('‫93', ')iZQ'));
            return;
        } else {
            console[_0x4c62('‫94', 't9DO')](_0x4c62('‮95', 'IYEt'));
        }
    }
    let _0x183c5a = _0x5bf325[_0x4c62('‮96', '2VG2')]['taskList'] || [];
    console[_0x4c62('‫97', 'jQMV')]('' + _0xc6f9d4 + _0x4c62('‮98', '7y99'));
    let _0x5add38 = _0x215414[_0x4c62('‮99', 'Q5$(')];
    let _0x34eeb3 = _0x43a9de['result'][_0x4c62('‮9a', 'oFrq')];
    if (_0x2ef023[_0x4c62('‫9b', 'bl2w')](_0x34eeb3['divideTimeStatus'], 0x1) && _0x2ef023[_0x4c62('‫9c', 'Ac#8')](_0x34eeb3[_0x4c62('‮9d', 't9DO')], 0x0) && _0x34eeb3[_0x4c62('‫9e', ')Mrh')] === 0x1) {
        console[_0x4c62('‮9f', 'Nbk2')](_0xc6f9d4 + ',去瓜分');
        let _0x2a25b6 = await _0x2ef023[_0x4c62('‮a0', 'HPoi')](takeRequest, _0x14f2ac, _0x2ef023[_0x4c62('‫a1', '&3$]')], _0x4c62('‫a2', 'k9zK') + _0x23add7 + _0x4c62('‫a3', 'mO$O') + _0x5add38 + _0x4c62('‮a4', 'G&09'));
        console[_0x4c62('‫a5', 'Sgcg')](_0x4c62('‮a6', 'HPoi') + JSON[_0x4c62('‫a7', 'U32)')](_0x2a25b6));
        return;
    } else if (_0x34eeb3[_0x4c62('‫a8', 'LCaH')] === 0x1 && _0x34eeb3[_0x4c62('‫a9', 'eDP4')] === 0x1 && _0x2ef023[_0x4c62('‮aa', 'YZTQ')](_0x34eeb3[_0x4c62('‫ab', 'gP[t')], 0x1)) {
        if (_0x2ef023['VAvQd'] === _0x2ef023[_0x4c62('‮ac', 'IYEt')]) {
            console[_0x4c62('‫ad', 'L6K@')](_0xc6f9d4 + _0x4c62('‮ae', 'Q5$('));
            return;
        } else {
            console['log'](err);
        }
    } else {
        console[_0x4c62('‫af', 'r)na')](_0xc6f9d4 + _0x4c62('‮b0', 'N[KY'));
    }
    await $[_0x4c62('‮b1', 'L6K@')](0x7d0);
    for (let _0x5813c8 = 0x0; _0x2ef023['XWKrl'](_0x5813c8, _0x183c5a['length']); _0x5813c8++) {
        if (_0x2ef023[_0x4c62('‮b2', 'h$fz')](_0x2ef023[_0x4c62('‮b3', 'mST(')], 'qDePl')) {
            console[_0x4c62('‫32', ')iZQ')]('助力次数已用完');
            canHelp = ![];
        } else {
            let _0x4a424c = _0x183c5a[_0x5813c8];
            if (_0x2ef023[_0x4c62('‮b4', '*cXX')](_0x4a424c[_0x4c62('‮b5', ')Mrh')], 0x2)) {
                if (_0x2ef023[_0x4c62('‫b6', 'o(hE')](_0x2ef023[_0x4c62('‮b7', 'L#0p')], _0x2ef023[_0x4c62('‫b8', ')iZQ')])) {
                    let _0x2ec90c = _0x4a424c['ext'][_0x4c62('‮b9', 'gZT1')] || '0';
                    for (let _0x5d0f56 = 0x0; _0x2ef023[_0x4c62('‮ba', 'mO$O')](_0x5d0f56, _0x2ec90c); _0x5d0f56++) {
                        console[_0x4c62('‮bb', 'bl2w')](_0x4c62('‫bc', 't9DO'));
                        let _0x9b8d5a = await takeRequest(_0x14f2ac, _0x4c62('‫bd', 'Ac#8'), _0x4c62('‫be', 'U32)') + _0x23add7 + _0x4c62('‮bf', 'oFrq') + _0x5add38 + '"}');
                        console['log']('结果：' + JSON[_0x4c62('‫c0', '#U0Z')](_0x9b8d5a));
                        await $[_0x4c62('‮c1', '&3$]')](0xbb8);
                    }
                } else {
                    console[_0x4c62('‫c2', 'L#0p')](JSON[_0x4c62('‫c3', 't9DO')](e));
                }
            }
            if (_0x4a424c['completionFlag']) {
                console['log']('任务：' + _0x4a424c[_0x4c62('‫c4', 'HPoi')] + ',已完成');
                continue;
            }
            if (_0x2ef023['yWHIZ'](_0x4a424c['assignmentType'], 0x1)) {
                if (_0x2ef023[_0x4c62('‫c5', 'oFrq')] !== _0x2ef023[_0x4c62('‮c6', 'gOYP')]) {
                    console[_0x4c62('‫c7', 'Q5$(')](_0x4c62('‫c8', 'jQMV') + _0x4a424c['assignmentName'] + _0x4c62('‫c9', 'mO$O'));
                } else {
                    console['log']('任务：' + _0x4a424c[_0x4c62('‮ca', 'k9zK')] + ',去执行,请稍稍');
                    let _0x3c7f29 = _0x4a424c[_0x4c62('‫cb', 'gOYP')][_0x4c62('‫cc', 'eDP4')][0x0][_0x4c62('‫cd', ')Mrh')] || '';
                    if (!_0x3c7f29) {
                        console[_0x4c62('‫ce', '&3$]')](_0x4c62('‫cf', 'IYEt') + _0x4a424c['assignmentName'] + _0x4c62('‫d0', 'YZTQ'));
                    }
                    let _0x2d2e7c = await _0x2ef023['NDoFW'](takeRequest, _0x14f2ac, _0x2ef023[_0x4c62('‮d1', 'oFrq')], _0x4c62('‮d2', 'IYEt') + _0x23add7 + _0x4c62('‫d3', '#U0Z') + _0x5add38 + _0x4c62('‮d4', 'TRbL') + _0x4a424c[_0x4c62('‮d5', '[*W6')] + '","assignmentType":' + _0x4a424c[_0x4c62('‫d6', 'Iib4')] + _0x4c62('‮d7', '#cVL') + _0x3c7f29 + _0x4c62('‫d8', '1PPE'));
                    console[_0x4c62('‫d9', 'mO$O')]('执行结果：' + JSON['stringify'](_0x2d2e7c));
                    await $[_0x4c62('‫da', 'gOYP')](0xbb8);
                }
            }
            if (_0x2ef023[_0x4c62('‮db', ')iZQ')](_0x4a424c[_0x4c62('‫dc', 'oFrq')], 0x3)) {
                if (_0x2ef023[_0x4c62('‫dd', 'EzIg')](_0x2ef023[_0x4c62('‫de', 'oFrq')], _0x2ef023[_0x4c62('‫df', 'eDP4')])) {
                    console[_0x4c62('‮e0', '#cVL')](_0x4c62('‮e1', 'L#0p') + _0x4a424c[_0x4c62('‫e2', 'kI3^')] + _0x4c62('‮e3', 'QvO('));
                    let _0x440f46 = _0x4a424c[_0x4c62('‮e4', 'r)na')][_0x4c62('‫e5', '#uUy')][0x0]['itemId'] || '';
                    if (!_0x440f46) {
                        console['log'](_0x4c62('‫e6', 'gP[t') + _0x4a424c['assignmentName'] + ',信息异常');
                    }
                    let _0x2d2e7c = await _0x2ef023[_0x4c62('‮e7', 'TRbL')](takeRequest, _0x14f2ac, _0x4c62('‮e8', ')iZQ'), _0x4c62('‮e9', 'kI3^') + _0x23add7 + ',"encryptProjectId":"' + _0x5add38 + '","encryptAssignmentId":"' + _0x4a424c[_0x4c62('‮ea', 'EzIg')] + _0x4c62('‮eb', 'L6K@') + _0x4a424c['assignmentType'] + ',"itemId":"' + _0x440f46 + _0x4c62('‫ec', ')Mrh'));
                    console['log'](_0x4c62('‫ed', 'gP[t') + JSON[_0x4c62('‫ee', 'TRbL')](_0x2d2e7c));
                    await $[_0x4c62('‮ef', 'Ac#8')](0xbb8);
                } else {
                    $[_0x4c62('‮f0', 'kI3^')]('', '❌ ' + $[_0x4c62('‮f1', 'Ac#8')] + ', 失败! 原因: ' + e + '!', '');
                }
            }
            if (_0x2ef023[_0x4c62('‮f2', 'IYEt')](_0x4a424c['assignmentType'], 0x7)) {
                if (_0x2ef023[_0x4c62('‫f3', 'kI3^')](_0x2ef023[_0x4c62('‫f4', '2VG2')], _0x2ef023[_0x4c62('‫f5', 'r)na')])) {
                    console[_0x4c62('‫a5', 'Sgcg')](JSON[_0x4c62('‫f6', 'N[KY')](data));
                } else {
                    console['log'](_0x4c62('‮f7', 'oFrq') + _0x4a424c['assignmentName'] + _0x4c62('‫f8', 'G&09'));
                    let _0x25a600 = _0x4a424c[_0x4c62('‮f9', 'oFrq')][_0x4c62('‫fa', 'EzIg')][0x0][_0x4c62('‮fb', 'L#0p')] || '';
                    if (!_0x25a600) {
                        console[_0x4c62('‫fc', '7y99')](_0x4c62('‫fd', 't9DO') + _0x4a424c['assignmentName'] + ',信息异常');
                    }
                    let _0x2d2e7c = await _0x2ef023[_0x4c62('‫fe', '1PPE')](takeRequest, _0x14f2ac, _0x2ef023[_0x4c62('‫ff', 'YZTQ')], _0x4c62('‫100', 'PcjI') + _0x23add7 + _0x4c62('‫101', 'jQMV') + _0x5add38 + '","encryptAssignmentId":"' + _0x4a424c[_0x4c62('‫102', 'Ac#8')] + '","assignmentType":' + _0x4a424c[_0x4c62('‫103', '[*W6')] + _0x4c62('‫104', '7y99') + _0x25a600 + '","actionType":0}');
                    console['log'](_0x4c62('‮105', '1PPE') + JSON[_0x4c62('‫106', 'NsjP')](_0x2d2e7c));
                    await $[_0x4c62('‫107', 'r)na')](0xbb8);
                }
            }
            if (_0x2ef023['FkQEi'](_0x4a424c['assignmentType'], 0x5)) {
                let _0x1e4481 = _0x4a424c[_0x4c62('‫108', 'L#0p')]['sign2'] || [];
                if (_0x2ef023[_0x4c62('‫109', '#cVL')](_0x1e4481[_0x4c62('‫10a', 'L#0p')], 0x0)) {
                    console[_0x4c62('‫d9', 'mO$O')](_0x4c62('‮10b', 'U32)') + _0x4a424c[_0x4c62('‮10c', '2VG2')] + ',信息异常');
                }
                if (_0x4a424c['assignmentName'] === _0x2ef023[_0x4c62('‮10d', 'hP(e')]) {
                    for (let _0x5d0f56 = 0x0; _0x2ef023[_0x4c62('‮10e', 'NsjP')](_0x5d0f56, _0x1e4481['length']); _0x5d0f56++) {
                        if (_0x2ef023[_0x4c62('‮10f', 'YZTQ')](_0x2ef023['BtxPS'], _0x4c62('‮110', 't9DO'))) {
                            if (_0x1e4481[_0x5d0f56][_0x4c62('‫111', 'YZTQ')] === 0x1) {
                                console[_0x4c62('‮112', 'o(hE')](_0x4c62('‮113', 'N[KY') + _0x4a424c[_0x4c62('‫114', 'gOYP')] + _0x4c62('‮115', 'TRbL'));
                                let _0x25a600 = _0x1e4481[_0x5d0f56][_0x4c62('‫116', '*cXX')];
                                let _0x2d2e7c = await takeRequest(_0x14f2ac, _0x2ef023['fpcre'], '{"source":"card","activityId":' + _0x23add7 + _0x4c62('‫117', 'QvO(') + _0x5add38 + '","encryptAssignmentId":"' + _0x4a424c[_0x4c62('‫118', 'bGBY')] + _0x4c62('‮119', 'Nbk2') + _0x4a424c['assignmentType'] + _0x4c62('‫11a', '[*W6') + _0x25a600 + _0x4c62('‮11b', 'mST('));
                                console[_0x4c62('‫11c', 'gOYP')]('执行结果：' + JSON[_0x4c62('‫ee', 'TRbL')](_0x2d2e7c));
                                await $[_0x4c62('‫11d', ')iZQ')](0xbb8);
                            }
                        } else {
                            let _0x25fedf = _0x4a424c[_0x4c62('‮11e', 'gP[t')][_0x4c62('‫11f', '1ra3')][_0x4c62('‫120', 'LCaH')] || '';
                            if (!_0x25fedf) {
                                console[_0x4c62('‮121', 'HPoi')](_0x4c62('‮122', ')iZQ') + _0x4a424c[_0x4c62('‮123', 'Iib4')] + _0x4c62('‫124', '#U0Z'));
                            }
                            shareList[_0x4c62('‫125', 'U32)')]({
                                'user': _0xc6f9d4,
                                'activityId': _0x23add7,
                                'encryptProjectId': _0x5add38,
                                'encryptAssignmentId': _0x4a424c[_0x4c62('‫126', 'LCaH')],
                                'itemId': _0x25fedf,
                                'max': ![]
                            });
                        }
                    }
                } else if (_0x2ef023[_0x4c62('‫127', 't9DO')](_0x4a424c['assignmentName'][_0x4c62('‫128', '1PPE')](_0x2ef023['BzqFV']), -0x1)) {
                    for (let _0x5d0f56 = 0x0; _0x2ef023[_0x4c62('‫129', 'bGBY')](_0x5d0f56, _0x1e4481['length']); _0x5d0f56++) {
                        if (_0x2ef023[_0x4c62('‮12a', '1ra3')](_0x1e4481[_0x5d0f56][_0x4c62('‫12b', 'hP(e')], 0x1)) {
                            console[_0x4c62('‮12c', ')Mrh')](_0x4c62('‮12d', 'TRbL') + _0x4a424c['assignmentName'] + _0x4c62('‫12e', 'hP(e'));
                            let _0x5e4237 = await takeRequest(_0x14f2ac, _0x2ef023['AstmL'], '{"source":"card"}');
                            let _0x5bc621 = _0x5e4237['result']['activityGameInfo'][_0x4c62('‫12f', '&3$]')]['secCode'];
                            let _0x4e6eb7 = _0x5e4237['result']['activityGameInfo'][_0x4c62('‮130', 'L#0p')][_0x4c62('‮131', '*cXX')];
                            await $['wait'](0xbb8);
                            let _0x2d2e7c = await takeRequest(_0x14f2ac, 'superBrandTaskLottery', _0x4c62('‮132', 'Nbk2') + _0x23add7 + _0x4c62('‮133', 'N[KY') + _0x5add38 + '","encryptAssignmentId":"' + _0x4e6eb7 + _0x4c62('‫134', '*cXX') + _0x5bc621 + '"}');
                            console['log']('执行结果：' + JSON['stringify'](_0x2d2e7c));
                            await $[_0x4c62('‫135', 'oFrq')](0xbb8);
                        }
                    }
                }
            }
            if (_0x2ef023[_0x4c62('‫136', 't9DO')](_0x4a424c[_0x4c62('‫d6', 'Iib4')], 0x2)) {
                if (_0x2ef023[_0x4c62('‮137', 'Sgcg')](_0x2ef023[_0x4c62('‫138', 'gZT1')], 'Kstzg')) {
                    $['done']();
                } else {
                    let _0x282818 = _0x4a424c['ext'][_0x4c62('‮139', 'QvO(')][_0x4c62('‫13a', 'h$fz')] || '';
                    if (!_0x282818) {
                        console[_0x4c62('‮40', 'hP(e')]('任务：' + _0x4a424c['assignmentName'] + _0x4c62('‫13b', 't9DO'));
                    }
                    shareList[_0x4c62('‫13c', 'h$fz')]({
                        'user': _0xc6f9d4,
                        'activityId': _0x23add7,
                        'encryptProjectId': _0x5add38,
                        'encryptAssignmentId': _0x4a424c[_0x4c62('‫13d', 'QvO(')],
                        'itemId': _0x282818,
                        'max': ![]
                    });
                }
            }
        }
    }
}
async function takeRequest(_0x419790, _0x5a318a, _0x10cedb) {
    var _0x59d548 = {
        'LfKYY': function(_0x17c5b5, _0xda62ec) {
            return _0x17c5b5 === _0xda62ec;
        },
        'EkyKt': _0x4c62('‫13e', 'eDP4'),
        'gjrym': _0x4c62('‮13f', 'w)ZP'),
        'cWGFY': function(_0x942a84, _0x3c1e12) {
            return _0x942a84 === _0x3c1e12;
        },
        'ROaPp': 'JEMZc',
        'SdRoe': function(_0x1692e8, _0x53a4c5) {
            return _0x1692e8(_0x53a4c5);
        },
        'AFaVY': function(_0x1edd30, _0x1889b8) {
            return _0x1edd30 !== _0x1889b8;
        },
        'SqFvT': _0x4c62('‮140', 'U32)'),
        'HDBDM': function(_0xf32a77, _0x3ebb81) {
            return _0xf32a77(_0x3ebb81);
        },
        'uCvsA': function(_0x356448, _0x304ab0) {
            return _0x356448(_0x304ab0);
        },
        'hdhLM': _0x4c62('‫141', 'w)ZP'),
        'rioFq': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    let _0x436779 = '';
    let _0x383bf2 = _0x4c62('‮142', 'TRbL') + _0x5a318a + _0x4c62('‮143', 'bGBY') + Date[_0x4c62('‮144', 'bGBY')]() + '&body=' + _0x59d548[_0x4c62('‮145', 'Ac#8')](encodeURIComponent, _0x10cedb);
    const _0xb17315 = {
        'Origin': _0x4c62('‮146', 'Nbk2'),
        'Cookie': _0x419790,
        'Connection': 'keep-alive',
        'Accept': _0x4c62('‫147', '2VG2'),
        'Referer': 'https://prodev.m.jd.com/mall/active/2XsicQEdY1CY4tLw96HmFCzn1MNn/index.html',
        'Host': _0x4c62('‫148', 'o(hE'),
        'user-agent': $[_0x4c62('‮149', 'TRbL')]() ? process['env'][_0x4c62('‮14a', 'gP[t')] ? process[_0x4c62('‮14b', 'EzIg')][_0x4c62('‫14c', '#cVL')] : _0x59d548[_0x4c62('‮14d', 'TRbL')](require, './USER_AGENTS')[_0x4c62('‫14e', 'LCaH')] : $[_0x4c62('‮14f', '1PPE')](_0x59d548[_0x4c62('‮150', 'N[KY')]) ? $[_0x4c62('‮151', 'oFrq')](_0x59d548['hdhLM']) : _0x59d548[_0x4c62('‫152', 'gP[t')],
        'Accept-Language': _0x4c62('‮153', 'mST('),
        'Accept-Encoding': _0x4c62('‮154', 'eDP4')
    };
    let _0x257f89 = {
        'url': _0x383bf2,
        'headers': _0xb17315,
        'body': _0x436779
    };
    return new Promise(async _0x3ed0bf => {
        if (_0x59d548['AFaVY'](_0x59d548['SqFvT'], _0x59d548['SqFvT'])) {
            console[_0x4c62('‫97', 'jQMV')]('任务：' + oneTask['assignmentName'] + _0x4c62('‫155', '1PPE'));
        } else {
            $[_0x4c62('‫156', '1ra3')](_0x257f89, (_0x4748bf, _0x21a504, _0x340c8a) => {
                if (_0x59d548[_0x4c62('‫157', 'Sgcg')](_0x59d548['EkyKt'], _0x59d548[_0x4c62('‫158', 'jQMV')])) {
                    console[_0x4c62('‮12c', ')Mrh')](_0x4c62('‫159', 'o(hE') + oneTask[_0x4c62('‫114', 'gOYP')] + _0x4c62('‫15a', 'o(hE'));
                } else {
                    try {
                        if (_0x4748bf) {
                            console[_0x4c62('‮bb', 'bl2w')](_0x4748bf);
                        } else {
                            _0x340c8a = JSON[_0x4c62('‮15b', 'G&09')](_0x340c8a);
                            if (_0x340c8a && _0x340c8a[_0x4c62('‫15c', 'jQMV')] && _0x59d548[_0x4c62('‫15d', 'TRbL')](JSON[_0x4c62('‮15e', 'L6K@')](_0x340c8a[_0x4c62('‫15f', 'h$fz')]), '{}')) {
                                if (_0x59d548[_0x4c62('‮160', 'IYEt')](_0x4c62('‫161', 'G&09'), _0x59d548['ROaPp'])) {
                                    console[_0x4c62('‮162', '2VG2')](JSON['stringify'](_0x340c8a));
                                } else {
                                    console['log'](userName + _0x4c62('‮163', '&3$]'));
                                    return;
                                }
                            }
                        }
                    } catch (_0xd9c1ae) {
                        console['log'](_0x340c8a);
                    } finally {
                        _0x59d548[_0x4c62('‮164', 'gZT1')](_0x3ed0bf, _0x340c8a['data'] || {});
                    }
                }
            });
        }
    });
}

function TotalBean() {
    var _0x31379b = {
        'DYWjS': _0x4c62('‮165', 'U32)'),
        'hRxsp': 'ZCWrs',
        'jBxyT': 'base',
        'gnJVV': function(_0xeea359, _0x24c9c6) {
            return _0xeea359 === _0x24c9c6;
        },
        'roKOk': _0x4c62('‫166', 'mST('),
        'nVzdV': function(_0x1d6a27, _0x14f851) {
            return _0x1d6a27 === _0x14f851;
        },
        'SePgS': 'application/json,text/plain, */*',
        'aeouv': _0x4c62('‮167', 'Nbk2'),
        'riywK': _0x4c62('‮168', 'NsjP'),
        'hNXeN': function(_0x32e987, _0x3a2151) {
            return _0x32e987(_0x3a2151);
        },
        'NhbvR': _0x4c62('‫169', 'NsjP'),
        'tvOdE': _0x4c62('‮16a', 'oFrq')
    };
    return new Promise(async _0x5b42bb => {
        var _0x481b1b = {
            'cMrzJ': function(_0x36405d, _0x2173e9) {
                return _0x36405d === _0x2173e9;
            },
            'ABDXd': _0x31379b['DYWjS'],
            'lZwfb': _0x31379b[_0x4c62('‮16b', 'CtI#')],
            'ELznW': _0x31379b[_0x4c62('‫16c', 'NsjP')],
            'JYAeF': function(_0x5ba3a7, _0xbd0982) {
                return _0x31379b[_0x4c62('‫16d', 'bGBY')](_0x5ba3a7, _0xbd0982);
            },
            'rjWqa': _0x31379b['roKOk'],
            'iiGSa': function(_0x300692, _0x34234b) {
                return _0x31379b[_0x4c62('‮16e', 'CtI#')](_0x300692, _0x34234b);
            },
            'cwfZn': 'vaDMq'
        };
        if (_0x4c62('‫16f', 'kI3^') === 'uCZjb') {
            const _0x4de18f = {
                'url': 'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2',
                'headers': {
                    'Accept': _0x31379b['SePgS'],
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': _0x31379b['aeouv'],
                    'Connection': 'keep-alive',
                    'Cookie': $[_0x4c62('‫170', 'bGBY')],
                    'Referer': _0x31379b['riywK'],
                    'User-Agent': $[_0x4c62('‮171', '*cXX')]() ? process[_0x4c62('‮14b', 'EzIg')][_0x4c62('‫172', 'w)ZP')] ? process[_0x4c62('‮173', '[*W6')]['JD_USER_AGENT'] : _0x31379b[_0x4c62('‫174', ')iZQ')](require, _0x31379b[_0x4c62('‫175', 'TRbL')])[_0x4c62('‮176', 'h$fz')] : $[_0x4c62('‮14f', '1PPE')](_0x31379b[_0x4c62('‮177', '[*W6')]) ? $[_0x4c62('‫178', 'PcjI')](_0x4c62('‫179', 'h$fz')) : _0x4c62('‮17a', 'U32)')
                }
            };
            $['post'](_0x4de18f, (_0x43af7c, _0x4afeb2, _0x557f34) => {
                var _0x12342f = {
                    'FXRLB': function(_0x3eb25d, _0x39b915) {
                        return _0x481b1b['cMrzJ'](_0x3eb25d, _0x39b915);
                    }
                };
                try {
                    if (_0x43af7c) {
                        console[_0x4c62('‮f0', 'kI3^')]('' + JSON['stringify'](_0x43af7c));
                        console[_0x4c62('‫a5', 'Sgcg')]($[_0x4c62('‫17b', 'TRbL')] + _0x4c62('‫17c', 'jQMV'));
                    } else {
                        if (_0x557f34) {
                            _0x557f34 = JSON[_0x4c62('‫17d', 'NsjP')](_0x557f34);
                            if (_0x557f34[_0x481b1b['ABDXd']] === 0xd) {
                                $[_0x4c62('‫17e', 'IYEt')] = ![];
                                return;
                            }
                            if (_0x557f34[_0x481b1b[_0x4c62('‫17f', ')Mrh')]] === 0x0) {
                                if (_0x4c62('‮180', 'bGBY') !== _0x481b1b[_0x4c62('‮181', 'bl2w')]) {
                                    $[_0x4c62('‫182', 'G&09')] = _0x557f34[_0x481b1b[_0x4c62('‮183', 'EzIg')]] && _0x557f34[_0x481b1b[_0x4c62('‮184', 'eDP4')]][_0x4c62('‫185', 'w)ZP')] || $[_0x4c62('‮186', 'LCaH')];
                                } else {
                                    if (_0x43af7c) {
                                        console['log'](_0x43af7c);
                                    } else {
                                        _0x557f34 = JSON[_0x4c62('‫187', 'Nbk2')](_0x557f34);
                                        if (_0x557f34 && _0x557f34[_0x4c62('‫15f', 'h$fz')] && _0x12342f[_0x4c62('‮188', 'mO$O')](JSON[_0x4c62('‫189', 'L#0p')](_0x557f34[_0x4c62('‫18a', 'bl2w')]), '{}')) {
                                            console['log'](JSON[_0x4c62('‫18b', '1ra3')](_0x557f34));
                                        }
                                    }
                                }
                            } else {
                                if (_0x481b1b[_0x4c62('‫18c', 'eDP4')](_0x481b1b[_0x4c62('‫18d', 'bGBY')], _0x481b1b['rjWqa'])) {
                                    $['nickName'] = $[_0x4c62('‫18e', 'Nbk2')];
                                } else {
                                    $[_0x4c62('‫18f', '#U0Z')] = ![];
                                    return;
                                }
                            }
                        } else {
                            console[_0x4c62('‮190', 'LCaH')]('京东服务器返回空数据');
                        }
                    }
                } catch (_0x4c8801) {
                    $[_0x4c62('‮191', 'kI3^')](_0x4c8801, _0x4afeb2);
                } finally {
                    if (_0x481b1b[_0x4c62('‫192', '#uUy')]('ehysa', _0x481b1b[_0x4c62('‮193', '#uUy')])) {
                        console[_0x4c62('‮70', 'EzIg')](userName + _0x4c62('‮194', 'Nbk2'));
                    } else {
                        _0x5b42bb();
                    }
                }
            });
        } else {
            console[_0x4c62('‫ad', 'L6K@')](_0x4c62('‮195', 'r)na'));
        }
    });
};
_0xodS = 'jsjiami.com.v6';
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
