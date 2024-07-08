const data = new Date()
const h = data.getHours();
const m = data.getMinutes();
const s = data.getSeconds();

const r = [h, m, s].join(':')
var msg = '';

if (h >= 0 && h < 6) {
    msg = 'Boa Madrugada';
}else if(h >= 6 && h < 12){
    msg = 'Bom dia';
}else if(h >= 12 && h < 18){
    msg = 'Boa Tarde';
}else if(h >= 18 && h <= 23){
    msg = 'Boa Noite';
}

  console.log(msg);