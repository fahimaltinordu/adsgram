// USER INFO //////////////////////////////////////////////
const playerName = document.querySelector('.player__name');
const playerUserId = document.querySelector('.player__userId');
const noMobileElement = document.querySelector('.noMobile');
// const referralURL = document.querySelector('#ref_link');
// const inviteCount = document.querySelector("#invite_count");
const shareBtn = document.querySelector('#shareRefLink');
// const copyBtn = document.querySelector('#copyLink')

const botLink = "https://t.me/ILCOIN_Earn_bot/ilcoin?startapp=";


function showToast(icon, title) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    icon: icon,
    title: title,
  });
}

if (window.Telegram && window.Telegram.WebApp) {
  const TELEGRAM = window.Telegram.WebApp;
  console.log(TELEGRAM.initData.start_param);
  TELEGRAM.ready();
  TELEGRAM.disableVerticalSwipes();
  TELEGRAM.enableClosingConfirmation();
  TELEGRAM.setHeaderColor('#000000');
  TELEGRAM.expand();

  //only mobile
  switch (TELEGRAM.platform) {
    case "android":
    case "ios": noMobileElement.style.display = "none";
      break;
    case "weba":
    case "unknown": noMobileElement.style.display = "none"; //FLEX OLACAK 
      break;
    default: noMobileElement.style.display = "flex";
      break;
  }

  let url_tier = "";
  //assign user data
  const user = TELEGRAM.initDataUnsafe.user;
  if (user) {
    playerName.textContent = `${user.first_name}`;
    playerUserId.textContent = `${user.id}`;
    url_tier = user.id;
  } else {
    playerName.textContent = `No user`;
    playerUserId.textContent = `No ID`;
  }

  //referral
  let ref_link = `${botLink + url_tier}`;
  console.log(ref_link);
  shareBtn.addEventListener('click', async () => {
    const link = `https://t.me/share/url?url=${encodeURIComponent('join, invite and earn more 🪙')}&text=${encodeURIComponent(ref_link)}`;
    await TELEGRAM.openTelegramLink(link);
  });

  // copyBtn.addEventListener('click', async () => {
  //   await navigator.clipboard.writeText(ref_link);
  //   console.log(`copied successfully, URL: ${ref_link}`)
  // });

} else {
  console.log('Telegram WebApp is not available.');
}
////////////////////////////////////////////////////////////


let acc = document.querySelector(".accordion");
let acc2 = document.querySelector(".accordion2");

acc.addEventListener("click", function () {
  this.classList.toggle("active");
  let panel = document.querySelector(".panel");
  if (panel.style.display === "flex") {
    panel.style.display = "none";
    document.querySelector(".card").style.borderBottomLeftRadius = "8px";
    document.querySelector(".card").style.borderBottomRightRadius = "8px";
    document.querySelector(".card").style.boxShadow = "0px 1px 6px rgba(95, 243, 208, 0.5)";
    document.querySelector(".panel").style.borderBottomLeftRadius = "0";
    document.querySelector(".panel").style.borderBottomRightRadius = "0";
  } else {
    panel.style.display = "flex";
    document.querySelector(".card").style.borderBottomLeftRadius = "0";
    document.querySelector(".card").style.borderBottomRightRadius = "0";
    document.querySelector(".card").style.boxShadow = "none";
    document.querySelector(".panel").style.borderBottomLeftRadius = "8px";
    document.querySelector(".panel").style.borderBottomRightRadius = "8px";
  }
});

acc2.addEventListener("click", function () {
  this.classList.toggle("active");
  let panel2 = document.querySelector(".panel2");
  if (panel2.style.display === "flex") {
    panel2.style.display = "none";
    document.querySelector(".card2").style.borderBottomLeftRadius = "8px";
    document.querySelector(".card2").style.borderBottomRightRadius = "8px";
    document.querySelector(".card2").style.boxShadow = "0px 1px 6px rgba(95, 243, 208, 0.5)";
    document.querySelector(".panel2").style.borderBottomLeftRadius = "0";
    document.querySelector(".panel2").style.borderBottomRightRadius = "0";
  } else {
    panel2.style.display = "flex";
    document.querySelector(".card2").style.borderBottomLeftRadius = "0";
    document.querySelector(".card2").style.borderBottomRightRadius = "0";
    document.querySelector(".card2").style.boxShadow = "none";
    document.querySelector(".panel2").style.borderBottomLeftRadius = "8px";
    document.querySelector(".panel2").style.borderBottomRightRadius = "8px";
  }
});


//ADSGRAM INTEGRATION ///////////////////////////////////////////////
const adsgram_blockId = '3260';
const adsgramReward = 200;

const AdController = window.Adsgram.init({ blockId: adsgram_blockId });

document.addEventListener('DOMContentLoaded', () => {
  updateWatchCount();
});

const watchAddBtn = document.querySelector('#watchAddBtn');
const $watchCount = document
  .querySelector('.earn__item__watch-count')
  .querySelector('span');
const maxAdsPerDay = 20;
const currentDate = new Date().toISOString().slice(0, 10);

