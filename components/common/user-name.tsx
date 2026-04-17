import { useAuth } from "@/contexts/auth-context";

export default function UserName() {
  const { user } = useAuth();

  if (!user) return null

  return (
    <div className="text-sm text-gray-600">
      {user?.email && user.email}
    </div>
  )
}