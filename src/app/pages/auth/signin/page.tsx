"use client";

import { Center, Heading, Input, Button, Text } from "@yamada-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signin } from "../../../../functions/firebase/auth";
import styled from "styled-components";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSignIn = async () => {
    const login = await signin(email, password);
    console.log(login);
    router.push("/");
  };
  return (
    <>
      <Center>
        <Heading as="h1" size="4xl" marginBottom={"40px"}>
          Sign In
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
            <Button onClick={handleSignIn}>Sign In</Button>
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
