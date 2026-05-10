import { Button as REButton } from "@react-email/components";
import * as React from "react";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
}

export const Button = ({ href, children }: ButtonProps) => (
  <REButton
    style={{ ...button, padding: "12px 20px" }}
    href={href}
  >
    {children}
  </REButton>
);

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "200px",
  margin: "0 auto",
};
