import React, { createContext, useContext, useState, useEffect } from 'react';
import { LOCATIONS } from '../data/seedData';
import { 
  isFirebaseConfigured, 
  saveUserProfile, 
  createBookingInFirestore, 
  subscribeUserBookings, 
  logOutFromFirebase 
} from '../services/firebase';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  en: {
    appTitle: 'KSHETRA',
    appSubtitle: 'Unified Digital Agricultural Services Platform',
    motto: 'Empowering Farmers with Shared Tech & Direct Community Strength',
    roleFarmer: 'Farmer Mode',
    roleProvider: 'Machine Owner Mode',
    switchRole: 'Switch Mode',
    location: 'Location',
    changeLocation: 'Change Village / Hub',
    emergencyHelpline: 'Kisan Helpline 1800-180-1551',
    callKisanHelpline: 'Call 1800-180-1551',
    listenAdvisory: 'Listen Advisory',
    stopListening: 'Stop Audio',
    navHome: 'Home',
    navServices: 'Equipment',
    navPooling: 'Pooling',
    navArbitrage: 'Mandi Profit',
    navSos: 'Mechanic SOS',
    navProvider: 'My Machines',
    searchPlaceholder: 'Search tractors, harvesters, labour, trucks...',
    allCategories: 'All',
    filterByDistance: 'Radius',
    filterByPrice: 'Price',
    sortBy: 'Sort By',
    sortRating: 'Top Rated',
    sortPriceLow: 'Lowest Price',
    sortDistance: 'Nearest First',
    bookNow: 'Book Now',
    callOwner: 'Call Direct',
    verifiedService: 'Verified',
    readAloud: 'Listen 🔊',
    listen: 'Listen',
    weatherTitle: 'Agri-Weather & Crop Advisory',
    rainProbability: 'Rain Chance',
    humidity: 'Humidity',
    windSpeed: 'Wind',
    soilStatus: 'Soil Moisture',
    categoryHeading: 'Agricultural Services & Machinery',
    viewAllBtn: 'View All',
    activePoolsTitle: 'Saha-Kisan: Shared Freight & Machinery',
    activePoolsDesc: 'Share trucks & harvesters with neighboring farmers. Cut transport costs up to 50%.',
    joinPool: 'Join & Save',
    createPool: '+ New Pool',
    arbitrageTitle: 'Smart Mandi Real Net-Profit Arbitrage',
    arbitrageDesc: 'Deduct fuel, tolls & handling charges to calculate true take-home in-hand cash across mandis.',
    selectCrop: 'Select Crop',
    cropQuantity: 'Quantity (Quintals)',
    bestDealBadge: 'Best Deal (Highest Profit)',
    mandiPrice: 'Mandi Rate',
    grossRevenue: 'Gross Value',
    transportCost: 'Diesel & Freight Cost',
    loadingCost: 'Hamali & Mandi Cess',
    netProfit: 'Net In-Hand Profit',
    sosTitle: 'Gram-Mechanic SOS Dispatch',
    sosSubtitle: 'Tractor or Borewell breakdown in the field? 1-Tap beacon to alert verified mobile mechanics within 10 km.',
    dispatchBeacon: 'Transmit Field SOS Beacon',
    beaconActive: 'Beacon Transmitting GPS Coordinates...',
    nearbyMechanics: 'Nearby Verified Mechanics (<10 km)',
    eta: 'ETA',
    whatsappShare: 'WhatsApp Field GPS',
    vaniVoiceTitle: 'Vani-AI: Voice Assistant',
    vaniVoicePrompt: 'Tap microphone or click any quick query below...',
    tryAsking: 'Try asking:',
    quickChips: 'Quick Voice Queries',
    bookingSuccess: 'Booking Confirmed!',
    close: 'Close',
    confirmBooking: 'Confirm & Send Request',
    bookingSummary: 'Booking Details',
    bookingReceipt: 'Booking Receipt',
    bookingOwnerNotified: 'The equipment owner and operator have received your field location.',
    bookingCode: 'Booking ID:',
    equipmentOwner: 'Owner:',
    dateLabel: 'Date:',
    durationLabel: 'Duration / Area:',
    selectDate: 'Date',
    todayLabel: 'Today (Immediate)',
    tomorrowLabel: 'Tomorrow Morning',
    pickDateLabel: 'Pick Date',
    durationHours: 'Duration / Units',
    needDriver: 'Include Operator / Driver',
    operatorIncluded: 'Expert operator included with machine',
    specialNotes: 'Field Landmark & Notes',
    notesPlaceholder: 'e.g. 3 acre field near borewell, accessible by tar road...',
    rateCalc: 'Rate Calculation',
    freePlatformFee: 'Platform Fee (Free for Farmers):',
    submittingBooking: 'Reserving booking...',
    smsAlertTitle: 'SMS Confirmation (Demo):',
    smsAlertSample: 'KSHETRA Alert: Your booking for {title} (₹{total}) is confirmed. Operator will call you shortly.',
    totalEstimated: 'Estimated Total',
    hours: 'Hours',
    acres: 'Acres',
    quintals: 'Quintals',
    providerHeader: 'Equipment Owner & Transporter Control Center',
    providerWelcome: 'Dnyaneshwar Jadhav — Owner Portal',
    providerSubtitle: 'Manage machinery listings, accept farmer bookings, and track rental earnings.',
    myInventory: 'My Listed Machines & Vehicles',
    addMachine: '+ Add Machine/Service',
    pendingRequests: 'Farmer Booking Requests',
    pendingRequestsSubtitle: 'Incoming requests from local farmers for your machinery',
    pendingBadgeText: 'Pending Requests',
    demandText: 'Request:',
    dateTag: 'Date:',
    notesTag: 'Note:',
    rentAmountTag: 'Rent Amount:',
    approve: 'Accept',
    reject: 'Decline',
    approvedStatus: 'Approved',
    rejectedStatus: 'Declined',
    manageAvailabilitySubtitle: 'Toggle machine status: Available on rent or Busy in field',
    completedJobsTag: 'Jobs Done:',
    ratingTag: 'Rating:',
    statusAvailable: 'Available on Rent',
    statusBusy: 'Currently in Field',
    changeStatusBtn: 'Toggle Status',
    monthlyEarnings: 'This Month Earnings',
    monthlyGrowth: '↑ 28% growth over last month',
    activeJobs: 'Active Field Jobs',
    activeJobsDetail: '2 Tractors + 1 Rotavator in field',
    ratingAvg: 'Farmer Rating',
    farmersSatisfied: '114 Farmers Satisfied',
    addMachineModalTitle: 'Add New Machine or Service',
    machineNameLabel: 'Equipment / Vehicle Name & Model:',
    machineNamePlaceholder: 'e.g. Swaraj 744 FE (48 HP) + Plough',
    rentalRateLabel: 'Rental Rate (₹):',
    unitLabel: 'Unit:',
    hourUnit: '₹ / Hour',
    acreUnit: '₹ / Acre',
    dayUnit: '₹ / Day',
    kmUnit: '₹ / KM',
    completeListingBtn: 'Complete Listing',
    requestApprovedToast: 'Farmer booking accepted! Operator dispatched.',
    requestDeclinedToast: 'Request declined.',
    statusUpdatedToast: 'Equipment status updated!',
    equipmentListedToast: 'New equipment listed successfully!',
    activeBookingsAlert: 'You have {count} active booking(s)',
    hideBtn: 'Hide',
    viewBtn: 'View',
    myActiveBookings: 'My Active Bookings',
    tollFreeLabel: 'Toll-Free',
    allRightsReserved: 'All rights reserved.',
    onlyDistrict: 'Only',
    allRegions: 'All Maharashtra',
    servicesAvailableIn: 'services available in',
    viewOtherRegions: 'View services in other regions',
    availableToday: 'Available Today',
    save50: 'Save 50%',
    sharedFreight: '🚚 Shared Freight',
    sharedMachine: '🚜 Machinery Pool',
    route: 'Route',
    capacityFilled: 'Capacity Filled',
    groupRate: 'Group Rate',
    soloRate: 'Solo Rate',
    savings: 'Savings',
    farmersJoined: 'farmers joined',
    takeSlot: 'Join Pool',
    poolFull: 'Full',
    joinGroupTitle: 'Saha-Kisan Group Reservation',
    yourQuantityMax: 'Your Load Quantity (Max: {cap})',
    pickupLandmarkLabel: 'Pickup Landmark / Field Location:',
    pickupPlaceholder: 'e.g. Highway crossing, Tar road farm',
    costLabel: 'Cost',
    confirmSlotBtn: 'Confirm Slot Reservation',
    groupTitleLabel: 'Group Title / Vehicle:',
    groupTitlePlaceholder: 'e.g. Pune APMC 10-Wheeler Truck',
    destinationMandiLabel: 'Destination Mandi:',
    totalCapacityQt: 'Total Capacity (Quintals):',
    myLoadQt: 'My Load Share (Quintals):',
    publishGroupBtn: 'Publish Group Pool',
    slotReservedMsg: 'Slot reserved! You saved approximately ₹{saved}!',
    poolCreatedMsg: 'New Saha-Kisan group pool published!',
    lossVsBest: 'loss vs best deal',
    netCashInHand: 'Actual Net Cash In-Hand',
    distanceFromHub: 'Distance from',
    breakdownSelector: 'Select Breakdown Issue:',
    minFieldDispatch: '15-Min Field Dispatch',
    beaconActiveStatus: 'Beacon Transmitting',
    pressSOS: 'Tap SOS Beacon',
    mechanicsNearby: 'Verified mechanics in',
    callDirect: 'Call Direct',
    whatsapp: 'WhatsApp',
    minute: 'min',
    km: 'km',
    perQuintal: '/Quintal',
    sosBeaconSentMsg: 'SOS Beacon active! Broadcasted to verified mechanics in {district}.',
    voiceSpeakPrompt: 'Speak in Marathi, Hindi, or English...',
    voiceListening: 'Listening...',
    tapToSpeak: 'Tap to Speak',
    listeningPrompt: 'Please speak your requirement...',
    instantVoiceChips: 'Instant Voice Queries (Tap to run):',
    run: 'Run',
    typeOrSpeak: 'Type or speak search here...',
    voiceSearchTitle: 'Voice Search',
    understoodVoiceOpening: 'Understood! Opening {query} for your area.',
    voiceRecognized: 'Recognized Voice Command',
    login: 'Login',
    signup: 'Sign Up',
    register: 'Register',
    loginOrRegister: 'Login / Register',
    logout: 'Logout',
    welcomeBack: 'Welcome Back!',
    createAccount: 'Create Farmer Account',
    loginSubtitle: 'Access personalized mandi rates, machinery rental & transport pooling',
    signupSubtitle: 'Join 10,000+ local farmers on Maharashtra\'s trusted agri platform',
    mobileNumber: 'Mobile Number',
    enterMobile: 'Enter 10-digit mobile number',
    fullName: 'Full Name',
    enterFullName: 'e.g. Ramesh Patil',
    enterPinOrPassword: 'Enter 4-Digit PIN',
    kisanPin: 'Kisan PIN (4 Digits)',
    loginWithOtp: 'Mobile OTP',
    loginWithPin: 'Kisan PIN',
    sendOtp: 'Send OTP',
    enterOtp: 'Enter 4-Digit OTP',
    verifyAndLogin: 'Verify & Login',
    resendOtp: 'Resend OTP in',
    resendNow: 'Resend OTP Now',
    otpSentTo: 'OTP sent to +91',
    fillDemoOtp: 'Auto-fill Demo OTP (1234)',
    quickDemoLogin: 'Quick 1-Click Demo Login',
    selectRole: 'Select Role',
    roleFarmerDesc: 'I need machinery, farm labour, transport & mandi advice',
    roleProviderDesc: 'I own tractors, harvesters or transport vehicles',
    landSize: 'Land Holding (Acres)',
    primaryCrop: 'Primary Crop',
    alreadyHaveAccount: 'Already have an account? Login',
    dontHaveAccount: 'New to Kshetra? Create Free Account',
    loginSuccess: 'Login successful! Welcome to Kshetra',
    signupSuccess: 'Account created successfully! Welcome to Kshetra family',
    logoutSuccess: 'Logged out successfully',
    guestUser: 'Guest Farmer',
    myProfile: 'Farmer Profile',
    registeredFarmer: 'Verified Farmer',
    registeredProvider: 'Custom Hiring Center',
    authAudioIntro: 'Kshetra Login and Registration. Enter mobile number and verify via OTP to access all farmer services.',
    safeAndSecure: '100% Free & Verified Agri Platform',
    rememberMe: 'Remember on this phone',
    forgotPin: 'Forgot PIN?',
    resetPin: 'Reset with OTP',
    navAuth: 'Login / Sign Up',
    profileDetails: 'Farmer Identity & Land Details',
    villageHub: 'Village / Hub',
    skip: 'Skip',
    skipForNow: 'Skip for now',
    continueAsGuest: 'Skip & Continue as Guest',
    skipToHome: 'Skip to Home',
    skipSubtitle: 'You can explore all farm machinery, transport pools, mandi rates & SOS mechanics without logging in.',
    loginToContinue: 'Login or Sign Up to Continue',
    guestModeNotice: 'Guest Mode: You can browse freely. Login anytime to book machinery or register equipment.',
    editProfile: 'Edit Profile',
    saveProfile: 'Save Changes',
    cancelEdit: 'Cancel',
    dualModeBadge: 'Farmer & Service Provider',
    activeMode: 'Active Mode',
    modeFarmerName: 'Farmer Mode',
    modeProviderName: 'Service Provider Mode',
    switchToFarmer: 'Switch to Farmer Mode',
    switchToProvider: 'Switch to Service Provider Mode',
    providerStatus: 'Provider Status',
    providerActive: 'Provider Activated',
    providerInactive: 'Provider Inactive',
    enableProviderPrompt: 'Own tractors, machinery or offer agricultural services?',
    enableProviderBtn: 'Activate Service Provider on this Profile',
    disableProviderBtn: 'Deactivate Provider Mode',
    personalSection: 'Personal & Contact Information',
    farmingSection: 'Farmer Details (Landholding & Crops)',
    providerSection: 'Service Provider & Machinery Details',
    alternateMobile: 'Alternate / WhatsApp Number',
    bioTagline: 'Short Bio / Intro',
    bioPlaceholder: 'e.g. Progressive farmer & Swaraj tractor owner with 8 years experience',
    farmingType: 'Farming Practice',
    irrigationSource: 'Irrigation Source',
    businessName: 'Custom Hiring / Business Name',
    businessPlaceholder: 'e.g. Patil Krishi Yantra Seva Kendra',
    operatingRadius: 'Service Radius (KM)',
    experienceYears: 'Experience in Farming / Services (Years)',
    sosMechanicOptIn: 'Opt-in for Gram-Mechanic SOS Alerts',
    sosMechanicDesc: 'Receive alerts when local farmers experience field machine breakdowns',
    myMachinesTitle: 'My Machinery & Services',
    addMachineBtn: '+ Add Machine / Service',
    noMachinesYet: 'No equipment listed yet. Add your machinery to start receiving rental requests!',
    removeMachine: 'Remove',
    machineRateLabel: 'Rental Rate (₹)',
    machineUnitLabel: 'Per Unit',
    profileUpdatedSuccess: 'Profile updated successfully!',
    modeSwitchedSuccess: 'Switched to {mode}',
    avatarLabel: 'Profile Icon',
    quickFillDemo: 'Fill Sample Details',
    profileTitle: 'Unified Kisan Profile',
    profileSubtitle: 'One unified profile for farm management, machinery rental & custom services'
  },
  mr: {
    appTitle: 'क्षेत्र (KSHETRA)',
    appSubtitle: 'शेतकरी सेवा व अवजारे डिजिटल महामंच',
    motto: 'गट शक्ती व आधुनिक तंत्रज्ञानाने प्रत्येक शेतकऱ्याची समृद्धी',
    roleFarmer: 'शेतकरी स्वरूप',
    roleProvider: 'यंत्रमालक स्वरूप',
    switchRole: 'स्वरूप बदला',
    location: 'गाव/परिसर',
    changeLocation: 'परिसर निवडा',
    emergencyHelpline: 'किसान कॉल सेंटर १८००-१८०-१५५१',
    callKisanHelpline: 'कॉल १८००-१८०-१५५१',
    listenAdvisory: 'सल्ला ऐका',
    stopListening: 'आवाज थांबवा',
    navHome: 'मुख्य पान',
    navServices: 'शेती अवजारे',
    navPooling: 'वाहतूक वाटणी',
    navArbitrage: 'बाजारभाव नफा',
    navSos: 'मेकॅनिक SOS',
    navProvider: 'माझी अवजारे',
    searchPlaceholder: 'ट्रॅक्टर, रोटाव्हेटर, शेतमजूर, टेम्पो शोधा...',
    allCategories: 'सर्व',
    filterByDistance: 'परिसर अंतर',
    filterByPrice: 'जास्तीत जास्त दर',
    sortBy: 'क्रमवारी',
    sortRating: 'उत्कृष्ट रेटिंग',
    sortPriceLow: 'कमी दर आधी',
    sortDistance: 'जवळचे आधी',
    bookNow: 'मागणी करा (बुक)',
    callOwner: 'थेट फोन करा',
    verifiedService: 'प्रमाणित',
    readAloud: 'माहिती ऐका 🔊',
    listen: 'ऐका',
    weatherTitle: 'हवामान अंदाज व कृषी सल्ला',
    rainProbability: 'पावसाची शक्यता',
    humidity: 'आर्द्रता',
    windSpeed: 'वारा वेग',
    soilStatus: 'जमिनीतील ओलावा',
    categoryHeading: 'शेती सेवा व अवजारे',
    viewAllBtn: 'सर्व पहा',
    activePoolsTitle: 'सह-किसान: वाहतूक व यंत्र वाटणी गट',
    activePoolsDesc: 'शेजारील शेतकऱ्यांसोबत गाडी व हार्वेस्टर वाटून ५०% खर्च वाचवा.',
    joinPool: 'गटात जागा घ्या',
    createPool: '+ नवीन गट',
    arbitrageTitle: 'स्मार्ट बाजारभाव: निव्वळ नफा तुलना',
    arbitrageDesc: 'डिझेल, टोल व हमाली वजा जाता प्रत्यक्ष हातात किती नफा पडेल ते एका क्लिकवर जाणा.',
    selectCrop: 'पीक निवडा',
    cropQuantity: 'मालाचे प्रमाण (क्विंटल)',
    bestDealBadge: 'सर्वात जास्त नफा (उत्तम पर्याय)',
    mandiPrice: 'बाजारभाव',
    grossRevenue: 'एकूण रक्कम',
    transportCost: 'डिझेल व वाहतूक खर्च',
    loadingCost: 'हमाली व सेस',
    netProfit: 'हातात मिळणारा निव्वळ नफा',
    sosTitle: 'ग्राम-मेकॅनिक तातडीची सेवा (SOS)',
    sosSubtitle: 'शेतात ट्रॅक्टर किंवा पंप बंद पडला? १-टॅपमध्ये जवळचा मेकॅनिक बोलवा.',
    dispatchBeacon: 'शेतातून आपत्कालीन बीकन पाठवा',
    beaconActive: 'शेताचे थेट जीपीएस लोकेशन पाठवले जात आहे...',
    nearbyMechanics: '१० किमी परिसरातील उपलब्ध मेकॅनिक',
    eta: 'पोहोच वेळ',
    whatsappShare: 'व्हॉट्सअ‍ॅपवर लोकेशन पाठवा',
    vaniVoiceTitle: 'वाणी-एआय: आवाज सहाय्यक',
    vaniVoicePrompt: 'माईक दाबा किंवा खालीलपैकी कोणत्याही प्रश्नावर क्लिक करा...',
    tryAsking: 'उदाहरणार्थ बोला:',
    quickChips: 'झटपट व्हॉइस पर्याय',
    bookingSuccess: 'आपली मागणी यशस्वीरीत्या नोंदवली गेली!',
    close: 'बंद करा',
    confirmBooking: 'मागणी निश्चित करा',
    bookingSummary: 'मागणीचा तपशील',
    bookingReceipt: 'बुकिंग पावती',
    bookingOwnerNotified: 'यंत्रमालक व चालकाला आपल्या शेताचा संदेश पाठवला आहे.',
    bookingCode: 'बुकिंग कोड:',
    equipmentOwner: 'यंत्रमालक:',
    dateLabel: 'तारीख:',
    durationLabel: 'प्रमाण / क्षेत्रफळ:',
    selectDate: 'तारीख निवडा',
    todayLabel: 'आजच (तातडीने)',
    tomorrowLabel: 'उद्या सकाळी',
    pickDateLabel: 'इतर तारीख',
    durationHours: 'तास / एकर',
    needDriver: 'चालक / ऑपरेटर समाविष्ट',
    operatorIncluded: 'अनुभवी ऑपरेटर यंत्रासह मोफत उपलब्ध',
    specialNotes: 'शेताची खूण किंवा विशेष सूचना',
    notesPlaceholder: 'उदा. विहिरीजवळील ३ एकर रान, शेतात जायला डांबरी रस्ता आहे...',
    rateCalc: 'दर गणना',
    freePlatformFee: 'प्लॅटफॉर्म शुल्क (शेतकऱ्यांसाठी मोफत):',
    submittingBooking: 'नोंदणी होत आहे...',
    smsAlertTitle: 'SMS पुष्टीकरण (नमुना):',
    smsAlertSample: 'क्षेत्र अलर्ट: आपली {title} साठी ₹{total} ची नोंदणी निश्चित झाली आहे. चालक लवकरच संपर्क करेल.',
    totalEstimated: 'अंदाजे एकूण रक्कम',
    hours: 'तास',
    acres: 'एकर',
    quintals: 'क्विंटल',
    providerHeader: 'यंत्रमालक नियंत्रण केंद्र',
    providerWelcome: 'ज्ञानेश्वर जाधव — यंत्रमालक डॅशबोर्ड',
    providerSubtitle: 'आपली अवजारे भाड्याने द्या, शेतकऱ्यांच्या मागण्या स्वीकारा आणि कमाई वाढवा.',
    myInventory: 'माझी नोंदणीकृत अवजारे व वाहने',
    addMachine: '+ नवीन अवजार जोडा',
    pendingRequests: 'शेतकऱ्यांकडून आलेल्या मागण्या',
    pendingRequestsSubtitle: 'आपल्या अवजारांसाठी परिसरातील शेतकऱ्यांनी पाठवलेल्या मागण्या',
    pendingBadgeText: 'प्रलंबित मागण्या',
    demandText: 'मागणी:',
    dateTag: 'तारीख:',
    notesTag: 'सूचना:',
    rentAmountTag: 'भाडे रक्कम:',
    approve: 'मंजूर करा',
    reject: 'नाकारा',
    approvedStatus: 'मंजूर',
    rejectedStatus: 'नाकारले',
    manageAvailabilitySubtitle: 'मशीन उपलब्ध आहे की शेतात सुरू आहे ते येथे सेट करा',
    completedJobsTag: 'पूर्ण कामे:',
    ratingTag: 'रेटिंग:',
    statusAvailable: 'भाड्याने उपलब्ध',
    statusBusy: 'सध्या शेतात कामावर',
    changeStatusBtn: 'स्थिती बदला',
    monthlyEarnings: 'या महिन्याची कमाई',
    monthlyGrowth: '↑ मागील महिन्यापेक्षा २८% वाढ',
    activeJobs: 'सुरू असलेली कामे',
    activeJobsDetail: '२ ट्रॅक्टर + १ रोटाव्हेटर शेतात कार्यरत',
    ratingAvg: 'शेतकरी रेटिंग',
    farmersSatisfied: '११४ शेतकऱ्यांचे समाधान',
    addMachineModalTitle: 'नवीन अवजार किंवा वाहनाची नोंदणी',
    machineNameLabel: 'अवजार / वाहनाचे नाव व मॉडेल:',
    machineNamePlaceholder: 'उदा. स्वराज ७४४ एफई (४८ एचपी) + नांगर',
    rentalRateLabel: 'भाडे दर (₹):',
    unitLabel: 'एकक (Unit):',
    hourUnit: '₹ / तास',
    acreUnit: '₹ / एकर',
    dayUnit: '₹ / दिवस',
    kmUnit: '₹ / किमी',
    completeListingBtn: 'नोंदणी पूर्ण करा',
    requestApprovedToast: 'शेतकऱ्याची मागणी मंजूर केली! चालकाला कामाचे लोकेशन पाठवले.',
    requestDeclinedToast: 'मागणी नाकारली गेली.',
    statusUpdatedToast: 'अवजाराची स्थिती अपडेट केली गेली!',
    equipmentListedToast: 'नवीन अवजार यशस्वीरीत्या नोंदवले गेले!',
    activeBookingsAlert: 'आपल्याकडे {count} सक्रिय मागण्या आहेत',
    hideBtn: 'लपवा',
    viewBtn: 'पहा',
    myActiveBookings: 'माझ्या सक्रिय मागण्या',
    tollFreeLabel: 'मोफत',
    allRightsReserved: 'सर्व हक्क राखीव.',
    onlyDistrict: 'फक्त',
    allRegions: 'सर्व महाराष्ट्र',
    servicesAvailableIn: 'मध्ये सेवा उपलब्ध',
    viewOtherRegions: 'इतर परिसरातील अवजारे पहा',
    availableToday: 'आज उपलब्ध',
    save50: '५०% बचत',
    sharedFreight: '🚚 वाहतूक वाटणी',
    sharedMachine: '🚜 यंत्र समूह',
    route: 'मार्ग',
    capacityFilled: 'क्षमता भरली',
    groupRate: 'गट वाटणी दर',
    soloRate: 'एकट्याने नेल्यास दर',
    savings: 'बचत',
    farmersJoined: 'शेतकरी सहभागी',
    takeSlot: 'जागा घ्या',
    poolFull: 'फुल भरले',
    joinGroupTitle: 'सह-किसान गट नोंदणी',
    yourQuantityMax: 'आपल्या मालाचे प्रमाण (कमाल: {cap})',
    pickupLandmarkLabel: 'पिकअप पॉईंट / शेताचे नाव:',
    pickupPlaceholder: 'उदा. बायपास फाटा, डांबरी रस्त्याजवळ',
    costLabel: 'खर्च',
    confirmSlotBtn: 'जागा निश्चित करा',
    groupTitleLabel: 'गटाचे नाव / वाहन:',
    groupTitlePlaceholder: 'उदा. पुणे मार्केट १०-चाकी ट्रक',
    destinationMandiLabel: 'गंतव्य बाजार समिती:',
    totalCapacityQt: 'एकूण क्षमता (क्विंटल):',
    myLoadQt: 'माझा माल (क्विंटल):',
    publishGroupBtn: 'गट प्रकाशित करा',
    slotReservedMsg: 'गटात जागा आरक्षित! अंदाजे ₹{saved} ची थेट बचत!',
    poolCreatedMsg: 'नवीन सह-किसान गट तयार केला गेला!',
    lossVsBest: 'चा तोटा',
    netCashInHand: 'हातात प्रत्यक्ष निव्वळ नफा',
    distanceFromHub: 'पासून अंतर',
    breakdownSelector: 'शेतातील बिघाड निवडा:',
    minFieldDispatch: '१५-मिनिट शेतात दुरुस्ती',
    beaconActiveStatus: 'बीकन सुरू',
    pressSOS: 'SOS दाबा',
    mechanicsNearby: 'परिसरातील उपलब्ध मेकॅनिक:',
    callDirect: 'थेट फोन करा',
    whatsapp: 'व्हॉट्सअ‍ॅप',
    minute: 'मिनिटे',
    km: 'किमी',
    perQuintal: '/क्विंटल',
    sosBeaconSentMsg: 'आपत्कालीन बीकन सुरू! {district} परिसरातील मेकॅनिक्सना संदेश प्रसारित.',
    voiceSpeakPrompt: 'मराठी / हिंदी / इंग्रजीत बोला...',
    voiceListening: 'ऐकत आहे...',
    tapToSpeak: 'माईक दाबा',
    listeningPrompt: 'कृपया आपली मागणी बोला...',
    instantVoiceChips: 'झटपट व्हॉइस पर्याय (टॅप करा):',
    run: 'चालवा',
    typeOrSpeak: 'येथे बोला किंवा टाईप करा...',
    voiceSearchTitle: 'बोलून शोधा',
    understoodVoiceOpening: 'समजले! {query} साठी माहिती उघडत आहे.',
    voiceRecognized: 'आवाज ओळखला गेला',
    login: 'लॉगिन करा',
    signup: 'नवीन नोंदणी',
    register: 'नोंदणी करा',
    loginOrRegister: 'लॉगिन / नोंदणी',
    logout: 'लॉगआउट',
    welcomeBack: 'पुन्हा स्वागत आहे!',
    createAccount: 'नवीन शेतकरी खाते उघडा',
    loginSubtitle: 'वैयक्तिक बाजारभाव, अवजार भाडे व वाहतूक गट वाटणीसाठी लॉगिन करा',
    signupSubtitle: 'महाराष्ट्रातील १०,०००+ शेतकऱ्यांच्या डिजिटल क्षेत्र परिवारात सहभागी व्हा',
    mobileNumber: 'मोबाईल नंबर',
    enterMobile: '१० अंकी मोबाईल नंबर टाका',
    fullName: 'पूर्ण नाव',
    enterFullName: 'उदा. रमेश ज्ञानोबा पाटील',
    enterPinOrPassword: '४-अंकी किसान पिन टाका',
    kisanPin: 'किसान पिन (४ अंक)',
    loginWithOtp: 'मोबाईल OTP द्वारे',
    loginWithPin: 'किसान पिन द्वारे',
    sendOtp: 'OTP पाठवा',
    enterOtp: '४ अंकी OTP टाका',
    verifyAndLogin: 'सत्यापित करा व पुढे जा',
    resendOtp: 'पुन्हा OTP पाठवा',
    resendNow: 'आता पुन्हा OTP पाठवा',
    otpSentTo: 'या नंबरवर OTP पाठवला: +९१',
    fillDemoOtp: 'डेमो OTP भरा (१२३४)',
    quickDemoLogin: '१-क्लिक चाचणी डेमो लॉगिन',
    selectRole: 'आपली भूमिका निवडा',
    roleFarmerDesc: 'मला शेती अवजारे, शेतमजूर, वाहतूक व बाजारभाव हवे आहेत',
    roleProviderDesc: 'माझ्याकडे ट्रॅक्टर, हार्वेस्टर किंवा मालवाहू पिकअप गाडी आहे',
    landSize: 'शेतजमीन (एकर)',
    primaryCrop: 'मुख्य पीक',
    alreadyHaveAccount: 'आधीच नोंदणी झाली आहे? लॉगिन करा',
    dontHaveAccount: 'नवीन शेतकरी आहात? मोफत खाते उघडा',
    loginSuccess: 'लॉगिन यशस्वी! क्षेत्र प्लॅटफॉर्मवर आपले स्वागत आहे',
    signupSuccess: 'नोंदणी यशस्वी! क्षेत्र परिवारात आपले स्वागत आहे',
    logoutSuccess: 'लॉगआउट यशस्वी झाले',
    guestUser: 'अतिथी शेतकरी',
    myProfile: 'माझे शेतकरी प्रोफाईल',
    registeredFarmer: 'नोंदणीकृत शेतकरी',
    registeredProvider: 'यंत्र सेवा केंद्र',
    authAudioIntro: 'क्षेत्र लॉगिन आणि नोंदणी पृष्ठ. सर्व शेती सेवा मिळवण्यासाठी आपला मोबाईल नंबर टाका आणि OTP ने खात्री करा.',
    safeAndSecure: '१००% मोफत व सुरक्षित शेतकरी मंच',
    rememberMe: 'या फोनवर माहिती जतन ठेवा',
    forgotPin: 'पिन विसरलात?',
    resetPin: 'OTP ने पिन बदला',
    navAuth: 'लॉगिन / साइन-अप',
    profileDetails: 'शेतकरी ओळख व शेतजमीन तपशील',
    villageHub: 'गाव / तालुका',
    skip: 'पुढे जा (Skip)',
    skipForNow: 'आता पुढे जा (Skip)',
    continueAsGuest: 'अतिथी म्हणून ॲप वापरा (Skip)',
    skipToHome: 'लॉगिन न करता पुढे जा',
    skipSubtitle: 'आपण लॉगिन न करताही सर्व ट्रॅक्टर, कृषी अवजारे, बाजारभाव व मिस्त्री सेवा पाहू शकता.',
    loginToContinue: 'ॲपमध्ये पुढे जाण्यासाठी लॉगिन किंवा नोंदणी करा',
    guestModeNotice: 'अतिथी मोड: आपण ॲप सहज वापरू शकता. यंत्र बुकिंग किंवा नोंदणीसाठी केव्हाही लॉगिन करा.',
    editProfile: 'प्रोफाईल संपादन करा',
    saveProfile: 'बदल जतन करा',
    cancelEdit: 'रद्द करा',
    dualModeBadge: 'शेतकरी व सेवा प्रदाता (Dual Mode)',
    activeMode: 'सध्याचे सक्रिय स्वरूप',
    modeFarmerName: 'शेतकरी मोड (Farmer)',
    modeProviderName: 'सेवा प्रदाता मोड (Service Provider)',
    switchToFarmer: 'शेतकरी मोड सुरू करा',
    switchToProvider: 'सेवा प्रदाता मोड सुरू करा',
    providerStatus: 'सेवा प्रदाता स्थिती',
    providerActive: 'सेवा प्रदाता सक्रिय',
    providerInactive: 'प्रदाता मोड निष्क्रिय',
    enableProviderPrompt: 'आपल्याकडे ट्रॅक्टर, कृषी अवजारे किंवा मालवाहू पिकअप आहे का?',
    enableProviderBtn: 'या प्रोफाईलवर सेवा प्रदाता मोड सक्रिय करा',
    disableProviderBtn: 'सेवा प्रदाता मोड बंद करा',
    personalSection: 'वैयक्तिक व संपर्क माहिती',
    farmingSection: 'शेती व शेतजमीन माहिती (जमीन व पिके)',
    providerSection: 'यंत्रसामग्री व सेवा माहिती (अवजारे व भाडे)',
    alternateMobile: 'पर्यायी / व्हॉट्सॲप नंबर',
    bioTagline: 'थोडक्यात माहिती / परिचय',
    bioPlaceholder: 'उदा. प्रगतीशील शेतकरी व स्वराज ७४४ ट्रॅक्टर मालक (८ वर्षांचा अनुभव)',
    farmingType: 'शेतीची पद्धत',
    irrigationSource: 'पाणी पुरवठा / सिंचन सोय',
    businessName: 'कृषी केंद्र / व्यवसाय नाव',
    businessPlaceholder: 'उदा. पाटील कृषी अवजार व ट्रॅक्टर सेवा केंद्र',
    operatingRadius: 'सेवा कार्यक्षेत्र त्रिज्या (कि.मी.)',
    experienceYears: 'अनुभव (वर्षे)',
    sosMechanicOptIn: 'शेतातील मेकॅनिक SOS कॉल मिळवा',
    sosMechanicDesc: 'परिसरातील शेतकऱ्यांचे ट्रॅक्टर/मोटर शेतात बंद पडल्यास आपत्कालीन सूचना मिळवा',
    myMachinesTitle: 'माझी नोंदणीकृत यंत्रे व अवजारे',
    addMachineBtn: '+ नवीन अवजार/यंत्र जोडा',
    noMachinesYet: 'अद्याप कोणतेही यंत्र जोडलेले नाही. भाडे उत्पन्न मिळवण्यासाठी नवीन यंत्र जोडा!',
    removeMachine: 'काढून टाका',
    machineRateLabel: 'भाडे दर (₹)',
    machineUnitLabel: 'दर प्रमाण',
    profileUpdatedSuccess: 'प्रोफाईल माहिती यशस्वीरीत्या अद्ययावत झाली!',
    modeSwitchedSuccess: '{mode} सुरू केला!',
    avatarLabel: 'प्रोफाईल चिन्ह',
    quickFillDemo: 'नमुना माहिती भरा',
    profileTitle: 'एकात्मिक शेतकरी प्रोफाईल',
    profileSubtitle: 'शेती कामे, यंत्र भाडे व सेवा वाटणीसाठी एकाच खात्यात दोन्ही सुविधा'
  },
  hi: {
    appTitle: 'क्षेत्र (KSHETRA)',
    appSubtitle: 'एकीकृत डिजिटल कृषि सेवा मंच',
    motto: 'समूह शक्ति और आधुनिक तकनीक से हर किसान की समृद्धि',
    roleFarmer: 'किसान स्वरूप',
    roleProvider: 'मशीन मालिक स्वरूप',
    switchRole: 'स्वरूप बदलें',
    location: 'स्थान/गांव',
    changeLocation: 'गांव / मंडी चुनें',
    emergencyHelpline: 'किसान कॉल सेंटर 1800-180-1551',
    callKisanHelpline: 'कॉल 1800-180-1551',
    listenAdvisory: 'सलाह सुनें',
    stopListening: 'आवाज रोकें',
    navHome: 'मुख्य पृष्ठ',
    navServices: 'कृषि उपकरण',
    navPooling: 'साझा परिवहन',
    navArbitrage: 'मंडी मुनाफा',
    navSos: 'मिस्त्री SOS',
    navProvider: 'मेरी मशीनें',
    searchPlaceholder: 'ट्रैक्टर, रोटावेटर, मजदूर, पिकअप खोजें...',
    allCategories: 'सभी',
    filterByDistance: 'दूरी का दायरा',
    filterByPrice: 'अधिकतम किराया',
    sortBy: 'क्रमबद्ध करें',
    sortRating: 'सर्वोत्तम रेटिंग',
    sortPriceLow: 'कम दाम पहले',
    sortDistance: 'नजदीक पहले',
    bookNow: 'बुकिंग करें',
    callOwner: 'सीधा फोन करें',
    verifiedService: 'सत्यापित',
    readAloud: 'बोलकर सुनें 🔊',
    listen: 'सुनें',
    weatherTitle: 'मौसम पूर्वानुमान व कृषि परामर्श',
    rainProbability: 'बारिश की संभावना',
    humidity: 'नमी',
    windSpeed: 'हवा की गति',
    soilStatus: 'मिट्टी की नमी',
    categoryHeading: 'कृषि सेवाएं व उपकरण',
    viewAllBtn: 'सभी देखें',
    activePoolsTitle: 'सह-किसान: साझा परिवहन व उपकरण',
    activePoolsDesc: 'पड़ोसी किसानों के साथ ट्रक व कंबाइन हार्वेस्टर साझा कर 50% भाड़ा बचाएं।',
    joinPool: 'ग्रुप में जुड़ें',
    createPool: '+ नया समूह',
    arbitrageTitle: 'स्मार्ट मंडी: वास्तविक शुद्ध मुनाफा तुलना',
    arbitrageDesc: 'डीजल और पल्लेदारी खर्च काटकर हाथ में आने वाला वास्तविक शुद्ध मुनाफा देखें।',
    selectCrop: 'फसल चुनें',
    cropQuantity: 'मात्रा (क्विंटल)',
    bestDealBadge: 'सबसे ज्यादा मुनाफा (उत्तम सौदा)',
    mandiPrice: 'मंडी भाव',
    grossRevenue: 'कुल बिक्री',
    transportCost: 'डीजल व परिवहन खर्च',
    loadingCost: 'पल्लेदारी व सेस',
    netProfit: 'हाथ में शुद्ध मुनाफा',
    sosTitle: 'ग्राम-मिस्त्री आपातकालीन सेवा (SOS)',
    sosSubtitle: 'खेत में ट्रैक्टर या मोटर खराब? 1-टैप में नजदीकी मिस्त्री को बुलाएं।',
    dispatchBeacon: 'खेत से आपातकालीन बीकन भेजें',
    beaconActive: 'खेत की लाइव लोकेशन भेजी जा रही है...',
    nearbyMechanics: '10 किमी के भीतर उपलब्ध मिस्त्री',
    eta: 'पहुंचने का समय',
    whatsappShare: 'व्हाट्सएप पर लोकेशन भेजें',
    vaniVoiceTitle: 'वाणी-एआई: आवाज सहायक',
    vaniVoicePrompt: 'माइक दबाएं या नीचे दिए किसी विकल्प पर क्लिक करें...',
    tryAsking: 'उदाहरण:',
    quickChips: 'त्वरित आवाज विकल्प',
    bookingSuccess: 'आपकी बुकिंग दर्ज हो गई!',
    close: 'बंद करें',
    confirmBooking: 'अनुरोध भेजें',
    bookingSummary: 'बुकिंग विवरण',
    bookingReceipt: 'बुकिंग रसीद',
    bookingOwnerNotified: 'मशीन मालिक को आपकी मांग व खेत की लोकेशन भेजी जा चुकी है।',
    bookingCode: 'बुकिंग कोड:',
    equipmentOwner: 'मशीन मालिक:',
    dateLabel: 'तारीख:',
    durationLabel: 'मात्रा / अवधि:',
    selectDate: 'तारीख चुनें',
    todayLabel: 'आज ही (तत्काल)',
    tomorrowLabel: 'कल सुबह',
    pickDateLabel: 'अन्य तारीख',
    durationHours: 'घंटे / एकड़',
    needDriver: 'ड्राइवर / ऑपरेटर साथ चाहिए',
    operatorIncluded: 'अनुभवी ऑपरेटर मशीन के साथ मुफ्त शामिल',
    specialNotes: 'खेत का लैंडमार्क या निर्देश',
    notesPlaceholder: 'उदा. बोरवेल के पास 3 एकड़ खेत, पक्का रास्ता है...',
    rateCalc: 'किराया गणना',
    freePlatformFee: 'प्लेटफॉर्म शुल्क (किसानों के लिए मुफ्त):',
    submittingBooking: 'बुकिंग दर्ज हो रही है...',
    smsAlertTitle: 'SMS पुष्टि (नमूना):',
    smsAlertSample: 'क्षेत्र अलर्ट: आपकी {title} हेतु ₹{total} की बुकिंग दर्ज हो गई है। चालक जल्द संपर्क करेगा।',
    totalEstimated: 'अनुमानित कुल किराया',
    hours: 'घंटे',
    acres: 'एकड़',
    quintals: 'क्विंटल',
    providerHeader: 'मशीन मालिक व ट्रांसपोर्टर कंट्रोल सेंटर',
    providerWelcome: 'ज्ञानेश्वर जाधव — मालिक पोर्टल',
    providerSubtitle: 'मशीनें किराए पर दें, किसानों की बुकिंग स्वीकारें और कमाई बढ़ाएं।',
    myInventory: 'मेरी पंजीकृत मशीनें व वाहन',
    addMachine: '+ नया उपकरण जोड़ें',
    pendingRequests: 'किसानों से आई बुकिंग मांगें',
    pendingRequestsSubtitle: 'आपके उपकरणों के लिए किसानों द्वारा भेजी गई मांगें',
    pendingBadgeText: 'लंबित मांगें',
    demandText: 'मांग:',
    dateTag: 'तारीख:',
    notesTag: 'निर्देश:',
    rentAmountTag: 'किराया राशि:',
    approve: 'स्वीकार करें',
    reject: 'अस्वीकार करें',
    approvedStatus: 'स्वीकृत',
    rejectedStatus: 'अस्वीकृत',
    manageAvailabilitySubtitle: 'मशीन उपलब्ध है या खेत में कार्यरत है, यहां सेट करें',
    completedJobsTag: 'पूर्ण कार्य:',
    ratingTag: 'रेटिंग:',
    statusAvailable: 'किराए हेतु उपलब्ध',
    statusBusy: 'वर्तमान में खेत में कार्यरत',
    changeStatusBtn: 'स्थिति बदलें',
    monthlyEarnings: 'इस महीने की कमाई',
    monthlyGrowth: '↑ पिछले महीने से 28% अधिक',
    activeJobs: 'सक्रिय कार्य',
    activeJobsDetail: '2 ट्रैक्टर + 1 रोटावेटर खेत में सक्रिय',
    ratingAvg: 'किसान रेटिंग',
    farmersSatisfied: '114 किसान संतुष्ट',
    addMachineModalTitle: 'नया उपकरण या वाहन पंजीकृत करें',
    machineNameLabel: 'उपकरण / वाहन का नाम व मॉडल:',
    machineNamePlaceholder: 'उदा. स्वराज 744 एफई (48 एचपी) + हल',
    rentalRateLabel: 'किराया दर (₹):',
    unitLabel: 'इकाई (Unit):',
    hourUnit: '₹ / घंटा',
    acreUnit: '₹ / एकड़',
    dayUnit: '₹ / दिन',
    kmUnit: '₹ / किमी',
    completeListingBtn: 'पंजीकरण पूर्ण करें',
    requestApprovedToast: 'किसान की बुकिंग स्वीकृत! चालक को कार्य स्थल भेजा गया।',
    requestDeclinedToast: 'मांग अस्वीकृत की गई।',
    statusUpdatedToast: 'उपकरण की स्थिति अपडेट की गई!',
    equipmentListedToast: 'नया उपकरण सफलतापूर्वक जोड़ा गया!',
    activeBookingsAlert: 'आपके पास {count} सक्रिय बुकिंग हैं',
    hideBtn: 'छुपाएं',
    viewBtn: 'देखें',
    myActiveBookings: 'मेरी सक्रिय बुकिंग',
    tollFreeLabel: 'मुफ्त',
    allRightsReserved: 'सर्वाधिकार सुरक्षित।',
    onlyDistrict: 'केवल',
    allRegions: 'पूरा महाराष्ट्र',
    servicesAvailableIn: 'में सेवाएं उपलब्ध',
    viewOtherRegions: 'अन्य क्षेत्रों की सेवाएं देखें',
    availableToday: 'आज उपलब्ध',
    save50: '50% बचत',
    sharedFreight: '🚚 साझा परिवहन',
    sharedMachine: '🚜 मशीन समूह',
    route: 'रूट',
    capacityFilled: 'क्षमता भरी',
    groupRate: 'समूह दर',
    soloRate: 'अकेले का दर',
    savings: 'बचत',
    farmersJoined: 'किसान शामिल',
    takeSlot: 'ग्रुप में जुड़ें',
    poolFull: 'पैक है',
    joinGroupTitle: 'सह-किसान समूह स्लॉट बुकिंग',
    yourQuantityMax: 'माल की मात्रा (अधिकतम: {cap})',
    pickupLandmarkLabel: 'पिकअप स्थल / खेत का नाम:',
    pickupPlaceholder: 'उदा. हाईवे चौराहा, पक्के रास्ते के पास',
    costLabel: 'किराया',
    confirmSlotBtn: 'स्लॉट सुरक्षित करें',
    groupTitleLabel: 'समूह का नाम / वाहन:',
    groupTitlePlaceholder: 'उदा. पुणे मंडी 10-चक्का ट्रक',
    destinationMandiLabel: 'गंतव्य मंडी:',
    totalCapacityQt: 'कुल क्षमता (क्विंटल):',
    myLoadQt: 'मेरा हिस्सा (क्विंटल):',
    publishGroupBtn: 'समूह प्रकाशित करें',
    slotReservedMsg: 'ग्रुप में स्लॉट बुक हुआ! लगभग ₹{saved} की बचत!',
    poolCreatedMsg: 'नया साझा समूह बनाया गया!',
    lossVsBest: 'का नुकसान',
    netCashInHand: 'हाथ में वास्तविक शुद्ध मुनाफा',
    distanceFromHub: 'से दूरी',
    breakdownSelector: 'खेत में खराबी चुनें:',
    minFieldDispatch: '15-मिनट खेत में मदद',
    beaconActiveStatus: 'बीकन सक्रिय',
    pressSOS: 'SOS दबाएं',
    mechanicsNearby: 'के नजदीकी उपलब्ध मिस्त्री:',
    callDirect: 'सीधा फोन करें',
    whatsapp: 'व्हाट्सएप',
    minute: 'मिनट',
    km: 'किमी',
    perQuintal: '/क्विंटल',
    sosBeaconSentMsg: 'आपातकालीन बीकन सक्रिय! {district} के मिस्त्रियों को संदेश भेजा गया।',
    voiceSpeakPrompt: 'मराठी / हिंदी / अंग्रेजी में बोलें...',
    voiceListening: 'सुन रहे हैं...',
    tapToSpeak: 'माइक दबाएं',
    listeningPrompt: 'कृपया अपनी मांग बोलें...',
    instantVoiceChips: 'त्वरित आवाज विकल्प (टैप करें):',
    run: 'चलाएं',
    typeOrSpeak: 'यहां बोलें या टाइप करें...',
    voiceSearchTitle: 'बोलकर खोजें',
    understoodVoiceOpening: 'समझ गए! {query} की जानकारी खोल रहे हैं।',
    voiceRecognized: 'आवाज पहचानी गई',
    login: 'लॉगिन करें',
    signup: 'नया पंजीकरण',
    register: 'पंजीकरण करें',
    loginOrRegister: 'लॉगिन / पंजीकरण',
    logout: 'लॉगआउट',
    welcomeBack: 'पुनः स्वागत है!',
    createAccount: 'नया किसान खाता बनाएं',
    loginSubtitle: 'व्यक्तिगत मंडी भाव, कृषि यंत्र किराया व वाहन साझा हेतु लॉगिन करें',
    signupSubtitle: 'महाराष्ट्र के 10,000+ किसानों के डिजिटल क्षेत्र परिवार से जुड़ें',
    mobileNumber: 'मोबाइल नंबर',
    enterMobile: '10 अंकों का मोबाइल नंबर दर्ज करें',
    fullName: 'पूरा नाम',
    enterFullName: 'उदा. रमेश ज्ञानोबा पाटिल',
    enterPinOrPassword: '4-अंकीय किसान पिन दर्ज करें',
    kisanPin: 'किसान पिन (4 अंक)',
    loginWithOtp: 'मोबाइल OTP द्वारा',
    loginWithPin: 'किसान पिन द्वारा',
    sendOtp: 'OTP भेजें',
    enterOtp: '4 अंकों का OTP दर्ज करें',
    verifyAndLogin: 'सत्यापित करें व आगे बढ़ें',
    resendOtp: 'पुनः OTP भेजें',
    resendNow: 'अब पुनः OTP भेजें',
    otpSentTo: 'इस नंबर पर OTP भेजा गया: +91',
    fillDemoOtp: 'डेमो OTP भरें (1234)',
    quickDemoLogin: '1-क्लिक टेस्ट डेमो लॉगिन',
    selectRole: 'अपनी भूमिका चुनें',
    roleFarmerDesc: 'मुझे कृषि उपकरण, मजदूर, परिवहन व मंडी भाव चाहिए',
    roleProviderDesc: 'मेरे पास ट्रैक्टर, कंबाइन हार्वेस्टर या लोडिंग वाहन है',
    landSize: 'कृषि भूमि (एकड़)',
    primaryCrop: 'मुख्य फसल',
    alreadyHaveAccount: 'पहले से खाता है? लॉगिन करें',
    dontHaveAccount: 'नए किसान हैं? निःशुल्क खाता बनाएं',
    loginSuccess: 'लॉगिन सफल! क्षेत्र प्लेटफॉर्म में आपका स्वागत है',
    signupSuccess: 'पंजीकरण सफल! क्षेत्र परिवार में आपका स्वागत है',
    logoutSuccess: 'लॉगआउट सफल हुआ',
    guestUser: 'अतिथि किसान',
    myProfile: 'मेरा किसान प्रोफाइल',
    registeredFarmer: 'पंजीकृत किसान',
    registeredProvider: 'कस्टम हायरिंग सेंटर',
    authAudioIntro: 'क्षेत्र लॉगिन और पंजीकरण पृष्ठ। सभी कृषि सेवाओं का लाभ लेने हेतु मोबाइल नंबर दर्ज करें और OTP द्वारा सत्यापित करें।',
    safeAndSecure: '100% निःशुल्क व सुरक्षित किसान मंच',
    rememberMe: 'इस फोन पर याद रखें',
    forgotPin: 'पिन भूल गए?',
    resetPin: 'OTP से पिन बदलें',
    navAuth: 'लॉगिन / साइन-अप',
    profileDetails: 'किसान पहचान व कृषि भूमि विवरण',
    villageHub: 'गांव / तहसील',
    skip: 'आगे बढ़ें (Skip)',
    skipForNow: 'अभी छोड़ें (Skip)',
    continueAsGuest: 'बिना लॉगिन अतिथि बनकर आगे बढ़ें (Skip)',
    skipToHome: 'लॉगिन किए बिना आगे बढ़ें',
    skipSubtitle: 'आप बिना लॉगिन के भी सभी ट्रैक्टर, कृषि यंत्र, मंडी भाव और मिस्त्री सेवा देख व उपयोग कर सकते हैं।',
    loginToContinue: 'आगे बढ़ने के लिए लॉगिन या नया खाता बनाएं',
    guestModeNotice: 'अतिथि मोड: आप ऐप का स्वतंत्र रूप से उपयोग कर सकते हैं। बुकिंग हेतु कभी भी लॉगिन करें।',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    saveProfile: 'बदलाव सुरक्षित करें',
    cancelEdit: 'रद्द करें',
    dualModeBadge: 'किसान व सेवा प्रदाता (Dual Mode)',
    activeMode: 'वर्तमान सक्रिय स्वरूप',
    modeFarmerName: 'किसान मोड (Farmer)',
    modeProviderName: 'सेवा प्रदाता मोड (Service Provider)',
    switchToFarmer: 'किसान मोड शुरू करें',
    switchToProvider: 'सेवा प्रदाता मोड शुरू करें',
    providerStatus: 'सेवा प्रदाता स्थिति',
    providerActive: 'सेवा प्रदाता सक्रिय',
    providerInactive: 'प्रदाता मोड निष्क्रिय',
    enableProviderPrompt: 'क्या आपके पास ट्रैक्टर, कृषि यंत्र या लोडिंग वाहन है?',
    enableProviderBtn: 'इस प्रोफ़ाइल पर सेवा प्रदाता मोड सक्रिय करें',
    disableProviderBtn: 'सेवा प्रदाता मोड बंद करें',
    personalSection: 'व्यक्तिगत व संपर्क विवरण',
    farmingSection: 'खेती व भूमि विवरण (जमीन व फसलें)',
    providerSection: 'मशीनरी व सेवा विवरण (उपकरण व किराया)',
    alternateMobile: 'अतिरिक्त / व्हाट्सएप नंबर',
    bioTagline: 'संक्षिप्त परिचय / नोट',
    bioPlaceholder: 'उदा. प्रगतिशील किसान व स्वराज 744 ट्रैक्टर मालिक (8 वर्ष अनुभव)',
    farmingType: 'खेती का प्रकार',
    irrigationSource: 'सिंचाई का साधन',
    businessName: 'कृषि केंद्र / व्यापार नाम',
    businessPlaceholder: 'उदा. पाटिल कृषि यंत्र व ट्रैक्टर सेवा केंद्र',
    operatingRadius: 'सेवा कार्यक्षेत्र (किमी)',
    experienceYears: 'अनुभव (वर्ष)',
    sosMechanicOptIn: 'खेत में मिस्त्री SOS अलर्ट प्राप्त करें',
    sosMechanicDesc: 'आसपास के किसानों के ट्रैक्टर/मोटर खराब होने पर आपातकालीन सूचना प्राप्त करें',
    myMachinesTitle: 'मेरी पंजीकृत मशीनें व उपकरण',
    addMachineBtn: '+ नई मशीन/उपकरण जोड़ें',
    noMachinesYet: 'अभी कोई मशीन जोड़ी नहीं गई है। किराया कमाने हेतु नई मशीन जोड़ें!',
    removeMachine: 'हटाएं',
    machineRateLabel: 'किराया दर (₹)',
    machineUnitLabel: 'इकाई',
    profileUpdatedSuccess: 'प्रोफ़ाइल विवरण सफलतापूर्वक अपडेट हुआ!',
    modeSwitchedSuccess: '{mode} सक्रिय किया गया!',
    avatarLabel: 'प्रोफ़ाइल चिह्न',
    quickFillDemo: 'सैंपल जानकारी भरें',
    profileTitle: 'एकीकृत किसान प्रोफ़ाइल',
    profileSubtitle: 'कृषि कार्य, उपकरण किराया व सेवा साझा करने हेतु एक ही खाते में दोनों सुविधाएं'
  }
};