function updateWatchCount() {
  const adData = getAdData();
  const watchCount = adData.count;
  $watchCount.textContent = watchCount;
}

function getAdData() {
  const adData = JSON.parse(localStorage.getItem('adData')) || {
    count: 0,
    date: currentDate,
  };
  return adData;
}

function setAdData(adData) {
  localStorage.setItem('adData', JSON.stringify(adData));
}

watchAddBtn.addEventListener('click', async () => {
  let adData = getAdData();

  if (adData.date !== currentDate) {
    adData = { count: 0, date: currentDate };
  }

  if (adData.count >= maxAdsPerDay) {
    showToast('error', 'No ads any more for today!');
    console.log('error', 'No ads any more for today!');
    return;
  }
  watchAddBtn.innerHTML = `<img src="./img/promiseGif.gif" alt="">`;
  await AdController.show()
    .then((result) => {
      showToast('success', `${adsgramReward} coin added`);
      adData.count += 1;
      //disable and countdown
      setTimeout (function(){
        watchAddBtn.disabled = null;
      },3000);

      var countdownNum = 30;
      incTimer();

      function incTimer(){
        watchAddBtn.disabled = true;
        setTimeout (function(){
          if(countdownNum != 0){
          countdownNum--;
          watchAddBtn.innerHTML = `00:${(countdownNum>=10)? countdownNum : `${"0"+countdownNum}`}`;
          incTimer();
          } else {
            watchAddBtn.innerHTML = `<span>Watch</span> <img src="./img/see.png" alt="">`;
            watchAddBtn.disabled = false;
          }
        },1000);
      };

      setAdData(adData);
      updateWatchCount();
    })
    .catch((result) => {
      showToast('error', result.description);
      watchAddBtn.innerHTML = `<span>Watch</span> <img src="./img/see.png" alt="">`;

    });
    
});
////////////////////////////////////////////////////////////

//WHEEL
const wheel_back_btn = document.querySelector("#wheel_back_btn");
const open_Wheel_btn = document.querySelector("#open_Wheel_btn");
wheel_back_btn.addEventListener("click", ()=> {
  const wheel_cont = document.querySelector(".wheel_cont");
  wheel_cont.style.display="none";
});
open_Wheel_btn.addEventListener("click", ()=> {
  const wheel_cont = document.querySelector(".wheel_cont");
  wheel_cont.style.display="flex";
});

const sectors = [
  { color: "#f82", label: "Stack" },
  { color: "#0bf", label: "Stack" },
  { color: "#fb0", label: "1 ILC" },
  { color: "#0fb", label: "Stack" },
  { color: "#b0f", label: "0.1 ILC" },
  { color: "#f0b", label: "1 ticket" },
  { color: "#bf0", label: "0.2 ILC" },
];
const rand = (m, M) => Math.random() * (M - m) + m;
const EL_spin = document.querySelector("#spin");
const tot = sectors.length;
const dia = 350;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
console.log("TAU", TAU);
const arc = TAU / sectors.length;
console.log("arc", arc);
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
canvas.width = dia;
canvas.height = dia;

const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0; // Angular velocity
let ang = 0; // Angle in radians
const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;
function drawSector(sector, i) {
  const ang = arc * i;
  ctx.save();
  // COLOR
  ctx.beginPath();
  ctx.fillStyle = sector.color;
  ctx.moveTo(rad, rad);
  ctx.arc(rad, rad, rad, ang, ang + arc);
  ctx.lineTo(rad, rad);
  ctx.fill();
  // TEXT
  ctx.translate(rad, rad);
  ctx.rotate(ang + arc / 2);
  ctx.textAlign = "right";
  ctx.fillStyle = "#fff";
  ctx.font = "bold 30px sans-serif";
  ctx.fillText(sector.label, rad - 10, 10);
  //
  ctx.restore();
}
function rotate() {
  const sector = sectors[getIndex()];
  console.log(angVel);
  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
  EL_spin.textContent = !angVel ? "SPIN" : sector.label;
  EL_spin.style.background = sector.color;
  console.log(`RESULT : ${sector.label}`);
}
function frame() {
  if (!angVel) return;
  angVel *= friction; // Decrement velocity by friction
  if (angVel < 0.002) angVel = 0; // Bring to stop
  ang += angVel; // Update angle
  ang %= TAU; // Normalize angle
  rotate();
}
function engine() {
  frame();
  requestAnimationFrame(engine);
}
// INIT
sectors.forEach(drawSector);
rotate(); // Initial rotation
engine(); // Start engine
EL_spin.addEventListener("click", () => {
  if (!angVel) angVel = rand(0.25, 0.35);
});



// if(TELEGRAM.platform === "android") {
//   document.querySelector(".noMobile").style.display = "none";
// }else if(TELEGRAM.platform === "ios") {
//   document.querySelector(".noMobile").style.display = "none";
// }else if(TELEGRAM.platform === "weba") {
//   document.querySelector(".noMobile").style.display = "flex";
// }else if(TELEGRAM.platform === "unknown") { //normal browser
//   document.querySelector(".noMobile").style.display = "none";
// }else {
//   document.querySelector(".noMobile").style.display = "flex";
// }