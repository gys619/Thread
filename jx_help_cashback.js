!(async () => {
        let filename = process.mainModule.filename.match(/(\w+).js/)[1]
        let dirname = process.mainModule.path
        let type = filename.split('_')[0]
        if (['js', 'jx', 'jr', 'jw'].includes(type)) {
            type = 'jd'
        }
        let main = require(`${dirname}/parse/${type}/${filename}`)
        let a = new main()
        await a.init({})
    }
)().catch((e) => {
    console.log(e.message)
})
