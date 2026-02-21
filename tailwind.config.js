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
          800: '#2A2A24',  // 진한 검정
          900: '#1C1C18',  // 검정
        },
        // 악센트 컬러 (미니멀)
        accent: {
          cream: '#F9F6F0',
          paper: '#EBE8E0',
          ink: '#2A2A24',
        },
      },
    },
  },
  plugins: [],
}
