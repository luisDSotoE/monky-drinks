interface MiCasaLogoProps {
  size?: number | string;
  className?: string;
  showText?: boolean;
}

export default function MiCasaLogo({ size = 160, className = "", showText = true }: MiCasaLogoProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xl"
      >
        <defs>
          {/* Gradiente Fondo Medallón Crema Cálido */}
          <radialGradient id="micasaBg" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#FFF8EF" />
            <stop offset="100%" stopColor="#FCE7D2" />
          </radialGradient>

          {/* Gradiente Rojo Principal de la Marca */}
          <linearGradient id="redBrand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9141E" />
            <stop offset="100%" stopColor="#970D16" />
          </linearGradient>

          {/* Gradiente Verde Natural de Vegetación */}
          <linearGradient id="leafGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A8C5B" />
            <stop offset="100%" stopColor="#356B42" />
          </linearGradient>

          {/* Gradiente Madera Rústica */}
          <linearGradient id="woodTrim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#5C3A21" />
          </linearGradient>

          {/* Filtro de Sombra Suave */}
          <filter id="micasaShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#970D16" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* ═══ ARO EXTERIOR ROJO INTENSO CON PUNTADAS ═══ */}
        <circle cx="120" cy="120" r="114" fill="url(#redBrand)" filter="url(#micasaShadow)" />
        <circle cx="120" cy="120" r="106" fill="#FFFFFF" stroke="#970D16" strokeWidth="1.5" />
        <circle cx="120" cy="120" r="101" fill="url(#micasaBg)" />

        {/* ═══ CORONA CIRCULAR DE HOJAS Y PLANTAS NATURALES (#356B42) ═══ */}
        <g opacity="0.85">
          {/* Ramas de hojas tropicales a la izquierda */}
          <path d="M42 120 C42 85 65 52 95 40" stroke="url(#leafGreen)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M52 100 Q42 94 48 88 Q56 94 52 100 Z" fill="url(#leafGreen)" />
          <path d="M64 78 Q55 70 63 65 Q70 72 64 78 Z" fill="url(#leafGreen)" />
          <path d="M82 56 Q75 48 83 44 Q89 52 82 56 Z" fill="url(#leafGreen)" />

          {/* Ramas de hojas tropicales a la derecha */}
          <path d="M198 120 C198 85 175 52 145 40" stroke="url(#leafGreen)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M188 100 Q198 94 192 88 Q184 94 188 100 Z" fill="url(#leafGreen)" />
          <path d="M176 78 Q185 70 177 65 Q170 72 176 78 Z" fill="url(#leafGreen)" />
          <path d="M158 56 Q165 48 157 44 Q151 52 158 56 Z" fill="url(#leafGreen)" />
        </g>

        {/* ═══ SILUETA DE LA CASA CAMPESTRE (TECHO A DOS AGUAS ROJO) ═══ */}
        {/* Paredes de la Casa */}
        <rect x="76" y="98" width="88" height="58" rx="6" fill="#FFFFFF" stroke="#C9141E" strokeWidth="2.5" />
        
        {/* Techo Campestre en Rojo Intenso */}
        <path
          d="M120 46 L60 98 L72 102 L120 60 L168 102 L180 98 Z"
          fill="url(#redBrand)"
        />
        {/* Remate de la cumbrera */}
        <path d="M120 46 L68 93 L172 93 Z" fill="#C9141E" opacity="0.12" />

        {/* ═══ CHEF / COCINERO CON SU GORRO & OLLA DE COMIDA CASERA ═══ */}
        {/* Gorro de Cocinero en el centro superior */}
        <g transform="translate(104, 70)">
          {/* Base del gorro */}
          <rect x="7" y="18" width="18" height="6" rx="2" fill="#FFFFFF" stroke="#C9141E" strokeWidth="1.5" />
          {/* Pliegues abullonados del gorro de chef */}
          <path
            d="M8 18 C5 14, 5 7, 10 5 C12 2, 20 2, 22 5 C27 7, 27 14, 24 18 Z"
            fill="#FFFFFF"
            stroke="#C9141E"
            strokeWidth="1.8"
          />
          <line x1="12" y1="9" x2="13" y2="17" stroke="#C9141E" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="16" y1="8" x2="16" y2="17" stroke="#C9141E" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="20" y1="9" x2="19" y2="17" stroke="#C9141E" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Olla Tradicional de Cocina Casera */}
        <g transform="translate(100, 106)">
          {/* Vapor de comida caliente */}
          <path d="M12 0 Q14 -6 12 -10" stroke="#C9141E" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M20 0 Q22 -7 20 -11" stroke="#C9141E" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M28 0 Q30 -6 28 -10" stroke="#C9141E" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
          
          {/* Cuerpo de la Olla en Rojo Marca */}
          <path
            d="M6 8 C6 24 12 28 20 28 C28 28 34 24 34 8 Z"
            fill="url(#redBrand)"
          />
          {/* Tapa / Borde de la Olla */}
          <rect x="4" y="5" width="32" height="4" rx="2" fill="#970D16" />
          {/* Asas de la olla */}
          <path d="M4 11 C1 11 1 18 4 18" stroke="#970D16" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M36 11 C39 11 39 18 36 18" stroke="#970D16" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* Utensilios Cruzados: Cuchara y Tenedor */}
        <g stroke="#92400E" strokeWidth="2" strokeLinecap="round" opacity="0.85">
          {/* Tenedor */}
          <line x1="84" y1="112" x2="94" y2="136" />
          <path d="M82 110 L86 114" />
          {/* Cuchara */}
          <line x1="156" y1="112" x2="146" y2="136" />
          <ellipse cx="157" cy="111" rx="3" ry="4" fill="#92400E" />
        </g>

        {/* Suelo campestre de apoyo */}
        <ellipse cx="120" cy="156" rx="46" ry="5" fill="#356B42" opacity="0.18" />

        {/* ═══ CINTA TRADICIONAL EN ROJO INTENSO (#C9141E) ═══ */}
        <g filter="url(#micasaShadow)">
          {/* Cinta Roja de Fondo */}
          <path
            d="M34 174 Q120 188 206 174 L199 203 Q120 216 41 203 Z"
            fill="url(#redBrand)"
          />
          {/* Puntas traseras dobladas */}
          <path d="M34 174 L41 203 L28 207 L22 188 Z" fill="#970D16" />
          <path d="M206 174 L199 203 L212 207 L218 188 Z" fill="#970D16" />
          {/* Filetes dorados de borde */}
          <path d="M34 174 Q120 188 206 174" stroke="#FFF8EF" strokeWidth="2" fill="none" />
          <path d="M41 203 Q120 216 199 203" stroke="#FFF8EF" strokeWidth="2" fill="none" />
        </g>

        {/* Texto "MI CASA" en tipografía principal blanca */}
        <text
          x="120"
          y="196"
          fill="#FFFFFF"
          fontSize="21"
          fontWeight="900"
          fontFamily="'Lora', 'Georgia', serif"
          textAnchor="middle"
          letterSpacing="3"
        >
          MI CASA
        </text>

        {/* Texto "RESTAURANTE" abajo en gris oscuro */}
        <text
          x="120"
          y="223"
          fill="#292929"
          fontSize="9.5"
          fontWeight="800"
          fontFamily="'Outfit', sans-serif"
          textAnchor="middle"
          letterSpacing="4"
        >
          RESTAURANTE
        </text>
      </svg>

      {showText && (
        <div className="mt-2 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#C9141E] font-bold">
            Sabor Casero & Tradición
          </p>
        </div>
      )}
    </div>
  );
}
