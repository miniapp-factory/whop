import { useState } from "react";
import { Button } from "@/components/ui/button";

const fruits = ["cherry", "lemon", "orange", "plum", "grape"];

export function SlotMachine() {
  const [reels, setReels] = useState<string[]>(["cherry", "cherry", "cherry"]);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const roll = () => {
    setRolling(true);
    const newReels = Array.from({ length: 3 }, () => fruits[Math.floor(Math.random() * fruits.length)]);
    setTimeout(() => {
      setReels(newReels);
      setResult(`You got ${newReels.join(", ")}`);
      setRolling(false);
    }, 1000);
  };

  const share = async () => {
    if (!result) return;
    try {
      await navigator.share({
        title: "Slot Machine Result",
        text: result,
        url: process.env.NEXT_PUBLIC_URL,
      });
    } catch {
      alert("Share failed");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {reels.map((fruit, i) => (
          <img key={i} src={`/${fruit}.png`} alt={fruit} width={64} height={64} />
        ))}
      </div>
      <Button onClick={roll} disabled={rolling}>
        {rolling ? "Rolling..." : "Roll"}
      </Button>
      {result && (
        <Button variant="outline" onClick={share}>
          Share
        </Button>
      )}
    </div>
  );
}
