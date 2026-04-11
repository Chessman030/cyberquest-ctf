# Testing Instructions

## Manual Testing Guide

### 1. Setup and Start
```bash
npm install
npm run dev
```
Open http://localhost:3000

### 2. User Registration Test
1. Click "Sign Up" tab
2. Fill in:
   - Name: Test User
   - Email: test@example.com 
   - Password: testpass123
3. Click "Create Account"
4. Should show success message and switch to login

### 3. User Login Test
1. Click "Login" tab
2. Use credentials from step 2
3. Should redirect to event page
4. Should see "Welcome to ISTE Capture The Flag"

### 4. Competition Flow Test
1. Click "Enter the Event"
2. Should see competition page with:
   - Timer showing 2:00:00
   - Question navigation sidebar (3 questions)
   - Question 1 content area
   - Answer textarea
   - Save/Clear/Submit buttons

### 5. Question Navigation Test
1. Click through Question 1, 2, 3 in sidebar
2. Each should show "What is your name?"
3. Type different answers in each
4. Verify navigation preserves answers

### 6. Save Functionality Test
1. Type answer "raghav" in Question 1
2. Click "Save" button
3. Should show "Saving..." then "Save"
4. Navigate to Question 2, then back to 1
5. Answer should still be there

### 7. Cheat Detection Test
1. Start competition
2. Switch to another tab/application
3. Come back to competition
4. Tab switches counter should increase
5. Check sidebar shows "Tab switches: 1"

### 8. Submit Test
1. Answer all 3 questions with "raghav"
2. Submit button should be enabled
3. Click "Submit Exam"
4. Confirm submission
5. Should redirect to results page
6. Should show score 3/3

### 9. Results Page Test
1. Should display:
   - Score: 3/3
   - Time taken
   - Tab switches count
   - Performance message
   - "Perfect! Excellent work!" if no tab switches

### 10. Admin Login Test
1. Go back to home page
2. Click "Admin" tab
3. Login with:
   - Email: rssstar07@gmail.com
   - Password: ravi071011
4. Should redirect to admin dashboard

### 11. Admin Dashboard Test
1. Should see "Admin Dashboard"
2. Should show "Total Submissions: 1"
3. Scoreboard tab should show:
   - Rank #1 with gold medal
   - Test User entry
   - Score 3/3
   - Time taken
   - Tab switches

### 12. Detailed View Test
1. Click "Detailed View" tab
2. Should show:
   - User name and email
   - Score badge
   - Time details
   - All answers with correct/incorrect status
   - Started/submitted timestamps

### 13. Multiple User Test
1. Logout from admin
2. Try to register with same email (test@example.com)
3. Should show "Email already registered"
4. Try to login with test@example.com again
5. Should show "You have already attempted the exam"

### 14. Timer Test
1. Register new user
2. Start competition
3. Wait for timer to count down
4. Verify timer shows correctly
5. (Optional) Modify timer to 10 seconds to test auto-submit

## Automated Test Cases

### API Endpoint Tests

#### Authentication Tests
```bash
# Test signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"API Test","email":"api@test.com","password":"test123"}'

# Test login  
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"api@test.com","password":"test123"}'

# Test admin login
curl -X POST http://localhost:3000/api/auth/admin \
  -H "Content-Type: application/json" \
  -d '{"email":"rssstar07@gmail.com","password":"ravi071011"}'
```

#### Submission Tests
```bash
# Test submission (after getting user token)
curl -X POST http://localhost:3000/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"user_id_here",
    "answers":{"1":"raghav","2":"raghav","3":"raghav"},
    "totalTime":1200,
    "tabSwitches":0,
    "submittedAt":"2026-03-05T10:00:00Z",
    "startedAt":"2026-03-05T09:40:00Z"
  }'

# Test get submissions
curl http://localhost:3000/api/submissions
```

## Error Cases to Test

### 1. Invalid Credentials
- Wrong email/password combinations
- Empty fields
- Invalid email format

### 2. Duplicate Registration
- Same email twice
- Multiple attempts from same user

### 3. Incomplete Submissions
- Try to submit with unanswered questions
- Submit without starting competition

### 4. Network Issues
- Disconnect internet during submission
- Slow network simulation

### 5. Browser Compatibility
- Test in Chrome, Firefox, Safari, Edge
- Test mobile devices
- Test with JavaScript disabled

## Performance Tests

### 1. Load Testing
- Multiple users simultaneously
- Rapid question navigation
- Frequent save operations

### 2. Memory Usage
- Long competition sessions
- Multiple tab switches
- Large answer texts

### 3. Mobile Performance
- Touch navigation
- Screen rotation
- Background app switching

## Security Tests

### 1. XSS Prevention
- Try script tags in answers
- HTML injection in user inputs
- URL parameter manipulation

### 2. Authentication Bypass
- Direct URL access without login
- Token manipulation
- Admin route access without admin token

### 3. Data Validation
- SQL injection attempts (even with JSON storage)
- Malformed JSON submissions
- Oversized payloads

## Expected Results

### Success Criteria
✅ All user flows work without errors
✅ Admin dashboard shows correct data
✅ Cheat detection functions properly
✅ Timer works accurately
✅ Score calculation is correct
✅ Single attempt enforcement works
✅ Data persists correctly

### Performance Criteria
✅ Page loads under 2 seconds
✅ Smooth navigation between questions
✅ Real-time timer updates
✅ Responsive design on mobile

### Security Criteria
✅ No unauthorized access
✅ Password protection works
✅ Input validation prevents attacks
✅ Cheat detection is accurate