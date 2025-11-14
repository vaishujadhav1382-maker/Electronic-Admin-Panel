# Firebase Setup Guide

## Prerequisites
- Firebase project created at https://console.firebase.google.com
- Firestore database enabled in your Firebase project

## Configuration Steps

### 1. Get Firebase Configuration
1. Go to your Firebase Console
2. Click on Project Settings (gear icon)
3. Scroll down to "Your apps" section
4. Click on the web app icon `</>`
5. Copy the `firebaseConfig` object

### 2. Update create-hierarchy.js
Replace the placeholder config in `create-hierarchy.js` with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
};
```

### 3. Run the Script
```bash
node create-hierarchy.js
```

## What This Script Creates

### Collections Structure:
```
collections/main/
├── employees/
│   ├── emp001/
│   │   ├── name, mobile, email, password, role
│   │   └── employeeDetails/
│   │       ├── personal/ (personal info, login credentials, permissions)
│   │       └── work/ (work info, performance data)
│   ├── emp002/
│   └── emp003/
└── products/
    └── companies/
        ├── lg/
        │   ├── companyName, country, established
        │   └── categories/
        │       ├── television/
        │       │   └── subcategories/
        │       │       ├── led-tv/
        │       │       │   └── products/
        │       │       │       └── lg-32lm563bptc/
        │       │       └── oled-tv/
        │       └── refrigerator/
        ├── samsung/
        ├── whirlpool/
        └── godrej/
```

## Sample Data Included
- **3 Employees**: 2 regular employees + 1 manager
- **4 Companies**: LG, Samsung, Whirlpool, Godrej
- **Multiple Categories**: TV, Mobile, Refrigerator, AC, etc.
- **Sample Products**: Real product examples with specifications

## Error Troubleshooting

### "db.collection is not a function"
- Make sure you've updated the Firebase config with your actual project details
- Ensure Firebase is properly installed: `npm install firebase`

### "Permission denied"
- Check Firestore security rules
- For testing, you can temporarily use: `allow read, write: if true;`

### "Project not found"
- Verify your `projectId` in the config matches your Firebase project
