const User = require('../models/User');
const Admin =require('../models/Admin');
const Language = require('../models/Language');
const CoinPackage = require('../models/CoinPackage')
const FreeCoin = require('../models/FreeCoin');
const CoinConversion =require('../models/CoinConversion');
const Wallpaper = require('../models/Wallpaper');
const Frame = require('../models/Frame');
const Gift = require('../models/GiftList');
const Avatar = require('../models/Avatar');
const Category = require('../models/Category');
const Banner =  require('../models/Banner');
const Mood = require('../models/Mood');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const Follow = require('../models/Follow');
const Block = require('../models/BlockUser');
const InitialCoin = require('../models/InitialCoin')
const UserOneVsOneList = require('../models/userOneVsOneList');
const UserCall = require('../models/UserCall');
const HeartCost = require('../models/HeartCost');
const HeartConversionHistory = require('../models/HeartConversionHistory');
const CallHeartCost = require('../models/CallHeartCost');
const GiftTransactionHistory = require('../models/GiftTransactionHistory'); 
const UserGift = require('../models/UserGift');
const CoinOfferBanner = require('../models/CoinOfferBanner');
const CoinPurchaseTransaction = require('../models/CoinPurchaseTransaction');
const CoinTransactionHistory = require('../models/CoinTransactionHistory');
const PanCardVerification = require('../models/PanCardVerification');
const HeartConversionRate = require('../models/HeartConversionRate');
const Discovery = require('../models/Discovery');
const CallRating = require('../models/CallRating');
const LiveStream = require('../models/LiveStream');
const callCategory = require('../models/CallCategory');
const UserFcmToken = require('../models/UserFcmToken');
const PrivacyPolicy = require('../models/PrivacyPolicy');
const Role = require('../models/Role');
const WithdrawWallet = require('../models/WithdrawWallet');
const RedeemHistory = require('../models/RedeemHistory');
const Conversion = require('../models/Conversion');
const notificationModel = require('../models/notificationModel');
const ReportReason = require('../models/ReportReason');
const Report = require('../models/Report');
//const UserCall = require('../models/UserCall'); 
const moment = require("moment");

const jwt = require('jsonwebtoken');
const axios = require('axios');
const crypto = require('crypto');
var sha256 = require('sha256');
var uniqid = require('uniqid');
const path = require('path');
const ms = require('ms');
const sharp = require('sharp'); 
const fs = require('fs-extra');
const cron = require('node-cron');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const { v4: uuidv4 } = require('uuid');
const server = require('./../app.js')
const admin = require('firebase-admin');
const serviceAccount = require('./../serviceAccountCredentials.json');
const Razorpay = require('razorpay');
//const crypto = require('crypto');

const APP_ID ='bdd00f68581f4432929eb056b26b2eba';
//const APP_ID ='5706e283c47f4cf1be78f39d340a4c2d';
//const APP_CERTIFICATE = '7f7f6064dfa14ebaa71de8ef4121c609';
const APP_CERTIFICATE ='ce47f829d5514255972835067b6f228f';
//const APP_CERTIFICATE ='007eJxTYOif/mvCbNfXBmreTPM7vjuqn5n3cE07K2/J/auJLy4E/36twGCUaGpgmGJsnmRobGpilJiaaGRgmWaWaGJokWyQmGiaFvF1W1pDICODarojAyMUgvj8DCGpuQUhqcUlzhmJeXmpOQwMAGbKJW8=';

const EXPIRATION_TIME_IN_SECONDS = 3600;


//const path = require('path');

const editJsonFile    = require('edit-json-file');
const formidable = require('formidable');

const WallpaperPath = '/etc/ec/data';
const URLpathI = 'wallpapers';
const framePath = '/etc/ec/data';
const URLpathF = 'frames';
const giftPath ='/etc/ec/data';
const URLpathG = 'gifts';
const bannerPath = '/etc/ec/data'; // Adjust the path as necessary
const URLpathB = 'banners'; // Adjust the path as necessar
const moodPath = '/etc/ec/data';
const URLpathM = 'moods';
const AvatarPath = '/etc/ec/data'; // Update with your directory path
const DiscoverPath = '/etc/ec/data';
const URLpathA = 'avatar'; // Update with your URL path
const LanguagePath = '/etc/ec/data'; // Adjust the path as necessary
const URLpathL = 'Language';
const categoryBasePath = '/etc/ec/data';
const URLpathCC ='CallCategory';

require("dotenv").config();



exports.registerAdmin = async (req, res) => {
  try{
    const { email, password, role } = req.body;

    console.log("email-------",email);
    const admin = new Admin({ email, password, role });
    await admin.save();
    console.log('Admin registered:', admin);
    res.status(200).json({message:'Admin registered Sucessfully'})
  }catch(error){
console.log("error------",error);
    res.status(500).json({message:'Internal Server Error'})
  }
};

exports.registerSubAdmin = async (req, res) => {
  try{
    const { email, password } = req.body;
    console.log("email-------",email);
    const admin = new Admin({ email, password, role:'subAdmin' });
    await admin.save();
    console.log('Admin registered:', admin);
    res.status(200).json({message:'Admin registered Sucessfully'})
  }catch(error){
    res.status(500).json({message:'Internal Server Error'})
  }
};

exports.loginAdmin = async (req, res) => {
  try{
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new Error('Admin not found');
  }
  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid password');
  }
  res.status(200).json({message:'Login successfully',isMatch})
}catch(error){
  res.status(500).json({message:'Internal Server Error'})
}
};



const generateCode = (language) => {
    // Example code generation logic (customize as needed)
    return language.toLowerCase().substring(0, 3); // First 3 letters of the language
};

