const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const Wallet = require('../models/Wallet');


// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid token' });
  }
};

router.post('/registerAdmin', userController.registerAdmin);
router.post('/loginAdmin', userController.loginAdmin);
router.post('/registerSubAdmin', userController.registerSubAdmin);
//router.post('/updateSubAdmin',userController.updateSubAdmin);
//router.get('/getSubAdmin',userController.getSubAdmin);
router.post('/userRequestOTP', userController.userRequestOTP);
router.post('/userVerifyOTP', userController.userVerifyOTP);
router.post('/createlanguage', userController.createlanguage);
router.post('/createUser/:userId', userController.createUser);
router.post('/createCoinPackage', userController.createCoinPackage);
router.post('/FreeCoin', userController.FreeCoin);
router.post('/createCoinConversion', userController.createCoinConversion);
router.post('/wallpaper',userController.wallpaper);
router.post('/createframe', userController.createframe);
router.post('/createGift', userController.createGift);
// router.post('/testpayment', userController.testpayment);
router.post('/createAvatar', userController.createAvatar);
router.post('/createCategory', userController.createCategory);
router.post('/createBanner', userController.createBanner);
router.post('/createMood', userController.createMood);
router.get('/getLanguageBYId/:id', userController.getLanguageBYId);
router.put('/updateUser/:userId', userController.updateUser);
router.put('/updateLanguageById/:id', userController.updateLanguageById);
router.put('/updateCoinPackage/:id', userController.updateCoinPackage);
router.put('/updateFreeCoin/:id', userController.updateFreeCoin);
router.put('/updateCoinConversion', userController.updateCoinConversion);
router.put('/updateWallpaper/:id', userController.updateWallpaper);
router.put('/updateFrame/:id', userController.updateFrame);
router.put('/updateGift/:id', userController.updateGift);
router.put('/updateMood/:id', userController.updateMood);

router.get('/getAllLanguages',userController.getAllLanguages);
router.get('/searchByUsername', userController.searchByUsername);
router.get('/getAllCoinPackages', userController.getAllCoinPackages);
router.get('/getFreeCoin', userController.getFreeCoin);
router.get('/getCoinConversion', userController.getCoinConversion);
router.get('/getWallpaper/:id', userController.getWallpaper);
router.get('/getAllWallpaper', userController.getAllWallpaper);
router.get('/getAllFrame', userController.getAllFrame);
router.get('/getFrame/:id',userController.getFrame);
router.get('/getAllGifts', userController.getAllGifts);
router.get('/getGifts/:id',userController.getGifts);
router.get('/getAvatar', userController.getAvatar);
router.get('/getAvatarById/:id', userController.getAvatarById);
router.get('/getAllCategories', userController.getAllCategories);
router.get('/getCategoryById/:id', userController.getCategoryById);
router.get('/getProfile/:id', userController.getProfile);
router.get('/getAllBanner', userController.getAllBanner);
router.get('/getBannerById/:id', userController.getBannerById);
router.get('/getAllMood', userController.getAllMood);
router.get('/getMoodById/:id', userController.getMoodById);
router.get('/getOtherUserDetailById/:userId', userController.getOtherUserDetailById);
router.get('/getCoinPackageById/:id', userController.getCoinPackageById);


router.delete('/deleteLanguageById/:id', userController.deleteLanguageById);
router.delete('/deleteCoinPackage/:id', userController.deleteCoinPackage);
router.delete('/deleteFreeCoin/:id', userController.deleteFreeCoin);
router.delete('/deleteWallpaper/:id', userController.deleteWallpaper);
router.delete('/deleteFrame', userController.deleteFrame);
router.delete('/deleteCategoryById/:id', userController.deleteCategoryById);
// router.delete('/deleteGift/:id', userController.deleteGift);
// router.post('/login', userController.login);
//router.get('/profile', authenticateJWT, userController.getProfile);
//router.put('/profile', authenticateJWT, userController.updateProfile);

//router.post('/getToken', userController.getToken);

router.get('/getUsers', userController.getUsers);
router.get('/getUserCoinDetails/:userId', userController.getUserCoinDetails)

// Wallet
router.post('/createWallet', userController.createWallet);
router.get('/getWallet/:userId', userController.getWallet);
// router.post('/addFunds', userController.addFunds);
// router.post('/deductFunds', userController.deductFunds);
router.get('/getTransactionHistory/:userId', userController.getTransactionHistory);

router.post('/payment', userController.newPayment)

//Follow and unFollow

router.post('/followUser', userController.followUser);
router.post('/unfollowUser', userController.unfollowUser);
router.get('/getFollowers/:userId', userController.getFollowers);
router.get('/getFollowing/:userId', userController.getFollowing);

//OnetoOne

router.post('/userOneVsOneList', userController.userOneVsOneList);
router.get('/getUserOneVsOneList/:id', userController.getUserOneVsOneListByCategory);

router.post('/blockUser', userController.blockUser);

router.post('/createInitialCoin', userController.createInitialCoin);
router.get('/getInitialCoin', userController.getInitialCoin);
router.put('/updateInitialCoin', userController.updateInitialCoin);
//router.delete('/deleteInitialCoin', userController.deleteInitialCoin);

router.get('/getUserGift/:userId', userController.getUserGift);
router.post('/endCall', userController.endCall);

