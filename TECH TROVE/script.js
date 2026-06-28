// ============================================================
// TECHTROVE — APP DATA
// ============================================================
const PRODUCTS = [
  {
    id:1, name:'Samsung Galaxy S25 Ultra', brand:'Samsung', category:'phone',
    img:'https://rukminim2.flixcart.com/image/480/640/xif0q/mobile/i/s/g/-original-imahgfmzraymrnrg.jpeg?q=90', thumbs:['https://rukminim2.flixcart.com/image/480/640/xif0q/mobile/i/s/g/-original-imahgfmzraymrnrg.jpeg?q=90U','data:image/jpeg;base64,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','https://m.media-amazon.com/images/I/71tDWJ3ZHaL._AC_UF1000,1000_QL80_.jpg'],
    oldPrice:129999, newPrice:103999, offer:'20% OFF', badge:'', rating:4.8, reviews:2341, stock:8, totalStock:50,
    payments:['Paytm','GPay','UPI','SBI'],
    colors:['Titanium Grey','Titanium Black','Titanium Violet'],
    storage:['256GB','512GB','1TB'],
    specsGeneral:[['Brand','Samsung'],['Model','Galaxy S25 Ultra'],['OS','Android 15, One UI 7'],['Weight','232g'],['Build','Titanium frame, Gorilla Glass Armor 2']],
    specsDisplay:[['Screen Size','6.9" QHD+'],['Type','Dynamic AMOLED 2X'],['Refresh Rate','120Hz'],['Brightness','2600 nits peak'],['Protection','Gorilla Armor 2']],
    specsCamera:[['Main','200MP f/1.7 OIS'],['Ultra-wide','50MP f/1.9'],['Telephoto 1','10MP 3x optical'],['Telephoto 2','50MP 5x optical'],['Front','12MP f/2.2'],['Video','8K @ 30fps']],
    specsBattery:[['Capacity','5000mAh'],['Wired Charging','45W'],['Wireless Charging','15W Qi2'],['Battery Life','Up to 29 hrs video']],
    specsPerformance:[['Chipset','Snapdragon 8 Elite for Galaxy'],['RAM','12GB LPDDR5X'],['Storage Type','UFS 4.0'],['GPU','Adreno 830'],['Cooling','Vapor chamber']],
    ratingDist:[60,20,12,5,3],
    reviewsList:[
      {name:'Aarav M.',rating:5,text:'The titanium build feels premium and the camera is a massive upgrade. Zoom quality is insane!'},
      {name:'Priya S.',rating:5,text:'Battery easily lasts a full day even with heavy use. S Pen integration is super smooth.'},
      {name:'Karan T.',rating:4,text:'Excellent phone overall, just wish it was slightly lighter. Display is gorgeous outdoors.'}
    ],
    faqs:[
      {q:'Does it support 5G?',a:'Yes, the Galaxy S25 Ultra supports 5G across all major Indian bands including n78.'},
      {q:'Is the S Pen included?',a:'Yes, the S Pen comes bundled in the box at no extra cost.'},
      {q:'Does it have an SD card slot?',a:'No, storage is fixed at purchase — choose between 256GB, 512GB or 1TB.'}
    ]
  },
  {
    id:2, name:'iPhone 17', brand:'Apple', category:'phone',
    img:'https://www.apple.com/newsroom/images/2025/09/apple-debuts-iphone-17/article/Apple-iPhone-17-hero-250909_inline.jpg.large.jpg', thumbs:['https://www.apple.com/newsroom/images/2025/09/apple-debuts-iphone-17/article/Apple-iPhone-17-hero-250909_inline.jpg.large.jpg','https://m.media-amazon.com/images/I/618vU2qKXQL._AC_UF1000,1000_QL80_.jpg','https://bankofelectronics.com/4200-medium_default/apple-iphone-17-pro-max-256gb-cosmic-orange-mfxt4lla.jpg'],
    oldPrice:89999, newPrice:76999, offer:'HOT DEAL', badge:'new', rating:4.7, reviews:1892, stock:15, totalStock:60,
    payments:['UPI','Cards','Paytm'],
    colors:['Black','White','Pink','Sky Blue'],
    storage:['128GB','256GB','512GB'],
    specsGeneral:[['Brand','Apple'],['Model','iPhone 17'],['OS','iOS 19'],['Weight','174g'],['Build','Aerospace aluminum, Ceramic Shield 2']],
    specsDisplay:[['Screen Size','6.1"'],['Type','Super Retina XDR OLED'],['Refresh Rate','60Hz'],['Brightness','2000 nits peak'],['Protection','Ceramic Shield 2']],
    specsCamera:[['Main','48MP f/1.6 OIS'],['Ultra-wide','12MP f/2.2'],['Front','12MP f/1.9'],['Video','4K @ 60fps Dolby Vision']],
    specsBattery:[['Capacity','3800mAh (est.)'],['Wired Charging','30W'],['Wireless Charging','MagSafe 25W'],['Battery Life','Up to 24 hrs video']],
    specsPerformance:[['Chipset','Apple A19 Bionic'],['RAM','8GB'],['Storage Type','NVMe'],['GPU','5-core Apple GPU'],['Cooling','Vapor chamber']],
    ratingDist:[58,22,11,6,3],
    reviewsList:[
      {name:'Sneha R.',rating:5,text:'Buttery smooth as always. The new colors look stunning in person.'},
      {name:'Vikram J.',rating:4,text:'Great everyday phone, camera improvements are noticeable in low light.'},
      {name:'Meera D.',rating:5,text:'Switched from Android and the ecosystem integration is fantastic.'}
    ],
    faqs:[
      {q:'Is Face ID available?',a:'Yes, Face ID is available and works reliably in all lighting conditions.'},
      {q:'Does it support fast charging?',a:'Yes, up to 30W wired charging gets you to 50% in about 25 minutes.'},
      {q:'Is there a physical SIM slot?',a:'Indian units include a physical SIM slot alongside eSIM support.'}
    ]
  },
  {
    id:3, name:'iPhone 17 Pro', brand:'Apple', category:'phone',
    img:'https://m.media-amazon.com/images/I/618vU2qKXQL._AC_UF1000,1000_QL80_.jpg', thumbs:['https://m.media-amazon.com/images/I/618vU2qKXQL._AC_UF1000,1000_QL80_.jpg','https://www.apple.com/newsroom/images/2025/09/apple-debuts-iphone-17/article/Apple-iPhone-17-hero-250909_inline.jpg.large.jpg','https://rukminim2.flixcart.com/image/480/640/xif0q/mobile/f/v/m/-original-imahft6chnx2vbuy.jpeg?q=90'],
    oldPrice:119999, newPrice:104999, offer:'FLASH SALE', badge:'', rating:4.8, reviews:1456, stock:6, totalStock:40,
    payments:['Google Pay','SBI','UPI'],
    colors:['Graphite','Natural Titanium','Deep Blue'],
    storage:['256GB','512GB','1TB'],
    specsGeneral:[['Brand','Apple'],['Model','iPhone 17 Pro'],['OS','iOS 19'],['Weight','199g'],['Build','Titanium frame, Ceramic Shield 2']],
    specsDisplay:[['Screen Size','6.3"'],['Type','Super Retina XDR OLED'],['Refresh Rate','120Hz ProMotion'],['Brightness','2600 nits peak'],['Protection','Ceramic Shield 2']],
    specsCamera:[['Main','48MP f/1.6 OIS'],['Ultra-wide','48MP f/2.2'],['Telephoto','12MP 5x optical'],['Front','12MP f/1.9'],['Video','4K ProRes @ 60fps']],
    specsBattery:[['Capacity','4400mAh (est.)'],['Wired Charging','35W'],['Wireless Charging','MagSafe 25W'],['Battery Life','Up to 29 hrs video']],
    specsPerformance:[['Chipset','Apple A19 Pro Bionic'],['RAM','12GB'],['Storage Type','NVMe'],['GPU','6-core Apple GPU'],['Cooling','Vapor chamber']],
    ratingDist:[62,21,10,4,3],
    reviewsList:[
      {name:'Rohit K.',rating:5,text:'ProRes video on this thing is studio quality. Worth every rupee for creators.'},
      {name:'Anjali P.',rating:5,text:'The titanium finish feels so premium and the telephoto lens is a game changer.'},
      {name:'Dev S.',rating:4,text:'Fantastic phone, battery could be slightly better with heavy ProRes recording.'}
    ],
    faqs:[
      {q:'Does it support satellite SOS?',a:'Yes, Emergency SOS via satellite is supported in select regions.'},
      {q:'Can I record ProRes video?',a:'Yes, ProRes recording up to 4K60 is supported with sufficient storage.'}
    ]
  },
  {
    id:4, name:'iPhone 17 Pro Max', brand:'Apple', category:'phone',
    img:'https://rukminim2.flixcart.com/image/480/640/xif0q/mobile/f/v/m/-original-imahft6chnx2vbuy.jpeg?q=90', thumbs:['https://rukminim2.flixcart.com/image/480/640/xif0q/mobile/f/v/m/-original-imahft6chnx2vbuy.jpeg?q=90','https://bankofelectronics.com/4233-medium_default/apple-iphone-17-pro-512gb-silver.jpg','https://www.apple.com/newsroom/images/2025/09/apple-debuts-iphone-17/article/Apple-iPhone-17-hero-250909_inline.jpg.large.jpg'],
    oldPrice:139999, newPrice:118999, offer:'LIMITED STOCK', badge:'trending', rating:4.9, reviews:3120, stock:4, totalStock:30,
    payments:['Paytm','UPI','Cards'],
    colors:['Graphite','Natural Titanium','Deep Blue','Desert Gold'],
    storage:['256GB','512GB','1TB','2TB'],
    specsGeneral:[['Brand','Apple'],['Model','iPhone 17 Pro Max'],['OS','iOS 19'],['Weight','221g'],['Build','Titanium frame, Ceramic Shield 2']],
    specsDisplay:[['Screen Size','6.9"'],['Type','Super Retina XDR OLED'],['Refresh Rate','120Hz ProMotion'],['Brightness','2700 nits peak'],['Protection','Ceramic Shield 2']],
    specsCamera:[['Main','48MP f/1.6 OIS'],['Ultra-wide','48MP f/2.2'],['Telephoto','12MP 5x optical'],['Front','12MP f/1.9'],['Video','4K ProRes @ 60fps']],
    specsBattery:[['Capacity','4800mAh (est.)'],['Wired Charging','40W'],['Wireless Charging','MagSafe 25W'],['Battery Life','Up to 33 hrs video']],
    specsPerformance:[['Chipset','Apple A19 Pro Bionic'],['RAM','12GB'],['Storage Type','NVMe'],['GPU','6-core Apple GPU'],['Cooling','Vapor chamber']],
    ratingDist:[68,18,8,4,2],
    reviewsList:[
      {name:'Ishaan V.',rating:5,text:'The absolute best phone Apple has ever made. Battery life is incredible.'},
      {name:'Tanya M.',rating:5,text:'Screen is massive and gorgeous, camera system is unmatched in this price range.'},
      {name:'Arjun B.',rating:5,text:'Worth the upgrade from the 15 Pro Max — noticeably faster and better battery.'}
    ],
    faqs:[
      {q:'Is the 2TB option available in India?',a:'Yes, the 2TB storage variant is available at launch in India.'},
      {q:'Does it get hot during gaming?',a:'The vapor chamber cooling keeps temperatures well managed even during extended gaming.'}
    ]
  },
  {
    id:5, name:'Samsung Galaxy S26', brand:'Samsung', category:'phone',
    img:'https://media-ik.croma.com/Croma%20Assets/Communication/Mobiles/Images/321484_0_RtJRZMRp9.png?updatedAt=1772297547515', thumbs:['https://media-ik.croma.com/Croma%20Assets/Communication/Mobiles/Images/321484_0_RtJRZMRp9.png?updatedAt=1772297547515','https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTftxoeoAq5nKVBYn-k5q2pleuO0xJ93LgvuK-VQbfPWspKEH_FTBt_-T_XZ21n2UwUa1GkPAhA3vcoxyjS4vHANGrmVszt-LXg_P3dXmNjSjcLoW_swOKoi2yWWWBm_ccDYOFcOvk&usqp=CAc','https://www.designinfo.in/wp-content/uploads/2020/12/SAMSUNG-Galaxy-S25-Ultra-5G-12GB-RAM-256GB-Titanium-Black-Unlocked-5-1.webp'],
    oldPrice:109999, newPrice:95999, offer:'NEW OFFER', badge:'new', rating:4.6, reviews:982, stock:12, totalStock:55,
    payments:['UPI','Google Pay','SBI'],
    colors:['Phantom Black','Cream','Lavender'],
    storage:['128GB','256GB','512GB'],
    specsGeneral:[['Brand','Samsung'],['Model','Galaxy S26'],['OS','Android 15, One UI 7'],['Weight','168g'],['Build','Aluminum frame, Gorilla Glass Victus 3']],
    specsDisplay:[['Screen Size','6.3"'],['Type','Dynamic AMOLED 2X'],['Refresh Rate','120Hz'],['Brightness','2400 nits peak'],['Protection','Gorilla Glass Victus 3']],
    specsCamera:[['Main','50MP f/1.8 OIS'],['Ultra-wide','12MP f/2.2'],['Telephoto','10MP 3x optical'],['Front','12MP f/2.2'],['Video','4K @ 60fps']],
    specsBattery:[['Capacity','4300mAh'],['Wired Charging','25W'],['Wireless Charging','15W Qi2'],['Battery Life','Up to 22 hrs video']],
    specsPerformance:[['Chipset','Snapdragon 8 Gen 5'],['RAM','8GB'],['Storage Type','UFS 4.0'],['GPU','Adreno 825'],['Cooling','Graphite sheet']],
    ratingDist:[52,26,13,6,3],
    reviewsList:[
      {name:'Nikhil P.',rating:5,text:'Compact flagship done right. Pocket-friendly size with flagship performance.'},
      {name:'Riya G.',rating:4,text:'Camera is great for the price, just wish the battery was a bit bigger.'}
    ],
    faqs:[
      {q:'Does it support wireless charging?',a:'Yes, 15W Qi2 wireless charging is supported.'},
      {q:'Is it water resistant?',a:'Yes, it has an IP68 rating for dust and water resistance.'}
    ]
  },
  {
    id:6, name:'Samsung Galaxy S26 Ultra', brand:'Samsung', category:'phone',
    img:'https://m.media-amazon.com/images/I/71HXOEh+U1L._AC_UF1000,1000_QL80_.jpg', thumbs:['https://m.media-amazon.com/images/I/71HXOEh+U1L._AC_UF1000,1000_QL80_.jpg','https://easyphones.co.in/cdn/shop/files/Samsung_Galaxy_S25_Ultra_5G_AI_New.png?v=1755507971','https://rukminim2.flixcart.com/image/480/640/xif0q/mobile/f/v/m/-original-imahft6chnx2vbuy.jpeg?q=90'],
    oldPrice:139999, newPrice:114999, offer:'TRENDING', badge:'trending', rating:4.9, reviews:2754, stock:3, totalStock:25,
    payments:['Paytm','UPI','Cards'],
    colors:['Titanium Black','Titanium Grey','Titanium Blue'],
    storage:['256GB','512GB','1TB'],
    specsGeneral:[['Brand','Samsung'],['Model','Galaxy S26 Ultra'],['OS','Android 15, One UI 7'],['Weight','234g'],['Build','Titanium frame, Gorilla Armor 2']],
    specsDisplay:[['Screen Size','6.9"'],['Type','Dynamic AMOLED 2X'],['Refresh Rate','120Hz'],['Brightness','2700 nits peak'],['Protection','Gorilla Armor 2']],
    specsCamera:[['Main','200MP f/1.7 OIS'],['Ultra-wide','50MP f/1.9'],['Telephoto 1','10MP 3x optical'],['Telephoto 2','50MP 5x optical'],['Front','12MP f/2.2'],['Video','8K @ 30fps']],
    specsBattery:[['Capacity','5200mAh'],['Wired Charging','45W'],['Wireless Charging','15W Qi2'],['Battery Life','Up to 30 hrs video']],
    specsPerformance:[['Chipset','Snapdragon 8 Elite Gen 2'],['RAM','16GB LPDDR5X'],['Storage Type','UFS 4.0'],['GPU','Adreno 830'],['Cooling','Vapor chamber 2.0']],
    ratingDist:[70,17,8,3,2],
    reviewsList:[
      {name:'Sameer A.',rating:5,text:'The new chipset is a beast — handles everything I throw at it without a hiccup.'},
      {name:'Pooja N.',rating:5,text:'200MP camera with the new sensor takes unbelievable night shots.'},
      {name:'Yash R.',rating:4,text:'Top tier flagship, just a bit pricey but you get what you pay for.'}
    ],
    faqs:[
      {q:'Is the S Pen included?',a:'Yes, the S Pen comes bundled with the Ultra model.'},
      {q:'Does it have satellite connectivity?',a:'Yes, emergency satellite messaging is supported.'}
    ]
  },
  {
    id:7, name:'TechTrove Watch Pro', brand:'TechTrove', category:'watch',
    img:'watch.png', thumbs:['watch.png','watch.png','watch.png'],
    oldPrice:19999, newPrice:13999, offer:'EXTRA SAVINGS', badge:'', rating:4.5, reviews:876, stock:22, totalStock:80,
    payments:['UPI','Cards'],
    colors:['Midnight Black','Silver','Rose Gold'],
    storage:['4G + WiFi'],
    specsGeneral:[['Brand','TechTrove'],['Model','Watch Pro'],['OS','Wear OS'],['Weight','38g'],['Build','Aluminum case, silicone strap']],
    specsDisplay:[['Screen Size','1.43" AMOLED'],['Resolution','466 x 466'],['Brightness','1000 nits'],['Always-On','Yes']],
    specsCamera:[['Camera','Not applicable on smartwatches']],
    specsBattery:[['Capacity','450mAh'],['Battery Life','Up to 40 hrs'],['Charging','Magnetic fast charge, 0-100% in 75 min']],
    specsPerformance:[['Chipset','Dual-core wearable SoC'],['RAM','2GB'],['Sensors','SpO2, ECG, Heart rate, GPS, Compass'],['Connectivity','4G eSIM + WiFi + Bluetooth 5.3']],
    ratingDist:[48,28,15,6,3],
    reviewsList:[
      {name:'Aditi K.',rating:5,text:'Battery genuinely lasts 2 days with always-on display enabled. Love the build quality.'},
      {name:'Manish T.',rating:4,text:'Great fitness tracking accuracy, app could use a few more workout modes.'}
    ],
    faqs:[
      {q:'Is it compatible with iPhone?',a:'Yes, it works with both Android and iOS via the TechTrove companion app.'},
      {q:'Can I make calls without my phone?',a:'Yes, with the 4G eSIM variant you can make calls independently.'}
    ]
  },
  {
    id:8, name:'TechTrove Buds Pro', brand:'TechTrove', category:'audio',
    img:'buds.png', thumbs:['buds.png','buds.png','buds.png'],
    oldPrice:9999, newPrice:6999, offer:'FAST SELLING', badge:'', rating:4.6, reviews:1543, stock:30, totalStock:100,
    payments:['Paytm','Google Pay'],
    colors:['Pearl White','Jet Black'],
    storage:['Standard'],
    specsGeneral:[['Brand','TechTrove'],['Model','Buds Pro'],['Weight','5g per earbud'],['Case','Wireless charging case']],
    specsDisplay:[['Driver','11mm dynamic driver'],['ANC','Up to 45dB active noise cancellation'],['Codec','LDAC, AAC, SBC']],
    specsCamera:[['Camera','Not applicable on earbuds']],
    specsBattery:[['Earbud Battery','8 hrs (ANC on)'],['With Case','32 hrs total'],['Charging','USB-C + Qi wireless']],
    specsPerformance:[['Connectivity','Bluetooth 5.4'],['Latency Mode','Low-latency gaming mode'],['Water Resistance','IPX5']],
    ratingDist:[50,27,14,6,3],
    reviewsList:[
      {name:'Farhan S.',rating:5,text:'ANC is shockingly good for the price — blocks out office chatter completely.'},
      {name:'Lavanya R.',rating:4,text:'Sound quality is crisp, fit is comfortable for long listening sessions.'}
    ],
    faqs:[
      {q:'Are they sweat resistant?',a:'Yes, IPX5 rating makes them suitable for workouts.'},
      {q:'Do they support multipoint connection?',a:'Yes, you can connect to two devices simultaneously.'}
    ]
  },
  {
    id:9, name:'TechTrove Tab Pro', brand:'TechTrove', category:'tablet',
    img:'tab pro.png', thumbs:['tab pro.png','tab pro.png','tab pro.png'],
    oldPrice:79999, newPrice:59999, offer:'NEW LAUNCH', badge:'new', rating:4.7, reviews:412, stock:10, totalStock:35,
    payments:['UPI','Cards','SBI'],
    colors:['Space Grey','Silver'],
    storage:['128GB','256GB','512GB'],
    specsGeneral:[['Brand','TechTrove'],['Model','Tab Pro'],['OS','Android 15'],['Weight','498g'],['Build','Aluminum unibody']],
    specsDisplay:[['Screen Size','12.4" OLED'],['Resolution','2800 x 1752'],['Refresh Rate','120Hz'],['Brightness','900 nits']],
    specsCamera:[['Rear','13MP f/1.8'],['Front','12MP ultra-wide'],['Video','4K @ 30fps']],
    specsBattery:[['Capacity','10090mAh'],['Charging','45W fast charging'],['Battery Life','Up to 14 hrs video playback']],
    specsPerformance:[['Chipset','Snapdragon 8 Gen 4'],['RAM','12GB'],['Storage Type','UFS 4.0'],['Accessories','Keyboard cover + stylus support']],
    ratingDist:[55,25,12,5,3],
    reviewsList:[
      {name:'Owais H.',rating:5,text:'Perfect for productivity — the keyboard cover and stylus make it laptop-replacement worthy.'},
      {name:'Diya C.',rating:4,text:'Display is stunning for media consumption, performance is snappy for multitasking.'}
    ],
    faqs:[
      {q:'Does it support a stylus?',a:'Yes, TechTrove Pen (sold separately) is fully supported with low-latency input.'},
      {q:'Is there a cellular variant?',a:'A 5G cellular variant will be available in select markets.'}
    ]
  }
];

