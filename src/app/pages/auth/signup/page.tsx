"use client";

import { Center, Text, Button, Heading, Input } from "@yamada-ui/react";
import { register } from "@/functions/firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { styled } from "styled-components";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    const user = await register(email, password);
    console.log(user);
    router.push("/");
  };

  return (
    <>
      <Center>
        <Heading as="h1" size="4xl" marginBottom={"40px"}>
          Sign Up
        </Heading>
      </Center>

      <Center>
        <ul>
          <Tli>
            <Text>Email</Text>
          </Tli>

          <Cli>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Cli>
          <Tli>
            <Text>Password</Text>
          </Tli>
          <Cli>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Cli>
          <Cli>
            <Button onClick={handleSignUp}>Sign Up</Button>
          </Cli>
        </ul>
      </Center>
    </>
  );
}

const Cli = styled.li`
  margin-bottom: 40px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Tli = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 0 20px;
  box-sizing: border-box;
`;
