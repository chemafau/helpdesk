const SESSION_KEY = 'helpdesk_session';

const ACCOUNTS = [
  { username: 'admin', password: 'admin123', displayName: 'Admin', role: 'Helpdesk Admin' },
];

export type Session = {
  username: string;
  displayName: string;
  role: string;
};

export function login(username: string, password: string): boolean {
  const account = ACCOUNTS.find(
    (a) => a.username === username && a.password === password
  );
  if (!account) return false;

  const session: Session = {
    username: account.username,
    displayName: account.displayName,
    role: account.role,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return true;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}
