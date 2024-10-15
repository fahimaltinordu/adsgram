// USER INFO //////////////////////////////////////////////
const playerName = document.querySelector('.player__name');
const playerUserId = document.querySelector('.player__userId');
const noMobileElement = document.querySelector('.noMobile');
const adsenseBtn = document.querySelector("#adsenseBtn");
const adTimer = document.querySelector('#adTimer');
// const referralURL = document.querySelector('#ref_link');
// const inviteCount = document.querySelector("#invite_count");
const shareBtn = document.querySelector('#shareRefLink');
const invited_by_dom = document.querySelector('#invited_by');
const mineTabButtons = document.querySelectorAll('.mine-tab__btn');
// const copyBtn = document.querySelector('#copyLink')

const botLink = "https://t.me/ILCOIN_Earn_bot/ilcoin?startapp=";


//CATEGORIES
const tab1 = "Home";
const tab2 = "Missions";
const tab3 = "Games";

function renderTab1() {
  document.querySelector(".farming").style.display="flex";
  document.querySelector(".cards2").style.display="none";
  document.querySelector(".missionsCont").style.display="none";
  document.querySelector(".cards").style.display="none";
  document.querySelector(".cards3").style.display="none";
}
function renderTab2() {
  document.querySelector(".missionsCont").style.display="flex";
  document.querySelector(".cards").style.display="flex";
  document.querySelector(".cards2").style.display="flex";
  document.querySelector(".cards3").style.display="none";
  document.querySelector(".farming").style.display="none";
}
function renderTab3() {
  document.querySelector(".cards3").style.display="flex";
  document.querySelector(".missionsCont").style.display="none";
  document.querySelector(".cards").style.display="none";
  document.querySelector(".cards2").style.display="none";
  document.querySelector(".farming").style.display="none";
}

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  renderTab1();
});
 
mineTabButtons.forEach((mineTabButton) => {
  mineTabButton.addEventListener('click', (e) => {
    mineTabButtons.forEach((mineTabButton) => {
      mineTabButton.classList.remove('mine-tab__btn__active');
    });
    e.target.classList.add('mine-tab__btn__active');
    const category = e.target.textContent;

    switch (category) {
      case tab1:
      renderTab1();
      break;
      case tab2:
      renderTab2();
      break;
      case tab3:
      renderTab3();
      break;
    
      default:
      break;
    }
  });
});

//FARMING 
const farmButton = document.querySelector(".farm");
const farmTimer = document.querySelector(".timer");
let sec = 5; //backendden gelecek
let FarmCountDown;

farmButton.addEventListener("click", ()=> {
  if (farmButton.textContent==="Start Farming") {
     FarmCountDown = setInterval(function () {
        let min = Math.floor(sec / 60),
            remSec = sec % 60;    
        if (remSec < 10) {        
            remSec = '0' + remSec;    
        }
        if (min < 10) {        
            min = '0' + min;
        }
        farmTimer.textContent = min + ":" + remSec;
        if (sec > 0) { 
          sec = sec - 1;      
        } else {   
          farmButton.textContent = "Claim";
          farmTimer.textContent = 'You can claim reward'; 
          clearInterval(FarmCountDown); 
        }
      }, 1000);
  } else if (farmButton.textContent==="Claim") {
    showToast("success", "claimed");
    farmTimer.textContent = ''; 
    farmButton.textContent = "Start Farming";
  } 
  
});



