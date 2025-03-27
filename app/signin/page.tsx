"use server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import { googleSignin } from "@/utils/actions/signinActions";

export default async function Signin() {
  // Googleログイン

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold text-[#FFB84C]">
            <div className="flex flex-col items-center">
              <div style={{ position: "relative", width: "50%", height: "100px" }}>
                <Image src={`/img/logo_yellow.png`} alt="" fill style={{ objectFit: "cover" }} />
              </div>
            </div>
          </CardTitle>
          <CardDescription className="text-xl  text-gray-600 font-extrabold">
            サインイン
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="メールアドレス"
                  className="pl-10 rounded-full border-gray-300"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="パスワード"
                  className="pl-10 rounded-full border-gray-300"
                />
              </div>
            </div>
          </div>

          <Button className="w-full bg-primary-button hover:bg-primary-buttonHover text-white rounded-full py-6 text-lg">
            サインイン
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">または</span>
            </div>
          </div>

          <div className="grid gap-4">
            <form action={googleSignin}>
              <Button
                variant="outline"
                className="rounded-full py-6 text-lg w-full"
                // onClick={handleLogin}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  viewBox="0 0 128 128"
                >
                  <path
                    fill="#fff"
                    d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.33 74.33 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.16 36.16 0 0 1-13.93 5.5a41.29 41.29 0 0 1-15.1 0A37.16 37.16 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.31 38.31 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.28 34.28 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38z"
                  />
                  <path
                    fill="#e33629"
                    d="M44.59 4.21a64 64 0 0 1 42.61.37a61.22 61.22 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21z"
                  />
                  <path
                    fill="#f8bd00"
                    d="M3.26 51.5a62.93 62.93 0 0 1 5.5-15.9l20.73 16.09a38.31 38.31 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9z"
                  />
                  <path
                    fill="#587dbd"
                    d="M65.27 52.15h59.52a74.33 74.33 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"
                  />
                  <path
                    fill="#319f43"
                    d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.16 37.16 0 0 0 14.08 6.08a41.29 41.29 0 0 0 15.1 0a36.16 36.16 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.73 63.73 0 0 1 8.75 92.4z"
                  />
                </svg>
                <span className="text-muted-foreground text-sm">Googleでサインイン</span>
              </Button>
            </form>
            <Button variant="outline" className="rounded-full py-6 text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584l-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                />
              </svg>
              <span className="text-muted-foreground text-sm">X(Twitter)でサインイン</span>
            </Button>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              アカウントをお持ちでない方は{" "}
              <Link href="/signup" className="text-[#FFB84C] hover:underline font-medium">
                新規登録
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
