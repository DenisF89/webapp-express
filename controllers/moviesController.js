const db = require("../data/db");

function index(req,res){

    const {search} = req.query;

    const columns = ['title','director','genre','release_year'];
           

    let sqlQuery = `SELECT * FROM movies`;
    let values = [];
    
    if (search && search.trim() !== ""){
        const likeSearch = `%${search}%`
        const conditions =  columns.map(col => `movies.${col} LIKE ?`) 
                               .join(' OR ');   
        sqlQuery += ` WHERE ${conditions}`;
        values = columns.map(()=>likeSearch)
    }

    db.query(sqlQuery, values)
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
    const sqlMovies =  `SELECT movies.*, ROUND(AVG(reviews.vote),2) AS average_vote
                        FROM movies
                        LEFT JOIN reviews ON reviews.movie_id = movies.id
                        WHERE movies.id = ?
                        GROUP BY movies.id`;
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
    const sqlQuery =`DELETE from reviews WHERE review.id = ?`;
    db.query(sqlQuery,[id])
        .then(([result])=>{ 
            if (result.affectedRows === 0)
                {return res.status(404).json({error:"Not found",message:"Recensione non trovata"});}
            return res.sendStatus(204);
        }).catch(error=>{
            return res.status(500).json({error: "Database internal Error", message:"Errore nella cancellazione"}); 
        });
}

function store(req,res){
    const id= Number(req.params.id);
    const { name, vote, text } = req.body;
    const sqlQuery = `INSERT INTO reviews 
                        (movie_id,name,vote,text)
                        VALUES (?,?,?,?)`;
    db.query(sqlQuery,[id,name,vote,text])
        .then(([newReview])=>{
            return res.status(201).json({message: "Recensione creata", id: newReview.insertId});
        })
        .catch(error=>{
            return res.status(500).json({error:"Internal System Error", message:"Errore nel salvataggio del nuovo commento"});
        })              
}


module.exports = {index,show,destroy,store};