// Reco map: product id -> array of related ids
const RECO_MAP = {1:[6,4,7,9],2:[3,4,1,8],3:[4,2,1,9],4:[3,2,6,7],5:[6,1,9,8],6:[1,4,5,7],7:[8,1,9,5],8:[7,2,9,1],9:[1,5,6,7]};

const COUPONS = {
  'MEGA20':{type:'percent',value:20,minOrder:50000,desc:'20% off on orders above ₹50,000'},
  'WELCOME10':{type:'percent',value:10,minOrder:0,desc:'10% off on your first order'}
};

// ============================================================
// STATE
// ============================================================
let cart = [];          // {productId, qty, color, storage}
let wishlist = [];       // productIds
let recentlyViewed = [];  // productIds
let compareList = [];     // productIds (max 3)
let activeFilters = {brand:'all', price:'all', rating:'all', category:'all'};
let activeSort = 'default';
let searchQuery = '';
let appliedCoupon = null;
let currentModalProduct = null;
let modalQty = 1;
let modalColor = null;
let modalStorage = null;
let selectedShippingCost = 0;
let currentUser = null;
let stockTimers = {};

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(renderProducts, 700); // simulate loading skeleton
  startTimer();
  startStockFluctuation();
  startPurchasePopups();
  setupCursor();
  setupScrollAnimations();
  setupCardTilt();
  renderRecos(1);
});

