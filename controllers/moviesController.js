const db = require("../data/db");

function index(req,res){
    const sqlQuery = 'SELECT * FROM movies';
    db.query(sqlQuery)
            .then(results=>{
                return res.status(200).json(results[0]);
            })
            .catch(error=>{
                return res.status(500).json({  error:"Database connection error",
                                        message:"Errore nella query"
                                    })
            })
}

function show(req,res){
    const id = Number(req.params.id);
    const sqlMovies = 'SELECT * FROM movies WHERE id = ?';
    const sqlReviews = 'SELECT * FROM reviews WHERE movie_id = ?';
    db.query(sqlMovies,[id])
            .then(movies=>{
                const rows = movies[0];
                if (rows.length === 0)
                    {return res.status(404).json({error:"Not found",message:"Film non trovato"})}
                const movie = rows[0];
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

module.exports = {index,show};