function error(err,req,res,next){
    res.status(500).json({
        error:"Server Error",
        message:"L'applicazione si è spaccata male"
    });
}

module.exports = error;