export const DEFAULT_USER_MACHINES = [
  {
    id: 'm-1',
    name: 'Mahindra 575 DI (45 HP) + 7ft Rotavator',
    rate: 850,
    unitKey: 'hourUnit',
    status: 'available',
    jobsDone: 38,
    rating: 4.9
  },
  {
    id: 'm-2',
    name: 'Bolero Maxi Truck (1.8 Ton APMC Cargo)',
    rate: 22,
    unitKey: 'kmUnit',
    status: 'available',
    jobsDone: 76,
    rating: 4.8
  }
];

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('kshetra_lang') || 'mr';
  });

  const [selectedLocation, setSelectedLocationState] = useState(() => {
    const saved = localStorage.getItem('kshetra_location_id');
    const found = LOCATIONS.find((l) => l.id === saved);
    return found || LOCATIONS[0];
  });

  const [role, setRole] = useState('farmer');
  const [authSkipped, setAuthSkipped] = useState(() => {
    return sessionStorage.getItem('kshetra_auth_skipped') === 'true';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('kshetra_user');
      if (!savedUser) return null;
      const parsed = JSON.parse(savedUser);
      if (parsed && typeof parsed === 'object' && parsed.name && (parsed.mobile || parsed.id)) {
        return parsed;
      }
      return null;
    } catch (e) {
      return null;
    }
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [farmerBookings, setFarmerBookings] = useState([]);

  const skipAuth = () => {
    setAuthSkipped(true);
    sessionStorage.setItem('kshetra_auth_skipped', 'true');
    const note = language === 'mr' 
      ? 'आपण अतिथी म्हणून ॲप वापरत आहात' 
      : language === 'hi' 
      ? 'आप बिना लॉगिन अतिथि मोड में हैं' 
      : 'You are browsing in guest mode';
    showToast(note, 'info');
  };

  const resetAuthSkipped = () => {
    setAuthSkipped(false);
    sessionStorage.removeItem('kshetra_auth_skipped');
  };

  const loginUser = (userData) => {
    const userRole = userData.activeMode || userData.role || 'farmer';
    const enrichedUser = {
      id: userData.id || `usr-${Date.now().toString().slice(-4)}`,
      name: userData.name || (language === 'mr' ? 'रमेश पाटील' : language === 'hi' ? 'रमेश पाटिल' : 'Ramesh Patil'),
      mobile: userData.mobile || '9822012345',
      whatsapp: userData.whatsapp || userData.mobile || '9822012345',
      avatar: userData.avatar || '👨‍🌾',
      bio: userData.bio || (language === 'mr' ? 'शिरूर परिसरातील शेतकरी व ट्रॅक्टर मालक' : language === 'hi' ? 'शिरूर के प्रगतिशील किसान व ट्रैक्टर मालिक' : 'Farmer & equipment owner in Shirur'),
      location: userData.location || selectedLocation,
      landAcre: userData.landAcre || '4.5',
      primaryCrop: userData.primaryCrop || (language === 'mr' ? 'कांदा व ऊस' : language === 'hi' ? 'प्याज व गन्ना' : 'Onion & Sugarcane'),
      farmingType: userData.farmingType || (language === 'mr' ? 'बागायती व सेंद्रिय' : language === 'hi' ? 'सिंचित व जैविक' : 'Irrigated & Organic'),
      irrigationType: userData.irrigationType || (language === 'mr' ? 'ठिबक सिंचन + विहीर' : language === 'hi' ? 'ड्रिप सिंचाई + कुआं' : 'Drip & Well'),
      activeMode: userRole,
      role: userRole,
      isProviderEnabled: userData.isProviderEnabled !== undefined ? userData.isProviderEnabled : true,
      businessName: userData.businessName || (language === 'mr' ? 'पाटील कृषी अवजार सेवा केंद्र' : language === 'hi' ? 'पाटिल कृषि उपकरण सेवा केंद्र' : 'Patil Agri Equipment Hub'),
      operatingRadiusKm: userData.operatingRadiusKm || 25,
      experienceYears: userData.experienceYears || 6,
      mechanicSosOptIn: userData.mechanicSosOptIn !== undefined ? userData.mechanicSosOptIn : false,
      machines: userData.machines && userData.machines.length > 0 ? userData.machines : DEFAULT_USER_MACHINES,
      joinedDate: userData.joinedDate || '2026-02-15',
      isVerified: true,
      ...userData
    };

    setCurrentUser(enrichedUser);
    localStorage.setItem('kshetra_user', JSON.stringify(enrichedUser));
    setAuthSkipped(true);
    sessionStorage.setItem('kshetra_auth_skipped', 'true');
    setRole(enrichedUser.activeMode);

    if (isFirebaseConfigured && enrichedUser.id) {
      saveUserProfile(enrichedUser.id, enrichedUser).catch((err) =>
        console.warn('Firestore profile persist:', err)
      );
    }

    const welcome = language === 'mr' 
      ? `स्वागत आहे, ${enrichedUser.name}! क्षेत्र एकात्मिक शेतकरी खात्यात आपले स्वागत आहे.`
      : language === 'hi'
      ? `स्वागत है, ${enrichedUser.name}! क्षेत्र एकीकृत किसान खाते में आपका स्वागत है।`
      : `Welcome, ${enrichedUser.name}! Logged into your unified profile.`;
    showToast(welcome, 'success');
  };

  const updateUserProfile = (updatedFields) => {
    let finalUser = null;
    setCurrentUser((prev) => {
      const merged = { ...(prev || {}), ...updatedFields };
      if (updatedFields.activeMode) {
        merged.role = updatedFields.activeMode;
        setRole(updatedFields.activeMode);
      }
      localStorage.setItem('kshetra_user', JSON.stringify(merged));
      finalUser = merged;
      return merged;
    });

    const msg = (TRANSLATIONS[language] || TRANSLATIONS.en).profileUpdatedSuccess || 'Profile updated successfully!';
    showToast(msg, 'success');

    if (isFirebaseConfigured && finalUser?.id) {
      saveUserProfile(finalUser.id, finalUser).catch((err) =>
        console.warn('Firestore profile update sync:', err)
      );
    }

    return finalUser;
  };

  const switchUserMode = (targetMode) => {
    const nextMode = targetMode || (role === 'farmer' ? 'provider' : 'farmer');
    setRole(nextMode);

    setCurrentUser((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        activeMode: nextMode,
        role: nextMode,
        isProviderEnabled: nextMode === 'provider' ? true : prev.isProviderEnabled
      };
      localStorage.setItem('kshetra_user', JSON.stringify(updated));
      return updated;
    });

    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    const modeLabel = nextMode === 'farmer' ? dict.modeFarmerName : dict.modeProviderName;
    const msg = (dict.modeSwitchedSuccess || 'Switched to {mode}').replace('{mode}', modeLabel);
    showToast(msg, 'info');
  };

  const addMachineToProfile = (newMachine) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;
      const currentMachines = prev.machines || [];
      const updatedMachines = [newMachine, ...currentMachines];
      const updated = { ...prev, machines: updatedMachines, isProviderEnabled: true };
      localStorage.setItem('kshetra_user', JSON.stringify(updated));
      return updated;
    });
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    showToast(dict.equipmentListedToast || 'Equipment listed successfully!', 'success');
  };

  const removeMachineFromProfile = (machineId) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;
      const updatedMachines = (prev.machines || []).filter((m) => m.id !== machineId);
      const updated = { ...prev, machines: updatedMachines };
      localStorage.setItem('kshetra_user', JSON.stringify(updated));
      return updated;
    });
    const msg = language === 'mr' ? 'यंत्र काढून टाकले' : language === 'hi' ? 'मशीन हटा दी गई' : 'Machine removed';
    showToast(msg, 'info');
  };

  const toggleMachineStatusInProfile = (machineId) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;
      const updatedMachines = (prev.machines || []).map((m) =>
        m.id === machineId
          ? { ...m, status: m.status === 'available' ? 'busy' : 'available' }
          : m
      );
      const updated = { ...prev, machines: updatedMachines };
      localStorage.setItem('kshetra_user', JSON.stringify(updated));
      return updated;
    });
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    showToast(dict.statusUpdatedToast || 'Status updated!', 'success');
  };

  const logoutUser = () => {
    logOutFromFirebase().catch(() => {});
    setCurrentUser(null);
    localStorage.removeItem('kshetra_user');
    setAuthSkipped(false);
    sessionStorage.removeItem('kshetra_auth_skipped');
    const msg = language === 'mr' ? 'लॉगआउट यशस्वी!' : language === 'hi' ? 'लॉगआउट सफल!' : 'Logged out successfully';
    showToast(msg, 'info');
  };

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('kshetra_lang', lang);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingId(null);
    }
    const label = lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'English';
    showToast(
      lang === 'mr'
        ? `भाषा बदलली: ${label}`
        : lang === 'hi'
        ? `भाषा बदली गई: ${label}`
        : `Language changed: ${label}`,
      'info'
    );
  };

  const setSelectedLocation = (loc) => {
    setSelectedLocationState(loc);
    localStorage.setItem('kshetra_location_id', loc.id);
    const locName = loc.name[language] || loc.name.mr;
    showToast(
      language === 'mr'
        ? `परिसर बदलला: ${locName}`
        : language === 'hi'
        ? `स्थान बदला गया: ${locName}`
        : `Location set to ${locName}`,
      'info'
    );
  };

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingId(null);
    }
  }, [language]);

  const speak = (text, id = 'global') => {
    if (!('speechSynthesis' in window)) {
      showToast('Audio synthesis not supported in this browser.', 'warning');
      return;
    }

    if (isSpeaking && speakingId === id) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (language === 'mr') {
      utterance.lang = 'mr-IN';
    } else if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingId(id);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setSpeakingId(null);
  };

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  // Synchronize bookings with Firestore when logged in
  useEffect(() => {
    if (!currentUser?.id || !isFirebaseConfigured) return;
    const unsubscribe = subscribeUserBookings(currentUser.id, (remoteBookings) => {
      if (remoteBookings && remoteBookings.length > 0) {
        setFarmerBookings((prev) => {
          const existingIds = new Set(prev.map((b) => b.id));
          const freshBookings = remoteBookings.filter((b) => !existingIds.has(b.id));
          return [...freshBookings, ...prev];
        });
      }
    });
    return () => unsubscribe && unsubscribe();
  }, [currentUser?.id]);

  const addFarmerBooking = (booking) => {
    const bookingWithUser = {
      ...booking,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || 'Farmer',
      userMobile: currentUser?.mobile || ''
    };
    setFarmerBookings((prev) => [bookingWithUser, ...prev]);

    if (isFirebaseConfigured) {
      createBookingInFirestore(bookingWithUser).catch((err) =>
        console.warn('Firestore booking persist:', err)
      );
    }

    showToast(
      language === 'mr'
        ? `बुकिंग यशस्वी! कोड: ${booking.id}`
        : language === 'hi'
        ? `बुकिंग सफल! कोड: ${booking.id}`
        : `Booking reserved! ID: ${booking.id}`,
      'success'
    );
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        role,
        setRole,
        selectedLocation,
        setSelectedLocation,
        isSpeaking,
        speakingId,
        speak,
        stopSpeaking,
        toastMessage,
        showToast,
        farmerBookings,
        addFarmerBooking,
        currentUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        switchUserMode,
        addMachineToProfile,
        removeMachineFromProfile,
        toggleMachineStatusInProfile,
        authSkipped,
        skipAuth,
        resetAuthSkipped
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
