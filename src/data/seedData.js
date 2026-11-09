// Seed data for KSHETRA (क्षेत्र) Platform
// 100% Trilingual localization (English, Marathi / मराठी, Hindi / हिंदी)

export const LOCATIONS = [
  { 
    id: 'shirur', 
    name: { en: 'Shirur, Pune', mr: 'शिरूर, पुणे', hi: 'शिरूर, पुणे' }, 
    district: { en: 'Pune', mr: 'पुणे', hi: 'पुणे' },
    state: 'Maharashtra',
    primaryCrops: { en: 'Onion, Sugarcane, Tomato', mr: 'कांदा, ऊस, टोमॅटो', hi: 'प्याज, गन्ना, टमाटर' },
    coords: '18.8282° N, 74.3789° E'
  },
  { 
    id: 'baramati', 
    name: { en: 'Baramati, Pune', mr: 'बारामती, पुणे', hi: 'बारामती, पुणे' }, 
    district: { en: 'Pune', mr: 'पुणे', hi: 'पुणे' },
    state: 'Maharashtra',
    primaryCrops: { en: 'Sugarcane, Soybean, Wheat', mr: 'ऊस, सोयाबीन, गहू', hi: 'गन्ना, सोयाबीन, गेहूं' },
    coords: '18.1517° N, 74.5772° E'
  },
  { 
    id: 'lasalgaon', 
    name: { en: 'Lasalgaon, Nashik', mr: 'लासलगाव, नाशिक', hi: 'लासलगांव, नासिक' }, 
    district: { en: 'Nashik', mr: 'नाशिक', hi: 'नासिक' },
    state: 'Maharashtra',
    primaryCrops: { en: 'Red Onion, Grapes, Maize', mr: 'लाल कांदा, द्राक्षे, मका', hi: 'लाल प्याज, अंगूर, मक्का' },
    coords: '20.1477° N, 74.2255° E'
  },
  { 
    id: 'sangamner', 
    name: { en: 'Sangamner, Ahilyanagar', mr: 'संगमनेर, अहिल्यानगर', hi: 'संगमनेर, अहिल्यानगर' }, 
    district: { en: 'Ahilyanagar', mr: 'अहिल्यानगर', hi: 'अहिल्यानगर' },
    state: 'Maharashtra',
    primaryCrops: { en: 'Pomegranate, Onion, Vegetables', mr: 'डाळिंब, कांदा, भाजीपाला', hi: 'अनार, प्याज, सब्जियां' },
    coords: '19.5761° N, 74.2070° E'
  },
  { 
    id: 'kolhapur', 
    name: { en: 'Karveer, Kolhapur', mr: 'करवीर, कोल्हापूर', hi: 'करवीर, कोल्हापुर' }, 
    district: { en: 'Kolhapur', mr: 'कोल्हापूर', hi: 'कोल्हापुर' },
    state: 'Maharashtra',
    primaryCrops: { en: 'Sugarcane, Paddy, Jaggery', mr: 'ऊस, भात, गूळ उद्योग', hi: 'गन्ना, धान, गुड़' },
    coords: '16.7050° N, 74.2433° E'
  },
  { 
    id: 'akola', 
    name: { en: 'Murtizapur, Akola', mr: 'मुर्तिजापूर, अकोला', hi: 'मुर्तिजापुर, अकोला' }, 
    district: { en: 'Akola', mr: 'अकोला', hi: 'अकोला' },
    state: 'Maharashtra',
    primaryCrops: { en: 'BT Cotton, Soybean, Pulses', mr: 'कापूस, सोयाबीन, तूर', hi: 'कपास, सोयाबीन, अरहर' },
    coords: '20.7323° N, 77.3689° E'
  }
];

export const LOCATION_WEATHER = {
  shirur: {
    temp: '29°C',
    condition: { en: 'Partly Cloudy', mr: 'अंशतः ढगाळ', hi: 'आंशिक रूप से बादल' },
    humidity: '72%',
    rainChance: '65%',
    wind: '14 km/h',
    soilMoisture: '68%',
    actionTag: { en: 'Postpone Spraying', mr: 'फवारणी पुढे ढकला', hi: 'छिड़काव टालें' },
    isWarning: true,
    advisoryText: {
      en: 'Rain likely by evening. Postpone urea & pesticide spray today. Keep drainage furrows clear.',
      mr: 'संध्याकाळी हलक्या पावसाची शक्यता. आज युरिया व कीटकनाशक फवारणी टाळा. शेतातील निचरा चर साफ ठेवा.',
      hi: 'शाम को बारिश की संभावना। आज यूरिया व कीटनाशक छिड़काव टालें। खेत की जल निकासी नालियां साफ रखें।'
    },
    audioSummary: {
      en: 'Shirur weather: 29 degrees, 65 percent rain chance. Advisory: Postpone chemical spraying today.',
      mr: 'शिरूर परिसर: २९ अंश तापमान, ६५ टक्के पाऊस शक्यता. सल्ला: आज फवारणी करू नका.',
      hi: 'शिरूर मौसम: 29 डिग्री, 65 प्रतिशत बारिश संभावना। सलाह: आज छिड़काव न करें।'
    }
  },
  baramati: {
    temp: '28°C',
    condition: { en: 'Clear Skies', mr: 'निरभ्र आकाश', hi: 'साफ मौसम' },
    humidity: '58%',
    rainChance: '20%',
    wind: '11 km/h',
    soilMoisture: '62%',
    actionTag: { en: 'Ideal for Harvesting', mr: 'काढणीस उत्तम हवामान', hi: 'कटाई हेतु उत्तम' },
    isWarning: false,
    advisoryText: {
      en: 'Favorable sunny conditions. Ideal for combine harvester in soybean and sugarcane field prep.',
      mr: 'हवामान अनुकूल व कोरडे आहे. सोयाबीन काढणी व ऊस लागवडीच्या मशागतीसाठी आज उत्तम वेळ.',
      hi: 'मौसम साफ व अनुकूल है। सोयाबीन कटाई और गन्ना रोपाई हेतु जुताई के लिए सर्वोत्तम समय।'
    },
    audioSummary: {
      en: 'Baramati weather: 28 degrees, sunny. Ideal for soybean harvesting and tractor work.',
      mr: 'बारामती परिसर: २८ अंश तापमान, कोरडे हवामान. सोयाबीन काढणी व ट्रॅक्टर मशागतीस उत्तम वेळ.',
      hi: 'बारामती मौसम: 28 डिग्री, साफ मौसम। सोयाबीन कटाई व जुताई हेतु उत्तम दिन।'
    }
  },
  lasalgaon: {
    temp: '31°C',
    condition: { en: 'Sunny & Breezy', mr: 'उष्ण व कोरडे', hi: 'धूप व तेज हवा' },
    humidity: '48%',
    rainChance: '10%',
    wind: '18 km/h',
    soilMoisture: '50%',
    actionTag: { en: 'Dry Onion Storage', mr: 'कांदा साठवणूक योग्य', hi: 'प्याज भंडारण उपयुक्त' },
    isWarning: false,
    advisoryText: {
      en: 'Low humidity and dry winds. Excellent for onion sorting, sun curing, and safe transport to APMC yards.',
      mr: 'कमी आर्द्रता व कोरडा वारा. कांदा वाळवणे, प्रतवारी करणे आणि लासलगाव बाजार समितीत विक्रीस नेण्यास उत्तम दिवस.',
      hi: 'कम नमी व सूखी हवा। प्याज सुखाने, ग्रेडिंग करने और मंडी में माल भेजने हेतु अनुकूल।'
    },
    audioSummary: {
      en: 'Lasalgaon weather: 31 degrees, dry. Best day for onion curing and transport to mandi.',
      mr: 'लासलगाव परिसर: ३१ अंश तापमान, कोरडी हवा. कांदा काढणी, वाळवणे व बाजारात विक्रीस नेण्यास उत्तम.',
      hi: 'लासलगांव मौसम: 31 डिग्री, सूखा मौसम। प्याज सुखाने व मंडी परिवहन हेतु उत्तम दिन।'
    }
  },
  sangamner: {
    temp: '30°C',
    condition: { en: 'Passing Clouds', mr: 'हलके ढग', hi: 'हल्के बादल' },
    humidity: '64%',
    rainChance: '30%',
    wind: '13 km/h',
    soilMoisture: '60%',
    actionTag: { en: 'Orchard Care', mr: 'डाळिंब बागेची काळजी', hi: 'अनार बाग देखभाल' },
    isWarning: false,
    advisoryText: {
      en: 'Mild humidity. Suitable for preventive organic spray in pomegranate and tomato beds before sunset.',
      mr: 'हवामानात किंचित दमटपणा. डाळिंब व भाजीपाला पिकांवर जैविक बुरशीनाशक फवारणीसाठी दुपारनंतरचा वेळ योग्य.',
      hi: 'हल्की नमी। अनार और सब्जियों में जैविक फफूंदनाशक छिड़काव हेतु दोपहर बाद का समय उपयुक्त।'
    },
    audioSummary: {
      en: 'Sangamner weather: 30 degrees. Good time for pomegranate orchard preventive sprays.',
      mr: 'संगमनेर परिसर: ३० अंश तापमान. डाळिंब व टोमॅटो बागेत बुरशीनाशक फवारणीसाठी योग्य वेळ.',
      hi: 'संगमनेर मौसम: 30 डिग्री। अनार बाग में फफूंदनाशक छिड़काव हेतु उपयुक्त समय।'
    }
  },
  kolhapur: {
    temp: '27°C',
    condition: { en: 'Heavy Showers', mr: 'मुसळधार पाऊस', hi: 'तेज बारिश' },
    humidity: '86%',
    rainChance: '85%',
    wind: '22 km/h',
    soilMoisture: '88%',
    actionTag: { en: 'Drain Waterlogged Fields', mr: 'निचरा त्वरित करा', hi: 'जल निकासी तुरंत करें' },
    isWarning: true,
    advisoryText: {
      en: 'High rainfall expected. Immediately open drainage trenches in sugarcane and paddy fields.',
      mr: 'मुसळधार पावसाचा इशारा. ऊस व भात खाचरात पाणी साचू नये म्हणून तातडीने बांधाचे पाणी बाहेर काढा.',
      hi: 'तेज बारिश की चेतावनी। गन्ना व धान के खेतों में तुरंत पानी निकासी का प्रबंध करें।'
    },
    audioSummary: {
      en: 'Kolhapur weather: 27 degrees, heavy rain 85 percent. Alert: Clear waterlogging immediately.',
      mr: 'कोल्हापूर परिसर: २७ अंश तापमान, ८५ टक्के मुसळधार पाऊस. इशारा: शेतातून पाण्याचा निचरा तात्काळ करा.',
      hi: 'कोल्हापुर मौसम: 27 डिग्री, 85 प्रतिशत तेज बारिश। चेतावनी: खेतों से पानी तुरंत निकालें।'
    }
  },
  akola: {
    temp: '34°C',
    condition: { en: 'Warm & Dry', mr: 'उष्ण व कोरडे', hi: 'गर्म व सूखा' },
    humidity: '42%',
    rainChance: '15%',
    wind: '12 km/h',
    soilMoisture: '46%',
    actionTag: { en: 'Inspect Cotton Crop', mr: 'कापूस बोंडअळी पाहणी', hi: 'कपास सुंडी निरीक्षण' },
    isWarning: false,
    advisoryText: {
      en: 'Warm dry spell. Monitor cotton squares for bollworm. Irrigate light black soils if drip is available.',
      mr: 'उष्ण व कोरडे वातावरण. कपाशीमध्ये बोंडअळीचा प्रादुर्भाव तपासा. ठिबक सिंचनाने हलके पाणी द्यावे.',
      hi: 'गर्म सूखा मौसम। कपास में गुलाबी सुंडी का निरीक्षण करें। ड्रिप द्वारा हल्की सिंचाई करें।'
    },
    audioSummary: {
      en: 'Akola weather: 34 degrees. Check cotton crop for pest attack and apply light drip irrigation.',
      mr: 'अकोला परिसर: ३४ अंश तापमान. कपाशीतील बोंडअळी तपासा व हलके पाणी द्या.',
      hi: 'अकोला मौसम: 34 डिग्री। कपास में कीट प्रकोप जांचें और हल्की सिंचाई दें।'
    }
  }
};

