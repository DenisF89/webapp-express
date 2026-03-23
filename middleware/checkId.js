function checkId(req, res, next) {

//RECUPERO ID E CONTROLLO CHE SIA NUMERICO
   const id = Number(req.params.id); 
   if (isNaN(id)){
        return res.status(400).json({   error:"Invalid request",
                                        message:"Errore: l'id deve essere numerico"
                                    })
    } 
    next();
};

module.exports = checkId;


