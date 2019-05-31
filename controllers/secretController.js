exports.indexPage = async (req, res) => {
    res.render('secret', {
        title: 'See the Secret!!'
    });
};