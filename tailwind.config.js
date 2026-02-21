/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard Variable', 'Pretendard', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif KR', 'serif'],
        display: ['Gowun Batang', 'serif'],
      },
      colors: {
        // 투박한 내추럴 컬러 팔레트
        natural: {
          50: '#FAFAF8',   // 거의 흰색
          100: '#F5F5F0',  // 크림색 종이
          200: '#E8E8E0',  // 베이지
          300: '#D4D4C8',  // 연한 회갈색
          400: '#A8A89C',  // 회갈색
          500: '#808074',  // 다크 그레이 그린
          600: '#5C5C50',  // 다크 올리브
          700: '#3C3C34',  // 거의 검정
          800: '#1F1F1B',  // 매우 진한 검정
          900: '#0A0A08',  // 완전 검정
        },
        // 악센트 컬러 (미니멀)
        accent: {
          cream: '#F9F6F0',
          paper: '#EBE8E0',
          ink: '#2A2A24',
        },
        // 다크 테마 전용 밝은 컬러
        dark: {
          text: '#F5F5F0',      // 밝은 크림 (텍스트)
          border: '#E8E8E0',    // 밝은 베이지 (테두리)
          bg: '#0A0A08',        // 깊은 검정 (배경)
          card: '#1F1F1B',      // 카드 배경
        },
      },
    },
  },
  plugins: [],
}
