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
            <h3 className="font-semibold text-xl mb-3 text-gray-800">{title}</h3>
            <div className="space-y-2">
                {sortedData.map(([key, value]) => (
                    <div key={key} className="w-full">
                        <div className="flex justify-between mb-1">
                            <span className="text-base font-medium text-gray-700">{key}</span>
                            <span className="text-sm font-medium text-gray-500">{value} 位 ({((value / total) * 100).toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${(value / total) * 100}%` }}></div>
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
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gray-50">
          <div className="w-full max-w-3xl mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-3">提交成功！</h1>
                <p className="text-base sm:text-lg text-gray-600 mb-8">感謝您填寫表單，我們已經收到您的資料。</p>
            </div>
            
            {loading ? (
                <div className="text-lg text-center py-10">正在載入統計數據...</div>
            ) : stats ? (
                <div className="space-y-8">
                    <div className="bg-indigo-50 border-l-4 border-indigo-500 text-indigo-800 p-4 rounded-r-lg">
                        <p className="font-bold text-lg">
                            您是第 <span className="text-2xl font-extrabold">{stats.rank}</span> 位填寫者！
                            <span className="text-sm ml-2">(共 {stats.total} 位)</span>
                        </p>
                    </div>
                    
                    <BarChart title="性別認同佔比" data={stats.genderRatio} />
                    <BarChart title="期望租金分佈" data={stats.budgetDistribution} />
                    <BarChart title="熱門租屋地區" data={stats.locationRanking} />

                </div>
            ) : (
                <p className="text-red-500 text-center py-10">無法載入統計數據。</p>
            )}
    
            <div className="text-center mt-10">
                <button 
                    onClick={() => router.push('/')}
                    className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
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
