import { Loader as LoaderIcon } from "lucide-react"

export const Loader = () => {
  return (
    <div className="h-dvh flex items-center justify-center animate-spin">
      <LoaderIcon />
    </div>
  )
}
