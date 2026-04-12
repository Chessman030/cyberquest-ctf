export interface Question {
  id: number
  type: 'mcq' | 'text'
  text: string
  options?: string[] // For MCQ questions
  answer: string // Correct answer for grading
}

export const questions: Question[] = [
  // Inspect Challenges (Text Input) - Questions 1-10
  {
    id: 1,
    type: 'text',
    text: 'There is a flag floating in the empty space of this page. It has no color, no size, and takes up zero pixels. Find it.',
    answer: 'CyberQuest{d15pl4y_n0n3_15_n0t_53cur3}'
  },
  {
    id: 2,
    type: 'text',
    text: 'The frontend developer left a note for the backend team about a temporary master password, but they thought they deleted it before pushing to production. Did they?',
    answer: 'CyberQuest{c0mm3nt5_l34k_d4t4}'
  },
  {
    id: 3,
    type: 'text',
    text: 'This page has a highly secure \'Download Flag\' button. It is currently locked and unclickable because your account lacks admin privileges. Break the lock.',
    answer: 'CyberQuest{cl13nt_51d3_rul35_4r3_l135}'
  },
  {
    id: 4,
    type: 'text',
    text: 'Your session token seems a bit unusually long. I wonder what the server is storing in there to remember who you are?',
    answer: 'CyberQuest{c00k135_4r3_pl41nt3xt}'
  },
  {
    id: 5,
    type: 'text',
    text: 'Modern browsers are great at remembering things locally so servers don\'t have to work as hard. The developer stored an API key offline to save bandwidth.',
    answer: 'CyberQuest{l0c4l_5t0r4g3_n3v3r_f0rg3t5}'
  },
  {
    id: 6,
    type: 'text',
    text: 'Every time you refresh this specific challenge page, the server responds. But it\'s not just sending back HTML; it\'s whispering a secret directly to your browser\'s metadata.',
    answer: 'CyberQuest{h34d3r5_c4nn0t_b3_h1dd3n}'
  },
  {
    id: 7,
    type: 'text',
    text: 'A decryption module has been loaded into the browser\'s global memory, but the UI button to trigger it was accidentally deleted. You\'ll have to call the function manually.',
    answer: 'CyberQuest{g00d_0ld_c0n50l3_h4ck1ng}'
  },
  {
    id: 8,
    type: 'text',
    text: 'The profile picture on this page failed to load. The browser thinks it\'s a broken image, but the network traffic tells a different story.',
    answer: 'CyberQuest{m1m3_typ3_m15m4tch}'
  },
  {
    id: 9,
    type: 'text',
    text: 'The flag is right here on the screen, but you can\'t highlight it with your mouse, and you can\'t copy-paste it. CSS pseudo-elements are playing tricks on you.',
    answer: 'CyberQuest{c55_b3f0r3_4nd_4ft3r}'
  },
  {
    id: 10,
    type: 'text',
    text: 'Look deep into the bundled JavaScript files that make this React app run. Sometimes, variables are initialized but never actually rendered to the screen.',
    answer: 'CyberQuest{50urc3_m4p5_r3v34l_4ll}'
  },
  // Logic & Analysis Challenges (MCQ) - Questions 11-20
  {
    id: 11,
    type: 'mcq',
    text: 'A user receives an urgent email and clicks a link that reads: https://secure-login.amazon.com-update.net/auth. What exact root domain is this URL actually sending the user to?',
    options: ['amazon.com', 'secure-login.amazon.com', 'com-update.net', 'amazon.com-update.net'],
    answer: 'com-update.net'
  },
  {
    id: 12,
    type: 'mcq',
    text: 'You dump a database and find that the CEO and the Intern have the exact same MD5 password hash: 5f4dcc3b5aa765d61d8327deb882cf99. What critical security control did the database administrator fail to implement before hashing the passwords?',
    options: ['Encryption', 'Salting', 'Multi-Factor Authentication', 'Base64 Encoding'],
    answer: 'Salting'
  },
  {
    id: 13,
    type: 'mcq',
    text: 'A developer accidentally types their secret API key into their code and runs git commit. They immediately realize their mistake, delete the key from the code, and run git commit again before pushing to GitHub. Where can an attacker still find the deleted API key?',
    options: ['In the .env.local file', 'In the browser\'s LocalStorage', 'In the Git commit history', 'The key is permanently deleted and safe'],
    answer: 'In the Git commit history'
  },
  {
    id: 14,
    type: 'mcq',
    text: 'A password reset token is generated using this logic: token = MD5(username + current_time). If an attacker wants to generate a valid reset token for the Admin account, what exact two pieces of data do they need?',
    options: ['The admin\'s password and email', 'The admin\'s username and the exact time of the request', 'The server\'s IP address and a secret key', 'The database name and the admin\'s username'],
    answer: 'The admin\'s username and the exact time of the request'
  },
  {
    id: 15,
    type: 'mcq',
    text: 'An attacker dressed as a delivery driver waits by a secure office door with a heavy box. An employee swipes their ID badge to unlock the door and politely holds it open for the "driver," unknowingly letting the attacker inside. What is this physical hacking technique called?',
    options: ['Phishing', 'Tailgating (or Piggybacking)', 'Spoofing', 'Man-in-the-Middle'],
    answer: 'Tailgating (or Piggybacking)'
  },
  {
    id: 16,
    type: 'mcq',
    text: 'A user types <script>alert(\'Hacked!\')</script> into a website\'s comment section. When other users visit the page, their browsers execute the script and display a pop-up box. What is the specific name of this vulnerability?',
    options: ['SQL Injection (SQLi)', 'Cross-Site Scripting (XSS)', 'Denial of Service (DoS)', 'Server-Side Request Forgery (SSRF)'],
    answer: 'Cross-Site Scripting (XSS)'
  },
  {
    id: 17,
    type: 'mcq',
    text: 'A hacker finds a login page. Instead of typing a real username, they type \' OR 1=1 --. The database evaluates this math as "True" and logs them in as the first user in the database (usually the Admin). What type of attack is this?',
    options: ['SQL Injection (SQLi)', 'Cross-Site Scripting (XSS)', 'Brute Force Attack', 'Session Hijacking'],
    answer: 'SQL Injection (SQLi)'
  },
  {
    id: 18,
    type: 'mcq',
    text: 'A company wants to secure its remote workforce. They require employees to log in using a strong password (something they know) AND a rolling 6-digit code from an app on their phone (something they have). What is the industry term for this?',
    options: ['End-to-End Encryption (E2EE)', 'Virtual Private Network (VPN)', 'Multi-Factor Authentication (MFA)', 'Single Sign-On (SSO)'],
    answer: 'Multi-Factor Authentication (MFA)'
  },
  {
    id: 19,
    type: 'mcq',
    text: 'You plug a brand new smart security camera into your Wi-Fi. Within an hour, a botnet takes control of it because the login was still set to username: admin, password: admin. What security best practice was violated?',
    options: ['Failure to encrypt the Wi-Fi', 'Failure to change default credentials', 'Failure to install an antivirus', 'Failure to use a VPN'],
    answer: 'Failure to change default credentials'
  },
  {
    id: 20,
    type: 'mcq',
    text: 'An attacker wants to know which specific folders on a website the developer is trying to hide from Google Search. They navigate to a specific text file at the root of the website to read the "Disallow" rules. What is the name of this file?',
    options: ['index.html', 'config.json', '.env.local', 'robots.txt'],
    answer: 'robots.txt'
  }
]
