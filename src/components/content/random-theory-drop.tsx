import { generateTheoryFact } from '@/ai/flows/generate-theory-fact';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export async function RandomTheoryDrop() {
  let fact = "Loading theory...";
  let error = null;

  try {
    const theoryFactOutput = await generateTheoryFact();
    fact = theoryFactOutput.fact;
  } catch (e) {
    console.error("Failed to generate theory fact:", e);
    error = "Could not load a theory fact at this time.";
  }

  return (
    <Card className="bg-card shadow-lg border-border/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-primary">
          Random Theory Drop
        </CardTitle>
        <Lightbulb className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <p className="text-base text-foreground/90 italic">"{fact}"</p>
        )}
      </CardContent>
    </Card>
  );
}
