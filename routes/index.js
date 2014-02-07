/*
 * GET home page.
 */

exports.index = function (req, res) {
    var user = req.session.user;

    res.render('index', { title: 'ShirtThophy', isNoHeader: true, isNoFooter: true , user: user});
};