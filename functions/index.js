const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const cors = require('cors')({origin: true});
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth'); 
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const {executablePath} = require('puppeteer'); 
var userAgent = require('user-agents');
const WelcomeMail = require("./emailTemplates/welcomeMail");

// puppeteer middleware
puppeteer.use(StealthPlugin()); 
puppeteer.use(RecaptchaPlugin({provider: { id: '2captcha', token: process.env.NEXT_PUBLIC_CAPTCHA_API_KEY },
visualFeedback: true}))

// for bot testing
// const test = 'http://bot.sannysoft.com';
exports.crawlWithPuppeteer = functions.runWith({
  timeoutSeconds: 300,
  memory: "1GB",
}).https.onRequest((req, res) => {
  cors(req, res, async () => {
  const delay = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  const url = `https://seatgeek.com/${req.body.url}`;
  const browser = await puppeteer.launch({headless: false, executablePath: executablePath()}); 
  const page = await browser.newPage();
  await page.setUserAgent(userAgent.random().toString())
  await page.goto(url); 
  await page.waitForTimeout(delay);
  await page.waitForSelector('[data-test="listing-item"]');
  await page.screenshot({path: "bot.jpg"});

  // fetch as much as possible on the first page so i don't have to opening tabs for a long time
  const indexData = await page.evaluate(async () => {
    const eventName = document.querySelector(".blVMWt").textContent; 
    const eventDateAndTime = document.querySelector(".hkindF").textContent.split(' · ')[0];
    const eventLocation =  document.querySelector(".hkindF").textContent.split(' · ')[1];

    // find data for each list item on the index page
    const listings = Array.from(document.querySelectorAll('[data-test="listing-item"]')); 
    const data = await Promise.all(listings.map(async (listing) => {
    const listingId = listing.getAttribute('data-listing-id');
    const availableTicketsAndScore = listing.querySelector(".jPiVoX").textContent;
    const seat = listing.querySelector('.czzhmX').textContent; 

    // mutations
    const listingUrl = `${url}?listing=${listingId}`;
    const eventStadium = eventLocation.split(", ")[0]; 
    const eventHomeTeam = eventName.split(" at ")[1].split(" - ")[0]; 
    const eventAwayTeam = eventName.split(" at ")[0]; 
    const regex = /\d+\.\d+|\d+/g;
    const matches = availableTicketsAndScore.match(regex);
    const score = parseFloat(matches[0]);
    const tickets = parseInt(matches[1]);
  
      return {
        eventName: eventName, 
        eventDate: eventDateAndTime, 
        eventLocation: eventLocation,
        eventStadium: eventStadium, 
        eventHomeTeam: eventHomeTeam,
        eventAwayTeam: eventAwayTeam, 
        listingId: listingId, 
        listingUrl: listingUrl,
        seat: seat,
        availableTickets: tickets,
        dealScore: score, 
        currency: "$",
      }
    }))

    return data;  
  });

    const detailPageData = await Promise.all(indexData.map(async (item) => {
    console.log(item);
    await page.setUserAgent(userAgent.random().toString())
    await page.goto(item.listingUrl);
    await page.waitForTimeout(delay);
    await page.waitForSelector('.gzpzYe');

    const data = await page.evaluate(() => {
      const fees = parseInt(document.querySelector(".hmSCyz").textContent.match(/\$\d+/)[0].split("$")[1]);
      const total = parseInt(document.querySelector(".cveRJZ").textContent.split(" ")[0].split("$")[1].replace(',', ""));
      const img = document.querySelector(".gzpzYe").getAttribute("src");

      return {
        ...item,
        seatGeekfeePrice: fees,
        seatGeektotalPrice: total,
        seatGeekBasePrice: total - fees,
        ticketyDisplayPrice: Math.round((total / 135) * 100),
        imgUrl: img,
      };
    });
    
    return data; 
    // itemDetails.push(data);
  }))

  // for (let i = 0; i < listingData.length; i++) {
  //   listingData[i].seatGeekfeePrice = itemDetails[i].seatGeekfeePrice;
  //   listingData[i].seatGeektotalPrice = itemDetails[i].seatGeektotalPrice;
  //   listingData[i].seatGeekBasePrice = itemDetails[i].seatGeekBasePrice;
  //   listingData[i].ticketyDisplayPrice = itemDetails[i].ticketyDisplayPrice; 
  //   listingData[i].imgUrl = itemDetails[i].imgUrl;
  // }

  console.log(detailPageData)
  detailPageData && await browser.close();
  res.send(detailPageData);
  });
});    

exports.onCreateUser = functions.auth.user().onCreate(async (context) => {
  // create and save new user document data in firestore
  try {
    const userData = {
      uid: context.uid,
      provider: context.providerData[0].providerId,
      displayName: context.displayName,
      email: context.email,
      photoUrl: context.photoURL,
      admin: false, 
    };

    await admin.firestore().collection('users').doc(context.uid).set(userData);

  } catch (error) {
    functions.logger.error(error); 
    throw new Error('Something went wrong with making a user document. Error Message: ', error.message); 
  }

  try {
      // make / send a welcomes email after subscribing
      const welcomeEmailTemplate = {
        to: context.email, 
        message: {
          subject: "Welcome to The Goodlife Guide", 
          html: WelcomeMail,
        }
      }
      
      await admin.firestore().collection('mail').doc(context.uid).set(welcomeEmailTemplate);
    
  } catch (error) {
    functions.logger.error(error); 
    throw new Error('Something went wrong with sending email. Error Message: ', error.message);  
  }
});

exports.updateAdminCustomClaim = functions.firestore.document('users/{userId}')
  .onUpdate((change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    
    if (newValue.admin !== previousValue.admin) {
      const userId = context.params.userId;

      try {
        admin.auth().revokeRefreshTokens(userId); 
        functions.logger.info('User session revoked');
        
      } catch (error) {
        functions.logger.error(error); 
        throw new Error('Error revoking user session: ', e.message);  
      }

      if (newValue.admin) {
        return admin.auth().setCustomUserClaims(userId, { admin: true });
      } else {
        return admin.auth().setCustomUserClaims(userId, { admin: false });
      }
    } else {
      return null;
    }
  });


