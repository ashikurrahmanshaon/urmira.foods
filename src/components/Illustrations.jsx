import React from 'react';

/**
 * Handcrafted Vector Artwork for URMIRA Organic Foods
 * Built with robust, self-contained SVG vectors and direct color hierarchy.
 * Guaranteed 100% rendering reliability on all browsers, mobile devices, and production deployments.
 */

// 1. Organic Botanical Leaf (TopBar, Badges, Brand Accents)
export function NaturalLeafIllustration({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`urmira-illus natural-leaf ${className}`}
      style={{ verticalAlign: 'middle', flexShrink: 0, display: 'inline-block' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="urm_leaf_g1" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        <linearGradient id="urm_leaf_g2" x1="2" y1="18" x2="16" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#065f46" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      {/* Background Soft Glow Aura */}
      <circle cx="12" cy="12" r="10.5" fill="#10b981" fillOpacity="0.16" stroke="#34d399" strokeWidth="0.8" />
      
      {/* Small Secondary Leaf */}
      <path
        d="M6 17C6 17 6.8 12.5 10.5 10.5C14.2 8.5 15.5 9 15.5 9C15.5 9 14.2 13.5 10.5 15.5C6.8 17.5 6 17 6 17Z"
        fill="#059669"
      />
      {/* Main Organic Leaf */}
      <path
        d="M3.5 20.5C4 16 7 8 18.5 4.5C19.5 4.2 20 5.2 19.5 6C16 17 8 19.8 3.5 20.5Z"
        fill="url(#urm_leaf_g1)"
        stroke="#047857"
        strokeWidth="0.5"
      />
      {/* Leaf Center Stem & Veins */}
      <path
        d="M4.5 19.5C8 16 13 11 18.5 5"
        stroke="#fef08a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M9 14.5C11.5 14 13.5 12 13.5 12"
        stroke="#fef08a"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M12.5 11C15 10.5 16.8 8.8 16.8 8.8"
        stroke="#fef08a"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      {/* Dewdrop Sparkle */}
      <circle cx="15.5" cy="8.5" r="1.3" fill="#fbbf24" stroke="#ffffff" strokeWidth="0.4" />
      <circle cx="15.2" cy="8.2" r="0.4" fill="#ffffff" />
    </svg>
  );
}

// 2. Eco Delivery Van & Express Shipping
export function EcoDeliveryIllustration({ size = 18, className = '' }) {
  return (
    <svg
      width={Math.round(size * 1.25)}
      height={size}
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`urmira-illus eco-delivery ${className}`}
      style={{ verticalAlign: 'middle', flexShrink: 0, display: 'inline-block' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="urm_van_body" x1="1" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#065f46" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>

      {/* Speed Streaks */}
      <path d="M1 9.5H4" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M0 13H5" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M2 16.5H4.5" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" />

      {/* Main Van Cargo Box */}
      <rect x="5" y="5" width="16" height="13" rx="2" fill="#047857" stroke="#10b981" strokeWidth="0.9" />
      
      {/* Front Driver Cab */}
      <path
        d="M21 9H25.5C26.5 9 27.4 9.6 27.8 10.5L29.7 14.5C29.9 14.9 30 15.4 30 16V17C30 17.6 29.6 18 29 18H21V9Z"
        fill="#059669"
        stroke="#10b981"
        strokeWidth="0.9"
      />
      {/* Windshield */}
      <path
        d="M22.5 10.5H25C25.6 10.5 26.2 10.9 26.5 11.5L27.6 14H22.5V10.5Z"
        fill="#e0f2fe"
      />

      {/* Eco Leaf Decal */}
      <path
        d="M10.5 12.5C10.5 10 13.5 9 15.5 8.5C15.5 11 14 13.5 11.5 13.5C10.8 13.5 10.5 13.2 10.5 12.5Z"
        fill="#34d399"
      />
      <path d="M11 13C12.5 12 14.5 10 15.5 8.5" stroke="#fef08a" strokeWidth="0.8" strokeLinecap="round" />

      {/* Wheels */}
      <circle cx="10" cy="18.5" r="3.2" fill="#0f172a" />
      <circle cx="10" cy="18.5" r="2" fill="#fbbf24" stroke="#d97706" strokeWidth="0.6" />
      <circle cx="10" cy="18.5" r="0.8" fill="#ffffff" />

      <circle cx="24.5" cy="18.5" r="3.2" fill="#0f172a" />
      <circle cx="24.5" cy="18.5" r="2" fill="#fbbf24" stroke="#d97706" strokeWidth="0.6" />
      <circle cx="24.5" cy="18.5" r="0.8" fill="#ffffff" />

      {/* Headlight */}
      <circle cx="29.2" cy="15.8" r="1" fill="#fef08a" />
    </svg>
  );
}

// 3. Free Delivery & Gift Box
export function FreeGiftIllustration({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`urmira-illus free-gift ${className}`}
      style={{ verticalAlign: 'middle', flexShrink: 0, display: 'inline-block' }}
      aria-hidden="true"
    >
      {/* Sparkles */}
      <path
        d="M19 2L19.8 4.2L22 5L19.8 5.8L19 8L18.2 5.8L16 5L18.2 4.2L19 2Z"
        fill="#fef08a"
      />
      <circle cx="4" cy="5" r="1.2" fill="#fbbf24" />
      <circle cx="21" cy="18" r="1" fill="#fef08a" />

      {/* Gift Box Base */}
      <rect x="4.5" y="10" width="15" height="11" rx="2" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8" />
      
      {/* Box Lid */}
      <rect x="3" y="6.5" width="18" height="4.5" rx="1.5" fill="#fbbf24" stroke="#b45309" strokeWidth="0.8" />

      {/* Vertical Ribbon */}
      <rect x="10.5" y="6.5" width="3" height="14.5" fill="#dc2626" />
      
      {/* Ribbon Bow Knot */}
      <path
        d="M12 6.5C10.5 4 8 4 8.5 5.8C9 7.2 11.2 6.5 12 6.5ZM12 6.5C13.5 4 16 4 15.5 5.8C15 7.2 12.8 6.5 12 6.5Z"
        fill="#ef4444"
        stroke="#991b1b"
        strokeWidth="0.7"
      />
      <circle cx="12" cy="6.5" r="1.2" fill="#fef08a" />

      {/* Front Shimmer */}
      <path d="M6 12L8 18" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.8" />
    </svg>
  );
}

// 4. Live Hotline Support
export function HotlineIllustration({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`urmira-illus live-hotline ${className}`}
      style={{ verticalAlign: 'middle', flexShrink: 0, display: 'inline-block' }}
      aria-hidden="true"
    >
      {/* Headset Arc Band */}
      <path
        d="M4.5 12C4.5 7.8 7.8 4.5 12 4.5C16.2 4.5 19.5 7.8 19.5 12"
        stroke="#fbbf24"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Left Earpad */}
      <rect x="3" y="11" width="3.5" height="6" rx="1.75" fill="#047857" stroke="#10b981" strokeWidth="1" />
      
      {/* Right Earpad */}
      <rect x="17.5" y="11" width="3.5" height="6" rx="1.75" fill="#047857" stroke="#10b981" strokeWidth="1" />

      {/* Microphone Arm */}
      <path
        d="M19 14V17.5C19 19 17.5 20.5 15.5 20.5H13"
        stroke="#fbbf24"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Mic Tip */}
      <circle cx="12" cy="20.5" r="1.8" fill="#10b981" stroke="#ffffff" strokeWidth="0.8" />

      {/* Live Online Pulse Dot */}
      <circle cx="5" cy="5" r="2.2" fill="#22c55e" />
      <circle cx="5" cy="5" r="1" fill="#ffffff" />
    </svg>
  );
}

