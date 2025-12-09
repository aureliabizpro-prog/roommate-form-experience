'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Stats {
    rank: number;
    total: number;
    genderRatio: Record<string, number>;
    budgetDistribution: Record<string, number>;
    locationRanking: Record<string, number>;
}

const BarChart: React.FC<{ title: string; data: Record<string, number> }> = ({ title, data }) => {
    const total = Object.values(data).reduce((sum, value) => sum + value, 0);
    if (total === 0) return null;

    const sortedData = Object.entries(data).sort(([, a], [, b]) => b - a);

    return (
        <div>
            <h3 className="font-semibold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-800">{title}</h3>
            <div className="space-y-3">
                {sortedData.map(([key, value]) => (
                    <div key={key} className="w-full">
                        <div className="flex justify-between items-baseline mb-1.5">
                            <span className="text-sm sm:text-base font-medium text-gray-700 leading-snug">{key}</span>
                            <span className="text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap ml-2">{value} 位 ({((value / total) * 100).toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-indigo-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(value / total) * 100}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const userId = searchParams.get('userId');
      const fetchStats = async () => {
        try {
          const response = await fetch(`/api/get-stats${userId ? `?userId=${userId}` : ''}`);
          if (response.ok) {
            const data = await response.json();
            setStats(data);
          }
        } catch (error) {
          console.error("Failed to fetch stats", error);
        } finally {
          setLoading(false);
        }
      };
      fetchStats();
    }, [searchParams]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-3 sm:p-6 md:p-8 bg-gray-50">
          <div className="w-full max-w-3xl mx-auto p-5 sm:p-6 md:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg">
            <div className="text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-2 sm:mb-3">提交成功！</h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8">感謝您填寫表單，我們已經收到您的資料。</p>
            </div>

            {loading ? (
                <div className="text-base sm:text-lg text-center py-10">正在載入統計數據...</div>
            ) : stats ? (
                <div className="space-y-6 sm:space-y-8">
                    <div className="bg-indigo-50 border-l-4 border-indigo-500 text-indigo-800 p-4 sm:p-5 rounded-r-xl">
                        <p className="font-bold text-base sm:text-lg">
                            您是第 <span className="text-xl sm:text-2xl font-extrabold">{stats.rank}</span> 位填寫者！
                            <span className="text-xs sm:text-sm ml-2">(共 {stats.total} 位)</span>
                        </p>
                    </div>

                    <BarChart title="性別認同佔比" data={stats.genderRatio} />
                    <BarChart title="期望租金分佈" data={stats.budgetDistribution} />
                    <BarChart title="熱門租屋地區" data={stats.locationRanking} />

                </div>
            ) : (
                <p className="text-red-500 text-center py-10 text-sm sm:text-base">無法載入統計數據。</p>
            )}

            <div className="text-center mt-8 sm:mt-10">
                <button
                    onClick={() => router.push('/')}
                    className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-indigo-600 text-white font-semibold text-base sm:text-lg rounded-xl hover:bg-indigo-700 active:bg-indigo-800 transition-all shadow-md hover:shadow-lg"
                >
                    返回首頁
                </button>
            </div>
          </div>
        </main>
      );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    )
}
