# ISTE Capture The Flag Competition Platform

A comprehensive web application for hosting programming competitions with user authentication, cheat detection, and admin dashboard.

## Features

### User Features
- **User Registration & Login**: Secure authentication with password hashing
- **Single Attempt Policy**: Only the first attempt from each email is counted
- **Competition Interface**: 
  - 2-hour timer with automatic submission
  - 3 questions with scrollable content
  - Question navigation sidebar
  - Auto-save functionality
  - Clear and submit buttons
- **Cheat Detection**: Page Visibility API to monitor tab switching
- **Results Page**: Shows score, time taken, and performance metrics

### Admin Features
- **Admin Dashboard**: 
  - Dedicated admin login (rssstar07@gmail.com / ravi071011)
  - Scoreboard with ranking (score priority, then time)
  - Detailed submission view with answers
  - Cheat detection monitoring
- **Real-time Data**: View all submissions and user statistics

### Technical Features
- **Next.js 14**: App router with TypeScript
- **Tailwind CSS**: Responsive design
- **JSON Database**: File-based storage for local testing
- **Password Security**: bcryptjs for password hashing
- **Session Management**: Token-based authentication
- **Production Ready**: Structured for Vercel deployment

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Deployment

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

3. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

## Usage Guide

### For Students
1. **Register**: Create account with name, email, and password
2. **Login**: Use your credentials to access the platform
3. **Enter Event**: Click "Enter the Event" to start competition
4. **Complete Competition**:
   - Answer all 3 questions
   - Use sidebar to navigate between questions
   - Save answers frequently
   - Submit when all questions are completed

### For Admin
1. **Admin Login**: Use admin credentials on the main page
2. **View Scoreboard**: See ranked results by score and time
3. **Detailed View**: Check individual submissions and answers
4. **Monitor Cheating**: View tab switch counts for each participant

## Competition Rules

- **Time Limit**: 2 hours maximum
- **Questions**: 3 questions total (currently: "What is your name?" → "raghav")
- **Submission**: All questions must be answered to submit
- **Single Attempt**: Only one attempt per email address
- **Cheat Detection**: Tab switching is monitored and recorded
- **Scoring**: 1 point per correct answer (max 3 points)
- **Ranking**: Higher score wins, ties broken by faster completion time

## File Structure

```
src/
├── app/
│   ├── admin/           # Admin dashboard
│   ├── api/
│   │   ├── auth/        # Authentication endpoints
│   │   └── submissions/ # Submission handling
│   ├── competition/     # Main competition interface
│   ├── event/          # Event entry page
│   ├── results/        # Results display
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Login/signup page
└── lib/
    └── database.ts     # Database utilities
```

## Database Schema

### Users
```json
{
  "id": "string",
  "name": "string", 
  "email": "string",
  "password": "hashed_string",
  "isAdmin": "boolean",
  "hasAttempted": "boolean",
  "createdAt": "ISO_string"
}
```

### Submissions
```json
{
  "id": "string",
  "userId": "string",
  "userName": "string", 
  "userEmail": "string",
  "answers": "object",
  "score": "number",
  "totalTime": "number",
  "cheatScore": "number", 
  "tabSwitches": "number",
  "submittedAt": "ISO_string",
  "startedAt": "ISO_string"
}
```

## Admin Credentials

- **Email**: rssstar07@gmail.com
- **Password**: ravi071011
- **Name**: raghav

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **Single Attempt**: Database enforcement 
- **Cheat Detection**: Page Visibility API monitoring
- **Input Validation**: Server-side validation for all inputs
- **XSS Prevention**: React's built-in protection
- **CSRF Protection**: Token-based authentication

## Performance Optimizations

- **Client-side State**: Efficient React state management
- **Auto-save**: Periodic answer saving to localStorage
- **Responsive Design**: Mobile-friendly interface
- **Code Splitting**: Next.js automatic optimization
- **Image Optimization**: Next.js Image component

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   npx kill-port 3000
   # or use different port
   npm run dev -- -p 3001
   ```

2. **Data persistence issues**
   - Check if `data/` directory exists
   - Verify file permissions
   - Clear localStorage if needed

3. **Build errors**
   ```bash
   # Clear cache and reinstall
   rm -rf .next node_modules
   npm install
   npm run build
   ```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or questions:
- Create GitHub issue
- Contact: support@iste-competition.com

---

**Note**: This platform is designed for educational purposes and local testing. For production use with large-scale competitions, consider implementing a proper database (PostgreSQL/MongoDB) and enhanced security measures.
code for capture the flag in hackathon based on cybersecurity
