import "./loginCard.css";

function LogoMentorIA() {
  return (
    <div className="logo-mentor">
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Balão de chat */}
        <rect x="2" y="2" width="44" height="36" rx="10" fill="#1e2a4a"/>
        <polygon points="12,38 8,48 22,38" fill="#1e2a4a"/>

        {/* Rosto do robô */}
        <rect x="10" y="10" width="28" height="20" rx="5" fill="#f97316"/>

        {/* Olhos */}
        <circle cx="18" cy="19" r="3" fill="#fff"/>
        <circle cx="30" cy="19" r="3" fill="#fff"/>
        <circle cx="19" cy="20" r="1.2" fill="#1e2a4a"/>
        <circle cx="31" cy="20" r="1.2" fill="#1e2a4a"/>

        {/* Boca */}
        <rect x="17" y="25" width="10" height="2.5" rx="1.2" fill="#fff"/>

        {/* Antena */}
        <line x1="24" y1="10" x2="24" y2="5" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="4" r="2" fill="#f97316"/>
      </svg>

      <div className="logo-mentor__texto">
        <span className="logo-mentor__nome">Mentor</span>
        <span className="logo-mentor__ia"> IA</span>
        <span className="logo-mentor__plus">+</span>
      </div>
    </div>
  );
}

export default function LoginCard({ title, children }) {
  return (
    <div className="login-card">
      <LogoMentorIA />
      <p className="login-card-title">{title}</p>
      {children}
    </div>
  );
}