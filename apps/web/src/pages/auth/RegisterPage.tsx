import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link  } from "react-router-dom"

export function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Welcome to Report Management Systems!</CardTitle>
        <CardDescription>
          Create your account down below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-3">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="Username"
                required
              />
              </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="report@gmail.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full cursor-pointer">
          Login 
        </Button>
        <div className="flex items-center">
        <p className="">Already Have An Account? <Link to='/login' className="">Login!</Link> </p>
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}