// 5. Traditional Golden Ghee Clay Matka (Pot)
export function PureGheeClayMatkaIllustration({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`urmira-illus ghee-matka ${className}`}
      style={{ verticalAlign: 'middle', flexShrink: 0, display: 'inline-block' }}
      aria-hidden="true"
    >
      {/* Warm Golden Radiance Halo */}
      <circle cx="32" cy="34" r="28" fill="#fef08a" fillOpacity="0.35" stroke="#f59e0b" strokeOpacity="0.25" strokeWidth="1" />

      {/* Traditional Wooden Churner Stick (Mathani) */}
      <path
        d="M24 8L36 34"
        stroke="#a16207"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M22 6L26 10" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" />

      {/* Authentic Clay Matka Pot Body */}
      <path
        d="M16 26C16 26 10 33 10 42C10 51.5 19.8 57 32 57C44.2 57 54 51.5 54 42C54 33 48 26 48 26H16Z"
        fill="#b45309"
        stroke="#78350f"
        strokeWidth="1.2"
      />

      {/* Pot Mouth Rim */}
      <ellipse cx="32" cy="25" rx="16.5" ry="5.5" fill="#78350f" stroke="#ca8a04" strokeWidth="1.2" />
      
      {/* Pure Liquid Golden Ghee Surface */}
      <ellipse cx="32" cy="25.5" rx="13.5" ry="4" fill="#fbbf24" />

      {/* Clay Neck Cord */}
      <path
        d="M17 28C22 30 42 30 47 28"
        stroke="#fef08a"
        strokeWidth="1.8"
        strokeDasharray="2.5 2"
      />

      {/* Golden Ghee Droplet */}
      <path
        d="M38 15C38 15 42 20 42 22.5C42 24.7 40.2 26.5 38 26.5C35.8 26.5 34 24.7 34 22.5C34 20 38 15 38 15Z"
        fill="#f59e0b"
        stroke="#d97706"
        strokeWidth="0.8"
      />
      <circle cx="37" cy="21" r="1.2" fill="#ffffff" />

      {/* Clay Texture Gloss Highlights */}
      <path
        d="M15 40C15 48 22 53 30 54"
        stroke="#fde68a"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />

      {/* Ghee Aroma Swirls */}
      <path
        d="M26 14C24 12 25 10 27 9"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M31 12C29 10 30 8 32 7"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 6. Royal Khurjur & Power Bomb Energy Bowl
export function PowerBombBowlIllustration({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`urmira-illus power-bowl ${className}`}
      style={{ verticalAlign: 'middle', flexShrink: 0, display: 'inline-block' }}
      aria-hidden="true"
    >
      {/* Warm Energy Aura */}
      <circle cx="32" cy="34" r="28" fill="#fed7aa" fillOpacity="0.4" stroke="#f97316" strokeOpacity="0.25" strokeWidth="1" />

      {/* Energy Sparks */}
      <path d="M48 12L49.5 15.5L53 17L49.5 18.5L48 22L46.5 18.5L43 17L46.5 15.5L48 12Z" fill="#fbbf24" />
      <path d="M14 16L15 18L17 19L15 20L14 22L13 20L11 19L13 18L14 16Z" fill="#f59e0b" />

      {/* Premium Dates */}
      <path
        d="M21 28C17 24 20 18 25 19C30 20 31 27 27 29C24.5 30.5 22.5 30 21 28Z"
        fill="#713f12"
        stroke="#451a03"
        strokeWidth="1"
      />
      <path
        d="M32 23C28 19 33 14 38 16C43 18 43 25 39 26C36.5 27 34 26 32 23Z"
        fill="#713f12"
        stroke="#451a03"
        strokeWidth="1"
      />

      {/* Golden Almonds */}
      <path
        d="M17 32C14 27 18 22 22 24C26 26 24 33 20 34C18 34.5 17.5 33.5 17 32Z"
        fill="#f59e0b"
        stroke="#b45309"
        strokeWidth="0.8"
      />
      {/* Pistachio / Cashew */}
      <path
        d="M40 28C44 24 48 26 47 30C46 34 41 33 39 31C38.5 30 39 29 40 28Z"
        fill="#86efac"
        stroke="#16a34a"
        strokeWidth="1"
      />

      {/* Pure Honey Dropper */}
      <path
        d="M32 10C32 10 35 15 35 18C35 19.7 33.7 21 32 21C30.3 21 29 19.7 29 18C29 15 32 10 32 10Z"
        fill="#fbbf24"
        stroke="#d97706"
        strokeWidth="0.8"
      />
      <circle cx="31.2" cy="16.5" r="0.9" fill="#ffffff" />

      {/* Artisan Wooden Bowl */}
      <path
        d="M10 32C10 32 12 52 32 52C52 52 54 32 54 32H10Z"
        fill="#581c87"
        fillOpacity="0.05"
      />
      <path
        d="M10 32C10 32 12 52 32 52C52 52 54 32 54 32H10Z"
        fill="#78350f"
        stroke="#451a03"
        strokeWidth="1.4"
      />
      <ellipse cx="32" cy="32" rx="22" ry="5.5" fill="#451a03" stroke="#b45309" strokeWidth="1.2" />

      {/* Wooden Grain Texture */}
      <path
        d="M16 40C22 47 42 47 48 40"
        stroke="#ca8a04"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
    </svg>
  );
}

