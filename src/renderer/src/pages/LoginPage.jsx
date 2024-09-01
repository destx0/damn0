import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import useUserStore from '@/stores/useUserStore'

const LoginPage = () => {
  const [adminPassword, setAdminPassword] = useState('')
  const [teacherPassword, setTeacherPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  const DEFAULT_ADMIN_PASSWORD = "'"
  const DEFAULT_TEACHER_PASSWORD = "'"

  const handleLogin = (e, type) => {
    e.preventDefault()
    const password = type === 'admin' ? adminPassword : teacherPassword
    const correctPassword = type === 'admin' ? DEFAULT_ADMIN_PASSWORD : DEFAULT_TEACHER_PASSWORD

    if (password === correctPassword) {
      setUser(type, type)
      navigate('/table')
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Choose your account type and enter your password.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Tabs defaultValue="admin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
            </TabsList>
            <TabsContent value="admin">
              <form onSubmit={(e) => handleLogin(e, 'admin')}>
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Admin Password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                  <Button type="submit" className="w-full">
                    Login as Admin
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="teacher">
              <form onSubmit={(e) => handleLogin(e, 'teacher')}>
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Teacher Password"
                    value={teacherPassword}
                    onChange={(e) => setTeacherPassword(e.target.value)}
                  />
                  <Button type="submit" className="w-full">
                    Login as Teacher
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">Forgot your password? Contact support.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage
