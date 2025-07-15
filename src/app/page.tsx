import { generateCipher } from '@/ai/flows/generate-cipher'
import { GameClient } from '@/components/game-client'
import { Leaderboard } from '@/components/leaderboard'
import { Lock } from 'lucide-react'

export default async function Home() {
  const initialCipherData = await generateCipher({ difficultyLevel: 1 }).catch(
    (err) => {
      console.error("Failed to generate initial cipher:", err);
      return null;
    }
  );

  if (!initialCipherData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
        <Lock className="h-12 w-12 text-destructive" />
        <h1 className="mt-4 text-2xl font-bold text-destructive">Lỗi Khởi Tạo Trò Chơi</h1>
        <p className="mt-2 text-muted-foreground">Không thể tạo mật mã ban đầu. Vui lòng làm mới trang để thử lại.</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto grid min-h-screen grid-cols-1 items-start gap-12 p-4 py-8 md:grid-cols-3 md:py-16">
      <div className="md:col-span-2">
        <GameClient initialCipherData={initialCipherData} />
      </div>
      <div className="sticky top-8">
        <Leaderboard />
      </div>
    </main>
  );
}
