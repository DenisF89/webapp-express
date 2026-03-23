function notFound(req,res){
    res.status(404).json({
        error:"Not found",
        message:"Risorsa non trovata"
    });
}

module.exports = notFound;