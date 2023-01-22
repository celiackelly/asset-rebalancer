const homeController = {
    getIndex: (req, res) => {
        res.render('index.ejs', { title: 'Asset Rebalancer' })
    }
}

export default homeController 