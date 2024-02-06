"use client";
import { useSession } from 'next-auth/react';
import React from 'react'

function ChatsPage() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>Chats</div>
  )
}

export default ChatsPage;