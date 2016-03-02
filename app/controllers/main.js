'use strict';

function showPage(page,data){
  return (req,res)=>{
    res.locals.historyData = req.session.historyData || {};
    res.render(page,Object.assign({currentUser:req.user},data));
    delete req.session.historyData;
  };
}


module.exports.showPage = showPage;
