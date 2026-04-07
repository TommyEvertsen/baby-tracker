import Tracker from "./components/tracker";

export default function Home() {
  return (
    <div className=" min-h-screen bg-background text-foreground">
      <main className="">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold mb-4">Baby Tracker</h1>
        </div>

        <div className="flex  justify-center px-16">
          <Tracker />
        </div>
      </main>
    </div>
  );
}
