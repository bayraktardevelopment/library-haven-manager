import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  title: string;
  author: string;
  available: boolean;
  coverUrl: string;
  onBorrow: () => void;
}

export const BookCard = ({ title, author, available, coverUrl, onBorrow }: BookCardProps) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-serif">{title}</CardTitle>
          <Badge variant={available ? "default" : "secondary"}>
            {available ? "Müsait" : "Ödünç Alındı"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-[2/3] relative mb-4">
          <img
            src={coverUrl}
            alt={title}
            className="object-cover rounded-md w-full h-full"
          />
        </div>
        <p className="text-sm text-muted-foreground">Yazar: {author}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onBorrow}
          disabled={!available}
          className="w-full"
          variant={available ? "default" : "secondary"}
        >
          {available ? "Ödünç Al" : "Şu Anda Müsait Değil"}
        </Button>
      </CardFooter>
    </Card>
  );
};