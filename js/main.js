// USER INFO //////////////////////////////////////////////
const playerName = document.querySelector('.player__name');
const playerUserId = document.querySelector('.player__userId');
const noMobileElement = document.querySelector('.noMobile');
const referralURL = document.querySelector('#ref_link');
const inviteCount = document.querySelector("#invite_count");
const botLink = "https://t.me/ILCOIN_Earn_bot/ilcoin?startapp=";

if (window.Telegram && window.Telegram.WebApp) {
  const TELEGRAM = window.Telegram.WebApp;
  console.log(TELEGRAM.initData.start_param);
  TELEGRAM.ready();
  TELEGRAM.disableVerticalSwipes();
  TELEGRAM.enableClosingConfirmation();
  TELEGRAM.setHeaderColor('#3176b5');
  TELEGRAM.expand();

  //only mobile
  switch (TELEGRAM.platform){ 
    case "android": 
    case "ios": noMobileElement.style.display = "none"; 
    break; 
    case"weba": 
    case "unknown": noMobileElement.style.display = "none"; //FLEX OLACAK 
    break; 
    default: noMobileElement.style.display = "flex"; 
    break; 
  }

  //assign user data
  const user = TELEGRAM.initDataUnsafe.user;
  if(user) {
    playerName.textContent = `user: ${user.first_name}`;
    playerUserId.textContent = `id: ${user.id}`;
    referralURL.textContent = `Your referral URL: ${botLink+user.id}`;
    inviteCount.textContent = `0`;
  }else {
    playerName.textContent = `user: No user`;
    playerUserId.textContent = `id: No ID`;
    referralURL.textContent = `No user`;
    inviteCount.textContent = `0`;
  }

} else {
  console.log('Telegram WebApp is not available.');
}
////////////////////////////////////////////////////////////


let acc = document.querySelectorAll(".accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = document.querySelector(".panel");
    if (panel.style.display === "flex") {
      panel.style.display = "none";
      document.querySelector(".card").style.borderBottomLeftRadius = "8px";
      document.querySelector(".card").style.borderBottomRightRadius = "8px";
      document.querySelector(".card").style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.5)";
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

}

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
    console.log('error', 'No ads any more for today!');
    return;
  }
  watchAddBtn.textContent = `...`
  await AdController.show()
    .then((result) => {
      console.log(`${adsgramReward} coin added`);
      adData.count += 1;
      watchAddBtn.textContent = "Watch"
      setAdData(adData);
      updateWatchCount();
    })
    .catch((result) => {
      console.log('error', 'No ads available!');
      watchAddBtn.textContent = "Watch"
    });
});
////////////////////////////////////////////////////////////


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