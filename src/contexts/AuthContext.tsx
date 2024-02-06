"use client";
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface AuthProvider {
  children: React.ReactNode;
  session?: Session;
}

function AuthContext({ children, session }: AuthProvider) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default AuthContext;