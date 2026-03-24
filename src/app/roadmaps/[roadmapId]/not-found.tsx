// This file is intentionally left blank as a placeholder.
// We will implement a custom 404 page for roadmaps here later.
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Roadmap Not Found</h2>
      <p>Could not find the requested roadmap.</p>
      <Link href="/roadmaps">Back to all roadmaps</Link>
    </div>
  );
}