// 7. 100% Purity & Lab Certified Luxury Trust Shield
export function ArtisanTrustShieldIllustration({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`urmira-illus trust-shield ${className}`}
      style={{ verticalAlign: 'middle', flexShrink: 0, display: 'inline-block' }}
      aria-hidden="true"
    >
      {/* Laurel Wreath Left */}
      <path
        d="M12 22C10 27 10 37 16 46M11 26C8 28 8 32 11 34M12 36C9 38 10 43 13 44"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Laurel Wreath Right */}
      <path
        d="M52 22C54 27 54 37 48 46M53 26C56 28 56 32 53 34M52 36C55 38 54 43 51 44"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Main Luxury Shield Crest */}
      <path
        d="M32 9L48 16V28C48 40.5 41 49.5 32 55C23 49.5 16 40.5 16 28V16L32 9Z"
        fill="#047857"
        stroke="#f59e0b"
        strokeWidth="2.4"
      />

      {/* Inner Golden Outline */}
      <path
        d="M32 13L44 18.5V28C44 38 38.5 45.5 32 50C25.5 45.5 20 38 20 28V18.5L32 13Z"
        stroke="#fef08a"
        strokeWidth="1.2"
        strokeOpacity="0.6"
      />

      {/* Purity Checkmark */}
      <path
        d="M24 30L29.5 36L40 23"
        stroke="#fef08a"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Little Star Top */}
      <path d="M32 20L33 22.5L35.5 23.5L33 24.5L32 27L31 24.5L28.5 23.5L31 22.5L32 20Z" fill="#fbbf24" />
    </svg>
  );
}