// ============================================================
// CURSOR
// ============================================================
function setupCursor(){
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if(!cursor) return;
  document.addEventListener('mousemove', e=>{
    cursor.style.left = e.clientX+'px';
    cursor.style.top = e.clientY+'px';
    ring.style.left = e.clientX+'px';
    ring.style.top = e.clientY+'px';
  });
  document.addEventListener('mousedown',()=>{cursor.style.width='8px';cursor.style.height='8px';ring.style.width='26px';ring.style.height='26px';});
  document.addEventListener('mouseup',()=>{cursor.style.width='12px';cursor.style.height='12px';ring.style.width='34px';ring.style.height='34px';});
  document.querySelectorAll('button,a,.card,input,select,.coupon').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ring.style.width='50px';ring.style.height='50px';ring.style.borderColor='var(--green)';});
    el.addEventListener('mouseleave',()=>{ring.style.width='34px';ring.style.height='34px';ring.style.borderColor='var(--purple)';});
  });
}
function refreshCursorTargets(){
  const ring = document.getElementById('cursor-ring');
  if(!ring) return;
  document.querySelectorAll('.card, .btn-cart, .btn-explore, .action-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ring.style.width='50px';ring.style.height='50px';ring.style.borderColor='var(--green)';});
    el.addEventListener('mouseleave',()=>{ring.style.width='34px';ring.style.height='34px';ring.style.borderColor='var(--purple)';});
  });
}

