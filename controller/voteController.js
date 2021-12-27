
const vote_index = (req,res) => {

    res.render('surveys',{});
};

const vote_id = (req,res) => {
    res.render('polling');
}

module.exports = {
    vote_index,
    vote_id
}