// 8. Happy Family Wellness & Natural Health
export function HappyFamilyCareIllustration({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`urmira-illus family-care ${className}`}
      style={{ verticalAlign: 'middle', flexShrink: 0, display: 'inline-block' }}
      aria-hidden="true"
    >
      {/* Gentle Halo */}
      <circle cx="32" cy="32" r="26" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeOpacity="0.35" strokeWidth="1.2" />

      {/* Organic Heart */}
      <path
        d="M32 44C32 44 18 34 18 23C18 17.5 22.5 13 28 13C30.5 13 32 15 32 15C32 15 33.5 13 36 13C41.5 13 46 17.5 46 23C46 34 32 44 32 44Z"
        fill="#059669"
        stroke="#047857"
        strokeWidth="1.2"
      />

      {/* Sprout Inside Heart */}
      <path
        d="M32 35V23M32 23C32 23 28 20 26 22M32 26C32 26 36 23 37 25"
        stroke="#fef08a"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Caring Hands Cradling */}
      <path
        d="M12 40C16 46 24 51 32 51C40 51 48 46 52 40"
        stroke="#f59e0b"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path d="M10 36L14 41" stroke="#f59e0b" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M54 36L50 41" stroke="#f59e0b" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

// 9. Cash On Delivery & Parcel Inspection
export function CashOnDeliveryIllustration({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`urmira-illus cod-inspection ${className}`}
      style={{ verticalAlign: 'middle', flexShrink: 0, display: 'inline-block' }}
      aria-hidden="true"
    >
      {/* Parcel Box 3D Isometric Body */}
      {/* Top Lid */}
      <path d="M32 14L16 22L32 30L48 22L32 14Z" fill="#fde68a" stroke="#92400e" strokeWidth="1.4" />
      {/* Front Left Face */}
      <path d="M16 22L32 30V48L16 40V22Z" fill="#d97706" stroke="#92400e" strokeWidth="1.4" />
      {/* Front Right Face */}
      <path d="M32 30L48 22V40L32 48V30Z" fill="#b45309" stroke="#92400e" strokeWidth="1.4" />

      {/* Flap Accents */}
      <path d="M32 30L20 18" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M32 30L44 18" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" />

      {/* Bangladeshi Taka Seal (৳) */}
      <circle cx="46" cy="44" r="11" fill="#059669" stroke="#ffffff" strokeWidth="1.8" />
      <path
        d="M43 39H48.5C49.5 39 50 39.5 50 40.5C50 42 48.5 42.5 47 43L43 44.5V49M41 42H51"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Verified Green Tick on Package */}
      <circle cx="22" cy="31" r="5" fill="#10b981" />
      <path d="M19.5 31L21.5 33L24.5 29.5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 10. Star Rating & Customer Delight
