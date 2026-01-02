import { useNavigate } from "react-router-dom";
import Button from "../components/button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg text-text-primary flex items-center justify-center">
      <div className="bg-bg-secondary border border-border rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-8">Explorar API da Nasa 🌌</h1>

        <div className="grid gap-4">
          <Button label="Astronomy Picture of the Day" onClick={() => navigate("/image")} />
          <Button label="Em breve 🚀" onClick={() => {}} disabled />
        </div>
      </div>
    </div>
  )
}