// ============================================================
// SCROLL ANIMATIONS
// ============================================================
function setupScrollAnimations(){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');}
    });
  },{threshold:0.1});
  document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));
}

// ============================================================
// 3D CARD TILT
// ============================================================
function setupCardTilt(){
  document.addEventListener('mousemove', e=>{
    const card = e.target.closest && e.target.closest('.card');
    document.querySelectorAll('.card').forEach(c=>{
      if(c !== card){c.style.transform='';}
    });
    if(!card) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -10;
    const ry = ((x / r.width) - 0.5) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
  });
  document.addEventListener('mouseleave', e=>{
    document.querySelectorAll('.card').forEach(c=>c.style.transform='');
  },true);
}

// ============================================================
// TIMER (countdown)
// ============================================================
function startTimer(){
  const target = new Date();
  target.setHours(target.getHours()+15);
  function update(){
    const now = new Date();
    const diff = target - now;
    const h = Math.max(0,Math.floor(diff/1000/60/60));
    const m = Math.max(0,Math.floor(diff/1000/60)%60);
    const s = Math.max(0,Math.floor(diff/1000)%60);
    const th=document.getElementById('t-h'), tm=document.getElementById('t-m'), ts=document.getElementById('t-s');
    if(th)th.textContent=String(h).padStart(2,'0');
    if(tm)tm.textContent=String(m).padStart(2,'0');
    if(ts)ts.textContent=String(s).padStart(2,'0');
    const cd = document.getElementById('modal-countdown');
    if(cd) cd.textContent = `${h}h ${m}m`;
  }
  setInterval(update,1000);
  update();
}

// ============================================================
// HELPERS
// ============================================================
function fmt(n){ return '₹'+n.toLocaleString('en-IN'); }
function getProduct(id){ return PRODUCTS.find(p=>p.id===id); }
function discountPct(p){ return Math.round((1-p.newPrice/p.oldPrice)*100); }
function starString(rating){
  const full = Math.floor(rating);
  const half = rating-full>=0.5;
  return '★'.repeat(full) + (half?'½':'') + '☆'.repeat(5-full-(half?1:0));
}
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2600);
}
function closeAll(){
  document.querySelectorAll('.modal-overlay.open').forEach(m=>m.classList.remove('open'));
  closeCart(); closeWishlist(); closeNotif();
  document.getElementById('backdrop').classList.remove('show');
}
function showBackdrop(){ document.getElementById('backdrop').classList.add('show'); }

