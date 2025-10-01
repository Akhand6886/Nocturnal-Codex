"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Card className="my-6 bg-muted/20">
      <CardContent className="p-4 flex items-center justify-center space-x-4">
        <h3 className="font-semibold text-foreground/90">Interactive MDX Example:</h3>
        <Button variant="outline" size="icon" onClick={() => setCount(count - 1)}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-xl font-bold w-10 text-center">{count}</span>
        <Button variant="outline" size="icon" onClick={() => setCount(count + 1)}>
          <Plus className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
