export default function Home() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Baby Tracker</h1>
        <p className="text-muted-foreground">
          Toggle the theme using the button in the header to test dark mode.
        </p>
        <div className="mt-4 p-4 border rounded-lg bg-card text-card-foreground">
          <p>This card should change colors when switching themes.</p>
        </div>
      </main>
    </div>
  );
}