export const CATEGORIES = [
  {
    id: 'equipment',
    icon: 'Tractor',
    title: { en: 'Equipment', mr: 'शेती अवजारे', hi: 'कृषि उपकरण' },
    subtitle: { en: 'Tractors, Harvesters, Drones', mr: 'ट्रॅक्टर, हार्वेस्टर, ड्रोन', hi: 'ट्रैक्टर, हार्वेस्टर, ड्रोन' },
    count: 24,
    badge: { en: 'GPS Verified', mr: 'जीपीएस प्रमाणित', hi: 'जीपीएस प्रमाणित' },
    color: 'from-emerald-700 to-emerald-900',
    bgLight: 'bg-emerald-50 text-emerald-900 border-emerald-200'
  },
  {
    id: 'labour',
    icon: 'Users',
    title: { en: 'Farm Labour', mr: 'शेत मजूर गट', hi: 'खेत मजदूर' },
    subtitle: { en: 'Sowing, Weeding, Cutting', mr: 'पेरणी, खुरपणी, तोडणी', hi: 'बुवाई, निराई, कटाई' },
    count: 18,
    badge: { en: 'Direct Pay', mr: 'थेट मजुरी', hi: 'सीधी मजदूरी' },
    color: 'from-amber-600 to-amber-800',
    bgLight: 'bg-amber-50 text-amber-900 border-amber-200'
  },
  {
    id: 'pooling',
    icon: 'Truck',
    title: { en: 'Saha-Kisan', mr: 'वाहतूक वाटणी', hi: 'साझा वाहन' },
    subtitle: { en: 'Save 50% Truck Freight', mr: 'गाडी खर्च ५०% वाचवा', hi: 'भाड़ा 50% बचाएं' },
    count: 12,
    badge: { en: 'Save ₹650', mr: '₹६५० बचत', hi: '₹650 बचत' },
    color: 'from-blue-700 to-blue-900',
    bgLight: 'bg-blue-50 text-blue-900 border-blue-200'
  },
  {
    id: 'storage',
    icon: 'Warehouse',
    title: { en: 'Cold Storage', mr: 'शितगृह व गोदाम', hi: 'कोल्ड स्टोरेज' },
    subtitle: { en: 'Onion Chawl & Silos', mr: 'कांदा चाळ व सायलो', hi: 'प्याज गोदाम' },
    count: 9,
    badge: { en: 'Govt Loan', mr: 'तारण कर्ज हमी', hi: 'ऋण सुविधा' },
    color: 'from-teal-700 to-teal-900',
    bgLight: 'bg-teal-50 text-teal-900 border-teal-200'
  },
  {
    id: 'sos',
    icon: 'Wrench',
    title: { en: 'Mechanic SOS', mr: 'मेकॅनिक SOS', hi: 'मिस्त्री SOS' },
    subtitle: { en: '15-Min Breakdown Dispatch', mr: 'शेतात १५ मिनिटांत दुरुस्ती', hi: 'खेत में 15 मिनट मदद' },
    count: 15,
    badge: { en: 'Emergency 24x7', mr: '२४ तास सेवा', hi: '24 घंटे सेवा' },
    color: 'from-rose-600 to-rose-800',
    bgLight: 'bg-rose-50 text-rose-900 border-rose-200'
  }
];