// ============================================================
// PRODUCT FILTERING / SORTING
// ============================================================
function getFilteredProducts(){
  let list = PRODUCTS.slice();
  if(activeFilters.category !== 'all') list = list.filter(p=>p.category===activeFilters.category);
  if(activeFilters.brand !== 'all') list = list.filter(p=>p.brand===activeFilters.brand);
  if(activeFilters.price !== 'all'){
    if(activeFilters.price==='under50k') list = list.filter(p=>p.newPrice<50000);
    if(activeFilters.price==='50to100k') list = list.filter(p=>p.newPrice>=50000 && p.newPrice<=100000);
    if(activeFilters.price==='over100k') list = list.filter(p=>p.newPrice>100000);
  }
  if(activeFilters.rating !== 'all'){
    list = list.filter(p=>p.rating >= parseFloat(activeFilters.rating));
  }
  if(searchQuery.trim()){
    const q = searchQuery.toLowerCase();
    list = list.filter(p=> p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.storage.some(s=>s.toLowerCase().includes(q)) );
  }
  switch(activeSort){
    case 'low': list.sort((a,b)=>a.newPrice-b.newPrice); break;
    case 'high': list.sort((a,b)=>b.newPrice-a.newPrice); break;
    case 'discount': list.sort((a,b)=>discountPct(b)-discountPct(a)); break;
    case 'rating': list.sort((a,b)=>b.rating-a.rating); break;
    case 'newest': list.sort((a,b)=>b.id-a.id); break;
  }
  return list;
}

function filterCat(cat, el){
  activeFilters.category = cat;
  document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active'));
  if(el) el.classList.add('active');
  renderProducts();
  document.querySelector('.products').scrollIntoView({behavior:'smooth',block:'start'});
}
function filterCatByName(cat){
  const link = Array.from(document.querySelectorAll('.nav-link')).find(n=>{
    if(cat==='all') return n.textContent.includes('All Products');
    if(cat==='phone') return n.textContent.includes('Phones');
    if(cat==='tablet') return n.textContent.includes('Tablets');
    if(cat==='watch') return n.textContent.includes('Watches');
    if(cat==='audio') return n.textContent.includes('Audio');
  });
  filterCat(cat, link);
}
function applyFilter(type, value, el){
  activeFilters[type] = value;
  el.parentElement.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  renderProducts();
}
function applySort(value){ activeSort = value; renderProducts(); }
function filterProducts(){
  searchQuery = document.getElementById('search-input').value;
  renderProducts();
}
function searchFor(term){
  document.getElementById('search-input').value = term;
  searchQuery = term;
  hideSuggest();
  renderProducts();
  document.querySelector('.products').scrollIntoView({behavior:'smooth',block:'start'});
}
function showSuggest(val){
  const s = document.getElementById('search-suggest');
  if(val && val.length>0){ s.classList.remove('show'); return; }
  s.classList.add('show');
}
function hideSuggest(){ document.getElementById('search-suggest').classList.remove('show'); }
document.addEventListener('click',e=>{
  const sb = document.querySelector('.header-search');
  if(sb && !sb.contains(e.target)) hideSuggest();
});