export function CustomerDelightIllustration({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`urmira-illus customer-delight ${className}`}
      style={{ verticalAlign: 'middle', flexShrink: 0, display: 'inline-block' }}
      aria-hidden="true"
    >
      {/* Outer Soft Ring */}
      <circle cx="32" cy="32" r="26" fill="#fbbf24" fillOpacity="0.15" stroke="#f59e0b" strokeOpacity="0.4" strokeWidth="1.4" />

      {/* Big Golden Star */}
      <path
        d="M32 10L37.5 23.5L52 24.5L41 34L44.5 48L32 40.5L19.5 48L23 34L12 24.5L26.5 23.5L32 10Z"
        fill="#f59e0b"
        stroke="#b45309"
        strokeWidth="1.6"
      />

      {/* Inner Star Sparkle */}
      <path
        d="M32 15L35.5 24L44 24.5L37.5 30.5L39.5 39L32 34.5"
        fill="#ffffff"
        fillOpacity="0.5"
      />
    </svg>
  );
}

// 11. WhatsApp Direct Concierge
export function WhatsAppConciergeIllustration({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`urmira-illus wa-concierge ${className}`}
      style={{ verticalAlign: 'middle', flexShrink: 0, display: 'inline-block' }}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="#16a34a" stroke="#ffffff" strokeWidth="1" />
      <path
        d="M17.2 14.5C16.8 14.3 15.2 13.5 14.9 13.4C14.6 13.3 14.4 13.3 14.2 13.6C14 13.9 13.4 14.6 13.2 14.8C13 15 12.8 15 12.4 14.8C12 14.6 10.8 14.2 9.4 12.9C8.3 11.9 7.6 10.7 7.4 10.3C7.2 9.9 7.4 9.7 7.6 9.5C7.8 9.3 8 9.1 8.2 8.9C8.4 8.7 8.5 8.5 8.6 8.3C8.7 8.1 8.6 7.9 8.5 7.7C8.4 7.5 7.8 6.1 7.6 5.5C7.3 4.9 7.1 5 6.9 5H6.4C6.2 5 5.8 5.1 5.5 5.4C5.2 5.7 4.5 6.4 4.5 7.8C4.5 9.2 5.5 10.6 5.7 10.8C5.9 11 7.7 13.8 10.5 15C13.3 16.2 13.3 15.8 13.8 15.8C14.3 15.7 15.4 15.1 15.6 14.5C15.8 13.9 15.8 13.4 15.7 13.3C15.6 13.2 15.4 13.1 15.1 13"
        fill="#ffffff"
        transform="translate(1, 1) scale(0.9)"
      />
    </svg>
  );
}