export const SERVICE_LISTINGS = [
  // --- 1. SHIRUR (PUNE) LISTINGS ---
  {
    id: 'srv-1',
    locationId: 'shirur',
    category: 'equipment',
    title: { en: 'Mahindra 575 DI (45 HP) + Rotavator', mr: 'महिंद्रा ५७५ डीआय + रोटाव्हेटर', hi: 'महिंद्रा 575 डीआई + रोटावेटर' },
    ownerName: { en: 'Dnyaneshwar Jadhav', mr: 'ज्ञानेश्वर जाधव', hi: 'ज्ञानेश्वर जाधव' },
    phone: '+91 98220 54123',
    village: { en: 'Shikrapur (3.2 km)', mr: 'शिक्रापूर (३.२ किमी)', hi: 'शिक्रापुर (3.2 किमी)' },
    rate: 850,
    unit: { en: '₹ / Hour', mr: '₹ / तास', hi: '₹ / घंटा' },
    rating: 4.9,
    reviewCount: 38,
    verified: true,
    availableToday: true,
    hasDriver: true,
    features: {
      en: ['Fuel Included', 'Experienced Driver', '7-Foot Heavy Rotavator'],
      mr: ['डिझेल समाविष्ट', 'अनुभवी चालक उपलब्ध', '७ फुटी अवजड रोटाव्हेटर'],
      hi: ['डीजल शामिल', 'अनुभवी चालक उपलब्ध', '7 फीट रोटावेटर']
    },
    audioText: {
      en: 'Mahindra 575 DI Tractor with Rotavator at Shikrapur. 850 rupees per hour with driver.',
      mr: 'शिक्रापूर येथे महिंद्रा ५७५ ट्रॅक्टर रोटाव्हेटरसह उपलब्ध. दर ८५० रुपये प्रति तास ड्रायव्हरसह.',
      hi: 'शिक्रापुर में महिंद्रा 575 ट्रैक्टर रोटावेटर के साथ। किराया 850 रुपये प्रति घंटा।'
    }
  },
  {
    id: 'srv-2',
    locationId: 'shirur',
    category: 'equipment',
    title: { en: 'Agastha Precision Spray Drone (16L)', mr: 'अगस्त्य फवारणी ड्रोन (१६L)', hi: 'अगस्त्य छिड़काव ड्रोन (16L)' },
    ownerName: { en: 'Vikas Agro Tech (DGCA Pilot)', mr: 'विकास ॲग्रो टेक (डीजीसीए पायलट)', hi: 'विकास एग्रो टेक (डीजीसीए पायलट)' },
    phone: '+91 97654 33210',
    village: { en: 'Ranjangaon (4.0 km)', mr: 'रांजणगाव (४.० किमी)', hi: 'रांजणगांव (4.0 किमी)' },
    rate: 450,
    unit: { en: '₹ / Acre', mr: '₹ / एकर', hi: '₹ / एकड़' },
    rating: 4.8,
    reviewCount: 42,
    verified: true,
    availableToday: true,
    hasDriver: true,
    features: {
      en: ['1 Acre in 8 Mins', 'Saves 30% Pesticide', 'Nano Urea & Fungicide'],
      mr: ['८ मिनिटांत १ एकर', '३०% औषध बचत', 'नॅनो युरिया व बुरशीनाशक'],
      hi: ['8 मिनट में 1 एकड़', '30% दवा बचत', 'नैनो यूरिया उपयुक्त']
    },
    audioText: {
      en: 'Precision Agri Drone Spray. 450 rupees per acre. Fast spray in 8 minutes.',
      mr: 'शेती फवारणी ड्रोन. अवघ्या ८ मिनिटांत एकरभर फवारणी. दर ४५० रुपये प्रति एकर.',
      hi: 'कृषि छिड़काव ड्रोन। 8 मिनट में 1 एकड़। किराया 450 रुपये प्रति एकड़।'
    }
  },
  {
    id: 'srv-3',
    locationId: 'shirur',
    category: 'labour',
    title: { en: 'Renuka Mahila Krishi Gat (10 Workers)', mr: 'रेणुका महिला कृषी गट (१० मजूर)', hi: 'रेणुका महिला समूह (10 मजदूर)' },
    ownerName: { en: 'Sunita Tai Gaikwad', mr: 'सुनिता ताई गायकवाड', hi: 'सुनीता ताई गायकवाड़' },
    phone: '+91 99214 77651',
    village: { en: 'Koregaon Bhima (5.1 km)', mr: 'कोरेगाव भीमा (५.१ किमी)', hi: 'कोरेगांव भीमा (5.1 किमी)' },
    rate: 350,
    unit: { en: '₹ / Day', mr: '₹ / दिवस', hi: '₹ / दिन' },
    rating: 4.9,
    reviewCount: 52,
    verified: true,
    availableToday: true,
    hasDriver: false,
    features: {
      en: ['Weeding & Onion Planting', '10 Experienced Workers', '8 AM - 4 PM'],
      mr: ['खुरपणी व कांदा लागवड', '१० अनुभवी महिला मजूर', 'वेळ: सकाळी ८ ते दुपारी ४'],
      hi: ['निराई व रोपाई', '10 अनुभवी महिला मजदूर', 'सुबह 8 से 4']
    },
    audioText: {
      en: 'Renuka Mahila Krishi Gat with 10 workers for weeding and transplanting. Rate 350 rupees.',
      mr: 'रेणुका महिला कृषी गट. खुरपणी व कांदा लागवडीसाठी १० महिला मजूर. दर ३५० रुपये प्रति दिवस.',
      hi: 'रेणुका महिला समूह। निराई व रोपाई हेतु 10 मजदूर। दर 350 रुपये प्रतिदिन।'
    }
  },
  {
    id: 'srv-4',
    locationId: 'shirur',
    category: 'pooling',
    title: { en: 'Bolero Maxi Truck to Pune APMC (1.8T)', mr: 'बोलेरो ट्रक पुणे मार्केट यार्ड (१.८T)', hi: 'बोलेरो ट्रक पुणे मंडी (1.8T)' },
    ownerName: { en: 'Popat Sonawane', mr: 'पोपट सोनावणे', hi: 'पोपट सोनावने' },
    phone: '+91 97300 44199',
    village: { en: 'Shirur Bypass (2.1 km)', mr: 'शिरूर बायपास (२.१ किमी)', hi: 'शिरूर बाईपास (2.1 किमी)' },
    rate: 22,
    unit: { en: '₹ / KM', mr: '₹ / किमी', hi: '₹ / किमी' },
    rating: 4.9,
    reviewCount: 76,
    verified: true,
    availableToday: true,
    hasDriver: true,
    features: {
      en: ['Direct to Pune Gultekdi', 'Waterproof Cover', 'Electronic Weight Slip'],
      mr: ['पुणे मार्केट यार्ड थेट वाहतूक', 'वॉटरप्रूफ ताडपत्री', 'काटा पावती हमी'],
      hi: ['पुणे मंडी सीधी डिलीवरी', 'वाटरप्रूफ तिरपाल', 'कांटा पर्ची सुविधा']
    },
    audioText: {
      en: 'Popat Sonawane Bolero Truck. Safe transport to Pune APMC. 22 rupees per kilometer.',
      mr: 'पोपट सोनावणे यांचा बोलेरो ट्रक. पुणे मार्केटयार्ड थेट वाहतूक. दर २२ रुपये प्रति किलोमीटर.',
      hi: 'पोपट सोनावने का बोलेरो ट्रक। पुणे मंडी सुरक्षित परिवहन। दर 22 रुपये प्रति किमी।'
    }
  },

  // --- 2. BARAMATI (PUNE) LISTINGS ---
  {
    id: 'srv-b1',
    locationId: 'baramati',
    category: 'equipment',
    title: { en: 'John Deere 5310 (55 HP) + Heavy MB Plough', mr: 'जॉन डीअर ५३१० + २-बॉटम नांगर', hi: 'जॉन डीयर 5310 + एमबी प्लाउ' },
    ownerName: { en: 'Bhausaheb Jagtap', mr: 'भाऊसाहेब जगताप', hi: 'भाऊसाहेब जगताप' },
    phone: '+91 98224 88123',
    village: { en: 'Baramati MIDC (2.5 km)', mr: 'बारामती एमआयडीसी (२.५ किमी)', hi: 'बारामती एमआईडीसी (2.5 किमी)' },
    rate: 1100,
    unit: { en: '₹ / Hour', mr: '₹ / तास', hi: '₹ / घंटा' },
    rating: 5.0,
    reviewCount: 45,
    verified: true,
    availableToday: true,
    hasDriver: true,
    features: {
      en: ['Heavy 4WD Power', 'Deep Soil Inversion', 'Heavy Black Soil Ready'],
      mr: ['४-व्हील ड्राइव्ह ताकद', 'काळ्या जमिनीत खोल नांगरट', 'अनुभवी ड्रायव्हर'],
      hi: ['4WD ताकत', 'गहरी जुताई', 'भारी मिट्टी हेतु उत्तम']
    },
    audioText: {
      en: 'John Deere 5310 tractor with plough at Baramati. Rate 1100 rupees per hour.',
      mr: 'बारामती येथे जॉन डीअर ५३१० ट्रॅक्टर नांगरासह उपलब्ध. दर ११०० रुपये प्रति तास.',
      hi: 'बारामती में जॉन डीयर 5310 ट्रैक्टर जुताई के लिए उपलब्ध। किराया 1100 रुपये प्रति घंटा।'
    }
  },
  {
    id: 'srv-b2',
    locationId: 'baramati',
    category: 'labour',
    title: { en: 'Sharad Krishi Sugarcane Cutting Squad (14 Workers)', mr: 'शरद कृषी ऊस तोडणी टोळी (१४ मजूर)', hi: 'शरद कृषि गन्ना कटाई टोली (14 मजदूर)' },
    ownerName: { en: 'Dattatray Shinde', mr: 'दत्तात्रय शिंदे', hi: 'दत्तात्रेय शिंदे' },
    phone: '+91 94220 33499',
    village: { en: 'Malegaon BK (4.8 km)', mr: 'माळेगाव बुद्रुक (४.८ किमी)', hi: 'मालेगांव (4.8 किमी)' },
    rate: 460,
    unit: { en: '₹ / Ton', mr: '₹ / टन', hi: '₹ / टन' },
    rating: 4.9,
    reviewCount: 58,
    verified: true,
    availableToday: true,
    hasDriver: false,
    features: {
      en: ['Ground Level Cutting', 'Trolley Loading Included', 'Quick Factory Supply'],
      mr: ['जमिनीलगत स्वच्छ तोडणी', 'ट्रॅक्टर ट्रॉली भरणी समाविष्ट', 'कारखान्यासाठी त्वरित पुरवठा'],
      hi: ['जमीन से सटाकर कटाई', 'ट्रॉली लदाई शामिल', 'फैक्ट्री सप्लाई']
    },
    audioText: {
      en: 'Sharad Sugarcane Cutting squad with 14 workers at Malegaon Baramati. Rate 460 rupees per ton.',
      mr: 'माळेगाव बारामती येथील १४ मजुरांची ऊस तोडणी टोळी. दर ४६० रुपये प्रति टन भरणीसह.',
      hi: 'मालेगांव बारामती में 14 मजदूरों की गन्ना कटाई टोली। दर 460 रुपये प्रति टन लदाई सहित।'
    }
  },
  {
    id: 'srv-b3',
    locationId: 'baramati',
    category: 'equipment',
    title: { en: 'Kubota Combine Harvester (Soybean & Wheat)', mr: 'कुबोटा कंबाईन हार्वेस्टर (सोयाबीन व गहू)', hi: 'कुबोटा कंबाइन हार्वेस्टर' },
    ownerName: { en: 'Suresh Shinde', mr: 'सुरेश शिंदे', hi: 'सुरेश शिंदे' },
    phone: '+91 94220 55198',
    village: { en: 'Supe (7.1 km)', mr: 'सुपे (७.१ किमी)', hi: 'सुपे (7.1 किमी)' },
    rate: 2100,
    unit: { en: '₹ / Acre', mr: '₹ / एकर', hi: '₹ / एकड़' },
    rating: 5.0,
    reviewCount: 64,
    verified: true,
    availableToday: true,
    hasDriver: true,
    features: {
      en: ['Zero Grain Loss', 'Fast 1 Acre / 45 Mins', 'Grain Tank Unloading'],
      mr: ['धान्याचे शून्य नुकसान', '४५ मिनिटांत १ एकर काढणी', 'स्वच्छ दाणा व मोठी टाकी'],
      hi: ['शून्य नुकसान', '45 मिनट में 1 एकड़', 'अनाज साफ करने की सुविधा']
    },
    audioText: {
      en: 'Kubota Combine Harvester for clean harvesting. Rate is 2100 rupees per acre.',
      mr: 'कुबोटा कंबाईन हार्वेस्टर. सोयाबीन काढणीसाठी. दर २,१०० रुपये प्रति एकर.',
      hi: 'कुबोटा कंबाइन हार्वेस्टर। सोयाबीन कटाई हेतु किराया 2100 रुपये प्रति एकड़।'
    }
  },
  {
    id: 'srv-b4',
    locationId: 'baramati',
    category: 'pooling',
    title: { en: 'Eicher Pro 14-Feet Agri Cargo Tempo to Pune (3.5T)', mr: 'आयशर १४-फुटी शेती माल टेम्पो पुणे (३.५T)', hi: 'आयशर 14-फीट कृषि कार्गो टेम्पो पुणे (3.5T)' },
    ownerName: { en: 'Kailas Taware', mr: 'कैलास तावरे', hi: 'कैलाश तावरे' },
    phone: '+91 98229 66100',
    village: { en: 'Baramati Phata (1.8 km)', mr: 'बारामती फाटा (१.८ किमी)', hi: 'बारामती फाटा (1.8 किमी)' },
    rate: 26,
    unit: { en: '₹ / KM', mr: '₹ / किमी', hi: '₹ / किमी' },
    rating: 4.8,
    reviewCount: 51,
    verified: true,
    availableToday: true,
    hasDriver: true,
    features: {
      en: ['Baramati to Pune Market Yard', 'Tarpaulin Tied', 'Return Load Discount'],
      mr: ['बारामती ते पुणे मार्केट यार्ड', 'ताडपत्री सुरक्षित बांधणी', 'रिटर्न भाडे सवलत'],
      hi: ['बारामती से पुणे मंडी', 'तिरपाल सुरक्षा', 'वापसी भाड़ा छूट']
    },
    audioText: {
      en: 'Eicher 14-feet cargo tempo from Baramati to Pune. Rate 26 rupees per km.',
      mr: 'बारामती ते पुणे आयशर टेम्पो. सुरक्षित वाहतूक. दर २६ रुपये प्रति किलोमीटर.',
      hi: 'बारामती से पुणे आयशर टेम्पो। सुरक्षित परिवहन। दर 26 रुपये प्रति किमी।'
    }
  },

  // --- 3. LASALGAON (NASHIK) LISTINGS ---
  {
    id: 'srv-l1',
    locationId: 'lasalgaon',
    category: 'storage',
    title: { en: 'Lasalgaon Scientific Aerated Onion Chawl', mr: 'लासलगाव शास्त्रीय हवेशीर कांदा चाळ', hi: 'लासलगांव वैज्ञानिक हवादार प्याज गोदाम' },
    ownerName: { en: 'Kisan Krishi Warehouse', mr: 'किसान कृषी वेअरहाऊस', hi: 'किसान कृषि वेयरहाउस' },
    phone: '+91 94222 10988',
    village: { en: 'Lasalgaon APMC Road (1.2 km)', mr: 'लासलगाव मार्केट रस्ता (१.२ किमी)', hi: 'लासलगांव मंडी रोड (1.2 किमी)' },
    rate: 65,
    unit: { en: '₹ / Qtl / Mo', mr: '₹ / क्विंटल / महिना', hi: '₹ / क्विंटल / महीना' },
    rating: 4.9,
    reviewCount: 88,
    verified: true,
    availableToday: true,
    hasDriver: false,
    features: {
      en: ['Zero Rotting Aeration', 'Bank Pledge Loan (e-NWR)', '24x7 Security & Insurance'],
      mr: ['सडरोधक विशेष हवा खेळती प्रणाली', 'तारण पावतीवर बँक कर्ज सुविधा', '२४ तास सीसीटीव्ही व विमा'],
      hi: ['सड़न-रोधी वेंटिलेशन', 'गोदाम रसीद पर बैंक ऋण', '24 घंटे सुरक्षा व बीमा']
    },
    audioText: {
      en: 'Lasalgaon Scientific Onion Chawl. 65 rupees per quintal per month. Keeps onions safe from rotting.',
      mr: 'लासलगाव शास्त्रीय कांदा चाळ. दर ६५ रुपये प्रति क्विंटल प्रति महिना. सड न होता कांदा सुरक्षित राहतो.',
      hi: 'लासलगांव वैज्ञानिक प्याज गोदाम। दर 65 रुपये प्रति क्विंटल। सड़न मुक्त सुरक्षित भंडारण।'
    }
  },
  {
    id: 'srv-l2',
    locationId: 'lasalgaon',
    category: 'pooling',
    title: { en: '10-Wheeler Bulk Onion Truck to Vashi APMC (12T)', mr: '१०-चाकी थेट वाशी मार्केट कांदा ट्रक (१२T)', hi: '10-चक्का वाशी मंडी प्याज ट्रक (12T)' },
    ownerName: { en: 'Rafiq Bhai Transporter', mr: 'रफिक भाई ट्रान्सपोर्ट', hi: 'रफीक भाई ट्रांसपोर्ट' },
    phone: '+91 98905 66789',
    village: { en: 'Niphad Road (3.0 km)', mr: 'निफाड रस्ता (३.० किमी)', hi: 'निफाड रोड (3.0 किमी)' },
    rate: 55,
    unit: { en: '₹ / Quintal', mr: '₹ / क्विंटल', hi: '₹ / क्विंटल' },
    rating: 4.8,
    reviewCount: 92,
    verified: true,
    availableToday: true,
    hasDriver: true,
    features: {
      en: ['Direct to Vashi Navi Mumbai', 'Save ₹40/Qtl vs Solo', 'Weighbridge Certified'],
      mr: ['वाशी नवी मुंबई थेट लिलाव', 'एकट्या गाडीपेक्षा ₹४० बचत', 'काटा पावतीसह सुरक्षित'],
      hi: ['वाशी मुंबई सीधी नीलामी', 'अकेले से ₹40 बचत', 'कांटा पर्ची सहित']
    },
    audioText: {
      en: '10-wheeler bulk onion truck to Vashi. Shared group rate 55 rupees per quintal.',
      mr: 'वाशी मार्केटसाठी १०-चाकी सामाईक ट्रक. गट वाटणी दर ५५ रुपये प्रति क्विंटल.',
      hi: 'वाशी मंडी हेतु 10-चक्का साझा ट्रक। दर 55 रुपये प्रति क्विंटल।'
    }
  },
  {
    id: 'srv-l3',
    locationId: 'lasalgaon',
    category: 'equipment',
    title: { en: 'Swaraj 744 FE (48 HP) + Onion Bed Maker', mr: 'स्वराज ७४४ एफई + कांदा गादीवाफा यंत्र', hi: 'स्वराज 744 एफई + प्याज बेड मेकर' },
    ownerName: { en: 'Pravin Holkar', mr: 'प्रवीण होळकर', hi: 'प्रवीण होलकर' },
    phone: '+91 98500 77123',
    village: { en: 'Kotamgaon (2.4 km)', mr: 'कोतमगाव (२.४ किमी)', hi: 'कोतमगांव (2.4 किमी)' },
    rate: 900,
    unit: { en: '₹ / Hour', mr: '₹ / तास', hi: '₹ / घंटा' },
    rating: 4.9,
    reviewCount: 39,
    verified: true,
    availableToday: true,
    hasDriver: true,
    features: {
      en: ['Uniform Drip Beds', 'Fuel Included', 'Fast 4-Foot Bed Layout'],
      mr: ['समान ठिबक गादीवाफे तयार करणे', 'डिझेल समाविष्ट', '४ फुटी गादीवाफा परफेक्ट'],
      hi: ['एक समान ड्रिप बेड तैयार करना', 'डीजल शामिल', '4 फीट बेड लेआउट']
    },
    audioText: {
      en: 'Swaraj 744 tractor with onion bed maker at Lasalgaon. 900 rupees per hour.',
      mr: 'लासलगाव येथे स्वराज ७४४ ट्रॅक्टर कांदा गादीवाफा यंत्रासह. दर ९०० रुपये प्रति तास.',
      hi: 'लासलगांव में स्वराज 744 ट्रैक्टर प्याज बेड मेकर के साथ। किराया 900 रुपये प्रति घंटा।'
    }
  },
  {
    id: 'srv-l4',
    locationId: 'lasalgaon',
    category: 'labour',
    title: { en: 'Nashik Grape & Onion Labour Squad (12 Workers)', mr: 'नाशिक द्राक्ष व कांदा तोडणी मजूर गट (१२ मजूर)', hi: 'नासिक अंगूर व प्याज मजदूर टोली (12 मजदूर)' },
    ownerName: { en: 'Kalu Ram Barde', mr: 'काळू राम बर्डे', hi: 'कालू राम बर्डे' },
    phone: '+91 94030 88221',
    village: { en: 'Vinchur (4.5 km)', mr: 'विंचूर (४.५ किमी)', hi: 'विंचूर (4.5 किमी)' },
    rate: 380,
    unit: { en: '₹ / Day', mr: '₹ / दिवस', hi: '₹ / दिन' },
    rating: 4.8,
    reviewCount: 47,
    verified: true,
    availableToday: true,
    hasDriver: false,
    features: {
      en: ['Grape Harvesting & Export Packing', 'Onion Sorting & Bagging', 'Expert Labour'],
      mr: ['द्राक्ष तोडणी व एक्स्पोर्ट पॅकिंग', 'कांदा प्रतवारी व गोणी भरणे', 'अनुभवी मजूर'],
      hi: ['अंगूर कटाई व एक्सपोर्ट पैकिंग', 'प्याज छंटाई व बोरी भराई', 'अनुभवी टीम']
    },
    audioText: {
      en: 'Expert farm labour squad for grape harvesting and onion grading. Rate 380 rupees per day.',
      mr: 'द्राक्ष व कांदा तोडणीसाठी १२ अनुभवी मजुरांचा गट. दर ३८० रुपये प्रति दिवस.',
      hi: 'अंगूर व प्याज कटाई हेतु 12 अनुभवी मजदूर। दर 380 रुपये प्रतिदिन।'
    }
  },

  // --- 4. SANGAMNER (AHILYANAGAR) LISTINGS ---
  {
    id: 'srv-s1',
    locationId: 'sangamner',
    category: 'equipment',
    title: { en: 'Sonalika Tiger 50 HP + Orchard Mist Blower', mr: 'सोनालिका टायगर ५० HP + डाळिंब मिस्ट ब्लोअर', hi: 'सोनालिका 50 HP + मिस्ट ब्लोअर' },
    ownerName: { en: 'Eknath Thorat', mr: 'एकनाथ थोरात', hi: 'एकनाथ थोरात' },
    phone: '+91 98505 44321',
    village: { en: 'Akole Phata (3.5 km)', mr: 'अकोले फाटा (३.५ किमी)', hi: 'अकोले फाटा (3.5 किमी)' },
    rate: 750,
    unit: { en: '₹ / Hour', mr: '₹ / तास', hi: '₹ / घंटा' },
    rating: 4.8,
    reviewCount: 31,
    verified: true,
    availableToday: true,
    hasDriver: true,
    features: {
      en: ['Orchard High Pressure Mist', 'Pomegranate & Tomato Spec', 'Fuel Included'],
      mr: ['फळबागेसाठी अतिसूक्ष्म फवारा', 'डाळिंब व टोमॅटोसाठी विशेष', 'डिझेल समाविष्ट'],
      hi: ['बागवानी हेतु हाई प्रेशर स्प्रे', 'अनार व टमाटर विशेष', 'डीजल शामिल']
    },
    audioText: {
      en: 'Sonalika tractor with mist blower for pomegranate at Sangamner. Rate 750 rupees per hour.',
      mr: 'संगमनेर येथे डाळिंब बागेसाठी मिस्ट ब्लोअर ट्रॅक्टर उपलब्ध. दर ७५० रुपये प्रति तास.',
      hi: 'संगमनेर में अनार बाग हेतु मिस्ट ब्लोअर ट्रैक्टर उपलब्ध। किराया 750 रुपये प्रति घंटा।'
    }
  },
  {
    id: 'srv-s2',
    locationId: 'sangamner',
    category: 'labour',
    title: { en: 'Sahyadri Pomegranate Pruning & Spray Team (8 Workers)', mr: 'सह्याद्री डाळिंब छाटणी व फवारणी टोळी (८ मजूर)', hi: 'सह्याद्री अनार कटाई व स्प्रे टीम (8 मजदूर)' },
    ownerName: { en: 'Santosh Tambe', mr: 'संतोष तांबे', hi: 'संतोष तांबे' },
    phone: '+91 98501 33200',
    village: { en: 'Talegaon Dighe (4.0 km)', mr: 'तळेगाव दिघे (४.० किमी)', hi: 'तलेगांव दिघे (4.0 किमी)' },
    rate: 420,
    unit: { en: '₹ / Day', mr: '₹ / दिवस', hi: '₹ / दिन' },
    rating: 4.9,
    reviewCount: 36,
    verified: true,
    availableToday: true,
    hasDriver: false,
    features: {
      en: ['Expert Pomegranate Pruning', 'Organic Spray Application', 'Bahar Management'],
      mr: ['डाळिंब छाटणीत निष्णात', 'जैविक फवारणी व पेस्टिंग', 'बहार व्यवस्थापन तज्ज्ञ'],
      hi: ['अनार कटाई छंटाई विशेषज्ञ', 'जैविक छिड़काव', 'बहार प्रबंधन']
    },
    audioText: {
      en: 'Sahyadri team of 8 workers for pomegranate orchard care. Rate 420 rupees per day.',
      mr: 'डाळिंब बागेच्या छाटणी व फवारणीसाठी सह्याद्री मजूर टोळी. दर ४२० रुपये प्रति दिवस.',
      hi: 'अनार बाग छंटाई हेतु 8 मजदूरों की टोली। दर 420 रुपये प्रतिदिन।'
    }
  },
  {
    id: 'srv-s3',
    locationId: 'sangamner',
    category: 'pooling',
    title: { en: 'Tata 407 Pomegranate Freight to Vashi APMC (2.5T)', mr: 'टाटा ४०७ डाळिंब व भाजीपाला गाडी वाशी (२.५T)', hi: 'टाटा 407 अनार व सब्जी वाहन वाशी (2.5T)' },
    ownerName: { en: 'Machhindra Landge', mr: 'मच्छिंद्र लांडगे', hi: 'मच्छिंद्र लांडगे' },
    phone: '+91 97633 44109',
    village: { en: 'Sangamner Bypass (1.5 km)', mr: 'संगमनेर बायपास (१.५ किमी)', hi: 'संगमनेर बाईपास (1.5 किमी)' },
    rate: 24,
    unit: { en: '₹ / KM', mr: '₹ / किमी', hi: '₹ / किमी' },
    rating: 4.9,
    reviewCount: 68,
    verified: true,
    availableToday: true,
    hasDriver: true,
    features: {
      en: ['Cushioned Crates Storage', 'Direct Vashi APMC Delivery', 'Live GPS Tracking'],
      mr: ['क्रेट्स व्यवस्थित रचून सुरक्षित वाहतूक', 'थेट वाशी मार्केट लिलाव', 'थेट जीपीएस ट्रॅकिंग'],
      hi: ['क्रेट्स में सुरक्षित परिवहन', 'सीधे वाशी मंडी', 'लाइव जीपीएस']
    },
    audioText: {
      en: 'Tata 407 for safe transport of pomegranate to Vashi. Rate 24 rupees per km.',
      mr: 'डाळिंब वाहतुकीसाठी टाटा ४०७ गाडी. वाशी मार्केटसाठी सुरक्षित. दर २४ रुपये प्रति किमी.',
      hi: 'अनार सुरक्षित परिवहन हेतु टाटा 407। दर 24 रुपये प्रति किमी।'
    }
  },
  {
    id: 'srv-s4',
    locationId: 'sangamner',
    category: 'storage',
    title: { en: 'Godavari Pre-Cooling & Fruit Storage Chamber', mr: 'गोदावरी प्री-कुलिंग व फळे शितगृह कक्ष', hi: 'गोदावरी प्री-कूलिंग व फल कोल्ड स्टोरेज' },
    ownerName: { en: 'Sangam Agro Cold Care', mr: 'संगम ॲग्रो कोल्ड केअर', hi: 'संगम एग्रो कोल्ड केयर' },
    phone: '+91 94230 11988',
    village: { en: 'Pravanagar Road (2.2 km)', mr: 'प्रवरानगर रस्ता (२.२ किमी)', hi: 'प्रवरानगर रोड (2.2 किमी)' },
    rate: 80,
    unit: { en: '₹ / Crate / Mo', mr: '₹ / क्रेट / महिना', hi: '₹ / क्रेट / महीना' },
    rating: 4.9,
    reviewCount: 42,
    verified: true,
    availableToday: true,
    hasDriver: false,
    features: {
      en: ['Temperature Controlled (2°C - 8°C)', 'Pomegranate & Tomato Safe', 'Govt Subsidized'],
      mr: ['तापमान नियंत्रण (२°C ते ८°C)', 'डाळिंब व टोमॅटो ताजे राहतात', 'शासकीय सवलत दर'],
      hi: ['तापमान नियंत्रण (2°C से 8°C)', 'अनार व टमाटर ताजे', 'सरकारी सब्सिडी']
    },
    audioText: {
      en: 'Godavari Pre-Cooling cold chamber. 80 rupees per crate per month. Keeps fruits fresh.',
      mr: 'गोदावरी प्री-कुलिंग शितगृह. दर ८० रुपये प्रति क्रेट प्रति महिना. फळे ताजी राहतात.',
      hi: 'गोदावरी प्री-कूलिंग कोल्ड स्टोरेज। दर 80 रुपये प्रति क्रेट। फल ताजे रहते हैं।'
    }
  },

  // --- 5. KOLHAPUR LISTINGS ---
  {
    id: 'srv-k1',
    locationId: 'kolhapur',
    category: 'equipment',
    title: { en: 'Kubota 4WD Heavy Mud Puddler & Paddy Transplanter', mr: 'कुबोटा ४WD चिखलणी ट्रॅक्टर व भात लावणी यंत्र', hi: 'कुबोटा 4WD धान रोपाई मशीन' },
    ownerName: { en: 'Santosh Patil', mr: 'संतोष पाटील', hi: 'संतोष पाटिल' },
    phone: '+91 98230 77112',
    village: { en: 'Karveer Shiroli (2.8 km)', mr: 'करवीर शिरोली (२.८ किमी)', hi: 'करवीर शिरोली (2.8 किमी)' },
    rate: 1050,
    unit: { en: '₹ / Hour', mr: '₹ / तास', hi: '₹ / घंटा' },
    rating: 4.9,
    reviewCount: 62,
    verified: true,
    availableToday: true,
    hasDriver: true,
    features: {
      en: ['Paddy Wet Mud Specialist', 'Cage Wheels Fitted', 'Zero Slippage in Mud'],
      mr: ['भात खाचरातील चिखलणीत तज्ज्ञ', 'केज व्हील बसवलेले', 'खोल चिखलात विनाअडथळा काम'],
      hi: ['धान कीचड़ जुताई में माहिर', 'केज व्हील फिटेड', 'गीली मिट्टी में आसान काम']
    },
    audioText: {
      en: 'Kubota 4WD Paddy tractor at Kolhapur Karveer. 1050 rupees per hour with driver.',
      mr: 'कोल्हापूर करवीर येथे कुबोटा भात खाचर चिखलणी ट्रॅक्टर उपलब्ध. दर १०५० रुपये प्रति तास.',
      hi: 'कोल्हापुर करवीर में कुबोटा धान रोपाई व जुताई ट्रैक्टर। किराया 1050 रुपये प्रति घंटा।'
    }
  },
  {
    id: 'srv-k2',
    locationId: 'kolhapur',
    category: 'labour',
    title: { en: 'Panchganga Sugarcane Cutting & Trolley Squad (16 Workers)', mr: 'पंचगंगा ऊस तोडणी व ट्रॉली भरणी टोळी (१६ मजूर)', hi: 'पंचगंगा गन्ना कटाई टोली (16 मजदूर)' },
    ownerName: { en: 'Tanaji Kamble', mr: 'तानाजी कांबळे', hi: 'तानाजी कांबले' },
    phone: '+91 98234 55901',
    village: { en: 'Ghandhinagar (3.2 km)', mr: 'गांधीनगर (३.२ किमी)', hi: 'गांधीनगर (3.2 किमी)' },
    rate: 450,
    unit: { en: '₹ / Ton', mr: '₹ / टन', hi: '₹ / टन' },
    rating: 4.9,
    reviewCount: 71,
    verified: true,
    availableToday: true,
    hasDriver: false,
    features: {
      en: ['Sugar Factory Registered', 'Clean Ground Level Cut', 'Fast 2 Trolleys Daily'],
      mr: ['साखर कारखाना नोंदणीकृत', 'जमिनीलगत स्वच्छ तोडणी', 'रोज २ ट्रॉली भरण्याची क्षमता'],
      hi: ['चीनी मिल पंजीकृत', 'जमीन से सटाकर कटाई', 'प्रतिदिन 2 ट्रॉली क्षमता']
    },
    audioText: {
      en: 'Panchganga Sugarcane cutting squad with 16 workers. Rate 450 rupees per ton.',
      mr: 'पंचगंगा ऊस तोडणी टोळी. १६ अनुभवी मजूर. दर ४५० रुपये प्रति टन भरणीसह.',
      hi: 'पंचगंगा गन्ना कटाई टोली। 16 मजदूर। दर 450 रुपये प्रति टन लदाई सहित।'
    }
  },
  {
    id: 'srv-k3',
    locationId: 'kolhapur',
    category: 'pooling',
    title: { en: '10-Ton Heavy Jaggery & Cane Transport Truck', mr: '१०-टन गुळ व शेतीमाल वाहतूक अवजड ट्रक', hi: '10-टन गुड़ व कृषि माल भारी ट्रक' },
    ownerName: { en: 'Maruti Chougule', mr: 'मारुती चौगुले', hi: 'मारुति चौगुले' },
    phone: '+91 97651 88200',
    village: { en: 'Shahu Market Yard (1.1 km)', mr: 'शाहू मार्केट यार्ड परिसर (१.१ किमी)', hi: 'शाहू मंडी परिसर (1.1 किमी)' },
    rate: 28,
    unit: { en: '₹ / KM', mr: '₹ / किमी', hi: '₹ / किमी' },
    rating: 4.8,
    reviewCount: 54,
    verified: true,
    availableToday: true,
    hasDriver: true,
    features: {
      en: ['Shahu Market Yard Direct', 'Heavy Shock-Free Bed', 'Safe Jaggery Blocks Handling'],
      mr: ['शाहू मार्केट यार्ड थेट वाहतूक', 'गुळाच्या ढेपा सुरक्षित राहण्यासाठी ताडपत्री', 'काटा पावती हमी'],
      hi: ['शाहू मंडी सीधी डिलीवरी', 'गुड़ सुरक्षित परिवहन', 'कांटा पर्ची सुविधा']
    },
    audioText: {
      en: 'Maruti Chougule 10-Ton heavy transport truck in Kolhapur. 28 rupees per km.',
      mr: 'मारुती चौगुले यांचा १० टन अवजड ट्रक. कोल्हापूर शाहू मार्केट थेट वाहतूक. दर २८ रुपये प्रति किमी.',
      hi: 'मारुति चौगुले का 10 टन ट्रक। कोल्हापुर शाहू मंडी परिवहन। दर 28 रुपये प्रति किमी।'
    }
  },
  {
    id: 'srv-k4',
    locationId: 'kolhapur',
    category: 'storage',
    title: { en: 'Kolhapur Jaggery & Spice Moisture-Proof Warehouse', mr: 'कोल्हापूर गुळ व मसाला ओलावा-मुक्त गोदाम', hi: 'कोल्हापुर गुड़ व मसाला सुरक्षित गोदाम' },
    ownerName: { en: 'Shree Shahu Agri Warehousing', mr: 'श्री शाहू कृषी वेअरहाऊसिंग', hi: 'श्री शाहू कृषि वेयरहाउसिंग' },
    phone: '+91 94220 99451',
    village: { en: 'Karveer MIDC (3.5 km)', mr: 'करवीर एमआयडीसी (३.५ किमी)', hi: 'करवीर एमआईडीसी (3.5 किमी)' },
    rate: 40,
    unit: { en: '₹ / Bag / Mo', mr: '₹ / पोते / महिना', hi: '₹ / बोरी / महीना' },
    rating: 4.9,
    reviewCount: 63,
    verified: true,
    availableToday: true,
    hasDriver: false,
    features: {
      en: ['100% Moisture Free', 'Preserves Jaggery Color & Shine', 'Fire & Theft Insured'],
      mr: ['१००% ओलावा मुक्त गोदाम', 'गुळाचा रंग व दर्जा टिकून राहतो', 'आग व चोरी विमा संरक्षित'],
      hi: ['100% नमी मुक्त', 'गुड़ की गुणवत्ता सुरक्षित', 'बीमा सुरक्षित']
    },
    audioText: {
      en: 'Kolhapur Jaggery warehouse. 40 rupees per bag per month. Protects jaggery from humidity.',
      mr: 'कोल्हापूर गुळ गोदाम. दर ४० रुपये प्रति पोते प्रति महिना. गुळाचा दर्जा सुरक्षित राहतो.',
      hi: 'कोल्हापुर गुड़ गोदाम। दर 40 रुपये प्रति बोरी। नमी से सुरक्षित।'
    }
  },

  // --- 6. AKOLA LISTINGS ---
  {
    id: 'srv-a1',
    locationId: 'akola',
    category: 'equipment',
    title: { en: 'Swaraj 855 FE (52 HP) + Soybean High-Speed Thresher', mr: 'स्वराज ८५५ एफई + सोयाबीन थ्रेशर', hi: 'स्वराज 855 एफई + सोयाबीन थ्रेशर' },
    ownerName: { en: 'Kailas Deshmukh', mr: 'कैलास देशमुख', hi: 'कैलाश देशमुख' },
    phone: '+91 98227 99011',
    village: { en: 'Murtizapur Bypass (3.1 km)', mr: 'मुर्तिजापूर बायपास (३.१ किमी)', hi: 'मुर्तिजापुर बाईपास (3.1 किमी)' },
    rate: 950,
    unit: { en: '₹ / Hour', mr: '₹ / तास', hi: '₹ / घंटा' },
    rating: 4.8,
    reviewCount: 44,
    verified: true,
    availableToday: true,
    hasDriver: true,
    features: {
      en: ['Clean Grain Separation', 'No Seed Cracking', 'High Output 25 Bags/Hour'],
      mr: ['सोयाबीन दाणा न फुटण्याची हमी', 'स्वच्छ भुसा वेगळा', 'तासाला २५ पोती मळणी'],
      hi: ['अनाज टूटने से बचाव', 'साफ दाना', 'प्रति घंटा 25 बोरी क्षमता']
    },
    audioText: {
      en: 'Swaraj 855 FE tractor with soybean thresher at Akola. 950 rupees per hour.',
      mr: 'अकोला मुर्तिजापूर येथे स्वराज ट्रॅक्टर सोयाबीन थ्रेशरसह. दर ९५० रुपये प्रति तास.',
      hi: 'अकोला मुर्तिजापुर में स्वराज ट्रैक्टर सोयाबीन थ्रेशर सहित। किराया 950 रुपये प्रति घंटा।'
    }
  },
  {
    id: 'srv-a2',
    locationId: 'akola',
    category: 'labour',
    title: { en: 'Vidarbha BT Cotton Clean Picking Squad (14 Workers)', mr: 'विदर्भ बीटी कापूस वेचणी महिला गट (१४ मजूर)', hi: 'विदर्भ बीटी कपास चुनाई महिला समूह (14 मजदूर)' },
    ownerName: { en: 'Sharda Tai Tayade', mr: 'शारदा ताई तायडे', hi: 'शारदा ताई तायड़े' },
    phone: '+91 97640 22108',
    village: { en: 'Borgaon Manju (4.2 km)', mr: 'बोरगाव मंजू (४.२ किमी)', hi: 'बोरगांव मंजू (4.2 किमी)' },
    rate: 11,
    unit: { en: '₹ / KG', mr: '₹ / किलो', hi: '₹ / किलो' },
    rating: 4.9,
    reviewCount: 56,
    verified: true,
    availableToday: true,
    hasDriver: false,
    features: {
      en: ['Trash-Free Clean Cotton', 'Fast Daily Picking', 'Dry Picking Guarantee'],
      mr: ['कचरा नसलेला स्वच्छ पांढरा कापूस', 'दिवसाला जलद वेचणी', 'कोरडा माल वेचण्याची हमी'],
      hi: ['कचरा मुक्त साफ कपास', 'तेज चुनाई', 'सूखा माल गारंटी']
    },
    audioText: {
      en: 'Vidarbha cotton clean picking squad with 14 workers. Rate 11 rupees per kg.',
      mr: 'कपाशीतील स्वच्छ वेचणीसाठी १४ महिला मजुरांचा गट. दर ११ रुपये प्रति किलो.',
      hi: 'साफ कपास चुनाई हेतु 14 महिला मजदूर। दर 11 रुपये प्रति किलो।'
    }
  },
  {
    id: 'srv-a3',
    locationId: 'akola',
    category: 'pooling',
    title: { en: 'Eicher Pro 2049 Cotton & Pulse Freight to Mandi (4T)', mr: 'आयशर प्रो कापूस व सोयाबीन मंडी गाडी (४T)', hi: 'आयशर प्रो कपास व सोयाबीन मंडी वाहन (4T)' },
    ownerName: { en: 'Vinod Dhotre', mr: 'विनोद धोत्रे', hi: 'विनोद धोत्रे' },
    phone: '+91 94228 66190',
    village: { en: 'Akola Cotton Market Road (2.0 km)', mr: 'अकोला कॉटन मार्केट रस्ता (२.० किमी)', hi: 'अकोला कॉटन मार्केट रोड (2.0 किमी)' },
    rate: 25,
    unit: { en: '₹ / KM', mr: '₹ / किमी', hi: '₹ / किमी' },
    rating: 4.9,
    reviewCount: 48,
    verified: true,
    availableToday: true,
    hasDriver: true,
    features: {
      en: ['Direct to Akola Cotton APMC', 'Heavy High-Wall Body', 'Weighbridge Verified'],
      mr: ['अकोला जिनिंग मार्केट थेट वाहतूक', 'उंच जाळीची मजबूत बॉडी', 'काटा पावतीसह सुरक्षित'],
      hi: ['अकोला जिनिंग मंडी सीधी डिलीवरी', 'ऊंची जाली वाली बॉडी', 'कांटा पर्ची सहित']
    },
    audioText: {
      en: 'Vinod Dhotre Eicher Pro for cotton transport to Akola APMC. Rate 25 rupees per km.',
      mr: 'विनोद धोत्रे यांची आयशर गाडी. कापूस व सोयाबीन थेट अकोला मार्केट यार्ड. दर २५ रुपये प्रति किमी.',
      hi: 'विनोद धोत्रे का आयशर वाहन। कपास व सोयाबीन मंडी परिवहन। दर 25 रुपये प्रति किमी।'
    }
  },
  {
    id: 'srv-a4',
    locationId: 'akola',
    category: 'storage',
    title: { en: 'Murtizapur Scientific Soybean & Pulse Silos', mr: 'मुर्तिजापूर शास्त्रीय सोयाबीन व डाळी सायलो शेड', hi: 'मुर्तिजापुर वैज्ञानिक सोयाबीन व दाल साइलो' },
    ownerName: { en: 'Akola Agri Logistics Hub', mr: 'अकोला ॲग्री लॉजिस्टिक हब', hi: 'अकोला एग्री लॉजिस्टिक्स' },
    phone: '+91 98221 33419',
    village: { en: 'Murtizapur Railway Yard (1.5 km)', mr: 'मुर्तिजापूर रेल्वे यार्ड परिसर (१.५ किमी)', hi: 'मुर्तिजापुर रेलवे यार्ड (1.5 किमी)' },
    rate: 35,
    unit: { en: '₹ / Bag / Mo', mr: '₹ / पोते / महिना', hi: '₹ / बोरी / महीना' },
    rating: 4.8,
    reviewCount: 52,
    verified: true,
    availableToday: true,
    hasDriver: false,
    features: {
      en: ['Fumigation Certified', 'Zero Moisture Degradation', 'WDRA Certified Warehouse'],
      mr: ['धुरीकरण (फ्युमिगेशन) प्रमाणित', 'शून्य ओलावा व कीडमुक्त साठा', 'डब्ल्यूडीआरए मान्यताप्राप्त गोदाम'],
      hi: ['धूम्रीकृत प्रमाणित गोदाम', 'नमी व कीट से मुक्त', 'डब्ल्यूडीआरए मान्यताप्राप्त']
    },
    audioText: {
      en: 'Murtizapur Soybean and pulse silos. 35 rupees per bag per month. Moisture and pest safe.',
      mr: 'मुर्तिजापूर सोयाबीन सायलो गोदाम. दर ३५ रुपये प्रति पोते प्रति महिना. कीड व ओलावा सुरक्षित.',
      hi: 'मुर्तिजापुर सोयाबीन साइलो गोदाम। दर 35 रुपये प्रति बोरी। सुरक्षित भंडारण।'
    }
  }
];