// ============================================================
// RENDER PRODUCTS
// ============================================================
function renderProducts(){
  const grid = document.getElementById('products-grid');
  const list = getFilteredProducts();
  if(list.length===0){
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--muted);font-family:var(--font-mono)">
      <div style="font-size:48px;margin-bottom:12px">🔍</div>
      No products found. Try adjusting your filters or search.
    </div>`;
    return;
  }
  grid.innerHTML = list.map(p=>{
    const pct = discountPct(p);
    const stockPct = Math.round((p.stock/p.totalStock)*100);
    const badgeHtml = p.badge ? `<div class="card-badge ${p.badge}">${p.badge==='new'?'NEW':'TRENDING'}</div>` : '';
    const liked = wishlist.includes(p.id);
    const compareSel = compareList.includes(p.id);
    return `
    <div class="card ${compareSel?'compare-selected':''}" data-id="${p.id}" onclick="openProductModal(${p.id})">
      <div class="card-img-wrap">
        ${badgeHtml}
        <div class="card-actions">
          <button class="action-btn ${liked?'liked':''}" onclick="event.stopPropagation();toggleWishlist(${p.id})" title="Wishlist">${liked?'❤️':'🤍'}</button>
          <button class="action-btn" onclick="event.stopPropagation();toggleCompare(${p.id})" title="Compare">${compareSel?'✓':'⇄'}</button>
        </div>
        <img class="product-img" src="${p.img}" alt="${p.name}">
        <div class="card-badge" style="right:14px;left:auto;background:var(--red);top:auto;bottom:14px">${p.offer}</div>
        <div class="stock-bar"><div class="stock-fill" style="width:${stockPct}%"></div></div>
      </div>
      <div class="card-body">
        <div class="card-brand">${p.brand}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-rating"><span class="stars">${starString(p.rating)}</span><span class="rating-count">${p.rating} (${p.reviews.toLocaleString('en-IN')})</span></div>
        <div class="card-specs">
          <span class="spec-tag">${p.storage[0]}</span>
          <span class="spec-tag">${p.colors.length} colors</span>
        </div>
        <div class="price-row">
          <div class="price-old">${fmt(p.oldPrice)}</div>
          <div class="price-new">${fmt(p.newPrice)}</div>
          <div class="price-save">${pct}% OFF</div>
        </div>
        <div class="payments">${p.payments.map(pm=>`<span class="payment-chip">${pm}</span>`).join('')}</div>
        <div class="stock-text">${p.stock<=5?`⚡ Only ${p.stock} left in stock!`:`${p.stock} units available`}</div>
        <div class="card-btns">
          <button class="btn-cart" onclick="event.stopPropagation();quickAddToCart(${p.id})">🛒 Add to Cart</button>
          <button class="btn-explore" onclick="event.stopPropagation();openProductModal(${p.id})">Explore</button>
        </div>
      </div>
    </div>`;
  }).join('');
  refreshCursorTargets();
  updateCompareUI();
  setTimeout(setupScrollAnimations,50);
}

// ============================================================
// DYNAMIC STOCK FLUCTUATION
// ============================================================
function startStockFluctuation(){
  setInterval(()=>{
    const idx = Math.floor(Math.random()*PRODUCTS.length);
    const p = PRODUCTS[idx];
    if(p.stock>1 && Math.random()<0.6){
      p.stock -= 1;
      renderProducts();
      if(currentModalProduct && currentModalProduct.id===p.id) updateModalStock();
    }
  }, 9000);
}

// ============================================================
// RECENTLY PURCHASED POPUP
// ============================================================
const FAKE_NAMES = ['Rahul from Mumbai','Sneha from Pune','Aman from Delhi','Divya from Bengaluru','Kiran from Hyderabad','Pooja from Chennai','Vivek from Kolkata','Anita from Jaipur'];
function startPurchasePopups(){
  function popup(){
    const p = PRODUCTS[Math.floor(Math.random()*PRODUCTS.length)];
    const name = FAKE_NAMES[Math.floor(Math.random()*FAKE_NAMES.length)];
    document.getElementById('popup-img').src = p.img;
    document.getElementById('popup-name').textContent = name.split(' from ')[0]+' from '+name.split(' from ')[1];
    document.getElementById('popup-location').textContent = `bought ${p.name}`;
    document.getElementById('popup-ago').textContent = 'a few moments ago';
    const el = document.getElementById('purchase-popup');
    el.classList.add('show');
    setTimeout(()=>el.classList.remove('show'),4500);
  }
  setTimeout(popup, 6000);
  setInterval(popup, 22000);
}

// ============================================================
// RECENTLY VIEWED
// ============================================================
function addRecentlyViewed(id){
  recentlyViewed = recentlyViewed.filter(x=>x!==id);
  recentlyViewed.unshift(id);
  if(recentlyViewed.length>8) recentlyViewed.pop();
  renderRecents();
}
function renderRecents(){
  const sec = document.getElementById('recents-section');
  const list = document.getElementById('recents-list');
  if(recentlyViewed.length===0){ sec.style.display='none'; return; }
  sec.style.display='block';
  list.innerHTML = recentlyViewed.map(id=>{
    const p = getProduct(id);
    return `<div class="recent-card" onclick="openProductModal(${p.id})">
      <img class="recent-img" src="${p.img}" alt="${p.name}">
      <div class="recent-info"><div class="recent-name">${p.name}</div><div class="recent-price">${fmt(p.newPrice)}</div></div>
    </div>`;
  }).join('');
  setTimeout(setupScrollAnimations,50);
}

// ============================================================
// RECOMMENDATIONS
// ============================================================
function renderRecos(basedOnId){
  const ids = RECO_MAP[basedOnId] || [2,3,4,5];
  const list = document.getElementById('reco-scroll');
  const base = getProduct(basedOnId);
  document.querySelector('.reco-section .section-sub').textContent = `Based on ${base?base.name:'your browsing'}`;
  list.innerHTML = ids.map(id=>{
    const p = getProduct(id);
    return `<div class="reco-card" onclick="openProductModal(${p.id})">
      <img class="reco-img" src="${p.img}" alt="${p.name}">
      <div class="reco-info"><div class="reco-name">${p.name}</div><div class="reco-price">${fmt(p.newPrice)}</div></div>
    </div>`;
  }).join('');
}

// ============================================================
// WISHLIST
// ============================================================
function toggleWishlist(id){
  if(wishlist.includes(id)){
    wishlist = wishlist.filter(x=>x!==id);
    showToast('Removed from wishlist');
  } else {
    wishlist.push(id);
    showToast('❤️ Added to wishlist!');
  }
  document.getElementById('wishlist-badge').textContent = wishlist.length;
  renderProducts();
  renderWishlist();
}
function renderWishlist(){
  const list = document.getElementById('wishlist-items');
  const profList = document.getElementById('profile-wishlist-list');
  if(wishlist.length===0){
    list.innerHTML = `<div class="cart-empty"><div class="empty-icon">💝</div><div>No saved items yet</div></div>`;
    if(profList) profList.innerHTML = 'Your wishlist items will appear here.';
    return;
  }
  list.innerHTML = wishlist.map(id=>{
    const p = getProduct(id);
    return `<div class="wishlist-item" onclick="openProductModal(${p.id})">
      <img class="wishlist-img" src="${p.img}" alt="${p.name}">
      <div style="flex:1"><div class="wishlist-name">${p.name}</div><div class="wishlist-price">${fmt(p.newPrice)}</div></div>
      <button class="wishlist-remove" onclick="event.stopPropagation();toggleWishlist(${p.id})">✕</button>
    </div>`;
  }).join('');
  if(profList){
    profList.innerHTML = wishlist.map(id=>{
      const p = getProduct(id);
      return `<div class="wishlist-item" onclick="openProductModal(${p.id})">
        <img class="wishlist-img" src="${p.img}" alt="${p.name}">
        <div style="flex:1"><div class="wishlist-name">${p.name}</div><div class="wishlist-price">${fmt(p.newPrice)}</div></div>
      </div>`;
    }).join('');
  }
}
function openWishlist(){ document.getElementById('wishlist-sidebar').classList.add('open'); showBackdrop(); }
function closeWishlist(){ document.getElementById('wishlist-sidebar').classList.remove('open'); document.getElementById('backdrop').classList.remove('show'); }

// ============================================================
// COMPARE
// ============================================================
function toggleCompare(id){
  if(compareList.includes(id)){
    compareList = compareList.filter(x=>x!==id);
  } else {
    if(compareList.length>=3){ showToast('You can compare up to 3 products only'); return; }
    compareList.push(id);
  }
  renderProducts();
}
function updateCompareUI(){
  const count = document.getElementById('compare-count');
  const btn = document.getElementById('compare-btn');
  if(compareList.length===0){
    count.textContent = 'Select up to 3 to compare';
    btn.classList.remove('show');
  } else {
    count.textContent = `${compareList.length} selected for comparison`;
    if(compareList.length>=2) btn.classList.add('show'); else btn.classList.remove('show');
  }
}
function openCompare(){
  if(compareList.length<2) return;
  const products = compareList.map(getProduct);
  document.getElementById('compare-head').innerHTML = '<th>Spec</th>' + products.map(p=>`<th><img class="compare-img" src="${p.img}"><div class="compare-name">${p.name}</div><div class="compare-price">${fmt(p.newPrice)}</div></th>`).join('');
  const rows = [
    ['Brand', p=>p.brand],
    ['Rating', p=>`${starString(p.rating)} (${p.rating})`],
    ['Price', p=>fmt(p.newPrice)],
    ['Discount', p=>discountPct(p)+'%'],
    ['Display', p=>(p.specsDisplay[0]||[])[1]||'-'],
    ['Camera', p=>(p.specsCamera[0]||[])[1]||'-'],
    ['Battery', p=>(p.specsBattery[0]||[])[1]||'-'],
    ['Performance', p=>(p.specsPerformance[0]||[])[1]||'-'],
    ['Colors', p=>p.colors.join(', ')],
    ['Storage', p=>p.storage.join(', ')],
    ['Stock', p=>p.stock+' units']
  ];
  document.getElementById('compare-body').innerHTML = rows.map(([label,fn])=>`<tr><td>${label}</td>${products.map(p=>`<td>${fn(p)}</td>`).join('')}</tr>`).join('');
  document.getElementById('compare-overlay').classList.add('open');
}
function closeCompare(){ document.getElementById('compare-overlay').classList.remove('open'); }

// ============================================================
// CART
// ============================================================
function quickAddToCart(id){
  const p = getProduct(id);
  addToCart(id, 1, p.colors[0], p.storage[0]);
}
function addToCart(id, qty, color, storage){
  const existing = cart.find(c=>c.productId===id && c.color===color && c.storage===storage);
  if(existing){ existing.qty += qty; }
  else { cart.push({productId:id, qty, color, storage}); }
  showToast('✅ Added to cart!');
  renderCart();
  openCart();
}
function changeCartQty(idx, delta){
  cart[idx].qty += delta;
  if(cart[idx].qty<=0) cart.splice(idx,1);
  renderCart();
}
function removeFromCart(idx){
  cart.splice(idx,1);
  renderCart();
}
function cartSubtotal(){
  return cart.reduce((sum,c)=>{
    const p = getProduct(c.productId);
    return sum + p.newPrice*c.qty;
  },0);
}
function cartDiscount(subtotal){
  if(!appliedCoupon) return 0;
  const coupon = COUPONS[appliedCoupon];
  if(!coupon) return 0;
  if(subtotal < coupon.minOrder) return 0;
  return Math.round(subtotal * (coupon.value/100));
}
function renderCart(){
  const itemsEl = document.getElementById('cart-items');
  const countEl = document.getElementById('cart-count-header');
  const totalItems = cart.reduce((s,c)=>s+c.qty,0);
  document.getElementById('cart-badge').textContent = totalItems;
  countEl.textContent = `(${totalItems} item${totalItems!==1?'s':''})`;
  if(cart.length===0){
    itemsEl.innerHTML = `<div class="cart-empty"><div class="empty-icon">🛒</div><div>Your cart is empty.<br><span style="font-size:12px;font-family:var(--font-mono);color:var(--muted)">Add some awesome tech!</span></div></div>`;
  } else {
    itemsEl.innerHTML = cart.map((c,idx)=>{
      const p = getProduct(c.productId);
      return `<div class="cart-item">
        <img class="cart-item-img" src="${p.img}" alt="${p.name}">
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-meta">${c.color} · ${c.storage}</div>
          <div class="cart-item-price">${fmt(p.newPrice*c.qty)}</div>
          <div class="cart-item-qty">
            <button class="cq-btn" onclick="changeCartQty(${idx},-1)">−</button>
            <span class="cq-val">${c.qty}</span>
            <button class="cq-btn" onclick="changeCartQty(${idx},1)">+</button>
          </div>
        </div>
        <button class="cart-remove" onclick="removeFromCart(${idx})">✕</button>
      </div>`;
    }).join('');
  }
  const subtotal = cartSubtotal();
  const discount = cartDiscount(subtotal);
  const shipping = (subtotal>0 && subtotal-discount < 5000) ? 49 : 0;
  const total = subtotal - discount + shipping;
  document.getElementById('cart-subtotal').textContent = fmt(subtotal);
  document.getElementById('cart-shipping').textContent = shipping===0?'FREE':fmt(shipping);
  document.getElementById('cart-total').textContent = fmt(total);
  const discountRow = document.getElementById('discount-row');
  if(discount>0){
    discountRow.style.display='flex';
    document.getElementById('cart-discount').textContent = '-'+fmt(discount);
  } else { discountRow.style.display='none'; }
  const activeRow = document.getElementById('coupon-active-row');
  activeRow.innerHTML = appliedCoupon ? `<div class="coupon-active">🎉 Coupon "${appliedCoupon}" applied — ${COUPONS[appliedCoupon].desc}</div>` : '';
}
function openCart(){ document.getElementById('cart-sidebar').classList.add('open'); showBackdrop(); }
function closeCart(){ document.getElementById('cart-sidebar').classList.remove('open'); document.getElementById('backdrop').classList.remove('show'); }

// ============================================================
// COUPONS
// ============================================================
function applyCoupon(){
  const code = document.getElementById('coupon-field').value.trim().toUpperCase();
  applyCouponCode(code);
}
function applyCouponCode(code){
  if(COUPONS[code]){
    const coupon = COUPONS[code];
    const subtotal = cartSubtotal();
    if(subtotal < coupon.minOrder){
      showToast(`Add items worth ${fmt(coupon.minOrder)} to use ${code}`);
      return;
    }
    appliedCoupon = code;
    showToast(`🎉 Coupon ${code} applied!`);
    renderCart();
    openCart();
  } else {
    showToast('❌ Invalid coupon code');
  }
}

// ============================================================
// PRODUCT MODAL
// ============================================================
function openProductModal(id){
  const p = getProduct(id);
  currentModalProduct = p;
  modalQty = 1;
  modalColor = p.colors[0];
  modalStorage = p.storage[0];
  addRecentlyViewed(id);
  renderRecos(id);

  document.getElementById('modal-brand').textContent = p.brand;
  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-rating').innerHTML = `<span class="stars">${starString(p.rating)}</span><span class="rating-count">${p.rating} · ${p.reviews.toLocaleString('en-IN')} ratings</span>`;
  document.getElementById('modal-price-old').textContent = fmt(p.oldPrice);
  document.getElementById('modal-price-new').textContent = fmt(p.newPrice);
  document.getElementById('modal-badge').textContent = p.offer;
  document.getElementById('modal-main-img').src = p.img;
  document.getElementById('modal-thumbs').innerHTML = p.thumbs.map((t,i)=>`<img class="modal-thumb ${i===0?'active':''}" src="${t}" onclick="setModalImg(this,'${t}')">`).join('');

  // Colors
  document.getElementById('modal-colors').innerHTML = p.colors.map((c,i)=>`<button class="option-btn ${i===0?'active':''}" onclick="selectModalOption('color','${c}',this)">${c}</button>`).join('');
  // Storage
  document.getElementById('modal-storage-row').style.display = p.storage.length>1 || p.storage[0]!=='Standard' ? 'block':'none';
  document.getElementById('modal-storage').innerHTML = p.storage.map((s,i)=>`<button class="option-btn ${i===0?'active':''}" onclick="selectModalOption('storage','${s}',this)">${s}</button>`).join('');

  document.getElementById('modal-qty').textContent = modalQty;
  updateModalStock();

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate()+4);
  document.getElementById('modal-delivery-date').textContent = deliveryDate.toLocaleDateString('en-IN',{day:'numeric',month:'short'});

  // Tabs content
  renderSpecsTab(p);
  renderReviewsTab(p);
  renderFaqsTab(p);
  renderDeliveryTab(p);
  switchTab('specs', document.querySelector('#product-overlay .tab'));

  document.getElementById('product-overlay').classList.add('open');
}
function closeProductModal(){ document.getElementById('product-overlay').classList.remove('open'); }
function setModalImg(el, src){
  document.getElementById('modal-main-img').src = src;
  document.querySelectorAll('.modal-thumb').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
}
function selectModalOption(type, value, el){
  if(type==='color') modalColor = value; else modalStorage = value;
  el.parentElement.querySelectorAll('.option-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
}
function changeQty(delta){
  modalQty = Math.max(1, modalQty+delta);
  if(currentModalProduct) modalQty = Math.min(modalQty, currentModalProduct.stock);
  document.getElementById('modal-qty').textContent = modalQty;
}
function updateModalStock(){
  const p = currentModalProduct;
  if(!p) return;
  const txt = document.getElementById('modal-stock-text');
  txt.textContent = p.stock<=5 ? `⚡ Only ${p.stock} left!` : '';
}
function addToCartFromModal(){
  if(!currentModalProduct) return;
  addToCart(currentModalProduct.id, modalQty, modalColor, modalStorage);
  closeProductModal();
}
function wishlistFromModal(){
  if(!currentModalProduct) return;
  if(!wishlist.includes(currentModalProduct.id)) toggleWishlist(currentModalProduct.id);
  else showToast('Already in wishlist');
}

// ============================================================
// PRODUCT MODAL TABS
// ============================================================
function switchTab(name, el){
  document.querySelectorAll('#product-overlay .tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('#product-overlay .tab-content').forEach(t=>t.classList.remove('active'));
  if(el) el.classList.add('active');
  document.getElementById('tab-'+name).classList.add('active');
}
function renderSpecsTab(p){
  const groups = [
    ['General', p.specsGeneral],
    ['Display', p.specsDisplay],
    ['Camera', p.specsCamera],
    ['Battery', p.specsBattery],
    ['Performance', p.specsPerformance]
  ];
  document.getElementById('tab-specs').innerHTML = groups.map(([title, rows])=>`
    <div class="spec-group-title">${title}</div>
    <table class="spec-table">${rows.map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</table>
  `).join('');
}
function renderReviewsTab(p){
  const maxDist = Math.max(...p.ratingDist);
  const bars = [5,4,3,2,1].map((star,i)=>{
    const pct = p.ratingDist[i];
    return `<div class="rating-bar-row"><span style="width:34px">${star}★</span><div class="rating-bar-track"><div class="rating-bar-fill" style="width:${pct}%"></div></div><span style="width:30px;text-align:right">${pct}%</span></div>`;
  }).join('');
  const reviews = p.reviewsList.map(r=>`
    <div class="review-item">
      <div class="review-author"><span>${r.name}</span><span class="stars" style="font-size:11px">${starString(r.rating)}</span></div>
      <div class="review-text">${r.text}</div>
    </div>`).join('');
  document.getElementById('tab-reviews').innerHTML = `<div class="rating-bars">${bars}</div>${reviews}`;
}
function renderFaqsTab(p){
  document.getElementById('tab-faqs').innerHTML = p.faqs.map((f,i)=>`
    <div class="faq-item ${i===0?'open':''}" onclick="this.classList.toggle('open')">
      <div class="faq-q">${f.q} <span>${'+'}</span></div>
      <div class="faq-a">${f.a}</div>
    </div>`).join('');
}
function renderDeliveryTab(p){
  document.getElementById('tab-delivery').innerHTML = `
    <div class="delivery-box" style="margin-bottom:10px"><strong>🚚 Free Standard Delivery</strong><br>Estimated 5-7 business days</div>
    <div class="delivery-box" style="margin-bottom:10px"><strong>⚡ Express Delivery — ₹199</strong><br>Estimated 2-3 business days</div>
    <div class="delivery-box"><strong>🌙 Next Day Delivery — ₹499</strong><br>Order before 6 PM for delivery by tomorrow 8 PM</div>
    <div class="spec-group-title">Return &amp; Warranty</div>
    <table class="spec-table">
      <tr><td>Return Window</td><td>7 days from delivery</td></tr>
      <tr><td>Warranty</td><td>1 year manufacturer warranty</td></tr>
      <tr><td>Replacement</td><td>Free replacement for defective items</td></tr>
    </table>`;
}

// ============================================================
// AUTH
// ============================================================
function switchAuth(name, el){
  document.querySelectorAll('#login-overlay .tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('#login-overlay .auth-form').forEach(f=>f.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('auth-'+name).classList.add('active');
}
function doLogin(){
  const email = document.getElementById('login-email').value || 'raj@email.com';
  currentUser = {name:'Raj Sharma', email};
  updateAuthUI();
  document.getElementById('login-overlay').classList.remove('open');
  showToast('Welcome back! 🎉');
}
function doSignup(){
  const name = document.getElementById('signup-name').value || 'Raj Sharma';
  const email = document.getElementById('signup-email').value || 'raj@email.com';
  currentUser = {name, email};
  updateAuthUI();
  document.getElementById('login-overlay').classList.remove('open');
  showToast('Account created! 🎊');
}
function updateAuthUI(){
  const btn = document.getElementById('login-btn');
  if(!currentUser) return;
  const initial = currentUser.name.charAt(0).toUpperCase();
  btn.outerHTML = `<button class="user-chip" id="login-btn" onclick="openProfile()"><span class="user-avatar">${initial}</span>${currentUser.name.split(' ')[0]}</button>`;
  document.getElementById('profile-name').textContent = currentUser.name;
  document.getElementById('profile-email').textContent = currentUser.email;
  document.getElementById('profile-avatar').textContent = initial;
}
function openProfile(){
  if(!currentUser){ document.getElementById('login-overlay').classList.add('open'); return; }
  renderWishlist();
  document.getElementById('profile-overlay').classList.add('open');
}
function switchProfileTab(name, el){
  document.querySelectorAll('#profile-overlay .tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('#profile-overlay .tab-content').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('profile-'+name).classList.add('active');
}

// ============================================================
// CHECKOUT FLOW
// ============================================================
function openCheckout(){
  if(cart.length===0){ showToast('Your cart is empty!'); return; }
  buildCheckoutSummary();
  goStep(1);
  document.getElementById('checkout-overlay').classList.add('open');
}
function buildCheckoutSummary(){
  const subtotal = cartSubtotal();
  const discount = cartDiscount(subtotal);
  const shipping = selectedShippingCost || ((subtotal-discount<5000)?49:0);
  const total = subtotal - discount + shipping;
  const html = `
    <div class="row"><span>Items (${cart.reduce((s,c)=>s+c.qty,0)})</span><span>${fmt(subtotal)}</span></div>
    ${discount>0?`<div class="row"><span>Discount</span><span style="color:var(--green)">-${fmt(discount)}</span></div>`:''}
    <div class="row"><span>Shipping</span><span>${shipping===0?'FREE':fmt(shipping)}</span></div>
    <div class="row total"><span>Total</span><span>${fmt(total)}</span></div>`;
  document.getElementById('checkout-summary').innerHTML = html;
  const s2 = document.getElementById('checkout-summary2');
  if(s2) s2.innerHTML = html;
}
function goStep(n){
  document.querySelectorAll('.checkout-step').forEach(s=>s.classList.remove('active'));
  document.getElementById('step'+n).classList.add('active');
  if(n===3) buildCheckoutSummary();
}
function selectShipping(el, cost){
  el.parentElement.querySelectorAll('.shipping-opt').forEach(o=>o.classList.remove('active'));
  el.classList.add('active');
  selectedShippingCost = cost;
}
function calcShipping(){
  const pin = document.getElementById('shipping-pin').value.trim();
  const result = document.getElementById('pincode-result');
  if(!/^\d{6}$/.test(pin)){
    result.textContent = '⚠️ Please enter a valid 6-digit PIN code';
    result.style.color = 'var(--red)';
    return;
  }
  const days = 3 + (parseInt(pin[0])%4);
  const date = new Date(); date.setDate(date.getDate()+days);
  result.style.color = 'var(--green)';
  result.textContent = `✅ Delivery available — estimated by ${date.toLocaleDateString('en-IN',{day:'numeric',month:'short'})} (${days} days)`;
}
function placeOrder(){
  const orderNum = Math.floor(10000+Math.random()*89999);
  document.getElementById('order-num').textContent = orderNum;
  document.getElementById('track-order-num').textContent = orderNum;
  goStep(4);
  cart = [];
  appliedCoupon = null;
  renderCart();
}
function openTracking(){
  if(!document.getElementById('order-num').textContent){
    document.getElementById('order-num').textContent = '88213';
  }
  if(!document.getElementById('track-order-num').textContent){
    document.getElementById('track-order-num').textContent = document.getElementById('order-num').textContent || '88213';
  }
  document.getElementById('tracking-overlay').classList.add('open');
}

// ============================================================
// NOTIFICATIONS
// ============================================================
function toggleNotif(){
  document.getElementById('notif-panel').classList.toggle('open');
}
function closeNotif(){ document.getElementById('notif-panel').classList.remove('open'); }
document.addEventListener('click', e=>{
  const panel = document.getElementById('notif-panel');
  const btn = e.target.closest('.btn-icon');
  if(panel && !panel.contains(e.target) && !(btn && btn.title==='Notifications')){
    panel.classList.remove('open');
  }
});