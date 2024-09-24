// USER INFO //////////////////////////////////////////////
const playerName = document.querySelector('.player__name');
const playerUserId = document.querySelector('.player__userId');
const noMobileElement = document.querySelector('.noMobile');
// const referralURL = document.querySelector('#ref_link');
// const inviteCount = document.querySelector("#invite_count");
const shareBtn = document.querySelector('#shareRefLink');
// const copyBtn = document.querySelector('#copyLink')

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

  let url_tier="";
  //assign user data
  const user = TELEGRAM.initDataUnsafe.user;
  if (user) {
    playerName.textContent = `${user.first_name}`;
    playerUserId.textContent = `${user.id}`;
    url_tier= user.id;
  } else {
    playerName.textContent = `No user`;
    playerUserId.textContent = `No ID`;
  }

  //referral
  let ref_link = `${botLink+url_tier}`;
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