export const SAHA_KISAN_POOLS = [
  // Shirur
  {
    id: 'pool-shirur-1',
    locationId: 'shirur',
    type: 'transport',
    title: { en: 'Pune APMC (Gultekdi) Shared Tempo', mr: 'पुणे गुलटेकडी मार्केट यार्ड सामाईक टेम्पो', hi: 'पुणे गुलटेकड़ी मंडी साझा टेम्पो' },
    crop: { en: 'Red Onion & Tomato', mr: 'लाल कांदा व टोमॅटो', hi: 'लाल प्याज व टमाटर' },
    route: {
      from: { en: 'Shirur Village Point', mr: 'शिरूर गावठाण', hi: 'शिरूर गांव' },
      to: { en: 'Pune APMC Yard Gate 2', mr: 'पुणे मार्केट यार्ड गेट २', hi: 'पुणे मंडी गेट 2' },
      distanceKm: 65
    },
    totalCapacity: 50,
    bookedCapacity: 34,
    availableCapacity: 16,
    initiator: {
      name: { en: 'Ramesh Patil', mr: 'रमेश पाटील', hi: 'रमेश पाटिल' },
      village: { en: 'Mandavgan Farata', mr: 'मांडवगण फराटा', hi: 'मांडवगण फराटा' },
      bookedAmt: { en: '25 Quintals', mr: '२५ क्विंटल', hi: '25 क्विंटल' }
    },
    departureTime: { en: 'Tomorrow, 5:30 AM', mr: 'उद्या पहाटे ५:३०', hi: 'कल सुबह 5:30' },
    costPerQuintal: 42,
    soloCostPerQuintal: 68,
    savingsPerQuintal: 26,
    participants: 3
  },
  {
    id: 'pool-shirur-2',
    locationId: 'shirur',
    type: 'transport',
    title: { en: 'Shirur to Lasalgaon Mandi Shared Pickup', mr: 'शिरूर ते लासलगाव मार्केट सामाईक पिकअप', hi: 'शिरूर से लासलगांव मंडी साझा पिकअप' },
    crop: { en: 'Red Onion (Special Grade)', mr: 'लाल कांदा (स्पेशल प्रत)', hi: 'लाल प्याज (स्पेशल ग्रेड)' },
    route: {
      from: { en: 'Ranjangaon MIDC', mr: 'रांजणगाव एमआयडीसी', hi: 'रांजणगांव एमआईडीसी' },
      to: { en: 'Lasalgaon APMC Yard', mr: 'लासलगाव मुख्य बाजार समिती', hi: 'लासलगांव मुख्य मंडी' },
      distanceKm: 145
    },
    totalCapacity: 40,
    bookedCapacity: 28,
    availableCapacity: 12,
    initiator: {
      name: { en: 'Balasaheb Kolhe', mr: 'बाळासाहेब कोल्हे', hi: 'बालासाहेब कोल्हे' },
      village: { en: 'Kawathe, Shirur', mr: 'कवठे, शिरूर', hi: 'कवठे, शिरूर' },
      bookedAmt: { en: '20 Quintals', mr: '२० क्विंटल', hi: '20 क्विंटल' }
    },
    departureTime: { en: 'Thursday, 6:00 AM', mr: 'गुरुवार सकाळी ६:००', hi: 'गुरुवार सुबह 6:00' },
    costPerQuintal: 60,
    soloCostPerQuintal: 95,
    savingsPerQuintal: 35,
    participants: 2
  },

  // Baramati
  {
    id: 'pool-baramati-1',
    locationId: 'baramati',
    type: 'equipment',
    title: { en: 'Baramati Soybean Harvester Cluster Group', mr: 'सोयाबीन काढणी कंबाईन हार्वेस्टर समूह', hi: 'सोयाबीन कटाई कंबाइन समूह' },
    crop: { en: 'Soybean (Phule Sangam)', mr: 'सोयाबीन (फुले संगम)', hi: 'सोयाबीन (फुले संगम)' },
    route: {
      from: { en: 'Baramati East Circle', mr: 'बारामती पूर्व विभाग', hi: 'बारामती पूर्व' },
      to: { en: '3 Neighboring Fields', mr: 'शेजारील ३ शेती परिसर', hi: '3 पड़ोसी खेत' },
      distanceKm: 8
    },
    totalCapacity: 20,
    bookedCapacity: 13,
    availableCapacity: 7,
    initiator: {
      name: { en: 'Suresh Shinde', mr: 'सुरेश शिंदे', hi: 'सुरेश शिंदे' },
      village: { en: 'Supe, Baramati', mr: 'सुपे, बारामती', hi: 'सुपे, बारामती' },
      bookedAmt: { en: '8 Acres', mr: '८ एकर', hi: '8 एकड़' }
    },
    departureTime: { en: 'Friday, 8:00 AM', mr: 'शुक्रवार सकाळी ८:००', hi: 'शुक्रवार सुबह 8:00' },
    costPerQuintal: 1650,
    soloCostPerQuintal: 2200,
    savingsPerQuintal: 550,
    participants: 2
  },
  {
    id: 'pool-baramati-2',
    locationId: 'baramati',
    type: 'transport',
    title: { en: 'Baramati to Pune Gultekdi Shared Truck', mr: 'बारामती ते पुणे गुलटेकडी सामाईक ट्रक', hi: 'बारामती से पुणे मंडी साझा ट्रक' },
    crop: { en: 'Sugarcane Seed & Wheat', mr: 'ऊस बेणे व गहू', hi: 'गन्ना बीज व गेहूं' },
    route: {
      from: { en: 'Malegaon Phata', mr: 'माळेगाव फाटा', hi: 'मालेगांव फाटा' },
      to: { en: 'Pune Market Yard', mr: 'पुणे मार्केट यार्ड', hi: 'पुणे मंडी' },
      distanceKm: 75
    },
    totalCapacity: 80,
    bookedCapacity: 55,
    availableCapacity: 25,
    initiator: {
      name: { en: 'Abhijit Jagtap', mr: 'अभिजीत जगताप', hi: 'अभिजीत जगताप' },
      village: { en: 'Pandare, Baramati', mr: 'पांडरे, बारामती', hi: 'पांडरे, बारामती' },
      bookedAmt: { en: '35 Quintals', mr: '३५ क्विंटल', hi: '35 क्विंटल' }
    },
    departureTime: { en: 'Saturday, 5:00 AM', mr: 'शनिवार पहाटे ५:००', hi: 'शनिवार सुबह 5:00' },
    costPerQuintal: 45,
    soloCostPerQuintal: 75,
    savingsPerQuintal: 30,
    participants: 3
  },

  // Lasalgaon
  {
    id: 'pool-lasalgaon-1',
    locationId: 'lasalgaon',
    type: 'transport',
    title: { en: 'Lasalgaon to Vashi APMC 10-Wheeler Onion Pool', mr: 'लासलगाव थेट वाशी मुंबई १०-चाकी कांदा ट्रक', hi: 'लासलगांव से वाशी मंडी 10-चक्का प्याज ट्रक' },
    crop: { en: 'Summer Red Onion', mr: 'उन्हाळी लाल कांदा', hi: 'गर्मी का लाल प्याज' },
    route: {
      from: { en: 'Lasalgaon APMC Shed', mr: 'लासलगाव लिलाव शेड', hi: 'लासलगांव नीलामी शेड' },
      to: { en: 'Vashi APMC Navi Mumbai', mr: 'वाशी मार्केट यार्ड नवी मुंबई', hi: 'वाशी मंडी नवी मुंबई' },
      distanceKm: 220
    },
    totalCapacity: 120,
    bookedCapacity: 90,
    availableCapacity: 30,
    initiator: {
      name: { en: 'Nitin Deshmukh', mr: 'नितीन देशमुख', hi: 'नितिन देशमुख' },
      village: { en: 'Kotamgaon, Lasalgaon', mr: 'कोतमगाव, लासलगाव', hi: 'कोतमगांव, लासलगांव' },
      bookedAmt: { en: '50 Quintals', mr: '५० क्विंटल', hi: '50 क्विंटल' }
    },
    departureTime: { en: 'Saturday, 4:00 AM', mr: 'शनिवार पहाटे ४:००', hi: 'शनिवार सुबह 4:00' },
    costPerQuintal: 55,
    soloCostPerQuintal: 95,
    savingsPerQuintal: 40,
    participants: 4
  },
  {
    id: 'pool-lasalgaon-2',
    locationId: 'lasalgaon',
    type: 'transport',
    title: { en: 'Lasalgaon to Nashik Peth Road Shared Tempo', mr: 'लासलगाव ते नाशिक पेठ रोड सामाईक टेम्पो', hi: 'लासलगांव से नासिक पेठ रोड साझा टेम्पो' },
    crop: { en: 'Table Grapes & Maize', mr: 'खाद्य द्राक्षे व मका', hi: 'अंगूर व मक्का' },
    route: {
      from: { en: 'Vinchur Station Point', mr: 'विंचूर स्टेशन चौक', hi: 'विंचूर स्टेशन' },
      to: { en: 'Nashik APMC Yard', mr: 'नाशिक बाजार समिती', hi: 'नासिक मंडी' },
      distanceKm: 45
    },
    totalCapacity: 35,
    bookedCapacity: 22,
    availableCapacity: 13,
    initiator: {
      name: { en: 'Prakash Shinde', mr: 'प्रकाश शिंदे', hi: 'प्रकाश शिंदे' },
      village: { en: 'Vinchur, Niphad', mr: 'विंचूर, निफाड', hi: 'विंचूर, निफाड' },
      bookedAmt: { en: '15 Quintals', mr: '१५ क्विंटल', hi: '15 क्विंटल' }
    },
    departureTime: { en: 'Tomorrow, 6:30 AM', mr: 'उद्या सकाळी ६:३०', hi: 'कल सुबह 6:30' },
    costPerQuintal: 35,
    soloCostPerQuintal: 55,
    savingsPerQuintal: 20,
    participants: 2
  },

  // Sangamner
  {
    id: 'pool-sangamner-1',
    locationId: 'sangamner',
    type: 'transport',
    title: { en: 'Sangamner to Vashi APMC Pomegranate Express', mr: 'संगमनेर ते वाशी मुंबई थेट डाळिंब एक्सप्रेस', hi: 'संगमनेर से वाशी मंडी अनार एक्सप्रेस' },
    crop: { en: 'Bhagwa Pomegranate (A Grade)', mr: 'भगवा डाळिंब (अ वर्ग)', hi: 'भगवा अनार (ग्रेड ए)' },
    route: {
      from: { en: 'Sangamner Bypass Mandi', mr: 'संगमनेर बायपास चौक', hi: 'संगमनेर बाईपास' },
      to: { en: 'Vashi Fruit Market Gate 4', mr: 'वाशी फळ बाजार गेट ४', hi: 'वाशी फल मंडी गेट 4' },
      distanceKm: 180
    },
    totalCapacity: 70,
    bookedCapacity: 48,
    availableCapacity: 22,
    initiator: {
      name: { en: 'Eknath Thorat', mr: 'एकनाथ थोरात', hi: 'एकनाथ थोरात' },
      village: { en: 'Akole Road, Sangamner', mr: 'अकोले रस्ता, संगमनेर', hi: 'अकोले रोड, संगमनेर' },
      bookedAmt: { en: '30 Quintals', mr: '३० क्विंटल', hi: '30 क्विंटल' }
    },
    departureTime: { en: 'Tomorrow, 7:00 PM', mr: 'उद्या संध्याकाळी ७:००', hi: 'कल शाम 7:00' },
    costPerQuintal: 58,
    soloCostPerQuintal: 92,
    savingsPerQuintal: 34,
    participants: 3
  },
  {
    id: 'pool-sangamner-2',
    locationId: 'sangamner',
    type: 'transport',
    title: { en: 'Sangamner to Pune Gultekdi Shared Vegetable Pickup', mr: 'संगमनेर ते पुणे गुलटेकडी भाजीपाला पिकअप', hi: 'संगमनेर से पुणे मंडी सब्जी पिकअप' },
    crop: { en: 'Tomato, Chili & Cabbage', mr: 'टोमॅटो, मिरची व कोबी', hi: 'टमाटर, मिर्च व पत्तागोभी' },
    route: {
      from: { en: 'Talegaon Dighe Phata', mr: 'तळेगाव दिघे फाटा', hi: 'तलेगांव दिघे फाटा' },
      to: { en: 'Pune Gultekdi Veg Market', mr: 'पुणे गुलटेकडी भाजी मार्केट', hi: 'पुणे गुलटेकड़ी सब्जी मंडी' },
      distanceKm: 140
    },
    totalCapacity: 35,
    bookedCapacity: 24,
    availableCapacity: 11,
    initiator: {
      name: { en: 'Pandurang Gunjal', mr: 'पांडुरंग गुंजाळ', hi: 'पांडुरंग गुंजाल' },
      village: { en: 'Gunjalwadi, Sangamner', mr: 'गुंजाळवाडी, संगमनेर', hi: 'गुंजालवाड़ी, संगमनेर' },
      bookedAmt: { en: '14 Quintals', mr: '१४ क्विंटल', hi: '14 क्विंटल' }
    },
    departureTime: { en: 'Daily, 4:00 AM', mr: 'रोज पहाटे ४:००', hi: 'प्रतिदिन सुबह 4:00' },
    costPerQuintal: 48,
    soloCostPerQuintal: 78,
    savingsPerQuintal: 30,
    participants: 3
  },

  // Kolhapur
  {
    id: 'pool-kolhapur-1',
    locationId: 'kolhapur',
    type: 'transport',
    title: { en: 'Karveer to Shahu Market Yard Shared Freight', mr: 'करवीर ते शाहू मार्केट यार्ड सामाईक गूळ वाहतूक', hi: 'करवीर से शाहू मंडी साझा गुड़ वाहन' },
    crop: { en: 'Kolhapuri Organic Jaggery', mr: 'कोल्हापुरी सेंद्रिय गूळ', hi: 'कोल्हापुरी जैविक गुड़' },
    route: {
      from: { en: 'Shiroli MIDC Point', mr: 'शिरोली एमआयडीसी चौक', hi: 'शिरोली एमआईडीसी' },
      to: { en: 'Shahu Market Yard Kolhapur', mr: 'शाहू मार्केट यार्ड कोल्हापूर', hi: 'शाहू मंडी कोल्हापुर' },
      distanceKm: 12
    },
    totalCapacity: 60,
    bookedCapacity: 44,
    availableCapacity: 16,
    initiator: {
      name: { en: 'Mahadev Patil', mr: 'महादेव पाटील', hi: 'महादेव पाटिल' },
      village: { en: 'Karveer Village', mr: 'करवीर गावठाण', hi: 'करवीर गांव' },
      bookedAmt: { en: '30 Quintals', mr: '३० क्विंटल', hi: '30 क्विंटल' }
    },
    departureTime: { en: 'Friday, 7:00 AM', mr: 'शुक्रवार सकाळी ७:००', hi: 'शुक्रवार सुबह 7:00' },
    costPerQuintal: 25,
    soloCostPerQuintal: 45,
    savingsPerQuintal: 20,
    participants: 3
  },
  {
    id: 'pool-kolhapur-2',
    locationId: 'kolhapur',
    type: 'transport',
    title: { en: 'Kolhapur to Sangli APMC Turmeric & Paddy Shared Truck', mr: 'कोल्हापूर ते सांगली मार्केट हळद व भात ट्रक', hi: 'कोल्हापुर से सांगली मंडी हल्दी व धान ट्रक' },
    crop: { en: 'Turmeric & Indrayani Paddy', mr: 'राजापुरी हळद व इंद्रायणी भात', hi: 'हल्दी व बासमती धान' },
    route: {
      from: { en: 'Uchgaon Bypass Kolhapur', mr: 'उचगाव बायपास कोल्हापूर', hi: 'उचगांव बाईपास कोल्हापुर' },
      to: { en: 'Sangli APMC Spice Yard', mr: 'सांगली कृषी बाजार समिती', hi: 'सांगली कृषि मंडी' },
      distanceKm: 48
    },
    totalCapacity: 90,
    bookedCapacity: 65,
    availableCapacity: 25,
    initiator: {
      name: { en: 'Sambhaji Shinde', mr: 'संभाजी शिंदे', hi: 'संभाजी शिंदे' },
      village: { en: 'Uchgaon, Karveer', mr: 'उचगाव, करवीर', hi: 'उचगांव, करवीर' },
      bookedAmt: { en: '40 Quintals', mr: '४० क्विंटल', hi: '40 क्विंटल' }
    },
    departureTime: { en: 'Monday, 6:00 AM', mr: 'सोमवार सकाळी ६:००', hi: 'सोमवार सुबह 6:00' },
    costPerQuintal: 38,
    soloCostPerQuintal: 62,
    savingsPerQuintal: 24,
    participants: 2
  },

  // Akola
  {
    id: 'pool-akola-1',
    locationId: 'akola',
    type: 'transport',
    title: { en: 'Murtizapur to Akola APMC BT Cotton Shared Eicher', mr: 'मुर्तिजापूर ते अकोला जिनिंग मार्केट कापूस गाडी', hi: 'मुर्तिजापुर से अकोला जिनिंग मंडी साझा वाहन' },
    crop: { en: 'BT White Gold Cotton', mr: 'पांढरे सोने बीटी कापूस', hi: 'सफेद सोना बीटी कपास' },
    route: {
      from: { en: 'Murtizapur APMC Gate', mr: 'मुर्तिजापूर कृषी बाजार गेट', hi: 'मुर्तिजापुर मंडी गेट' },
      to: { en: 'Akola Apex Ginning Yard', mr: 'अकोला मुख्य जिनिंग यार्ड', hi: 'अकोला मुख्य जिनिंग यार्ड' },
      distanceKm: 42
    },
    totalCapacity: 45,
    bookedCapacity: 30,
    availableCapacity: 15,
    initiator: {
      name: { en: 'Gajanan Deshmukh', mr: 'गजानन देशमुख', hi: 'गजानन देशमुख' },
      village: { en: 'Mana, Murtizapur', mr: 'माना, मुर्तिजापूर', hi: 'माना, मुर्तिजापुर' },
      bookedAmt: { en: '20 Quintals', mr: '२० क्विंटल', hi: '20 क्विंटल' }
    },
    departureTime: { en: 'Tomorrow, 8:00 AM', mr: 'उद्या सकाळी ८:००', hi: 'कल सुबह 8:00' },
    costPerQuintal: 35,
    soloCostPerQuintal: 60,
    savingsPerQuintal: 25,
    participants: 3
  },
  {
    id: 'pool-akola-2',
    locationId: 'akola',
    type: 'transport',
    title: { en: 'Akola to Latur Apex Pulses & Oilseed Mandi 10-Wheeler', mr: 'अकोला ते लातूर डाळी व तेलबिया मुख्य मार्केट ट्रक', hi: 'अकोला से लातूर दाल व तिलहन मुख्य मंडी ट्रक' },
    crop: { en: 'Yellow Soybean & Pigeon Pea', mr: 'पिवळा सोयाबीन व तूर', hi: 'पीला सोयाबीन व अरहर' },
    route: {
      from: { en: 'Akola Bypass Square', mr: 'अकोला बायपास चौक', hi: 'अकोला बाईपास चौक' },
      to: { en: 'Latur APMC Pulse Yard', mr: 'लातूर डाळ व तेलबिया मार्केट', hi: 'लातूर दाल मंडी' },
      distanceKm: 220
    },
    totalCapacity: 110,
    bookedCapacity: 80,
    availableCapacity: 30,
    initiator: {
      name: { en: 'Subhash Dhotre', mr: 'सुभाष धोत्रे', hi: 'सुभाष धोत्रे' },
      village: { en: 'Murtizapur, Akola', mr: 'मुर्तिजापूर, अकोला', hi: 'मुर्तिजापुर, अकोला' },
      bookedAmt: { en: '45 Quintals', mr: '४५ क्विंटल', hi: '45 क्विंटल' }
    },
    departureTime: { en: 'Sunday, 4:30 AM', mr: 'रविवार पहाटे ४:३०', hi: 'रविवार सुबह 4:30' },
    costPerQuintal: 52,
    soloCostPerQuintal: 88,
    savingsPerQuintal: 36,
    participants: 4
  }
];

