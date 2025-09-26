# 🧪 Testing Checklist - React Native Assignment

## **Quick Testing Guide for All Features**

### **📱 Setup & Installation**

```bash
# 1. Install dependencies
npm install

# 2. Start the app
npm start

# 3. Choose your platform
# Press 'a' for Android
# Press 'i' for iOS
# Press 'w' for Web
```

---

## **✅ Feature Testing Checklist**

### **1. Optimized Large List (5,000 Products)**

- [ ] **Open app** → Should see Products screen by default
- [ ] **Scroll down** → Should see smooth scrolling with 5,000 products
- [ ] **Pull to refresh** → Should show loading indicator
- [ ] **Add items to cart** → Should see toast notifications
- [ ] **Check cart badge** → Should show item count

### **2. Global State Management (Cart System)**

- [ ] **Add products to cart** → Click "Add to Cart" on multiple products
- [ ] **Go to Cart screen** → Click "Go to Cart" button
- [ ] **Modify quantities** → Use +/- buttons to change quantities
- [ ] **Remove items** → Click "Remove" button on items
- [ ] **Clear cart** → Click "Clear Cart" button
- [ ] **Check totals** → Verify total calculations are correct

### **3. Offline Support Testing**

#### **Step 1: Load Data Online**

- [ ] **Go to Users screen** → Click "Users" button
- [ ] **Wait for loading** → Should see users load from API
- [ ] **Verify online mode** → No offline indicators should appear

#### **Step 2: Test Offline Mode**

- [ ] **Turn off internet** → Disable WiFi/mobile data
- [ ] **Go back to Users** → Should show "📱 Offline Mode - Showing Cached Data"
- [ ] **Click on any user** → Should open user details with offline indicator
- [ ] **Check offline indicator** → Should show "📱 Offline Mode - Showing Cached Data"
- [ ] **Try refresh button** → Click "🔄 Try Refresh" (should fail gracefully)

#### **Step 3: Test Online Recovery**

- [ ] **Turn internet back on** → Re-enable WiFi/mobile data
- [ ] **Click refresh button** → Should fetch fresh data
- [ ] **Verify online mode** → Offline indicators should disappear

### **4. Secure Token Storage**

- [ ] **Go to Secure Token screen** → Click "Secure Token" button
- [ ] **Save token** → Click "💾 Save Token"
- [ ] **Verify token saved** → Should show "Active" status
- [ ] **Restart app** → Close and reopen the app
- [ ] **Check token persistence** → Token should still be there
- [ ] **Delete token** → Click "🗑️ Delete Token"
- [ ] **Verify deletion** → Should show "Inactive" status

### **5. Deep Linking Testing**

#### **Method 1: Expo CLI**

```bash
# Start the app
npm start

# In the terminal, press 'd' to open developer menu
# Select "Open URL" and enter: myapp://user/1
```

#### **Method 2: Browser (if on device)**

- [ ] **Open browser** → Navigate to `myapp://user/1`
- [ ] **Verify deep link** → Should open User Detail screen with user ID 1

#### **Method 3: Navigation Testing**

- [ ] **Go to Users screen** → Click on any user
- [ ] **Verify navigation** → Should open user details
- [ ] **Check parameters** → User data should be passed correctly

### **6. Native Module (Device Info)**

- [ ] **Go to Device Info screen** → Click "Device Info" button
- [ ] **View device information** → Should show platform, OS version, etc.
- [ ] **Test refresh** → Click "🔄 Refresh Device Info"
- [ ] **Verify platform detection** → Should show correct platform (iOS/Android)

---

## **🔧 Advanced Testing Scenarios**

### **Performance Testing**

- [ ] **Scroll rapidly** → Should maintain smooth performance
- [ ] **Memory usage** → Check device memory doesn't spike
- [ ] **Battery usage** → Should be optimized

### **Error Handling Testing**

- [ ] **Network errors** → Test with poor/no internet
- [ ] **API failures** → Test with invalid endpoints
- [ ] **Storage errors** → Test with full storage

### **Cross-Platform Testing**

- [ ] **iOS testing** → Test on iOS simulator/device
- [ ] **Android testing** → Test on Android emulator/device
- [ ] **Web testing** → Test on web browser

---

## **📊 Expected Results**

### **Performance Metrics**

- ✅ Smooth scrolling through 5,000 items
- ✅ Fast app startup (< 3 seconds)
- ✅ Low memory usage (< 100MB)
- ✅ Responsive UI interactions

### **Offline Functionality**

- ✅ Cached data loads instantly
- ✅ Offline indicators appear correctly
- ✅ Graceful error handling
- ✅ Online recovery works seamlessly

### **State Management**

- ✅ Cart state persists across app restarts
- ✅ Real-time UI updates
- ✅ Proper state synchronization
- ✅ Error recovery mechanisms

### **Security Features**

- ✅ Tokens encrypted in SecureStore
- ✅ Secure data persistence
- ✅ Proper access controls
- ✅ Data integrity maintained

---

## **🐛 Common Issues & Solutions**

### **Issue: App won't start**

```bash
# Solution: Clear cache and reinstall
npm start -- --clear
# or
npx expo start --clear
```

### **Issue: Offline mode not working**

- Check if NetInfo is properly installed
- Verify AsyncStorage permissions
- Test with actual device (not simulator)

### **Issue: Deep linking not working**

- Check URL scheme in app.json
- Test with actual device
- Verify navigation configuration

### **Issue: Performance issues**

- Check device memory
- Test with smaller datasets
- Verify FlatList optimizations

---

## **📱 Demo Video Script**

### **For Assignment Submission:**

1. **Introduction** (30 seconds)

   - Show app startup
   - Navigate through main screens
   - Explain the assignment requirements

2. **Performance Demo** (1 minute)

   - Show 5,000 product list
   - Demonstrate smooth scrolling
   - Add items to cart with toast notifications

3. **Offline Demo** (2 minutes)

   - Load users online
   - Turn off internet
   - Show offline indicators
   - Demonstrate cached data usage
   - Show online recovery

4. **State Management Demo** (1 minute)

   - Show cart functionality
   - Demonstrate state persistence
   - Show real-time updates

5. **Security Demo** (1 minute)

   - Show secure token storage
   - Demonstrate persistence
   - Show encryption features

6. **Deep Linking Demo** (30 seconds)

   - Show deep link functionality
   - Demonstrate parameter passing

7. **Native Module Demo** (30 seconds)
   - Show device information
   - Demonstrate platform detection

**Total Video Length: ~6-7 minutes**

---

## **✅ Final Checklist Before Submission**

- [ ] All features working correctly
- [ ] Performance optimizations implemented
- [ ] Offline support fully functional
- [ ] Security features working
- [ ] Deep linking operational
- [ ] Code is clean and documented
- [ ] Demo video recorded
- [ ] Git repository with commit history
- [ ] Assignment requirements met

**🎉 Ready for submission!**
