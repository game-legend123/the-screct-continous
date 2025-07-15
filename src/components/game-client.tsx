"use client"

import { useState, useTransition } from "react"
import { generateCipher, type GenerateCipherOutput } from "@/ai/flows/generate-cipher"
import { zodResolver } from "@hookform/resolvers/zod"
import { Heart, KeyRound, Lightbulb, Loader2, RotateCw } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

const FormSchema = z.object({
  guess: z.string().min(1, {
    message: "Bạn chưa nhập lời giải.",
  }),
})

type GameClientProps = {
  initialCipherData: GenerateCipherOutput
}

export function GameClient({ initialCipherData }: GameClientProps) {
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [isGameOver, setIsGameOver] = useState(false)
  const [cipherData, setCipherData] = useState<GenerateCipherOutput>(initialCipherData)
  const [showHint, setShowHint] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      guess: "",
    },
  })

  const fetchNewCipher = async (newLevel: number) => {
    startTransition(async () => {
      try {
        const newCipher = await generateCipher({ difficultyLevel: newLevel })
        setCipherData(newCipher)
        setLevel(newLevel)
        setShowHint(false)
        form.reset()
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể tạo mật mã mới. Vui lòng thử lại.",
        })
      }
    })
  }

  const handleRestart = () => {
    setIsGameOver(false)
    setLives(3)
    fetchNewCipher(1)
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (isGameOver) return;

    if (data.guess.trim().toLowerCase() === cipherData.plainText.trim().toLowerCase()) {
      toast({
        title: "Chính xác!",
        description: `Bạn đã giải được mật mã vòng ${level}. Chuẩn bị cho vòng tiếp theo!`,
      })
      const newLevel = level + 1
      fetchNewCipher(newLevel)
    } else {
      const newLives = lives - 1
      setLives(newLives)
      if (newLives > 0) {
        toast({
          variant: "destructive",
          title: "Sai rồi!",
          description: `Đáp án không đúng. Bạn còn ${newLives} mạng.`,
        })
        form.setError("guess", {
          type: "manual",
          message: "Đáp án không chính xác. Hãy thử lại.",
        })
      } else {
        setIsGameOver(true)
      }
    }
  }

  return (
    <div className="flex flex-col gap-8">
       <div className="text-center">
         <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">Mật Mã Liên Hoàn</h1>
         <p className="mt-2 text-lg text-muted-foreground">Giải mã để leo thang. Bạn có thể đi được bao xa?</p>
       </div>

      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Vòng {level}</CardTitle>
            <div className="flex items-center gap-2">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`h-6 w-6 transition-colors ${
                    i < lives ? "fill-red-500 text-red-500" : "fill-muted text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
          <CardDescription>Đây là thông điệp đã được mã hóa. Hãy tìm ra thông điệp gốc.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-md border bg-muted/50 p-4 font-mono text-sm shadow-inner md:text-base">
            {isPending ? <Skeleton className="h-6 w-full" /> : <p className="break-words">{cipherData.cipherText}</p>}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="guess"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-semibold">
                      <KeyRound className="h-4 w-4" />
                      Lời giải của bạn
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập đáp án của bạn ở đây..." {...field} disabled={isPending || isGameOver} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending || isGameOver} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Kiểm Tra
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <Button variant="outline" onClick={() => setShowHint(!showHint)} disabled={isPending || isGameOver}>
            <Lightbulb className="mr-2 h-4 w-4 text-accent" />
            {showHint ? "Ẩn Gợi Ý" : "Lấy Gợi Ý"}
          </Button>
          {showHint && (
            <div className="w-full rounded-md border border-accent/50 bg-accent/10 p-4 text-sm text-foreground">
              <p className="font-bold text-accent-foreground">Phương pháp mã hóa:</p>
              {isPending ? <Skeleton className="mt-1 h-5 w-3/4" /> : <p className="mt-1">{cipherData.encryptionMethod}</p>}
            </div>
          )}
        </CardFooter>
      </Card>

      <AlertDialog open={isGameOver}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Trò Chơi Kết Thúc!</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn đã hết mạng. Đừng lo, hãy thử lại nhé!
              <br />
              Đáp án đúng là: <strong className="text-primary">{cipherData.plainText}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleRestart} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <RotateCw className="mr-2 h-4 w-4" />
              Chơi Lại
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