export const GRAM_MECHANICS = [
  // Shirur
  {
    id: 'mech-shirur-1',
    locationId: 'shirur',
    name: { en: 'Sambhaji Tractor & Hydraulic Works', mr: 'संभाजी ट्रॅक्टर व हायड्रॉलिक वर्क्स', hi: 'संभाजी ट्रैक्टर वर्क्स' },
    owner: { en: 'Sambhaji Salunke', mr: 'संभाजी साळुंखे', hi: 'संभाजी सालुंखे' },
    phone: '+91 98221 44512',
    distanceKm: 2.4,
    etaMinutes: 14,
    specializations: {
      en: ['Mahindra, Swaraj, Massey', 'Hydraulic Lift & Clutch', 'Mobile Field Van'],
      mr: ['महिंद्रा, स्वराज, मॅसी ट्रॅक्टर', 'हायड्रॉलिक लिफ्ट व क्लच दुरुस्ती', 'फिरती व्हॅन व टूलकिट'],
      hi: ['महिंद्रा, स्वराज, मैसी ट्रैक्टर', 'हाइड्रोलिक लिफ्ट व क्लच रिपेयर', 'मोबाइल फील्ड वैन']
    },
    rating: 4.9,
    village: { en: 'Shirur Bypass Road', mr: 'शिरूर बायपास रस्ता', hi: 'शिरूर बाईपास रोड' }
  },
  {
    id: 'mech-shirur-2',
    locationId: 'shirur',
    name: { en: 'Gurukrupa Pump & Borewell Electricals', mr: 'गुरुकृपा कृषी पंप व बोअरवेल दुरुस्ती', hi: 'गुरुकृपा बोरवेल पंप मरम्मत' },
    owner: { en: 'Dattatray Kolekar', mr: 'दत्तात्रय कोळेकर', hi: 'दत्तात्रेय कोलेकर' },
    phone: '+91 94220 88731',
    distanceKm: 3.8,
    etaMinutes: 20,
    specializations: {
      en: ['Submersible Pump Retrieval', 'Starter Box & Capacitors', 'Solar Pump Inverter'],
      mr: ['बोअरवेल सबमर्सिबल पंप काढणे', 'स्टार्टर बॉक्स व कॅपॅसिटर', 'सोलर पंप इन्व्हर्टर'],
      hi: ['बोरवेल सबमर्सिबल पंप निकालना', 'स्टार्टर बॉक्स व कैपेसिटर', 'सोलर पंप इनवर्टर']
    },
    rating: 4.8,
    village: { en: 'Tardobachiwadi Phata', mr: 'तारडोबाचीवाडी फाटा', hi: 'तारडोबाचीवाड़ी फाटा' }
  },

  // Baramati
  {
    id: 'mech-baramati-1',
    locationId: 'baramati',
    name: { en: 'Sharad Agro Tractor & Harvester Clinic', mr: 'शरद ॲग्रो ट्रॅक्टर व हार्वेस्टर क्लिनिक', hi: 'शरद एग्रो ट्रैक्टर क्लिनिक' },
    owner: { en: 'Ganesh Taware', mr: 'गणेश तावरे', hi: 'गणेश तावरे' },
    phone: '+91 98225 11900',
    distanceKm: 1.8,
    etaMinutes: 12,
    specializations: {
      en: ['John Deere, New Holland, Kubota', 'Harvester Cutter Bar', 'On-Field Welding'],
      mr: ['जॉन डीअर, न्यू हॉलंड, कुबोटा ट्रॅक्टर', 'हार्वेस्टर कटर बार व बेल्ट', 'शेतातील वेल्डिंग कामे'],
      hi: ['जॉन डीयर, न्यू हॉलैंड, कुबोटा', 'कटर बार व बेल्ट', 'खेत में वेल्डिंग कार्य']
    },
    rating: 5.0,
    village: { en: 'Baramati MIDC Chowk', mr: 'बारामती एमआयडीसी चौक', hi: 'बारामती एमआईडीसी' }
  },
  {
    id: 'mech-baramati-2',
    locationId: 'baramati',
    name: { en: 'Jai Malhar Borewell & Drip Electric Works', mr: 'जय मल्हार बोअरवेल व ठिबक दुरुस्ती', hi: 'जय मल्हार बोरवेल व मोटर वर्क्स' },
    owner: { en: 'Vitthal Jagtap', mr: 'विठ्ठल जगताप', hi: 'विट्ठल जगताप' },
    phone: '+91 94210 55812',
    distanceKm: 2.9,
    etaMinutes: 16,
    specializations: {
      en: ['5HP - 15HP Submersible Motor', 'Cable Joint & Rewinding', 'Drip Venturi Valves'],
      mr: ['५HP ते १५HP सबमर्सिबल मोटर', 'वॉटरप्रूफ केबल जॉइंट व रिवाइंडिंग', 'व्हेंचुरी व फिल्टर दुरुस्ती'],
      hi: ['5HP से 15HP मोटर', 'वाटरप्रूफ केबल जॉइंट', 'ड्रिप फिल्टर मरम्मत']
    },
    rating: 4.9,
    village: { en: 'Malegaon Phata', mr: 'माळेगाव फाटा', hi: 'मालेगांव फाटा' }
  },

  // Lasalgaon
  {
    id: 'mech-lasalgaon-1',
    locationId: 'lasalgaon',
    name: { en: 'Omkar Agri Mechanics & Bed Maker Works', mr: 'ओमकार कृषी मेकॅनिक व गादीवाफा दुरुस्ती', hi: 'ओमकार कृषि मिस्त्री वर्क्स' },
    owner: { en: 'Kailas Holkar', mr: 'कैलास होळकर', hi: 'कैलाश होलकर' },
    phone: '+91 98901 22345',
    distanceKm: 1.5,
    etaMinutes: 10,
    specializations: {
      en: ['Onion Bed Maker Tuning', 'Rotavator Pinion & Blades', 'Mobile Van Service'],
      mr: ['कांदा गादीवाफा यंत्र ट्युनिंग', 'रोटाव्हेटर पिनियन व ब्लेड्स', 'मोबाइल व्हॅन सेवा'],
      hi: ['प्याज बेड मेकर ट्यूनिंग', 'रोटावेटर पिनियन रिपेयर', 'मोबाइल वैन']
    },
    rating: 4.9,
    village: { en: 'Lasalgaon APMC Gate', mr: 'लासलगाव मार्केट यार्ड गेट', hi: 'लासलगांव मंडी गेट' }
  },
  {
    id: 'mech-lasalgaon-2',
    locationId: 'lasalgaon',
    name: { en: 'Nashik Grape Mist Blower & Tractor Clinic', mr: 'नाशिक मिस्ट ब्लोअर व ट्रॅक्टर क्लिनिक', hi: 'नासिक मिस्ट ब्लोअर व ट्रैक्टर क्लिनिक' },
    owner: { en: 'Sanjay Deshmukh', mr: 'संजय देशमुख', hi: 'संजय देशमुख' },
    phone: '+91 94229 44100',
    distanceKm: 2.7,
    etaMinutes: 15,
    specializations: {
      en: ['Mist Blower Nozzle Pressure', 'Swaraj & Mahindra Gearbox', 'Tyre Puncture & Valve'],
      mr: ['मिस्ट ब्लोअर नोझल व हायप्रेशर पंप', 'स्वराज व महिंद्रा गिअरबॉक्स', 'मागील मोठा टायर पंक्चर'],
      hi: ['मिस्ट ब्लोअर हाई प्रेशर पंप', 'स्वराज व महिंद्रा गियरबॉक्स', 'बड़ा टायर पंक्चर']
    },
    rating: 4.8,
    village: { en: 'Vinchur Bypass', mr: 'विंचूर बायपास चौक', hi: 'विंचूर बाईपास' }
  },

  // Sangamner
  {
    id: 'mech-sangamner-1',
    locationId: 'sangamner',
    name: { en: 'Thorat Mobile Hydraulic & Tractor Care', mr: 'थोरात मोबाईल हायड्रॉलिक व ट्रॅक्टर केअर', hi: 'थोरात मोबाइल ट्रैक्टर केयर' },
    owner: { en: 'Santosh Thorat', mr: 'संतोष थोरात', hi: 'संतोष थोरात' },
    phone: '+91 98501 88922',
    distanceKm: 2.1,
    etaMinutes: 15,
    specializations: {
      en: ['Mist Blower High Pressure Pump', 'Sonalika & Swaraj', 'Clutch Plate & Brake'],
      mr: ['मिस्ट ब्लोअर प्रेशर पंप दुरुस्ती', 'सोनालिका व स्वराज ट्रॅक्टर', 'क्लच प्लेट व ब्रेक कामे'],
      hi: ['मिस्ट ब्लोअर प्रेशर पंप', 'सोनालिका व स्वराज', 'क्लच प्लेट व ब्रेक काम']
    },
    rating: 4.9,
    village: { en: 'Sangamner Bypass', mr: 'संगमनेर बायपास चौक', hi: 'संगमनेर बाईपास' }
  },
  {
    id: 'mech-sangamner-2',
    locationId: 'sangamner',
    name: { en: 'Pravara Agro Electricals & Starter Clinic', mr: 'प्रवरा कृषी इलेक्ट्रिकल व स्टार्टर क्लिनिक', hi: 'प्रवरा कृषि इलेक्ट्रिकल वर्क्स' },
    owner: { en: 'Rameshwar Landge', mr: 'रामेश्वर लांडगे', hi: 'रामेश्वर लांडगे' },
    phone: '+91 97630 11299',
    distanceKm: 3.3,
    etaMinutes: 18,
    specializations: {
      en: ['3-Phase Starter Auto Switches', 'Submersible Motor Rewinding', 'Drip Pipe Joint Fusion'],
      mr: ['३-फेज स्टार्टर व ऑटो स्विच', 'सबमर्सिबल मोटर रिवाइंडिंग', 'ठिबक पाईपलाईन लीकेज दुरुस्ती'],
      hi: ['3-फेज स्टार्टर ऑटो स्विच', 'सबमर्सिबल मोटर रिपेयर', 'ड्रिप पाइप लीकेज']
    },
    rating: 4.8,
    village: { en: 'Akole Phata', mr: 'अकोले फाटा', hi: 'अकोले फाटा' }
  },

  // Kolhapur
  {
    id: 'mech-kolhapur-1',
    locationId: 'kolhapur',
    name: { en: 'Mahalakshmi Paddy & Power Tiller Hub', mr: 'महालक्ष्मी पॉवर टिलर व ट्रॅक्टर दुरुस्ती', hi: 'महालक्ष्मी पावर टिलर वर्क्स' },
    owner: { en: 'Sanjay Kamble', mr: 'संजय कांबळे', hi: 'संजय कांबले' },
    phone: '+91 98232 44109',
    distanceKm: 2.6,
    etaMinutes: 16,
    specializations: {
      en: ['Kubota Paddy Transplanter', 'Power Tiller Blades & Gearbox', 'Sugarcane Trolley Axle'],
      mr: ['कुबोटा भात लावणी यंत्र', 'पॉवर टिलर ब्लेड्स व गिअरबॉक्स', 'ऊस ट्रॉली अ‍ॅक्सल'],
      hi: ['कुबोटा धान रोपाई मशीन', 'पावर टिलर ब्लेड्स व गियरबॉक्स', 'गन्ना ट्रॉली एक्सेल']
    },
    rating: 4.9,
    village: { en: 'Karveer Shiroli MIDC', mr: 'करवीर शिरोली एमआयडीसी', hi: 'करवीर शिरोली एमआईडीसी' }
  },
  {
    id: 'mech-kolhapur-2',
    locationId: 'kolhapur',
    name: { en: 'Karveer Tractor Hydraulic & Axle Works', mr: 'करवीर ट्रॅक्टर हायड्रॉलिक व एक्सल वर्क्स', hi: 'करवीर ट्रैक्टर एक्सल वर्क्स' },
    owner: { en: 'Balu Patil', mr: 'बाळू पाटील', hi: 'बालू पाटिल' },
    phone: '+91 98220 88319',
    distanceKm: 3.1,
    etaMinutes: 17,
    specializations: {
      en: ['Heavy Sugarcane Trolley Hitch', 'Cage Wheel Fitting & Bearing', 'Hydraulic Jack Leakage'],
      mr: ['अवजड ऊस ट्रॉली हिच दुरुस्ती', 'केज व्हील बेअरिंग बदलणे', 'हायड्रॉलिक जॅक लीकेज'],
      hi: ['गन्ना ट्रॉली हिच रिपेयर', 'केज व्हील बेयरिंग', 'हाइड्रोलिक जैक लीकेज']
    },
    rating: 4.8,
    village: { en: 'Ghandhinagar Bypass', mr: 'गांधीनगर बायपास', hi: 'गांधीनगर बाईपास' }
  },

  // Akola
  {
    id: 'mech-akola-1',
    locationId: 'akola',
    name: { en: 'Vidarbha Diesel & Thresher Specialists', mr: 'विदर्भ डिझेल व थ्रेशर दुरुस्ती केंद्र', hi: 'विदर्भ डीजल व थ्रेशर रिपेयर' },
    owner: { en: 'Subhash Dhotre', mr: 'सुभाष धोत्रे', hi: 'सुभाष धोत्रे' },
    phone: '+91 97650 33812',
    distanceKm: 3.0,
    etaMinutes: 18,
    specializations: {
      en: ['Soybean Thresher Drum', 'Cotton Ginning Belts', 'Swaraj & Mahindra Engine'],
      mr: ['सोयाबीन थ्रेशर ड्रम दुरुस्ती', 'कापूस जिनिंग बेल्ट्स व मोटर', 'स्वराज व महिंद्रा इंजिन'],
      hi: ['सोयाबीन थ्रेशर ड्रम', 'कपास जिनिंग बेल्ट्स', 'स्वराज व महिंद्रा इंजन']
    },
    rating: 4.8,
    village: { en: 'Murtizapur Chowk', mr: 'मुर्तिजापूर चौक', hi: 'मुर्तिजापुर चौक' }
  },
  {
    id: 'mech-akola-2',
    locationId: 'akola',
    name: { en: 'Akola Mobile Agricultural Field Repair Van', mr: 'अकोला फिरती शेत दुरुस्ती व्हॅन', hi: 'अकोला मोबाइल कृषि रिपेयर वैन' },
    owner: { en: 'Dnyanoba Tayade', mr: 'ज्ञानोबा तायडे', hi: 'ज्ञानोबा तायड़े' },
    phone: '+91 94228 11955',
    distanceKm: 2.2,
    etaMinutes: 14,
    specializations: {
      en: ['Field Generator & Starter', 'Tractor Clutch Plate on Field', 'Solar Drip Pump Controller'],
      mr: ['शेतातील जनरेटर व स्टार्टर', 'शेतातच ट्रॅक्टर क्लच प्लेट काम', 'सोलर ठिबक कंट्रोलर'],
      hi: ['खेत में जनरेटर व स्टार्टर', 'खेत में क्लच प्लेट रिपेयर', 'सोलर पंप कंट्रोलर']
    },
    rating: 4.9,
    village: { en: 'Cotton Market Yard', mr: 'कॉटन मार्केट यार्ड परिसर', hi: 'कॉटन मंडी परिसर' }
  }
];