//SWAL ALERT
function showToast(icon, title) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    icon: icon,
    title: title,
  });
}
function showClaim(_title) {
  Swal.fire({
    allowOutsideClick: false,
    allowEscapeKey: false,
    title: _title,
    confirmButtonText: "Claim",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}

//ADSENSE 

adConfig({
  preloadAdBreaks: "on",
  sound: 'off',
  onReady: () => {
    adsenseBtn.style.display = "flex";
  },
});

var adSaveReady = true;
var adSaveINT = 15;
//Allows Rewarded Ad to Be Called Once Again...
function restoreAdSave(){
  if (!adSaveReady){
    adSaveReady = true;
  }
}
let myTimeout;
function AdTimer() {
  adsenseBtn.disabled = true;
  myTimeout = setTimeout(function () {
    if (adSaveINT != 0) {
      adSaveINT--;
      adTimer.innerHTML = `00:${(adSaveINT >= 10) ? adSaveINT : `${"0" + adSaveINT}`}`;
      AdTimer();
    } else {
      restoreAdSave()
      adTimer.innerHTML = `Open Box`;
      adsenseBtn.disabled = false;
    }
  }, 1000);
  // clearTimeout(myTimeout);
  
};
adsenseBtn.addEventListener("click", () => {
  console.log(adSaveReady)
  if(adSaveReady==true) {
    adBreak({
      type: 'reward',                      // The type of this placement
      name: '1 extra ticket',              // A descriptive name for this placement
      beforeAd: () => { },                  // Prepare for the ad. Mute and pause the game flow
      afterAd: () => { },                   // Resume the game and re-enable sound
      // Show reward prompt (call showAdFn() if clicked)
      beforeReward: (showAdFn) => {
        Swal.fire({
          title: "Watch the video to get one more chance?",
          showCancelButton: true,
          confirmButtonText: "Watch",
        }).then((result) => {
          if (result.isConfirmed) {
            showAdFn(); //ads
          } else {
            adSaveReady = false;
            AdTimer();
          }
        });
      },
      // Player dismissed the ad before it finished.      
      adDismissed: () => { },
      // Player watched the ad–give them the reward.             
      adViewed: () => { },
  
      // Always called (if provided) even if an ad didn't show  
      adBreakDone: (placementInfo) => {
        //breakStatus: 'notReady|timeout|error|noAdPreloaded|frequencyCapped|ignored|other|dismissed|viewed',
        switch (placementInfo.breakStatus) {
          case "viewed":
            showToast("success", `Congratulations, +0.1 ILC added`);
            break;
          case "notReady":
            showToast("error", `Ad is not ready`);
            break;
          case "noAdPreloaded":
            showToast("error", `No ad available at this time`);
            break;
          case "frequencyCapped":
            showToast("error", `Frequency Capped!`);
            break;
          case "ignored":
          case "other":
          case "dismissed":
          case "timeout":
          case "error":
            showToast("error", `Error occured, status: ${placementInfo.breakStatus}`);
            break;
          default: showToast("error", `Unknown break status`);
            break;
        }
        adSaveReady = false;
        // window.setTimeout(restoreAdSave, adSaveINT);
        AdTimer();
      },
    });
  }
  else{
    showToast("error", "Wait some time")
  }

});



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
  const WebAppInitData = TELEGRAM.initDataUnsafe;
  const referred_ID = WebAppInitData.start_param;
  const user = WebAppInitData.user;
  if (user) {
    invited_by_dom.textContent = referred_ID === undefined ? `You have joined without ref` : `You invited by ${referred_ID}`;
    playerName.textContent = `${user.first_name}`;
    playerUserId.textContent = `${user.id}`;
    url_tier = user.id;
  } else {
    playerName.textContent = `No user`;
    playerUserId.textContent = `No ID`;
    invited_by_dom.textContent = `You have joined without ref`;
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
    document.querySelector("#updownBtn1").style.transform = "rotate(0deg)"
    document.querySelector(".card").style.borderBottomLeftRadius = "8px";
    document.querySelector(".card").style.borderBottomRightRadius = "8px";
    document.querySelector(".card").style.boxShadow = "0px 1px 6px rgba(95, 243, 208, 0.5)";
    document.querySelector(".panel").style.borderBottomLeftRadius = "0";
    document.querySelector(".panel").style.borderBottomRightRadius = "0";
  } else {
    panel.style.display = "flex";
    document.querySelector("#updownBtn1").style.transform = "rotate(180deg)"
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
    document.querySelector("#updownBtn").style.transform = "rotate(0deg)"
    document.querySelector(".card2").style.borderBottomLeftRadius = "8px";
    document.querySelector(".card2").style.borderBottomRightRadius = "8px";
    document.querySelector(".card2").style.boxShadow = "0px 1px 6px rgba(95, 243, 208, 0.5)";
    document.querySelector(".panel2").style.borderBottomLeftRadius = "0";
    document.querySelector(".panel2").style.borderBottomRightRadius = "0";
  } else {
    panel2.style.display = "flex";
    document.querySelector("#updownBtn").style.transform = "rotate(180deg)"
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
const maxAdsPerDay = 10;
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
      setTimeout(function () {
        watchAddBtn.disabled = null;
      }, 30000);

      var countdownNum = 30;
      incTimer();

      function incTimer() {
        watchAddBtn.disabled = true;
        setTimeout(function () {
          if (countdownNum != 0) {
            countdownNum--;
            watchAddBtn.innerHTML = `00:${(countdownNum >= 10) ? countdownNum : `${"0" + countdownNum}`}`;
            incTimer();
          } else {
            watchAddBtn.innerHTML = `<span>Watch</span> <img src="./img/see.png" alt="">`;
            watchAddBtn.disabled = false;
          }
        }, 1000);
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
wheel_back_btn.addEventListener("click", () => {
  const wheel_cont = document.querySelector(".wheel_cont");
  wheel_cont.style.display = "none";
});
open_Wheel_btn.addEventListener("click", () => {
  const wheel_cont = document.querySelector(".wheel_cont");
  wheel_cont.style.display = "flex";
});

const wheelSectionTotal = 6;

function generateRandom(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return (num === 4) ? generateRandom(min, max) : num;
}

var landOn = generateRandom(0, 5);
// console.log("ILK sonuç: "+landOn)

const baseDegree = 360 * 7;
const spinAniTime = 6000;

var nowDegree = 0;
const sectionDegree = 360 / wheelSectionTotal;

$(document).ready(function () {
  /*WHEEL SPIN FUNCTION*/
  $("#spin").click(function () {
    spanWheel(landOn);
  });
});

function spanWheel(_landOn) {
  var newBaseDegree = baseDegree + nowDegree - ((baseDegree + nowDegree) % 360);
  var landOnDegreeCenter = sectionDegree * _landOn;
  var landOnDegreeOffset = getRandomIntBetween(
    landOnDegreeCenter - (sectionDegree / 2) * 0.9,
    landOnDegreeCenter + (sectionDegree / 2) * 0
  );
  var landOnDegree = 360 - landOnDegreeOffset;

  var totalDegree = newBaseDegree + landOnDegree;
  nowDegree = totalDegree;

  $("#inner-wheel").css({
    transform: "rotate(" + totalDegree + "deg)",
  });

  let spinReward = "";
  setTimeout(() => {
    switch (_landOn) {
      case 0: spinReward = "1 ticket";
        break;
      case 1: spinReward = "100 coin";
        break;
      case 2: spinReward = "10 coin";
        break;
      case 3: spinReward = "No luck";
        break;
      case 4: spinReward = "10 TON";
        break;
      case 5: spinReward = "No luck";
        break;
      default: spinReward = "No luck";
        break;
    }
    showClaim(spinReward);

  }, spinAniTime + 500);

  landOn = generateRandom(0, 5);
  // console.log("yeni sonuç: "+landOn)
}

function getRandomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