exports.createlanguage = async (req, res) => {
    try {
        const { language, user } = req.body;

        console.log("req.body------------", req.body);

        // Validate input
        if (!language) {
            return res.status(400).json({ error: 'Language and code are required' });
        }

        const code = generateCode(language); // Generate code based on language

        // Create a new language document
        const newLanguage = new Language({
            language,
            user: user || 0,
            code, // Assign the generated code
        });

        // Save the language document to the database
        await newLanguage.save();

        // Return a success response
        res.status(201).json({ message: 'Language created successfully', language: newLanguage });
    } catch (error) {
        console.error('Error creating language:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getAllLanguages = async (req, res) => {
  try {
      const languages = await Language.find();
      res.status(200).json(languages);
  } catch (error) {
      console.error('Error retrieving languages:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getLanguageBYId = async (req,res)=>{

try{
	 const { id } = req.params;
 const language = await Language.findByIdAndUpdate(
          id);
      res.status(200).json({ message: 'Language updated successfully',language });
}catch(error){
res.status(500).json({ error: 'Internal server error' });
}
}

exports.updateLanguageById = async (req, res) => {
  try {
      const { id } = req.params;
      const { language, status } = req.body;

      if (!language || typeof status !== 'boolean') {
          return res.status(400).json({ error: 'Language is required and status must be a boolean' });
      }

      const updatedLanguage = await Language.findByIdAndUpdate(
          id,
          { language, status },
          { new: true, runValidators: true }
      );

      if (!updatedLanguage) {
          return res.status(404).json({ error: 'Language not found' });
      }

      res.status(200).json({ message: 'Language updated successfully', language: updatedLanguage });
  } catch (error) {
      console.error('Error updating language:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteLanguageById = async (req, res) => {
  try {
      const { id } = req.params;

      const deletedLanguage = await Language.findByIdAndDelete(id);

      if (!deletedLanguage) {
          return res.status(404).json({ error: 'Language not found' });
      }

      res.status(200).json({ message: 'Language deleted successfully' });
  } catch (error) {
      console.error('Error deleting language:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};



exports.userRequestOTP = async (req, res) => {
    try {
        const mobileNumber = req.body.mobileNumber;
        const email = req.body.email;
        const googleId = req.body.googleId;

        // Default to 0 if no InitialCoin document exists
        let initialCoin = 0;
        const initialCoinDoc = await InitialCoin.findOne();
        const status = initialCoinDoc ? initialCoinDoc.status : false; // Get the status of InitialCoin

        if (initialCoinDoc && status === true) {
            initialCoin = initialCoinDoc.coin;
        }

        // Define hardcoded mobile numbers and default OTP
        const hardcodedNumbers = ['9876543211', '9092568089']; // Add your specific numbers here
        const hardcodedOTP = 123456;

        // Mobile number-based flow
        if (mobileNumber) {
            console.log("Entering mobile number flow...");

            // Check if the mobile number already exists
            let user = await User.findOne({ mobileNumber });

            if (user) {
                // If the user exists, proceed to send OTP
                let otp;
                if (hardcodedNumbers.includes(mobileNumber)) {
                    otp = hardcodedOTP; // Use hardcoded OTP for specific numbers
                } else {
                    // Request OTP from external service (2Factor OTP API)
                    const response = await axios.get(`http://2factor.in/API/V1/9e880f4a-7dc5-11ec-b9b5-0200cd936042/SMS/${mobileNumber}/AUTOGEN2`);
                    console.log("OTP response----------", response.data);
                    otp = parseInt(response.data.OTP, 10); // Extract and convert OTP to a number
                }

                // Update OTP in the user's record
                user.otp = {
                    code: otp,
                    expiresAt: new Date(Date.now() + 1 * 60 * 1000) // OTP valid for 1 minute
                };

                await user.save();
                return res.status(200).send({ message: 'OTP sent successfully', isExistingUser: true });
            } else {
                // If user doesn't exist, create a new user with mobile number
                let otp;
                if (hardcodedNumbers.includes(mobileNumber)) {
                    otp = hardcodedOTP; // Use hardcoded OTP for specific numbers
                } else {
                    // Request OTP from external service (2Factor OTP API)
                    const response = await axios.get(`http://2factor.in/API/V1/9e880f4a-7dc5-11ec-b9b5-0200cd936042/SMS/${mobileNumber}/AUTOGEN2`);
                    console.log("OTP response----------", response.data);
                    otp = parseInt(response.data.OTP, 10); // Extract and convert OTP to a number
                }

                user = new User({
                    mobileNumber,
                    username: `user_${mobileNumber}`, // Create username based on mobile number
                });

                // Update OTP in the user's record
                user.otp = {
                    code: otp,
                    expiresAt: new Date(Date.now() + 1 * 60 * 1000) // OTP valid for 1 minute
                };

                // Add coins to the user
                const wallet = new Wallet({
                    userId: user._id,
                    balance: initialCoin
                });
                await wallet.save();

                // Set the initial coin balance in the user's profile
                user.profile = user.profile || {}; // Ensure profile is initialized
                user.profile.coin = initialCoin;

                await user.save();
                return res.status(200).send({ message: 'OTP sent successfully', isExistingUser: false });
            }
        } else if (email) {
            // Email-based flow...
            let user = await User.findOne({ "profile.email": email });

            if (user) {
                if (user.mobileNumber) {
                    return res.status(200).send({ message: 'Existing user with mobile number', isExistingUser: true, user });
                } else {
                    return res.status(200).send({ message: 'Existing user without mobile number', isExistingUser: false, user });
                }
            } else {
                user = new User({
                    profile: { email },
                    googleId,
                    username: `user_${email.split('@')[0]}`,
                });

                const wallet = new Wallet({
                    userId: user._id,
                    balance: initialCoin
                });
                await wallet.save();

                user.profile.coin = initialCoin;

                await user.save();
                return res.status(201).send({ message: 'New user created successfully', isExistingUser: false, user });
            }
        } else {
            return res.status(400).send({ message: 'Please provide either mobile number or email and Google ID.' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
};


exports.userVerifyOTP = async (req, res) => {
  console.log("req.body-------", req.body);
  try {
    const { mobileNumber, otp } = req.body;

    // Check if the user exists
    const user = await User.findOne({ mobileNumber });
//	 if(user){
  //              if(!user.profile.language){
    //                    console.log("entering the condition check*************")
      //                  return res.status(200).send({message:'User Details Not found'});
        //        }
        //}

    if (!user) {
      return res.status(404).json({ message: 'Mobile number not found' });
    }

    console.log("Stored OTP code:", user.otp.code);
    console.log("Stored OTP expiresAt:", user.otp.expiresAt);
    console.log("Current time:", new Date());
    console.log("Provided OTP:", otp);

    // Verify the OTP
    const isOTPValid = user.verifyOTP(otp);
    console.log("user.verifyOTP(otp)----------outside the condition", isOTPValid);

    // Determine if the user is already registered based on mobileNumber existence
    const isExistingUser = user.mobileNumber ? true : false;

    if (isOTPValid) {
         if(!user.profile.language){
          return res.status(200).json({message:'User Details Not found',user}); 
         }
      return res.status(200).json({ message: 'OTP verified successfully', user });
    } else {
      return res.status(400).json({ message: 'Invalid OTP or expired' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


/*
exports.createUser = async (req,res) => {
  console.log("------------------",req.body)
 try{
console.log("req.params.userId---------------",req.params.userId);
  const id=req.params.userId;
  const { username, dateOfBirth, language, place, gender, avatar  } = req.body;

  const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    existingUser.username = username;
    existingUser.profile.dateOfBirth = dateOfBirth;
    existingUser.profile.language = language;
    existingUser.profile.place = place;
    existingUser.profile.gender = gender;
    existingUser.profile.avatar = avatar;

    await existingUser.save();
  res.status(200).json({message:'user details created Successfully'})
 }catch(error){
console.log("error------------",error);

  res.status(500).json({message:'Internal Server Error'})
 } 
}
*/
/*
exports.createUser = async (req, res) => {
  console.log("------------------", req.body);
  try {
    console.log("req.params.userId---------------", req.params.userId);
    const id = req.params.userId;
    
    const {
      username,
      dateOfBirth,
      language,
      place,
      gender,
      avatar,
      email,
      userDescription,
    } = req.body;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

   const existingUserName = await User.findOne({ username: username });
if (existingUserName) {
  return res.status(400).json({ message: 'Username already taken' });
}

// If no user found, proceed with insert/update


    // Update the fields with the value if present, otherwise set them to null
    existingUser.username = username;
    existingUser.profile.dateOfBirth = dateOfBirth || null;
    existingUser.profile.language = language || null;
    existingUser.profile.place = place || null;
    existingUser.profile.gender = gender || null;
    existingUser.profile.avatar = avatar || null;
    existingUser.profile.email = email || null;
    existingUser.profile.userDescription = userDescription || null;

    await existingUser.save();

    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    console.log("error------------", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
*/

exports.createUser = async (req, res) => {
  console.log("------------------", req.body);
  try {
    console.log("req.params.userId---------------", req.params.userId);
    const id = req.params.userId;

    const {
      username,
      dateOfBirth,
      language,
      place,
      gender,
      email,
      userDescription,
      mobileNumber,
    } = req.body;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
console.log("existingUser-----------",existingUser)
    const existingUserName = await User.findOne({ username: username });
console.log("existingUserName--------",existingUserName)
    if (existingUserName) {
      return res.status(400).json({ message: 'Username already taken' });
    }
if (req.body.mobileNumber) {
  const existingMobileNumCheck = await User.findOne({ mobileNumber: req.body.mobileNumber });
  
  if (existingMobileNumCheck) {
    return res.status(409).json({ message: 'Mobile number already in use' });
  }
  
  // If no existing mobile number is found, proceed to store the mobile number
  existingUser.mobileNumber = req.body.mobileNumber;
}
    // Update user fields
    existingUser.username = username;
    existingUser.profile.dateOfBirth = dateOfBirth || null;
    existingUser.profile.language = language || null;
    existingUser.profile.place = place || null;
    existingUser.profile.gender = gender || null;
    existingUser.profile.email = req.body.email || existingUser.profile.email;
//existingUser.mobileNumber = req.body.mobileNumber || existingUser.mobileNumber;
//    existingUser.profile.email = email || null;
  //  existingUser.mobileNumber = mobileNumber || null;
    existingUser.profile.userDescription = userDescription || null;
    existingUser.hosting=  true;
    // Handle image upload using your logic
    if (req.files && req.files.image) {
      const image = req.files.image;
      const imageName = image.name.replace(/ /g, '_');
      const URLpathI = 'profileImage';  // Folder where profile images will be stored
      const imagePath = `/etc/ec/data/${URLpathI}/${id}/${imageName}`;
      const imageDir = path.dirname(imagePath);

      // Create the directory path if it doesn't exist
      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
      }

      // Save the new image to the specified path
      fs.writeFileSync(imagePath, image.data);

      // Set the image URL in the user's profile
      existingUser.profile.image = `https://leodatingapp.aindriya.uk/${URLpathI}/${id}/${imageName}`;
    }

    // Save the updated user profile
    await existingUser.save();

    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


/*
exports.updateUser = async (req, res) => {
console.log("req.body-------------",req.body);
  try {
    const id = req.params.userId;
console.log("req.params.userId-------------",req.params.userId)
    const { username, dateOfBirth, language, place, gender, avatar, coin, blocklist, myMood, userDescription, email, hosting } = req.body;


console.log("req.body-------",req.body.myMood)
    //console.log("-----------",myMood)
console.log("id-------------",id)
    // Check if user exists
    const existingUser = await User.findById(id);
    console.log("existingUser-------",existingUser)
    console.log("id---------",id)
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    if (username){ existingUser.username = username;}
    if (dateOfBirth) {existingUser.profile.dateOfBirth = dateOfBirth;}
    if (language) {existingUser.profile.language = language;}
    if (place) {existingUser.profile.place = place;}
    if (gender) {existingUser.profile.gender = gender;}
    //if (avatar) existingUser.profile.avatar = avatar;
    if (coin) {existingUser.profile.coin = coin;}
    if (userDescription) {existingUser.profile.userDescription =userDescription;}
    if (email) {existingUser.profile.email = email};
    if(hosting){existingUser.hosting = hosting};
   if (avatar) {
      try {
        const avatarRecord = await Avatar.findById(avatar);
        if (!avatarRecord) {
          return res.status(404).json({ message: 'Avatar not found' });
        }
        existingUser.profile.avatar = avatarRecord.image;
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching avatar', error });
      }
    }

    if (myMood) {
console.log("-------------entering the flow  ----")
      try {
        const mood = await Mood.findById(myMood);
console.log("mood---------",mood)
        if (!mood) {
          return res.status(404).json({ message: 'Mood Not Found' });
        }
console.log("mood.image----------",mood.image)
console.log("mood.mood--------",mood.moodName)
        existingUser.profile.myMood = mood.image;
        existingUser.profile.moodName = mood.moodName;
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching mood', error });
      }
    }
    if (blocklist) existingUser.profile.blocklist =blocklist
    //existingUser.

    // Save updated user details
    await existingUser.save();

    res.status(200).json({ message: 'User details updated successfully',existingUser });
  } catch (error) {
    console.error("--------------error---------",error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
*/

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.userId;
    console.log("req.params.userId-------------", req.params.userId);
    const { 
      username, 
      dateOfBirth, 
      language, 
      place, 
      gender, 
      avatar, 
      coin, 
      blocklist, 
      myMood, 
      userDescription, 
      email, 
      hosting 
    } = req.body;

    console.log("req.body-------", req.body.myMood);
    console.log("id-------------", id);

    // Check if user exists
    const existingUser = await User.findById(id);
    console.log("existingUser-------", existingUser);
    
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    if (username) { existingUser.username = username; }
    if (dateOfBirth) { existingUser.profile.dateOfBirth = dateOfBirth; }
    if (language) { existingUser.profile.language = language; }
    if (place) { existingUser.profile.place = place; }
    if (gender) { existingUser.profile.gender = gender; }
    if (coin) { existingUser.profile.coin = coin; }
    if (userDescription) { existingUser.profile.userDescription = userDescription; }
    if (email) { existingUser.profile.email = email; }
    if (hosting) { existingUser.hosting = hosting; }

    // Handle avatar update if provided
    if (avatar) {
      try {
        const avatarRecord = await Avatar.findById(avatar);
        if (!avatarRecord) {
          return res.status(404).json({ message: 'Avatar not found' });
        }
        existingUser.profile.avatar = avatarRecord.image;
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching avatar', error });
      }
    }

    // Handle image upload
    if (req.files && req.files.image) {
      const image = req.files.image;
      const imageName = image.name.replace(/ /g, '_');
      const imagePath = `/etc/ec/data/profileImage/${id}/${imageName}`; // Save image path
      const imageDir = path.dirname(imagePath);

      // Create the directory if it doesn't exist
      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
      }

      // Save the image to the server
      fs.writeFileSync(imagePath, image.data);
      // Set the URL for the image
      existingUser.profile.image = `https://leodatingapp.aindriya.uk/profileImage/${id}/${imageName}`;
    }

    // Handle mood update if provided
    if (myMood) {
      console.log("-------------entering the flow  ----");
      try {
        const mood = await Mood.findById(myMood);
        if (!mood) {
          return res.status(404).json({ message: 'Mood Not Found' });
        }
        existingUser.profile.myMood = mood.image;
        existingUser.profile.moodName = mood.moodName;
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching mood', error });
      }
    }
    
    if (blocklist) { existingUser.profile.blocklist = blocklist; }

    // Save updated user details
    await existingUser.save();

    res.status(200).json({ message: 'User details updated successfully', existingUser });
  } catch (error) {
    console.error("--------------error---------", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/*
exports.getUsers =async(req,res)=>{
  try{
    const user = await User.find();
    res.status(200).json(user);
  }catch(error){
    console.log("error------",error)
    res.status(500).json({message:'Internal Server Error'})
  }
}
*/
/*
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    // Remove the otp field from each user object
    const sanitizedUsers = users.map(user => {
      const { otp, ...sanitizedUser } = user.toObject();
      return sanitizedUser;
    });

    res.status(200).json(sanitizedUsers);
  } catch (error) {
    console.log("error------", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
*/


/*
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    // Fetch the panCardVerifications collection and associate it with users
    const panCardVerifications = await PanCardVerification.find();

    // Remove the otp field and add the kyc field
    const sanitizedUsers = users.map(user => {
      const { otp, ...sanitizedUser } = user.toObject();

      // Find the corresponding panCardVerification for this user
      const panCard = panCardVerifications.find(pan => String(pan.userId) === String(user._id));
      sanitizedUser.kyc = panCard ? (panCard.verified ? "Approved" : "Requested") : "Requested";

      return sanitizedUser;
    });

    res.status(200).json(sanitizedUsers);
  } catch (error) {
    console.log("error------", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
*/

exports.getUsers = async (req, res) => {
  try {
    // Fetch the users in descending order of createdAt
    const users = await User.find().sort({ createdAt: -1 });

    // Fetch the panCardVerifications collection and associate it with users
    const panCardVerifications = await PanCardVerification.find();

    // Remove the otp field and add the kyc field
    const sanitizedUsers = users.map(user => {
      const { otp, ...sanitizedUser } = user.toObject();

      // Find the corresponding panCardVerification for this user
      const panCard = panCardVerifications.find(pan => String(pan.userId) === String(user._id));
      sanitizedUser.kyc = panCard ? (panCard.verified ? "Approved" : "Requested") : "Requested";

      return sanitizedUser;
    });

    res.status(200).json(sanitizedUsers);
  } catch (error) {
    console.log("error------", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


/*
exports.searchByUsername = async (req, res) => {
  try {
    const username = req.query.username; // Get the username from query parameters

    // Query the database to find users with username containing the input
    const users = await User.find({ username: { $regex: username, $options: 'i' } });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};*/

exports.searchByUsername = async (req, res) => {
  try {
    const username = req.query.username; // Get the username from query parameters
console.log("userName----------",username)
    // Query the database to find users with username containing the input
    const users = await User.find(
      { username: { $regex: username, $options: 'i' }, connectStatus:'online' }
    );

    // Filter out users without an avatar
const usersWithAvatar = users.filter(user => user.profile);

console.log("usersWithAvatar----------",usersWithAvatar)
    res.status(200).json(usersWithAvatar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.createCoinPackage = async (req, res) => {
  try {
    const { coin, rateInInr, text, status } = req.body; // Get coin package data from request body

    // Create a new coin package document
    const newCoinPackage = await CoinPackage.create({ coin, rateInInr, text, status });

    res.status(201).json({message:'Package Created Successfully',newCoinPackage});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateCoinPackage = async (req, res) => {
  try {
    const coinPackageId = req.params.id;
    const updates = req.body;

    // Constructing the update object to only include the fields that are present in the request body
    const updateFields = {};
    for (const key in updates) {
      updateFields[key] = updates[key];
    }

    // Update the document with the specified ID, including only the fields present in the updateFields object
    const updatedCoinPackage = await CoinPackage.findByIdAndUpdate(coinPackageId, updateFields, { new: true });

    res.status(200).json({message:'update Successfully',updatedCoinPackage});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAllCoinPackages = async (req, res) => {
  try {
    const coinPackages = await CoinPackage.find();

    res.status(200).json(coinPackages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getCoinPackageById = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    // Find the coin package by its ID
    const coinPackage = await CoinPackage.findById(id);

    // If the coin package is not found, return a 404 response
    if (!coinPackage) {
      return res.status(404).json({ message: 'Coin package not found' });
    }

    // Return the found coin package
    res.status(200).json(coinPackage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteCoinPackage = async (req, res) => {
  try {
    const coinPackageId = req.params.id;

    await CoinPackage.findByIdAndDelete(coinPackageId);

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select('-password');
//     res.send(user);
//   } catch (error) {
//     console.log("error------",error)
//     res.status(400).send({ error: error.message });
//   }
// };

// exports.updateProfile = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true }).select('-password');
//     res.send(user);
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// };


exports.newPayment = async (req, res) => {
   const merchant_id = 'PGTESTPAYUAT';
 const salt_key = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
 const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox"
  try {
      const { name, merchantTransactionId, merchantUserId, amount } = req.body

      const data = {
          merchantId: merchant_id,
          merchantTransactionId,
          merchantUserId,
          name,
          amount: amount * 100,
         // redirectUrl: `http://localhost:5174/${merchantTransactionId}`,
          redirectMode: 'POST',
          paymentInstrument: {
              type: 'PAY_PAGE'
          }
      };
      console.log("data---",data)
      const payload = JSON.stringify(data);
      console.log("payload--------",payload);
      const bufferObj = await Buffer.from(JSON.stringify(payload), "utf8");
      const base64String =bufferObj.toString("base64");
      console.log("base64String--------",base64String);



      // const payloadMain = Buffer.from(payload).toString('base64');
      // console.log("payloadMain-------",payloadMain)
      const keyIndex = 1;
      const string = base64String + '/pg/v1/pay' + salt_key;
      console.log("string------",string);
      // const sha256 = crypto.createHash('sha256').update(string).digest('hex');
      const sha256val = sha256(string);
      const checksum = sha256val + '###' + keyIndex;

      console.log("checksum------",checksum);
      
      axios.post(
        `${PHONE_PE_HOST_URL}/pg/v1/pay`,
        { request: base64String },{
  headers:{
    'Content-Type':'application/json',
    'X-VERIFY':checksum,
    'accept':'application/json'
  }
}).then( (setdata)=>{
  console.log("--------------enter the console.-------")
res.redirect(responce.data)
})

//       //const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
//        const testUrl = 'https://api-preprod.phonepe.com/apis/pg-sandbox'
//        console.log("testUrl--------",testUrl)
//       const options = {
//           method: 'POST',
//           url: testUrl,
//           headers: {
//               accept: 'application/json',
//               'Content-Type': 'application/json',
//               'X-VERIFY': testUrl
//           },
//           data: {
//               request: payloadMain
//           }
//       };
// console.log("options------",options)
//       // axios.request(options).then(function (response) {
//       //     console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",response)
//       //     return res.redirect(response.data.data.instrumentResponse.redirectInfo.url)
//       // })
//       axios
//   .request(options)
//       .then(function (response) {
//       console.log("^^^^^^^^^^^^^^()^^^^^^",response.data);
//   })
//           .catch(function (error) {
//             console.log("-----------error1")
//               console.error(error);
//           });

  }catch (error) {
    console.log("---------------error2")
      res.status(200).send({
          message: error.message,
          success: false
      })
  } 
  
};



exports.FreeCoin = async (req, res) => {
  const { freeCoinforNewUser, expireAfter, status } = req.body;

  try {
    const freeCoin = new FreeCoin({
      freeCoinforNewUser,
      expireAfter, // Store expireAfter directly as days
      status
    });

    await freeCoin.save();

    res.status(200).json({ message: 'Free coins granted!', freeCoin });
  } catch (error) {
    res.status(500).json({ message: 'Error granting free coins', error });
  }
};

exports.getFreeCoin = async (req, res) => {
  try {
    const freeCoins = await FreeCoin.find();
    res.status(200).json(freeCoins);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving free coins', error });
  }
};

exports.updateFreeCoin = async (req, res) => {
  const { freeCoinforNewUser, expireAfter, status } = req.body;
  console.log("status",status)
  try {
    const freeCoin = await FreeCoin.findByIdAndUpdate(req.params.id, {
      freeCoinforNewUser,
      expireAfter,
      status
    }, { new: true });

    if (!freeCoin) {
      return res.status(404).json({ message: 'Free coin not found' });
    }

    res.status(200).json({ message: 'Free coin updated!', freeCoin });
  } catch (error) {
    res.status(500).json({ message: 'Error updating free coin', error });
  }
};


exports.deleteFreeCoin = async (req, res) => {
  try {
    const freeCoin = await FreeCoin.findByIdAndDelete(req.params.id);
    if (!freeCoin) {
      return res.status(404).json({ message: 'Free coin not found' });
    }
    res.status(200).json({ message: 'Free coin deleted!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting free coin', error });
  }
};




// // Function to check and update expired coins' status
// exports.checkExpiry = async (req, res) => {
//   try {
//     const now = new Date();
//     const expiredCoins = await FreeCoin.updateMany(
//       {
//         status: true,
//         createdAt: { $lt: new Date(now - req.body.expireAfter * 24 * 60 * 60 * 1000) }
//       },
//       { status: false }
//     );

//     res.status(200).json({ message: 'Expired coins status updated', expiredCoins });
//   } catch (error) {
//     res.status(500).json({ message: 'Error checking expired coins', error });
//   }
// };


// Create CoinConversion Entry
exports.createCoinConversion = async (req, res) => {
  console.log(req.body);
  const { coinHeartConversionFactor, heartConversionFactor, referrals } = req.body;

  console.log("1",coinHeartConversionFactor);
  console.log("2",heartConversionFactor);
  console.log("3",referrals);

  try {
    // Create CoinConversion object with nested schema data
    const coinConversion = new CoinConversion({
      coinHeartConversionFactor,
      heartConversionFactor,
      referrals
    });

    await coinConversion.save();

    res.status(200).json({ message: 'Coin conversion data created!', coinConversion });
  } catch (error) {
    console.log("error------".error);
    res.status(500).json({ message: 'Error creating coin conversion data', error });
  }
};


exports.getCoinConversion = async (req, res) => {
  try {
    const coinConversionData = await CoinConversion.findOne();
    if (!coinConversionData) {
      return res.status(404).json({ message: 'Coin conversion data not found' });
    }
    res.status(200).json({ message: 'Coin conversion data retrieved successfully', coinConversionData });
  } catch (error) {
    console.log("error------", error);
    res.status(500).json({ message: 'Error retrieving coin conversion data', error });
  }
};

exports.updateCoinConversion =async (req, res) =>{
  const { coinHeartConversionFactor, heartConversionFactor, referrals } = req.body;
  try {
    const coinConversionData = await CoinConversion.findOne();
    if (!coinConversionData) {
      return res.status(404).json({ message: 'Coin conversion data not found' });
    }
    coinConversionData.coinHeartConversionFactor = coinHeartConversionFactor;
    coinConversionData.heartConversionFactor = heartConversionFactor;
    coinConversionData.referrals = referrals;

    await coinConversionData.save();
    res.status(200).json({ message: 'Coin conversion data updated successfully', coinConversionData });
  } catch (error) {
    console.log("error------", error);
    res.status(500).json({ message: 'Error updating coin conversion data', error });
  }
}
exports.wallpaper = async(req,res) =>{
  try {
    console.log("req.body==============",req.body);
    console.log("req.files=============",req.files);
  
    const { name, oldPrice, newPrice, viewOrder, status } = req.body;
  
    if (!req.files || !req.files.image) {
       return res.status(400).json({ message: 'No file uploaded' });
    }
  
    const image = req.files.image;
    const finalName = name.replace(/\s+/g, '_');
    const desImageDir = `${WallpaperPath}/${URLpathI}/${finalName}`;
  
    if (!fs.existsSync(desImageDir)) {
        fs.mkdirSync(desImageDir, { recursive: true });
    }
  
    const imageName = image.name.replace(/ /g, '_');
    const originalImagePath = `${desImageDir}/${imageName}`;
    fs.writeFileSync(originalImagePath, image.data);
  
    // Create thumbnails directory if it doesn't exist
    const thumbnailDir = `${WallpaperPath}/thumbnails`;
    if (!fs.existsSync(thumbnailDir)) {
        fs.mkdirSync(thumbnailDir, { recursive: true });
    }
  
    // Determine file extension and resize accordingly
    const extension = path.extname(image.name).toLowerCase();
    const thumbnailImagePath = `${thumbnailDir}/${path.basename(imageName, extension)}.webp`;
    let pipeline;
  
    if (extension === '.png' || extension === '.jpg' || extension === '.jpeg') {
        pipeline = sharp(originalImagePath)
            .resize({ width: 200, height: 200 })
            .toFormat('webp')
            .webp({ quality: 80 })
            .toFile(thumbnailImagePath);
    } else {
        throw new Error('Unsupported file format');
    }
  
    await pipeline;
    const destinationImgUrl = `https://salesman.aindriya.co.in/${URLpathI}/${finalName}/${imageName}`;
    const thumbnailImgUrl = `https://salesman.aindriya.co.in/${URLpathI}/thumbnails/${path.basename(imageName, extension)}.webp`;
  console.log("destinationImgUrl--------",destinationImgUrl);
  console.log("thumbnailImgUrl------",thumbnailImgUrl)
  
    const wallpaper = new Wallpaper({
        name,
        oldPrice,
        newPrice,
        viewOrder,
        status,
        image: destinationImgUrl,
        thumbnail: thumbnailImgUrl
    });
  
    await wallpaper.save();
  
    res.status(201).json({ message: "Wallpaper created successfully", wallpaper });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  };
  

  exports.updateWallpaper = async (req, res) => {
    try {
      const { name, oldPrice, newPrice, viewOrder, status } = req.body;
      const wallpaperId = req.params.id;
  
      // Check if the wallpaper exists
      const wallpaper = await Wallpaper.findById(wallpaperId);
      if (!wallpaper) {
        return res.status(404).json({ message: 'Wallpaper not found' });
      }
  
      // Update the wallpaper fields
      wallpaper.name = name || wallpaper.name; // Update name if provided, otherwise keep the existing name
      wallpaper.oldPrice = oldPrice || wallpaper.oldPrice;
      wallpaper.newPrice = newPrice || wallpaper.newPrice;
      wallpaper.viewOrder = viewOrder || wallpaper.viewOrder;
      wallpaper.status = status || wallpaper.status;
  
      // Update the image field if a new image is provided
     /* if (req.files && req.files.image) {
        const image = req.files.image;
        const imageName = image.name.replace(/ /g, '_');
        const imagePath = `${WallpaperPath}/${wallpaper.name}/${imageName}`;
  
        // Save the new image
        fs.writeFileSync(imagePath, image.data);
        wallpaper.image = `https://salesman.aindriya.co.in/${URLpathI}/${wallpaper.name}/${imageName}`;
      }*/
  if (req.files && req.files.image) {
    const image = req.files.image;
    const imageName = image.name.replace(/ /g, '_');
    const imagePath = `${WallpaperPath}/${URLpathI}/${wallpaper.name}/${imageName}`;
    const imageDir = path.dirname(imagePath);
  
    // Create the directory path if it doesn't exist
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }
  
    // Save the new image
    fs.writeFileSync(imagePath, image.data);
    wallpaper.image = `https://salesman.aindriya.co.in/${URLpathI}/${wallpaper.name}/${imageName}`;
  }
  
      // Save the updated wallpaper
      await wallpaper.save();
  
      res.status(200).json({ message: 'Wallpaper updated successfully', wallpaper });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
exports.getWallpaper = async (req, res) => {
  try {
    const wallpaperId = req.params.id;

    // Find the wallpaper by ID
    const wallpaper = await Wallpaper.findById(wallpaperId);
    if (!wallpaper) {
      return res.status(404).json({ message: 'Wallpaper not found' });
    }

    // Return the wallpaper
    res.status(200).json({ wallpaper });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllWallpaper = async (req, res) => {
  try {
    // Fetch all wallpapers sorted by viewOrder in ascending order
    const AllWallpaper = await Wallpaper.find().sort({ viewOrder: 1 });
    res.status(200).json(AllWallpaper);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteWallpaper = async (req, res) => {
  try {
    const wallpaperId = req.params.id;

    // Find the wallpaper by ID
    const wallpaper = await Wallpaper.findById(wallpaperId);
    if (!wallpaper) {
      return res.status(404).json({ message: 'Wallpaper not found' });
    }

    // Delete the wallpaper
    await Wallpaper.deleteOne({ _id: wallpaperId });

    // Delete the associated image files (if any)
    const imageDir = `${WallpaperPath}/${wallpaper.name}`;
    if (fs.existsSync(imageDir)) {
      fs.rmdirSync(imageDir, { recursive: true });
    }

    // Return success response
    res.status(200).json({ message: 'Wallpaper deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createframe = async(req,res) =>{
  try {
    console.log("req.body==============",req.body);
    console.log("req.files=============",req.files);
    
    const { name, oldPrice, newPrice, viewOrder, status } = req.body;
  
    if (!req.files || !req.files.image) {
       return res.status(400).json({ message: 'No file uploaded' });
    }
  
    const image = req.files.image;
    const finalName = name.replace(/\s+/g, '_');
    const desImageDir = `${framePath}/${finalName}`;
  
    if (!fs.existsSync(desImageDir)) {
        fs.mkdirSync(desImageDir, { recursive: true });
    }
  
    const imageName = image.name.replace(/ /g, '_');
    const originalImagePath = `${desImageDir}/${imageName}`;
    fs.writeFileSync(originalImagePath, image.data);
  
    // Create thumbnails directory if it doesn't exist
    const thumbnailDir = `${framePath}/thumbnails`;
    if (!fs.existsSync(thumbnailDir)) {
        fs.mkdirSync(thumbnailDir, { recursive: true });
    }
  
    // Determine file extension and resize accordingly
    const extension = path.extname(image.name).toLowerCase();
    const thumbnailImagePath = `${thumbnailDir}/${path.basename(imageName, extension)}.webp`;
    let pipeline;
  
    if (extension === '.png' || extension === '.jpg' || extension === '.jpeg') {
        pipeline = sharp(originalImagePath)
            .resize({ width: 200, height: 200 })
            .toFormat('webp')
            .webp({ quality: 80 })
            .toFile(thumbnailImagePath);
    } else {
        throw new Error('Unsupported file format');
    }
  
    await pipeline;
  
    const destinationImgUrl = `https://salesman.aindriya.co.in/${URLpathF}/${finalName}/${imageName}`;
    const thumbnailImgUrl = `https://salesman.aindriya.co.in/${URLpathF}/thumbnails/${path.basename(imageName, extension)}.webp`;
  console.log("destinationImgUrl--------",destinationImgUrl);
  console.log("thumbnailImgUrl------",thumbnailImgUrl)
    
    const frame = new Frame({
        name,
        oldPrice,
        newPrice,
        viewOrder,
        status,
        image: destinationImgUrl,
        thumbnail: thumbnailImgUrl
    });
  
    await frame.save();
  
    res.status(201).json({ message: "Frame created successfully", frame });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  };

  exports.updateFrame = async (req, res) => {
    try {
      const { name, oldPrice, newPrice, viewOrder, status } = req.body;
      const frameId = req.params.id;
  
      // Check if the frame exists
      const frame = await Frame.findById(frameId);
      if (!frame) {
        return res.status(404).json({ message: 'frame not found' });
      }
  
      // Update the frame fields
      frame.name = name || frame.name; // Update name if provided, otherwise keep the existing name
      frame.oldPrice = oldPrice || frame.oldPrice;
      frame.newPrice = newPrice || frame.newPrice;
      frame.viewOrder = viewOrder || frame.viewOrder;
      frame.status = status || frame.status;
  
      // Update the image field if a new image is provided
      if (req.files && req.files.image) {
        const image = req.files.image;
        const imageName = image.name.replace(/ /g, '_');
        const imagePath = `${framePath}/${wallpaper.name}/${imageName}`;
  
        // Save the new image
        fs.writeFileSync(imagePath, image.data);
        frame.image = `https://salesman.aindriya.co.in/${URLpathF}/${frame.name}/${imageName}`;
      }
  
      // Save the updated wallpaper
      await frame.save();
  
      res.status(200).json({ message: 'Frame updated successfully', frame });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.getFrame = async (req, res) => {
    try {
      const frameId = req.params.id;
  
      // Find the wallpaper by ID
      const frame = await Frame.findById(frameId);
      if (!frame) {
        return res.status(404).json({ message: 'Frame not found' });
      }
  
      // Return the wallpaper
      res.status(200).json({ frame });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.getAllFrame = async (req, res) => {
    try {
      // Fetch all wallpapers sorted by viewOrder in ascending order
      const AllFrame = await Frame.find().sort({ viewOrder: 1 });
      res.status(200).json(AllFrame);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.deleteFrame = async (req, res) => {
    try {
      const frameId = req.params.id;
  
      // Find the frame by ID
      const frame = await Wallpaper.findById(frameId);
      if (!frame) {
        return res.status(404).json({ message: 'Frame not found' });
      }
  
      // Delete the frame
      await Frame.deleteOne({ _id: frameId });
  
      // Delete the associated image files (if any)
      const imageDir = `${framePath}/${frame.name}`;
      if (fs.existsSync(imageDir)) {
        fs.rmdirSync(imageDir, { recursive: true });
      }
  
      // Return success response
      res.status(200).json({ message: 'Frame deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  


  exports.createGift =async(req,res) =>{
    try {
      console.log("req.body==============",req.body);
      console.log("req.files=============",req.files);


      const { giftName, oldPrice, newPrice, viewOrder, status } = req.body;

      if (!req.files || !req.files.image) {
         return res.status(400).json({ message: 'No file uploaded' });
      }

      const image = req.files.image;
      const finalName = giftName.replace(/\s+/g, '_');
      const desImageDir = `${giftPath}/${URLpathG}/${finalName}`;

      if (!fs.existsSync(desImageDir)) {
          fs.mkdirSync(desImageDir, { recursive: true });
      }

      const imageName = image.name.replace(/ /g, '_');
      const originalImagePath = `${desImageDir}/${imageName}`;
      fs.writeFileSync(originalImagePath, image.data);

      // Create thumbnails directory if it doesn't exist
      const thumbnailDir = `${giftPath}/thumbnails`;
      if (!fs.existsSync(thumbnailDir)) {
          fs.mkdirSync(thumbnailDir, { recursive: true });
      }

      // Determine file extension and resize accordingly
      const extension = path.extname(image.name).toLowerCase();
      const thumbnailImagePath = `${thumbnailDir}/${path.basename(imageName, extension)}.webp`;
      let pipeline;

      if (extension === '.png' || extension === '.jpg' || extension === '.jpeg') {
          pipeline = sharp(originalImagePath)
              .resize({ width: 200, height: 200 })
              .toFormat('webp')
              .webp({ quality: 80 })
              .toFile(thumbnailImagePath);
      } else {
          throw new Error('Unsupported file format');
      }
      await pipeline;

      const destinationImgUrl = `https://salesman.aindriya.co.in/${URLpathG}/${finalName}/${imageName}`;
      const thumbnailImgUrl = `https://salesman.aindriya.co.in/${URLpathG}/thumbnails/${path.basename(imageName, extension)}.webp`;
    console.log("destinationImgUrl--------",destinationImgUrl);
    console.log("thumbnailImgUrl------",thumbnailImgUrl)

      const gift = new Gift({
          giftName,
          oldPrice,
          newPrice,
          viewOrder,
          status,
          image: destinationImgUrl,
          thumbnail: thumbnailImgUrl
      });

      console.log("gift------",gift)
      // return

      await gift.save();

      res.status(201).json({ message: "Gift created successfully", gift });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
    };
  
    exports.updateGift = async (req, res) => {
      try {
        const { giftName, oldPrice, newPrice, viewOrder, status } = req.body;
        const giftId = req.params.id;
    
        // Check if the frame exists
        const gift = await Gift.findById(frameId);
        if (!gift) {
          return res.status(404).json({ message: 'gift not found' });
        }
    
        // Update the frame fields
        gift.giftName = giftName || gift.giftName; // Update name if provided, otherwise keep the existing name
        gift.oldPrice = oldPrice || gift.oldPrice;
        gift.newPrice = newPrice || gift.newPrice;
        gift.viewOrder = viewOrder || gift.viewOrder;
        gift.status = status || gift.status;
    
        // Update the image field if a new image is provided
        if (req.files && req.files.image) {
          const image = req.files.image;
          const imageName = image.name.replace(/ /g, '_');
          const imagePath = `${giftPath}/${gift.giftName}/${imageName}`;
    
          // Save the new image
          fs.writeFileSync(imagePath, image.data);
          gift.image = `https://salesman.aindriya.co.in/${URLpathG}/${gift.giftName}/${imageName}`;
        }
    
        // Save the updated wallpaper
        await gift.save();
    
        res.status(200).json({ message: 'gift updated successfully', gift });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
  


    exports.getGifts = async (req, res) => {
      try {
        const GiftId = req.params.id;
    
        // Find the wallpaper by ID
        const gift = await Gift.findById(frameId);
        if (!gift) {
          return res.status(404).json({ message: 'Frame not found' });
        }
    
        // Return the wallpaper
        res.status(200).json({ gift });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
    
    exports.getAllGifts = async (req, res) => {
      try {
        // Fetch all wallpapers sorted by viewOrder in ascending order
        const AllGifts = await Gift.find().sort({ viewOrder: 1 });
        res.status(200).json(AllGifts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };




exports.createAvatar = async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const image = req.files.image;
        const finalName = image.name.replace(/\s+/g, '_');

        // Directory for avatar images
        const avatarDir = `${AvatarPath}/avatar`;
        if (!fs.existsSync(avatarDir)) {
            fs.mkdirSync(avatarDir, { recursive: true });
        }

        // Directory for original images
        const originalDir = `${avatarDir}/original`;
        if (!fs.existsSync(originalDir)) {
            fs.mkdirSync(originalDir, { recursive: true });
        }

        // Save original image
        const originalImagePath = `${originalDir}/${finalName}`;
        fs.writeFileSync(originalImagePath, image.data);

        // Directory for thumbnails
        const thumbnailDir = `${avatarDir}/thumbnails`;
        if (!fs.existsSync(thumbnailDir)) {
            fs.mkdirSync(thumbnailDir, { recursive: true });
        }

        // Determine file extension
        const extension = path.extname(finalName).toLowerCase();

        // Resize and save thumbnail image
        const thumbnailImagePath = `${thumbnailDir}/${path.basename(finalName, extension)}.webp`;
        await sharp(originalImagePath)
            .resize({ width: 200, height: 200 })
            .toFormat('webp')
            .webp({ quality: 80 })
            .toFile(thumbnailImagePath);

        // Image URLs
        const destinationImgUrl = `https://salesman.aindriya.co.in/avatar/original/${finalName}`;
        const thumbnailImgUrl = `https://salesman.aindriya.co.in/avatar/thumbnails/${path.basename(finalName, extension)}.webp`;

        // Save avatar data to database
        const avatar = new Avatar({ image: destinationImgUrl, thumbnailImg: thumbnailImgUrl });
        await avatar.save();

        res.status(201).json({ message: "Avatar created successfully", avatar });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



exports.getAvatar = async (req, res) => {
    try {
        const avatars = await Avatar.find();
        res.status(200).json(avatars);
    } catch (error) {
        console.error("Error fetching avatars:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getAvatarById = async (req, res) => {
    try {
        const avatarId = req.params.id; // Assuming the ID is passed as a route parameter
        const avatar = await Avatar.findById(avatarId);
        
        if (!avatar) {
            return res.status(404).json({ message: 'Avatar not found' });
        }
        
        res.status(200).json(avatar);
    } catch (error) {
        console.error("Error fetching avatar by ID:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.createCategory = async (req, res) => {
  console.log("req.body-------", req.body);
  try {
    const { name } = req.body;
    const category = new Category({ name });
    console.log("category----", category);
    await category.save();
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Other CRUD operations
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

 exports.getProfile =async (req,res)=>{

 try {
     const userId = req.params.id;

//     // Validate the user ID format
// //    if (!mongoose.Types.ObjectId.isValid(userId)) {
//   //    return res.status(400).json({ message: 'Invalid user ID format' });
//    // }

//     // Find the user by ID
     const user = await User.findById(userId);

     if (!user) {
       return res.status(404).json({ message: 'User not found' });
     }

     // Count the number of followers and followings
     const followersCount = await Follow.countDocuments({ followingId: userId });
     const followingsCount = await Follow.countDocuments({ followerId: userId });

//     // Respond with the user profile and follow counts
     res.status(200).json({
       userName: user.username,
       userId:user._id,
       userProfile: user.profile,
       hosting: user.hosting,
       followersCount,
       followingsCount,
       status:user.status,
       connectStatus:user.connectStatus,
       description:user.profile.userDescription,
     });
   } catch (error) {
     console.error('Error retrieving user profile:', error);
     res.status(500).json({ message: 'Internal server error' });
   }
 }

/*
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the current heart conversion rate
    const conversionRate = await HeartConversionRate.findOne();
    if (!conversionRate) {
      return res.status(400).json({ message: 'Conversion rate not set by admin.' });
    }

    // Calculate the wallet balance
    const walletBalance = user.profile.heartBalance * conversionRate.ratePerHeart;
    
    // Update the user's wallet balance in the database
    user.profile.walletBalance = walletBalance;
    await user.save();

    // Update or create the wallet entry in the Wallet collection
    let wallet = await Wallet.findOne({ userId });

    if (wallet) {
      wallet.balance = walletBalance;
      wallet.updatedAt = Date.now();
    } else {
      wallet = new Wallet({
        userId,
        balance: walletBalance,
      });
    }

    await wallet.save();

    // Count the number of followers and followings
    const followersCount = await Follow.countDocuments({ followingId: userId });
    const followingsCount = await Follow.countDocuments({ followerId: userId });

    // Respond with the user profile, wallet balance, and follow counts
    res.status(200).json({
      userName: user.username,
      userId: user._id,
      userProfile: user.profile,
      followersCount,
      followingsCount,
      walletBalance, // Include the calculated wallet balance in the response
    });
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
*/
exports.getUserCoinDetails = async (req, res) => {
    let userId = req.params.userId;
    console.log("------------", userId);

    try {
        // Ensure the userId is a string and then parse it back to avoid potential issues
        userId = JSON.stringify(userId).replace(/^"|"$/g, '');

        // Validate the userId
/*        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid userId format' });
        }*/

        const user = await User.findById(userId).select('profile.coin');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            userId: user._id,
            coins: user.profile.coin
        });
    } catch (err) {
        console.error('An error occurred while fetching user coin details:', err);
        res.status(500).json({ error: 'An error occurred while fetching user coin details' });
    }
};

exports.createBanner = async(req,res)=>{
try {
    console.log("req.body=========q=====",req.body);
    console.log("req.files=============",req.files);
    
    const { viewingOrder, status } = req.body;
  
    if (!req.files || !req.files.image) {
       return res.status(400).json({ message: 'No file uploaded' });
    }
  
    const image = req.files.image;
    const name = 'banner';
    const finalName = name.replace(/\s+/g, '_');
    const desImageDir = `${framePath}/${finalName}`;
  
    if (!fs.existsSync(desImageDir)) {
        fs.mkdirSync(desImageDir, { recursive: true });
    }
  
    const imageName = image.name.replace(/ /g, '_');
    const originalImagePath = `${desImageDir}/${imageName}`;
    fs.writeFileSync(originalImagePath, image.data);
  
    // Create thumbnails directory if it doesn't exist
    const thumbnailDir = `${framePath}/thumbnails`;
    if (!fs.existsSync(thumbnailDir)) {
        fs.mkdirSync(thumbnailDir, { recursive: true });
    }
  
    // Determine file extension and resize accordingly
    const extension = path.extname(image.name).toLowerCase();
    const thumbnailImagePath = `${thumbnailDir}/${path.basename(imageName, extension)}.webp`;
    let pipeline;
  
    if (extension === '.png' || extension === '.jpg' || extension === '.jpeg') {
        pipeline = sharp(originalImagePath)
            .resize({ width: 200, height: 200 })
            .toFormat('webp')
            .webp({ quality: 80 })
            .toFile(thumbnailImagePath);
    } else {
        throw new Error('Unsupported file format');
    }
  
    await pipeline;
  
    const destinationImgUrl = `https://salesman.aindriya.co.in/${finalName}/${imageName}`;
    const thumbnailImgUrl = `https://salesman.aindriya.co.in/${URLpathB}/thumbnails/${path.basename(imageName, extension)}.webp`;
  console.log("destinationImgUrl--------",destinationImgUrl);
  console.log("thumbnailImgUrl------",thumbnailImgUrl)
    
    const banner = new Banner({
        viewingOrder,
        status,
        image: destinationImgUrl,
       // thumbnail: thumbnailImgUrl
    });
  
    await banner.save();
  
    res.status(201).json({ message: "Banner created successfully", banner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



exports.updateBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    const { viewingOrder, status } = req.body;

    // Find the existing banner by ID
    const banner = await Banner.findById(bannerId);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Update banner details
    if (viewingOrder) banner.viewingOrder = viewingOrder;
    if (status !== undefined) banner.status = status;

    // Handle image update if a new file is uploaded
    if (req.files && req.files.image) {
      const image = req.files.image;
      const name = 'banner';
      const finalName = name.replace(/\s+/g, '_');

      // Directory for the banner images
      const desImageDir = path.join(bannerPath, finalName);
      if (!fs.existsSync(desImageDir)) {
        fs.mkdirSync(desImageDir, { recursive: true });
        console.log(`Banner directory created: ${desImageDir}`);
      }

      // Save original image
      const imageName = image.name.replace(/ /g, '_');
      const originalImagePath = path.join(desImageDir, imageName);
      fs.writeFileSync(originalImagePath, image.data);
      console.log(`Original image saved: ${originalImagePath}`);

      // Directory for thumbnails
      const thumbnailDir = path.join(desImageDir, 'thumbnails');
      if (!fs.existsSync(thumbnailDir)) {
        fs.mkdirSync(thumbnailDir, { recursive: true });
        console.log(`Thumbnail directory created: ${thumbnailDir}`);
      }

      // Determine file extension
      const extension = path.extname(imageName).toLowerCase();
      // Resize and save thumbnail image
      const thumbnailImagePath = path.join(thumbnailDir, `${path.basename(imageName, extension)}.webp`);
      await sharp(originalImagePath)
        .resize({ width: 200, height: 200 })
        .toFormat('webp')
        .webp({ quality: 80 })
        .toFile(thumbnailImagePath);
      console.log(`Thumbnail image saved: ${thumbnailImagePath}`);

      // URLs for accessing the images
      const destinationImgUrl = `https://salesman.aindriya.co.in/${finalName}/${imageName}`;
      const thumbnailImgUrl = `https://salesman.aindriya.co.in/${URLpathB}/${finalName}/thumbnails/${path.basename(imageName, extension)}.webp`;

      // Update image URLs in the banner document
      banner.image = destinationImgUrl;
      banner.thumbnail = thumbnailImgUrl;
    }

    // Save updated banner
    await banner.save();

    res.status(200).json({ message: 'Banner updated successfully', banner });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

 exports.getAllBanner = async (req, res) => {
    try {
      // Fetch all wallpapers sorted by viewOrder in ascending order
      const AllBanner = await Banner.find().sort({ viewingOrder: 1 });
      res.status(200).json(AllBanner);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

exports.getBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner  not found' });
    }
    res.status(200).json(banner);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createMood = async (req, res) => {
  try {

    console.log("req.body========q======", req.body);
    console.log("req.files=============", req.files);

    const { moodName, order, status } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const image = req.files.image;
    const finalName = moodName.replace(/\s+/g, '_');

    // Directory for the mood images
    const desImageDir = `${moodPath}/${URLpathM}/${finalName}`;
    if (!fs.existsSync(desImageDir)) {
      fs.mkdirSync(desImageDir, { recursive: true });
      console.log(`Mood directory created: ${desImageDir}`);
    }

    // Save original image
    const imageName = image.name.replace(/ /g, '_');
    const originalImagePath = `${desImageDir}/${imageName}`;
    fs.writeFileSync(originalImagePath, image.data);
    console.log(`Original image saved: ${originalImagePath}`);

    // Directory for thumbnails
    const thumbnailDir = `${desImageDir}/thumbnails`;
    if (!fs.existsSync(thumbnailDir)) {
      fs.mkdirSync(thumbnailDir, { recursive: true });
      console.log(`Thumbnail directory created: ${thumbnailDir}`);
    }

    // Determine file extension
    const extension = path.extname(imageName).toLowerCase();

    // Resize and save thumbnail image
    const thumbnailImagePath = `${thumbnailDir}/${path.basename(imageName, extension)}.webp`;
    await sharp(originalImagePath)
      .resize({ width: 200, height: 200 })
      .toFormat('webp')
      .webp({ quality: 80 })
      .toFile(thumbnailImagePath);
    console.log(`Thumbnail image saved: ${thumbnailImagePath}`);

    // URLs for accessing the images
    const destinationImgUrl = `https://salesman.aindriya.co.in/${URLpathM}/${finalName}/${imageName}`;
    //const thumbnailImgUrl = `https://salesman.aindriya.co.in/${URLpathM}/${finalName}/thumbnails/${path.basename(imageName, extension)}.webp`;

    console.log("destinationImgUrl--------", destinationImgUrl);
    //console.log("thumbnailImgUrl------", thumbnailImgUrl);

    // Save mood data to the database
    const mood = new Mood({
      moodName,
      order,
      status,
      image: destinationImgUrl,
  //    thumbnail: thumbnailImgUrl
    });

    await mood.save();

    res.status(201).json({ message: "Mood created successfully", mood });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateMood = async (req, res) => {
  try {
    const moodId = req.params.id;
    const { moodName, order, status } = req.body;

    // Find the existing mood by ID
    const mood = await Mood.findById(moodId);
    if (!mood) {
      return res.status(404).json({ message: 'Mood not found' });
    }

    // Update mood details
    if (moodName) mood.moodName = moodName;
    if (order) mood.order = order;
    if (status !== undefined) mood.status = status;

    // Handle image update if a new file is uploaded
    if (req.files && req.files.image) {
      const image = req.files.image;
      const finalName = mood.moodName.replace(/\s+/g, '_');

      // Directory for the mood images
      const desImageDir = `${moodPath}/${URLpathM}/${finalName}`;
      if (!fs.existsSync(desImageDir)) {
        fs.mkdirSync(desImageDir, { recursive: true });
        console.log(`Mood directory created: ${desImageDir}`);
      }

      // Save original image
      const imageName = image.name.replace(/ /g, '_');
      const originalImagePath = `${desImageDir}/${imageName}`;
      fs.writeFileSync(originalImagePath, image.data);
      console.log(`Original image saved: ${originalImagePath}`);

      // Directory for thumbnails
      const thumbnailDir = `${desImageDir}/thumbnails`;
      if (!fs.existsSync(thumbnailDir)) {
        fs.mkdirSync(thumbnailDir, { recursive: true });
        console.log(`Thumbnail directory created: ${thumbnailDir}`);
      }

      // Determine file extension
      const extension = path.extname(imageName).toLowerCase();

      // Resize and save thumbnail image
      const thumbnailImagePath = `${thumbnailDir}/${path.basename(imageName, extension)}.webp`;
      await sharp(originalImagePath)
        .resize({ width: 200, height: 200 })
        .toFormat('webp')
        .webp({ quality: 80 })
        .toFile(thumbnailImagePath);
      console.log(`Thumbnail image saved: ${thumbnailImagePath}`);

      // URLs for accessing the images
      const destinationImgUrl = `https://salesman.aindriya.co.in/${URLpathM}/${finalName}/${imageName}`;
      // const thumbnailImgUrl = `https://salesman.aindriya.co.in/${URLpathM}/${finalName}/thumbnails/${path.basename(imageName, extension)}.webp`;

      // Update image URLs in the mood document
      mood.image = destinationImgUrl;
      // mood.thumbnail = thumbnailImgUrl;
    }

    // Save updated mood
    await mood.save();

    res.status(200).json({ message: 'Mood updated successfully', mood });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



 exports.getAllMood = async (req, res) => {
    try {
      // Fetch all wallpapers sorted by viewOrder in ascending order
      const Allmood = await Mood.find().sort({ order: 1 });
      res.status(200).json(Allmood);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

exports.getMoodById = async (req, res) => {
	try {
    const { id } = req.params;
    const mood = await Mood.findById(id);
    if (!mood) {
      return res.status(404).json({ message: 'mood  not found' });
    }
    res.status(200).json(mood);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createWallet =async (req,res)=>{
  try {
    const { userId } = req.body;

    // Check if the user already has a wallet
    const existingWallet = await Wallet.findOne({ userId });
    if (existingWallet) {
        return res.status(400).json({ message: 'Wallet already exists for this user.' });
    }

    const wallet = new Wallet({ userId });
    await wallet.save();
    res.status(201).json(wallet);
} catch (error) {
    res.status(500).json({ message: 'Error creating wallet', error });
}
}

exports.getWallet= async (req,res)=>{
  try {
    const { userId } = req.params;
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found.' });
    }
    res.status(200).json(wallet);
} catch (error) {
    res.status(500).json({ message: 'Error fetching wallet', error });
}
}

// exports.addFunds = async (req,res)=>{
//   try {
//     const { userId, amount } = req.body;

//     const wallet = await Wallet.findOne({ userId });
//     if (!wallet) {
//         return res.status(404).json({ message: 'Wallet not found.' });
//     }

//     wallet.balance += amount;
//     wallet.updatedAt = Date.now();
//     await wallet.save();

//     const transaction = new Transaction({
//         userId,
//         type: 'credit',
//         amount,
//         balanceAfter: wallet.balance
//     });
//     await transaction.save();

//     res.status(200).json(wallet);
// } catch (error) {
//     res.status(500).json({ message: 'Error adding funds', error });
// }
// }

// exports.deductFunds = async (req,res)=>{
//   try {
//     const { userId, amount } = req.body;

//     const wallet = await Wallet.findOne({ userId });
//     if (!wallet) {
//         return res.status(404).json({ message: 'Wallet not found.' });
//     }

//     if (wallet.balance < amount) {
//         return res.status(400).json({ message: 'Insufficient balance.' });
//     }

//     wallet.balance -= amount;
//     wallet.updatedAt = Date.now();
//     await wallet.save();

//     const transaction = new Transaction({
//         userId,
//         type: 'debit',
//         amount,
//         balanceAfter: wallet.balance
//     });
//     await transaction.save();

//     res.status(200).json(wallet);
// } catch (error) {
//     res.status(500).json({ message: 'Error deducting funds', error });
// }
// }

exports.getTransactionHistory= async (req,res)=>{
  try {
    const userId = req.params.userId;
    console.log("userId---------",userId)
    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(transactions);
} catch (error) {
    res.status(500).json({ message: 'Error fetching transaction history', error });
}
}

exports.getWithdrawTransactionHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("userId---------", userId);

    // Fetch transactions where type is "withdraw" for the specified user
    const transactions = await Transaction.find({ userId, type: "withdraw" }).sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching withdraw transaction history:', error);
    res.status(500).json({ message: 'Error fetching withdraw transaction history', error });
  }
};



exports.followUser = async (req, res) => {
  try {
      const { followerId, followingId } = req.body;
console.log("req.body--------",req.body);
      // Check if the follow relationship already exists
      const existingFollow = await Follow.findOne({ followerId, followingId });
console.log("existingFollow---------",existingFollow)
      if (existingFollow) {
          return res.status(400).json({ message: 'You are already following this user.' });
      }

      const follow = new Follow({ followerId, followingId });
console.log("follow---------",follow);
      await follow.save();
      res.status(201).json({ message:'User Followed successfully',follow});
  } catch (error) {
    console.log("error------",error);
      res.status(500).json({ message: 'Error following user', error });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
      const { followerId, followingId } = req.body;

      // Check if the follow relationship exists
      const follow = await Follow.findOne({ followerId, followingId });
      if (!follow) {
          return res.status(400).json({ message: 'You are not following this user.' });
      }

      await Follow.deleteOne({ followerId, followingId });
      res.status(200).json({ message: 'Successfully unfollowed the user.' });
  } catch (error) {
      res.status(500).json({ message: 'Error unfollowing user', error });
  }
};
exports.getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the followers with their user IDs
    const follows = await Follow.find({ followingId: userId }).select('followerId');

    // Extract the follower IDs from the result
    const followerIds = follows.map(follow => follow.followerId);

    // Fetch detailed information for each follower from the User table
    const users = await User.find({ _id: { $in: followerIds } }).select('_id username profile.avatar');

    // Get the logged-in user's followings
    const loggedInUserFollows = await Follow.find({ followerId: userId }).select('followingId');

    // Create a set of IDs that the logged-in user is following
    const followingIds = new Set(loggedInUserFollows.map(follow => follow.followingId.toString()));

    // Fetch the followers count for each follower
    const followersCountsPromises = followerIds.map(async (followerId) => {
      const count = await Follow.countDocuments({ followingId: followerId });
      return { followerId, count };
    });

    const followersCounts = await Promise.all(followersCountsPromises);

    // Add the `isFollowing` flag and followers count to each user
    const followersWithFlag = users.map(user => {
      const followerCount = followersCounts.find(count => count.followerId.toString() === user._id.toString()).count;
      return {
	id:user._id,
        username: user.username,
        avatarImage: user.profile.avatar,
        isFollowing: followingIds.has(user._id.toString()), // Check if the logged-in user follows this user
        followersCount: followerCount, // Add followers count for this follower
      };
    });

    // Count the total number of followers
    const followerCount = followersWithFlag.length;

    res.status(200).json({ followers: followersWithFlag, followerCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching followers', error });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the following list with their user IDs
    const follows = await Follow.find({ followerId: userId }).select('followingId');

    // Extract the following IDs from the result
    const followingIds = follows.map(follow => follow.followingId);

    // Fetch detailed information for each following user from the User table
    const users = await User.find({ _id: { $in: followingIds } }).select('id username profile.avatar');

    // Get the logged-in user's followings
    const loggedInUserFollows = await Follow.find({ followerId: userId }).select('followingId');

    // Create a set of IDs that the logged-in user is following
    const followingIdsSet = new Set(loggedInUserFollows.map(follow => follow.followingId.toString()));

    // Fetch the followers count for each user being followed
    const followersCountsPromises = followingIds.map(async (followingId) => {
      const count = await Follow.countDocuments({ followingId });
      return { followingId, count };
    });

    const followersCounts = await Promise.all(followersCountsPromises);

    // Add the `isFollowing` flag and followers count to each user
    const followingWithDetails = users.map(user => {
      const followersCount = followersCounts.find(count => count.followingId.toString() === user._id.toString()).count;
      return {
        id : user._id,
        username: user.username,
        avatarImage: user.profile.avatar,
        isFollowing: followingIdsSet.has(user._id.toString()), // Check if the logged-in user follows this user
        followersCount: followersCount, // Add followers count for this user
      };
    });

    // Count the total number of following
    const followingCount = followingWithDetails.length;

    res.status(200).json({ following: followingWithDetails, followingCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching following', error });
  }
};

/*
exports.userOneVsOneList = async(req,res)=>{
  /*const { userId, roomId, isHost, category } = req.body;

  if (!userId || !roomId || isHost === undefined || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const userEntry = new UserOneVsOneList({ userId, roomId, isHost, category });
    await userEntry.save();
    res.status(201).json(userEntry);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while adding the user' });
  }
//
const { userId, roomId, isHost, category } = req.body;

  if (!userId || !roomId || isHost === undefined || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if an entry with the same userId exists
    let userEntry = await UserOneVsOneList.findOne({ userId });

    if (userEntry) {
      // Update the existing entry
      userEntry.roomId = roomId;
      userEntry.isHost = isHost;
      userEntry.category = category;
    } else {
      // Create a new entry
      userEntry = new UserOneVsOneList({ userId, roomId, isHost, category });
    }

    // Save the entry (update or create)
    await userEntry.save();
    res.status(201).json(userEntry);
  } catch (err) {
    console.error('An error occurred while adding/updating the user:', err);
    res.status(500).json({ error: 'An error occurred while adding/updating the user' });
  }
}
*/


exports.userOneVsOneList = async (req, res) => {
  const { userId, roomId, isHost, category, callType } = req.body;

  if (!userId || isHost === undefined || !category || !callType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let channelName;
    let generatedRoomId = roomId || uuidv4(); // Generate a new roomId if not provided

    if (isHost) {
      channelName = `${generatedRoomId}-${category}`;

      // Create a token for the host
      const hostToken = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, userId, RtcRole.PUBLISHER, Math.floor(Date.now() / 1000) + 3600);

      // Save host information
      const userEntry = new UserOneVsOneList({
        userId,
        roomId: generatedRoomId,
        isHost,
        category,
        callType,
        channelName
      });
      await userEntry.save();

      // Notify that the host has started the call
      res.status(201).json({ message: 'Host created the call', token: hostToken, channelName, roomId: generatedRoomId,appId:APP_ID });
    } else {
      // Fetch host details
      const hostEntry = await UserOneVsOneList.findOne({ roomId: generatedRoomId, isHost: true, category });

      if (!hostEntry) {
        return res.status(404).json({ message: 'Host not found for the specified room and category' });
      }

      // Generate token for joiner
      const joinerToken = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, hostEntry.channelName, userId, RtcRole.SUBSCRIBER, Math.floor(Date.now() / 1000) + 3600);

      // Save joiner information
      const userEntry = new UserOneVsOneList({
        userId,
        roomId: generatedRoomId,
        isHost,
        category,
        callType
      });
      await userEntry.save();

      // Save call details
      const newCall = new UserCall({
        hostId: hostEntry.userId,
        joinerId: userId,
        category,
        callType,
        roomId:generatedRoomId,
        appId: APP_ID,
        channelName: hostEntry.channelName
      });
      await newCall.save();

      // Notify that the joiner joined the call
      res.status(201).json({ message: 'Joiner joined the call', token: joinerToken });
    }
  } catch (err) {
    console.error('An error occurred while adding/updating the user:', err);
    res.status(500).json({ error: 'An error occurred while adding/updating the user' });
  }
};

const generateChannelName = (userId) => {
  // Create a base channel name
  let channelName = `channel_${userId}_${uuidv4()}`;
  
  // Ensure channel name length does not exceed 64 characters
  if (channelName.length > 64) {
    channelName = channelName.substring(0, 64);
  }

  // Remove unsupported characters if any
  channelName = channelName.replace(/[^a-zA-Z0-9_ -]/g, '');

  return channelName;
};

exports.hostCall = async (req, res) => {
  const { userId, isHost, category, callType } = req.body;
console.log("req.body--------------",req.body);
const hostedCallType =callType;
  if (!userId || !callType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Generate a unique channel name
    const uniqueChannelName = generateChannelName(userId);

    console.log(`Generated Channel Name: ${uniqueChannelName}`);

    const callerToken = RtcTokenBuilder.buildTokenWithUid(
      APP_ID,
      APP_CERTIFICATE,
      uniqueChannelName,
      0,
      RtcRole.PUBLISHER,
      Math.floor(Date.now() / 1000) + EXPIRATION_TIME_IN_SECONDS
    );

    const userEntry = await UserOneVsOneList.findOneAndUpdate(
      { userId },
      {
        isHost,
        category,
        callType,
        hostedCallType,
       channelName: uniqueChannelName,
	//channelName: "dating",
//	token:"007eJxTYPBOnJj+IibM5bDJgl1LPETXsK/8WPs2NdvG6a/RiSVzHcoVGJINLU0MDFLMEhOTDUwSTYwtLFKNTJKNTdOSTU2A2Ohs4720hkBGhsynpYyMDBAI4rMxpCSWZOalMzAAAKzzITg=",
       token: callerToken,
        updatedAt: new Date()
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: 'Host details updated successfully',
      token: callerToken,
    // token:"007eJxTYPBOnJj+IibM5bDJgl1LPETXsK/8WPs2NdvG6a/RiSVzHcoVGJINLU0MDFLMEhOTDUwSTYwtLFKNTJKNTdOSTU2A2Ohs4720hkBGhsynpYyMDBAI4rMxpCSWZOalMzAAAKzzITg=",
      channelName: uniqueChannelName,
    // channelName:"dating",
      userEntry,
     // appId: APP_ID
      //appId:"5706e283c47f4cf1be78f39d340a4c2d"
        appId:"ce47f829d5514255972835067b6f228f",
    });
  } catch (err) {
    console.error('An error occurred while updating the host details:', err);
    res.status(500).json({ error: 'An error occurred while updating the host details' });
  }
};


exports.leaveCall = async (req, res) => {
  try {
    const { userId } = req.params; // Get the userId from the request parameters

    // Find and remove the call record where the user is the host
    const call = await UserOneVsOneList.findOneAndDelete({ userId });

    if (!call) {
      return res.status(404).json({ message: 'Call not found or already ended' });
    }

    // Respond with a success message
    res.status(200).json({ message: 'Call ended successfully and data removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.selectHostUserForCall = async (req, res) => {
  const { userId, hostUserId, callType } = req.body; // Get callType from the request body
  console.log("req.body------------", req.body);

  if (!userId || !hostUserId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Fetch host details using the hostUserId
    const hostEntry = await UserOneVsOneList.findOne({ userId: hostUserId, isHost: true });

    if (!hostEntry) {
      return res.status(404).json({ message: 'Host not found for the specified userId' });
    }

    // If callType is provided, update the UserOneVsOneList entry with the new callType
    if (callType) {
      await UserOneVsOneList.updateOne({ userId: hostUserId, isHost: true }, { $set: { callType } });
    }

    // Fetch user details using the userId
    const userEntry = await User.findById(userId).select('username profile');
    if (!userEntry) {
      return res.status(404).json({ message: 'User not found for the specified userId' });
    }

    // Fetch host user details using the hostUserId
    const hostUserEntry = await User.findById(hostUserId).select('username profile');
    if (!hostUserEntry) {
      return res.status(404).json({ message: 'Host user not found for the specified hostUserId' });
    }

    // Fetch the cost of one heart from the HeartCost table
    const heartCost = await HeartCost.findOne();
    if (!heartCost) {
      return res.status(500).json({ error: 'Heart cost not found' });
    }

    // Calculate the number of hearts the user can buy with their coins
    const userHearts = Math.floor(userEntry.profile.coin / heartCost.costPerHeart);

    // Fetch the call heart cost
    const callHeartCost = await CallHeartCost.findOne();
    if (!callHeartCost) {
      return res.status(500).json({ error: 'Call heart cost not found' });
    }

    // Calculate minimum hearts required for one minute of call time
    const minHeartsRequiredForAudio = callHeartCost.audioCallHeartCost;
    const minHeartsRequiredForVideo = callHeartCost.videoCallHeartCost;

    // Check if the user has enough hearts to join the call based on the callType
    if ((hostEntry.callType === 'audio' && userHearts < minHeartsRequiredForAudio) ||
        (hostEntry.callType === 'video' && userHearts < minHeartsRequiredForVideo)) {
      return res.status(400).json({
        message: 'You do not have enough balance to join the call.'
      });
    }

    // Calculate maximum call time in minutes based on the callType
    let maxCallTimeMinutes = 0;
    if (hostEntry.callType === 'audio') {
      maxCallTimeMinutes = Math.floor(userHearts / callHeartCost.audioCallHeartCost);
    } else if (hostEntry.callType === 'video') {
      maxCallTimeMinutes = Math.floor(userHearts / callHeartCost.videoCallHeartCost);
    }

    // Save new call entry
    const newCall = new UserCall({
      hostId: hostUserId,
      joinerId: userId,
      category: hostEntry.category,
      callType: hostEntry.callType,
      appId: APP_ID,
      channelName: hostEntry.channelName
    });
    await newCall.save();

    // Return the response with user and host details
    res.status(200).json({
      message: 'User and Host details retrieved successfully',
      userId: userEntry._id,
      hostUserId: hostUserEntry._id,
      userDetails: {
        username: userEntry.username,
        profile: userEntry.profile,
        maxCallTimeMinutes
      },
      hostDetails: {
        username: hostUserEntry.username,
        profile: hostUserEntry.profile,
        callType: hostEntry.callType,
        channelName: hostEntry.channelName,
        token: hostEntry.token,
        //appId: "5706e283c47f4cf1be78f39d340a4c2d"
         appId:"ce47f829d5514255972835067b6f228f",
      }
    });

  } catch (err) {
    console.error('An error occurred while retrieving details:', err);
    res.status(500).json({ error: 'An error occurred while retrieving details' });
  }
};


/*
exports.endCall = async (req, res) => {
  const { hostId, joinerId, channelName, callDurationMinutes } = req.body;

console.log("req.body---------",req.body)

  if (!hostId || !joinerId || !channelName || !callDurationMinutes) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Find and update the call entry
    const callEntry = await UserCall.findOneAndUpdate(
      { channelName, $or: [{ hostId }, { joinerId }] },
      { callEnded: true, callEndedAt: new Date() },
      { new: true }
    );

    if (!callEntry) {
      return res.status(404).json({ message: 'Call not found' });
    }

    // Fetch the heart cost per minute from the database
    const callHeartCost = await CallHeartCost.findOne();
    if (!callHeartCost) {
      return res.status(500).json({ error: 'Call heart cost not found' });
    }

    // Calculate hearts to transfer based on call type and duration
    let heartsToTransfer = 0;
    if (callEntry.callType === 'audio') {
      heartsToTransfer = callDurationMinutes * callHeartCost.audioCallHeartCost;
    } else if (callEntry.callType === 'video') {
      heartsToTransfer = callDurationMinutes * callHeartCost.videoCallHeartCost;
    }

    // Fetch the coin-to-heart conversion rate from the heartCosts collection
    const heartCosts = await HeartCost.findOne();
    if (!heartCosts) {
      return res.status(500).json({ error: 'Heart cost conversion rates not found' });
    }

    // Calculate how many coins are needed for the hearts to transfer
    const coinsRequired = heartsToTransfer * heartCosts.costPerHeart;

    // Fetch the joiner and host user details
    const joinerUser = await User.findById(joinerId);
    const hostUser = await User.findById(hostId);

    if (!joinerUser || !hostUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure the joiner has enough coins to cover the heart cost
    if (joinerUser.profile.coin < coinsRequired) {
      return res.status(400).json({ error: 'Not enough coins to complete the transaction' });
    }

    // Deduct coins from the joiner
    joinerUser.profile.coin -= coinsRequired;

    // Convert deducted coins back into hearts for the host
    const heartsForHost = coinsRequired / heartCosts.costPerHeart;

    // Add the calculated hearts to the host's balance
    hostUser.profile.heartBalance += heartsForHost;

    // Save the updated user profiles
    await joinerUser.save();
    await hostUser.save();

    // Record the transaction
    const transaction = new CoinTransactionHistory({
      userId: joinerId,
      fromUserId: joinerId,
      toUserId: hostId,
      type: 'spend',
      coins: heartsForHost,
      amountInCurrency: 0, // Update if needed
      description: `Hearts transferred for a ${callEntry.callType} call`,
      spendingType: callEntry.callType,
      heartsTransferred: heartsForHost,
    });

    await transaction.save();

    // Remove the matched entry from the useronevsonelists collection
    await UserOneVsOneList.deleteOne({
      channelName
    });

    // Notify the client
    res.status(200).json({ message: 'Call ended successfully, hearts transferred, and user list entry removed', callEntry, transaction });
  } catch (err) {
    console.error('An error occurred while ending the call:', err);
    res.status(500).json({ error: 'An error occurred while ending the call' });
  }
};

*/

/*
exports.endCall = async (req, res) => {
  const { hostId, joinerId, channelName, callDurationMinutes } = req.body;
console.log("---------------entering the api end call--#####################################################################################----------",req.body)
  if (!hostId || !joinerId || !channelName || !callDurationMinutes) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Find and update the call entry
    const callEntry = await UserCall.findOneAndUpdate(
      { channelName, $or: [{ hostId }, { joinerId }] },
      { callEnded: true, callEndedAt: new Date() },
      { new: true }
    );

    if (!callEntry) {
      return res.status(404).json({ message: 'Call not found' });
    }

    // Fetch the heart cost per minute
    const callHeartCost = await CallHeartCost.findOne();
    if (!callHeartCost) {
      return res.status(500).json({ error: 'Call heart cost not found' });
    }

    // Calculate hearts based on call type and duration
    let heartsToTransfer = 0;
    if (callEntry.callType === 'audio') {
      heartsToTransfer = callDurationMinutes * callHeartCost.audioCallHeartCost;
    } else if (callEntry.callType === 'video') {
      heartsToTransfer = callDurationMinutes * callHeartCost.videoCallHeartCost;
    }

    // Get coin-to-heart conversion rate
    const heartCosts = await HeartCost.findOne();

    if (!heartCosts) {
      return res.status(500).json({ error: 'Heart cost conversion rates not found' });
    }

    // Calculate coins required
    const coinsRequired = heartsToTransfer * heartCosts.costPerHeart;

    // Fetch joiner and host user profiles
    const joinerUser = await User.findById(joinerId);
    const hostUser = await User.findById(hostId);

    if (!joinerUser || !hostUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure the joiner has enough coins
    if (joinerUser.profile.coin < coinsRequired) {
      return res.status(400).json({ error: 'Not enough coins to complete the transaction' });
    }

    // Deduct coins from the joiner
    joinerUser.profile.coin -= coinsRequired;

    // Convert coins into hearts for the host
    const heartsForHost = coinsRequired / heartCosts.costPerHeart;

    // Add hearts to host's balance
    hostUser.profile.heartBalance += heartsForHost;
    
    // Save updated user profiles
    await joinerUser.save();
    await hostUser.save();
console.log("hostId--------------hostId",hostId)
     const findHostCalltype = await UserOneVsOneList.findOne({userId:hostId});
console.log("findHostCallType----------------",findHostCalltype);
if(findHostCalltype !== null){
     const updatehostcalltype= await UserOneVsOneList.updateOne({ userId: hostId, isHost: true }, { $set: { callType:findHostCalltype.hostedCallType } });
console.log("updatehostcalltype----############----------",updatehostcalltype)
}
    // Record two transactions: one for the spender and one for the receiver

    // 1. Joiner's transaction (spend)
    const joinerTransaction = new CoinTransactionHistory({
      userId: joinerId,
      fromUserId: joinerId,
      toUserId: hostId,
      type: 'spend', // Indicating coins were spent
      coins: coinsRequired,
      amountInCurrency: 0, // Optional: amount in real currency
      description: `Hearts spent for a ${callEntry.callType} call`,
      spendingType: callEntry.callType,
      heartsTransferred: heartsToTransfer,
      callDurationMinutes:callDurationMinutes,
    });
    await joinerTransaction.save();

    // 2. Host's transaction (credit)
    const hostTransaction = new CoinTransactionHistory({
      userId: hostId,
      fromUserId: joinerId,
      toUserId: hostId,
      type: 'credit', // Indicating hearts were credited
      coins: heartsForHost, // This can be the hearts received
      amountInCurrency: 0, // Optional: amount in real currency
      description: `Hearts credited for a ${callEntry.callType} call`,
      spendingType: callEntry.callType,
      heartsTransferred: heartsForHost,
      callDurationMinutes:callDurationMinutes,
    });
    await hostTransaction.save();

    // Remove the entry from the userOneVsOneList collection
    //await UserOneVsOneList.deleteOne({ channelName });

    res.status(200).json({ 
      message: 'Call ended successfully, hearts transferred, transactions recorded, and user list entry removed', 
      callEntry, 
      joinerTransaction, 
      hostTransaction 
    });
  } catch (err) {
    console.error('An error occurred while ending the call:', err);
    res.status(500).json({ error: 'An error occurred while ending the call' });
  }
};
*/

//last end call
/*
exports.endCall = async (req, res) => {
  const { hostId, joinerId, channelName, callDurationMinutes } = req.body;

  if (!hostId || !joinerId || !channelName || !callDurationMinutes) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Update host status to off-call
    await UserOneVsOneList.updateOne({ userId: hostId }, { $set: { onCall: false } });

    // Find and update the call entry
    const callEntry = await UserCall.findOneAndUpdate(
      { channelName, $or: [{ hostId }, { joinerId }] },
      { callEnded: true, callEndedAt: new Date() },
      { new: true }
    );

    if (!callEntry) {
      return res.status(404).json({ message: 'Call not found' });
    }

    // Fetch heart cost per minute based on call type
    const callHeartCost = await CallHeartCost.findOne();
    if (!callHeartCost) {
      return res.status(500).json({ error: 'Call heart cost not found' });
    }

    let heartsToTransfer = 0;
    if (callEntry.callType === 'audio') {
      heartsToTransfer = callDurationMinutes * callHeartCost.audioCallHeartCost;
    } else if (callEntry.callType === 'video') {
      heartsToTransfer = callDurationMinutes * callHeartCost.videoCallHeartCost;
    }

    // Fetch heart conversion rates
    const heartCosts = await HeartCost.findOne();
    if (!heartCosts) {
      return res.status(500).json({ error: 'Heart cost conversion rates not found' });
    }

    const joinerUser = await User.findById(joinerId);
    const hostUser = await User.findById(hostId);

    if (!joinerUser || !hostUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate coins required for the hearts to transfer
    const coinsRequired = heartsToTransfer * heartCosts.costPerHeart;

    if (joinerUser.profile.coin < coinsRequired) {
      return res.status(400).json({ error: 'Not enough coins to complete the transaction' });
    }

    // Deduct only coins from joiner
    joinerUser.profile.coin -= coinsRequired;

    // Add the full hearts to host's balance
    hostUser.profile.heartBalance += heartsToTransfer;

    // Save updated profiles
    await joinerUser.save();
    await hostUser.save();

    // Update host call type in UserOneVsOneList if applicable
    const findHostCallType = await UserOneVsOneList.findOne({ userId: hostId });
    if (findHostCallType) {
      await UserOneVsOneList.updateOne(
        { userId: hostId, isHost: true },
        { $set: { callType: findHostCallType.hostedCallType } }
      );
    }

    // Record transactions for joiner (coin spend) and host (credit)
    const joinerTransaction = new CoinTransactionHistory({
      userId: joinerId,
      fromUserId: joinerId,
      toUserId: hostId,
      type: 'spend',
      coins: coinsRequired,
      amountInCurrency: 0,
      description: `Coins spent for a ${callEntry.callType} call`,
      spendingType: callEntry.callType,
      heartsTransferred: heartsToTransfer,
    });
    await joinerTransaction.save();

    const hostTransaction = new CoinTransactionHistory({
      userId: hostId,
      fromUserId: joinerId,
      toUserId: hostId,
      type: 'credit',
      coins: 0,
      amountInCurrency: 0,
      description: `Hearts credited for a ${callEntry.callType} call`,
      spendingType: callEntry.callType,
      heartsTransferred: heartsToTransfer,
    });
    await hostTransaction.save();

    res.status(200).json({
      message: 'Call ended successfully, hearts transferred, transactions recorded, and user list entry removed',
      callEntry,
      joinerTransaction,
      hostTransaction,
    });
  } catch (err) {
    console.error('An error occurred while ending the call:', err);
    res.status(500).json({ error: 'An error occurred while ending the call' });
  }
};
*/

exports.endCall = async (req, res) => {
  const { hostId, joinerId, channelName, callDurationMinutes } = req.body;

  if (!hostId || !joinerId || !channelName || !callDurationMinutes) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Update host status to off-call
    await UserOneVsOneList.updateOne({ userId: hostId }, { $set: { onCall: false } });

    // Find and update the call entry
    const callEntry = await UserCall.findOneAndUpdate(
      { channelName, $or: [{ hostId }, { joinerId }] },
      { callEnded: true, callEndedAt: new Date() },
      { new: true }
    );

    if (!callEntry) {
      return res.status(404).json({ message: 'Call not found' });
    }

    // Fetch heart cost per minute based on call type
    const callHeartCost = await CallHeartCost.findOne();
    if (!callHeartCost) {
      return res.status(500).json({ error: 'Call heart cost not found' });
    }

    let heartsToTransfer = 0;
    if (callEntry.callType === 'audio') {
      heartsToTransfer = callDurationMinutes * callHeartCost.audioCallHeartCost;
    } else if (callEntry.callType === 'video') {
      heartsToTransfer = callDurationMinutes * callHeartCost.videoCallHeartCost;
    }

    // Fetch heart conversion rates
    const heartCosts = await HeartCost.findOne();
    if (!heartCosts) {
      return res.status(500).json({ error: 'Heart cost conversion rates not found' });
    }

    const joinerUser = await User.findById(joinerId);
    const hostUser = await User.findById(hostId);

    if (!joinerUser || !hostUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate coins required for the hearts to transfer
    const coinsRequired = heartsToTransfer * heartCosts.costPerHeart;

    if (joinerUser.profile.coin < coinsRequired) {
      return res.status(400).json({ error: 'Not enough coins to complete the transaction' });
    }

    // Deduct only coins from joiner
    joinerUser.profile.coin -= coinsRequired;

    // Add the full hearts to host's balance
    hostUser.profile.heartBalance += heartsToTransfer;
    hostUser.profile.fullheartBalance +=heartsToTransfer;

    // Save updated profiles
    await joinerUser.save();
    await hostUser.save();

    // Update host call type in UserOneVsOneList if applicable
    const findHostCallType = await UserOneVsOneList.findOne({ userId: hostId });
    if (findHostCallType) {
      await UserOneVsOneList.updateOne(
        { userId: hostId, isHost: true },
        { $set: { callType: findHostCallType.hostedCallType } }
      );
    }

    // Record transactions for joiner (coin spend) and host (credit)
    const joinerTransaction = new CoinTransactionHistory({
      userId: joinerId,
      fromUserId: joinerId,
      toUserId: hostId,
      type: 'spend',
      coins: coinsRequired,
      amountInCurrency: 0,
      description: `Coins spent for a ${callEntry.callType} call`,
      spendingType: callEntry.callType,
      heartsTransferred: heartsToTransfer,
    });
    await joinerTransaction.save();

    const hostTransaction = new CoinTransactionHistory({
      userId: hostId,
      fromUserId: joinerId,
      toUserId: hostId,
      type: 'credit',
      coins: 0,
      amountInCurrency: 0,
      description: `Hearts credited for a ${callEntry.callType} call`,
      spendingType: callEntry.callType,
      heartsTransferred: heartsToTransfer,
    });
    await hostTransaction.save();

    res.status(200).json({
      message: 'Call ended successfully, hearts transferred, transactions recorded, and user list entry removed',
      callEntry,
      joinerTransaction,
      hostTransaction,
    });
  } catch (err) {
    console.error('An error occurred while ending the call:', err);
    res.status(500).json({ error: 'An error occurred while ending the call' });
  }
};


/*
//get
exports.getUserOneVsOneList = async (req,res)=>{
 const { category } = req.query;

  if (!category) {
    return res.status(400).json({ error: 'Category query parameter is required' });
  }

  try {
    const users = await UserOneVsOneList.find({ category })
      .populate({
        path: 'userId',
        select: '-otp' // Exclude the otp field
      });

    res.json({users,appId:"c19400d6aac04a4388e24c35fc54fc52"});
  } catch (err) {
    console.error('An error occurred while fetching the users:', err);
    res.status(500).json({ error: 'An error occurred while fetching the users' });
  }
}

*/


/*
exports.getUserOneVsOneListByCategory = async (req, res) => {
  const category = req.query.category;
  const userId = req.params.id; // Extract userId from req.params

  console.log("category---------", category);
  console.log("userId----------", userId);

  // Validate category query parameter
  if (!category) {
    return res.status(400).json({ error: 'Category query parameter is required' });
  }

  try {
    // Find users filtered by category and excluding the userId from params
    const userOneVsOneList = await UserOneVsOneList.find({ 
      category, 
      userId: { $ne: userId } // $ne excludes userId
    });

    // Fetch user details from the User collection
    const userIds = userOneVsOneList.map(entry => entry.userId); // Extract user IDs
   // const channelId = userOneVsOneList.map(entry => entry.channelName);
    const users = await User.find({ 
      _id: { $in: userIds }, 
      status: 'approved' // Check status in the User collection
    }).select('-otp'); // Exclude the otp field

    // Filter the entries based on matching user IDs
    const filteredUsers = userOneVsOneList.filter(entry =>
      users.some(user => user._id.toString() === entry.userId.toString())
    );

    // Format the filtered data
    const response = filteredUsers.map(entry => {
      const user = users.find(user => user._id.toString() === entry.userId.toString());
      return {
        _id: entry._id,
        userId: {
          _id: user._id,
          username: user.username,
          image: user.profile.image,
          DOB: user.profile.dateOfBirth,
          status: user.status,
          mobileNumber: user.mobileNumber,
          description: user.profile.userDescription,
     //     channelId:channelId,
        },
        category: entry.category,
        // Add other fields from UserOneVsOneList if needed
        otherFields: entry.otherFields || '...'
      };
    });

    // Send the response
    res.json({
      users: response,
      appId: "5706e283c47f4cf1be78f39d340a4c2d"
    });
  } catch (err) {
    console.error('An error occurred while fetching the users:', err);
    res.status(500).json({ error: 'An error occurred while fetching the users' });
  }
};
*/

exports.getUserOneVsOneListByCategory = async (req, res) => {
  const category = req.query.category;
  const userId = req.params.id; // Extract userId from req.params

  console.log("category---------", category);
  console.log("userId----------", userId);

  // Validate category query parameter
  if (!category) {
    return res.status(400).json({ error: 'Category query parameter is required' });
  }

  try {
    // Find users filtered by category and excluding the userId from params
    const userOneVsOneList = await UserOneVsOneList.find({
      category,
      userId: { $ne: userId } // $ne excludes userId
    });

    // Fetch user details from the User collection
    const userIds = userOneVsOneList.map(entry => entry.userId); // Extract user IDs
    const users = await User.find({
      _id: { $in: userIds },
      status: 'approved',
      connectStatus:'online', // Check status in the User collection
    }).select('-otp'); // Exclude the otp field

    // Filter the entries based on matching user IDs
    const filteredUsers = userOneVsOneList.filter(entry =>
      users.some(user => user._id.toString() === entry.userId.toString())
    );

    // Format the filtered data
    const response = filteredUsers.map(entry => {
      const user = users.find(user => user._id.toString() === entry.userId.toString());
      return {
        _id: entry._id,
        userId: {
          _id: user._id,
          username: user.username,
          image: user.profile.image,
          DOB: user.profile.dateOfBirth,
          status: user.status,
          connectStatus:user.connectStatus,
          mobileNumber: user.mobileNumber,
          description: user.profile.userDescription,
        },
        category: entry.category,
        channelName: entry.channelName, // Add channelName from UserOneVsOneList collection
        token: entry.token, // Add token from UserOneVsOneList collection
        // Add other fields from UserOneVsOneList if needed
        otherFields: entry.otherFields || '...',
      };
    });

    // Send the response
    res.json({
      users: response,
     // appId: "5706e283c47f4cf1be78f39d340a4c2d"
        appId:"ce47f829d5514255972835067b6f228f",
    });
  } catch (err) {
    console.error('An error occurred while fetching the users:', err);
    res.status(500).json({ error: 'An error occurred while fetching the users' });
  }
};


exports.getUserOneVsOneListByUserId = async (req, res) => {
  const userId = req.params.userId;
  console.log("userId----------", userId);

  try {
    // Step 1: Find the one-on-one list entries for the given userId
    const oneVsOneList = await UserOneVsOneList.find({ userId });

    if (!oneVsOneList || oneVsOneList.length === 0) {
      return res.status(404).json({ message: 'No one-on-one list found for this user.' });
    }

    // Step 2: Find the user details for the given userId
    const user = await User.findById(userId)
      .select('-otp'); // Exclude the otp field

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Step 3: Combine the data and send the response
    const response = {
      user, // Include the user details without otp
      oneVsOneList,
 //     appId:"5706e283c47f4cf1be78f39d340a4c2d",
        appId:"ce47f829d5514255972835067b6f228f",
       // Include the one-on-one list
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching one-on-one list or user details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getOtherUserDetailById = async (req, res) => {
  console.log("req.params----", req.params);
  console.log("req.query-------", req.query);
  const userId = req.params.userId;  // Target user ID
  const {GetUserId} = req.query;    // Requesting user ID

  if (!userId || !GetUserId) {
    return res.status(400).json({ error: 'User ID and GetUserId are required' });
  }

  try {
    // Find the requesting user by ID
    const getUser = await User.findById(GetUserId).select('-otp');
console.log("getUser---------",getUser);
    if (!getUser) {
      return res.status(404).json({ message: 'Requesting user not found' });
    }

    // Count the number of followers and followings for the requesting user
    const followersCount = await Follow.countDocuments({ followingId: GetUserId });
    const followingsCount = await Follow.countDocuments({ followerId: GetUserId });

    // Check if userId is following GetUserId
    const isFollowing = await Follow.exists({ followerId: userId, followingId: GetUserId });

    // Respond with the requesting user's profile and follow counts
    res.status(200).json({
     userId:getUser._id,
      userName: getUser.username,
      userProfile: getUser.profile,
      followersCount,
      followingsCount,
      isFollowing: !!isFollowing
    });
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.blockUser = async (req, res) => {
  const { userId, blockedUserId, reason, blockFlag } = req.body;

  if (!userId || !blockedUserId || !reason || blockFlag === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if the block entry already exists
    let blockEntry = await Block.findOne({ userId, blockedUserId });

    if (blockEntry) {
      // Update existing block entry
      blockEntry.reason = reason;
      blockEntry.blockFlag = blockFlag;
      blockEntry.blockedAt = Date.now();
      await blockEntry.save();
    } else {
      // Create a new block entry
      blockEntry = new Block({ userId, blockedUserId, reason, blockFlag });
      await blockEntry.save();
    }

    res.status(201).json(blockEntry);
  } catch (err) {
    console.error('Error blocking user:', err);
    res.status(500).json({ error: 'An error occurred while blocking the user' });
  }
};


exports.createInitialCoin = async (req, res) => {
  try {
      const { coin, status } = req.body;

      const initialCoin = new InitialCoin({ coin,status });
      await initialCoin.save();

      res.status(201).json(initialCoin);
  } catch (error) {
      res.status(500).json({ message: 'Error creating initial coin', error });
  }
};

exports.getInitialCoin = async (req, res) => {
  try {
      const initialCoin = await InitialCoin.findOne();

      if (!initialCoin) {
          return res.status(404).json({ message: 'Initial coin not found.' });
      }

      res.status(200).json(initialCoin);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching initial coin', error });
  }
};

exports.updateInitialCoin = async (req, res) => {
    try {
        const { coin, status } = req.body;

        // Find the initial coin document
        const initialCoin = await InitialCoin.findOne();
        if (!initialCoin) {
            return res.status(404).json({ message: 'Initial coin not found.' });
        }

        // Update coin if present
        if (coin !== undefined) { // Check if coin is provided
            initialCoin.coin = coin;
        }

        // Update status if present
        if (status !== undefined) { // Check if status is provided
            initialCoin.status = status;
        }

        // Update the updatedAt timestamp
        initialCoin.updatedAt = Date.now();

        // Save the document
        await initialCoin.save();

        res.status(200).json(initialCoin);
    } catch (error) {
        res.status(500).json({ message: 'Error updating initial coin', error });
    }
};


exports.createOrUpdateHeartCost = async (req, res) => {
  try {
    const { costPerHeart } = req.body;

    if (costPerHeart === undefined) {
      return res.status(400).json({ error: 'costPerHeart is required' });
    }

    let heartCost = await HeartCost.findOne();
    
    if (heartCost) {
      // Update existing heart cost
      heartCost.costPerHeart = costPerHeart;
      await heartCost.save();
    } else {
      // Create new heart cost
      heartCost = new HeartCost({ costPerHeart });
      await heartCost.save();
    }

    res.status(200).json(heartCost);
  } catch (err) {
    console.error('An error occurred while creating/updating heart cost:', err);
    res.status(500).json({ error: 'An error occurred while creating/updating heart cost' });
  }
};

exports.getHeartCost = async (req, res) => {
  try {
    const heartCost = await HeartCost.findOne();
    if (!heartCost) {
      return res.status(404).json({ error: 'Heart cost not found' });
    }
    res.status(200).json(heartCost);
  } catch (err) {
    console.error('An error occurred while fetching heart cost:', err);
    res.status(500).json({ error: 'An error occurred while fetching heart cost' });
  }
};

// Delete Heart Cost
exports.deleteHeartCost = async (req, res) => {
  try {
    await HeartCost.deleteOne({});
    res.status(200).json({ message: 'Heart cost deleted successfully' });
  } catch (err) {
    console.error('An error occurred while deleting heart cost:', err);
    res.status(500).json({ error: 'An error occurred while deleting heart cost' });
  }
};


exports.convertHeartsToAmount = async (req, res) => {
  const { userId, heartsToConvert } = req.body;
	if (!userId || heartsToConvert === undefined) {
    return res.status(400).json({ error: 'userId and heartsToConvert are required' });
  }

  try {
    // Fetch the cost per heart
    const heartCost = await HeartCost.findOne();
    if (!heartCost) {
      return res.status(404).json({ error: 'Heart cost not found' });
    }

    // Calculate the amount
    const amount = heartsToConvert * heartCost.costPerHeart;

    // Fetch the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user has enough hearts
    if (user.hearts < heartsToConvert) {
      return res.status(400).json({ error: 'Not enough hearts' });
    }

    // Update user profile wallet balance
    await User.findByIdAndUpdate(userId, {
      $inc: { 'profile.walletBalance': amount, 'profile.heartBalance': -heartsToConvert }
    });

    // Update wallet collection balance
    const wallet = await Wallet.findOne({ userId });
    if (wallet) {
      wallet.balance += amount;
      await wallet.save();
    } else {
      const newWallet = new Wallet({ userId, balance: amount });
      await newWallet.save();
    }

    // Log the conversion history
    const conversionHistory = new HeartConversionHistory({
      userId,
      heartsConverted: heartsToConvert,
      amountReceived: amount
    });
    await conversionHistory.save();

    res.status(200).json({ message: 'Hearts converted to amount successfully', amount });
  } catch (err) {
    console.error('An error occurred during heart conversion:', err);
    res.status(500).json({ error: 'An error occurred during heart conversion' });
  }
};

exports.getConversionHistory = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const history = await HeartConversionHistory.find({ userId }).sort({ timestamp: -1 });
    res.status(200).json(history);
  } catch (err) {
    console.error('An error occurred while retrieving conversion history:', err);
    res.status(500).json({ error: 'An error occurred while retrieving conversion history' });
  }
};


exports.createOrUpdateHeartCostForCall = async (req, res) => {
  const { audioCallHeartCost, videoCallHeartCost, minute } = req.body;

  if (audioCallHeartCost === undefined || videoCallHeartCost === undefined || minute === undefined) {
    return res.status(400).json({ error: 'audioCallHeartCost, videoCallHeartCost, and minute are required' });
  }

  try {
    // Check if a heart cost record already exists
    let heartCost = await CallHeartCost.findOne();

    if (heartCost) {
      // Update the existing record
      heartCost.audioCallHeartCost = audioCallHeartCost;
      heartCost.videoCallHeartCost = videoCallHeartCost;
      heartCost.minute = minute;
    } else {
      // Create a new record
      heartCost = new CallHeartCost({
        audioCallHeartCost,
        videoCallHeartCost,
        minute
      });
    }

    await heartCost.save();
    res.status(200).json({ message: 'Heart cost updated successfully', heartCost });
  } catch (err) {
    console.error('An error occurred while creating/updating heart cost:', err);
    res.status(500).json({ error: 'An error occurred while creating/updating heart cost' });
  }
};






exports.getCallHeartCost = async (req, res) => {
  try {
    const heartCost = await CallHeartCost.findOne();

    if (!heartCost) {
      return res.status(404).json({ message: 'Heart cost not found' });
    }

    res.status(200).json(heartCost);
  } catch (err) {
    console.error('An error occurred while fetching heart cost:', err);
    res.status(500).json({ error: 'An error occurred while fetching heart cost' });
  }
};

exports.buyGift = async (req, res) => {
  const { userId, giftId } = req.body;

  if (!userId || !giftId) {
    return res.status(400).json({ error: 'userId and giftId are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const gift = await Gift.findById(giftId);
    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    if (user.profile.coin < gift.newPrice) {
      return res.status(400).json({ error: 'Insufficient coins' });
    }

    user.profile.coin -= gift.newPrice;
    await user.save();

    const transaction = new CoinTransactionHistory({
      userId: user._id,
      type: 'spend',
      coins: gift.newPrice,
      amountInCurrency: gift.newPrice,
      description: `Purchased gift: ${gift.giftName}`,
      spendingType: 'gift_purchase'
    });
    await transaction.save();

    let userGift = await UserGift.findOne({ userId: user._id, giftId: gift._id });
    if (userGift) {
      userGift.count += 1;
      userGift.transactionId = transaction._id;
      userGift.amount = gift.newPrice;
      userGift.coinAmount = gift.newPrice;
      userGift.date = transaction.timestamp;
    } else {
      userGift = new UserGift({
        userId: user._id,
        transactionId: transaction._id,
        giftId: gift._id,
        giftName: gift.giftName,
        amount: gift.newPrice,
        coinAmount: gift.newPrice,
        date: transaction.timestamp,
        count: 1
      });
    }

    await userGift.save();

    res.status(200).json({
      message: 'Gift purchased successfully',
      user: {
        userId: user._id,
        coinsRemaining: user.profile.coin,
        walletBalance: user.profile.walletBalance
      },
      transaction: {
        transactionId: transaction._id,
        giftId: gift._id,
        giftName: gift.giftName,
        amount: gift.newPrice,
        coinAmount: gift.newPrice,
        date: transaction.timestamp
      },
      userGift: {
        userId: userGift.userId,
        transactionId: userGift.transactionId,
        giftId: userGift.giftId,
        giftName: userGift.giftName,
        amount: userGift.amount,
        coinAmount: userGift.coinAmount,
        date: userGift.date,
        count: userGift.count
      }
    });
  } catch (err) {
    console.error('An error occurred while buying the gift:', err);
    res.status(500).json({ error: 'An error occurred while buying the gift' });
  }
};

exports.getUserGift = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    try {
        const userGifts = await UserGift.find({ userId });

        res.status(200).json({ userGifts });
    } catch (err) {
        console.error('An error occurred while fetching user gifts:', err);
        res.status(500).json({ error: 'An error occurred while fetching user gifts' });
    }
};

exports.shareGift = async (req, res) => {
    const { fromUserId, toUserId, giftId, quantity } = req.body;

    if (!fromUserId || !toUserId || !giftId || !quantity) {
        return res.status(400).json({ error: 'fromUserId, toUserId, giftId, and quantity are required' });
    }

    try {
        // Fetch the gift from the userGift collection
        const userGift = await UserGift.findOne({ userId: fromUserId, giftId });
        if (!userGift) {
            return res.status(404).json({ error: 'Gift not found in user\'s collection' });
        }

        if (userGift.count < quantity) {
            return res.status(400).json({ error: 'Insufficient gift quantity' });
        }

        // Deduct the quantity from the fromUserId
        userGift.count -= quantity;
        await userGift.save();

        // Add the gift to the toUserId's collection
        let recipientGift = await UserGift.findOne({ userId: toUserId, giftId });

        if (recipientGift) {
            // Increment the gift count
            recipientGift.count += quantity;
        } else {
            // Create a new user gift record for the recipient
            recipientGift = new UserGift({
                userId: toUserId,
                transactionId: userGift.transactionId,
                giftId: userGift.giftId,
                giftName: userGift.giftName,
                amount: userGift.amount,
                coinAmount: userGift.coinAmount,
                date: new Date(),
                count: quantity
            });
        }

        await recipientGift.save();

        // Store transaction history for the share action
        const transaction = new CoinTransactionHistory({
            userId: fromUserId, // Ensure this is set
            fromUserId,
            toUserId,
            giftId,
            type: 'spend',
            coins: userGift.coinAmount * quantity,
            amountInCurrency: userGift.amount * quantity,
            description: `Shared gift: ${userGift.giftName}`,
            spendingType: 'gift_share',
            timestamp: new Date(),
            quantity
        });

        await transaction.save();

        res.status(200).json({
            message: 'Gift shared successfully',
            fromUserId,
            toUserId,
            giftId,
            quantity
        });
    } catch (err) {
        console.error('An error occurred while sharing the gift:', err);
        res.status(500).json({ error: 'An error occurred while sharing the gift' });
    }
};

exports.createOrUpdateCoinOfferBanner = async (req, res) => {
    const { coin, rateInInr, text, status, viewingOrder } = req.body;

    try {
        let bannerImagePath, thumbnailImagePath;

        if (req.files && req.files.image) {
            const image = req.files.image;
            const name = 'banner';
            const finalName = name.replace(/\s+/g, '_');
            const desImageDir = `${bannerPath}/${finalName}`;

            if (!fs.existsSync(desImageDir)) {
                fs.mkdirSync(desImageDir, { recursive: true });
            }

            const imageName = image.name.replace(/ /g, '_');
            const originalImagePath = `${desImageDir}/${imageName}`;
            fs.writeFileSync(originalImagePath, image.data);

            const thumbnailDir = `${bannerPath}/thumbnails`;
            if (!fs.existsSync(thumbnailDir)) {
                fs.mkdirSync(thumbnailDir, { recursive: true });
            }

            const extension = path.extname(image.name).toLowerCase();
            const thumbnailImagePath = `${thumbnailDir}/${path.basename(imageName, extension)}.webp`;
            let pipeline;

            if (extension === '.png' || extension === '.jpg' || extension === '.jpeg') {
                pipeline = sharp(originalImagePath)
                    .resize({ width: 200, height: 200 })
                    .toFormat('webp')
                    .webp({ quality: 80 })
                    .toFile(thumbnailImagePath);
            } else {
                throw new Error('Unsupported file format');
            }

            await pipeline;

            bannerImagePath = `https://salesman.aindriya.co.in/${finalName}/${imageName}`;
          //  thumbnailImagePath = `https://salesman.aindriya.co.in/${URLpathB}/thumbnails/${path.basename(imageName, extension)}.webp`;
        }

        let coinOfferBanner = await CoinOfferBanner.findOne({ viewingOrder });

        if (coinOfferBanner) {
            coinOfferBanner.coin = coin;
            coinOfferBanner.rateInInr = rateInInr;
            coinOfferBanner.text = text;
            coinOfferBanner.status = status;
            coinOfferBanner.viewingOrder = viewingOrder;
            if (bannerImagePath && thumbnailImagePath) {
                coinOfferBanner.bannerImage = bannerImagePath;
            //    coinOfferBanner.thumbnailImage = thumbnailImagePath;
            }
        } else {
            coinOfferBanner = new CoinOfferBanner({
                coin,
                rateInInr,
                text,
                status,
                viewingOrder,
                bannerImage: bannerImagePath,
              //  thumbnailImage: thumbnailImagePath
            });
        }

        await coinOfferBanner.save();
        res.status(200).json({ message: 'Coin offer banner created/updated successfully', coinOfferBanner });
    } catch (err) {
        console.error('An error occurred while creating/updating coin offer banner:', err);
        res.status(500).json({ error: 'An error occurred while creating/updating coin offer banner' });
    }
};

exports.getCoinOfferBanner = async (req,res)=>{
try{
 const coinOfferBanner = await CoinOfferBanner.find();
 res.status(200).json(coinOfferBanner);
}catch(err){
console.log("err--",err)
res.status(500).json({ error: 'An error occurred while fetching the coin offer banner' });
}
}

exports.getCoinOfferBannerById = async (req, res) => {
    const id= req.params.id;
    try {
        const coinOfferBanner = await CoinOfferBanner.findById(id);
        if (!coinOfferBanner) {
            return res.status(404).json({ error: 'Coin offer banner not found' });
        }
        res.status(200).json(coinOfferBanner);
    } catch (err) {
        console.error('An error occurred while fetching the coin offer banner:', err);
        res.status(500).json({ error: 'An error occurred while fetching the coin offer banner' });
    }
};


exports.recordCoinPurchase = async (req, res) => {
  const { userId, amount, coinsPurchased, transactionId, status } = req.body;

  if (!userId || !amount || !coinsPurchased || !transactionId || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Record the transaction
    const transaction = new CoinPurchaseTransaction({
      userId,
      amount,
      coinsPurchased,
      transactionId,
      status
    });

    await transaction.save();

    // Update the user's coin balance
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Increment the user's coin balance
    user.profile.coin += coinsPurchased;
    await user.save();

    res.status(201).json({ message: 'Transaction recorded successfully', transaction });
  } catch (err) {
    console.error('An error occurred while recording the coin purchase:', err);
    res.status(500).json({ error: 'An error occurred while recording the coin purchase' });
  }
};




exports.getCoinTransactionHistory = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // Fetch transaction history for the given userId
        const transactions = await CoinTransactionHistory.find({ userId })
            .sort({ timestamp: -1 }) // Optional: sort by latest transactions first
            .exec();

        if (!transactions.length) {
            return res.status(404).json({ message: 'No transaction history found for this user' });
        }

        // Fetch the heart cost configuration for audio calls
        const callHeartCost = await CallHeartCost.findOne();
        if (!callHeartCost) {
            return res.status(500).json({ error: 'Call heart cost configuration not found' });
        }

        // Populate user details for fromUserId and toUserId
        const populatedTransactions = await Promise.all(transactions.map(async transaction => {
            const fromUser = await User.findById(transaction.fromUserId, 'username profile.image');
            const toUser = await User.findById(transaction.toUserId, 'username profile.image');

            // Calculate call duration if the transaction is for an audio call
            let callDuration = null;
            if (transaction.spendingType === 'audio' && callHeartCost) {
                // Calculate the call duration in minutes based on heartsTransferred
                callDuration = callHeartCost.audioCallHeartCost * transaction.heartsTransferred; // Using the heart-to-duration ratio
            }

            return {
                ...transaction.toObject(),
                fromUserDetails: fromUser ? { username: fromUser.username, image: fromUser.profile.image } : null,
                toUserDetails: toUser ? { username: toUser.username, image: toUser.profile.image } : null,
                callDuration, // Include the calculated call duration in minutes
            };
        }));

        res.status(200).json({
            userId,
            transactions: populatedTransactions
        });
    } catch (err) {
        console.error('An error occurred while fetching coin transaction history:', err);
        res.status(500).json({ error: 'An error occurred while fetching coin transaction history' });
    }
};

exports.buyCoinPackage = async (req, res) => {
  const { userId, packageId } = req.body;
console.log("userId---------",userId);
console.log("packageId-------",packageId);
  if (!userId || !packageId) {
    return res.status(400).json({ error: 'userId and packageId are required' });
  }

  try {
    // Fetch the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch the coin package
    const coinPackage = await CoinPackage.findById(packageId);
    if (!coinPackage || !coinPackage.status) {
      return res.status(404).json({ error: 'Coin package not found or inactive' });
    }

    // Update the user's coin balance
    user.profile.coin += coinPackage.coin;
    await user.save();

    // Record the transaction in CoinTransactionHistory
    const transaction = new Transaction({
      userId: user._id,
      type:"Purchase",
      coins: coinPackage.coin,
      amount: coinPackage.rateInInr,
      description: `Purchased ${coinPackage.coin} coins for ₹${coinPackage.rateInInr}`,
      //spendingType: 'coin_purchase'
    });
    await transaction.save();

    res.status(200).json({
      message: 'Coin package purchased successfully',
      user: {
        userId: user._id,
        coins: user.profile.coin,
  //      walletBalance: user.profile.walletBalance // If walletBalance is part of user profile
      },
      // transaction: {
      //   transactionId: transaction._id,
      //   coins: transaction.coins,
      //   amountInCurrency: transaction.amountInCurrency,
      //   description: transaction.description,
      //   date: transaction.timestamp
      // }
    });
  } catch (err) {
    console.error('An error occurred while purchasing the coin package:', err);
    res.status(500).json({ error: 'An error occurred while purchasing the coin package' });
  }
};


exports.getUserDataByUserId = async (req, res) => {
  const userId = req.params.userId;
console.log("userId---------------",req.params.userId)
  try {
    // Fetch user data from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.submitKycPancard = async (req, res) => {
    const { userId, name, panNumber, verified } = req.body;

    if (!userId || !name || !panNumber) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if PAN number already exists
        const existingPanCard = await PanCardVerification.findOne({ panNumber });
        if (existingPanCard) {
            return res.status(400).json({ error: 'PAN number already exists' });
        }

        // Create new PAN card verification entry
        const newPanCardVerification = new PanCardVerification({
            userId,
            name,
            panNumber,
            verified: verified || false
        });

        await newPanCardVerification.save();

        res.status(201).json({
            message: 'PAN card details submitted successfully',
            panCardVerification: newPanCardVerification
        });
    } catch (error) {
        console.error('Error submitting PAN card details:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getKycPancard= async (req, res) => {
    const userId = req.params.userId;
console.log("=================",userId)
    try {
        // Find the PAN card verification details by userId
        const panCardVerification = await PanCardVerification.findOne({ userId });

        if (!panCardVerification) {
            return res.status(404).json({ error: 'PAN card details not found' });
        }

        res.status(200).json({
            message: 'PAN card details retrieved successfully',
            panCardVerification
        });
    } catch (error) {
        console.error('Error retrieving PAN card details:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.rateCall = async (req, res) => {
  const { userId, starCount, review } = req.body;

  if (!userId || starCount === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if a rating for the user already exists
    let callRating = await CallRating.findOne({ userId });

    if (callRating) {
      // Update existing rating
      callRating.starCount = starCount;
      callRating.review = review;
    } else {
      // Create a new rating
      callRating = new CallRating({ userId, starCount, review });
    }

    await callRating.save();
    res.status(200).json({ message: 'Rating saved successfully', callRating });
  } catch (err) {
    console.error('An error occurred while saving the rating:', err);
    res.status(500).json({ error: 'An error occurred while saving the rating' });
  }
};

// Admin sets the conversion rate
exports.SetHeartConversionRate = async (req, res) => {
  const ratePerHeart = req.body.ratePerHeart;
  console.log("ratePerHeart-----------",ratePerHeart);
  
  if (!ratePerHeart) {
      return res.status(400).json({ message: 'Rate per heart is required.' });
  }

  try {
      let conversionRate = await HeartConversionRate.findOne();
      
      if (conversionRate) {
          conversionRate.ratePerHeart = ratePerHeart;
          conversionRate.updatedAt = Date.now();
      } else {
          conversionRate = new HeartConversionRate({ ratePerHeart });
      }

      await conversionRate.save();
      return res.status(200).json({ message: 'Conversion rate set successfully.', conversionRate });
  } catch (error) {
      return res.status(500).json({ message: 'Error setting conversion rate.', error });
  }
};


exports.withdraw = async (req, res) => {
  try {
    const userId = req.body.userId;
    const amountToWithdraw = req.body.amount;

    // Find the user's wallet
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found for the user.' });
    }

    // Check if the user has enough balance to withdraw
    if (wallet.balance < amountToWithdraw) {
      return res.status(400).json({ message: 'Insufficient balance to withdraw.' });
    }

    // Get the current heart conversion rate
    const conversionRate = await HeartConversionRate.findOne();
    if (!conversionRate) {
      return res.status(400).json({ message: 'Conversion rate not set by admin.' });
    }

    // Calculate the number of hearts required for the withdrawal
    const heartsToDeduct = amountToWithdraw / conversionRate.ratePerHeart;

    // Find the user and update the heart balance and wallet balance
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has enough hearts to cover the withdrawal
    if (user.profile.fullheartBalance < heartsToDeduct) {
      return res.status(400).json({ message: 'Insufficient hearts to convert for withdrawal.' });
    }

    // Deduct the hearts and update the wallet balance
    user.profile.fullheartBalance -= heartsToDeduct;
    user.profile.fullheartBalance -= amountToWithdraw;
    wallet.balance -= amountToWithdraw;

    await user.save(); // Save the updated user profile
    await wallet.save(); // Save the updated wallet balance

    // Record the transaction
    const transaction = new Transaction({
      userId,
      type: 'withdraw',
      amount: amountToWithdraw,
      hearts: heartsToDeduct,
      description: `Heart redeemed (${amountToWithdraw})`,
    });

    await transaction.save();

    // Respond with success message and updated wallet balance
    res.status(200).json({
      message: 'Withdrawal successful.',
      walletBalance: wallet.balance,
      heartBalance: user.profile.fullheartBalance,
      transaction,
    });
  } catch (error) {
    console.error('Error processing withdrawal:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.createDiscover = async (req, res) => {
  try {
    let imageUrl = '';
    let videoUrl = '';

    // Handling image file
    if (req.files && req.files.image) {
      const image = req.files.image;
      const finalImageName = image.name.replace(/\s+/g, '_');

      // Directory for storing images
      const imageDir = `${DiscoverPath}/Discover/original`;
      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
      }

      // Save original image
      const originalImagePath = `${imageDir}/${finalImageName}`;
      fs.writeFileSync(originalImagePath, image.data);

      // Directory for thumbnails
      const thumbnailDir = `${imageDir}/thumbnails`;
      if (!fs.existsSync(thumbnailDir)) {
        fs.mkdirSync(thumbnailDir, { recursive: true });
      }

      // Resize and save thumbnail image
      const extension = path.extname(finalImageName).toLowerCase();
      const thumbnailImagePath = `${thumbnailDir}/${path.basename(finalImageName, extension)}.webp`;
      await sharp(originalImagePath)
        .resize({ width: 200, height: 200 })
        .toFormat('webp')
        .webp({ quality: 80 })
        .toFile(thumbnailImagePath);

      // Set image URLs
      imageUrl = `https://salesman.aindriya.co.in/Discover/original/${finalImageName}`;
    }

    // Handling video file
    if (req.files && req.files.video) {
      const video = req.files.video;
      const finalVideoName = video.name.replace(/\s+/g, '_');

      // Directory for storing videos
      const videoDir = `${originalImagePath}/videos`;
      if (!fs.existsSync(videoDir)) {
        fs.mkdirSync(videoDir, { recursive: true });
      }

      // Save the video file
      const videoPath = `${videoDir}/${finalVideoName}`;
      fs.writeFileSync(videoPath, video.data);

      // Set video URL
      videoUrl = `https://salesman.aindriya.co.in/Discover/original/${finalVideoName}`;
    }

    const { title, status } = req.body;

    const newDiscovery = new Discovery({
      image: imageUrl,
      video: videoUrl,
      title,
      status,
    });

    await newDiscovery.save();
    return res.status(201).json({ message: 'Discovery created successfully', discovery: newDiscovery });
  } catch (error) {
    console.error('Error creating discovery:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getAllDiscoveries = async (req, res) => {
  try {
    // const { status } = req.query;

    // // Build the query based on the status filter if provided
    // const query = {};
    // if (status !== undefined) {
    //   query.status = status === 'true';
    // }

    const discoveries = await Discovery.find();

    return res.status(200).json({ message: 'Discoveries fetched successfully', discoveries });
  } catch (error) {
    console.error('Error fetching discoveries:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getDiscoveryById = async (req, res) => {
  try {
    const id = req.params.id;

    const discovery = await Discovery.findById(id);

    if (!discovery) {
      return res.status(404).json({ error: 'Discovery not found' });
    }

    return res.status(200).json({ message: 'Discovery fetched successfully', discovery });
  } catch (error) {
    console.error('Error fetching discovery by ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.createCallCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate input
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'Category image is required' });
    }

    const image = req.files.image;
    const sanitizedImageName = image.name.replace(/\s+/g, '_'); // Replace spaces with underscores
    const finalName = name.replace(/\s+/g, '_'); // Directory name based on category name
    const desImageDir = path.join(categoryBasePath, URLpathCC, finalName); // Directory for storing the image

    // Check if the directory exists; if not, create it
    if (!fs.existsSync(desImageDir)) {
      console.log("Directory does not exist. Creating directory...");
      fs.mkdirSync(desImageDir, { recursive: true }); // Create the directory and any necessary parent directories
    }

    // Save the image to the directory
    const imagePath = path.join(desImageDir, sanitizedImageName); // Construct the full image path
    fs.writeFileSync(imagePath, image.data, 'binary'); // Save the image data

    // Construct the clean image URL
    const destinationImgUrl = `https://salesman.aindriya.co.in/${URLpathCC}/${finalName}/${sanitizedImageName}`;
    console.log("Image successfully saved at URL:", destinationImgUrl);

    // Save category data to the database
    const category = new callCategory({
      name,
      description,
      image: destinationImgUrl
    });

    await category.save();

    res.status(201).json({
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Failed to create category', error: error.message });
  }
};
exports.getAllCallCategory = async (req, res) => {
  try {
    const categories = await callCategory.find().select('name description image createdAt');

    res.status(200).json({
      message: 'Call categories fetched successfully',
      categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
  }
};

exports.getCallCategoryById = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await callCategory.findById(id).select('name description image createdAt');

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      message: 'Call category fetched successfully',
      category
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Failed to fetch category', error: error.message });
  }
};



//testing ----------------------


let rooms = new Map();

exports.createRoom = (req,res)=>{
  console.log("req.body---------",req.body);
  const { roomName, hostUserId } = req.body;
    const channelName  = generateChannelName(hostUserId);;
    const uid = hostUserId;
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;


const token = RtcTokenBuilder.buildTokenWithUid(
  APP_ID,
  APP_CERTIFICATE,
  channelName,
  0,
  RtcRole.PUBLISHER,
  Math.floor(Date.now() / 1000) + EXPIRATION_TIME_IN_SECONDS
);
rooms.set(roomName, { host: hostUserId, participants: [hostUserId], waitingList: [] });

console.log("token------roomName-------HostUserId",token, roomName, hostUserId )
    
    res.json({ token, roomName, hostUserId });
}

exports.joinRequest= (req,res)=>{
  const { roomName, userId } = req.body;
  console.log("req.body=-----------------/",req.body)
    const room = rooms.get(roomName);
    console.log("room---------",room)
    console.log("room.host--------",room.host);
    console.log("userId----------",userId);
    if (room) {
        if (userId === room.host) {
            // Host is rejoining
            res.json({ isHost: true, token: RtcTokenBuilder.buildTokenWithUid(APP_ID,
              APP_CERTIFICATE,
              roomName,
              0,
              RtcRole.PUBLISHER,
              Math.floor(Date.now() / 1000) + EXPIRATION_TIME_IN_SECONDS) });
        } else {
            // Add user to waiting list
            if (!room.waitingList.includes(userId)) {
                room.waitingList.push(userId);
            }
            res.json({isHost: true, token: RtcTokenBuilder.buildTokenWithUid(APP_ID,
              APP_CERTIFICATE,
              roomName,
              0,
              RtcRole.PUBLISHER,
              Math.floor(Date.now() / 1000) + EXPIRATION_TIME_IN_SECONDS)});
        }
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
}

exports.acceptUser =(req,res) =>{
  const { roomName, hostUserId, acceptedUserId } = req.body;
    const room = rooms.get(roomName);
    if (room && room.host === hostUserId) {
        const index = room.waitingList.indexOf(acceptedUserId);
        if (index > -1) {
            room.waitingList.splice(index, 1);
            room.participants.push(acceptedUserId);
            const token = generateToken(roomName, acceptedUserId, RtcRole.PUBLISHER);
            res.json({ token, roomName, acceptedUserId });
        } else {
            res.status(400).json({ error: 'User not found in waiting list' });
        }
    } else {
        res.status(403).json({ error: 'Unauthorized or room not found' });
    }
}

/*
exports.getHostedUsers = async (req, res) => {
    try {
        // Fetch the list of hosted users from UserOneVsOneList collection
        const hostedUsers = await UserOneVsOneList.find(); // Add filter conditions if needed
        console.log("hostedUsers---------", hostedUsers);

        // Map through the hostedUsers and fetch user details from User collection based on userId
        const usersWithDetails = await Promise.all(
            hostedUsers.map(async (hostedUser) => {
                // Fetch the user details based on userId
                const user = await User.findById(hostedUser.userId).select(
                    '_id username mobileNumber createdAt updatedAt profile newUser status'
                ); // Adjust fields as needed

                if (!user) {
                    // If the user doesn't exist, skip this entry
                    return null;
                }

                // Format the response as per the required structure
                return {
                    _id: user._id,
                    username: user.username,
                    mobileNumber: user.mobileNumber,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    newUser: user.newUser,
                    status: user.status, // Include status from User collection
                    hostedUserId: hostedUser.userId,
                    callType: hostedUser.callType,
                    category: hostedUser.category,
                    channelName: hostedUser.channelName,
                    token: hostedUser.token,
                    isHosted: hostedUser.isHost,
                    profile: {
                        avatar: user.profile.avatar || '',
                        coin: user.profile.coin || 0,
                        dateOfBirth: user.profile.dateOfBirth || null,
                        gender: user.profile.gender || '',
                        gifts: user.profile.gifts || 0,
                        heartBalance: user.profile.heartBalance || 0,
                        language: user.profile.language || '',
                        place: user.profile.place || '',
                        pointsEarned: user.profile.pointsEarned || 0,
                        walletBalance: user.profile.walletBalance || 0,
                        moodName: user.profile.moodName || '',
                        myMood: user.profile.myMood || ''
                    },
                    __v: user.__v
                };
            })
        );

        // Filter out null entries (if any user doesn't exist)
        const filteredUsers = usersWithDetails.filter(user => user !== null);
console.log("filteredUsers-----------",filteredUsers)
        // Return the combined data in the required format
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error('Error fetching hosted users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

*/



exports.getHostedUsers = async (req, res) => {
    try {
        // Fetch the users directly from the User collection who are hosts
        const hostedUsers = await User.find().select(
            '_id username mobileNumber createdAt updatedAt profile newUser status'
        ); // Adjust fields and filter conditions as needed

        if (!hostedUsers || hostedUsers.length === 0) {
            return res.status(404).json({ message: 'No hosted users found.' });
        }

        // Map through the users to match the previous response structure
        const usersWithDetails = hostedUsers.map(user => ({
            _id: user._id,
            username: user.username,
            mobileNumber: user.mobileNumber,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            newUser: user.newUser,
            status: user.status,
            hostedUserId: user._id, // Match `hostedUserId` with `_id` for consistency
            callType: user.profile.callType || '', // Dummy or default data
            category: user.profile.category || '', // Dummy or default data
            channelName: user.profile.channelName || '', // Dummy or default data
            token: user.profile.token || '', // Dummy or default data
            isHosted: user.profile.isHost || false, // Use profile.isHost as a boolean
            profile: {
                avatar: user.profile.avatar || '',
                coin: user.profile.coin || 0,
                dateOfBirth: user.profile.dateOfBirth || null,
                gender: user.profile.gender || '',
                gifts: user.profile.gifts || 0,
                heartBalance: user.profile.heartBalance || 0,
                language: user.profile.language || '',
                place: user.profile.place || '',
                pointsEarned: user.profile.pointsEarned || 0,
                walletBalance: user.profile.walletBalance || 0,
                moodName: user.profile.moodName || '',
                myMood: user.profile.myMood || ''
            },
            __v: user.__v
        }));

        // Return the combined data in the required format
        res.status(200).json(usersWithDetails);
    } catch (error) {
        console.error('Error fetching hosted users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/*
exports.updateHostedUserStatus = async (req, res) => {
    try {
        // Extract the user ID and the new status from the request body
        const { hostedUserId, status } = req.body;

        // Validate the status value to ensure it's one of the allowed values
        if (!['approved', 'pending', 'declined'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Find and update the hosted user status by userId and roomId (if required)
        const updatedUser = await User.findOneAndUpdate(
            { _id: hostedUserId }, // Condition to find the hosted user
            { $set: { status: status } }, // Update the status field
            { new: true } // Return the updated document
        );

        // If the user is not found, send an error response
        if (!updatedUser) {
            return res.status(404).json({ message: 'Hosted user not found' });
        }

        // Return the updated user data in the response
        res.status(200).json({
            message: 'Status updated successfully',
            updatedUser: updatedUser
        });
    } catch (error) {
        console.error('Error updating hosted user status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
*/

exports.updateHostedUserStatus = async (req, res) => {
    try {
        // Extract the user ID and the new status from the request body
        const { hostedUserId, status } = req.body;

        // Validate the status value to ensure it's one of the allowed values
        if (!['approved', 'pending', 'declined'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Determine the `connectStatus` based on the `status` value
        const connectStatus = status === 'approved' ? 'online' : 'offline';

        // Find and update the hosted user status and connectStatus
        const updatedUser = await User.findOneAndUpdate(
            { _id: hostedUserId }, // Condition to find the hosted user
            { 
                $set: { 
                    status: status, 
                    connectStatus: connectStatus 
                } 
            }, // Update the status and connectStatus fields
            { new: true } // Return the updated document
        );

        // If the user is not found, send an error response
        if (!updatedUser) {
            return res.status(404).json({ message: 'Hosted user not found' });
        }

        // Return the updated user data in the response
        res.status(200).json({
            message: 'Status updated successfully',
            updatedUser: updatedUser
        });
    } catch (error) {
        console.error('Error updating hosted user status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateConnectStatus = async (req, res) => {
    try {
        // Extract the user ID and the new status from the request body
        const { userId, connectStatus } = req.body;

        // Validate the status value to ensure it's one of the allowed values
        if (!['online', 'offline', 'incall'].includes(connectStatus)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Find and update the hosted user status by userId and roomId (if required)
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId }, // Condition to find the hosted user
            { $set: { connectStatus: connectStatus } }, // Update the status field
            { new: true } // Return the updated document
        );

        // If the user is not found, send an error response
        if (!updatedUser) {
            return res.status(404).json({ message: 'Hosted user not found' });
        }

        // Return the updated user data in the response
        res.status(200).json({
            message: 'Status updated successfully',
            updatedUser: updatedUser
        });
    } catch (error) {
        console.error('Error updating hosted user status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find and delete the user by ID
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.hostCallTest = async (req, res) => {
  const { userId, isHost, category, callType } = req.body;
console.log("req.body-----------",req.body); 
const hostedCallType=callType; 
  if (!userId || !callType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const userEntry = await UserOneVsOneList.findOneAndUpdate(
      { userId },
      {
        isHost,
        category,
        callType,
        hostedCallType,
        updatedAt: new Date()
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: 'Host details updated successfully',
      userEntry
    });
  } catch (err) {
    console.error('An error occurred while updating the host details:', err);
    res.status(500).json({ error: 'An error occurred while updating the host details' });
  }
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log("serviceAccount-------",serviceAccount)

///////////////////////
exports.selectHostUserForCallTest = async (req, res) => {
  const { userId, hostUserId, callType, randomCall } = req.body; 
  console.log("req.body------------", req.body);

  if (!userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Validate if both hostUserId and randomCall are provided or inconsistent
    if (hostUserId && randomCall) {
      return res.status(400).json({ error: 'Cannot specify both hostUserId and randomCall' });
    }

    let selectedHostUserId = hostUserId; // Variable to store the actual host user ID

    // If randomCall is true, shuffle and select a random host
    if (randomCall) {
      const availableHosts = await UserOneVsOneList.find({ isHost: true }); // Fetch all available hosts

      if (availableHosts.length === 0) {
        return res.status(404).json({ message: 'No available hosts found' });
      }

      // Shuffle the available hosts and pick one randomly
      const shuffledHosts = availableHosts.sort(() => 0.5 - Math.random());
      selectedHostUserId = shuffledHosts[0].userId; // Assign randomly selected host
    } else {
      if (!selectedHostUserId) {
        return res.status(400).json({ error: 'Missing hostUserId for direct call' });
      }
    }

    if (callType) {
      await UserOneVsOneList.updateOne({ userId: selectedHostUserId, isHost: true }, { $set: { callType } });
    }

    const hostEntry = await UserOneVsOneList.findOne({ userId: selectedHostUserId, isHost: true });

    if (!hostEntry) {
      return res.status(404).json({ message: 'Host not found for the specified userId' });
    }

    const userEntry = await User.findById(userId).select('username profile');
    if (!userEntry) {
      return res.status(404).json({ message: 'User not found for the specified userId' });
    }
console.log("userEntry--------------",userEntry);
    const hostUserEntry = await User.findById(selectedHostUserId).select('username profile');
    if (!hostUserEntry) {
      return res.status(404).json({ message: 'Host user not found for the specified hostUserId' });
    }

    const heartCost = await HeartCost.findOne();
    if (!heartCost) {
      return res.status(500).json({ error: 'Heart cost not found' });
    }

    const userHearts = Math.floor(userEntry.profile.coin / heartCost.costPerHeart);

    const callHeartCost = await CallHeartCost.findOne();
    if (!callHeartCost) {
      return res.status(500).json({ error: 'Call heart cost not found' });
    }

    let maxCallTimeMinutes = 0;
    if (hostEntry.callType === 'audio') {
      maxCallTimeMinutes = Math.floor(userHearts / callHeartCost.audioCallHeartCost);
    } else if (hostEntry.callType === 'video') {
      maxCallTimeMinutes = Math.floor(userHearts / callHeartCost.videoCallHeartCost);
    }

    if ((hostEntry.callType === 'audio' && userHearts < callHeartCost.audioCallHeartCost) ||
        (hostEntry.callType === 'video' && userHearts < callHeartCost.videoCallHeartCost)) {
      return res.status(400).json({
        message: 'You do not have enough balance to join the call.'
      });
    }

    const newCall = new UserCall({
      hostId: selectedHostUserId,
      joinerId: userId,
      category: hostEntry.category,
      callType: hostEntry.callType,
      appId: APP_ID,
      channelName: hostEntry.channelName
    });
    await newCall.save();

    const joinedUserFcmToken = await UserFcmToken.findOne({ userId: userId });
    // Fetch the host's FCM token
    const hostFcmTokenEntry = await UserFcmToken.findOne({ userId: selectedHostUserId });
console.log("hostFcmTokenEntry--------",hostFcmTokenEntry)
    if (!hostFcmTokenEntry) {
      return res.status(404).json({ message: 'FCM token not found for the host user' });
    }

    const hostFcmToken = hostFcmTokenEntry.fcmToken;
console.log("userEntry.profile.avatar----------",userEntry.profile.image);
console.log("userEntry.profile.avatar---------2",String(userEntry.profile.image));
    // Firebase notification payload
    const message = {
      token: hostFcmToken,
      notification: {
        title: 'Call Notification',
        body: `A new call in ${hostEntry.callType} type has been started. Channel: ${hostEntry.channelName}`,
      },

     data: {
  channelName: String(hostEntry.channelName),
  token: String(hostEntry.token),
  callType: String(hostEntry.callType),
  appId: String(APP_ID),
  maxCallTimeMinutes: String(maxCallTimeMinutes), // Convert to string
  joinedUserName: String(userEntry.username),
  joinedUserProfile: userEntry.profile.image ? String(userEntry.profile.image) : '', // Ensure it's a string or an empty string
  joinedUserFcmToken: joinedUserFcmToken ? String(joinedUserFcmToken.fcmToken) : '', // Ensure it's a string or an empty string
},

    };

    console.log("message------------", message);

    // Send push notification via FCM
    const response = await admin.messaging().send(message);
    console.log('FCM Response:', response);

    res.status(200).json({
      message: 'User and Host details retrieved successfully',
      userId: userEntry._id,
      hostUserId: selectedHostUserId, // Return the randomly selected host ID
      userDetails: {
        username: userEntry.username,
        profile: userEntry.profile,
        maxCallTimeMinutes,
      },
      hostDetails: {
        hostUserEntry,
        username: hostEntry.username,
        profile: hostEntry.profile,
        callType: hostEntry.callType,
        channelName: hostEntry.channelName,
        token: hostEntry.token,
        appId: APP_ID,
      }
    });

  } catch (err) {
    console.error('An error occurred while retrieving details:', err);
    res.status(500).json({ error: 'An error occurred while retrieving details' });
  }
};


exports.createOrUpdateFcmToken = async (req, res) => {
    const { userId, fcmToken } = req.body;

    if (!userId || !fcmToken) {
        return res.status(400).json({ message: 'userId and fcmToken are required' });
    }

    try {
        // Find if the userId already exists in the collection
        const userFcmData = await UserFcmToken.findOne({ userId });

        if (userFcmData) {
            // If the fcmToken is different, update it
            if (userFcmData.fcmToken !== fcmToken) {
                userFcmData.fcmToken = fcmToken;
                userFcmData.updatedAt = Date.now();  // Update the timestamp
                await userFcmData.save();

                return res.status(200).json({ message: 'FCM token updated successfully' });
            } else {
                return res.status(200).json({ message: 'FCM token is already up to date' });
            }
        } else {
            // If userId doesn't exist, create a new document
            const newUserFcmToken = new UserFcmToken({
                userId,
                fcmToken
            });

            await newUserFcmToken.save();
            return res.status(201).json({ message: 'FCM token created successfully' });
        }
    } catch (error) {
        console.error('Error in creating or updating FCM token:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.startLiveStream = async (req, res) => {
  const { hostUserId } = req.body;
  const channelName = generateChannelName(hostUserId); // Generate a unique channel name

  console.log(`Generated Channel Name: ${channelName}`);

  if (!hostUserId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Generate token for the live stream
    const token = RtcTokenBuilder.buildTokenWithUid(
      APP_ID,
      APP_CERTIFICATE,
      channelName,
      0, // Use 0 for no specific UID
      RtcRole.PUBLISHER,
      Math.floor(Date.now() / 1000) + EXPIRATION_TIME_IN_SECONDS
    );

    // Create live stream session in the database
    const liveStream = new LiveStream({
      hostUserId,
      channelName,
      token,
      appId: APP_ID,
    });
    await liveStream.save();

    // Get the list of followers for the host user
    const followers = await Follow.find({ followingId: hostUserId });

    console.log("followers---------", followers);

    // Extract followerIds from the followers list
    const followerIds = followers.map(f => f.followerId);
    console.log("followerIds-----------", followerIds);

    // Fetch FCM tokens for followers who have one
    const followersWithFcmTokens = await UserFcmToken.find({ userId: { $in: followerIds } });
    const fcmTokens = followersWithFcmTokens.map(follower => follower.fcmToken).filter(token => token);

    console.log("followersWithFcmTokens-----------", followersWithFcmTokens);

    if (fcmTokens.length > 0) {
      // Firebase notification payload
      const message = {
        notification: {
          title: 'Live Stream Started!',
          body: `User ${hostUserId} has started a live stream in channel ${channelName}.`,
        },
        data: {
          channelName,
          token,
          appId: APP_ID,
          hostUserId,
        },
        tokens: fcmTokens,  // List of FCM tokens
      };

      // Send notifications to users with valid FCM tokens using sendMulticast
      const response = await admin.messaging().sendEachForMulticast(message);

      console.log(`${response.successCount} notifications sent successfully`);
      if (response.failureCount > 0) {
        console.log(`${response.failureCount} notifications failed to send`);
      }
    } else {
      console.log("No valid FCM tokens found for followers");
    }

    return res.status(200).json({
      message: 'Live stream started successfully. Notifications sent to followers with valid FCM tokens.',
      liveStreamDetails: {
        hostUserId,
        channelName,
        token,
        appId: APP_ID,
      },
    });
  } catch (err) {
    console.error('Error starting live stream:', err);
    return res.status(500).json({ error: 'Error starting live stream' });
  }
};


exports.createPrivacyPolicy = async (req,res)=>{
try {
        const { title, content } = req.body;
        const newPolicy = new PrivacyPolicy({ title, content });
        await newPolicy.save();
        res.status(201).json({ message: 'Privacy policy created', data: newPolicy });
    } catch (error) {
        res.status(500).json({ message: 'Error creating privacy policy', error });
    }
}


exports.getPrivacyPolicy = async (req,res)=>{
try {
        const policies = await PrivacyPolicy.find();
        res.status(200).json(policies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching privacy policies', error });
    }

}

exports.getPrivacyPolicyById = async(req,res)=>{


try {
        const { id } = req.params.id; // Extract the ID from the request parameters
        const policy = await PrivacyPolicy.findById(id); // Find the policy by ID

        if (!policy) {
            return res.status(404).json({ message: 'Privacy policy not found' });
        }

        res.status(200).json(policy); // Respond with the found policy
    } catch (error) {
        res.status(500).json({ message: 'Error fetching privacy policy', error: error.message });
    }
}
exports.updatePrivacyPolicy = async (req,res)=>{
try {
        const { title, content } = req.body;
        const updatedPolicy = await PrivacyPolicy.findByIdAndUpdate(
            req.params.id,
            { title, content, updatedAt: Date.now() },
            { new: true }
        );
        if (!updatedPolicy) {
            return res.status(404).json({ message: 'Privacy policy not found' });
        }
        res.status(200).json({ message: 'Privacy policy updated', data: updatedPolicy });
    } catch (error) {
        res.status(500).json({ message: 'Error updating privacy policy', error });
    }
}




exports.getLeaderBoard = async (req, res) => {
  try {
    // Fetch users sorted by heartBalance (diamonds balance) in descending order
    const leaderboard = await User.find()
      .sort({ 'profile.heartBalance': -1 })  // Sort by heartBalance, descending (diamonds balance)
      .limit(10)  // Fetch top 10 users (you can adjust this as needed)
      .select(' username profile.image profile.heartBalance');  // Only select necessary fields

    // Format the response with rank based on position
    const formattedLeaderboard = leaderboard.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      avatar: user.profile.image,
      heartBalance: user.profile.fullheartBalance || 0,  // This is the diamonds balance
    }));

    res.status(200).json({
      success: true,
      message: 'Leaderboard fetched successfully',
      data: formattedLeaderboard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leaderboard',
      error: error.message,
    });
  }
};


//create Role
exports.createRole = async (req, res) => {
  const { name, access, status } = req.body;

  try {
    const role = new Role({ name, access, status });
    await role.save();
    res.status(201).json({ success: true, message: 'Role created successfully', data: role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



exports.getRoleDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }
    res.status(200).json({ success: true, data: role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.updateRole = async (req, res) => {
  const roleId = req.params.id; // ID of the role to be updated
  const updates = req.body; // Payload with fields to be updated

  try {
    // Find the role by ID
    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }

    // Update the "name" field if provided
    if (updates.name !== undefined) {
      role.name = updates.name;
    }

    // Update the "status" field if provided
    if (updates.status !== undefined) {
      role.status = updates.status;
    }

    // Update the "access" field if provided
    if (updates.access !== undefined) {
      updates.access.forEach((updatedModule) => {
        // Check if the module already exists in the current access array
        const existingModule = role.access.find(
          (module) => module.module === updatedModule.module
        );

        if (existingModule) {
          // Update permissions if the module already exists
          Object.assign(existingModule.permissions, updatedModule.permissions);
        } else {
          // Add new module if it doesn't exist
          role.access.push(updatedModule);
        }
      });
    }

    // Save the updated role
    await role.save();

    res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      data: role,
    });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


// Cron job to reset heartBalance at 12:00 AM every day
cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Resetting heartBalance for all users...');
    // Update all users' heartBalance to 0
    const result = await User.updateMany({}, { $set: { 'profile.heartBalance': 0 } });
    console.log(`Reset successful. Updated ${result.modifiedCount} users.`);
  } catch (error) {
    console.error('Error resetting heartBalance:', error);
  }
});


exports.getMoneyPage = async (req, res) => {
  const userId = req.params.id; // User ID from the request

  try {
    // Fetch the user's heart balance
    const user = await User.findById(userId).select('profile.fullheartBalance');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Fetch the current conversion rate
    const conversionRate = await HeartCost.findOne().sort({ createdAt: -1 });
    if (!conversionRate) {
      return res.status(500).json({ success: false, message: 'Conversion rate not set' });
    }

    // Calculate the money equivalent
    const money = user.profile.fullheartBalance* conversionRate.costPerHeart;

    res.status(200).json({
      success: true,
      message: 'Money page details fetched successfully',
      data: {
        heartBalance: user.profile.fullheartBalance,
        conversionRate: conversionRate.rate,
        totalMoney: money.toFixed(2),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



exports.redeemHearts = async (req, res) => {
  const userId = req.params.id;

  try {
    // Fetch user and conversion rate
    const user = await User.findById(userId).select('profile.fullheartBalance');
    console.log("user-------", user);

    const conversionRate = await HeartCost.findOne().sort({ createdAt: -1 });
    console.log("conversionRate------------", conversionRate);

    // Validate heart balance and conversion rate
    if (!user || user.profile.fullheartBalance <= 0) {
      return res.status(400).json({ success: false, message: 'Insufficient hearts to redeem' });
    }

    if (!conversionRate || typeof conversionRate.costPerHeart !== 'number') {
      return res.status(500).json({ success: false, message: 'Conversion rate not set or invalid' });
    }

    // Calculate redeemable money
    const redeemableMoney = user.profile.fullheartBalance * conversionRate.costPerHeart;

    // Update user heart balance and wallet
    const redeemedHearts = user.profile.fullheartBalance; // Store redeemed hearts before resetting
    user.profile.fullheartBalance = 0; // Reset heart balance
    await user.save();

    // Find or create wallet entry
    let wallet = await WithdrawWallet.findOne({ userId });
    if (!wallet) {
      wallet = new WithdrawWallet({ userId, redeemedAmount: 0, withdrawnAmount: 0 });
    }

    wallet.redeemedAmount += redeemableMoney; // Add redeemed money to wallet
    await wallet.save();

    // Store redeem history
    const redeemHistory = new RedeemHistory({
      userId,
      redeemedAmount: redeemableMoney,
      redeemedHearts,
    });
    await redeemHistory.save(); // Save history to the database

    res.status(200).json({
      success: true,
      message: 'Hearts redeemed successfully',
      data: {
        redeemedAmount: redeemableMoney,
        walletBalance: wallet.redeemedAmount - wallet.withdrawnAmount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};




exports.getWalletDetails = async (req, res) => {
  const userId = req.params.id;

  try {
    // Fetch wallet details
    const wallet = await WithdrawWallet.findOne({ userId });

    // Fetch redeem history
    const redeemHistory = await RedeemHistory.find({ userId }).sort({ createdAt: -1 }); // Sorted by latest first

    // Prepare response
    res.status(200).json({
      success: true,
      message: 'Wallet details fetched successfully',
      data: {
        walletBalance: wallet ? wallet.redeemedAmount - wallet.withdrawnAmount : 0,
        redeemHistory: redeemHistory.map((entry) => ({
          redeemedAmount: entry.redeemedAmount,
          redeemedHearts: entry.redeemedHearts,
          date: entry.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};




exports.createConversionFactor = async (req, res) => {
  const { coinToDiamond, diamondToRupee } = req.body;

  try {
    // Ensure the payload is structured as expected
    const conversion = new Conversion({
      coinToDiamond,
      diamondToRupee,
    });

    await conversion.save();

    res.status(201).json({
      message: 'Conversion factor created successfully!',
      conversion,
    });
  } catch (error) {
    console.error('Error creating conversion factor:', error);
    res.status(500).json({ message: 'Error creating conversion factor', error });
  }
};



exports.getConversionFactors = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const conversion = await Conversion.findById(id);

      if (!conversion) {
        return res.status(404).json({ message: 'Conversion factor not found' });
      }

      return res.status(200).json({
        message: 'Conversion factor fetched successfully!',
        conversion,
      });
    }

    // Fetch all conversion factors
    const conversions = await Conversion.find();

    res.status(200).json({
      message: 'All conversion factors fetched successfully!',
      conversions,
    });
  } catch (error) {
    console.error('Error fetching conversion factors:', error);
    res.status(500).json({ message: 'Error fetching conversion factors', error });
  }
};


exports.updateConversionFactor = async (req, res) => {
  const { id } = req.params;
  const { coinToDiamond, diamondToRupee } = req.body;

  try {
    const conversion = await Conversion.findByIdAndUpdate(
      id,
      { coinToDiamond, diamondToRupee },
      { new: true }
    );

    if (!conversion) {
      return res.status(404).json({ message: 'Conversion factor not found' });
    }

    res.status(200).json({
      message: 'Conversion factor updated successfully!',
      conversion,
    });
  } catch (error) {
    console.error('Error updating conversion factor:', error);
    res.status(500).json({ message: 'Error updating conversion factor', error });
  }
};


exports.deleteConversionFactor = async (req, res) => {
  const { id } = req.params;

  try {
    const conversion = await Conversion.findByIdAndDelete(id);

    if (!conversion) {
      return res.status(404).json({ message: 'Conversion factor not found' });
    }

    res.status(200).json({
      message: 'Conversion factor deleted successfully!',
      conversion,
    });
  } catch (error) {
    console.error('Error deleting conversion factor:', error);
    res.status(500).json({ message: 'Error deleting conversion factor', error });
  }
};



// Add a new notification
exports.addNotification = async (req, res) => {
  try {
    const { title, description } = req.body;
//    const image = req.file?.path; // Assuming image is uploaded via multer or a similar library

   let avatarPath = '';

        // Handle avatar image upload
        if (req.files && req.files.image) {
            const image = req.files.image;
console.log("image----",image);
            const name = 'avatar';
            const finalName = name.replace(/\s+/g, '_');
            const desImageDir = `${LanguagePath}/${finalName}`;

            if (!fs.existsSync(desImageDir)) {
                fs.mkdirSync(desImageDir, { recursive: true });
            }

            const imageName = image.name.replace(/ /g, '_');
            const originalImagePath = `${desImageDir}/${imageName}`;
            fs.writeFileSync(originalImagePath, image.data);

            const thumbnailDir = `${LanguagePath}/thumbnails`;
            if (!fs.existsSync(thumbnailDir)) {
                fs.mkdirSync(thumbnailDir, { recursive: true });
            }

            const extension = path.extname(image.name).toLowerCase();
            const thumbnailImagePath = `${thumbnailDir}/${path.basename(imageName, extension)}.webp`;
            let pipeline;

            if (extension === '.png' || extension === '.jpg' || extension === '.jpeg') {
                pipeline = sharp(originalImagePath)
                    .resize({ width: 200, height: 200 })
                    .toFormat('webp')
                    .webp({ quality: 80 })
                    .toFile(thumbnailImagePath);
            } else {
                throw new Error('Unsupported file format');
            }
 await pipeline;

            avatarPath = `https://leodatingapp.aindriya.uk/${finalName}/${imageName}`;
        }



    const notification = new notificationModel({ title, image:avatarPath, description });
    await notification.save();
    
    res.status(201).json({
      success: true,
      message: 'Notification added successfully',
      data: notification,
    });
  } catch (error) {
console.log("error--------",error)
    res.status(500).json({
      success: false,
      message: 'Failed to add notification',
      error: error.message,
    });
  }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
      error: error.message,
    });
  }
};

exports.updateNotification = async (req, res) => {
  const { id } = req.params; // Notification ID from URL parameters
  const { title, description } = req.body; // Updated fields
  let avatarPath = "";

  try {
    // Find the existing notification
    const notification = await notificationModel.findById(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    // Handle image upload if a new image is provided
    if (req.files && req.files.image) {
      const image = req.files.image;
      console.log("Uploaded image:", image);
      const name = "avatar";
      const finalName = name.replace(/\s+/g, "_");
      const desImageDir = `${LanguagePath}/${finalName}`;

      if (!fs.existsSync(desImageDir)) {
        fs.mkdirSync(desImageDir, { recursive: true });
      }

      const imageName = image.name.replace(/ /g, "_");
      const originalImagePath = `${desImageDir}/${imageName}`;
      fs.writeFileSync(originalImagePath, image.data);

      const thumbnailDir = `${LanguagePath}/thumbnails`;
      if (!fs.existsSync(thumbnailDir)) {
        fs.mkdirSync(thumbnailDir, { recursive: true });
      }

      const extension = path.extname(image.name).toLowerCase();
      const thumbnailImagePath = `${thumbnailDir}/${path.basename(imageName, extension)}.webp`;
      let pipeline;

      if (extension === ".png" || extension === ".jpg" || extension === ".jpeg") {
        pipeline = sharp(originalImagePath)
          .resize({ width: 200, height: 200 })
          .toFormat("webp")
          .webp({ quality: 80 })
          .toFile(thumbnailImagePath);
      } else {
        throw new Error("Unsupported file format");
      }

      await pipeline;

      // Set the new image path
      avatarPath = `https://leodatingapp.aindriya.uk/${finalName}/${imageName}`;
    }

    // Update the notification fields
    notification.title = title || notification.title;
    notification.description = description || notification.description;
    notification.image = avatarPath || notification.image;

    // Save the updated notification
    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification updated successfully",
      data: notification,
    });
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update notification",
      error: error.message,
    });
  }
};

exports.getNotificationById = async (req, res) => {
  const {id} = req.params; // Get the notification ID from request params

  try {
    // Fetch the notification by ID
    const notification = await notificationModel.findById(id);

    // Check if the notification exists
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notification",
      error: error.message,
    });
  }
};

exports.sendNotification = async (req, res) => {
  const { notificationId } = req.body;

  try {
    // Fetch the notification from the database
    const notification = await notificationModel.findById(notificationId);

    if (!notification) {
      console.error("Notification not found for ID:", notificationId);
      return res.status(400).json({
        success: false,
        message: "Notification not found",
      });
    }

    console.log("Notification fetched successfully:", notification);

    // Fetch all unique FCM tokens from the UserFcmToken collection
    const userTokens = await UserFcmToken.find({}).select("fcmToken");

    if (userTokens.length === 0) {
      console.warn("No FCM tokens found in the database.");
      return res.status(404).json({
        success: false,
        message: "No FCM tokens found",
      });
    }

    console.log("Fetched FCM tokens:", userTokens);

    // Extract unique tokens
    const uniqueTokens = [...new Set(userTokens.map((tokenEntry) => tokenEntry.fcmToken))];
console.log("uniqueTokens--------",uniqueTokens);
    // Prepare the message template
    const messageTemplate = {
      notification: {
        title: notification.title,
        body: notification.description,
        image: notification.image,
      },
    };

    let successCount = 0;
    let failureCount = 0;

    // Send notifications one by one
    for (const token of uniqueTokens) {
console.log("token--------",token)
      try {
        const message = { ...messageTemplate, token };
       /* const response = await admin.messaging().send(message);

        if (response.success) {
          successCount++;
        } else {
          failureCount++;
          console.error(`Error for token ${token}:`, response.error);
        }
*/
try {
  const response = await admin.messaging().send(message);
  console.log(`Notification sent successfully to token: ${token}`);
} catch (error) {
  console.error(`Error for token ${token}:`, JSON.stringify(error, null, 2));
  failureCount++;
}

      } catch (error) {
        console.error(`Error sending notification to token ${token}:`, error);
        failureCount++;
      }
    }

    console.log("Total notifications sent:", { successCount, failureCount });

    return res.status(200).json({
      success: true,
      message: "Notifications processed successfully",
      successCount,
      failureCount,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send notification",
      error: error.message,
    });
  }
};

exports.callhistory = async (req, res) => {
    try {
        const userId = req.params.id;

        // Fetch call history from CoinTransactionHistory where userId matches and spendingType is 'call'
        const callHistory = await CoinTransactionHistory.find({ userId })
            .populate('userId', 'username profile.image')  // Populate the user's username and profile image
            .populate('fromUserId', 'username profile.image') // Populate fromUserId's username and profile image
            .populate('toUserId', 'username profile.image')   // Populate toUserId's username and profile image
            .sort({ timestamp: -1 });  // Sort by timestamp to get the latest call history

        if (!callHistory.length) {
            return res.status(404).json({ message: 'No call history found for this user' });
        }

        // Add the 'type' field and return the data
        const formattedHistory = callHistory.map(item => ({
            ...item.toObject(),
            type: item.type, // Include 'type' directly
        }));

        // Return the call history with populated user data and type field
        return res.json(formattedHistory);
    } catch (error) {
        console.error('Error fetching call history:', error);
        res.status(500).json({ message: 'Error fetching call history', error });
    }
};


exports.getCoinPackagePurchases = async (req, res) => {
  const { filter, startDate, endDate, page = 1, limit = 10 } = req.query; // Default values for pagination

  try {
    // Initialize the filter object
    let dateFilter = {};

    // Apply filters based on the `filter` query parameter
    if (filter === "week") {
      const startOfWeek = moment().startOf("isoWeek").toDate();
      const endOfWeek = moment().endOf("isoWeek").toDate();
      dateFilter = { createdAt: { $gte: startOfWeek, $lte: endOfWeek } };
    } else if (filter === "lastMonth") {
      const startOfLastMonth = moment().subtract(1, "month").startOf("month").toDate();
      const endOfLastMonth = moment().subtract(1, "month").endOf("month").toDate();
      dateFilter = { createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } };
    } else if (filter === "custom" && startDate && endDate) {
      dateFilter = {
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      };
    }

    // Pagination logic
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const shouldPaginate = pageSize > 0;

    // Query the database
    const query = Transaction.find(dateFilter)
      .populate("userId", "username phone profile.image") // Adjust based on the relationship
      .sort({ createdAt: -1 }); // Sort by latest transactions

    // Apply pagination if required
    if (shouldPaginate) {
      query.skip((pageNumber - 1) * pageSize).limit(pageSize);
    }

    // Execute the query
    const transactions = await query;

    // Calculate the total amount
    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    // Total count of transactions
    const totalTransactions = await Transaction.countDocuments(dateFilter);

    // Prepare the response
    const response = {
      message: "Coin package purchase details fetched successfully",
      totalAmount,
      totalExpense:0,
      totalProfit:0,
      totalTransactions,
      transactions,
    };

    // Add pagination metadata if pagination is applied
    if (shouldPaginate) {
      response.currentPage = pageNumber;
      response.totalPages = Math.ceil(totalTransactions / pageSize);
    }

    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching coin package purchases:", err);
    res.status(500).json({ error: "An error occurred while fetching purchase details" });
  }
};


exports.getRevenueDetails = async (req, res) => {
  const { startDate, endDate } = req.query; // Only use startDate and endDate

  try {
    // Initialize the date filter object
    let dateFilter = {};

    // Apply a custom date filter if provided
    if (startDate && endDate) {
      dateFilter = {
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      };
    }

    // Query the database to fetch transactions based on the date filter
    const transactions = await Transaction.find(dateFilter).sort({ createdAt: -1 }); // Sort by latest transactions

    // Calculate revenue details
    const totalRevenue = transactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
    const totalTransactions = transactions.length;

    // Prepare the response with defaults if no data
    const response = {
      message: "Revenue details fetched successfully",
      totalRevenue: transactions.length > 0 ? totalRevenue : 0,
      totalTransactions: transactions.length > 0 ? totalTransactions : 0,
      totalExpense: 0, // Default 0 as required
      totalProfit: 0, // Default 0 as required
      transactions: transactions.length > 0 ? transactions : [], // Ensure empty array if no data
    };

    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching revenue details:", err);
    res.status(500).json({ error: "An error occurred while fetching revenue details" });
  }
};


exports.createReportReason = async (req, res) => {
  try {
    const { reason } = req.body;

    const newReportReason = new ReportReason({ reason});
    const savedReason = await newReportReason.save();

    res.status(201).json({ message: 'Report reason created successfully', data: savedReason });
  } catch (error) {
    res.status(500).json({ message: 'Error creating report reason', error: error.message });
  }
};

exports.getAllReportReasons = async (req, res) => {
  try {
    const reportReasons = await ReportReason.find();
    res.status(200).json({ message: 'Report reasons fetched successfully', data: reportReasons });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report reasons', error: error.message });
  }
};



exports.getReportReasonById = async (req, res) => {
  try {
    const id = req.params.id;

    const reportReason = await ReportReason.findById(id);

    if (!reportReason) {
      return res.status(404).json({ message: 'Report reason not found' });
    }

    res.status(200).json({ message: 'Report reason fetched successfully', data: reportReason });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report reason', error: error.message });
  }
};


exports.updateReportReason = async (req, res) => {
  try {
    const id = req.params.id; // Ensure `id` is extracted correctly
    const updates = req.body; // Get the fields to update from the request body

    // Add updatedAt timestamp
    updates.updatedAt = Date.now();

    const updatedReason = await ReportReason.findByIdAndUpdate(
      id,
      { $set: updates }, // Dynamically update only the provided fields
      { new: true } // Return the updated document
    );

    if (!updatedReason) {
      return res.status(404).json({ message: 'Report reason not found' });
    }

    res.status(200).json({ message: 'Report reason updated successfully', data: updatedReason });
  } catch (error) {
    res.status(500).json({ message: 'Error updating report reason', error: error.message });
  }
};


exports.deleteReportReason = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedReason = await ReportReason.findByIdAndDelete(id);

    if (!deletedReason) {
      return res.status(404).json({ message: 'Report reason not found' });
    }

    res.status(200).json({ message: 'Report reason deleted successfully', data: deletedReason });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting report reason', error: error.message });
  }
};


exports.reportUser = async (req, res) => {
  try {
    const { reporterId, reportedUserId, reason} = req.body;

    // Validation: Ensure all necessary fields are provided
    if (!reporterId || !reportedUserId || !reason) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    // Validate that both users exist
    const reporter = await User.findById(reporterId);
    const reportedUser = await User.findById(reportedUserId);
    if (!reporter || !reportedUser) {
      return res.status(404).json({ message: 'One or both users do not exist.' });
    }


    // Create the report
    const report = new Report({
      reporterId,
      reportedUserId,
      reason,
//      description,
    });

    await report.save();

    res.status(201).json({ message: 'User reported successfully', data: report });
  } catch (error) {
    console.error('Error reporting user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


exports.getOwnReportList = async (req, res) => {
  try {
    const reportedUserId = req.params.id;

    // Validate that reportedUserId is provided
    if (!reportedUserId) {
      return res.status(400).json({ message: 'Reported User ID is required.' });
    }

    // Fetch the reports for the reported user
    const reports = await Report.find({ reportedUserId });

    // Check if there are any reports for the user
    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: 'No reports found for this user.' });
    }

    // Get the count of reports for the reported user
    const reportCount = reports.length;

    // Get the reasons for the reports
    const reportReasons = reports.map(report => report.reason);

    // Send the response with the report list and count
    res.status(200).json({
      reportedUserId,
      reportCount,
      reportReasons,
      reports, // Include full report details if needed
    });
  } catch (error) {
    console.error('Error fetching report list:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


exports.getAllUserReports = async (req, res) => {
  try {
    const userReports = await Report.aggregate([
      {
        $lookup: {
          from: 'users', // Join with the users collection
          localField: 'reportedUserId', // Match reportedUserId in reports
          foreignField: '_id', // Match _id in users
          as: 'reportedUserDetails', // Result field for the joined data
        },
      },
      {
        $unwind: '$reportedUserDetails', // Flatten the array of reportedUserDetails
      },
      {
        $group: {
          _id: '$reportedUserId', // Group by reportedUserId
          reports: { $push: '$$ROOT' }, // Push all report data for this reportedUserId
          warning: { $sum: 1 }, // Count the number of reports for this user
        },
      },
      {
        $unwind: '$reports', // Flatten the reports array for detailed info
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: ['$reports', { warning: '$warning' }] } }, // Merge grouped data with report details
      },
      {
        $project: {
          reporterId: 1, // Include reporterId
          reportedUserId: 1, // Include reportedUserId
          reason: 1, // Include reason
          createdAt: 1, // Include createdAt
          username: '$reportedUserDetails.username', // Include reported user's username
          phoneNumber: '$reportedUserDetails.mobileNumber', // Include reported user's phone number
          profileImage: '$reportedUserDetails.profile.image', // Include reported user's profile image
          warning: 1, // Include the warning count
        },
      },
    ]);

    return res.status(200).json({
      userReports: userReports,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error fetching user reports',
    });
  }
};


const razorpay = new Razorpay({
  key_id: 'rzp_live_iJCaB0VTRG92tH',
  key_secret: 'ISWuW0SSDNOIZKNXS8YZihY1',
});

exports.makeOrder = async(req,res)=>{
const { amount, currency, receipt } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: currency || 'INR',
      receipt: receipt || 'receipt#1',
    });

    return res.status(200).json({
      success: true,
      orderId: order.id,
      key_id: razorpay.key_id,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message,
    });
  }

}