export const MANDI_CROPS = [
  {
    id: 'onion',
    name: { en: 'Red Onion', mr: 'लाल कांदा', hi: 'लाल प्याज' },
    unitName: { en: 'Quintal', mr: 'क्विंटल', hi: 'क्विंटल' },
    defaultQty: 40,
    avgLoadingFee: 25,
    mandis: [
      { id: 'm-lasalgaon', name: { en: 'Lasalgaon APMC (Asia #1)', mr: 'लासलगाव मुख्य बाजार समिती', hi: 'लासलगांव मुख्य मंडी' }, baseKm: 85, price: 2450, cessPercent: 1.0 },
      { id: 'm-pune', name: { en: 'Pune Market Yard (Gultekdi)', mr: 'पुणे गुलटेकडी मार्केट यार्ड', hi: 'पुणे गुलटेकड़ी मंडी' }, baseKm: 65, price: 2280, cessPercent: 1.05 },
      { id: 'm-vashi', name: { en: 'Vashi Navi Mumbai APMC', mr: 'वाशी नवी मुंबई बाजार समिती', hi: 'वाशी नवी मुंबई मंडी' }, baseKm: 185, price: 2850, cessPercent: 1.2 }
    ]
  },
  {
    id: 'soybean',
    name: { en: 'Soybean (Yellow)', mr: 'पिवळा सोयाबीन', hi: 'पीला सोयाबीन' },
    unitName: { en: 'Quintal', mr: 'क्विंटल', hi: 'क्विंटल' },
    defaultQty: 25,
    avgLoadingFee: 30,
    mandis: [
      { id: 'm-akola', name: { en: 'Akola APMC Yard', mr: 'अकोला कृषी बाजार समिती', hi: 'अकोला कृषि मंडी' }, baseKm: 190, price: 4720, cessPercent: 0.9 },
      { id: 'm-baramati', name: { en: 'Baramati APMC Yard', mr: 'बारामती कृषी बाजार समिती', hi: 'बारामती कृषि मंडी' }, baseKm: 55, price: 4450, cessPercent: 1.0 },
      { id: 'm-latur', name: { en: 'Latur Apex Pulses/Oilseeds', mr: 'लातूर मुख्य बाजार समिती', hi: 'लातूर मुख्य मंडी' }, baseKm: 230, price: 4950, cessPercent: 0.95 }
    ]
  },
  {
    id: 'cotton',
    name: { en: 'BT Cotton', mr: 'कापूस (पांढरे सोने)', hi: 'कपास (सफेद सोना)' },
    unitName: { en: 'Quintal', mr: 'क्विंटल', hi: 'क्विंटल' },
    defaultQty: 20,
    avgLoadingFee: 35,
    mandis: [
      { id: 'm-jalna', name: { en: 'Jalna Ginning APMC', mr: 'जालना जिनिंग बाजार समिती', hi: 'जालना जिनिंग मंडी' }, baseKm: 175, price: 7600, cessPercent: 0.8 },
      { id: 'm-ahilyanagar', name: { en: 'Ahilyanagar APMC', mr: 'अहिल्यानगर बाजार समिती', hi: 'अहिल्यानगर मंडी' }, baseKm: 70, price: 7200, cessPercent: 0.9 },
      { id: 'm-aurangabad', name: { en: 'Chh. Sambhajinagar APMC', mr: 'छ. संभाजीनगर बाजार समिती', hi: 'छ. संभाजीनगर मंडी' }, baseKm: 145, price: 7480, cessPercent: 0.85 }
    ]
  },
  {
    id: 'wheat',
    name: { en: 'Wheat / Sharbati', mr: 'शरबती / लोकवान गहू', hi: 'शरबती / लोकवान गेहूं' },
    unitName: { en: 'Quintal', mr: 'क्विंटल', hi: 'क्विंटल' },
    defaultQty: 30,
    avgLoadingFee: 22,
    mandis: [
      { id: 'm-pune-wheat', name: { en: 'Pune Gultekdi Grain Market', mr: 'पुणे गुलटेकडी धान्य बाजार', hi: 'पुणे गुलटेकड़ी अनाज मंडी' }, baseKm: 65, price: 3100, cessPercent: 1.0 },
      { id: 'm-local-wheat', name: { en: 'Local Taluka Sub-Market', mr: 'स्थानिक तालुका उपबाजार', hi: 'स्थानीय तालुका उपमंडी' }, baseKm: 10, price: 2850, cessPercent: 1.0 },
      { id: 'm-nashik-wheat', name: { en: 'Nashik APMC Peth Road', mr: 'नाशिक पेठ रोड बाजार समिती', hi: 'नासिक पेठ रोड मंडी' }, baseKm: 130, price: 3250, cessPercent: 1.0 }
    ]
  }
];

