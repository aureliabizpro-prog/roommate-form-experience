'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 sm:p-6 md:p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 sm:mb-6 leading-tight">
          <span role="img" aria-label="wave" className="mr-2 sm:mr-3">👋</span>
          找個好室友，生活大不同
        </h1>
        <div className="text-left text-slate-600 text-sm sm:text-base md:text-lg space-y-3 sm:space-y-4 leading-relaxed bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md">
            <p>嗨，大家好！我們正在打造一個幫助大家更輕鬆找到合適室友的媒合系統。</p>
            <p>這份問卷是我們的<span className="font-semibold text-indigo-600">社群前導測試版</span>。我們會用這些答案，嘗試為您找出「可能合得來的室友」。</p>
            <p>如果配對成功，我們會寄 Email 給您，邀請您參加我們下一個階段的服務。</p>
            <p className="font-semibold pt-2 sm:pt-4">一起來見證我們的第一步吧！</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/form')}
          className="mt-6 sm:mt-8 md:mt-10 w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold text-base sm:text-lg rounded-xl shadow-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors duration-300"
        >
          開始體驗 (約 3 分鐘)
        </motion.button>
      </motion.div>
    </main>
  );
}
