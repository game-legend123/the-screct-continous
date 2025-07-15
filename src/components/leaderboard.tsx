import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trophy } from "lucide-react"

const leaderboardData = [
  { rank: 1, name: "Siêu Nhân Giải Mã", score: 42 },
  { rank: 2, name: "Vua Bẻ Khóa", score: 38 },
  { rank: 3, name: "Thám Tử Lừng Lẫy", score: 35 },
  { rank: 4, name: "Chiến Binh Bàn Phím", score: 29 },
  { rank: 5, name: "Người Mới Bắt Đầu", score: 21 },
]

export function Leaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="text-accent" />
          Bảng Xếp Hạng
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Hạng</TableHead>
              <TableHead>Người Chơi</TableHead>
              <TableHead className="text-right">Vòng Cao Nhất</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((player) => (
              <TableRow key={player.rank}>
                <TableCell className="font-medium">{player.rank}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell className="text-right">{player.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