export const LOCATION_DISTANCES = {
  shirur: { 'm-lasalgaon': 145, 'm-pune': 65, 'm-vashi': 185, 'm-akola': 420, 'm-baramati': 75, 'm-latur': 280, 'm-jalna': 240, 'm-ahilyanagar': 70, 'm-aurangabad': 190, 'm-pune-wheat': 65, 'm-local-wheat': 8, 'm-nashik-wheat': 160 },
  baramati: { 'm-lasalgaon': 220, 'm-pune': 75, 'm-vashi': 210, 'm-akola': 470, 'm-baramati': 6, 'm-latur': 230, 'm-jalna': 280, 'm-ahilyanagar': 120, 'm-aurangabad': 230, 'm-pune-wheat': 75, 'm-local-wheat': 6, 'm-nashik-wheat': 240 },
  lasalgaon: { 'm-lasalgaon': 4, 'm-pune': 190, 'm-vashi': 220, 'm-akola': 340, 'm-baramati': 230, 'm-latur': 380, 'm-jalna': 180, 'm-ahilyanagar': 110, 'm-aurangabad': 140, 'm-pune-wheat': 190, 'm-local-wheat': 4, 'm-nashik-wheat': 25 },
  sangamner: { 'm-lasalgaon': 85, 'm-pune': 140, 'm-vashi': 180, 'm-akola': 380, 'm-baramati': 170, 'm-latur': 320, 'm-jalna': 190, 'm-ahilyanagar': 65, 'm-aurangabad': 150, 'm-pune-wheat': 140, 'm-local-wheat': 6, 'm-nashik-wheat': 65 },
  kolhapur: { 'm-lasalgaon': 380, 'm-pune': 235, 'm-vashi': 370, 'm-akola': 610, 'm-baramati': 190, 'm-latur': 340, 'm-jalna': 460, 'm-ahilyanagar': 310, 'm-aurangabad': 430, 'm-pune-wheat': 235, 'm-local-wheat': 5, 'm-nashik-wheat': 390 },
  akola: { 'm-lasalgaon': 340, 'm-pune': 450, 'm-vashi': 540, 'm-akola': 8, 'm-baramati': 480, 'm-latur': 220, 'm-jalna': 165, 'm-ahilyanagar': 360, 'm-aurangabad': 230, 'm-pune-wheat': 450, 'm-local-wheat': 8, 'm-nashik-wheat': 350 }
};

