var tanggal = "25";
var bulan = "9";
var tahun = "2001";

let lahir = tahun.concat('-',bulan,'-',tanggal)
var bln
switch (new Date(lahir).getMonth()){
    case 0:
        bln = "Januari"
    break;
    case 1:
        bln = "Februari"
    break;
    case 2:
        bln = "Maret"
    break;
    case 3:
        bln = "April"
    break;
    case 4:
        bln = "Mei"
    break;
    case 5:
        bln = "Juni"
    break;
    case 6:
        bln = "Juli"
    break;
    case 7:
        bln = "Agustus"
    break;
    case 8:
        bln = "September"
    break;
    case 9:
        bln = "Oktober"
    break;
    case 10:
        bln = "November"
    break;
    default :
        bln = "Desember"
}

tgllahir = `${tanggal}-${bln}-${tahun}`
console.log("Tanggal Lahir, " + tgllahir)

