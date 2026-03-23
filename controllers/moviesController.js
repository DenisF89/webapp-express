const db = require("../data/db");

function index(req,res){
    const sqlQuery = `SELECT * FROM movies`;
    db.query(sqlQuery)
            .then(([movies])=>{ //destructuring: results[values,fields] => [movies]=results[0]
                return res.status(200).json(movies);
            })
            .catch(error=>{
                return res.status(500).json({  error:"Database connection error",
                                        message:"Errore nella query"
                                    })
            })
}

function show(req,res){
    const id = Number(req.params.id);
    const sqlMovies = `SELECT * FROM movies WHERE id = ?`;
    const sqlReviews = `SELECT * FROM reviews WHERE movie_id = ?`;
    db.query(sqlMovies,[id])
            .then(([movies])=>{
                //const rows = movies[0];
                if (movies.length === 0)
                    {return res.status(404).json({error:"Not found",message:"Film non trovato"})}
                const movie = movies[0];
                return db.query(sqlReviews,[id])
                    .then(reviews=>{
                        movie.reviews = reviews[0];
                        return res.status(200).json(movie);
                    })
            })
            .catch(error=>{
                return res.status(500).json({
                    error:"Database connection error",
                    message:"Errore nella query"
                })
            })

}

function destroy(req,res){
    const id = Number(req.params.id);
    const sqlQuery =`DELETE from movies WHERE movies.id = ?`;
    db.query(sqlQuery,[id])
        .then(([result])=>{ 
            if (result.affectedRows === 0)
                {return res.status(404).json({error:"Not found",message:"Film da eliminare non trovato"});}
            return res.sendStatus(204);
        }).catch(error=>{
            return res.status(500).json({error: "Database internal Error", message:"Nessun film eliminato"}); 
        });
}

module.exports = {index,show,destroy};