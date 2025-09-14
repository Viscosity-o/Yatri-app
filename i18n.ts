// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: { profile: 'Profile', passport: 'Passport', visa: 'Visa', language: 'Language', accessibility: 'Accessibility', voiceCommands: 'Voice Commands', textToSpeech: 'Text to Speech', logout: 'Logout' } },
  es: { translation: { profile: 'Perfil', passport: 'Pasaporte', visa: 'Visa', language: 'Idioma', accessibility: 'Accesibilidad', voiceCommands: 'Comandos de Voz', textToSpeech: 'Texto a Voz', logout: 'Cerrar Sesión' } },
  fr: { translation: { profile: 'Profil', passport: 'Passeport', visa: 'Visa', language: 'Langue', accessibility: 'Accessibilité', voiceCommands: 'Commandes Vocales', textToSpeech: 'Texte à Parole', logout: 'Déconnexion' } },
  de: { translation: { profile: 'Profil', passport: 'Reisepass', visa: 'Visum', language: 'Sprache', accessibility: 'Barrierefreiheit', voiceCommands: 'Sprachbefehle', textToSpeech: 'Text-zu-Sprache', logout: 'Abmelden' } },
  it: { translation: { profile: 'Profilo', passport: 'Passaporto', visa: 'Visto', language: 'Lingua', accessibility: 'Accessibilità', voiceCommands: 'Comandi Vocali', textToSpeech: 'Testo in Voce', logout: 'Disconnetti' } },
  pt: { translation: { profile: 'Perfil', passport: 'Passaporte', visa: 'Visto', language: 'Idioma', accessibility: 'Acessibilidade', voiceCommands: 'Comandos de Voz', textToSpeech: 'Texto para Fala', logout: 'Sair' } },
  ru: { translation: { profile: 'Профиль', passport: 'Паспорт', visa: 'Виза', language: 'Язык', accessibility: 'Доступность', voiceCommands: 'Голосовые команды', textToSpeech: 'Текст в речь', logout: 'Выйти' } },
  zh: { translation: { profile: '个人资料', passport: '护照', visa: '签证', language: '语言', accessibility: '辅助功能', voiceCommands: '语音指令', textToSpeech: '文本转语音', logout: '登出' } },
  ja: { translation: { profile: 'プロフィール', passport: 'パスポート', visa: 'ビザ', language: '言語', accessibility: 'アクセシビリティ', voiceCommands: '音声コマンド', textToSpeech: '音声読み上げ', logout: 'ログアウト' } },
  ko: { translation: { profile: '프로필', passport: '여권', visa: '비자', language: '언어', accessibility: '접근성', voiceCommands: '음성 명령', textToSpeech: '텍스트 음성 변환', logout: '로그아웃' } },
  ar: { translation: { profile: 'الملف الشخصي', passport: 'جواز سفر', visa: 'تأشيرة', language: 'اللغة', accessibility: 'إمكانية الوصول', voiceCommands: 'أوامر صوتية', textToSpeech: 'تحويل النص إلى كلام', logout: 'تسجيل الخروج' } },
  hi: { translation: { profile: 'प्रोफ़ाइल', passport: 'पासपोर्ट', visa: 'वीजा', language: 'भाषा', accessibility: 'सुलभता', voiceCommands: 'वॉइस कमांड', textToSpeech: 'टेक्स्ट टू स्पीच', logout: 'लॉग आउट' } },
  bn: { translation: { profile: 'প্রোফাইল', passport: 'পাসপোর্ট', visa: 'ভিসা', language: 'ভাষা', accessibility: 'অ্যাক্সেসিবিলিটি', voiceCommands: 'ভয়েস কমান্ড', textToSpeech: 'টেক্সট টু স্পিচ', logout: 'লগ আউট' } },
  pa: { translation: { profile: 'ਪ੍ਰੋਫਾਈਲ', passport: 'ਪਾਸਪੋਰਟ', visa: 'ਵੀਜ਼ਾ', language: 'ਭਾਸ਼ਾ', accessibility: 'ਪਹੁੰਚਯੋਗਤਾ', voiceCommands: 'ਵਾਇਸ ਕਮਾਂਡ', textToSpeech: 'ਟੈਕਸਟ ਤੋਂ ਸਪੀਚ', logout: 'ਲੌਗ ਆਉਟ' } },
  ur: { translation: { profile: 'پروفائل', passport: 'پاسپورٹ', visa: 'ویزا', language: 'زبان', accessibility: 'رسائی', voiceCommands: 'وائس کمانڈ', textToSpeech: 'ٹیکسٹ سے تقریر', logout: 'لاگ آؤٹ' } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
