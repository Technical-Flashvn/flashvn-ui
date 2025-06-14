//flash-bingo-ui\src\app\mil-bingo\module\page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
//API services
import { getAllModules } from '@/features/dashboard/Bingo/api/module';
//Components
import { ArrowLeft, Loader2 } from 'lucide-react';
import LoaderCustom from '@/components/loader-custom/loader-custom';

type Module = {
  _id: string;
  title: string;
};

export default function ModulePage() {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingModule, setLoadingModule] = useState<string | null>(null);
  //gameplay: GET all modules
  useEffect(() => {
    async function fetchModules() {
      try {
        setLoading(true);
        const data = await getAllModules();
        setModules(data);
      } catch (error) {
        console.error('Lỗi khi tải danh sách modules:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchModules();
  }, []);

  const handleSelectModule = (moduleId: string) => {
    setLoadingModule(moduleId);
    router.push(`/gameplay/mil-bingo/module/${moduleId}`);
  };

  if (loading) {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-4">
        <LoaderCustom />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen w-full">
      {/* Header */}
      <div className="w-full max-w-2xl sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-300">
        <div className="relative flex items-center justify-center h-12">
          <ArrowLeft
            className="w-10 h-10 absolute left-0 border border-gray-400 rounded-md p-2 text-muted-foreground cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => router.push('/what-we-do/mil-play')}
          />
          <img src="/FLASH-logo-colorful.png" alt="Flash Logo" className="h-10 object-contain" />
        </div>
        <div className="text-center text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2">Chọn Module</div>
      </div>

      {/* modules list */}
      <div className="w-full max-w-2xl flex flex-col items-center px-4">
        {modules.length === 0 ? (
          <div className="text-center text-gray-500 mt-6">Không có module nào!</div>
        ) : (
          <div className="w-full mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
              {modules.map((mod) => (
                <button
                  key={mod._id}
                  className="bg-white border border-gray-300 p-4 rounded-lg text-lg font-semibold 
                  text-center shadow-md hover:shadow-lg transition cursor-pointer hover:bg-gray-100 relative"
                  onClick={() => handleSelectModule(mod._id)}
                  disabled={loadingModule === mod._id}
                >
                  {loadingModule === mod._id ? (
                    <Loader2 className="animate-spin text-muted-foreground mx-auto" />
                  ) : (
                    mod.title
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