export const VOICE_SUGGESTIONS = [
  { lang: 'mr', text: 'सोयाबीन कापणीसाठी हार्वेस्टर शोधा', actionTab: 'services', search: 'हार्वेस्टर' },
  { lang: 'mr', text: 'कांदा लासलगाव बाजारभाव व नफा तपासा', actionTab: 'arbitrage', search: 'कांदा' },
  { lang: 'mr', text: 'पुणे मार्केटसाठी गाडी सामाईक वाटणी करा', actionTab: 'pooling', search: 'पुणे' },
  { lang: 'mr', text: 'शेतात ट्रॅक्टर बंद पडला, मेकॅनिक बोलवा', actionTab: 'sos', search: 'ट्रॅक्टर' },
  { lang: 'hi', text: 'सोयाबीन कटाई हेतु कंबाइन हार्वेस्टर खोजें', actionTab: 'services', search: 'हार्वेस्टर' },
  { lang: 'hi', text: 'प्याज लासलगांव मंडी भाव व मुनाफा जांचें', actionTab: 'arbitrage', search: 'प्याज' },
  { lang: 'hi', text: 'मंडी हेतु साझा वाहन ग्रुप खोजें', actionTab: 'pooling', search: 'वाहन' },
  { lang: 'hi', text: 'खेत में ट्रैक्टर खराब, मिस्त्री बुलाएं', actionTab: 'sos', search: 'मिस्त्री' },
  { lang: 'en', text: 'Find combine harvester for harvesting', actionTab: 'services', search: 'harvester' },
  { lang: 'en', text: 'Calculate highest net profit mandi', actionTab: 'arbitrage', search: 'mandi' },
  { lang: 'en', text: 'Join Saha-Kisan transport pooling', actionTab: 'pooling', search: 'pool' },
  { lang: 'en', text: 'Tractor breakdown SOS mechanic near me', actionTab: 'sos', search: 'mechanic' }
];

export const PROVIDER_SEED_REQUESTS = [
  {
    id: 'req-101',
    farmerName: { en: 'Balwantrao Patil', mr: 'बळवंतराव पाटील', hi: 'बलवंतराव पाटिल' },
    farmerVillage: { en: 'Pabal, Shirur', mr: 'पाबळ, शिरूर', hi: 'पाबल, शिरूर' },
    farmerPhone: '+91 98221 99881',
    serviceTitle: { en: 'Mahindra 575 DI + Rotavator', mr: 'महिंद्रा ५७५ डीआय + रोटाव्हेटर', hi: 'महिंद्रा 575 डीआई + रोटावेटर' },
    date: { en: 'Tomorrow (30 Sep)', mr: 'उद्या (३० सप्टें)', hi: 'कल (30 सित)' },
    duration: { en: '4 Hours', mr: '४ तास', hi: '4 घंटे' },
    totalAmount: 3400,
    status: 'pending',
    notes: { 
      en: '3 acres onion bed preparation before rain.',
      mr: 'पावसापूर्वी ३ एकर कांदा गादीवाफा तयार करायचा आहे.',
      hi: 'बारिश से पहले 3 एकड़ प्याज बेड तैयारी करनी है।'
    }
  },
  {
    id: 'req-102',
    farmerName: { en: 'Kailas Shinde', mr: 'कैलास शिंदे', hi: 'कैलाश शिंदे' },
    farmerVillage: { en: 'Koregaon Bhima', mr: 'कोरेगाव भीमा', hi: 'कोरेगांव भीमा' },
    farmerPhone: '+91 97654 11200',
    serviceTitle: { en: 'Agastha Precision Spray Drone', mr: 'अगस्त्य फवारणी ड्रोन (१६L)', hi: 'अगस्त्य छिड़काव ड्रोन (16L)' },
    date: { en: '1 Oct', mr: '१ ऑक्टोबर', hi: '1 अक्टूबर' },
    duration: { en: '5 Acres', mr: '५ एकर', hi: '5 एकड़' },
    totalAmount: 2250,
    status: 'approved',
    notes: {
      en: 'Nano urea and fungicide spray on sugarcane.',
      mr: 'ऊस पिकावर नॅनो युरिया व बुरशीनाशक फवारणी.',
      hi: 'गन्ने की फसल पर नैनो यूरिया व कवकनाशी छिड़काव।'
    }
  }
];
