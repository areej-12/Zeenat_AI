
import React from 'react';

export const COLORS = {
  primary: '#064e3b', // Deep Emerald
  secondary: '#f8f9fa', // Warm Gray
  accent: '#b2935b', // Muted Gold
};

export const PAKISTAN_DISTRICTS = [
  "Islamabad (ICT)", "Lahore", "Karachi", "Peshawar", "Quetta", "Multan", "Faisalabad", "Rawalpindi", "Gujranwala", "Hyderabad", "Sialkot", "Swat", "Gilgit", "Muzaffarabad"
];

export const NIKKAH_COLUMNS: { [key: number]: { label: string; urdu: string; desc: string } } = {
  1: { label: "Ward/Town/Tehsil", urdu: "وارڈ/ٹاؤن/تحصیل", desc: "Location where the marriage took place." },
  2: { label: "Bridegroom Details", urdu: "دولہا کی تفصیلات", desc: "Name, father's name, and residence of the groom." },
  3: { label: "Groom's Age", urdu: "دولہا کی عمر", desc: "Date of birth or age of the bridegroom." },
  4: { label: "Bride Details", urdu: "دلہن کی تفصیلات", desc: "Name, father's name, and residence of the bride." },
  5: { label: "Bride's Marital Status", urdu: "دلہن کی حیثیت", desc: "Whether the bride is a virgin, widow, or divorced." },
  6: { label: "Bride's Age", urdu: "دلہن کی عمر", desc: "Date of birth or age of the bride." },
  13: { label: "Total Haq Mehr", urdu: "حق مہر کی کل رقم", desc: "Total amount of dower promised to the bride." },
  14: { label: "Prompt/Deferred Split", urdu: "معجل اور مؤجل کی تقسیم", desc: "How much dower is paid immediately and how much is deferred." },
  15: { label: "Paid at Marriage", urdu: "نکاح کے وقت ادائیگی", desc: "Amount of dower paid at the time of the ceremony." },
  16: { label: "Property in lieu of Mehr", urdu: "مہر کے بدلے جائیداد", desc: "Details of any property given instead of cash dower." },
  17: { label: "Special Conditions", urdu: "خصوصی شرائط", desc: "Any extra terms agreed upon by both parties." },
  18: { label: "Delegation of Divorce", urdu: "حقِ طلاق کی تفویض", desc: "Crucial: Whether the husband gives the wife the right to divorce (Talaq-e-Tafweez)." },
  19: { label: "Husband's Right Curtailed", urdu: "شوہر کے حقِ طلاق پر پابندی", desc: "Any restrictions on the husband's power to divorce." },
  20: { label: "Maintenance/Documents", urdu: "نان و نفقہ/دستاویزات", desc: "Monthly maintenance (Kharchi) or other related marriage documents." },
  21: { label: "Existing Wives", urdu: "پہلی بیوی کی موجودگی", desc: "Whether the groom already has a wife and has permission for another." },
  22: { label: "Arbitration Permission", urdu: "ثالثی کونسل کی اجازت", desc: "Official permission number for a second/subsequent marriage." },
  24: { label: "Date of Registration", urdu: "رجسٹریشن کی تاریخ", desc: "When the marriage was officially recorded." },
  25: { label: "Registration Fee", urdu: "رجسٹریشن فیس", desc: "The official fee paid for the marriage certificate." }
};

export const NGO_DATABASE = [
  { name: "Bedari Helpline", contact: "0300-5251430", focus: "General Support" },
  { name: "Aurat Foundation", contact: "051-2608956", focus: "Legal Aid" },
  { name: "Legal Aid Society", contact: "0800-91010", focus: "Protection" },
  { name: "Shaheed Benazir Bhutto Centers", contact: "1094", focus: "Emergency Shelter" }
];

export const ICONS = {
  profile: <i className="fas fa-id-card"></i>,
  sharia: <i className="fas fa-moon"></i>,
  advocate: <i className="fas fa-balance-scale"></i>,
  health: <i className="fas fa-heartbeat"></i>,
  ngo: <i className="fas fa-hands-helping"></i>,
  arrowRight: <i className="fas fa-arrow-right"></i>,
  chevronLeft: <i className="fas fa-chevron-left"></i>,
  shield: <i className="fas fa-shield-alt"></i>,
  info: <i className="fas fa-info-circle"></i>,
  search: <i className="fas fa-search"></i>
};

export const TRANSLATIONS = {
  landing: {
    title: "زینت",
    subheading: "ڈیجیٹل محافظ • حق • حقوق",
    description: "پاکستانی خواتین کے لیے ایک مکمل حفاظتی نظام۔ اپنی شناخت درج کریں اور اپنے حقوق کا مکمل آڈٹ حاصل کریں۔",
    primaryCTA: "اپنی شناخت بنائیں",
  },
  disclaimer: "قانونی نوٹ: یہ زینت-اے آئی ایک معلوماتی نظام ہے، پیشہ ورانہ قانونی مشورہ نہیں ہے۔"
};