//heart conversion
router.post('/createOrUpdateHeartCostForCall', userController.createOrUpdateHeartCostForCall);
router.get('/getHeartCost', userController.getHeartCost);
router.delete('/deleteHeartCost', userController.deleteHeartCost);
router.post('/convertHeartsToAmount', userController.convertHeartsToAmount);
router.get('/getConversionHistory/:userId', userController.getConversionHistory);

router.post('/createOrUpdateHeartCost', userController.createOrUpdateHeartCost);
router.get('/getCallHeartCost', userController.getCallHeartCost);

router.post('/buyGift', userController.buyGift);
router.post('/shareGift', userController.shareGift);
router.post('/createOrUpdateCoinOfferBanner', userController.createOrUpdateCoinOfferBanner);
router.get('/getCoinOfferBannerById/:id', userController.getCoinOfferBannerById);
router.get('/getCoinOfferBanner', userController.getCoinOfferBanner);



router.post('/recordCoinPurchase', userController.recordCoinPurchase);
router.get('/getTransactionHistory/:userId', userController.getTransactionHistory)
router.get('/getWithdrawTransactionHistory/:userId', userController.getWithdrawTransactionHistory);

router.get('/getCoinTransactionHistory/:userId', userController.getCoinTransactionHistory)

router.post('/buyCoinPackage', userController.buyCoinPackage)

router.get('/getUserDataByUserId/:userId', userController.getUserDataByUserId);

router.post('/hostCall', userController.hostCall);
router.post('/selectHostUserForCall', userController.selectHostUserForCall);
router.get('/getUserOneVsOneListByUserId/:userId', userController.getUserOneVsOneListByUserId);
router.post('/submitKycPancard', userController.submitKycPancard);
router.get('/getKycPancard/:userId', userController.getKycPancard);

router.delete('/leaveCall/:userId', userController.leaveCall);

//ratecall
router.post('/rateCall', userController.rateCall);

//heart convert to amount
router.post('/SetHeartConversionRate', userController.SetHeartConversionRate);

//withdraw
router.post('/withdraw', userController.withdraw);

//Discover
router.post('/createDiscover', userController.createDiscover);
router.get('/getAllDiscoveries', userController.getAllDiscoveries);
router.get('/getDiscoveryById/:id', userController.getDiscoveryById);
router.post('/createCallCategory', userController.createCallCategory);
router.get('/getAllCallCategory', userController.getAllCallCategory);
router.get('/getCallCategoryById/:id', userController.getCallCategoryById);
router.put('/updateBanner/:id', userController.updateBanner);
router.get('/getHostedUsers', userController.getHostedUsers);
router.put('/updateHostedUserStatus',userController.updateHostedUserStatus);
router.put('/updateConnectStatus', userController.updateConnectStatus);


//testing

router.post('/createRoom', userController.createRoom);
router.post('/joinRequest', userController.joinRequest);
router.post('/acceptUser', userController.acceptUser);
// router.post('/grantViewOnly', userController.grantViewOnly);
// router.post('/kickUser', userController.kickUser);
// router.post('/leaveRoom', userController.leaveRoom);
// router.post('/closeRoom', userController.closeRoom);

router.post('/deleteUser/:id', userController.deleteUser);

router.post('/hostCallTest', userController.hostCallTest);
router.post('/selectHostUserForCallTest', userController.selectHostUserForCallTest);
router.post('/createOrUpdateFcmToken', userController.createOrUpdateFcmToken);

router.post('/startLiveStream', userController.startLiveStream);

router.post('/createPrivacyPolicy', userController.createPrivacyPolicy);
router.get('/getPrivacyPolicy',userController.getPrivacyPolicy);
router.get('/updatePrivacyPolicy', userController.updatePrivacyPolicy);
router.get('/getPrivacyPolicyById/:id', userController.getPrivacyPolicyById);
router.get('/getLeaderBoard', userController.getLeaderBoard);

//Role

router.post('/createRole', userController.createRole);
router.get('/getRoles', userController.getRoles);
router.get('/getRoleDetails/:id', userController.getRoleDetails);
router.put('/updateRole/:id', userController.updateRole);

router.get('/getMoneyPage/:id', userController.getMoneyPage);

router.post('/redeemHearts/:id', userController.redeemHearts);
router.get('/getWalletDetails/:id', userController.getWalletDetails);

router.post('/createConversionFactor', userController.createConversionFactor);
router.get('/getConversionFactors/:id', userController.getConversionFactors);
router.put('/updateConversionFactor/:id', userController.updateConversionFactor);
router.delete('/deleteConversionFactor/:id', userController.deleteConversionFactor);

router.post('/addNotification', userController.addNotification);
router.get('/getAllNotifications', userController.getAllNotifications);
router.get('/getNotificationById/:id', userController.getNotificationById);
router.put('/updateNotification/:id', userController.updateNotification);
router.get('/callhistory/:id', userController.callhistory);

router.get('/getCoinPackagePurchases', userController.getCoinPackagePurchases);
router.get('/getRevenueDetails',userController.getRevenueDetails);

router.post('/createReportReason', userController.createReportReason);
router.get('/getAllReportReasons', userController.getAllReportReasons);
router.get('/getReportReasonById/:id', userController.getReportReasonById);
router.put('/updateReportReason/:id', userController.updateReportReason);
router.delete('/deleteReportReason/:id', userController.deleteReportReason);
router.post('/reportUser', userController.reportUser);
router.get('/getOwnReportList/:id', userController.getOwnReportList);
router.get('/getAllUserReports', userController.getAllUserReports);

router.post('/sendNotification', userController.sendNotification);

router.post('/makeOrder', userController.makeOrder);
module.exports = router;
