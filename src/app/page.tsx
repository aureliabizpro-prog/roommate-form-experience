'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-6">
          <span role="img" aria-label="wave" className="mr-3">👋</span>
          找個好室友，生活大不同
        </h1>
        <div className="text-left text-slate-600 text-lg space-y-4 leading-relaxed bg-white p-8 rounded-lg shadow-sm">
            <p>嗨，大家好！我們正在打造一個幫助大家更輕鬆找到合適室友的媒合系統。</p>
            <p>這份問卷是我們的<span className="font-semibold text-indigo-600">社群前導測試版</span>。我們會用這些答案，嘗試為您找出「可能合得來的室友」。</p>
            <p>如果配對成功，我們會寄 Email 給您，邀請您參加我們下一個階段的服務。</p>
            <p className="font-semibold pt-4">一起來見證我們的第一步吧！</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/form')}
          className="mt-10 px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          開始體驗 (約 3 分鐘)
        </motion.button>
      </motion.div>
    </main>
  );
}
