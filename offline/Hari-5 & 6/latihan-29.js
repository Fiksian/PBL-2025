var dataFilm = []

function tambahDataFilm(namaFilm, durasiFilm, genreFilm, tahunRilis){
    var film = {
    nama : namaFilm,
    durasi : durasiFilm,
    genre : genreFilm,
    tahun : tahunRilis
    }
    dataFilm.push(film)
}


tambahDataFilm("LOTR", "2 jam", "action", "1999")
tambahDataFilm("avenger", "2 jam", "action", "2019")
tambahDataFilm("spiderman", "2 jam", "action", "2004")
tambahDataFilm("juon", "2 jam", "horror", "2004")


console.log(dataFilm)